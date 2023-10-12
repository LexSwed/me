import type { ComponentProps } from "preact";
import { useCopyToClipboard } from "./markdown/ClipboardButton";

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
        "relative rounded-full border-2 border-on-background/50 p-4 text-on-background/80 transition-colors duration-150 hover:border-primary hover:bg-primary/90 hover:text-on-primary focus:border-primary focus:bg-primary/90 focus:text-on-primary",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
};
