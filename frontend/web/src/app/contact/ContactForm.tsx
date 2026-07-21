"use client";

// Inquiry form — client-side validation + inline success message (no redirect).
// Styled with the fx- design system to match the Figma Contact page.
import { useState } from "react";
import { InquiryPayload, publicApi } from "@/lib/api";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";

const COUNTRIES = [
  "Australia",
  "Bangladesh",
  "Brazil",
  "Canada",
  "Chile",
  "China",
  "Colombia",
  "Egypt",
  "France",
  "Germany",
  "Ghana",
  "India",
  "Indonesia",
  "Italy",
  "Japan",
  "Kenya",
  "Malaysia",
  "Mauritius",
  "Mexico",
  "Netherlands",
  "Nigeria",
  "Pakistan",
  "Philippines",
  "Russia",
  "Saudi Arabia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "Thailand",
  "Turkey",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Vietnam",
  "Other",
];

type Fields = {
  fullName: string;
  company: string;
  country: string;
  email: string;
  phone: string;
  molecule: string;
  quantity: string;
  market: string;
  notes: string;
};

const EMPTY: Fields = {
  fullName: "",
  company: "",
  country: "",
  email: "",
  phone: "",
  molecule: "",
  quantity: "",
  market: "",
  notes: "",
};

const REQUIRED: (keyof Fields)[] = [
  "fullName",
  "company",
  "country",
  "email",
  "molecule",
  "quantity",
];

// Trim and drop blank optionals so they persist as null, not "".
function toPayload(f: Fields): InquiryPayload {
  const opt = (v: string) => {
    const t = v.trim();
    return t ? t : undefined;
  };
  return {
    fullName: f.fullName.trim(),
    company: f.company.trim(),
    country: f.country.trim(),
    email: f.email.trim(),
    phone: opt(f.phone),
    molecule: f.molecule.trim(),
    quantity: f.quantity.trim(),
    market: opt(f.market),
    notes: opt(f.notes),
  };
}

export default function ContactForm() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>(
    {},
  );
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const set =
    (key: keyof Fields) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      setFields((f) => ({ ...f, [key]: e.target.value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  const validate = () => {
    const next: Partial<Record<keyof Fields, string>> = {};
    for (const key of REQUIRED) {
      if (!fields[key].trim()) next[key] = "This field is required";
    }
    if (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      next.email = "Enter a valid email address";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || submitting) return;
    setSubmitError(false);
    setSubmitting(true);
    try {
      await publicApi.submitInquiry(toPayload(fields));
      setSubmitted(true);
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const formClasses = "mt-7 grid grid-cols-1 gap-[18px] md:grid-cols-2";

  if (submitted) {
    return (
      <div className={formClasses}>
        <div className="form-success">
          Thank you! We will respond within 24 hours with pricing and
          availability.
        </div>
        <p className="col-span-full m-0 text-gray">
          For an immediate response you can also email{" "}
          <a href="mailto:info@novobharat.com">info@novobharat.com</a> or
          message us on <a href="https://wa.me/919898849899">WhatsApp</a>.
        </p>
      </div>
    );
  }

  const field = (
    key: keyof Fields,
    label: string,
    opts: {
      type?: string;
      required?: boolean;
      full?: boolean;
      placeholder?: string;
    } = {},
  ) => (
    <div
      className={`field${opts.full ? " field-full" : ""}${errors[key] ? " has-error" : ""}`}
    >
      <label htmlFor={key}>
        {label} {opts.required && <span className="req">*</span>}
      </label>
      <input
        id={key}
        type={opts.type ?? "text"}
        value={fields[key]}
        onChange={set(key)}
        placeholder={opts.placeholder}
      />
      {errors[key] && <span className="field-error">{errors[key]}</span>}
    </div>
  );

  return (
    <form className={formClasses} onSubmit={onSubmit} noValidate>
      {field("fullName", "Full Name", { required: true })}
      {field("company", "Company Name", { required: true })}

      <div className={`field${errors.country ? " has-error" : ""}`}>
        <label htmlFor="country">
          Country <span className="req">*</span>
        </label>
        <select id="country" value={fields.country} onChange={set("country")}>
          <option value="">Select country…</option>
          {COUNTRIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {errors.country && (
          <span className="field-error">{errors.country}</span>
        )}
      </div>

      {field("email", "Email Address", { type: "email", required: true })}
      {field("phone", "Phone / WhatsApp", {
        type: "tel",
        placeholder: "+country code",
      })}
      {field("molecule", "API / Molecule Name", { required: true })}
      {field("quantity", "Quantity Required", {
        required: true,
        placeholder: "e.g. 50 kg",
      })}
      {field("market", "Intended Market / Country of Use")}

      <div className="field field-full">
        <label htmlFor="notes">Additional Requirements</label>
        <textarea
          id="notes"
          rows={4}
          value={fields.notes}
          onChange={set("notes")}
        />
      </div>

      {submitError && (
        <div className="field-error col-span-full" role="alert">
          Something went wrong sending your requirement. Please try again, or
          email <a href="mailto:info@novobharat.com">info@novobharat.com</a>{" "}
          directly.
        </div>
      )}

      <div className="form-submit">
        <button type="submit" className="btn btn-solid" disabled={submitting}>
          {submitting ? "Sending…" : "Send My Requirement"}
          {!submitting && <ArrowRightIcon />}
        </button>
      </div>
    </form>
  );
}
