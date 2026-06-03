import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/features/listings/lib/ensureListingProfile", () => ({
  getCurrentListingProfile: vi.fn(),
}));

vi.mock("@/features/listings/lib/listingsRepository", () => ({
  createListingForProfile: vi.fn(),
  listListingsForProfile: vi.fn(),
}));

import { getCurrentListingProfile } from "@/features/listings/lib/ensureListingProfile";
import { GET } from "./route";

const getProfileMock = vi.mocked(getCurrentListingProfile);

beforeEach(() => {
  getProfileMock.mockReset();
});

describe("listings route protection", () => {
  it("rejects unauthenticated listing reads", async () => {
    getProfileMock.mockResolvedValue(null);

    const response = await GET();

    expect(response.status).toBe(401);
  });
});