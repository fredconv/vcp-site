import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-vcp-red text-white hover:bg-vcp-red-dark shadow-md hover:shadow-lg",
  secondary:
    "bg-vcp-blue text-white hover:bg-vcp-blue-dark shadow-md hover:shadow-lg",
  ghost:
    "bg-transparent text-white border-2 border-white/40 hover:border-white hover:bg-white/10",
  outline:
    "bg-transparent text-vcp-blue border-2 border-vcp-blue hover:bg-vcp-blue hover:text-white",
};

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  external?: boolean;
  className?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  external,
  className = "",
}: ButtonProps) {
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wide transition-all ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  highlight?: string;
  align?: "left" | "center";
  light?: boolean;
};

export function SectionHeader({
  eyebrow,
  title,
  highlight,
  align = "left",
  light = false,
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "";
  const eyebrowColor = light ? "text-vcp-gold" : "text-vcp-blue";
  const titleColor = light ? "text-white" : "text-vcp-dark";

  return (
    <div className={`max-w-2xl ${alignClass}`}>
      <p
        className={`text-xs font-bold uppercase tracking-[0.2em] ${eyebrowColor}`}
      >
        {eyebrow}
      </p>
      <h2
        className={`font-display mt-2 text-3xl font-extrabold uppercase leading-none tracking-tight sm:text-4xl ${titleColor}`}
      >
        {title}
        {highlight && (
          <>
            <br />
            <span className="text-vcp-red">{highlight}</span>
          </>
        )}
      </h2>
    </div>
  );
}

type Stat = { value: string; label: string };

export function StatBar({ stats }: { stats: readonly Stat[] }) {
  return (
    <div className="relative z-10 bg-vcp-dark pattern-court">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-white/10 px-4 sm:grid-cols-4 sm:px-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center justify-center bg-vcp-dark px-4 py-8 text-center"
          >
            <span className="font-display text-3xl font-extrabold text-vcp-gold sm:text-4xl">
              {stat.value}
            </span>
            <span className="mt-1 text-xs font-semibold uppercase tracking-wider text-white/60">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
