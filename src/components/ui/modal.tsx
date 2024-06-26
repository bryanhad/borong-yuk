import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

type ModalProps = {
    children: React.ReactNode
    // disableDefaultModalClose?: boolean
    title?: string
    desc?: string
    open?: boolean
    onOpenChange?: (open: boolean) => void
    className?: string
    disableDefaultCloseButton?: boolean
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
    className,
    disableDefaultCloseButton,
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
            <DialogContent
                disableDefaultCloseButton={disableDefaultCloseButton}
                className={cn("sm:max-w-md", className)}
            >
                {(title || desc) && (
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        {desc && (
                            <DialogDescription>
                                Anyone who has this link will be able to view
                                this.
                            </DialogDescription>
                        )}
                    </DialogHeader>
                )}
                <div className="flex items-center space-x-2">{children}</div>
            </DialogContent>
        </Dialog>
    )
}

export default Modal
