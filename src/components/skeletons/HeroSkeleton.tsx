import { Skeleton } from "@/components/ui/skeleton";

export const HeroSkeleton = () => {
  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center bg-primary/80">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl space-y-6">
          <Skeleton className="h-12 md:h-16 w-3/4 bg-primary-foreground/20" />
          <Skeleton className="h-12 md:h-16 w-1/2 bg-primary-foreground/20" />
          <Skeleton className="h-6 w-2/3 bg-primary-foreground/20" />
          <Skeleton className="h-6 w-1/2 bg-primary-foreground/20" />
          <div className="flex gap-4 pt-4">
            <Skeleton className="h-12 w-40 bg-primary-foreground/20" />
            <Skeleton className="h-12 w-32 bg-primary-foreground/20" />
          </div>
        </div>
      </div>
    </section>
  );
};
