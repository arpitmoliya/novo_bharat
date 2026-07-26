import type { Metadata } from "next";
import PolicyPage from "@/components/pages/PolicyPage";
import { paymentPolicyPage } from "@/content/figmaPolicies";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Promise<Metadata> {
  return buildMetadata("/payment-policy");
}

export default function PaymentPolicyRoute() {
  return <PolicyPage content={paymentPolicyPage} />;
}
