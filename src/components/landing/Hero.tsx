import { Button } from "./ui/button";
import { buttonVariants } from "./ui/button";
import { HeroCards } from "./HeroCards";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export const Hero = () => {
  const locale = useLocale();
  const t = useTranslations("landing.hero");

  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center space-y-8 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          <span className="inline bg-gradient-to-r from-[#F596D3] to-[#D247BF] text-transparent bg-clip-text">
            {t("title")}
          </span>
        </h1>

        <h2 className="text-2xl md:text-3xl font-semibold text-muted-foreground">
          {t("subtitle")}
        </h2>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto">
          {t("description")}
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row justify-center gap-4">
          <Link href={`/${locale}/app/card-editor`}>
            <Button className="w-full md:w-auto px-8 py-3 text-lg">
              {t("startMaking")}
            </Button>
          </Link>

          <a
            rel="noreferrer noopener"
            href="https://github.com/rpeng666/ant-card"
            target="_blank"
            className={`w-full md:w-auto px-8 py-3 text-lg ${buttonVariants({
              variant: "outline",
            })}`}
          >
            {t("githubRepo")}
            <GitHubLogoIcon className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Hero cards sections */}
      <div className="z-10">
        <HeroCards />
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};
