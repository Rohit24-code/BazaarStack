import { tableStyles } from "./constants"
import { getCoverImage } from "@/features/admin/products/hooks/useProductForm"
import { useProductStore } from "@/features/admin/products/store"
import { DataTable, type ColumnDef } from "@/components/ui/DataTable"
import type { Product } from "@/features/admin/products/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"

const useProductColumns = (): ColumnDef<Product>[] => {
  const { openEditDialog: onEdit } = useProductStore()

  return [
    {
      header: "Image",
      render: (product) => {
        const cover = getCoverImage(product.images)
        return (
          <div className={tableStyles.imageBoxClass}>
            {cover ? (
              <img
                src={cover.url}
                alt={product.title}
                className={tableStyles.imageClass}
              />
            ) : null}
          </div>
        )
      },
    },
    {
      header: "Title",
      render: (product) => (
        <div className={tableStyles.titleWrapClass}>
          <span className={tableStyles.titleClass}>{product.title}</span>
        </div>
      ),
    },
    {
      header: "Brand",
      accessorKey: "brand",
    },
    {
      header: "Category",
      render: (product) => product.category?.name,
    },
    {
      header: "Price",
      accessorKey: "price",
    },
    {
      header: "Status",
      render: (product) => (
        <Badge variant={product.status === "active" ? "default" : "secondary"}>
          {product.status}
        </Badge>
      ),
    },
    {
      header: "Stock",
      accessorKey: "stock",
    },
    {
      header: "Edit",
      render: (product) => (
        <div className={tableStyles.editCellWrapClass}>
          <Button size="icon" variant="ghost" onClick={() => onEdit(product)}>
            <Pencil className={tableStyles.editIconClass} />
          </Button>
        </div>
      ),
    },
  ]
}

export function ProductTable() {
  const { products, loading } = useProductStore()
  const columns = useProductColumns()

  return (
    <DataTable
      wrapClassName={tableStyles.wrapperClass}
      columns={columns}
      data={products}
      loading={loading}
      loadingMessage="Loading Products..."
      emptyMessage="No products found!!!"
    />
  )
}
