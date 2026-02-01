// src/lib/email/donationConfirmation.ts
export function donationEmailHTML(opts: {
    siteUrl: string;
    logoUrl: string;
    donorName?: string | null;
    amountText: string;
    currency: string;
    provider: "stripe" | "flutterwave";
    ref: string;
}) {
    const year = new Date().getFullYear();
    const name = (opts.donorName || "Friend").trim();

    const pill = "background:#f2f2f6; padding:8px 10px; border-radius:999px; display:inline-block; font-weight:700; font-size:12px; color:#111;";
    const btn = "display:inline-block;background:#111;color:#fff;text-decoration:none;padding:12px 16px;border-radius:14px;font-weight:800;font-size:13px;";

    return `
<div style="background:#f5f5f7; padding:28px 12px; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial;">
  <div style="max-width:680px; margin:0 auto;">
    <div style="text-align:center; margin-bottom:12px;">
      <img src="${opts.logoUrl}" width="56" height="56" alt="Clement Joshua Foundation" style="border-radius:14px; display:inline-block;"/>
      <div style="margin-top:10px; font-weight:800; color:#111; font-size:16px;">Clement Joshua Foundation</div>
      <div style="margin-top:2px; color:#555; font-size:12px;">Donation confirmation</div>
    </div>

    <div style="background:#fff; border:1px solid #e9e9ee; border-radius:18px; padding:18px;">
      <div style="${pill}">Payment confirmed</div>

      <h2 style="margin:12px 0 6px; color:#111; font-size:18px;">Thank you, ${name}.</h2>
      <p style="margin:0 0 10px; color:#555; font-size:14px; line-height:1.6;">
        We’ve received your donation of <b>${opts.amountText} ${opts.currency}</b>.
        Your support helps us deliver humanitarian aid, empowerment, and community programs.
      </p>

      <div style="border:1px solid #e9e9ee; border-radius:14px; padding:12px; margin-top:12px;">
        <div style="font-size:12px; color:#555; margin-bottom:8px;">Receipt details</div>
        <div style="font-size:13px; color:#111; line-height:1.7;">
          <div><b>Reference:</b> ${opts.ref}</div>
          <div><b>Processor:</b> ${opts.provider}</div>
        </div>
      </div>

      <div style="margin-top:16px; text-align:center;">
        <a href="${opts.siteUrl}/donate" style="${btn}">Donate again →</a>
      </div>

      <div style="margin-top:14px; border-top:1px solid #e9e9ee; padding-top:12px;">
        <div style="font-size:12px; color:#555; margin-bottom:8px;">Policies</div>
        <div style="display:flex; gap:8px; flex-wrap:wrap;">
          <a href="${opts.siteUrl}/policies/terms" style="${pill}">Terms</a>
          <a href="${opts.siteUrl}/policies/privacy" style="${pill}">Privacy</a>
          <a href="${opts.siteUrl}/policies/donor-privacy" style="${pill}">Donor Privacy</a>
        </div>
      </div>
    </div>

    <div style="text-align:center; color:#555; font-size:11px; margin-top:12px; line-height:1.6;">
      © ${year} Clement Joshua Foundation. All rights reserved.
    </div>
  </div>
</div>
  `;
}