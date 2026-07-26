/*
 * Policy page content — Payment, Shipping, Privacy, and Global.
 * Structured for the shared PolicyPage renderer.
 */

export type PolicyBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; intro?: string; items: string[] };

export type PolicySection = {
  title?: string;
  blocks: PolicyBlock[];
};

export type PolicyPageContent = {
  hero: { eyebrow: string; title: string; body: string };
  intro?: string;
  sections: PolicySection[];
};

// ============================================================ PAYMENT
export const paymentPolicyPage = {
  hero: {
    eyebrow: "Policies",
    title: "Payment Policy",
    body: "Accepted currencies, fees, payment terms, and timeline requirements for international transactions.",
  },
  sections: [
    {
      title: "Accepted Currencies",
      blocks: [
        {
          type: "paragraph",
          text: "We only accept payment in widely used currencies such as Indian Rupee, US Dollar, EURO, Australian Dollar, Canadian Dollar, Pound Sterling, Chinese Yuan, UAE Dirham, Japanese Yen, and others as permitted by the Reserve Bank of India from time to time.",
        },
      ],
    },
    {
      title: "Fees and Conversion Cost",
      blocks: [
        {
          type: "paragraph",
          text: "We are not liable for any bank fees, exchange rate expenses, or intermediary fees levied by the importer’s bank or financial institution in the import country.",
        },
      ],
    },
    {
      title: "Payment Terms",
      blocks: [
        {
          type: "list",
          intro:
            "For international transactions, we use the payment terms listed below",
          items: [
            "Cash in Advance (Telegraphic Transfer)",
            "L/C – Letter of Credit",
          ],
        },
      ],
    },
    {
      title: "Payment Timeline and Reporting Requirement",
      blocks: [
        {
          type: "paragraph",
          text: "We encourage our clients to pay according to the agreed-upon conditions when generating a purchase order or agreement. This is in accordance with our company’s and governmental regulations.",
        },
      ],
    },
  ],
} as const satisfies PolicyPageContent;

// ============================================================ SHIPPING
export const shippingPolicyPage = {
  hero: {
    eyebrow: "Policies",
    title: "Shipping Policy",
    body: "Shipping modes, delivery timeframes, and INCOTERMS for international consignments.",
  },
  sections: [
    {
      title: "Shipping Mode",
      blocks: [
        {
          type: "paragraph",
          text: "Depending on the size, urgency, and type of the material/goods, we use shipping modes such as sea, air, and road.",
        },
      ],
    },
    {
      title: "Delivery Timeframe",
      blocks: [
        {
          type: "paragraph",
          text: "During the order procedure, refer to the expected timeline. Refer to the expected timeline/days supplied by the shipping company.",
        },
        {
          type: "paragraph",
          text: "We follow the latest INCOTERMS published by the International Chamber of Commerce which is widely used in international commercial transactions.",
        },
      ],
    },
  ],
} as const satisfies PolicyPageContent;

// ============================================================ PRIVACY
export const privacyPolicyPage = {
  hero: {
    eyebrow: "Policies",
    title: "Privacy Policy",
    body: "How Novo Bharat Global Export collects, uses, discloses, and protects your personal information.",
  },
  intro:
    'This Privacy Policy describes how Novo Bharat Global Export (Company) collects, uses, discloses, and protects the personal information of our users when using our website and/or service (collectively, the "Service").',
  sections: [
    {
      title: "Information We Collect",
      blocks: [
        {
          type: "list",
          items: [
            "Personal Information: When you use our Service, we may collect certain personal information, such as your name, email address, phone number, and billing address. We only collect personal information that you voluntarily provide to us.",
            "Non-Personal Information: We may also collect non-personal information about your use of the Service, such as your IP address, browser type, device information, and usage statistics. This information is collected using cookies and similar technologies.",
          ],
        },
      ],
    },
    {
      title: "Use of Information",
      blocks: [
        {
          type: "list",
          intro: "We use the collected information for the following purposes:",
          items: [
            "To provide and maintain the Service.",
            "To personalize and improve your experience with the Service.",
            "To process transactions and fulfill orders.",
            "To send you important notifications, updates, and promotional materials.",
            "To analyze and monitor the usage of the Service.",
            "To comply with legal obligations.",
          ],
        },
      ],
    },
    {
      title: "Information Sharing",
      blocks: [
        {
          type: "list",
          intro:
            "We may share your personal information in the following circumstances:",
          items: [
            "With third-party service providers who assist us in operating and maintaining the Service.",
            "With business partners and affiliates for marketing and promotional purposes, provided that you have not opted out of such communications.",
            "With law enforcement agencies, regulatory authorities, or other third parties if required by law or to protect our rights or the rights of others.",
          ],
        },
      ],
    },
    {
      title: "Data Security",
      blocks: [
        {
          type: "paragraph",
          text: "We implement appropriate security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, please note that no method of transmission over the internet or electronic storage is 100% secure.",
        },
      ],
    },
    {
      title: "Your Rights",
      blocks: [
        {
          type: "paragraph",
          text: "You have certain rights regarding your personal information, including the right to access, correct, and delete your data. If you would like to exercise any of these rights, please contact us using the information provided below.",
        },
      ],
    },
    {
      title: "Children’s Privacy",
      blocks: [
        {
          type: "paragraph",
          text: "Our Service is not intended for individuals under the age of 18. We do not knowingly collect personal information from minors. If you believe that we have inadvertently collected information from a minor, please contact us immediately.",
        },
      ],
    },
    {
      title: "Changes to the Privacy Policy",
      blocks: [
        {
          type: "paragraph",
          text: "We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on our website or through other reasonable means.",
        },
      ],
    },
    {
      title: "Contact Us",
      blocks: [
        {
          type: "paragraph",
          text: "If you have any questions, comments, or concerns about this Privacy Policy or our data practices, please contact us at info@novobharat.com",
        },
      ],
    },
  ],
} as const satisfies PolicyPageContent;

// ============================================================ GLOBAL
export const globalPolicyPage = {
  hero: {
    eyebrow: "Policies",
    title: "Global Policy",
    body: "Standards, patent compliance, medical information disclaimers, and trademark notices.",
  },
  sections: [
    {
      blocks: [
        {
          type: "list",
          items: [
            "All Products given comply with IP/EP/BP/USP (where appropriate, their most recent addendum) or in-house non-pharmacopoeia standards. Novo Bharat Global Export adheres to pharmaceutical patent laws and conventions as they apply in various countries. In certain nations, products covered by a valid patent are not provided or supplied for commercial purpose. The importer is solely liable for patent applicability.",
            "The Product information mentioned here is not intended to provide complete medical information.",
            "The Information in this website database is intended to supplement, not substitute for, the expertise judgment of healthcare professionals. The information is not intended to cover all possible uses, directions, precautions, drug interactions or adverse effects, nor should it be constructed to indicate that use of a particular drug is safe, appropriate or effective for you or anyone else. A healthcare professional should be consulted before taking any drug, changing any diet or commencing or discontinuing any course of treatment.",
            "Certification Disclaimer: Any assessment, certification, inspection, and/or related examination related to the authenticity of certificates is provided or conducted by independent third parties with no involvement from Novo Bharat Global Export.",
            "Product name, logos, brands, and any other information featured or referred to are the property of their respective trademark holders.",
          ],
        },
      ],
    },
  ],
} as const satisfies PolicyPageContent;
