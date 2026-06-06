import type { Profile } from "@prisma/client";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { LISTING_IMAGE_UPLOAD_MAX_REQUEST_BYTES } from "@/features/listings/lib/listingImageConstants";

const profileStub: Profile = {
  id: "profile-1",
  supabaseUserId: "user-1",
  email: "rescate@correo.com",
  displayName: "Refugio",
  location: null,
  description: null,
  phone: null,
  instagram: null,
  facebook: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

vi.mock("@/features/listings/lib/ensureListingProfile", () => ({
  getCurrentListingProfile: vi.fn(),
}));

vi.mock("@/features/listings/lib/server/listingImageServer", () => ({
  compressAndUploadListingImage: vi.fn(),
}));

import { getCurrentListingProfile } from "@/features/listings/lib/ensureListingProfile";
import { POST } from "./route";

const getProfileMock = vi.mocked(getCurrentListingProfile);

beforeEach(() => {
  getProfileMock.mockReset();
});

describe("listing image upload route", () => {
  it("rejects unauthenticated uploads", async () => {
    getProfileMock.mockResolvedValue(null);

    const response = await POST(new Request("http://localhost/api/listings/image", { method: "POST" }));

    expect(response.status).toBe(401);
  });

  it("rejects oversized requests before parsing multipart data", async () => {
    getProfileMock.mockResolvedValue(profileStub);

    const response = await POST(
      new Request("http://localhost/api/listings/image", {
        method: "POST",
        headers: {
          "content-length": String(LISTING_IMAGE_UPLOAD_MAX_REQUEST_BYTES + 1),
        },
      }),
    );

    expect(response.status).toBe(413);
  });

  it("rejects unsupported upload content types", async () => {
    getProfileMock.mockResolvedValue(profileStub);
    const formData = new FormData();
    formData.append("file", new File(["not-an-image"], "note.txt", { type: "text/plain" }));

    const response = await POST(
      new Request("http://localhost/api/listings/image", {
        method: "POST",
        body: formData,
      }),
    );

    expect(response.status).toBe(415);
  });
});