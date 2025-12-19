import { Skeleton } from "@/components/ui/skeleton";

interface ImageSkeletonProps {
  className?: string;
  aspectRatio?: "square" | "video" | "wide";
}

export const ImageSkeleton = ({ className = "", aspectRatio = "video" }: ImageSkeletonProps) => {
  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    wide: "aspect-[4/3]",
  };

  return (
    <Skeleton className={`w-full ${aspectClasses[aspectRatio]} rounded-xl ${className}`} />
  );
};
