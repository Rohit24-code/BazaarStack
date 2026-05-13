import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { BRANDS } from "@/features/admin/products/constants"
import type {
  Category,
  Product,
  ProductStatus,
} from "@/features/admin/products/types"
// import { ColorPicker } from "./color-picker"
// import { SizeSelector } from "./size-selector"
// import { ImagePicker } from "./image-picker"
import { Button } from "@/components/ui/button"

import { productDialogStyles } from "./constants"
import { useProductStore } from "@/features/admin/products/store"
import { useProductForm } from "@/features/admin/products/hooks/useProductForm"
import { ColorPicker } from "./ColorPicker"
import { SizeSelector } from "./SizePicker"
import { ImagePicker } from "./ImagePicker"

export function ProductDialog() {
  const {
    categories,
    products,
    productDialogOpen,
    setProductDialogToogle,
    refreshAll,
    editingProduct,
  } = useProductStore()

  const {
    form,
    saving,
    isEditMode,
    updateField,
    toggleSize,
    addColor,
    removeColor,
    addFiles,
    submit,
    removeExistingImage,
    changeCoverImage,
  } = useProductForm({ product: editingProduct })

  return (
    <Dialog
      open={productDialogOpen}
      onOpenChange={() => setProductDialogToogle(!productDialogOpen)}
    >
      <DialogContent className={productDialogStyles.dialogContentClass}>
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Update Product" : "Create Product"}
          </DialogTitle>
        </DialogHeader>
        <div className={productDialogStyles.contentWrapClass}>
          <div className={productDialogStyles.twoColumnGridClass}>
            <div className={productDialogStyles.fieldGroupClass}>
              <Label>Title</Label>
              <Input
                value={form.title}
                onChange={(event) => updateField("title", event.target.value)}
                placeholder="Title"
              />
            </div>

            <div className={productDialogStyles.fieldGroupClass}>
              <Label>Brand</Label>
              <Select
                value={form.brand}
                onValueChange={(val) => updateField("brand", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Brand" />
                </SelectTrigger>

                <SelectContent>
                  {BRANDS.map((brand) => (
                    <SelectItem key={brand} value={brand}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className={productDialogStyles.fieldGroupClass}>
            <Label>Description</Label>
            <Textarea
              value={form.description}
              onChange={(event) =>
                updateField("description", event.target.value)
              }
              rows={5}
              placeholder="Description"
            />
          </div>

          <div className={productDialogStyles.twoColumnGridClass}>
            <div className={productDialogStyles.fieldGroupClass}>
              <Label>Category</Label>
              <Select
                value={form.category}
                onValueChange={(val) => updateField("category", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className={productDialogStyles.fieldGroupClass}>
              <Label>Status</Label>
              <RadioGroup
                value={form.status}
                onValueChange={(value) =>
                  updateField("status", value as ProductStatus)
                }
                className={productDialogStyles.statusGroupClass}
              >
                <div className={productDialogStyles.statusItemClass}>
                  <RadioGroupItem value="active" id="product-status-active" />
                  <Label htmlFor="product-status-active">Active</Label>
                </div>

                <div className={productDialogStyles.statusItemClass}>
                  <RadioGroupItem
                    value="inactive"
                    id="product-status-inactive"
                  />
                  <Label htmlFor="product-status-inactive">Inactive</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className={productDialogStyles.threeColumnGridClass}>
            <div className={productDialogStyles.fieldGroupClass}>
              <Label>Price</Label>
              <Input
                value={form.price}
                onChange={(e) => updateField("price", e.target.value)}
                type="number"
                min="0"
                placeholder="0"
              />
            </div>

            <div className={productDialogStyles.fieldGroupClass}>
              <Label>Sale Percentage</Label>
              <Input
                value={form.salePercentage}
                onChange={(e) => updateField("salePercentage", e.target.value)}
                type="number"
                min="0"
                placeholder="0"
              />
            </div>

            <div className={productDialogStyles.fieldGroupClass}>
              <Label>Stock</Label>
              <Input
                value={form.stock}
                onChange={(e) => updateField("stock", e.target.value)}
                type="number"
                min="0"
                placeholder="0"
              />
            </div>
          </div>

          <div className={productDialogStyles.sectionGridClass}>
            <ColorPicker
              colors={form.colors}
              onAdd={addColor}
              onRemove={removeColor}
            />

            <SizeSelector selectedSizes={form.sizes} onToggle={toggleSize} />
          </div>

          <ImagePicker
            existingImages={form.existingImages}
            newFiles={form.newFiles}
            coverImagePublicId={form.coverImagePublicId}
            onFilesAdd={addFiles}
            onExistingRemove={removeExistingImage}
            onCoverImageChange={changeCoverImage}
          />

          <div className={productDialogStyles.actionsRowClass}>
            <Button
              variant="outline"
              onClick={() => setProductDialogToogle(false)}
            >
              Cancel
            </Button>

            <Button onClick={submit} disabled={saving}>
              {saving
                ? "Saving..."
                : isEditMode
                  ? "Update Product"
                  : "Create Product"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
