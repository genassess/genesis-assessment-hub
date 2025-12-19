import { useLanguage } from "@/shared/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LazyImage } from "@/components/ui/lazy-image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Award, Building2, GraduationCap, Shield } from "lucide-react";
import { JsonLd, generateWebPageSchema, PageMeta } from "@/components/seo";
import partnershipHandshakeImage from "@/assets/partnership-handshake.jpg";
import partnersMeetingImage from "@/assets/partners-meeting.jpg";
import partnerSchool1 from "@/assets/partner-school-1.jpg";
import partnerSchool2 from "@/assets/partner-school-2.jpg";
import partnerSchool3 from "@/assets/partner-school-3.jpg";
import partnerSchool4 from "@/assets/partner-school-4.jpg";
import partnerSchool5 from "@/assets/partner-school-5.jpg";
import partnerSchool6 from "@/assets/partner-school-6.jpg";

const partnersPageSchema = generateWebPageSchema(
  "Our Partners - Genesis Examinations",
  "Explore our partnerships with educational institutions, government bodies, and international organizations across South Sudan.",
  "https://genesisexams.ss/partners"
);

const Partners = () => {
  const { t } = useLanguage();

  const partnerSchools = [
    {
      name: "South Sudan Secondary School",
      location: "Juba",
      image: partnerSchool1,
      students: "1,200+",
    },
    {
      name: "Unity Primary Academy",
      location: "Malakal",
      image: partnerSchool2,
      students: "800+",
    },
    {
      name: "Central Education Campus",
      location: "Wau",
      image: partnerSchool3,
      students: "1,500+",
    },
    {
      name: "National Learning Center",
      location: "Bor",
      image: partnerSchool4,
      students: "600+",
    },
    {
      name: "Excellence Academy",
      location: "Rumbek",
      image: partnerSchool5,
      students: "950+",
    },
    {
      name: "Pioneer Technical Institute",
      location: "Yambio",
      image: partnerSchool6,
      students: "450+",
    },
  ];

  const partnerCategories = [
    {
      icon: GraduationCap,
      title: "Educational Institutions",
      partners: [
        "Ministry of General Education and Instruction",
        "South Sudan Teacher Training Institute",
        "National Curriculum Development Center",
      ],
    },
    {
      icon: Award,
      title: "Accreditations & Standards",
      partners: [
        "International Association for Educational Assessment (IAEA)",
        "East African Examinations Council",
        "Quality Assurance and Standards Agency",
      ],
    },
    {
      icon: Building2,
      title: "Partner Organizations",
      partners: [
        "UNESCO South Sudan",
        "UNICEF Education Programme",
        "South Sudan Educational Network",
      ],
    },
    {
      icon: Shield,
      title: "Security & Compliance",
      partners: [
        "National Security Certification",
        "Data Protection Compliance",
        "ISO 27001 Standards Adherence",
      ],
    },
  ];

  const certifications = [
    "Certified Educational Assessment Provider",
    "Secure Examination Services Accreditation",
    "Quality Management System Certified",
    "Educational Standards Compliance",
  ];

  return (
    <div className="min-h-screen">
      <PageMeta
        title="Our Partners"
        description="Explore our partnerships with educational institutions, government bodies, and international organizations across South Sudan."
        canonical="/partners"
      />
      <JsonLd data={partnersPageSchema} />
      {/* Header with Image */}
      <section className="relative bg-gradient-hero text-primary-foreground py-16 overflow-hidden">
        <div className="absolute inset-0">
          <LazyImage
            src={partnershipHandshakeImage}
            alt="Partnership and collaboration"
            className="w-full h-full object-cover opacity-20"
            showSkeleton={false}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t("partners.title")}
            </h1>
            <p className="text-lg opacity-90">
              {t("partners.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Partnership Introduction with Image */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-foreground">
                  Building Strong Partnerships
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  At Genesis Examinations, we believe that collaboration is the foundation of educational excellence. We work closely with government bodies, international organizations, and educational institutions to deliver the highest quality examination services.
                </p>
                <p className="text-muted-foreground">
                  Our partnerships enable us to maintain the highest standards of quality, security, and innovation in educational assessment across South Sudan.
                </p>
              </div>
              <div>
                <LazyImage
                  src={partnersMeetingImage}
                  alt="Partnership meeting with educational leaders"
                  className="w-full h-80 object-cover rounded-xl shadow-elevated"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Schools Gallery */}
      <section className="py-16 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Our Partner Schools
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We proudly serve educational institutions across South Sudan, supporting thousands of students in their academic journey.
              </p>
            </div>
            
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {partnerSchools.map((school, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className="border-border shadow-card hover:shadow-elevated transition-all duration-300 overflow-hidden group">
                      <div className="aspect-video overflow-hidden">
                        <LazyImage
                          src={school.image}
                          alt={school.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="pt-4">
                        <h3 className="text-lg font-semibold text-foreground mb-1">
                          {school.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {school.location}, South Sudan
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          {school.students} Students
                        </Badge>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-4 lg:-left-12" />
              <CarouselNext className="hidden md:flex -right-4 lg:-right-12" />
            </Carousel>

            {/* Mobile scroll indicator */}
            <p className="text-center text-sm text-muted-foreground mt-4 md:hidden">
              Swipe to see more schools →
            </p>
          </div>
        </div>
      </section>

      {/* Partner Categories */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {partnerCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <Card key={index} className="border-border shadow-card">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground">
                          {category.title}
                        </h3>
                      </div>
                      <ul className="space-y-2">
                        {category.partners.map((partner, idx) => (
                          <li key={idx} className="text-muted-foreground flex items-start">
                            <span className="text-secondary mr-2">•</span>
                            <span>{partner}</span>
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

      {/* Certifications */}
      <section className="py-16 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
              Certifications & Standards
            </h2>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              Genesis Examinations maintains the highest standards of quality and security through rigorous certifications and compliance with international best practices.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {certifications.map((cert, index) => (
                <Badge key={index} variant="secondary" className="px-4 py-2 text-sm">
                  {cert}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recognition with Image */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <LazyImage
                  src={partnershipHandshakeImage}
                  alt="Professional partnership"
                  className="w-full h-80 object-cover rounded-xl shadow-elevated"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-8 text-foreground">
                  Recognition & Awards
                </h2>
                <div className="space-y-6">
                  <Card className="border-border shadow-card">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Award className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2 text-foreground">
                            Excellence in Educational Assessment
                          </h3>
                          <p className="text-muted-foreground text-sm">
                            Recognized for outstanding contribution to educational quality and assessment standards in South Sudan.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border shadow-card">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                          <Shield className="h-6 w-6 text-secondary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2 text-foreground">
                            Security Innovation Award
                          </h3>
                          <p className="text-muted-foreground text-sm">
                            Honored for implementing advanced security protocols that set new standards for exam integrity.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Interested in Partnership?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            We're always looking to collaborate with organizations that share our commitment to educational excellence and integrity.
          </p>
          <a href="mailto:partnerships@genesisexams.ss">
            <button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-6 py-3 rounded-md font-semibold transition-colors">
              Contact Partnership Team
            </button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Partners;
