import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

const ResePassword = () => {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center'>
      <div className="w-full max-w-sm p-6 border rounded-2xl border-white flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label>New Password</Label>
          <Input type="password" placeholder='Enter new password' />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Confirm Password</Label>
          <Input type="password" placeholder='Enter new password' />
        </div>
      </div>
    </div>
  )
}

export default ResePassword
