import { cn } from "@/lib/utils"

// productCollection styles
export const productCollectionStyles = {
  pageWrap: cn("min-h-screen bg-background"),
  heroSection: cn(
    "border-b border-border/60 bg-gradient-to-b from-primary/10 via-background to-background"
  ),
  heroContainer: cn("mx-auto max-w-7xl px-4 py-10"),
  heroEyebrow: cn("text-sm tracking-[0.2em] text-primary uppercase"),
  heroContent: cn(
    "mt-3 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between"
  ),
  heroTitleWrap: cn("space-y-2"),
  heroTitle: cn(
    "text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
  ),
  sortWrap: cn("flex items-center gap-3 text-sm text-muted-foreground"),
  sortTrigger: cn("w-[180px] rounded-none bg-card"),
  contentContainer: cn("mx-auto max-w-7xl px-4 py-2"),
  topBar: cn(
    "mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
  ),
  activeBadgesWrap: cn("flex flex-wrap items-center gap-2"),
  activeBadge: cn(
    "border-border bg-secondary text-secondary-foreground hover:bg-secondary"
  ),
  topBarActions: cn("flex items-center gap-3"),
  mobileFilterButton: cn("rounded-none lg:hidden"),
  mobileFilterIcon: cn("mr-2 h-4 w-4"),
  mobileSheetContent: cn("w-full max-w-sm border-border bg-background"),
  mobileSheetHeader: cn("sr-only"),
  layoutGrid: cn("grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]"),
  desktopAside: cn("hidden lg:block"),
  desktopFilterCard: cn("sticky top-24 border-border/60 bg-card/80 p-5"),
  productSection: cn("space-y-6"),
  actionButton: cn("rounded-none"),
  emptyCard: cn("border-border/60 bg-card/80"),
  emptyCardContent: cn(
    "flex min-h-60 flex-col items-center justify-center gap-4 p-6 text-center"
  ),
  emptyTitle: cn("text-xl font-semibold text-foreground"),
  productGrid: cn("grid gap-5 sm:grid-cols-2 xl:grid-cols-3"),
}

// collection details
export const collectionDetailsStyles = {
  pageWrapClass: cn("min-h-screen bg-background"),
  heroSectionClass: cn(
    "border-b border-border/60 bg-gradient-to-b from-primary/10 via-background to-background"
  ),
  heroContainerClass: cn("mx-auto max-w-7xl px-4 py-8"),
  backButtonClass: cn("mb-4 rounded-none px-0 hover:bg-transparent"),
  backIconClass: cn("mr-2 h-4 w-4"),
  heroContentClass: cn("space-y-2"),
  heroEyebrowClass: cn("text-sm tracking-[0.2em] text-primary uppercase"),
  heroTitleClass: cn(
    "max-w-3xl text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
  ),
  contentContainerClass: cn("mx-auto max-w-7xl px-4 py-8"),
  contentGridClass: cn("grid gap-8 lg:grid-cols-[1.05fr_0.95fr]"),
  relatedSectionClass: cn("mt-14 space-y-5"),
  relatedHeadingWrapClass: cn("space-y-1"),
  relatedEyebrowClass: cn("text-sm tracking-[0.18em] text-primary uppercase"),
  relatedTitleClass: cn(
    "text-2xl font-semibold tracking-tight text-foreground"
  ),
  relatedGridClass: cn("grid gap-5 sm:grid-cols-2 xl:grid-cols-4"),
}
