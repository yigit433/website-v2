import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GalleryLightbox from "@/components/Projects/GalleryLightbox";

const screenshots = ["/img1.png", "/img2.png", "/img3.png"];

describe("GalleryLightbox", () => {
  it("renders the current image", () => {
    render(
      <GalleryLightbox
        screenshots={screenshots}
        initialIndex={0}
        title="Test"
        onClose={vi.fn()}
      />
    );
    expect(screen.getByAltText("Test - 1")).toBeInTheDocument();
  });

  it("renders the image counter", () => {
    render(
      <GalleryLightbox
        screenshots={screenshots}
        initialIndex={0}
        title="Test"
        onClose={vi.fn()}
      />
    );
    expect(screen.getByText("imageCounter")).toBeInTheDocument();
  });

  it("renders navigation buttons with aria labels", () => {
    render(
      <GalleryLightbox
        screenshots={screenshots}
        initialIndex={0}
        title="Test"
        onClose={vi.fn()}
      />
    );
    expect(screen.getByLabelText("previousImage")).toBeInTheDocument();
    expect(screen.getByLabelText("nextImage")).toBeInTheDocument();
    expect(screen.getByLabelText("closeGallery")).toBeInTheDocument();
  });

  it("navigates to next image on next button click", async () => {
    const user = userEvent.setup();
    render(
      <GalleryLightbox
        screenshots={screenshots}
        initialIndex={0}
        title="Test"
        onClose={vi.fn()}
      />
    );

    await user.click(screen.getByLabelText("nextImage"));
    expect(screen.getByAltText("Test - 2")).toBeInTheDocument();
  });

  it("navigates to previous image on prev button click", async () => {
    const user = userEvent.setup();
    render(
      <GalleryLightbox
        screenshots={screenshots}
        initialIndex={1}
        title="Test"
        onClose={vi.fn()}
      />
    );

    await user.click(screen.getByLabelText("previousImage"));
    expect(screen.getByAltText("Test - 1")).toBeInTheDocument();
  });

  it("calls onClose on Escape key", () => {
    const onClose = vi.fn();
    render(
      <GalleryLightbox
        screenshots={screenshots}
        initialIndex={0}
        title="Test"
        onClose={onClose}
      />
    );

    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).toHaveBeenCalled();
  });

  it("navigates with arrow keys", () => {
    render(
      <GalleryLightbox
        screenshots={screenshots}
        initialIndex={0}
        title="Test"
        onClose={vi.fn()}
      />
    );

    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(screen.getByAltText("Test - 2")).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "ArrowLeft" });
    expect(screen.getByAltText("Test - 1")).toBeInTheDocument();
  });

  it("wraps around at the end", async () => {
    const user = userEvent.setup();
    render(
      <GalleryLightbox
        screenshots={screenshots}
        initialIndex={2}
        title="Test"
        onClose={vi.fn()}
      />
    );

    await user.click(screen.getByLabelText("nextImage"));
    expect(screen.getByAltText("Test - 1")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(
      <GalleryLightbox
        screenshots={screenshots}
        initialIndex={0}
        title="Test"
        onClose={onClose}
      />
    );

    await user.click(screen.getByLabelText("closeGallery"));
    expect(onClose).toHaveBeenCalled();
  });
});
