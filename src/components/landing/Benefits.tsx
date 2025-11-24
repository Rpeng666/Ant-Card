import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";

export const Benefits = () => {
  const t = useTranslations("landing.benefits");

  return (
    <section className="container py-20 space-y-16">
      <div className="text-center space-y-6">
        <h2 className="text-3xl lg:text-4xl font-bold">
          {t("title")}
        </h2>
        <h3 className="text-2xl font-semibold text-muted-foreground">
          {t("subtitle")}
        </h3>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {t("description")}
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {t.raw("features").map((feature: string, index: number) => (
          <Badge key={index} variant="secondary" className="text-sm px-4 py-2">
            {feature}
          </Badge>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {t.raw("testimonials").map((testimonial: string, index: number) => (
          <Card key={index} className="relative">
            <CardContent className="pt-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-muted-foreground italic">
                &quot;{testimonial}&quot;
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};