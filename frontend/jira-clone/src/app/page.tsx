import LandingPage from "./(landingpage)/page";
import { isCurrentTokenValid } from "@/lib/jwt_utils";
import { redirect } from "next/navigation";

export default async function Home() {
  // Check if token is valid
  const isValidToken = await isCurrentTokenValid();
  if (isValidToken) {
    // Redirect to dashboard
    redirect("/dashboard");
  }

  return (
    <div className="">
      <LandingPage />
    </div>
  );
}
