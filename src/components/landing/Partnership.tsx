import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";

export const Partnership = () => {
  const t = useTranslations("landing.partnership");

  const benefits = [
    {
      title: t("inviteCreators.title"),
      description: t("inviteCreators.description"),
    },
    {
      title: t("referralLinks.title"),
      description: t("referralLinks.description"),
    },
    {
      title: t("analytics.title"),
      description: t("analytics.description"),
    },
    {
      title: t("easySetup.title"),
      description: t("easySetup.description"),
    },
  ];

  return (
    <section className="container py-20 space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-3xl lg:text-4xl font-bold">
          {t("title")}
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((benefit, index) => (
          <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-center">
                {benefit.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center">
                {benefit.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};