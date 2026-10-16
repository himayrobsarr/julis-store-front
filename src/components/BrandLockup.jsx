export default function BrandLockup({ size = "default", className = "" }) {
  return (
    <span className={`brand-lockup brand-lockup-${size} ${className}`.trim()}>
      <span className="brand-mark brand-mark-julis">
        <img src="/images/brand/julis-logo.png" alt="Juli's Clothes Baby" />
      </span>
      <span className="brand-lockup-divider" aria-hidden="true" />
      <span className="brand-mark brand-mark-maju">
        <img src="/images/brand/maju-logo.png" alt="Ma&amp;Ju" />
      </span>
    </span>
  );
}
