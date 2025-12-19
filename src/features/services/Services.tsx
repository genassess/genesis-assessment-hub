import { useLanguage } from "@/shared/contexts/LanguageContext";
import { useLoadingState } from "@/shared/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LazyImage } from "@/components/ui/lazy-image";
import { Link } from "react-router-dom";
import { FileCheck, ClipboardCheck, Shield, HeadphonesIcon, BookOpen, CheckCircle2 } from "lucide-react";
import { CardSkeleton, ImageSkeleton } from "@/components/skeletons";
import { Skeleton } from "@/components/ui/skeleton";
import { JsonLd, generateWebPageSchema, generateServiceSchema, PageMeta } from "@/components/seo";
import classroomTeachingImage from "@/assets/classroom-teaching.jpg";
import studentExamImage from "@/assets/student-exam.jpg";

const servicesPageSchema = generateWebPageSchema(
  "Our Services - Genesis Examinations",
  "Comprehensive examination services including exam development, administration, security, and support for South Sudanese schools.",
  "https://genesisexams.ss/services"
);

const Services = () => {
  const { t } = useLanguage();
  const isLoading = useLoadingState(400);

  const services = [
    {
      icon: BookOpen,
      title: t("services.exam.title"),
      description: t("services.exam.text"),
      features: [
        "Curriculum-aligned assessments",
        "Multiple question formats",
        "Quality assurance reviews",
        "Custom difficulty levels",
      ],
    },
    {
      icon: ClipboardCheck,
      title: t("services.admin.title"),
      description: t("services.admin.text"),
      features: [
        "Professional proctoring services",
        "Secure exam distribution",
        "Logistics coordination",
        "On-site support",
      ],
    },
    {
      icon: Shield,
      title: t("services.security.title"),
      description: t("services.security.text"),
      features: [
        "Encrypted content delivery",
        "Access control protocols",
        "Chain of custody tracking",
        "Integrity verification",
      ],
    },
    {
      icon: HeadphonesIcon,
      title: t("services.support.title"),
      description: t("services.support.text"),
      features: [
        "Pre-exam consultations",
        "Training for school staff",
        "Ongoing communication",
        "Post-exam analysis",
      ],
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <section className="relative bg-primary py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <Skeleton className="h-12 w-2/3 mx-auto bg-primary-foreground/20" />
              <Skeleton className="h-6 w-1/2 mx-auto bg-primary-foreground/20" />
            </div>
          </div>
        </section>
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                <ImageSkeleton className="h-80" />
                <div className="space-y-4">
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-2/3" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map((i) => (
                  <CardSkeleton key={i} lines={5} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const serviceSchemaData = generateServiceSchema(
    services.map((s) => ({ name: s.title, description: s.description }))
  );

  return (
    <div className="min-h-screen animate-fade-in">
      <PageMeta
        title="Our Services"
        description="Comprehensive examination services including exam development, administration, security, and support for South Sudanese schools."
        canonical="/services"
      />
      <JsonLd data={servicesPageSchema} />
      <JsonLd data={serviceSchemaData} />
      {/* Header with Image */}
      <section className="relative bg-gradient-hero text-primary-foreground py-16 overflow-hidden">
        <div className="absolute inset-0">
          <LazyImage
            src={studentExamImage}
            alt="Student taking examination"
            className="w-full h-full object-cover opacity-20"
            showSkeleton={false}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t("services.title")}
            </h1>
            <p className="text-lg opacity-90">
              {t("services.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Services Introduction with Image */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <LazyImage
                  src={classroomTeachingImage}
                  alt="Educational services in South Sudan"
                  className="w-full h-80 object-cover rounded-xl shadow-elevated"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4 text-foreground">
                  Comprehensive Examination Solutions
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We provide end-to-end examination services tailored to the unique needs of South Sudanese educational institutions. From exam development to secure delivery and administration, we ensure every step meets the highest standards of quality and integrity.
                </p>
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card key={index} className="border-border shadow-card hover:shadow-elevated transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-2xl">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-6">
                        {service.description}
                      </p>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
              How It Works
            </h2>
            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Initial Consultation",
                  description: "Contact us to discuss your institution's examination needs and timeline.",
                },
                {
                  step: "2",
                  title: "Customization & Planning",
                  description: "We work with you to customize assessments and plan logistics.",
                },
                {
                  step: "3",
                  title: "Secure Delivery",
                  description: "Exams are delivered through secure channels according to schedule.",
                },
                {
                  step: "4",
                  title: "Administration Support",
                  description: "Professional support throughout the examination period.",
                },
                {
                  step: "5",
                  title: "Follow-up",
                  description: "Post-exam analysis and consultation for continuous improvement.",
                },
              ].map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Learn More?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Contact us to discuss how our services can support your institution's examination needs.
          </p>
          <Link to="/contact">
            <Button size="lg" variant="secondary">
              {t("hero.cta")}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
