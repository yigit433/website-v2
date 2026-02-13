import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NavItem from "@/components/Navigation/NavItem";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
}));

describe("NavItem", () => {
  const route = { name: "Home", to: "/" };

  it("renders the route name", () => {
    render(<NavItem route={route} isActive={false} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("calls onClick when provided", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<NavItem route={route} isActive={false} onClick={onClick} />);

    await user.click(screen.getByText("Home"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("calls router.push when no onClick provided", async () => {
    const user = userEvent.setup();
    const mockPush = vi.fn();
    const mockRouter = {
      push: mockPush,
      replace: vi.fn(),
      prefetch: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
    } as ReturnType<typeof import("next/navigation").useRouter>;

    render(<NavItem route={route} isActive={false} router={mockRouter} />);

    await user.click(screen.getByText("Home"));
    expect(mockPush).toHaveBeenCalledWith("/");
  });

  it("renders with active styling", () => {
    render(<NavItem route={route} isActive={true} />);
    const button = screen.getByText("Home");
    expect(button).toHaveStyle({
      backgroundColor: "var(--btn-hover-bg)",
      color: "var(--btn-hover-text)",
    });
  });

  it("renders with inactive styling", () => {
    render(<NavItem route={route} isActive={false} />);
    const button = screen.getByText("Home");
    expect(button).toHaveStyle({
      backgroundColor: "var(--btn-bg)",
      color: "var(--btn-text)",
    });
  });
});
