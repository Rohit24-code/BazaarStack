import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { styles } from "./constants"
import { ProductToolbar } from "@/components/admin/Products/ProductToolbar"
import { CategoryDialog } from "@/components/admin/Products/CategoryDialog"
import { ProductDialog } from "@/components/admin/Products/ProductDialog"

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
        <ProductDialog />
      </Card>
    </div>
  )
}

export default AdminProducts
