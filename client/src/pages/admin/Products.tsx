import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { styles } from "./constants"
import { ProductToolbar } from "@/components/admin/Products/ProductToolbar"
import { useAdminProducts } from "@/features/admin/products/hooks/useAdminProducts"
import { CategoryDialog } from "@/components/admin/Products/CategoryDialog"
import { useProductStore } from "@/features/admin/products/store"

function AdminProducts() {
  return (
    <div className={styles.pageWrap}>
      <Card className={styles.cardClass}>
        <CardHeader className={styles.cardHeaderClass}>
          <CardTitle className={styles.cardTitleClass}>Products</CardTitle>
          <ProductToolbar />
        </CardHeader>

        <CardContent>Table</CardContent>

        <CategoryDialog />
      </Card>
    </div>
  )
}

export default AdminProducts
