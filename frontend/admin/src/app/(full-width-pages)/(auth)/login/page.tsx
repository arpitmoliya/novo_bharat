import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | NovoBharat Admin",
  description: "Sign in to the NovoBharat admin panel",
};

export default function SignIn() {
  return <SignInForm />;
}
