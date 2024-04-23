import { Input } from "@/components/ui/input"
import Main from "@/components/ui/main"
import Title from "@/components/ui/title"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Lightbulb } from "lucide-react"
import AddProductForm from "./_components/AddProductForm"

function AddProductPage() {
    return (
        <Main classname="space-y-6">
            <div className="flex">
                <Title className="mr-2">Add Product</Title>
                <AddProductTips />
            </div>
            <AddProductForm/>
        </Main>
    )
}

export default AddProductPage

function AddProductTips() {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Lightbulb />
                </TooltipTrigger>
                <TooltipContent side="bottom">
                    <p className="max-w-[300px]">
                        Craft a specific and engaging title that clearly
                        communicates the product&apos;s benefits or unique
                        features.
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
