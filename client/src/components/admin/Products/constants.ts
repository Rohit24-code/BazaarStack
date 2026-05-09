import { cn } from "@/lib/utils"

export const styles = {
  wrapperClass: cn(
    "flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
  ),
  searchWrapClass: cn("relative w-full md:w-80"),
  searchIconClass: cn(
    "pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
  ),
  searchInputClass: cn("pl-9"),
  actionsWrapClass: cn("flex flex-col gap-3 sm:flex-row"),
  addIconClass: cn("mr-2 h-4 w-4"),
}

export const categoryStyles = {
  dialogContentClass: cn("sm:max-w-xl"),
  contentWrap: cn("space-y-4"),
  formRow: cn("flex gap-3"),
  categoriesList: cn("space-y-2"),
  categoryRow: cn(
    "flex items-center justify-between rounded-xl border border-border bg-card px-3 py-3"
  ),
  categoryInfo: cn("flex items-center gap-2"),
  categoryIcon: cn("h-4 w-4 text-muted-foreground"),
  categoryName: cn("text-sm font-medium text-foreground"),
  emptyStateClass: cn(
    "rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground"
  ),
  editButtonClass: cn("h-4 w-4"),
}
