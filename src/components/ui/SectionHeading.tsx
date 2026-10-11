
interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`mb-6 ${className}`}>
      <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-2 text-sm text-gray-500 sm:text-base">
          {subtitle}
        </p>
      )}
    </div>
  );
}
