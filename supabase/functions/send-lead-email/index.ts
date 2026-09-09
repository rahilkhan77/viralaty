declare const Deno: { env: { get(key: string): string | undefined } };

import { serve } from "https://deno.land/std@0.192.0/http/server.ts";

serve(async (req) => {
  // ✅ CORS preflight
  if (req?.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "*",
      },
    });
  }

  try {
    const body = await req?.json();
    const { type, data } = body;

    const RESEND_API_KEY = Deno?.env?.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not set");
    }

    let subject = "";
    let htmlContent = "";

    if (type === "booking") {
      subject = `📅 New Booking Request — ${data?.name} (${data?.company})`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #ffffff; border-radius: 12px; overflow: hidden;">
          <div style="background: #5E0ED7; padding: 24px 32px;">
            <h1 style="margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;">New Booking Request</h1>
            <p style="margin: 6px 0 0; font-size: 13px; opacity: 0.8;">Received via viralaty.com/booking</p>
          </div>
          <div style="padding: 32px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 12px; color: rgba(255,255,255,0.45); text-transform: uppercase; letter-spacing: 0.08em; width: 35%;">Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 14px; font-weight: 600;">${data?.name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 12px; color: rgba(255,255,255,0.45); text-transform: uppercase; letter-spacing: 0.08em;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 14px;"><a href="mailto:${data?.email}" style="color: #a78bfa; text-decoration: none;">${data?.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 12px; color: rgba(255,255,255,0.45); text-transform: uppercase; letter-spacing: 0.08em;">Company</td>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 14px; font-weight: 600;">${data?.company}</td>
              </tr>
              ${data?.website ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 12px; color: rgba(255,255,255,0.45); text-transform: uppercase; letter-spacing: 0.08em;">Website</td>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 14px;"><a href="${data?.website}" style="color: #a78bfa; text-decoration: none;">${data?.website}</a></td>
              </tr>` : ""}
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 12px; color: rgba(255,255,255,0.45); text-transform: uppercase; letter-spacing: 0.08em;">Budget</td>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 14px;">${data?.budget}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 12px; color: rgba(255,255,255,0.45); text-transform: uppercase; letter-spacing: 0.08em;">Service</td>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 14px;">${data?.service}</td>
              </tr>
              ${data?.message ? `
              <tr>
                <td style="padding: 10px 0; font-size: 12px; color: rgba(255,255,255,0.45); text-transform: uppercase; letter-spacing: 0.08em; vertical-align: top;">Message</td>
                <td style="padding: 10px 0; font-size: 14px; line-height: 1.6; color: rgba(255,255,255,0.85);">${data?.message?.replace(/\n/g, "<br>")}</td>
              </tr>` : ""}
            </table>
            <div style="margin-top: 28px; padding: 16px; background: rgba(94,14,215,0.15); border: 1px solid rgba(94,14,215,0.3); border-radius: 8px;">
              <p style="margin: 0; font-size: 12px; color: rgba(255,255,255,0.6);">Reply directly to <a href="mailto:${data?.email}" style="color: #a78bfa;">${data?.email}</a> to respond to this lead.</p>
            </div>
          </div>
          <div style="padding: 16px 32px; background: rgba(255,255,255,0.03); border-top: 1px solid rgba(255,255,255,0.06);">
            <p style="margin: 0; font-size: 11px; color: rgba(255,255,255,0.3);">Viralaty · Automated lead notification · viralaty.com</p>
          </div>
        </div>
      `;
    } else if (type === "contact") {
      subject = `💬 New Contact Message — ${data?.name} (${data?.company})`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #ffffff; border-radius: 12px; overflow: hidden;">
          <div style="background: #5E0ED7; padding: 24px 32px;">
            <h1 style="margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;">New Contact Message</h1>
            <p style="margin: 6px 0 0; font-size: 13px; opacity: 0.8;">Received via viralaty.com/contact</p>
          </div>
          <div style="padding: 32px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 12px; color: rgba(255,255,255,0.45); text-transform: uppercase; letter-spacing: 0.08em; width: 35%;">Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 14px; font-weight: 600;">${data?.name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 12px; color: rgba(255,255,255,0.45); text-transform: uppercase; letter-spacing: 0.08em;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 14px;"><a href="mailto:${data?.email}" style="color: #a78bfa; text-decoration: none;">${data?.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 12px; color: rgba(255,255,255,0.45); text-transform: uppercase; letter-spacing: 0.08em;">Company</td>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 14px; font-weight: 600;">${data?.company}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 12px; color: rgba(255,255,255,0.45); text-transform: uppercase; letter-spacing: 0.08em;">Budget</td>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 14px;">${data?.budget}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-size: 12px; color: rgba(255,255,255,0.45); text-transform: uppercase; letter-spacing: 0.08em; vertical-align: top;">Message</td>
                <td style="padding: 10px 0; font-size: 14px; line-height: 1.6; color: rgba(255,255,255,0.85);">${data?.message?.replace(/\n/g, "<br>")}</td>
              </tr>
            </table>
            <div style="margin-top: 28px; padding: 16px; background: rgba(94,14,215,0.15); border: 1px solid rgba(94,14,215,0.3); border-radius: 8px;">
              <p style="margin: 0; font-size: 12px; color: rgba(255,255,255,0.6);">Reply directly to <a href="mailto:${data?.email}" style="color: #a78bfa;">${data?.email}</a> to respond to this lead.</p>
            </div>
          </div>
          <div style="padding: 16px 32px; background: rgba(255,255,255,0.03); border-top: 1px solid rgba(255,255,255,0.06);">
            <p style="margin: 0; font-size: 11px; color: rgba(255,255,255,0.3);">Viralaty · Automated lead notification · viralaty.com</p>
          </div>
        </div>
      `;
    } else {
      throw new Error("Invalid type. Must be 'booking' or 'contact'.");
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: ["hello@viralaty.com"],
        reply_to: data?.email,
        subject,
        html: htmlContent,
      }),
    });

    const result = await res?.json();

    if (!res?.ok) {
      throw new Error(result.message || "Failed to send email via Resend");
    }

    return new Response(JSON.stringify({ success: true, id: result.id }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
});
