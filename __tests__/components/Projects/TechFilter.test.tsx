import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TechFilter from "@/components/Projects/TechFilter";
import { getAllTechnologies } from "@/data/projects";

describe("TechFilter", () => {
  const defaultProps = {
    searchQuery: "",
    onSearchChange: vi.fn(),
    selectedTechs: [] as string[],
    onToggleTech: vi.fn(),
    onClearFilters: vi.fn(),
  };

  it("renders search input with placeholder", () => {
    render(<TechFilter {...defaultProps} />);
    expect(
      screen.getByPlaceholderText("searchPlaceholder")
    ).toBeInTheDocument();
  });

  it("renders all technology badges", () => {
    render(<TechFilter {...defaultProps} />);
    const allTechs = getAllTechnologies();
    for (const tech of allTechs) {
      expect(screen.getByText(tech)).toBeInTheDocument();
    }
  });

  it("calls onSearchChange when typing in search input", async () => {
    const onSearchChange = vi.fn();
    const user = userEvent.setup();
    render(<TechFilter {...defaultProps} onSearchChange={onSearchChange} />);

    const input = screen.getByPlaceholderText("searchPlaceholder");
    await user.type(input, "test");
    expect(onSearchChange).toHaveBeenCalled();
  });

  it("calls onToggleTech when a tech badge is clicked", async () => {
    const onToggleTech = vi.fn();
    const user = userEvent.setup();
    render(<TechFilter {...defaultProps} onToggleTech={onToggleTech} />);

    await user.click(screen.getByText("Bun"));
    expect(onToggleTech).toHaveBeenCalledWith("Bun");
  });

  it("shows clear button when search query is active", () => {
    render(<TechFilter {...defaultProps} searchQuery="test" />);
    expect(screen.getByText("clearFilters")).toBeInTheDocument();
  });

  it("shows clear button when techs are selected", () => {
    render(<TechFilter {...defaultProps} selectedTechs={["Bun"]} />);
    expect(screen.getByText("clearFilters")).toBeInTheDocument();
  });

  it("does not show clear button when no filters active", () => {
    render(<TechFilter {...defaultProps} />);
    expect(screen.queryByText("clearFilters")).not.toBeInTheDocument();
  });

  it("calls onClearFilters when clear button is clicked", async () => {
    const onClearFilters = vi.fn();
    const user = userEvent.setup();
    render(
      <TechFilter
        {...defaultProps}
        searchQuery="test"
        onClearFilters={onClearFilters}
      />
    );

    await user.click(screen.getByText("clearFilters"));
    expect(onClearFilters).toHaveBeenCalled();
  });

  it("renders filter by tech label", () => {
    render(<TechFilter {...defaultProps} />);
    expect(screen.getByText("filterByTech")).toBeInTheDocument();
  });
});
