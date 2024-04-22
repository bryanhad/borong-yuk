import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

type ModalProps = {
    children: React.ReactNode
    // disableDefaultModalClose?: boolean
    title?: string
    desc?: string
    open?: boolean
    onOpenChange?: (open: boolean) => void
} & (
    | { buttonText: string; buttonCustom?: never }
    | {
          buttonCustom: React.ReactNode
          buttonText?: never
      }
)

function Modal({
    open,
    onOpenChange,
    children,
    buttonCustom,
    buttonText,
    title,
    desc,
}: // disableDefaultModalClose = false,
ModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {buttonCustom && (
                <DialogTrigger asChild>{buttonCustom}</DialogTrigger>
            )}
            {buttonText && (
                <DialogTrigger asChild>
                    <Button variant={"outline"}>{buttonText}</Button>
                </DialogTrigger>
            )}
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {desc && (
                        <DialogDescription>
                            Anyone who has this link will be able to view this.
                        </DialogDescription>
                    )}
                </DialogHeader>
                <div className="flex items-center space-x-2">{children}</div>
            </DialogContent>
        </Dialog>
    )
}

export default Modal
