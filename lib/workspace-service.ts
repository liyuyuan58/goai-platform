import { blogPosts } from "@/lib/site";
import type { Session } from "next-auth";

export type WorkspaceUser = {
  avatar: string | null;
  email: string;
  memberPlan: string;
  name: string;
  provider: string;
};

export type RecentActivity = {
  label: string;
  timestamp: string;
};

export type SavedTool = {
  name: string;
  slug: string;
};

export type WorkspaceNews = {
  date: string;
  description: string;
  href: string;
  title: string;
};

export function getCurrentUser(session: Session): WorkspaceUser {
  return {
    avatar: session.user.image ?? null,
    email: session.user.email ?? "No email connected",
    memberPlan: session.user.plan === "free" ? "Free Plan" : session.user.plan,
    name: session.user.name ?? "GoAI User",
    provider: session.user.provider === "google" ? "Google" : session.user.provider
  };
}

export function getRecentActivity(): RecentActivity[] {
  return [
    { label: "Logged in", timestamp: "Today" },
    { label: "Visited AI Tools", timestamp: "This week" },
    { label: "Visited Regions", timestamp: "This week" },
    { label: "Visited Playbooks", timestamp: "This week" }
  ];
}

export function getSavedTools(): SavedTool[] {
  return [];
}

export function getLatestNews(locale: string): WorkspaceNews[] {
  return blogPosts.slice(0, 3).map((post) => ({
    date: post.date,
    description: post.description,
    href: `/${locale}/blog/${post.slug}`,
    title: post.title
  }));
}

export function getGreeting(date = new Date()) {
  const hour = date.getHours();

  if (hour < 12) {
    return "Good morning";
  }

  if (hour < 18) {
    return "Good afternoon";
  }

  return "Good evening";
}
