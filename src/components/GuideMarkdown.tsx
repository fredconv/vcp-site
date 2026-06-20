import Link from "next/link";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const components: Components = {
  h1: ({ children }) => (
    <h1 className="font-display mt-0 text-3xl font-extrabold uppercase tracking-tight text-vcp-red sm:text-4xl">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-display mt-12 border-b border-vcp-red/20 pb-2 text-2xl font-bold uppercase tracking-tight text-vcp-dark first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 text-lg font-bold text-vcp-blue">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="mt-4 text-base leading-relaxed text-gray-700">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-700">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-4 list-decimal space-y-2 pl-6 text-gray-700">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => (
    <strong className="font-semibold text-vcp-dark">{children}</strong>
  ),
  blockquote: ({ children }) => (
    <blockquote className="mt-4 border-l-4 border-vcp-gold bg-vcp-cream/60 px-4 py-3 text-sm text-gray-700">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-10 border-gray-200" />,
  a: ({ href, children }) => {
    if (!href || href.endsWith(".md")) {
      return <span className="text-gray-600">{children}</span>;
    }

    const external = href.startsWith("http");

    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-vcp-red underline decoration-vcp-red/30 underline-offset-2 hover:text-vcp-red-dark"
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className="font-medium text-vcp-red underline decoration-vcp-red/30 underline-offset-2 hover:text-vcp-red-dark"
      >
        {children}
      </Link>
    );
  },
  table: ({ children }) => (
    <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200">
      <table className="min-w-full text-left text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-vcp-dark text-white">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="px-4 py-3 font-semibold">{children}</th>
  ),
  td: ({ children }) => (
    <td className="border-t border-gray-100 px-4 py-3 text-gray-700">
      {children}
    </td>
  ),
  tr: ({ children }) => (
    <tr className="bg-white even:bg-gray-50">{children}</tr>
  ),
  code: ({ children }) => (
    <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-vcp-dark">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="mt-4 overflow-x-auto rounded-xl bg-vcp-dark p-4 text-sm text-white">
      {children}
    </pre>
  ),
};

type GuideMarkdownProps = {
  content: string;
};

export function GuideMarkdown({ content }: GuideMarkdownProps) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </ReactMarkdown>
  );
}
