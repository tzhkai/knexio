/** Style note: Field Notes for Better Work — the accent action is direct and useful: copy a scoped prompt with tactile feedback. */
import { Check, Copy } from "lucide-react";
import { useState } from "react";
export default function CopyPrompt({ prompt, label = "Copy prompt" }: { prompt: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  async function copyPrompt() { try { await navigator.clipboard.writeText(prompt); setCopied(true); window.setTimeout(() => setCopied(false), 1800); } catch { setCopied(false); } }
  return <button className="copy-prompt-button" type="button" onClick={copyPrompt}>{copied ? <Check size={16} /> : <Copy size={16} />}{copied ? "Copied" : label}</button>;
}
