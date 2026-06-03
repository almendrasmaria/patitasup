import { describe, expect, it } from "vitest";

import { getSafeRedirectPath } from "./redirect";

describe("getSafeRedirectPath", () => {
  it("keeps local paths with query strings", () => {
    expect(getSafeRedirectPath("/profile?tab=listings", "/login")).toBe(
      "/profile?tab=listings",
    );
  });

  it("rejects absolute and protocol-relative URLs", () => {
    expect(getSafeRedirectPath("https://evil.example", "/login")).toBe("/login");
    expect(getSafeRedirectPath("//evil.example/path", "/login")).toBe("/login");
  });

  it("rejects encoded slash and backslash bypasses", () => {
    expect(getSafeRedirectPath("/%2f%2fevil.example", "/login")).toBe("/login");
    expect(getSafeRedirectPath("/\\evil.example", "/login")).toBe("/login");
  });
});