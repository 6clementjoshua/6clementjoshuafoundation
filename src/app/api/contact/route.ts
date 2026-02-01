// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase/admin";

type Payload = {
    name: string;
    email: string;
    topic: string;
    message: string;

    // honeypot
    company?: string;
};

function isEmail(s: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
}
function clean(s: string, max = 4000) {
    return String(s ?? "").trim().slice(0, max);
}

function emailStyles() {
    return {
        bg: "#f5f5f7",
        card: "#ffffff",
        text: "#111111",
        muted: "#555555",
        line: "#e9e9ee",
        pill: "#f2f2f6",
        btn: "#111111",
        btnText: "#ffffff",
    };
}

function userConfirmationEmail(opts: {
    siteUrl: string;
    logoUrl: string;
    name: string;
    email: string;
    topic: string;
    messageId: string;
}) {
    const s = emailStyles();
    const policies = [
        { label: "Terms", href: `${opts.siteUrl}/policies/terms` },
        { label: "Privacy", href: `${opts.siteUrl}/policies/privacy` },
        { label: "Donor Privacy", href: `${opts.siteUrl}/policies/donor-privacy` },
    ];

    return {
        subject: "We received your message — Clement Joshua Foundation",
        html: `
<div style="background:${s.bg}; padding:28px 12px; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial;">
  <div style="max-width:680px; margin:0 auto;">
    <div style="text-align:center; margin-bottom:12px;">
      <img src="${opts.logoUrl}" width="56" height="56" alt="Clement Joshua Foundation" style="border-radius:14px; display:inline-block;"/>
      <div style="margin-top:10px; font-weight:700; color:${s.text}; font-size:16px;">Clement Joshua Foundation</div>
      <div style="margin-top:2px; color:${s.muted}; font-size:12px;">Incorporated Trustees • CAC No. 8447002 • Founded 2011</div>
    </div>

    <div style="background:${s.card}; border:1px solid ${s.line}; border-radius:18px; padding:18px;">
      <div style="display:inline-block; background:${s.pill}; color:${s.text}; border-radius:999px; padding:6px 10px; font-size:12px; font-weight:600;">
        Message received
      </div>

      <h2 style="margin:12px 0 6px; color:${s.text}; font-size:18px;">Thanks, ${opts.name}.</h2>
      <p style="margin:0 0 10px; color:${s.muted}; font-size:14px; line-height:1.6;">
        We’ve received your message and our team will review it. If your request relates to urgent assistance,
        please include any relevant details and location so we can assess responsibly.
      </p>

      <div style="border:1px solid ${s.line}; border-radius:14px; padding:12px; margin-top:12px;">
        <div style="font-size:12px; color:${s.muted}; margin-bottom:8px;">Your submission</div>
        <div style="font-size:13px; color:${s.text}; line-height:1.6;">
          <div><b>Topic:</b> ${opts.topic}</div>
          <div><b>Reference:</b> ${opts.messageId}</div>
          <div><b>Email:</b> ${opts.email}</div>
        </div>
      </div>

      <div style="margin-top:14px; padding:12px; background:#fafafd; border:1px solid ${s.line}; border-radius:14px;">
        <div style="font-size:12px; color:${s.muted}; margin-bottom:6px; font-weight:600;">What we do</div>
        <div style="font-size:13px; color:${s.text}; line-height:1.6;">
          Emergency aid • Empowerment • Community support — delivered transparently across Nigeria and internationally.
        </div>
      </div>

      <div style="margin-top:16px; text-align:center;">
        <a href="${opts.siteUrl}/donate"
           style="display:inline-block; background:${s.btn}; color:${s.btnText}; text-decoration:none; padding:12px 16px; border-radius:14px; font-weight:700; font-size:13px;">
          Donate to support our work →
        </a>
      </div>

      <div style="margin-top:14px; border-top:1px solid ${s.line}; padding-top:12px;">
        <div style="font-size:12px; color:${s.muted}; margin-bottom:8px;">Policies</div>
        <div style="display:flex; gap:8px; flex-wrap:wrap;">
          ${policies
                .map(
                    (p) => `
            <a href="${p.href}" style="font-size:12px; color:${s.text}; text-decoration:none; background:${s.pill}; padding:8px 10px; border-radius:999px; font-weight:600;">
              ${p.label}
            </a>`
                )
                .join("")}
        </div>
      </div>
    </div>

    <div style="text-align:center; color:${s.muted}; font-size:11px; margin-top:12px; line-height:1.6;">
      © ${new Date().getFullYear()} Clement Joshua Foundation. All rights reserved.<br/>
      If you didn’t submit this request, you can ignore this email.
    </div>
  </div>
</div>
    `,
    };
}

