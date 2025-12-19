import { useLanguage } from "@/shared/contexts/LanguageContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { LazyImage } from "@/components/ui/lazy-image";
import { Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";
import { useToast } from "@/shared/hooks/use-toast";
import { JsonLd, localBusinessSchema, generateWebPageSchema, PageMeta } from "@/components/seo";
import customerSupportImage from "@/assets/customer-support.jpg";
import teamMeetingImage from "@/assets/team-meeting.jpg";

const contactPageSchema = generateWebPageSchema(
  "Contact Us - Genesis Examinations",
  "Get in touch with Genesis Examinations for examination services inquiries. Located in Juba, South Sudan.",
  "https://genesisexams.ss/contact"
);

const Contact = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    institution: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^[\d\s\-\+\(\)]+$/.test(phone) && phone.replace(/\D/g, "").length >= 9;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = t("contact.error.name");
    }
    if (!formData.institution.trim()) {
      newErrors.institution = t("contact.error.institution");
    }
    if (!formData.email.trim() || !validateEmail(formData.email)) {
      newErrors.email = t("contact.error.email");
    }
    if (!formData.phone.trim() || !validatePhone(formData.phone)) {
      newErrors.phone = t("contact.error.phone");
    }
    if (!formData.message.trim()) {
      newErrors.message = t("contact.error.message");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Simulate form submission
      console.log("Form submitted:", formData);
      setIsSubmitted(true);
      toast({
        title: "Success!",
        description: t("contact.success"),
      });

      // Reset form
      setTimeout(() => {
        setFormData({
          name: "",
          institution: "",
          email: "",
          phone: "",
          message: "",
        });
        setIsSubmitted(false);
      }, 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="min-h-screen">
      <PageMeta
        title="Contact Us"
        description="Get in touch with Genesis Examinations for examination services inquiries. Located in Juba, South Sudan."
        canonical="/contact"
      />
      <JsonLd data={contactPageSchema} />
      <JsonLd data={localBusinessSchema} />
      {/* Header with Image */}
      <section className="relative bg-gradient-hero text-primary-foreground py-16 overflow-hidden">
        <div className="absolute inset-0">
          <LazyImage
            src={customerSupportImage}
            alt="Customer support team"
            className="w-full h-full object-cover opacity-20"
            showSkeleton={false}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t("contact.title")}
            </h1>
            <p className="text-lg opacity-90">
              {t("contact.subtitle")}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div>
              <Card className="border-border shadow-card">
                <CardContent className="pt-6">
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="h-8 w-8 text-secondary" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2 text-foreground">
                        Thank You!
                      </h3>
                      <p className="text-muted-foreground">
                        {t("contact.success")}
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <Label htmlFor="name">{t("contact.name")}</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={errors.name ? "border-destructive" : ""}
                        />
                        {errors.name && (
                          <p className="text-sm text-destructive mt-1">{errors.name}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="institution">{t("contact.institution")}</Label>
                        <Input
                          id="institution"
                          name="institution"
                          value={formData.institution}
                          onChange={handleChange}
                          className={errors.institution ? "border-destructive" : ""}
                        />
                        {errors.institution && (
                          <p className="text-sm text-destructive mt-1">{errors.institution}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="email">{t("contact.email")}</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={errors.email ? "border-destructive" : ""}
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive mt-1">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="phone">{t("contact.phone")}</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className={errors.phone ? "border-destructive" : ""}
                        />
                        {errors.phone && (
                          <p className="text-sm text-destructive mt-1">{errors.phone}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="message">{t("contact.message")}</Label>
                        <Textarea
                          id="message"
                          name="message"
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          className={errors.message ? "border-destructive" : ""}
                        />
                        {errors.message && (
                          <p className="text-sm text-destructive mt-1">{errors.message}</p>
                        )}
                      </div>

                      <Button type="submit" className="w-full" size="lg">
                        {t("contact.submit")}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Support Image */}
              <div className="hidden lg:block">
                <LazyImage
                  src={teamMeetingImage}
                  alt="Our support team ready to help"
                  className="w-full h-48 object-cover rounded-xl shadow-card"
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6 text-foreground">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Email</p>
                      <a
                        href="mailto:info@genesisexams.ss"
                        className="text-muted-foreground hover:text-primary"
                      >
                        info@genesisexams.ss
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Phone</p>
                      <p className="text-muted-foreground">+211 XXX XXX XXX</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Address</p>
                      <p className="text-muted-foreground">
                        Main Office<br />
                        Juba, South Sudan
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="border-border shadow-card bg-gradient-section">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-foreground mb-3">Office Hours</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
                    <p>Saturday: 9:00 AM - 1:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 shadow-card bg-primary/5">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-foreground mb-3">
                    Response Time
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call our office directly.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
