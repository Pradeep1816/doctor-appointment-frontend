import { clerkClient,clerkMiddleware,createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define which routes are public (accessible without authentication)
const isPublicRoute = createRouteMatcher([
    '/sign-in',
    '/sign-up',
    '/',
]);

export default clerkMiddleware(async (auth, req) => {
    const { userId} = await auth();
  
    if(userId){
              try {
                const client=await clerkClient();
                const user=   await client.users.getUser(userId);
                const role=user?.unsafeMetadata?.role;
                console.log(user,role)
                if(role==="doctor" && req.nextUrl.pathname==="/dashboard"){

                  return NextResponse.redirect(new URL("/doctor/dashboard",req.url))

                }

                if(role==="patient" && req.nextUrl.pathname==="/dashboard"){

                  return NextResponse.redirect(new URL("/patient/dashboard",req.url))

                }
              } catch (error) {
                console.log(error)
              }   
    }


    if (userId && isPublicRoute(req)) {
        return NextResponse.redirect(new URL('/doctor/list', req.url));
    }

    // If the user is not authenticated and the route is protected, redirect to sign-in
    if (!userId && !isPublicRoute(req)) {
        return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    // Allow access if the user is authenticated or if it’s a public route
    return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