function adminNotificationEmail(opts: {
    siteUrl: string;
    name: string;
    email: string;
    topic: string;
    message: string;
    messageId: string;
    ip?: string | null;
    ua?: string | null;
}) {
    const s = emailStyles();
    const safeMessage = opts.message
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");

    return {
        subject: `New Contact — ${opts.topic}`,
        html: `
<div style="background:${s.bg}; padding:24px 12px; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial;">
  <div style="max-width:760px; margin:0 auto;">
    <div style="background:${s.card}; border:1px solid ${s.line}; border-radius:18px; padding:18px;">
      <div style="display:flex; justify-content:space-between; gap:10px; flex-wrap:wrap;">
        <div style="font-weight:800; color:${s.text};">Clement Joshua Foundation — Contact</div>
        <div style="font-size:12px; color:${s.muted};">Ref: <b>${opts.messageId}</b></div>
      </div>

      <div style="margin-top:12px; border:1px solid ${s.line}; border-radius:14px; padding:12px;">
        <div style="font-size:13px; color:${s.text}; line-height:1.7;">
          <div><b>Name:</b> ${opts.name}</div>
          <div><b>Email:</b> ${opts.email}</div>
          <div><b>Topic:</b> ${opts.topic}</div>
          <div><b>IP:</b> ${opts.ip ?? "-"}</div>
        </div>
      </div>

      <div style="margin-top:12px; padding:12px; background:#fafafd; border:1px solid ${s.line}; border-radius:14px;">
        <div style="font-size:12px; color:${s.muted}; font-weight:700; margin-bottom:8px;">Message</div>
        <div style="white-space:pre-wrap; font-size:13px; color:${s.text}; line-height:1.7;">${safeMessage}</div>
      </div>

      <div style="margin-top:12px; font-size:12px; color:${s.muted};">
        User-Agent: ${opts.ua ?? "-"}
      </div>
    </div>
  </div>
</div>
    `,
    };
}

export async function POST(req: Request) {
    try {
        const body = (await req.json()) as Payload;

        // Honeypot check
        if (body.company && body.company.trim().length > 0) {
            return NextResponse.json({ ok: true }, { status: 200 });
        }

        const name = clean(body.name, 120);
        const email = clean(body.email, 200);
        const topic = clean(body.topic, 80) || "General inquiry";
        const message = clean(body.message, 4000);

        if (!name || !email || !message) {
            return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
        }
        if (!isEmail(email)) {
            return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
        }

        const ip =
            req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
            req.headers.get("x-real-ip") ??
            null;
        const ua = req.headers.get("user-agent") ?? null;

        const sb = supabaseAdmin();

        // Save to DB
        const { data, error } = await sb
            .from("contact_messages")
            .insert({
                name,
                email,
                topic,
                message,
                ip,
                user_agent: ua,
                status: "received",
            })
            .select("id")
            .single();

        if (error || !data?.id) {
            return NextResponse.json({ ok: false, error: "DB insert failed" }, { status: 500 });
        }

        const messageId = data.id as string;

        // Email setup
        const resendKey = process.env.RESEND_API_KEY!;
        const from = process.env.CONTACT_FROM_EMAIL!;
        const to = process.env.CONTACT_TO_EMAIL!;
        const siteUrl = (process.env.SITE_URL || "http://localhost:3000").replace(/\/$/, "");
        const logoUrl = `${siteUrl}/6logo.PNG`;

        if (!resendKey || !from || !to) {
            return NextResponse.json({ ok: false, error: "Missing email env vars" }, { status: 500 });
        }

        const resend = new Resend(resendKey);

        // 1) Admin notification
        const adminEmail = adminNotificationEmail({
            siteUrl,
            name,
            email,
            topic,
            message,
            messageId,
            ip,
            ua,
        });

        await resend.emails.send({
            from,
            to,
            subject: adminEmail.subject,
            html: adminEmail.html,
            replyTo: email,
        });

        // 2) User confirmation
        const userEmail = userConfirmationEmail({
            siteUrl,
            logoUrl,
            name,
            email,
            topic,
            messageId,
        });

        await resend.emails.send({
            from,
            to: email,
            subject: userEmail.subject,
            html: userEmail.html,
        });

        // Mark status
        await sb.from("contact_messages").update({ status: "emailed" }).eq("id", messageId);

        return NextResponse.json({ ok: true, id: messageId }, { status: 200 });
    } catch {
        return NextResponse.json({ ok: false, error: "Unexpected error" }, { status: 500 });
    }
}