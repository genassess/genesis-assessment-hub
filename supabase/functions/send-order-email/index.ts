import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OrderEmailRequest {
  institutionName: string;
  contactName: string;
  email: string;
  phone: string;
  examType: string;
  quantity: number;
  examDate: string;
  deliveryDate: string;
  additionalNotes: string;
}

const sendEmail = async (to: string[], subject: string, html: string) => {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Genesis Examinations <onboarding@resend.dev>",
      to,
      subject,
      html,
    }),
  });
  
  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to send email: ${error}`);
  }
  
  return res.json();
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const orderData: OrderEmailRequest = await req.json();
    console.log("Received order data:", orderData);

    // Send confirmation email to customer
    const customerHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1e3a5f;">Thank You for Your Order!</h1>
        <p>Dear ${orderData.contactName},</p>
        <p>We have received your examination order from <strong>${orderData.institutionName}</strong>. Our team will review your request and contact you within 24-48 hours to confirm details and provide a quote.</p>
        
        <h2 style="color: #2d5a3d;">Order Summary</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Institution:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${orderData.institutionName}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Exam Type:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${orderData.examType}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Quantity:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${orderData.quantity} copies</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Exam Date:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${orderData.examDate}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Delivery Date:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${orderData.deliveryDate}</td></tr>
        </table>
        
        ${orderData.additionalNotes ? `<p><strong>Additional Notes:</strong> ${orderData.additionalNotes}</p>` : ''}
        
        <p style="margin-top: 20px;">If you have any questions, please don't hesitate to contact us.</p>
        <p>Best regards,<br>Genesis Examinations Team</p>
      </div>
    `;

    await sendEmail([orderData.email], "Order Confirmation - Genesis Examinations", customerHtml);
    console.log("Customer email sent successfully");

    // Send notification email to admin
    const adminHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1e3a5f;">New Examination Order Received</h1>
        
        <h2 style="color: #2d5a3d;">Contact Information</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Contact Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${orderData.contactName}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Institution:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${orderData.institutionName}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${orderData.email}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Phone:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${orderData.phone}</td></tr>
        </table>
        
        <h2 style="color: #2d5a3d;">Order Details</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Exam Type:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${orderData.examType}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Quantity:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${orderData.quantity} copies</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Exam Date:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${orderData.examDate}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Delivery Date:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${orderData.deliveryDate}</td></tr>
        </table>
        
        ${orderData.additionalNotes ? `<p><strong>Additional Notes:</strong> ${orderData.additionalNotes}</p>` : ''}
        
        <p style="margin-top: 20px; color: #666;">Please follow up with this order within 24-48 hours.</p>
      </div>
    `;

    await sendEmail(["info@genesisexams.ss"], `New Exam Order - ${orderData.institutionName}`, adminHtml);
    console.log("Admin email sent successfully");

    return new Response(
      JSON.stringify({ success: true, message: "Order emails sent successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-order-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
