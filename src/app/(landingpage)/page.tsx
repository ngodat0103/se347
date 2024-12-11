"use client";
import { Header } from "@/features/landingpage/Header";
import { Body } from "@/features/landingpage/Body";
import { Footer } from "@/features/landingpage/Footer";
const LandingPage = () => {
  return (
    <div>
      <Header />
      <div className="bg-zinc-100">
        <Body />
      </div>
      <Footer />
    </div>
  );
};
export default LandingPage;
