import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@clerk/react"
import { LogOut, ShoppingBag, Store, User } from "lucide-react"
import { Link } from "react-router-dom"
import { styles, navPages } from "./constants"
import { NavTextLink } from "./NavTextLink"
import CustomerMobileNavbar from "./MobileNavbar"

function CustomerNavbar() {
  const { isSignedIn, signOut } = useAuth()

  return (
    <header className={styles.headerClass}>
      <div className={styles.shell}>
        <div className={styles.desktopBrandWrap}>
          <Link to={"/"} className={styles.brandWrap}>
            <Store className="h-10 w-10" />
            <h1 className={styles.brandTitle}>
              <span className="text-2xl font-bold text-primary md:text-3xl lg:text-4xl">
                Bazaar
              </span>
              Stack
            </h1>
          </Link>
          <div className={styles.desktopCollectionsWrap}>
            <NavTextLink {...navPages.collections} />
          </div>
        </div>

        <nav className={styles.desktopNav}>
          <NavTextLink {...navPages.wishlist} />
          {isSignedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={styles.dropdownButton}>
                  <User className="h-4.5 w-4.5" />
                  Account
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className={styles.accountDropdownContent}
              >
                <DropdownMenuItem asChild>
                  <Link to={"/account"} className={styles.dropdownItemLink}>
                    <User className="h-4.5 w-4.5" />
                    <span>My Account</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                  <div className={styles.dropdownItemLink}>
                    <LogOut className="h-4.5 w-4.5" />
                    <span>Log Out</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <NavTextLink {...navPages.login} />
          )}

          <Link to={"/cart"} className={styles.iconLink}>
            <ShoppingBag className="h-4.5 w-4.5" />
            <span className={styles.cartBadge}>0</span>
          </Link>
        </nav>
        <CustomerMobileNavbar isSignedIn={!!isSignedIn} />
      </div>
    </header>
  )
}

export default CustomerNavbar
