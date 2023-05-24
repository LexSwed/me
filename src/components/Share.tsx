import type { ComponentProps } from "preact";
import { useCopyToClipboard } from "./markdown/Code";

import styles from "./Share.module.css";

type Props = ComponentProps<"button"> & {
  /**
   * The info to be shared
   */
  shareData: ShareData;
};

export const Share = ({
  children,
  shareData,
  class: className,
  ...props
}: Props) => {
  const [copied, copy] = useCopyToClipboard();

  const supportsSharing =
    typeof navigator !== "undefined" && "share" in navigator;

  const share = async () => {
    if (supportsSharing) {
      await navigator.share(shareData);
    } else if (shareData.url) {
      copy(shareData.url);
    }
  };

  const label = copied ? "Copied" : supportsSharing ? "Share" : "Copy link";

  return (
    <button
      type="button"
      aria-label={label}
      onClick={share}
      class={[
        styles.share,
        "relative rounded-full border-2 border-on-background/20 p-4 text-on-background/70 transition-colors duration-150 hover:border-primary hover:bg-primary/90 hover:text-on-primary focus:border-primary focus:bg-primary/90 focus:text-on-primary",
        className,
      ].join("")}
      {...props}
    >
      {children}
    </button>
  );
};

/* 
<script data-title={title}>
  const button = document.getElementById("copy-url");

  const shareData = {
    title: document.currentScript.dataset.title,
    text: `I just read "${document.currentScript.dataset.title}" by @lexswed`,
    url: document.location.href,
  };

  const supportsShare = "share" in navigator;
  function resetLabel() {
    if (supportsShare) {
      button.setAttribute("aria-label", "Share");
    } else {
      button.setAttribute("aria-label", "Copy link");
    }
  }
  resetLabel();
  let timeout = null;
  button.addEventListener("click", async () => {
    if ("share" in navigator) {
      await navigator.share(shareData);
    } else {
      button.setAttribute("aria-label", "Copied");
      navigator.clipboard.writeText(document.location.href);
    }
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(resetLabel, 1500);
  });
</script>
 */
