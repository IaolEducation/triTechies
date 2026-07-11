import { FadeIn } from "@/components/animations/FadeIn";

export function SectionHeader({
  label,
  title,
  subtitle,
}: {
  label: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <FadeIn>
      <p className="font-input text-[13px] tracking-[-0.037em] text-amber-whisper mb-5">
        {"// "}{label}
      </p>
      <h2 className="text-[34px] md:text-[44px] font-normal leading-[1.05] tracking-[-0.48px] text-frost-text max-w-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-[18px] leading-[1.34] text-smoke max-w-2xl">
          {subtitle}
        </p>
      )}
    </FadeIn>
  );
}
