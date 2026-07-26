import type { Metadata } from "next";
import PolicyPage from "@/components/pages/PolicyPage";
import { shippingPolicyPage } from "@/content/figmaPolicies";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Promise<Metadata> {
  return buildMetadata("/shipping-policy");
}

export default function ShippingPolicyRoute() {
  return <PolicyPage content={shippingPolicyPage} />;
}
