import { LandingHeader } from "@/components/landing-header";
import { LandingHero } from "@/components/landing-hero";
import { LandingFeatures } from "@/components/landing-features";
import { LandingAbout } from "@/components/landing-about";
import { LandingPricing } from "@/components/landing-pricing";
import { LandingFooter } from "@/components/landing-footer";
import { useAuth } from "@/components/auth-provider";
import { Navigate } from "react-router";

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <LandingHeader />
      <main className="flex-1">
        <LandingHero />
        <LandingFeatures />
        <LandingAbout />
        <LandingPricing />
      </main>
      <LandingFooter />
    </div>
  );
}
