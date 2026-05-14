import type { PromoFormValues } from "@/features/admin/Promo/types"
import React, { useEffect, useState } from "react"
import { defaultForm } from "./constants"
import { useAdminPromoStore } from "@/features/admin/Promo/useAdminPromStore"
import { toDateTimeLocal } from "@/lib/functions"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { promoDialogStyles } from "@/pages/admin/constants"

const PromoDialog = () => {
  const {
    editingPromo: promo,
    savePromo: onSaved,
    promoDialogOpen: open,
    setPromoDialogToggle: onPromoToogle,
    saving,
  } = useAdminPromoStore()
  const [form, setForm] = useState<PromoFormValues>(defaultForm)
  const isEditMode = !!promo

  useEffect(() => {
    if (!open) {
      setForm(defaultForm)
      return
    }

    if (promo) {
      setForm({
        code: promo.code,
        percentage: String(promo.percentage),
        count: String(promo.count),
        minimumOrderValue: String(promo.minimumOrderValue),
        startsAt: toDateTimeLocal(promo.startsAt),
        endsAt: toDateTimeLocal(promo.endsAt),
      })

      return
    }

    setForm(defaultForm)
  }, [open, promo])

  function updateField<K extends keyof PromoFormValues>(
    key: K,
    value: PromoFormValues[K]
  ) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }))
  }

  async function submit() {
    if (
      !form.code.trim() ||
      !form.percentage.trim() ||
      !form.count.trim() ||
      !form.minimumOrderValue.trim() ||
      !form.startsAt.trim() ||
      !form.endsAt.trim()
    ) {
      return
    }

    try {
      await onSaved({
        code: form.code.trim().toUpperCase(),
        percentage: form.percentage,
        count: form.count,
        minimumOrderValue: form.minimumOrderValue,
        startsAt: new Date(form.startsAt).toISOString(),
        endsAt: new Date(form.endsAt).toISOString(),
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={() => onPromoToogle(!open)}>
      <DialogContent className={promoDialogStyles.dialogContentClass}>
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Promo" : "Add Promo"}</DialogTitle>
        </DialogHeader>
        <div className={promoDialogStyles.layoutClass}>
          <div className={promoDialogStyles.firstRowClass}>
            <div className={promoDialogStyles.fieldWrapClass}>
              <Label>Promo Code</Label>
              <Input
                className={promoDialogStyles.inputClass}
                type="text"
                value={form.code}
                placeholder="SUMMARY10"
                onChange={(e) => updateField("code", e.target.value)}
              />
            </div>

            <div className={promoDialogStyles.fieldWrapClass}>
              <Label>Discount Percentage</Label>
              <Input
                className={promoDialogStyles.inputClass}
                type="number"
                min={"1"}
                max={"100"}
                value={form.percentage}
                placeholder="10"
                onChange={(e) => updateField("percentage", e.target.value)}
              />
            </div>
          </div>

          <div className={promoDialogStyles.secondRowClass}>
            <div className={promoDialogStyles.fieldWrapClass}>
              <Label>Promo Count</Label>
              <Input
                className={promoDialogStyles.inputClass}
                type="number"
                min={"1"}
                value={form.count}
                placeholder="100"
                onChange={(e) => updateField("count", e.target.value)}
              />
            </div>

            <div className={promoDialogStyles.fieldWrapClass}>
              <Label>Minimum Order Value</Label>
              <Input
                className={promoDialogStyles.inputClass}
                type="number"
                min={"0"}
                value={form.minimumOrderValue}
                placeholder="999"
                onChange={(e) =>
                  updateField("minimumOrderValue", e.target.value)
                }
              />
            </div>
          </div>

          <div className={promoDialogStyles.thirdRowClass}>
            <div className={promoDialogStyles.fieldWrapClass}>
              <Label>Valid From</Label>
              <Input
                className={promoDialogStyles.inputClass}
                type="datetime-local"
                value={form.startsAt}
                onChange={(e) => updateField("startsAt", e.target.value)}
              />
            </div>

            <div className={promoDialogStyles.fieldWrapClass}>
              <Label>Valid Till</Label>
              <Input
                className={promoDialogStyles.inputClass}
                type="datetime-local"
                value={form.endsAt}
                onChange={(e) => updateField("endsAt", e.target.value)}
              />
            </div>
          </div>

          <div className={promoDialogStyles.footerClass}>
            <Button
              className={promoDialogStyles.outlineButtonClass}
              variant={"secondary"}
              onClick={() => onPromoToogle(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={submit}
              disabled={saving}
              className={promoDialogStyles.primaryButtonClass}
            >
              {saving
                ? "Saving..."
                : isEditMode
                  ? "Update Promo"
                  : "Create Promo"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PromoDialog
