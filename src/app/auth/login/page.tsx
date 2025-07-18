"use client"

import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'
import React, { useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email, password,
    })

    setLoading(false);
    if (error) {
      alert(error.message);
    }
    else {
      window.location.href = "/dashboard"
    }
  }

  return (
    <div className='min-h-screen flex flex-col justify-center items-center'>
      <Card className='w-full max-w-sm bg-transparent border-white'>
        <CardHeader>
          <CardTitle>
            Log into your account
          </CardTitle>
          <CardDescription>
            Enter your email and password
          </CardDescription>
          <CardAction>
            <Link href="/auth/signup">
              <Button variant="link">Sign Up</Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required 
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/auth/forgot-password" className='hover:underline'>
                      Forgot your password?
                  </Link>
                </div>
                <Input type='password' placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)}/>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button type='submit' className='w-full' onClick={handleLogin}>{loading ? "Loggin you in..." : "Let's go 🤟"}</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login
