"use client"

import { UserButton, useUser } from "@clerk/nextjs"
import Link from "next/link"
export default function Header() {

  const { user } = useUser();
  return (
    <div className="bg-stone-300 ">
      <div className="container mx-auto flex items-center justify-between p-3">

        <Link href="/">Home</Link>


        <div className="flex gap-2">
          {user?.id &&
            <>
              <Link href="/userprofile">Profile</Link>
              <UserButton afterSignOutUrl="/" />
            </>
          }
        </div>

      </div>
    </div>
  )
}


