"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { buttonVariants } from "./ui/button";
import { Menu } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { LogoIcon } from "../Icons";
import LanguageSwitch from "../shared/LanguageSwitch";

interface RouteProps {
  href: string;
  label: string;
}

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const locale = useLocale();
  const t = useTranslations("landing.navbar");

  const routeList: RouteProps[] = [
    {
      href: "#solutions",
      label: t("features"),
    },
    {
      href: `/templates`,
      label: t("templates"),
    },
    {
      href: `/cover-maker`,
      label: t("coverMaker"),
    },
    {
      href: `/blog`,
      label: t("blog"),
    },
    {
      href: `/pricing`,
      label: t("pricing"),
    },
    {
      href: "#benefits",
      label: t("testimonials"),
    },
    {
      href: "#faq",
      label: t("faq"),
    },
  ];
  return (
    <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
          <NavigationMenuItem className="font-bold flex">
            <a
              rel="noreferrer noopener"
              href="/"
              className="ml-2 font-bold text-xl flex"
            >
              <LogoIcon />
              AntCard
            </a>
          </NavigationMenuItem>

          {/* desktop */}
          <nav className="hidden md:flex gap-2">
            {routeList.map((route: RouteProps, i) => (
              <a
                rel="noreferrer noopener"
                href={route.href.startsWith('#') ? route.href : `/${locale}${route.href}`}
                key={i}
                className={`text-[17px] ${buttonVariants({
                  variant: "ghost",
                })}`}
              >
                {route.label}
              </a>
            ))}
          </nav>

          {/* mobile */}
          <div className="flex md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2">
                <Menu
                  className="flex md:hidden h-5 w-5"
                  onClick={() => setIsOpen(true)}
                >
                  <span className="sr-only">Menu Icon</span>
                </Menu>
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">
                    AntCard
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {routeList.map(({ href, label }: RouteProps) => (
                    <a
                      rel="noreferrer noopener"
                      key={label}
                      href={href.startsWith('#') ? href : `/${locale}${href}`}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      {label}
                    </a>
                  ))}
                  <div className="flex gap-2 mt-4">
                    <LanguageSwitch />
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          <div className="hidden md:flex gap-2">
            <LanguageSwitch />

          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
