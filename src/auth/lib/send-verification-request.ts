import type { EmailProviderSendVerificationRequestParams } from "next-auth/providers/email";

const resendApiKey = process.env["AUTH_RESEND_API_KEY"];
const emailFrom = process.env["AUTH_EMAIL_FROM"] ?? process.env["EMAIL_FROM"];

function buildHtml({
  identifier,
  url,
  host,
}: {
  identifier: string;
  url: string;
  host: string;
}) {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
      <h2>Sign in to ${host}</h2>
      <p>Use the button below to continue as ${identifier}.</p>
      <p>
        <a
          href="${url}"
          style="display: inline-block; padding: 12px 20px; color: #ffffff; background: #111827; border-radius: 6px; text-decoration: none;"
        >
          Open magic link
        </a>
      </p>
      <p>If the button does not work, paste this URL into your browser:</p>
      <p><a href="${url}">${url}</a></p>
    </div>
  `;
}

function buildText({
  identifier,
  url,
  host,
}: {
  identifier: string;
  url: string;
  host: string;
}) {
  return `Sign in to ${host}

Use this magic link to continue as ${identifier}:
${url}
`;
}

export async function sendVerificationRequest({
  identifier,
  url,
}: EmailProviderSendVerificationRequestParams) {
  const { host } = new URL(url);

  if (!resendApiKey || !emailFrom) {
    console.info(
      `[auth] Magic link for ${identifier}. Configure AUTH_RESEND_API_KEY and AUTH_EMAIL_FROM to send email. ${url}`,
    );
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${resendApiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: emailFrom,
      to: identifier,
      subject: `Sign in to ${host}`,
      html: buildHtml({ host, identifier, url }),
      text: buildText({ host, identifier, url }),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to send magic link email: ${response.status} ${errorText}`,
    );
  }
}
