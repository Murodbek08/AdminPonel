import { http, HttpResponse, delay } from "msw";
import type { User, Role } from "@/shared/types";
import { usersDb, rolesDb, paymentsDb, reportsDb } from "./db";

function createMockToken(user: Omit<User, "password">): string {
  const payload = btoa(
    JSON.stringify({
      sub: user.id,
      email: user.email,
      roles: user.roles,
      iat: Date.now(),
      exp: Date.now() + 24 * 60 * 60 * 1000, // 24 soat
    }),
  );
  return `mock.${payload}.signature`;
}

function parseToken(
  token: string,
): { sub: number; email: string; roles: Role[] } | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    return JSON.parse(atob(parts[1]));
  } catch {
    return null;
  }
}

function getAuthUser(request: Request) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;
  const token = authHeader.slice(7);
  const payload = parseToken(token);
  if (!payload) return null;
  return usersDb.find((u) => u.id === payload.sub) ?? null;
}

function paginate<T>(
  items: T[],
  page: number,
  pageSize: number,
): {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
} {
  const total = items.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const data = items.slice(start, start + pageSize);
  return { data, total, page, pageSize, totalPages };
}

let nextId = Math.max(...usersDb.map((u) => u.id)) + 1;

// HANDLERS
export const handlers = [
  http.post("/api/auth/login", async ({ request }) => {
    await delay(600);
    const body = (await request.json()) as { email: string; password: string };

    const user = usersDb.find((u) => u.email === body.email);
    if (!user) {
      return HttpResponse.json(
        { message: "Bu email ro'yxatdan o'tmagan" },
        { status: 401 },
      );
    }

    if (user.password !== body.password) {
      return HttpResponse.json({ message: "Parol noto'g'ri" }, { status: 401 });
    }

    if (!user.roles || user.roles.length === 0) {
      return HttpResponse.json(
        { message: "Sizda tizimga kirish uchun kerakli rol mavjud emas!" },
        { status: 403 },
      );
    }

    const { password: _, ...userWithoutPassword } = user;
    const token = createMockToken(userWithoutPassword);

    return HttpResponse.json({ token, user: userWithoutPassword });
  }),

  http.get("/api/auth/me", async ({ request }) => {
    await delay(600);

    const user = getAuthUser(request);
    if (!user) {
      return HttpResponse.json({ message: "Token yaroqsiz" }, { status: 401 });
    }

    const { password: _, ...userWithoutPassword } = user;
    return HttpResponse.json(userWithoutPassword);
  }),

  http.get("/api/users", async ({ request }) => {
    await delay(600);

    const authUser = getAuthUser(request);
    if (!authUser) {
      return HttpResponse.json({ message: "Ruxsat yo'q" }, { status: 401 });
    }
    if (!authUser.roles.includes("ADMIN")) {
      return HttpResponse.json({ message: "403 Forbidden" }, { status: 403 });
    }

    const url = new URL(request.url);
    const search = url.searchParams.get("search")?.toLowerCase() ?? "";
    const page = parseInt(url.searchParams.get("page") ?? "1");
    const pageSize = parseInt(url.searchParams.get("pageSize") ?? "10");

    const filtered = usersDb
      .filter((u) => {
        if (!search) return true;
        return (
          u.firstName.toLowerCase().includes(search) ||
          u.lastName.toLowerCase().includes(search) ||
          u.email.toLowerCase().includes(search)
        );
      })
      .map(({ password: _, ...u }) => u);

    return HttpResponse.json(paginate(filtered, page, pageSize));
  }),

  http.post("/api/users", async ({ request }) => {
    await delay(600);

    const authUser = getAuthUser(request);
    if (!authUser) {
      return HttpResponse.json({ message: "Ruxsat yo'q" }, { status: 401 });
    }
    if (!authUser.roles.includes("ADMIN")) {
      return HttpResponse.json({ message: "403 Forbidden" }, { status: 403 });
    }

    const body = (await request.json()) as Omit<User, "id">;

    if (usersDb.find((u) => u.email === body.email)) {
      return HttpResponse.json(
        { message: "Bu email allaqachon mavjud" },
        { status: 400 },
      );
    }

    const roles = (body.roles ?? []).filter((r) => r !== "ADMIN") as Role[];

    const newUser: User = {
      id: nextId++,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: body.password,
      roles,
    };

    usersDb.push(newUser);
    const { password: _, ...userWithoutPassword } = newUser;
    return HttpResponse.json(userWithoutPassword, { status: 201 });
  }),

  http.put("/api/users/:id", async ({ request, params }) => {
    await delay(600);

    const authUser = getAuthUser(request);
    if (!authUser) {
      return HttpResponse.json({ message: "Ruxsat yo'q" }, { status: 401 });
    }
    if (!authUser.roles.includes("ADMIN")) {
      return HttpResponse.json({ message: "403 Forbidden" }, { status: 403 });
    }

    const id = parseInt(params.id as string);
    const index = usersDb.findIndex((u) => u.id === id);

    if (index === -1) {
      return HttpResponse.json(
        { message: "Foydalanuvchi topilmadi" },
        { status: 404 },
      );
    }

    const body = (await request.json()) as Partial<User>;

    usersDb[index] = {
      ...usersDb[index],
      firstName: body.firstName ?? usersDb[index].firstName,
      lastName: body.lastName ?? usersDb[index].lastName,
      email: body.email ?? usersDb[index].email,
      password: body.password || usersDb[index].password,
      roles: body.roles ?? usersDb[index].roles,
    };

    const { password: _, ...userWithoutPassword } = usersDb[index];
    return HttpResponse.json(userWithoutPassword);
  }),

  http.delete("/api/users/:id", async ({ request, params }) => {
    await delay(600);

    const authUser = getAuthUser(request);
    if (!authUser) {
      return HttpResponse.json({ message: "Ruxsat yo'q" }, { status: 401 });
    }
    if (!authUser.roles.includes("ADMIN")) {
      return HttpResponse.json({ message: "403 Forbidden" }, { status: 403 });
    }

    const id = parseInt(params.id as string);
    const index = usersDb.findIndex((u) => u.id === id);

    if (index === -1) {
      return HttpResponse.json(
        { message: "Foydalanuvchi topilmadi" },
        { status: 404 },
      );
    }

    usersDb.splice(index, 1);
    return HttpResponse.json({ message: "O'chirildi", id });
  }),

  http.get("/api/roles", async ({ request }) => {
    await delay(600);

    const authUser = getAuthUser(request);
    if (!authUser) {
      return HttpResponse.json({ message: "Ruxsat yo'q" }, { status: 401 });
    }

    return HttpResponse.json(rolesDb);
  }),

  http.get("/api/payments", async ({ request }) => {
    await delay(600);

    const authUser = getAuthUser(request);
    if (!authUser) {
      return HttpResponse.json({ message: "Ruxsat yo'q" }, { status: 401 });
    }
    if (
      !authUser.roles.includes("PAYMENT") &&
      !authUser.roles.includes("ADMIN")
    ) {
      return HttpResponse.json({ message: "403 Forbidden" }, { status: 403 });
    }

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") ?? "1");
    const pageSize = parseInt(url.searchParams.get("pageSize") ?? "10");
    const status = url.searchParams.get("status");
    const search = url.searchParams.get("search")?.toLowerCase() ?? "";

    let filtered = [...paymentsDb];

    if (status) {
      filtered = filtered.filter((p) => p.status === status);
    }
    if (search) {
      filtered = filtered.filter((p) =>
        p.description.toLowerCase().includes(search),
      );
    }

    return HttpResponse.json(paginate(filtered, page, pageSize));
  }),

  http.get("/api/reports", async ({ request }) => {
    await delay(600);

    const authUser = getAuthUser(request);
    if (!authUser) {
      return HttpResponse.json({ message: "Ruxsat yo'q" }, { status: 401 });
    }
    if (
      !authUser.roles.includes("REPORTS") &&
      !authUser.roles.includes("ADMIN")
    ) {
      return HttpResponse.json({ message: "403 Forbidden" }, { status: 403 });
    }

    return HttpResponse.json(reportsDb);
  }),
];
