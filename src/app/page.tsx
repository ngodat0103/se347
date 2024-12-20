import LandingPage from "./(landingpage)/page";
import { isCurrentTokenValid } from "@/lib/jwt_utils";
import { redirect } from "next/navigation";

export default async function Home() {
  return (
    <div className="">
      <LandingPage />
    </div>
  );
}
