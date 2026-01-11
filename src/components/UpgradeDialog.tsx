import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { CreditCard } from '@phosphor-icons/react'
import type { Language } from '@/lib/translations'
import { t } from '@/lib/translations'

interface UpgradeDialogProps {
  open: boolean
  onClose: () => void
  lang: Language
}

export function UpgradeDialog({ open, onClose, lang }: UpgradeDialogProps) {
  const text = t(lang)

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <CreditCard className="text-accent" size={28} />
            {text.limits.reached}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <p className="text-muted-foreground">
              {text.limits.freeLimit}
            </p>
            <p className="font-medium text-lg">
              {text.limits.upgradeMessage}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded-lg p-4 space-y-2">
              <div className="text-sm font-medium text-muted-foreground">
                {text.billing.monthly}
              </div>
              <div className="text-3xl font-bold text-primary">
                €3.99
              </div>
              <div className="text-sm text-muted-foreground">
                {text.billing.perMonth}
              </div>
            </div>

            <div className="border-2 border-accent rounded-lg p-4 space-y-2 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold">
                BEST VALUE
              </div>
              <div className="text-sm font-medium text-muted-foreground">
                {text.billing.yearly}
              </div>
              <div className="text-3xl font-bold text-accent">
                €29
              </div>
              <div className="text-sm text-muted-foreground">
                {text.billing.perYear}
              </div>
            </div>
          </div>

          <div className="space-y-2 bg-secondary p-4 rounded-lg">
            <div className="font-semibold mb-2">{text.billing.features}:</div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                {text.billing.unlimitedEntries}
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                {text.billing.noWatermark}
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                {text.billing.customRanges}
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                {text.billing.prioritySupport}
              </li>
            </ul>
          </div>

          <div className="flex gap-3">
            <Button onClick={onClose} variant="outline" className="flex-1">
              {text.common.cancel}
            </Button>
            <Button onClick={onClose} className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
              {text.limits.upgrade}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
