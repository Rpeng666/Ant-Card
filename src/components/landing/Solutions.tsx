import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { useTranslations } from "next-intl";
import Link from "next/link";

export const Solutions = () => {
  const t = useTranslations("landing.solutions");

  const solutions = [
    {
      id: "real-time-rendering",
      title: t("realTimeRendering.title"),
      description: t("realTimeRendering.description"),
      useCases: t("realTimeRendering.useCases"),
      relatedLinks: t("realTimeRendering.relatedLinks"),
    },
    {
      id: "templates",
      title: t("templates.title"),
      description: t("templates.description"),
      useCases: t("templates.useCases"),
    },
    {
      id: "smart-splitting",
      title: t("smartSplitting.title"),
      description: t("smartSplitting.description"),
      useCases: t("smartSplitting.useCases"),
    },
    {
      id: "batch-creation",
      title: t("batchCreation.title"),
      description: t("batchCreation.description"),
      useCases: t("batchCreation.useCases"),
      relatedLinks: t("batchCreation.relatedLinks"),
    },
    {
      id: "md2card-support",
      title: t("md2cardSupport.title"),
      description: t("md2cardSupport.description"),
      useCases: t("md2cardSupport.useCases"),
    },
    {
      id: "chrome-extension",
      title: t("chromeExtension.title"),
      description: t("chromeExtension.description"),
      useCases: t("chromeExtension.useCases"),
    },
  ];

  return (
    <section id="solutions" className="container py-20 space-y-12">
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-center">
          {t("title")}
        </h2>
        <p className="text-xl text-muted-foreground">
          {t("subtitle")}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {solutions.map((solution, index) => (
          <Card key={index} id={solution.id} className="relative overflow-hidden hover:shadow-lg transition-shadow h-full">
            <CardHeader>
              <CardTitle className="text-lg font-semibold leading-tight">
                {solution.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-sm leading-relaxed">
                {solution.description}
              </p>
              <div className="pt-2 border-t">
                <Badge variant="outline" className="text-xs mb-2">
                  Use Cases
                </Badge>
                <p className="text-muted-foreground text-xs italic">
                  {solution.useCases}
                </p>
              </div>
              {solution.relatedLinks && (
                <div className="pt-2 border-t">
                  <p className="text-xs font-medium mb-1">Learn More:</p>
                  {solution.relatedLinks.includes('/pricing') ? (
                    <Link href={solution.relatedLinks} className="text-xs text-primary hover:underline block">
                      View Pricing Plans
                    </Link>
                  ) : (
                    <Link href={solution.relatedLinks.match(/\(([^)]+)\)/)?.[1] || '#'} className="text-xs text-primary hover:underline block">
                      {solution.relatedLinks.match(/\[([^\]]+)\]/)?.[1] || solution.relatedLinks}
                    </Link>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};