export const siteConfig = {
  clarityProjectId: process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? "",
  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-N41JNP1RTP",
  name: "GoAI",
  ogImage: "/brand/logo-primary-slogan.svg",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://goaihub.xyz",
  twitterHandle: "@goai"
};
