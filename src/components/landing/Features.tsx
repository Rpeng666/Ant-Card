import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import image from "@/assets/growth.png";
import image3 from "@/assets/reflecting.png";
import image4 from "@/assets/looking-ahead.png";
import { useTranslations } from "next-intl";

interface FeatureProps {
  title: string;
  description: string;
  image: any;
}

export const Features = () => {
  const t = useTranslations("landing.features");

  const features: FeatureProps[] = [
    {
      title: t("smartDesign.title"),
      description: t("smartDesign.description"),
      image: image4,
    },
    {
      title: t("realTimeEdit.title"),
      description: t("realTimeEdit.description"),
      image: image3,
    },
    {
      title: t("diverseTemplates.title"),
      description: t("diverseTemplates.description"),
      image: image,
    },
  ];

  const featureList: string[] = [
    t("featureList.darkLight"),
    t("featureList.dragResize"),
    t("featureList.multiTemplate"),
    t("featureList.realTimePreview"),
    t("featureList.smartLayout"),
    t("featureList.responsive"),
    t("featureList.oneClickExport"),
    t("featureList.cloudSave"),
    t("featureList.cleanBeautiful"),
  ];

  return (
    <section
      id="features"
      className="container py-24 sm:py-32 space-y-8"
    >
      <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
        {t("title")}{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          {t("coreFeatures")}
        </span>
      </h2>

      <div className="flex flex-wrap md:justify-center gap-4">
        {featureList.map((feature: string) => (
          <div key={feature}>
            <Badge
              variant="secondary"
              className="text-sm"
            >
              {feature}
            </Badge>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ title, description, image }: FeatureProps) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardContent>{description}</CardContent>

            <CardFooter>
              <img
                src={image}
                alt="About feature"
                className="w-[200px] lg:w-[300px] mx-auto"
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
