"use client";

import { useState } from "react";
import { InquiryPayload, publicApi } from "@/lib/api";
import Button from "@/components/ui/Button";
import FormField, {
  formControlClass,
  formControlErrorClass,
} from "@/components/ui/FormField";
import FormSuccess from "@/components/ui/FormSuccess";
import { cn } from "@/lib/cn";

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
        <FormSuccess>
          Thank you! We will respond within 24 hours with pricing and
          availability.
        </FormSuccess>
        <p className="col-span-full m-0 text-gray">
          For an immediate response you can also email{" "}
          <a href="mailto:info@novobharat.com">info@novobharat.com</a> or
          message us on <a href="https://wa.me/919898849899">WhatsApp</a>.
        </p>
      </div>
    );
  }

  const inputClass = (key: keyof Fields) =>
    cn(formControlClass, errors[key] && formControlErrorClass);

  return (
    <form className={formClasses} onSubmit={onSubmit} noValidate>
      <FormField
        id="fullName"
        label="Full Name"
        required
        error={errors.fullName}
      >
        <input
          id="fullName"
          value={fields.fullName}
          onChange={set("fullName")}
          placeholder="Enter your full name"
          className={inputClass("fullName")}
        />
      </FormField>

      <FormField
        id="company"
        label="Company Name"
        required
        error={errors.company}
      >
        <input
          id="company"
          value={fields.company}
          onChange={set("company")}
          placeholder="Enter your company name"
          className={inputClass("company")}
        />
      </FormField>

      <FormField id="country" label="Country" required error={errors.country}>
        <select
          id="country"
          value={fields.country}
          onChange={set("country")}
          className={inputClass("country")}
        >
          <option value="">Select country…</option>
          {COUNTRIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </FormField>

      <FormField id="email" label="Email Address" required error={errors.email}>
        <input
          id="email"
          type="email"
          value={fields.email}
          onChange={set("email")}
          placeholder="Enter your email address"
          className={inputClass("email")}
        />
      </FormField>

      <FormField id="phone" label="Phone / WhatsApp">
        <input
          id="phone"
          type="tel"
          value={fields.phone}
          onChange={set("phone")}
          placeholder="+country code"
          className={formControlClass}
        />
      </FormField>

      <FormField
        id="molecule"
        label="API / Molecule Name"
        required
        error={errors.molecule}
      >
        <input
          id="molecule"
          value={fields.molecule}
          onChange={set("molecule")}
          placeholder="Enter your API / Molecule name"
          className={inputClass("molecule")}
        />
      </FormField>

      <FormField
        id="quantity"
        label="Quantity Required"
        required
        error={errors.quantity}
      >
        <input
          id="quantity"
          value={fields.quantity}
          onChange={set("quantity")}
          placeholder="e.g. 50 kg"
          className={inputClass("quantity")}
        />
      </FormField>

      <FormField id="market" label="Intended Market / Country of Use">
        <input
          id="market"
          value={fields.market}
          onChange={set("market")}
          placeholder="Enter your intended market / country of use"
          className={formControlClass}
        />
      </FormField>

      <FormField id="notes" label="Additional Requirements" fullWidth>
        <textarea
          id="notes"
          rows={4}
          value={fields.notes}
          onChange={set("notes")}
          className={cn(formControlClass, "min-h-27.5 resize-y")}
          placeholder="Enter any additional requirements"
        />
      </FormField>

      {submitError ? (
        <div
          className="col-span-full font-body text-[0.85rem] text-[#d92d20]"
          role="alert"
        >
          Something went wrong sending your requirement. Please try again, or
          email <a href="mailto:info@novobharat.com">info@novobharat.com</a>{" "}
          directly.
        </div>
      ) : null}

      <div className="col-span-full flex justify-center">
        <Button
          type="submit"
          variant="solid"
          showArrow={!submitting}
          disabled={submitting}
        >
          {submitting ? "Sending…" : "Send My Requirement"}
        </Button>
      </div>
    </form>
  );
}
