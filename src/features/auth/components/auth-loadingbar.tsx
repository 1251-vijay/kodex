import { Spinner } from "@/components/ui/spinner"
import { Loader2Icon, LoaderCircle } from "lucide-react"

export const LoadingIndicator = ()=>{
    return(
        <div className="h-screen flex items-center justify-center">
            <Spinner className="size-6" />
        </div>
    )
}