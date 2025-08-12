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

  // Detect iOS
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  try {
    // Adjust html2canvas options for iOS Safari quirks
    const canvas = await html2canvas(element, {
      backgroundColor,
      scale: isIOS ? 1.5 : scale, // Lower scale for iOS to avoid memory issues
      useCORS: true, // Images must be served with Access-Control-Allow-Origin: *
      allowTaint: false, // Block tainted images (important for iOS)
      logging: false,
      width: element.offsetWidth,
      height: element.offsetHeight,
      foreignObjectRendering: false, // Avoid Safari bug
    });

    // Debug: append canvas to DOM to check if blank (uncomment for troubleshooting)
    // if (isIOS) document.body.appendChild(canvas);

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, `image/${format}`, quality);
    });

    if (!blob) {
      throw new Error("Failed to create blob from canvas");
    }

    if (
      isIOS &&
      navigator.canShare &&
      navigator.canShare({
        files: [new File([blob], `${fileName}.${format}`, { type: blob.type })],
      })
    ) {
      // Use native share if available
      const file = new File([blob], `${fileName}.${format}`, {
        type: blob.type,
      });
      await navigator.share({
        files: [file],
        title: "Your Photo Strip",
        text: "Save or share your photo strip!",
      });
    } else if (isIOS) {
      // Fallback for iOS Safari: open image in new tab for manual saving
      const url = URL.createObjectURL(blob);
      const newWindow = window.open(url, "_blank");
      if (!newWindow) {
        window.location.href = url;
      }
      setTimeout(() => URL.revokeObjectURL(url), 2000);
      // Optionally, show a tooltip: "Tap and hold the image to save it to your device."
    } else {
      // Desktop: use download attribute
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${fileName}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
