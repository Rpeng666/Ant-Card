import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";

export const UseCases = () => {
  const t = useTranslations("landing.useCases");

  // Sample use cases - in a real app, these might come from a CMS or config
  const useCases = [
    {
      title: "Social Media Cards",
      description: "Instagram-ready posts with perfect dimensions",
      type: "Social Media"
    },
    {
      title: "Blog Share Graphics",
      description: "Eye-catching graphics for blog content sharing",
      type: "Content Marketing"
    },
    {
      title: "Newsletter Covers",
      description: "Professional headers for email campaigns",
      type: "Email Marketing"
    },
    {
      title: "Presentation Slides",
      description: "Beautiful slide designs for presentations",
      type: "Business"
    },
    {
      title: "Quote Cards",
      description: "Inspirational quotes with stunning typography",
      type: "Social Media"
    },
    {
      title: "Product Announcements",
      description: "Clear and attractive product showcase cards",
      type: "Marketing"
    }
  ];

  return (
    <section className="container py-20 space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-3xl lg:text-4xl font-bold">
          {t("title")}
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {t("subtitle")}
        </p>
        <p className="text-lg text-muted-foreground">
          {t("description")}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {useCases.map((useCase, index) => (
          <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">
                  {useCase.title}
                </CardTitle>
                <Badge variant="outline" className="text-xs">
                  {useCase.type}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {useCase.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};