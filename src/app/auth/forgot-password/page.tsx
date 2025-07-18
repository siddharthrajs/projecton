"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import { supabase } from '@/lib/supabase/client'

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleForgotPassword = async () => {
    setLoading(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`
    })
    setLoading(false)
    if (error) {
      alert(error.message)
    } else {
      alert("Password reset link sent! Check your email.")
    }
  }

  return (
    <div className='min-h-screen flex flex-col justify-center items-center'>
      <div className='flex flex-col gap-4 w-sm max-w-sm border border-white p-6 rounded-2xl'>
        <Label htmlFor='email'>Enter your email</Label>
        <Input
          type='email'
          placeholder='m@example.com'
          className='w-full'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Button onClick={handleForgotPassword} disabled={loading}>
          {loading ? "Sending..." : "Send reset link"}
        </Button>
      </div>
    </div>
  )
}

export default ForgotPassword
