import { Button } from "./ui/button";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

export const GetStarted = () => {
  const locale = useLocale();
  const t = useTranslations("landing.getStarted");

  return (
    <section id="get-started" className="container py-20">
      <div className="text-center space-y-8 max-w-3xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold">
          {t("title")}
        </h2>

        <p className="text-xl text-muted-foreground">
          {t("subtitle")}
        </p>

        <p className="text-lg text-primary font-medium">
          {t("description")}
        </p>

        <div className="pt-8 space-y-4">
          <Link href={`/${locale}/app/card-editor`}>
            <Button className="px-12 py-4 text-lg">
              {t("button")}
            </Button>
          </Link>

          <p className="text-sm text-muted-foreground">
            {t("secondaryText")}
          </p>
        </div>
      </div>
    </section>
  );
};