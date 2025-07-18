"use client"

import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase/client';
import React, { useState } from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (password === confirmPassword) {
      setLoading(true);
      const {error } = await supabase.auth.signUp({
        email,
        password,
      })
      setLoading(false);
      if (error) {
        alert(error.message);
      } else {
        alert("Check your email for confirmation")
        window.location.href = '/auth/confirm-email'
      }
    } else {
      alert("Passwords do not match");
    }
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center'>
      <Card className="w-full max-w-sm bg-transparent border-white">
        <CardHeader>
          <CardTitle>Sign Up for ProjectOn</CardTitle>
          <CardDescription>
            Enter your email and password
          </CardDescription>
          <CardAction>
            <Link href="/auth/login">
              <Button variant="link">Login</Button>
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
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" required onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full" onClick={handleSignup} disabled={loading}>
            {loading ? "Creating account..." : "Let's go 🤝"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SignUp;