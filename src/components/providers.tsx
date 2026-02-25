"use client"

import { ClerkProvider,SignInButton,useAuth, UserButton } from "@clerk/nextjs"
import { Authenticated, AuthLoading, ConvexReactClient, Unauthenticated } from "convex/react"
import { ConvexProviderWithClerk } from "convex/react-clerk"
import { ThemeProvider } from "@/components/theme-provider"
import { dark } from "@clerk/themes"
import { UnauthenticatedView } from "@/features/auth/components/unauthenticated-view"
import { LoadingIndicator } from "@/features/auth/components/auth-loadingbar"

const  convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export const Providers = ({children}:{children:React.ReactNode}) => {
    return(
      <ClerkProvider  appearance={
      {
        theme:dark
      }
    }>
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>     
        <ThemeProvider attribute={'class'} defaultTheme="dark" enableSystem disableTransitionOnChange>
        <Authenticated>
        
 {children}
        </Authenticated>
        <Unauthenticated>
          <UnauthenticatedView/>
                  </Unauthenticated>
        <AuthLoading>  
          <LoadingIndicator/>
        </AuthLoading>
       
        </ThemeProvider>

        </ConvexProviderWithClerk>

      </ClerkProvider>
    )

};