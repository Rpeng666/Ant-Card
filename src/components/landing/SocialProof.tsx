import { Badge } from "./ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";

export const SocialProof = () => {
  const t = useTranslations("landing.socialProof");

  const stats = [
    {
      number: t("stats.users.number"),
      label: t("stats.users.label"),
    },
    {
      number: t("stats.cards.number"),
      label: t("stats.cards.label"),
    },
    {
      number: t("stats.countries.number"),
      label: t("stats.countries.label"),
    },
    {
      number: t("stats.rating.number"),
      label: t("stats.rating.label"),
    },
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
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="text-center p-6">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground">
                {stat.label}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center space-y-4">
        <h3 className="text-lg font-semibold">
          {t("platforms.title")}
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {t.raw("platforms.list").map((platform: string, index: number) => (
            <Badge key={index} variant="secondary" className="px-4 py-2">
              {platform}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
};