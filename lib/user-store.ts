import { randomUUID } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export type StoredUser = {
  id: string;
  email: string;
  name: string;
  avatar: string | null;
  provider: "google";
  role: "user";
  plan: "free";
  created_at: string;
  updated_at: string;
};

type UserStore = {
  users: StoredUser[];
};

type OAuthUserInput = {
  email: string;
  name: string;
  avatar: string | null;
  provider: "google";
};

const usersFile = path.join(process.cwd(), "data", "users.json");
let userCache: StoredUser[] = [];

function isReadOnlyRuntime() {
  return Boolean(process.env.VERCEL || process.env.VERCEL_ENV);
}

async function readUsers(): Promise<UserStore> {
  if (userCache.length > 0) {
    return { users: userCache };
  }

  try {
    const content = await readFile(usersFile, "utf8");
    const data = JSON.parse(content) as UserStore;
    userCache = data.users ?? [];
    return { users: userCache };
  } catch (error) {
    console.warn("[user-store] Falling back to in-memory users", error);
    return { users: [] };
  }
}

async function writeUsers(data: UserStore) {
  userCache = data.users;

  if (isReadOnlyRuntime()) {
    console.info("[user-store] Skipped file persistence in read-only runtime");
    return;
  }

  await mkdir(path.dirname(usersFile), { recursive: true });
  await writeFile(usersFile, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

export async function getUserByEmail(email: string) {
  const data = await readUsers();
  return data.users.find((user) => user.email.toLowerCase() === email.toLowerCase()) ?? null;
}

export async function upsertOAuthUser(input: OAuthUserInput) {
  const data = await readUsers();
  const now = new Date().toISOString();
  const existingUser = data.users.find(
    (user) => user.email.toLowerCase() === input.email.toLowerCase()
  );

  if (existingUser) {
    existingUser.avatar = input.avatar;
    existingUser.name = input.name;
    existingUser.provider = input.provider;
    existingUser.updated_at = now;
    await writeUsers(data);
    return existingUser;
  }

  const user: StoredUser = {
    id: randomUUID(),
    avatar: input.avatar,
    created_at: now,
    email: input.email,
    name: input.name,
    plan: "free",
    provider: input.provider,
    role: "user",
    updated_at: now
  };

  data.users.push(user);
  await writeUsers(data);
  return user;
}
