
interface LoadingSkeletonProps {
  count?: number;
  className?: string;
}

export default function LoadingSkeleton({
  count = 6,
  className = "",
}: LoadingSkeletonProps) {
  return (
    <div
      className={`grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 ${className}`}
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-xl border border-gray-200 bg-white p-4"
        >
          <div className="mb-4 h-24 rounded-lg bg-gray-200" />

          <div className="mb-2 h-4 w-3/4 rounded bg-gray-200" />

          <div className="mb-4 h-3 w-1/2 rounded bg-gray-200" />

          <div className="h-6 w-1/3 rounded bg-gray-200" />
        </div>
      ))}
    </div>
  );
}
