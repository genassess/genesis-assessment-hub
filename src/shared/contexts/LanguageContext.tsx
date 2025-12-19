import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About Us",
    "nav.services": "Services",
    "nav.testimonials": "Testimonials",
    "nav.partners": "Partners",
    "nav.contact": "Contact",
    "nav.faq": "FAQ",
    "nav.order": "Order Exams",
    
    // Hero
    "hero.title": "Trusted Educational Assessment Solutions for South Sudan",
    "hero.subtitle": "Empowering institutions with secure, high-quality examinations that maintain academic integrity and support educational excellence.",
    "hero.cta": "Contact Us Today",
    "hero.learn": "Learn More",
    
    // About
    "about.title": "About Genesis Examinations",
    "about.subtitle": "Leading provider of secure educational assessments in South Sudan",
    "about.mission.title": "Our Mission",
    "about.mission.text": "To provide educational institutions across South Sudan with reliable, secure, and professionally administered examination services that uphold the highest standards of academic integrity.",
    "about.values.title": "Our Values",
    "about.values.integrity": "Integrity",
    "about.values.integrity.text": "We maintain the highest standards of exam security and academic honesty.",
    "about.values.quality": "Quality",
    "about.values.quality.text": "Every assessment is carefully crafted to meet educational standards.",
    "about.values.trust": "Trust",
    "about.values.trust.text": "Schools rely on us to deliver consistent, professional examination services.",
    "about.team.title": "Meet Our Team",
    "about.team.subtitle": "Dedicated professionals committed to educational excellence in South Sudan",
    "about.team.member1.name": "James Akot Deng",
    "about.team.member1.role": "Chief Executive Officer",
    "about.team.member1.bio": "Over 20 years of experience in educational leadership, formerly serving as Director at the Ministry of Education.",
    "about.team.member2.name": "Grace Achol Mayen",
    "about.team.member2.role": "Director of Education",
    "about.team.member2.bio": "Curriculum development specialist with expertise in assessment design and educational standards.",
    "about.team.member3.name": "Peter Garang Bol",
    "about.team.member3.role": "Operations Manager",
    "about.team.member3.bio": "Ensures seamless exam logistics and delivery across South Sudan's diverse regions.",
    "about.team.member4.name": "Sarah Nyabol Kur",
    "about.team.member4.role": "Quality Assurance Lead",
    "about.team.member4.bio": "Maintains examination standards and integrity through rigorous quality control processes.",
    
    // Services
    "services.title": "Our Services",
    "services.subtitle": "Comprehensive examination solutions tailored to your institution's needs",
    "services.exam.title": "Examination Development",
    "services.exam.text": "Custom-designed assessments aligned with curriculum standards and educational objectives.",
    "services.admin.title": "Exam Administration",
    "services.admin.text": "Professional proctoring and logistics support to ensure fair and secure testing environments.",
    "services.security.title": "Security & Integrity",
    "services.security.text": "Advanced security protocols to protect exam content and maintain the validity of results.",
    "services.support.title": "Institutional Support",
    "services.support.text": "Dedicated guidance and consultation for schools throughout the examination process.",
    
    // Security Notice
    "security.title": "Exam Material Security",
    "security.message": "To maintain the integrity and validity of our assessments, we do not provide downloadable exam papers, samples, or answer keys. This policy protects the educational value of our examinations and ensures fair testing for all students.",
    "security.cta": "Contact us for more information about our secure examination processes.",
    
    // Testimonials
    "testimonials.title": "What Schools Say About Us",
    "testimonials.subtitle": "Trusted by educational institutions across South Sudan",
    
    // Partners
    "partners.title": "Our Partners & Accreditations",
    "partners.subtitle": "Collaborating with leading educational organizations",
    
    // Contact
    "contact.title": "Get in Touch",
    "contact.subtitle": "Ready to bring secure, professional examinations to your institution?",
    "contact.name": "Full Name",
    "contact.institution": "Institution Name",
    "contact.email": "Email Address",
    "contact.phone": "Phone Number",
    "contact.message": "Tell us about your needs",
    "contact.submit": "Send Inquiry",
    "contact.success": "Thank you! We'll contact you within 24 hours.",
    "contact.error.name": "Please enter your full name",
    "contact.error.institution": "Please enter your institution name",
    "contact.error.email": "Please enter a valid email address",
    "contact.error.phone": "Please enter a valid phone number",
    "contact.error.message": "Please describe your requirements",
    
    // FAQ
    "faq.title": "Frequently Asked Questions",
    "faq.q1": "How do I order examinations for my school?",
    "faq.a1": "You can place an order through our online Order Exams page or contact us directly. Fill out the form with your institution details, exam type, quantity, and preferred dates, and we'll guide you through the rest.",
    "faq.q2": "What security measures protect exam materials?",
    "faq.a2": "We use secure distribution channels, controlled access systems, and strict protocols to prevent unauthorized access to exam content.",
    "faq.q3": "Can I see sample questions before ordering?",
    "faq.a3": "We don't provide sample papers to maintain test security. However, we can discuss curriculum alignment and question formats during consultation.",
    "faq.q4": "What languages are exams available in?",
    "faq.a4": "Our examinations are available in English and can be adapted for multilingual educational contexts.",
    "faq.q5": "How far in advance should we order?",
    "faq.a5": "We recommend ordering at least 6-8 weeks before your planned examination date to ensure proper preparation and delivery.",
    "faq.q6": "What happens after I submit an order?",
    "faq.a6": "After submission, you'll receive an email confirmation. Our team will review your order and contact you within 24-48 hours with a quote and to confirm details.",
    "faq.q7": "What payment methods do you accept?",
    "faq.a7": "We accept bank transfers, mobile money, and institutional purchase orders. Payment details will be provided after order confirmation.",
    "faq.q8": "Can I modify or cancel my order?",
    "faq.a8": "Yes, you can request modifications or cancellations by contacting us at least 2 weeks before the delivery date. Changes may affect pricing and timeline.",
    "faq.q9": "Do you offer bulk discounts for large orders?",
    "faq.a9": "Yes, we offer discounted rates for bulk orders. Contact us with your requirements and we'll provide a customized quote.",
    "faq.q10": "Can I contact you via WhatsApp for urgent inquiries?",
    "faq.a10": "Absolutely! For urgent matters or quick questions, you can reach us directly via WhatsApp through the link on our Order Exams page.",
    
    // Footer
    "footer.about": "Genesis Examinations is South Sudan's trusted provider of secure, professional educational assessment services.",
    "footer.quick": "Quick Links",
    "footer.contact.title": "Contact Information",
    "footer.contact.email": "Email: genesisexaminations@gmail.com",
    "footer.contact.phone": "Phone: +211 920 879 329",
    "footer.rights": `© ${new Date().getFullYear()} Genesis Examinations. All rights reserved.`,

    // Order Exams
    "order.title": "Order Examinations",
    "order.subtitle": "Request secure examination materials for your institution",
    "order.form.title": "Examination Order Form",
    "order.section.institution": "Institution Details",
    "order.section.exam": "Exam Details",
    "order.institutionName": "Institution Name",
    "order.contactName": "Contact Person",
    "order.email": "Email Address",
    "order.phone": "Phone Number",
    "order.examType": "Exam Type",
    "order.examType.placeholder": "Select exam type",
    "order.examType.primary": "Primary Level Exams",
    "order.examType.secondary": "Secondary Level Exams",
    "order.examType.certificate": "Certificate Exams",
    "order.examType.custom": "Custom Assessment",
    "order.quantity": "Number of Copies",
    "order.examDate": "Planned Exam Date",
    "order.deliveryDate": "Required Delivery Date",
    "order.additionalNotes": "Additional Notes",
    "order.additionalNotes.placeholder": "Any special requirements or instructions...",
    "order.submit": "Submit Order",
    "order.submitting": "Submitting...",
    "order.newOrder": "Place Another Order",
    "order.success.title": "Order Submitted Successfully!",
    "order.success.message": "We have received your order and sent a confirmation to your email. Our team will contact you within 24-48 hours to confirm details and provide a quote.",
    "order.error.title": "Order Failed",
    "order.error.submit": "Failed to submit order. Please try again or contact us directly.",
    "order.error.institution": "Please enter your institution name",
    "order.error.contact": "Please enter contact person name",
    "order.error.email": "Please enter a valid email address",
    "order.error.phone": "Please enter a valid phone number",
    "order.error.examType": "Please select an exam type",
    "order.error.quantity": "Please enter a valid quantity",
    "order.error.examDate": "Please select an exam date",
    "order.error.deliveryDate": "Please select a delivery date",
    "order.info.title": "How It Works",
    "order.info.description": "Ordering examinations from Genesis is a straightforward process designed to ensure you receive secure, high-quality assessment materials on time.",
    "order.info.process": "Order Process:",
    "order.info.step1": "Submit your order through this form",
    "order.info.step2": "Receive confirmation and quote within 24-48 hours",
    "order.info.step3": "Confirm order and complete payment",
    "order.info.step4": "Receive secure exam materials before your delivery date",
    "order.whatsapp.title": "Need Quick Assistance?",
    "order.whatsapp.description": "For urgent inquiries or immediate assistance, contact us directly via WhatsApp.",
    "order.whatsapp.button": "Chat on WhatsApp",
  },
  ar: {
    // Navigation
    "nav.home": "الرئيسية",
    "nav.about": "من نحن",
    "nav.services": "خدماتنا",
    "nav.testimonials": "الشهادات",
    "nav.partners": "الشركاء",
    "nav.contact": "اتصل بنا",
    "nav.faq": "الأسئلة الشائعة",
    "nav.order": "طلب الامتحانات",
    
    // Hero
    "hero.title": "حلول تقييم تعليمية موثوقة لجنوب السودان",
    "hero.subtitle": "تمكين المؤسسات من خلال امتحانات آمنة وعالية الجودة تحافظ على النزاهة الأكاديمية وتدعم التميز التعليمي.",
    "hero.cta": "اتصل بنا اليوم",
    "hero.learn": "اعرف المزيد",
    
    // About
    "about.title": "عن جينيسيس للامتحانات",
    "about.subtitle": "المزود الرائد للتقييمات التعليمية الآمنة في جنوب السودان",
    "about.mission.title": "مهمتنا",
    "about.mission.text": "تزويد المؤسسات التعليمية في جميع أنحاء جنوب السودان بخدمات امتحانات موثوقة وآمنة ومُدارة باحترافية تلتزم بأعلى معايير النزاهة الأكاديمية.",
    "about.values.title": "قيمنا",
    "about.values.integrity": "النزاهة",
    "about.values.integrity.text": "نحافظ على أعلى معايير أمن الامتحانات والصدق الأكاديمي.",
    "about.values.quality": "الجودة",
    "about.values.quality.text": "يتم إعداد كل تقييم بعناية لتلبية المعايير التعليمية.",
    "about.values.trust": "الثقة",
    "about.values.trust.text": "تعتمد المدارس علينا لتقديم خدمات امتحانات متسقة واحترافية.",
    "about.team.title": "تعرف على فريقنا",
    "about.team.subtitle": "محترفون متخصصون ملتزمون بالتميز التعليمي في جنوب السودان",
    "about.team.member1.name": "جيمس أكوت دينق",
    "about.team.member1.role": "الرئيس التنفيذي",
    "about.team.member1.bio": "أكثر من 20 عاماً من الخبرة في القيادة التعليمية، شغل سابقاً منصب مدير في وزارة التربية.",
    "about.team.member2.name": "غريس أشول ماين",
    "about.team.member2.role": "مديرة التعليم",
    "about.team.member2.bio": "متخصصة في تطوير المناهج مع خبرة في تصميم التقييمات والمعايير التعليمية.",
    "about.team.member3.name": "بيتر قرنق بول",
    "about.team.member3.role": "مدير العمليات",
    "about.team.member3.bio": "يضمن لوجستيات وتسليم الامتحانات بسلاسة عبر مناطق جنوب السودان المتنوعة.",
    "about.team.member4.name": "سارة نيابول كور",
    "about.team.member4.role": "رئيسة ضمان الجودة",
    "about.team.member4.bio": "تحافظ على معايير ونزاهة الامتحانات من خلال عمليات رقابة جودة صارمة.",
    
    // Services
    "services.title": "خدماتنا",
    "services.subtitle": "حلول امتحانات شاملة مصممة لتلبية احتياجات مؤسستك",
    "services.exam.title": "تطوير الامتحانات",
    "services.exam.text": "تقييمات مصممة خصيصاً ومتوافقة مع معايير المناهج والأهداف التعليمية.",
    "services.admin.title": "إدارة الامتحانات",
    "services.admin.text": "مراقبة احترافية ودعم لوجستي لضمان بيئات اختبار عادلة وآمنة.",
    "services.security.title": "الأمان والنزاهة",
    "services.security.text": "بروتوكولات أمان متقدمة لحماية محتوى الامتحانات والحفاظ على صحة النتائج.",
    "services.support.title": "دعم المؤسسات",
    "services.support.text": "إرشاد واستشارات مخصصة للمدارس طوال عملية الامتحانات.",
    
    // Security Notice
    "security.title": "أمان مواد الامتحانات",
    "security.message": "للحفاظ على نزاهة وصحة تقييماتنا، لا نوفر أوراق امتحانات أو نماذج أو مفاتيح إجابات قابلة للتحميل. هذه السياسة تحمي القيمة التعليمية لامتحاناتنا وتضمن اختباراً عادلاً لجميع الطلاب.",
    "security.cta": "اتصل بنا لمزيد من المعلومات حول عمليات الامتحانات الآمنة لدينا.",
    
    // Testimonials
    "testimonials.title": "ماذا تقول المدارس عنا",
    "testimonials.subtitle": "موثوق من قبل المؤسسات التعليمية في جميع أنحاء جنوب السودان",
    
    // Partners
    "partners.title": "شركاؤنا واعتماداتنا",
    "partners.subtitle": "التعاون مع المنظمات التعليمية الرائدة",
    
    // Contact
    "contact.title": "تواصل معنا",
    "contact.subtitle": "هل أنت مستعد لإحضار امتحانات آمنة واحترافية إلى مؤسستك؟",
    "contact.name": "الاسم الكامل",
    "contact.institution": "اسم المؤسسة",
    "contact.email": "البريد الإلكتروني",
    "contact.phone": "رقم الهاتف",
    "contact.message": "أخبرنا عن احتياجاتك",
    "contact.submit": "إرسال الاستفسار",
    "contact.success": "شكراً لك! سنتواصل معك خلال 24 ساعة.",
    "contact.error.name": "يرجى إدخال اسمك الكامل",
    "contact.error.institution": "يرجى إدخال اسم المؤسسة",
    "contact.error.email": "يرجى إدخال بريد إلكتروني صحيح",
    "contact.error.phone": "يرجى إدخال رقم هاتف صحيح",
    "contact.error.message": "يرجى وصف متطلباتك",
    
    // FAQ
    "faq.title": "الأسئلة المتكررة",
    "faq.q1": "كيف أطلب امتحانات لمدرستي؟",
    "faq.a1": "يمكنك تقديم طلب من خلال صفحة طلب الامتحانات عبر الإنترنت أو الاتصال بنا مباشرة. املأ النموذج بتفاصيل مؤسستك ونوع الامتحان والكمية والتواريخ المفضلة، وسنرشدك خلال الباقي.",
    "faq.q2": "ما هي الإجراءات الأمنية التي تحمي مواد الامتحانات؟",
    "faq.a2": "نستخدم قنوات توزيع آمنة وأنظمة وصول محكومة وبروتوكولات صارمة لمنع الوصول غير المصرح به لمحتوى الامتحانات.",
    "faq.q3": "هل يمكنني رؤية نماذج أسئلة قبل الطلب؟",
    "faq.a3": "لا نقدم أوراق نماذج للحفاظ على أمن الاختبارات. ومع ذلك، يمكننا مناقشة توافق المناهج وأشكال الأسئلة أثناء الاستشارة.",
    "faq.q4": "بأي لغات تتوفر الامتحانات؟",
    "faq.a4": "امتحاناتنا متوفرة باللغة الإنجليزية ويمكن تكييفها للسياقات التعليمية متعددة اللغات.",
    "faq.q5": "كم من الوقت مقدماً يجب أن نطلب؟",
    "faq.a5": "نوصي بالطلب قبل 6-8 أسابيع على الأقل من تاريخ الامتحان المخطط له لضمان التحضير والتسليم المناسبين.",
    "faq.q6": "ماذا يحدث بعد تقديم الطلب؟",
    "faq.a6": "بعد التقديم، ستتلقى تأكيداً بالبريد الإلكتروني. سيراجع فريقنا طلبك ويتصل بك خلال 24-48 ساعة مع عرض سعر وتأكيد التفاصيل.",
    "faq.q7": "ما طرق الدفع التي تقبلونها؟",
    "faq.a7": "نقبل التحويلات البنكية والأموال عبر الهاتف المحمول وأوامر الشراء المؤسسية. سيتم تقديم تفاصيل الدفع بعد تأكيد الطلب.",
    "faq.q8": "هل يمكنني تعديل أو إلغاء طلبي؟",
    "faq.a8": "نعم، يمكنك طلب تعديلات أو إلغاءات عن طريق الاتصال بنا قبل أسبوعين على الأقل من تاريخ التسليم. قد تؤثر التغييرات على الأسعار والجدول الزمني.",
    "faq.q9": "هل تقدمون خصومات للطلبات الكبيرة؟",
    "faq.a9": "نعم، نقدم أسعاراً مخفضة للطلبات الكبيرة. اتصل بنا بمتطلباتك وسنقدم لك عرض سعر مخصص.",
    "faq.q10": "هل يمكنني الاتصال بكم عبر واتساب للاستفسارات العاجلة؟",
    "faq.a10": "بالتأكيد! للأمور العاجلة أو الأسئلة السريعة، يمكنك الوصول إلينا مباشرة عبر واتساب من خلال الرابط في صفحة طلب الامتحانات.",
    
    // Footer
    "footer.about": "جينيسيس للامتحانات هي المزود الموثوق لخدمات التقييم التعليمي الآمنة والاحترافية في جنوب السودان.",
    "footer.quick": "روابط سريعة",
    "footer.contact.title": "معلومات الاتصال",
    "footer.contact.email": "البريد الإلكتروني: genesisexaminations@gmail.com",
    "footer.contact.phone": "الهاتف: +211 920 879 329",
    "footer.rights": "© 2024 جينيسيس للامتحانات. جميع الحقوق محفوظة.",

    // Order Exams
    "order.title": "طلب الامتحانات",
    "order.subtitle": "اطلب مواد امتحانات آمنة لمؤسستك",
    "order.form.title": "نموذج طلب الامتحانات",
    "order.section.institution": "تفاصيل المؤسسة",
    "order.section.exam": "تفاصيل الامتحان",
    "order.institutionName": "اسم المؤسسة",
    "order.contactName": "الشخص المسؤول",
    "order.email": "البريد الإلكتروني",
    "order.phone": "رقم الهاتف",
    "order.examType": "نوع الامتحان",
    "order.examType.placeholder": "اختر نوع الامتحان",
    "order.examType.primary": "امتحانات المرحلة الابتدائية",
    "order.examType.secondary": "امتحانات المرحلة الثانوية",
    "order.examType.certificate": "امتحانات الشهادات",
    "order.examType.custom": "تقييم مخصص",
    "order.quantity": "عدد النسخ",
    "order.examDate": "تاريخ الامتحان المخطط",
    "order.deliveryDate": "تاريخ التسليم المطلوب",
    "order.additionalNotes": "ملاحظات إضافية",
    "order.additionalNotes.placeholder": "أي متطلبات أو تعليمات خاصة...",
    "order.submit": "إرسال الطلب",
    "order.submitting": "جاري الإرسال...",
    "order.newOrder": "تقديم طلب آخر",
    "order.success.title": "تم تقديم الطلب بنجاح!",
    "order.success.message": "لقد تلقينا طلبك وأرسلنا تأكيداً إلى بريدك الإلكتروني. سيتواصل معك فريقنا خلال 24-48 ساعة لتأكيد التفاصيل وتقديم عرض السعر.",
    "order.error.title": "فشل الطلب",
    "order.error.submit": "فشل في تقديم الطلب. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة.",
    "order.error.institution": "يرجى إدخال اسم المؤسسة",
    "order.error.contact": "يرجى إدخال اسم الشخص المسؤول",
    "order.error.email": "يرجى إدخال بريد إلكتروني صحيح",
    "order.error.phone": "يرجى إدخال رقم هاتف صحيح",
    "order.error.examType": "يرجى اختيار نوع الامتحان",
    "order.error.quantity": "يرجى إدخال كمية صحيحة",
    "order.error.examDate": "يرجى اختيار تاريخ الامتحان",
    "order.error.deliveryDate": "يرجى اختيار تاريخ التسليم",
    "order.info.title": "كيف يعمل",
    "order.info.description": "طلب الامتحانات من جينيسيس عملية مباشرة مصممة لضمان حصولك على مواد تقييم آمنة وعالية الجودة في الوقت المحدد.",
    "order.info.process": "عملية الطلب:",
    "order.info.step1": "قدم طلبك من خلال هذا النموذج",
    "order.info.step2": "احصل على التأكيد وعرض السعر خلال 24-48 ساعة",
    "order.info.step3": "أكد الطلب وأكمل الدفع",
    "order.info.step4": "استلم مواد الامتحانات الآمنة قبل تاريخ التسليم",
    "order.whatsapp.title": "تحتاج مساعدة سريعة؟",
    "order.whatsapp.description": "للاستفسارات العاجلة أو المساعدة الفورية، اتصل بنا مباشرة عبر واتساب.",
    "order.whatsapp.button": "الدردشة على واتساب",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    // Check localStorage first for user preference
    const savedLanguage = localStorage.getItem("genesis-language") as Language | null;
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ar")) {
      setLanguageState(savedLanguage);
      return;
    }

    // Auto-detect from browser languages
    const browserLanguages = navigator.languages || [navigator.language];
    const hasArabic = browserLanguages.some(lang => 
      lang.startsWith("ar") || lang === "ar"
    );
    
    if (hasArabic) {
      setLanguageState("ar");
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("genesis-language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div dir={language === "ar" ? "rtl" : "ltr"}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};
