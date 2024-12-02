import React from 'react'
import { UserProfile } from '@clerk/nextjs'
function page() {
  return (
    <div>
      <div className='flex items-center justify-center p-2'>
        <UserProfile />
      </div>
    </div>
  )
}

export default page
