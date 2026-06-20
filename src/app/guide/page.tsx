import type { Metadata } from "next";
import { GuideMarkdown } from "@/components/GuideMarkdown";
import { getComiteGuideMarkdown } from "@/lib/read-guide";

export const metadata: Metadata = {
  title: "Guide comité — Google Sheets",
  robots: {
    index: false,
    follow: false,
  },
};

export default function GuidePage() {
  const content = getComiteGuideMarkdown();

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <p className="mb-8 rounded-xl border border-vcp-blue/15 bg-vcp-cream/50 px-4 py-3 text-sm text-gray-600">
          Page réservée au comité — non listée dans le menu. Partagez l’adresse{" "}
          <code className="rounded bg-white px-1.5 py-0.5 text-vcp-dark">
            /guide
          </code>{" "}
          uniquement en message privé.
        </p>
        <GuideMarkdown content={content} />
      </div>
    </section>
  );
}
