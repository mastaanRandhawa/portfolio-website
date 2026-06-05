"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const MOBILE_LIST_LIMIT = 3;

interface MobileTruncatedListProps {
  items: string[];
  seeAllLabel: string;
  seeAllHref?: string;
  onSeeAll?: () => void;
  className?: string;
  itemClassName?: string;
}

export function MobileTruncatedList({
  items,
  seeAllLabel,
  seeAllHref,
  onSeeAll,
  className,
  itemClassName,
}: MobileTruncatedListProps) {
  const hasMore = items.length > MOBILE_LIST_LIMIT;

  return (
    <div className={className}>
      <ul className="divide-y divide-border/50 sm:divide-none sm:space-y-3 md:space-y-5">
        {items.map((item, index) => (
          <li
            key={item}
            className={cn(
              itemClassName,
              !onSeeAll && !seeAllHref && index >= MOBILE_LIST_LIMIT && "max-md:hidden"
            )}
          >
            {item}
          </li>
        ))}
      </ul>

      {hasMore && (seeAllHref || onSeeAll) && (
        <div className="mt-4 md:hidden">
          {seeAllHref ? (
            <Link href={seeAllHref} className="gallery-link">
              {seeAllLabel}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          ) : (
            <button type="button" onClick={onSeeAll} className="gallery-link">
              {seeAllLabel}
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export { MOBILE_LIST_LIMIT };
