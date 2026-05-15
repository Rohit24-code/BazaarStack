import { cn } from "@/lib/utils"

// customer product card
export const customerProductCardStyles = {
  card: cn(
    "overflow-hidden border-border/60 bg-card/80 transition hover:border-primary/50"
  ),
  link: cn("block"),
  imageWrap: cn("relative aspect-[4/5] bg-muted"),
  image: cn(
    "h-full w-full object-cover transition duration-300 hover:scale-[1.02]"
  ),
  noImage: cn(
    "flex h-full items-center justify-center text-sm text-muted-foreground"
  ),
  saleBadge: cn(
    "absolute top-3 left-3 border-primary/30 bg-secondary text-primary hover:bg-secondary"
  ),
  content: cn("space-y-4 p-4"),
  detailsWrap: cn("space-y-1"),
  brand: cn("text-xs tracking-[0.18em] text-muted-foreground uppercase"),
  title: cn("line-clamp-1 text-base font-semibold text-foreground"),
  category: cn("text-sm text-muted-foreground"),
  priceRow: cn("flex items-center gap-2"),
  salePrice: cn("text-base font-semibold text-foreground"),
  originalPrice: cn("text-sm text-muted-foreground line-through"),
  colorsWrap: cn("flex items-center gap-2"),
  colorSwatch: cn("h-4 w-4 border border-border"),
  extraColors: cn("text-xs text-muted-foreground"),
  footer: cn("flex items-center justify-between gap-3"),
  button: cn("rounded-none px-4"),
}

// customer filter
export const customerFilterStyles = {
  panelWrapClass: cn("space-y-6 overflow-y-auto px-4 py-2 lg:px-0 lg:py-0"),
  panelHeaderClass: cn("flex items-center justify-between gap-3"),
  titleClass: cn("text-base font-semibold text-foreground"),
  clearButtonClass: cn("rounded-none px-2 text-sm"),
  sectionClass: cn("space-y-3"),
  sectionTitleClass: cn("text-sm font-medium text-foreground"),
  stackedOptionsClass: cn("space-y-1"),
  fullWidthButtonClass: cn("w-full justify-start rounded-none"),
  colorsWrapClass: cn("flex flex-wrap gap-3"),
  colorButtonBaseClass: cn(
    "flex flex-col items-center gap-2 text-xs text-muted-foreground"
  ),
  colorButtonActiveClass: cn("text-foreground"),
  colorSwatchBaseClass: cn("h-8 w-8 border"),
  colorSwatchActiveClass: cn("border-primary ring-2 ring-primary/30"),
  colorSwatchInactiveClass: cn("border-border"),
  helperTextClass: cn("text-sm text-muted-foreground"),
  sizesWrapClass: cn("flex flex-wrap gap-2"),
  sizeButtonClass: cn("min-w-12 rounded-none"),
}

// customer product details gallery
export const customerProductDetailsGalleryStyles = {
  galleryWrapClass: cn("space-y-4"),
  mainImageCardClass: cn("overflow-hidden border-border/60 bg-card/80"),
  mainImageWrapClass: cn("aspect-[4/5] bg-muted"),
  imageClass: cn("h-full w-full object-cover"),
  noImageClass: cn(
    "flex h-full items-center justify-center text-sm text-muted-foreground"
  ),
  thumbnailsGridClass: cn("grid grid-cols-4 gap-3 sm:grid-cols-5"),
  thumbnailButtonBaseClass: cn("overflow-hidden border bg-card"),
  thumbnailButtonActiveClass: cn("border-primary ring-2 ring-primary/30"),
  thumbnailButtonInactiveClass: cn("border-border/60"),
  thumbnailImageWrapClass: cn("aspect-square bg-muted"),
}

