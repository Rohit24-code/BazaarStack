import { TABLE_HEADERS, tableStyles } from "./constants"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getCoverImage } from "@/features/admin/products/hooks/useProductForm"
import { useProductStore } from "@/features/admin/products/store"
import { ProductTableRow } from "./ProductTableRow"

export function ProductTable() {
  const { openEditDialog: onEdit, products, loading } = useProductStore()

  const renderState = (message: string) => (
    <TableRow>
      <TableCell
        colSpan={TABLE_HEADERS.length}
        className={tableStyles.stateCellClass}
      >
        {message}
      </TableCell>
    </TableRow>
  )

  return (
    <div className={tableStyles.wrapperClass}>
      <Table>
        <TableHeader className={tableStyles.tableHeaderClass}>
          <TableRow>
            {TABLE_HEADERS.map((header) => (
              <TableHead key={header.label} className={header.className}>
                {header.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading
            ? renderState("Loading Products...")
            : products.length === 0
              ? renderState("No products found!!!")
              : products.map((product) => {
                  const cover = getCoverImage(product.images)
                  return (
                    <ProductTableRow
                      key={product._id}
                      product={product}
                      onEdit={() => onEdit(product)}
                    />
                  )
                })}
        </TableBody>
      </Table>
    </div>
  )
}
