import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ScreenshotGallery from "@/components/Projects/ScreenshotGallery";

const screenshots = ["/img1.png", "/img2.png", "/img3.png"];

describe("ScreenshotGallery", () => {
  it("renders the gallery heading", () => {
    render(
      <ScreenshotGallery
        screenshots={screenshots}
        title="Test"
        onOpenLightbox={vi.fn()}
      />
    );
    expect(screen.getByText("screenshotGallery")).toBeInTheDocument();
  });

  it("renders the main image", () => {
    render(
      <ScreenshotGallery
        screenshots={screenshots}
        title="Test"
        onOpenLightbox={vi.fn()}
      />
    );
    expect(screen.getByAltText("Test - 1")).toBeInTheDocument();
  });

  it("renders thumbnail buttons when multiple screenshots", () => {
    render(
      <ScreenshotGallery
        screenshots={screenshots}
        title="Test"
        onOpenLightbox={vi.fn()}
      />
    );
    const thumbnails = screen.getAllByAltText(/Test thumbnail/);
    expect(thumbnails).toHaveLength(3);
  });

  it("changes active image when thumbnail is clicked", async () => {
    const user = userEvent.setup();
    render(
      <ScreenshotGallery
        screenshots={screenshots}
        title="Test"
        onOpenLightbox={vi.fn()}
      />
    );

    const thumbnails = screen.getAllByAltText(/Test thumbnail/);
    await user.click(thumbnails[1].closest("button")!);

    expect(screen.getByAltText("Test - 2")).toBeInTheDocument();
  });

  it("calls onOpenLightbox when main image is clicked", async () => {
    const onOpenLightbox = vi.fn();
    const user = userEvent.setup();
    render(
      <ScreenshotGallery
        screenshots={screenshots}
        title="Test"
        onOpenLightbox={onOpenLightbox}
      />
    );

    const mainImage = screen.getByAltText("Test - 1");
    await user.click(mainImage.closest(".cursor-pointer")!);
    expect(onOpenLightbox).toHaveBeenCalledWith(0);
  });

  it("returns null when screenshots is empty", () => {
    const { container } = render(
      <ScreenshotGallery
        screenshots={[]}
        title="Test"
        onOpenLightbox={vi.fn()}
      />
    );
    expect(container.innerHTML).toBe("");
  });
});
