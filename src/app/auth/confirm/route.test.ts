import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/supabase/server", () => ({
  createSupabaseServerClient: vi.fn(),
}));

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { GET } from "./route";

const createClientMock = vi.mocked(createSupabaseServerClient);

beforeEach(() => {
  createClientMock.mockResolvedValue({
    auth: {
      exchangeCodeForSession: vi.fn().mockResolvedValue({ error: null }),
      verifyOtp: vi.fn().mockResolvedValue({ error: null }),
    },
  } as unknown as Awaited<ReturnType<typeof createSupabaseServerClient>>);
});

describe("auth confirm route", () => {
  it("does not redirect successful confirmations to external URLs", async () => {
    const response = await GET(
      new NextRequest("http://localhost/auth/confirm?code=abc&next=//evil.example"),
    );

    expect(response.headers.get("location")).toBe("http://localhost/profile");
  });

  it("keeps safe local redirect targets", async () => {
    const response = await GET(
      new NextRequest("http://localhost/auth/confirm?code=abc&next=/reset-password"),
    );

    expect(response.headers.get("location")).toBe("http://localhost/reset-password");
  });
});