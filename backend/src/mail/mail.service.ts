import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';
import { Inquiry } from '../inquiries/inquiry.entity';

/**
 * Thin nodemailer wrapper. Reads SMTP settings from env. If SMTP is not
 * configured, sending is skipped gracefully (logged, returns false) so callers
 * never fail just because email isn't set up yet.
 *
 * Required env to enable sending:
 *   SMTP_HOST, SMTP_USER, SMTP_PASS
 * Optional:
 *   SMTP_PORT (default 587), SMTP_SECURE (default false), CONTACT_TO, CONTACT_FROM
 */
@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: Transporter | null = null;

  constructor(private readonly config: ConfigService) {}

  private get host() {
    return this.config.get<string>('SMTP_HOST');
  }
  private get user() {
    return this.config.get<string>('SMTP_USER');
  }
  private get pass() {
    return this.config.get<string>('SMTP_PASS');
  }

  isConfigured(): boolean {
    return Boolean(this.host && this.user && this.pass);
  }

  private getTransporter(): Transporter | null {
    if (!this.isConfigured()) return null;
    if (!this.transporter) {
      const port = parseInt(this.config.get<string>('SMTP_PORT') ?? '587', 10);
      this.transporter = nodemailer.createTransport({
        host: this.host,
        port,
        secure: this.config.get<string>('SMTP_SECURE') === 'true' || port === 465,
        auth: { user: this.user, pass: this.pass },
      });
    }
    return this.transporter;
  }

  /** Sends the owner an email about a new enquiry. Returns true on success. */
  async sendInquiryNotification(inquiry: Inquiry): Promise<boolean> {
    const transporter = this.getTransporter();
    if (!transporter) {
      this.logger.warn(
        `SMTP not configured — skipping email for inquiry #${inquiry.id}. ` +
          `Set SMTP_HOST/SMTP_USER/SMTP_PASS to enable notifications.`,
      );
      return false;
    }

    const to = this.config.get<string>('CONTACT_TO') ?? this.user!;
    const from =
      this.config.get<string>('CONTACT_FROM') ??
      `"Novo Bharat Website" <${this.user}>`;

    const lines = [
      `New API sourcing enquiry from the website:`,
      ``,
      `Name:        ${inquiry.fullName}`,
      `Company:     ${inquiry.company}`,
      `Country:     ${inquiry.country}`,
      `Email:       ${inquiry.email}`,
      `Phone:       ${inquiry.phone ?? '—'}`,
      `Molecule:    ${inquiry.molecule}`,
      `Quantity:    ${inquiry.quantity}`,
      `Market:      ${inquiry.market ?? '—'}`,
      ``,
      `Additional requirements:`,
      inquiry.notes ?? '—',
      ``,
      `Received: ${inquiry.createdAt.toISOString()}`,
    ];

    try {
      await transporter.sendMail({
        from,
        to,
        replyTo: inquiry.email,
        subject: `New API enquiry — ${inquiry.molecule} (${inquiry.country})`,
        text: lines.join('\n'),
      });
      return true;
    } catch (err) {
      this.logger.error(
        `Failed to send inquiry email #${inquiry.id}: ${(err as Error).message}`,
      );
      return false;
    }
  }
}
