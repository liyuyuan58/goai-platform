import { redirect } from "next/navigation";

type LoginPageProps = {
  searchParams: Promise<{ callbackUrl?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { callbackUrl } = await searchParams;
  const target = new URLSearchParams({ login: "1" });

  if (callbackUrl) {
    target.set("callbackUrl", callbackUrl);
  }

  redirect(`/en?${target.toString()}`);
}
