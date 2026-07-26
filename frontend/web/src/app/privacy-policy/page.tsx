import type { Metadata } from "next";
import PolicyPage from "@/components/pages/PolicyPage";
import { privacyPolicyPage } from "@/content/figmaPolicies";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Promise<Metadata> {
  return buildMetadata("/privacy-policy");
}

export default function PrivacyPolicyRoute() {
  return <PolicyPage content={privacyPolicyPage} />;
}
