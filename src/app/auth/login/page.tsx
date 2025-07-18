import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import React from 'react'

const Login = () => {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center'>
      <Card className='w-full max-w-sm'>
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
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/auth/forgot-password">
                    <Button variant="link">
                      Forgot your password?
                    </Button>
                  </Link>
                </div>
                <Input type='text' placeholder='*********'></Input>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className='w-full'>Login</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login
