import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface CardSkeletonProps {
  showIcon?: boolean;
  lines?: number;
}

export const CardSkeleton = ({ showIcon = true, lines = 3 }: CardSkeletonProps) => {
  return (
    <Card className="border-border">
      <CardHeader>
        {showIcon && <Skeleton className="w-12 h-12 rounded-lg mb-4" />}
        <Skeleton className="h-6 w-3/4" />
      </CardHeader>
      <CardContent className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton key={i} className={`h-4 ${i === lines - 1 ? 'w-2/3' : 'w-full'}`} />
        ))}
      </CardContent>
    </Card>
  );
};
