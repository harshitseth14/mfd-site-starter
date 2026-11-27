import { llmsText } from "@/lib/llms";

export const dynamic = "force-static";

/** /llms.txt: what the firm is, in plain text, for AI assistants (lib/llms.ts). */
export function GET() {
  return new Response(llmsText(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
