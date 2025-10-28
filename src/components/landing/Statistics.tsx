"use client";

import { useTranslations } from "next-intl";

export const Statistics = () => {
  const t = useTranslations("landing.statistics");

  interface statsProps {
    quantity: string;
    description: string;
  }

  const stats: statsProps[] = [
    {
      quantity: t("users.quantity"),
      description: t("users.description"),
    },
    {
      quantity: t("subscribers.quantity"),
      description: t("subscribers.description"),
    },
    {
      quantity: t("downloads.quantity"),
      description: t("downloads.description"),
    },
    {
      quantity: t("products.quantity"),
      description: t("products.description"),
    },
  ];

  return (
    <section id="statistics">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map(({ quantity, description }: statsProps) => (
          <div
            key={description}
            className="space-y-2 text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold ">{quantity}</h2>
            <p className="text-xl text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