// customer product details summary
export const customerProductDetailsSummaryStyles = {
  summaryWrapClass: cn("space-y-6"),
  badgesWrapClass: cn("flex flex-wrap items-center gap-2"),
  categoryBadgeClass: cn(
    "border-border bg-secondary text-secondary-foreground hover:bg-secondary"
  ),
  stockBadgeClass: cn(
    "border-primary/30 bg-primary/15 text-primary hover:bg-primary/15"
  ),
  metaGridClass: cn("grid gap-3 text-sm sm:grid-cols-2"),
  metaItemClass: cn("space-y-1"),
  metaLabelClass: cn("block text-muted-foreground"),
  metaValueClass: cn("block font-medium text-foreground"),
  priceBlockClass: cn("space-y-3"),
  priceRowClass: cn("flex flex-wrap items-center gap-3"),
  salePriceClass: cn("text-3xl font-semibold text-foreground"),
  originalPriceClass: cn("text-lg text-muted-foreground line-through"),
  descriptionClass: cn(
    "text-sm leading-7 whitespace-pre-line text-muted-foreground"
  ),
  actionButtonsClass: cn("flex flex-col gap-3 sm:flex-row"),
  primaryButtonClass: cn("rounded-none sm:flex-1"),
  secondaryButtonClass: cn("rounded-none sm:flex-1"),
  iconClass: cn("mr-2 h-4 w-4"),
}

// customer options group
export const customerOptionsGroupStyles = {
  wrapClass: cn("flex flex-wrap gap-2"),
  baseButtonClass: cn(
    "inline-flex items-center justify-center gap-2 border px-4 py-2 text-sm font-medium transition"
  ),
  activeButtonClass: cn(
    "border-primary bg-primary/15 text-primary ring-2 ring-primary/20"
  ),
  inactiveButtonClass: cn(
    "border-border bg-secondary text-secondary-foreground hover:border-primary/40"
  ),
  sizeButtonClass: cn("min-w-12 rounded-none"),
  colorButtonClass: cn("rounded-none"),
  swatchClass: cn("h-4 w-4 border border-border"),
}

// customer related product cards
export const customerRelatedProductCardStyles = {
  cardClass: cn(
    "overflow-hidden border-border/60 bg-card/80 transition hover:border-primary/50"
  ),
  linkClass: cn("block"),
  imageWrapClass: cn("aspect-[4/5] bg-muted"),
  imageClass: cn("h-full w-full object-cover"),
  noImageClass: cn(
    "flex h-full items-center justify-center text-sm text-muted-foreground"
  ),
  contentClass: cn("space-y-2 p-4"),
  brandClass: cn("text-xs tracking-[0.18em] text-muted-foreground uppercase"),
  titleClass: cn("line-clamp-1 text-base font-semibold text-foreground"),
  priceRowClass: cn("flex items-center gap-2"),
  salePriceClass: cn("font-semibold text-foreground"),
  originalPriceClass: cn("text-sm text-muted-foreground line-through"),
}

// wishlist style
export const customerWishlistStyles = {
  dialogClass: cn("sm:max-w-xl"),
  contentClass: cn("space-y-4"),
  listClass: cn("space-y-3"),
  itemClass: cn(
    "flex items-start gap-3 border border-border/60 bg-card/80 p-3"
  ),
  imageClass: cn("h-20 w-16 shrink-0 object-cover"),
  noImageClass: cn(
    "flex h-20 w-16 shrink-0 items-center justify-center bg-muted text-xs text-muted-foreground"
  ),
  bodyClass: cn("min-w-0 flex-1 space-y-1"),
  brandClass: cn("text-xs tracking-[0.18em] text-muted-foreground uppercase"),
  titleClass: cn("line-clamp-2 text-sm font-medium text-foreground"),
  priceClass: cn("text-sm font-semibold text-foreground"),
  actionsClass: cn("flex gap-2 pt-1"),
  buttonClass: cn("h-8 rounded-none px-3 text-xs"),
  emptyClass: cn("text-sm text-muted-foreground"),
  iconClass: cn("h-4 w-4"),
  DialogTitleClass: cn("flex items-center gap-2"),
  trashIcon: cn("mr-2 h-4 w-4"),
}
