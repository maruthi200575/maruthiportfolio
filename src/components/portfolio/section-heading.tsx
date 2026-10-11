import type { ReactNode } from 'react';

export function SectionHeading({ number, eyebrow, title, description, children }: { number: string; eyebrow: string; title: string; description?: string; children?: ReactNode }) {
  return <div className="section-heading"><div><p className="eyebrow"><span>{number} /</span> {eyebrow}</p><h2>{title}<span className="text-primary">.</span></h2>{description && <p className="section-description">{description}</p>}</div>{children}</div>;
}