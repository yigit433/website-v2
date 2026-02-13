import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Hero from "@/components/Home/Hero";

vi.mock("@/yigit433.config", () => ({
  default: {
    siteName: "yigit433",
    profilePicture: { src: "/test-pic.jpg", field: "" },
    personal: {
      name: "Test",
      position: "Full-stack Developer",
      email: "test@test.com",
      description: "Hello, I'm {age} years old.",
      birthday: {
        day: "1",
        month: "1",
        year: "2000",
        time: "00:00:00",
        gmt: "GMT+0:00",
      },
      socialAccounts: [],
    },
    routes: [],
  },
}));

vi.mock("@/components/Home/HeroImage", () => ({
  default: () => <div data-testid="hero-image">HeroImage</div>,
}));

describe("Hero", () => {
  it("renders the position from config", () => {
    render(<Hero />);
    expect(screen.getByText("Full-stack Developer")).toBeInTheDocument();
  });

  it("renders Self-taught text", () => {
    render(<Hero />);
    expect(screen.getByText(/Self-taught/)).toBeInTheDocument();
  });

  it("renders description with computed age", () => {
    render(<Hero />);
    // The description should contain "Hello" and the age number
    expect(screen.getByText(/Hello/)).toBeInTheDocument();
  });

  it("renders HeroImage component", () => {
    render(<Hero />);
    expect(screen.getByTestId("hero-image")).toBeInTheDocument();
  });
});
