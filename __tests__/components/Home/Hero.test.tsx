import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Hero from "@/components/Home/Hero";

vi.mock("@/yigit433.config", () => ({
  default: {
    siteName: "yigit433",
    profilePicture: { src: "/test-pic.jpg", field: "" },
    personal: {
      name: "Test",
      email: "test@test.com",
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
  it("renders the selfTaught translation key", () => {
    render(<Hero />);
    expect(screen.getByText("selfTaught")).toBeInTheDocument();
  });

  it("renders the position translation key", () => {
    render(<Hero />);
    expect(screen.getByText("position")).toBeInTheDocument();
  });

  it("renders HeroImage component", () => {
    render(<Hero />);
    expect(screen.getByTestId("hero-image")).toBeInTheDocument();
  });
});
