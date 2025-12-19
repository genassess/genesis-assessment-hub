import { useLanguage } from "@/shared/contexts/LanguageContext";
import { useLoadingState } from "@/shared/hooks";
import { Card, CardContent } from "@/components/ui/card";
import { LazyImage } from "@/components/ui/lazy-image";
import { Quote } from "lucide-react";
import { TestimonialSkeleton, ImageSkeleton } from "@/components/skeletons";
import { Skeleton } from "@/components/ui/skeleton";
import { JsonLd, generateWebPageSchema, PageMeta } from "@/components/seo";
import testimonialEducatorImage from "@/assets/testimonial-educator.jpg";
import graduationCelebrationImage from "@/assets/graduation-celebration.jpg";

const testimonialsPageSchema = generateWebPageSchema(
  "Testimonials - Genesis Examinations",
  "Read what school administrators and educators say about Genesis Examinations services across South Sudan.",
  "https://genesisexams.ss/testimonials"
);

const Testimonials = () => {
  const { t } = useLanguage();
  const isLoading = useLoadingState(400);

  const testimonials = [
    {
      quote: "Genesis Examinations has transformed how we approach assessments. Their professionalism and attention to security gives us complete confidence.",
      author: "Dr. Sarah Johnson",
      position: "Principal, Juba International School",
      school: "Juba",
    },
    {
      quote: "The quality of exams and the support provided throughout the process has been exceptional. Our partnership with Genesis has elevated our standards.",
      author: "Michael Okello",
      position: "Director of Academics, Hope Secondary School",
      school: "Yei",
    },
    {
      quote: "Working with Genesis Examinations means we can focus on teaching while they handle the complexities of secure, fair assessment.",
      author: "Grace Ater",
      position: "Headteacher, Unity Primary School",
      school: "Wau",
    },
    {
      quote: "The team's understanding of our local context combined with international best practices makes them the ideal examination partner.",
      author: "Rev. Peter Majak",
      position: "School Administrator, St. Mary's College",
      school: "Malakal",
    },
    {
      quote: "Genesis Examinations doesn't just provide tests—they provide a complete assessment solution with support every step of the way.",
      author: "Angelina Taban",
      position: "Deputy Principal, Torit Girls School",
      school: "Torit",
    },
    {
      quote: "The integrity and security measures they employ give parents and teachers confidence in the examination results.",
      author: "James Kon",
      position: "Chair, School Board, Rumbek Academy",
      school: "Rumbek",
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
                <ImageSkeleton className="h-96" />
                <div className="space-y-4">
                  <Skeleton className="h-12 w-12" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-3/4" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <TestimonialSkeleton key={i} />
                ))}
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
        title="Testimonials"
        description="Read what school administrators and educators say about Genesis Examinations services across South Sudan."
        canonical="/testimonials"
      />
      <JsonLd data={testimonialsPageSchema} />
      {/* Header with Image */}
      <section className="relative bg-gradient-hero text-primary-foreground py-16 overflow-hidden">
        <div className="absolute inset-0">
          <LazyImage
            src={graduationCelebrationImage}
            alt="Students celebrating academic success"
            className="w-full h-full object-cover opacity-20"
            showSkeleton={false}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t("testimonials.title")}
            </h1>
            <p className="text-lg opacity-90">
              {t("testimonials.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Testimonial with Image */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <LazyImage
                  src={testimonialEducatorImage}
                  alt="South Sudanese educator"
                  className="w-full h-96 object-cover rounded-xl shadow-elevated"
                />
              </div>
              <div>
                <Quote className="h-12 w-12 text-primary/30 mb-4" />
                <p className="text-xl text-muted-foreground italic mb-6 leading-relaxed">
                  "Genesis Examinations has been instrumental in raising the standard of assessment in our school. Their commitment to security and quality gives our entire community confidence in the examination process."
                </p>
                <div>
                  <p className="font-semibold text-foreground text-lg">Mary Akech</p>
                  <p className="text-muted-foreground">Director of Education, Central South Sudan Schools Network</p>
                </div>
              </div>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border-border shadow-card hover:shadow-elevated transition-shadow">
                  <CardContent className="pt-6">
                    <Quote className="h-8 w-8 text-primary/20 mb-4" />
                    <p className="text-muted-foreground mb-6 italic">
                      "{testimonial.quote}"
                    </p>
                    <div className="border-t border-border pt-4">
                      <p className="font-semibold text-foreground">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                      <p className="text-sm text-primary mt-1">{testimonial.school}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Background */}
      <section className="relative py-16 bg-gradient-section overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <LazyImage
            src={graduationCelebrationImage}
            alt=""
            className="w-full h-full object-cover"
            showSkeleton={false}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
              Trusted Across South Sudan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">150+</div>
                <p className="text-muted-foreground">Partner Schools</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">50,000+</div>
                <p className="text-muted-foreground">Students Assessed</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">10</div>
                <p className="text-muted-foreground">States Covered</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-foreground">
              Join Our Network of Trusted Schools
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Educational institutions across South Sudan rely on Genesis Examinations for secure, professional assessment services. Become part of our growing community of partner schools.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
