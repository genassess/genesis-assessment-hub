import { useLanguage } from "@/shared/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { LazyImage } from "@/components/ui/lazy-image";
import { Shield, Award, Users, Target, Linkedin, Mail } from "lucide-react";
import { JsonLd, organizationSchema, generateWebPageSchema, PageMeta } from "@/components/seo";
import teamMeetingImage from "@/assets/team-meeting.jpg";
import classroomTeachingImage from "@/assets/classroom-teaching.jpg";
import teamCeoImage from "@/assets/team-ceo.jpg";
import teamEducationImage from "@/assets/team-education.jpg";
import teamOperationsImage from "@/assets/team-operations.jpg";
import teamQualityImage from "@/assets/team-quality.jpg";

const aboutPageSchema = generateWebPageSchema(
  "About Us - Genesis Examinations",
  "Learn about Genesis Examinations, our mission, values, and dedicated team serving South Sudan's educational institutions.",
  "https://genesisexams.ss/about"
);

const About = () => {
  const { t } = useLanguage();

  const values = [
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

  const teamMembers = [
    {
      name: t("about.team.member1.name"),
      role: t("about.team.member1.role"),
      bio: t("about.team.member1.bio"),
      image: teamCeoImage,
    },
    {
      name: t("about.team.member2.name"),
      role: t("about.team.member2.role"),
      bio: t("about.team.member2.bio"),
      image: teamEducationImage,
    },
    {
      name: t("about.team.member3.name"),
      role: t("about.team.member3.role"),
      bio: t("about.team.member3.bio"),
      image: teamOperationsImage,
    },
    {
      name: t("about.team.member4.name"),
      role: t("about.team.member4.role"),
      bio: t("about.team.member4.bio"),
      image: teamQualityImage,
    },
  ];

  return (
    <div className="min-h-screen">
      <PageMeta
        title="About Us"
        description="Learn about Genesis Examinations, our mission, values, and dedicated team serving South Sudan's educational institutions."
        canonical="/about"
      />
      <JsonLd data={aboutPageSchema} />
      <JsonLd data={organizationSchema} />
      {/* Header with Image */}
      <section className="relative bg-gradient-hero text-primary-foreground py-16 overflow-hidden">
        <div className="absolute inset-0">
          <LazyImage
            src={teamMeetingImage}
            alt="Genesis Examinations team meeting"
            className="w-full h-full object-cover opacity-20"
            showSkeleton={false}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t("about.title")}
            </h1>
            <p className="text-lg opacity-90">
              {t("about.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Mission with Image */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-4 text-foreground">
                      {t("about.mission.title")}
                    </h2>
                  </div>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t("about.mission.text")}
                </p>
              </div>
              <div className="order-1 lg:order-2">
                <LazyImage
                  src={classroomTeachingImage}
                  alt="Teacher helping students in South Sudan classroom"
                  className="w-full h-80 object-cover rounded-xl shadow-elevated"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gradient-section">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            {t("about.values.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="border-border shadow-card hover:shadow-elevated transition-shadow">
                  <CardContent className="pt-6 text-center">
                    <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-foreground">Our Story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Genesis Examinations was founded with a clear vision: to provide South Sudan's educational institutions with examination services that meet international standards while respecting local educational contexts.
              </p>
              <p>
                We understand the unique challenges facing schools in South Sudan, from infrastructure constraints to the need for culturally appropriate assessments. Our team combines expertise in educational assessment with deep knowledge of the local education system.
              </p>
              <p>
                Since our establishment, we have worked with numerous schools across the country, earning a reputation for reliability, security, and professionalism. We continue to innovate and improve our services to better serve South Sudan's educational community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                {t("about.team.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("about.team.subtitle")}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="border-border shadow-card hover:shadow-elevated transition-all duration-300 overflow-hidden group">
                  <div className="aspect-square overflow-hidden">
                    <LazyImage
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="pt-4 text-center">
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm text-primary font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
