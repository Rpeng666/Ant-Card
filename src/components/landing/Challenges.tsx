import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";

export const Challenges = () => {
  const t = useTranslations("landing.challenges");

  const challenges = [
    {
      title: t("plainText.title"),
      description: t("plainText.description"),
    },
    {
      title: t("platforms.title"),
      description: t("platforms.description"),
    },
    {
      title: t("splitting.title"),
      description: t("splitting.description"),
    },
    {
      title: t("exporting.title"),
      description: t("exporting.description"),
    },
  ];

  return (
    <section className="container py-20 space-y-12">
      <div className="text-center space-y-6 max-w-4xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-center">
          {t("title")}
        </h2>
        <p className="text-xl text-muted-foreground leading-relaxed">
          {t("subtitle")}
        </p>
        <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
          <p className="text-lg font-medium text-primary">
            {t("solution")}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {challenges.map((challenge, index) => (
          <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-center">
                {challenge.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center leading-relaxed">
                {challenge.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};