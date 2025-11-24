"use client";

import { useTranslations } from "next-intl";
import { Badge } from "./ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
  relatedLinks?: string;
}

export const FAQ = () => {
  const t = useTranslations("landing.faq");

  const FAQList: FAQProps[] = t.raw("questions").map((faq: any, index: number) => ({
    question: faq.question,
    answer: faq.answer,
    value: `item-${index + 1}`,
    relatedLinks: faq.relatedLinks,
  }));

  return (
    <section
      id="faq"
      className="container py-24 sm:py-32 space-y-12"
    >
      <div className="text-center space-y-6 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold">
          {t("title")}
        </h2>

        <p className="text-xl text-muted-foreground">
          {t("subtitle")}
        </p>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-3">
          {t.raw("quickLinks").map((link: any, index: number) => (
            <Link key={index} href={link.href || link.anchor}>
              <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground cursor-pointer">
                {link.text}
              </Badge>
            </Link>
          ))}
        </div>
      </div>

      <Accordion
        type="single"
        collapsible
        className="w-full AccordionRoot max-w-4xl mx-auto"
      >
        {FAQList.map(({ question, answer, value, relatedLinks }: FAQProps) => (
          <AccordionItem
            key={value}
            value={value}
          >
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {answer}
              </p>
              {relatedLinks && (
                <div className="pt-2 border-t">
                  <p className="text-sm font-medium mb-2">Related Links:</p>
                  <Link href={relatedLinks.match(/\(([^)]+)\)/)[1]} className="text-primary hover:underline text-sm">
                    {relatedLinks.replace(/\[([^\]]+)\]\([^)]+\)/, '$1')}
                  </Link>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
