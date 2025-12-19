import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LazyImage } from "@/components/ui/lazy-image";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/shared/contexts";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2, Send, MessageCircle, Loader2 } from "lucide-react";
import { PageMeta } from "@/components/seo";
import studentExamImage from "@/assets/student-exam.jpg";

interface FormData {
  institutionName: string;
  contactName: string;
  email: string;
  phone: string;
  examType: string;
  quantity: string;
  examDate: string;
  deliveryDate: string;
  additionalNotes: string;
}

interface FormErrors {
  institutionName?: string;
  contactName?: string;
  email?: string;
  phone?: string;
  examType?: string;
  quantity?: string;
  examDate?: string;
  deliveryDate?: string;
}

const OrderExams = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    institutionName: "",
    contactName: "",
    email: "",
    phone: "",
    examType: "",
    quantity: "",
    examDate: "",
    deliveryDate: "",
    additionalNotes: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const examTypes = [
    { value: "primary", label: t("order.examType.primary") },
    { value: "secondary", label: t("order.examType.secondary") },
    { value: "certificate", label: t("order.examType.certificate") },
    { value: "custom", label: t("order.examType.custom") },
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.institutionName.trim()) {
      newErrors.institutionName = t("order.error.institution");
    }
    if (!formData.contactName.trim()) {
      newErrors.contactName = t("order.error.contact");
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("order.error.email");
    }
    if (!formData.phone.trim() || !/^[\d\s+()-]{8,}$/.test(formData.phone)) {
      newErrors.phone = t("order.error.phone");
    }
    if (!formData.examType) {
      newErrors.examType = t("order.error.examType");
    }
    if (!formData.quantity || parseInt(formData.quantity) < 1) {
      newErrors.quantity = t("order.error.quantity");
    }
    if (!formData.examDate) {
      newErrors.examDate = t("order.error.examDate");
    }
    if (!formData.deliveryDate) {
      newErrors.deliveryDate = t("order.error.deliveryDate");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke("send-order-email", {
        body: {
          ...formData,
          quantity: parseInt(formData.quantity),
        },
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: t("order.success.title"),
        description: t("order.success.message"),
      });
    } catch (error: any) {
      console.error("Order submission error:", error);
      toast({
        title: t("order.error.title"),
        description: t("order.error.submit"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(
      `Hello Genesis Examinations! I would like to inquire about ordering exams for my institution.`
    );
    window.open(`https://wa.me/211920879329?text=${message}`, "_blank");
  };

  const resetForm = () => {
    setFormData({
      institutionName: "",
      contactName: "",
      email: "",
      phone: "",
      examType: "",
      quantity: "",
      examDate: "",
      deliveryDate: "",
      additionalNotes: "",
    });
    setIsSubmitted(false);
  };

  return (
    <main className="min-h-screen bg-background">
      <PageMeta
        title="Order Exams"
        description="Order examination materials for your South Sudanese educational institution. Fast, secure, and professional service."
        canonical="/order"
      />
      {/* Hero Section */}
      <section className="relative py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("order.title")}</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">{t("order.subtitle")}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Order Form */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">{t("order.form.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle2 className="w-16 h-16 text-accent mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{t("order.success.title")}</h3>
                    <p className="text-muted-foreground mb-6">{t("order.success.message")}</p>
                    <Button onClick={resetForm} variant="outline">
                      {t("order.newOrder")}
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Institution Details */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg border-b pb-2">{t("order.section.institution")}</h3>
                      
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="institutionName">{t("order.institutionName")} *</Label>
                          <Input
                            id="institutionName"
                            value={formData.institutionName}
                            onChange={(e) => handleChange("institutionName", e.target.value)}
                            className={errors.institutionName ? "border-destructive" : ""}
                          />
                          {errors.institutionName && (
                            <p className="text-sm text-destructive">{errors.institutionName}</p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="contactName">{t("order.contactName")} *</Label>
                          <Input
                            id="contactName"
                            value={formData.contactName}
                            onChange={(e) => handleChange("contactName", e.target.value)}
                            className={errors.contactName ? "border-destructive" : ""}
                          />
                          {errors.contactName && (
                            <p className="text-sm text-destructive">{errors.contactName}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">{t("order.email")} *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            className={errors.email ? "border-destructive" : ""}
                          />
                          {errors.email && (
                            <p className="text-sm text-destructive">{errors.email}</p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone">{t("order.phone")} *</Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                            className={errors.phone ? "border-destructive" : ""}
                          />
                          {errors.phone && (
                            <p className="text-sm text-destructive">{errors.phone}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Exam Details */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg border-b pb-2">{t("order.section.exam")}</h3>
                      
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="examType">{t("order.examType")} *</Label>
                          <Select value={formData.examType} onValueChange={(value) => handleChange("examType", value)}>
                            <SelectTrigger className={errors.examType ? "border-destructive" : ""}>
                              <SelectValue placeholder={t("order.examType.placeholder")} />
                            </SelectTrigger>
                            <SelectContent>
                              {examTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.examType && (
                            <p className="text-sm text-destructive">{errors.examType}</p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="quantity">{t("order.quantity")} *</Label>
                          <Input
                            id="quantity"
                            type="number"
                            min="1"
                            value={formData.quantity}
                            onChange={(e) => handleChange("quantity", e.target.value)}
                            className={errors.quantity ? "border-destructive" : ""}
                          />
                          {errors.quantity && (
                            <p className="text-sm text-destructive">{errors.quantity}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="examDate">{t("order.examDate")} *</Label>
                          <Input
                            id="examDate"
                            type="date"
                            value={formData.examDate}
                            onChange={(e) => handleChange("examDate", e.target.value)}
                            className={errors.examDate ? "border-destructive" : ""}
                          />
                          {errors.examDate && (
                            <p className="text-sm text-destructive">{errors.examDate}</p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="deliveryDate">{t("order.deliveryDate")} *</Label>
                          <Input
                            id="deliveryDate"
                            type="date"
                            value={formData.deliveryDate}
                            onChange={(e) => handleChange("deliveryDate", e.target.value)}
                            className={errors.deliveryDate ? "border-destructive" : ""}
                          />
                          {errors.deliveryDate && (
                            <p className="text-sm text-destructive">{errors.deliveryDate}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Additional Notes */}
                    <div className="space-y-2">
                      <Label htmlFor="additionalNotes">{t("order.additionalNotes")}</Label>
                      <Textarea
                        id="additionalNotes"
                        rows={4}
                        value={formData.additionalNotes}
                        onChange={(e) => handleChange("additionalNotes", e.target.value)}
                        placeholder={t("order.additionalNotes.placeholder")}
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {t("order.submitting")}
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          {t("order.submit")}
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Info Panel */}
            <div className="space-y-6">
              <LazyImage
                src={studentExamImage}
                alt="Students taking exam"
                className="w-full rounded-lg shadow-md"
              />

              <Card>
                <CardHeader>
                  <CardTitle>{t("order.info.title")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{t("order.info.description")}</p>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold">{t("order.info.process")}</h4>
                    <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                      <li>{t("order.info.step1")}</li>
                      <li>{t("order.info.step2")}</li>
                      <li>{t("order.info.step3")}</li>
                      <li>{t("order.info.step4")}</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-accent/10 border-accent">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    {t("order.whatsapp.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{t("order.whatsapp.description")}</p>
                  <Button onClick={handleWhatsAppContact} variant="outline" className="w-full">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    {t("order.whatsapp.button")}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default OrderExams;
