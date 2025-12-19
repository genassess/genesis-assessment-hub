import { useLanguage } from "@/shared/contexts/LanguageContext";
import { useLoadingState } from "@/shared/hooks";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LazyImage } from "@/components/ui/lazy-image";
import { Link } from "react-router-dom";
import { Shield, Award, Users, CheckCircle2, ArrowRight } from "lucide-react";
import { CardSkeleton, HeroSkeleton, ImageSkeleton } from "@/components/skeletons";
import { JsonLd, organizationSchema, localBusinessSchema, generateWebPageSchema, PageMeta } from "@/components/seo";
import heroImage from "@/assets/hero-education.jpg";
import partnersMeetingImage from "@/assets/partners-meeting.jpg";
import studentExamImage from "@/assets/student-exam.jpg";
import secureDocumentsImage from "@/assets/secure-documents.jpg";

const homePageSchema = generateWebPageSchema(
  "Genesis Examinations - Home",
  "Trusted educational assessment solutions for South Sudan. Empowering institutions with secure, professional examination services.",
  "https://genesisexams.ss/"
);

const Home = () => {
  const { t } = useLanguage();
  const isLoading = useLoadingState(400);

  const features = [
    {
      icon: Shield,
      title: t("about.values.integrity"),
      description: t("about.values.integrity.text"),
    },
    {
      icon: Award,
      title: t("about.values.quality"),
      description: t("about.values.quality.text"),
    },
    {
      icon: Users,
      title: t("about.values.trust"),
      description: t("about.values.trust.text"),
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <HeroSkeleton />
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          </div>
        </section>
        <section className="py-16 bg-gradient-section">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 space-y-4">
                <div className="h-10 w-3/4 bg-muted rounded animate-pulse" />
                <div className="h-6 w-full bg-muted rounded animate-pulse" />
                <div className="h-6 w-2/3 bg-muted rounded animate-pulse" />
              </div>
              <div className="order-1 lg:order-2">
                <ImageSkeleton aspectRatio="wide" />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen animate-fade-in">
      <PageMeta
        title="Home"
        description="Genesis Examinations - Trusted educational assessment solutions for South Sudan. Empowering institutions with secure, professional examination services."
        canonical="/"
      />
      <JsonLd data={organizationSchema} />
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={homePageSchema} />
      {/* Hero Section */}
      <section className="relative min-h-[600px] md:min-h-[700px] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-primary/60" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-primary-foreground">
              {t("hero.title")}
            </h1>
            <p className="text-lg md:text-xl mb-8 text-primary-foreground/90">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  {t("hero.cta")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  {t("hero.learn")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-border shadow-card hover:shadow-elevated transition-shadow">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Statement with Image */}
      <section className="py-16 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                {t("about.mission.title")}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {t("about.mission.text")}
              </p>
              <Link to="/about">
                <Button variant="default" size="lg">
                  {t("nav.about")}
                </Button>
              </Link>
            </div>
            <div className="order-1 lg:order-2">
              <LazyImage 
                src={studentExamImage} 
                alt="African student focused on examination" 
                className="rounded-2xl shadow-elevated w-full object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview with Image */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <LazyImage 
                src={partnersMeetingImage} 
                alt="School administrators collaborating in meeting" 
                className="rounded-2xl shadow-elevated w-full object-cover aspect-[4/3]"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                {t("services.title")}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {t("services.subtitle")}
              </p>

              <div className="grid grid-cols-1 gap-4 mb-8">
                {[
                  { title: t("services.exam.title"), text: t("services.exam.text") },
                  { title: t("services.admin.title"), text: t("services.admin.text") },
                  { title: t("services.security.title"), text: t("services.security.text") },
                  { title: t("services.support.title"), text: t("services.support.text") },
                ].map((service, index) => (
                  <div key={index} className="flex gap-3">
                    <CheckCircle2 className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{service.title}</h3>
                      <p className="text-muted-foreground text-sm">{service.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/services">
                <Button variant="outline" size="lg">
                  View All Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Security Notice with Image */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="order-2 lg:order-1">
              <Card className="border-secondary/20 shadow-elevated">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <Shield className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-foreground">
                        {t("security.title")}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {t("security.message")}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {t("security.cta")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="order-1 lg:order-2">
              <LazyImage 
                src={secureDocumentsImage} 
                alt="Professional handling secure examination documents" 
                className="rounded-2xl shadow-elevated w-full object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Contact us today to learn how Genesis Examinations can support your institution's assessment needs.
          </p>
          <Link to="/contact">
            <Button size="lg" variant="secondary">
              {t("hero.cta")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
