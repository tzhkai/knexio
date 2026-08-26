export type ClipboardWriter = Pick<Clipboard, "writeText">;

/** Attempts the modern Clipboard API first, then a local temporary textarea fallback. */
export async function copyTextToClipboard(value: string, writer: ClipboardWriter | undefined = typeof navigator === "undefined" ? undefined : navigator.clipboard, doc: Document | undefined = typeof document === "undefined" ? undefined : document): Promise<boolean> {
  if (!value) return false;
  try {
    if (writer?.writeText) {
      await writer.writeText(value);
      return true;
    }
    if (!doc) return false;
    const textarea = doc.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    doc.body.appendChild(textarea);
    textarea.select();
    const copied = doc.execCommand("copy");
    textarea.remove();
    return copied;
  } catch {
    return false;
  }
}
