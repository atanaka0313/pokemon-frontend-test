import { Card } from "#/components/ui/card";
import { Skeleton } from "#/components/ui/skeleton";

export function SkeletonImage() {
  return (
    <div className="flex items-center justify-center">
      <Skeleton className="h-24 w-24 rounded-full" />
    </div>
  );
}

export function SkeletonText() {
  return (
    <div className="my-2">
      <Skeleton className="h-4 w-full" />
    </div>
  );
}

export function SkeletonCard() {
  return (
    <Card className="w-full rounded-lg border-8 border-yellow-400 p-4 shadow-lg">
      <Skeleton className="mb-2 h-4 w-1/2" />
      <div className="flex h-48 items-center justify-center bg-gray-200">
        <Skeleton className="h-24 w-24 rounded-full" />
      </div>
      <div className="mt-4">
        <Skeleton className="mb-2 h-4 w-1/2" />
        <hr className="mb-2 border-gray-300" />
        <Skeleton className="mb-2 h-4 w-1/3" />
        <div className="flex flex-col">
          <SkeletonText />
          <SkeletonText />
        </div>
      </div>
    </Card>
  );
}

export function SkeletonCardGroup({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </>
  );
}
