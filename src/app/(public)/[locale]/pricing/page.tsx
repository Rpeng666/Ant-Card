import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { ScrollToTop } from "@/components/landing/ScrollToTop";

interface PricingPlan {
  title: string;
  description: string;
  price: string;
  period: string;
  buttonText: string;
  benefits: string[];
  popular?: boolean;
  icon?: React.ReactNode;
}

export async function generateMetadata({
  params: { locale }
}: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "common" });
  const baseUrl = "https://antcard.airouter.tech";

  return {
    title: `Pricing - ${t("title")}`,
    description: `Choose the perfect plan for your needs. Free, Pro, Team, and Lifetime options available for ${t("title")}`,
    alternates: {
      canonical: `${baseUrl}/${locale}/pricing`,
      languages: {
        'en': `${baseUrl}/en/pricing`,
        'zh': `${baseUrl}/zh/pricing`,
        'x-default': `${baseUrl}/en/pricing`
      }
    }
  };
}

export default function PricingPage() {
  const plans: PricingPlan[] = [
    {
      title: "Free Plan",
      description: "Perfect for individuals getting started with Md2Card creation",
      price: "Free",
      period: "forever",
      buttonText: "Get Started",
      benefits: [
        "Real-time Markdown rendering",
        "Basic template library",
        "Standard export formats",
        "Local storage",
        "Community support"
      ],
      icon: <Star className="w-6 h-6" />
    },
    {
      title: "Pro Plan",
      description: "Unlimited templates and advanced features for professionals",
      price: "$19",
      period: "/month",
      buttonText: "Upgrade to Pro",
      benefits: [
        "Unlimited templates",
        "Batch creation & export",
        "Advanced customization",
        "Priority support",
        "AI-powered features",
        "Cloud sync"
      ],
      popular: true,
      icon: <Star className="w-6 h-6" />
    },
    {
      title: "Team Plan",
      description: "Collaboration features for teams and organizations",
      price: "$49",
      period: "/month",
      buttonText: "Start Free Trial",
      benefits: [
        "Team collaboration",
        "Shared templates",
        "Team analytics",
        "Dedicated support",
        "Advanced security",
        "API access"
      ],
      icon: <Star className="w-6 h-6" />
    },
    {
      title: "Lifetime Plan",
      description: "One-time purchase with lifetime access and updates",
      price: "$199",
      period: "once",
      buttonText: "Buy Lifetime",
      benefits: [
        "Lifetime access to all features",
        "All future updates included",
        "Priority lifetime support",
        "All premium features",
        "No recurring payments",
        "Transferable license"
      ],
      icon: <Star className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container py-20">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold">
            Choose Your Perfect Plan
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Flexible pricing options for individuals, teams, and enterprises. Start creating beautiful Md2Cards today.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  {plan.icon}
                </div>
                <CardTitle className="text-xl mb-2">
                  {plan.title}
                </CardTitle>
                <p className="text-muted-foreground text-sm">
                  {plan.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Price */}
                <div className="text-center">
                  <div className="text-4xl font-bold">
                    {plan.price}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {plan.period}
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-3">
                  {plan.benefits.map((benefit: string, benefitIndex: number) => (
                    <div key={benefitIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm leading-relaxed">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                  variant={plan.popular ? "default" : "outline"}
                  asChild
                >
                  <Link href="/app/card-editor">
                    {plan.buttonText}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16 space-y-6">
          <h2 className="text-3xl font-bold">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of creators using Ant Card to transform their content into beautiful Md2Cards.
          </p>
          <Button size="lg" className="px-8" asChild>
            <Link href="/app/card-editor">
              Start Creating Now
            </Link>
          </Button>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}