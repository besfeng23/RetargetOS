import Link from "next/link";
import type * as React from "react";
import { clsx } from "clsx";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: string; children: React.ReactNode };

export function PrimaryCTA({ href, children, className, ...props }: Props) {
  const classes = clsx("inline-flex min-h-11 items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-white/90", className);
  if (href) return <Link className={classes} href={href}>{children}</Link>;
  return <button className={classes} {...props}>{children}</button>;
}
