export default function Placeholder({
  height,
  round,
}: {
  height?: number;
  round?: string;
}) {
  return (
    <div
      className={`h-${height} w-full bg-gray-200 rounded-${round} mb-4 animate-pulse`}
    />
  );
}
