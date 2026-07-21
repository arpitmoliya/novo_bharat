import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

/**
 * A buyer enquiry submitted from the public website's Contact page (Frame 6.2).
 * Every submission is persisted here (so nothing is lost) and an email
 * notification is sent to the owner when SMTP is configured.
 */
@Entity('inquiries')
export class Inquiry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column()
  company: string;

  @Column()
  country: string;

  @Column()
  email: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  phone: string | null;

  @Column()
  molecule: string;

  @Column()
  quantity: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  market: string | null;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @Column({ name: 'email_sent', default: false })
  emailSent: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
