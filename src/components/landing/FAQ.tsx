"use client";

import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

export const FAQ = () => {
  const t = useTranslations("landing.faq");

  const FAQList: FAQProps[] = t.raw("questions").map((faq: any, index: number) => ({
    question: faq.question,
    answer: faq.answer,
    value: `item-${index + 1}`,
  }));

  return (
    <section
      id="faq"
      className="container py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        {t("title")}
      </h2>

      <p className="text-xl text-muted-foreground mb-8">
        {t("subtitle")}
      </p>

      <Accordion
        type="single"
        collapsible
        className="w-full AccordionRoot"
      >
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem
            key={value}
            value={value}
          >
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="font-medium mt-4">
        {t("stillHaveQuestions")}{" "}
        <a
          rel="noreferrer noopener"
          href="#"
          className="text-primary transition-all border-primary hover:border-b-2"
        >
          {t("contactUs")}
        </a>
      </h3>
    </section>
  );
};
