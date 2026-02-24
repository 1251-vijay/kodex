import { Button } from "@/components/ui/button"
import {Item,ItemActions,ItemContent,ItemDescription,ItemMedia, ItemTitle} from "@/components/ui/item"
import { SignInButton } from "@clerk/nextjs"
import { ShieldAlertIcon } from "lucide-react"

export const UnauthenticatedView = ()=>{
    return(
        <div className="flex items-center justify-center h-screen bg-background">
            <div className="max-w-lg w-full bg-muted">
                <Item variant={'outline'}>
                    
                    <ItemMedia variant={'icon'}>
                        <ShieldAlertIcon/>
                    
                    </ItemMedia>
                    <ItemContent>
                        <ItemTitle>Unauthorized Access</ItemTitle>
                        <ItemDescription>Your not authorized to access this resources.</ItemDescription>
                    </ItemContent>
                    <ItemActions>
                        <SignInButton>
                            <Button variant={"outline"}>Sign in</Button>
                        </SignInButton>
                    </ItemActions>
                </Item>
            </div>

        </div>
    )
}