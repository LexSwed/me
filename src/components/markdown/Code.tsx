import { useSignal } from "@preact/signals";
import { type ComponentProps } from "preact";
import { useEffect, useRef } from "preact/hooks";

/**
 * Used by @astro/mdx for inline code and by shiki as a child of `pre`.
 * See @link /plugins/shiki.ts.
 */
export const Code = ({ children, ...props }) => {
  return (
    <code
      class={
        props.shiki
          ? ""
          : "rounded-md bg-on-background/10 px-[0.2em] py-[0.1em] font-mono text-[0.8em]"
      }
    >
      {children}
    </code>
  );
};

export const Pre = ({ children, filename, lang, source, ...props }) => {
  return (
    <pre
      {...props}
      class={[
        "relative group/code-wrapper p-4 mb-4 text-sm rounded-lg",
        props.class,
      ].join(" ")}
    >
      {children}
      <div class="absolute end-2 top-2 opacity-0  transition-opacity delay-500 group-focus-within/code-wrapper:opacity-100 group-focus-within/code-wrapper:delay-[0s] group-hover/code-wrapper:opacity-100 group-hover/code-wrapper:delay-[0s]">
        <CopyButton text={source} />
      </div>
    </pre>
  );
};

/**
 * Credit: https://heroicons.com/
 */
const ClipboardIcon = (props: ComponentProps<"svg">) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
    />
  </svg>
);

/**
 * Credit: https://heroicons.com/
 */
const CheckIcon = (props: ComponentProps<"svg">) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
    />
  </svg>
);

export const CopyButton = ({ text }: { text: string }) => {
  const [copied, copy] = useCopyToClipboard();

  return (
    <button
      type="button"
      aria-label="Copy code"
      title="Copy code"
      class="rounded-md bg-inherit p-2 text-inherit shadow-sm hover:bg-background/40 focus:bg-background/40 focus:outline-none focus:ring-2 focus:ring-primary"
      onClick={() => copy(text)}
    >
      {copied.value ? (
        <CheckIcon class="h-5 w-5" />
      ) : (
        <ClipboardIcon class="h-5 w-5" />
      )}
    </button>
  );
};

function useCopyToClipboard() {
  const isCopied = useSignal(false);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);

  const copy = async (text: string) => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
    }
    if (!navigator?.clipboard) {
      console.error("Clipboard not supported");
      return false;
    }
    try {
      await navigator.clipboard.writeText(text);
      isCopied.value = true;
      timeoutId.current = setTimeout(() => {
        isCopied.value = false;
      }, 1500);
    } catch (err) {
      isCopied.value = false;
    }
  };

  return [isCopied, copy] as const;
}
