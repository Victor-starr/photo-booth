import html2canvas from "html2canvas";

export interface ExportOptions {
  fileName?: string;
  scale?: number;
  backgroundColor?: string | null;
  format?: "png" | "jpeg" | "webp";
  quality?: number;
}

export const exportElementAsImage = async (
  element: HTMLElement,
  options: ExportOptions = {}
): Promise<void> => {
  const {
    fileName = `export-${Date.now()}`,
    scale = 2,
    backgroundColor = null,
    format = "png",
    quality = 1,
  } = options;

  try {
    const canvas = await html2canvas(element, {
      backgroundColor,
      scale,
      useCORS: true,
      allowTaint: true,
      logging: false,
      width: element.offsetWidth,
      height: element.offsetHeight,
      foreignObjectRendering: true,
    });

    // Convert canvas to blob with Promise
    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, `image/${format}`, quality);
    });

    if (!blob) {
      throw new Error("Failed to create blob from canvas");
    }

    // Mobile-friendly download approach
    const url = URL.createObjectURL(blob);

    // Check if we're on mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // For mobile: open blob URL in new window/tab for user to save manually
      const newWindow = window.open(url, "_blank");
      if (!newWindow) {
        // Fallback: try to navigate to the blob URL
        window.location.href = url;
      }

      // Clean up after a delay to allow the download/view to start
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 1000);
    } else {
      // Desktop: use download attribute
      const link = document.createElement("a");
      link.href = url;
      link.download = `${fileName}.${format}`;

      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the object URL
      URL.revokeObjectURL(url);
    }
  } catch (error) {
    console.error("Export failed:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    throw new Error(`Export failed: ${errorMessage}`);
  }
};

// Convenience function specifically for photo strips
export const exportPhotoStrip = async (
  element: HTMLElement,
  frameType: string
): Promise<void> => {
  return exportElementAsImage(element, {
    fileName: `photo-starr-${frameType}-${Date.now()}`,
    scale: 2,
    format: "png",
  });
};
