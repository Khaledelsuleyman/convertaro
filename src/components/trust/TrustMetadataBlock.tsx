import { TrustMetadata } from "@/lib/trust";

interface TrustMetadataBlockProps {
  metadata: TrustMetadata;
  title?: string;
}

export function TrustMetadataBlock({ metadata, title = "Editorial and review" }: TrustMetadataBlockProps) {
  return (
    <section className="rounded-2xl border border-border bg-white shadow-card p-6 sm:p-8">
      <h2 className="text-xl font-black text-text-primary">{title}</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-background/60 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary">Written by</p>
          <p className="mt-2 text-sm font-semibold text-text-primary">{metadata.writtenBy}</p>
        </div>
        <div className="rounded-xl border border-border bg-background/60 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary">Reviewed by</p>
          <p className="mt-2 text-sm font-semibold text-text-primary">{metadata.reviewedBy}</p>
        </div>
        <div className="rounded-xl border border-border bg-background/60 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary">Last updated</p>
          <p className="mt-2 text-sm font-semibold text-text-primary">{metadata.lastUpdated}</p>
        </div>
      </div>

      <div className="mt-5 space-y-3 text-sm leading-relaxed text-text-secondary">
        <p>{metadata.basis}</p>
        <p>{metadata.reviewNote}</p>
        {metadata.disclaimer ? <p>{metadata.disclaimer}</p> : null}
      </div>
    </section>
  );
}
