import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import BioAndSocial from "@/components/AboutMe/BioAndSocial";

vi.mock("@/yigit433.config", () => ({
  default: {
    personal: {
      socialAccounts: [
        {
          icon: "/icons/github.svg",
          color: "#24292e",
          textColor: "#ffffff",
          name: "Github",
          url: "https://github.com/yigit433",
        },
        {
          icon: "/icons/linkedin.svg",
          color: "#0077B5",
          textColor: "#ffffff",
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/avcyigitefe/",
        },
      ],
    },
  },
}));

describe("BioAndSocial", () => {
  it("renders bio translation keys", () => {
    const { container } = render(<BioAndSocial />);
    const paragraph = container.querySelector("p");
    expect(paragraph).toHaveTextContent("bio");
    expect(paragraph).toHaveTextContent("bio2");
  });

  it("renders all social account links", () => {
    render(<BioAndSocial />);
    expect(screen.getByText("Github")).toBeInTheDocument();
    expect(screen.getByText("LinkedIn")).toBeInTheDocument();
  });

  it("social links have correct href", () => {
    render(<BioAndSocial />);
    const githubLink = screen.getByText("Github").closest("a");
    expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/yigit433"
    );

    const linkedinLink = screen.getByText("LinkedIn").closest("a");
    expect(linkedinLink).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/avcyigitefe/"
    );
  });

  it("social links open in new tab", () => {
    render(<BioAndSocial />);
    const githubLink = screen.getByText("Github").closest("a");
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
  });
});
