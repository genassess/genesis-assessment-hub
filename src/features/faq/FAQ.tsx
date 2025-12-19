import { useLanguage } from "@/shared/contexts/LanguageContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LazyImage } from "@/components/ui/lazy-image";
import { Link } from "react-router-dom";
import { JsonLd, generateFaqSchema, generateWebPageSchema, PageMeta } from "@/components/seo";
import classroomTeachingImage from "@/assets/classroom-teaching.jpg";
import graduationCelebrationImage from "@/assets/graduation-celebration.jpg";

const faqPageSchema = generateWebPageSchema(
  "Frequently Asked Questions - Genesis Examinations",
  "Find answers to common questions about Genesis Examinations services",
  "https://genesisexams.ss/faq"
);

const FAQ = () => {
  const { t } = useLanguage();

  const faqs = [
    {
      question: t("faq.q1"),
      answer: t("faq.a1"),
    },
    {
      question: t("faq.q2"),
      answer: t("faq.a2"),
    },
    {
      question: t("faq.q3"),
      answer: t("faq.a3"),
    },
    {
      question: t("faq.q4"),
      answer: t("faq.a4"),
    },
    {
      question: t("faq.q5"),
      answer: t("faq.a5"),
    },
    {
      question: t("faq.q6"),
      answer: t("faq.a6"),
    },
    {
      question: t("faq.q7"),
      answer: t("faq.a7"),
    },
    {
      question: t("faq.q8"),
      answer: t("faq.a8"),
    },
    {
      question: t("faq.q9"),
      answer: t("faq.a9"),
    },
    {
      question: t("faq.q10"),
      answer: t("faq.a10"),
    },
  ];

  const faqSchema = generateFaqSchema(faqs);

  return (
    <div className="min-h-screen">
      <PageMeta
        title="Frequently Asked Questions"
        description="Find answers to common questions about Genesis Examinations services for South Sudanese educational institutions."
        canonical="/faq"
      />
      <JsonLd data={faqPageSchema} />
      <JsonLd data={faqSchema} />
      {/* Header with Image */}
      <section className="relative bg-gradient-hero text-primary-foreground py-16 overflow-hidden">
        <div className="absolute inset-0">
          <LazyImage
            src={classroomTeachingImage}
            alt="Educational environment"
            className="w-full h-full object-cover opacity-20"
            showSkeleton={false}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t("faq.title")}
            </h1>
            <p className="text-lg opacity-90">
              Find answers to common questions about our examination services
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-border rounded-lg px-6 shadow-card"
                >
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="font-semibold text-foreground">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <LazyImage
                  src={graduationCelebrationImage}
                  alt="Students celebrating success"
                  className="w-full h-80 object-cover rounded-xl shadow-elevated"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4 text-foreground">
                  Empowering Educational Success
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  Every year, thousands of students across South Sudan complete their examinations through Genesis Examinations. Our commitment to quality and security ensures that every student receives a fair assessment.
                </p>
                <p className="text-muted-foreground">
                  We're proud to play a role in shaping the future of education in South Sudan, one examination at a time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Help */}
      <section className="py-16 bg-gradient-section">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto border-border shadow-elevated">
            <CardContent className="pt-6 text-center">
              <h2 className="text-2xl font-bold mb-4 text-foreground">
                Still Have Questions?
              </h2>
              <p className="text-muted-foreground mb-6">
                Can't find the answer you're looking for? Our team is here to help you with any questions about our examination services.
              </p>
              <Link to="/contact">
                <Button size="lg">{t("nav.contact")}</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
