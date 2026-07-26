import type { Metadata } from "next";
import PolicyPage from "@/components/pages/PolicyPage";
import { globalPolicyPage } from "@/content/figmaPolicies";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Promise<Metadata> {
  return buildMetadata("/global-policy");
}

export default function GlobalPolicyRoute() {
  return <PolicyPage content={globalPolicyPage} />;
}
