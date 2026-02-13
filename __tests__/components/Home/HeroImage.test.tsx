import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import HeroImage from "@/components/Home/HeroImage";
import useSWR from "swr";

vi.mock("swr", () => ({
  default: vi.fn(),
}));

vi.mock("@/yigit433.config", () => ({
  default: {
    profilePicture: {
      src: "https://api.github.com/users/test",
      field: "avatar_url",
    },
  },
}));

const mockUseSWR = vi.mocked(useSWR);

describe("HeroImage", () => {
  it("renders the hero avatar container", () => {
    mockUseSWR.mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
      isValidating: false,
      mutate: vi.fn(),
    } as ReturnType<typeof useSWR>);

    render(<HeroImage />);
    const container = document.getElementById("hero-avatar");
    expect(container).toBeInTheDocument();
  });

  it("renders image when data is loaded", () => {
    mockUseSWR.mockReturnValue({
      data: { avatar_url: "https://example.com/avatar.jpg" },
      error: undefined,
      isLoading: false,
      isValidating: false,
      mutate: vi.fn(),
    } as ReturnType<typeof useSWR>);

    render(<HeroImage />);
    const img = screen.getByAltText("Profile Picture");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://example.com/avatar.jpg");
  });

  it("handles error state gracefully", () => {
    mockUseSWR.mockReturnValue({
      data: undefined,
      error: new Error("API Error"),
      isLoading: false,
      isValidating: false,
      mutate: vi.fn(),
    } as ReturnType<typeof useSWR>);

    render(<HeroImage />);
    const container = document.getElementById("hero-avatar");
    expect(container).toBeInTheDocument();
  });
});
