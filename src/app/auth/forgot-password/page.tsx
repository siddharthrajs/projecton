import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

const ForgotPassword = () => {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center'>
      <div className='flex flex-col gap-4 w-sm max-w-sm border border-white p-6 rounded-2xl'>
        <Label htmlFor='email'>Enter your email</Label>
        <Input type='text' placeholder='m@example.com' className='w-full'></Input>
        <Button>
          Send reset link
        </Button>
      </div>
    </div>
  )
}

export default ForgotPassword
