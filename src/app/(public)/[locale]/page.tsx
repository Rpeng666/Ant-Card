import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Challenges } from "@/components/landing/Challenges";
import { Solutions } from "@/components/landing/Solutions";
import { Benefits } from "@/components/landing/Benefits";
import { SocialProof } from "@/components/landing/SocialProof";
import { Features } from "@/components/landing/Features";
import { Partnership } from "@/components/landing/Partnership";
import { UseCases } from "@/components/landing/UseCases";
import { FAQ } from "@/components/landing/FAQ";
import { GetStarted } from "@/components/landing/GetStarted";
import { Footer } from "@/components/landing/Footer";
import { ScrollToTop } from "@/components/landing/ScrollToTop";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Challenges />
      <Solutions />
      <Benefits />
      <SocialProof />
      <Features />
      <Partnership />
      <UseCases />
      <FAQ />
      <GetStarted />
      <Footer />
      <ScrollToTop />
    </>
  );
}
