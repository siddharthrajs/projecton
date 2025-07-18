import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const ConfirmEmail = () => {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center'>
      <div className="w-full max-w-sm flex flex-col items-center">
        <h1 className='text-2xl font-bold'>Thank You for Signing up</h1>
        <p>Check your email for confimation link and login again</p>
        <Link href="/auth/login">
          <Button className='max-w-24 m-6'>Login</Button>
        </Link>
      </div>
    </div>
  )
}

export default ConfirmEmail
