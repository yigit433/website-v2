import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import RepositoriesPage from "@/app/[locale]/repositories/page";
import useSWR from "swr";

vi.mock("swr", () => ({
  default: vi.fn(),
}));

const mockUseSWR = vi.mocked(useSWR);

const mockRepos = [
  {
    id: 1,
    name: "website-v2",
    html_url: "https://github.com/yigit433/website-v2",
    description: "Portfolio website",
    language: "TypeScript",
    stargazers_count: 5,
    updated_at: "2024-06-01T00:00:00Z",
    archived: false,
  },
  {
    id: 2,
    name: "website",
    html_url: "https://github.com/yigit433/website",
    description: "Old portfolio",
    language: "JavaScript",
    stargazers_count: 2,
    updated_at: "2023-01-01T00:00:00Z",
    archived: false,
  },
  {
    id: 3,
    name: "cool-project",
    html_url: "https://github.com/yigit433/cool-project",
    description: "A cool project",
    language: "Go",
    stargazers_count: 10,
    updated_at: "2024-03-01T00:00:00Z",
    archived: false,
  },
  {
    id: 4,
    name: "archived-repo",
    html_url: "https://github.com/yigit433/archived-repo",
    description: "An archived repo",
    language: "Python",
    stargazers_count: 0,
    updated_at: "2022-01-01T00:00:00Z",
    archived: true,
  },
];

describe("RepositoriesPage", () => {
  it("shows loading state", () => {
    mockUseSWR.mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
      isValidating: false,
      mutate: vi.fn(),
    } as ReturnType<typeof useSWR>);

    render(<RepositoriesPage />);
    expect(screen.getByText("loading")).toBeInTheDocument();
  });

  it("shows error state", () => {
    mockUseSWR.mockReturnValue({
      data: undefined,
      error: new Error("API Error"),
      isLoading: false,
      isValidating: false,
      mutate: vi.fn(),
    } as ReturnType<typeof useSWR>);

    render(<RepositoriesPage />);
    expect(screen.getByText("error")).toBeInTheDocument();
  });

  it("renders repository cards on success", () => {
    mockUseSWR.mockReturnValue({
      data: mockRepos,
      error: undefined,
      isLoading: false,
      isValidating: false,
      mutate: vi.fn(),
    } as ReturnType<typeof useSWR>);

    render(<RepositoriesPage />);
    expect(screen.getByText("title")).toBeInTheDocument();
    expect(screen.getByText("website-v2")).toBeInTheDocument();
    expect(screen.getByText("cool-project")).toBeInTheDocument();
  });

  it("filters out excluded repos", () => {
    const reposWithExcluded = [
      ...mockRepos,
      {
        id: 5,
        name: "bolt.new",
        html_url: "https://github.com/yigit433/bolt.new",
        description: "Excluded repo",
        language: "TypeScript",
        stargazers_count: 0,
        updated_at: "2024-01-01T00:00:00Z",
        archived: false,
      },
    ];

    mockUseSWR.mockReturnValue({
      data: reposWithExcluded,
      error: undefined,
      isLoading: false,
      isValidating: false,
      mutate: vi.fn(),
    } as ReturnType<typeof useSWR>);

    render(<RepositoriesPage />);
    expect(screen.queryByText("bolt.new")).not.toBeInTheDocument();
  });

  it("marks portfolio repo with badge", () => {
    mockUseSWR.mockReturnValue({
      data: mockRepos,
      error: undefined,
      isLoading: false,
      isValidating: false,
      mutate: vi.fn(),
    } as ReturnType<typeof useSWR>);

    render(<RepositoriesPage />);
    expect(screen.getByText("portfolio")).toBeInTheDocument();
  });

  it("marks old version repo with badge", () => {
    mockUseSWR.mockReturnValue({
      data: mockRepos,
      error: undefined,
      isLoading: false,
      isValidating: false,
      mutate: vi.fn(),
    } as ReturnType<typeof useSWR>);

    render(<RepositoriesPage />);
    expect(screen.getByText("oldVersion")).toBeInTheDocument();
  });

  it("marks archived repos with badge", () => {
    mockUseSWR.mockReturnValue({
      data: mockRepos,
      error: undefined,
      isLoading: false,
      isValidating: false,
      mutate: vi.fn(),
    } as ReturnType<typeof useSWR>);

    render(<RepositoriesPage />);
    expect(screen.getByText("archived")).toBeInTheDocument();
  });

  it("shows fallback for repos without description", () => {
    mockUseSWR.mockReturnValue({
      data: [
        {
          id: 10,
          name: "no-desc",
          html_url: "https://github.com/yigit433/no-desc",
          description: null,
          language: null,
          stargazers_count: 0,
          updated_at: "2024-01-01T00:00:00Z",
          archived: false,
        },
      ],
      error: undefined,
      isLoading: false,
      isValidating: false,
      mutate: vi.fn(),
    } as ReturnType<typeof useSWR>);

    render(<RepositoriesPage />);
    expect(screen.getByText("noDescription")).toBeInTheDocument();
    expect(screen.getByText("unknown")).toBeInTheDocument();
  });
});
