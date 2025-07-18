'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SocialIcon } from 'react-social-icons'
import { createClient } from '@/lib/supabase/client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { branches } from '@/data/static'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { X } from 'lucide-react'


type Profile = {
  id: string
  created_at: string
  username: string
  name: string | null
  bio: string | null
  skills: string[] | null
  linkedin_link: string | null
  github_link: string | null
  twitter_link: string | null
  branch: string | null
  batch_year: number | null
  portfolio_url: string | null
  avatar_url: string | null
  profile_completed: boolean
}

function ProfileForm({ profile, onSave, onCancel }: {
  profile?: Profile | null
  onSave: () => void
  onCancel?: () => void
}) {
  const [form, setForm] = useState({
    username: profile?.username || '',
    name: profile?.name || '',
    bio: profile?.bio || '',
    skills: profile?.skills?.join(', ') || '',
    branch: profile?.branch || '',
    batch_year: profile?.batch_year?.toString() || '',
    linkedin_link: profile?.linkedin_link || '',
    github_link: profile?.github_link || '',
    twitter_link: profile?.twitter_link || '',
    portfolio_url: profile?.portfolio_url || '',
    avatar_url: profile?.avatar_url || '',
  })
  const [errors, setErrors] = useState<{ [k: string]: string }>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const validate = () => {
    const errs: { [k: string]: string } = {}
    if (!form.username.trim()) errs.username = 'Username is required'
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.branch.trim()) errs.branch = 'Branch is required'
    if (!form.batch_year.trim()) errs.batch_year = 'Batch year is required'
    return errs
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setSubmitting(true)
    setSubmitError(null)
    try {
      const supabase = createClient()
      const { error } = await supabase.from('profiles').upsert({
        ...profile,
        username: form.username.trim(),
        name: form.name.trim(),
        bio: form.bio.trim() || null,
        skills: form.skills.split(',').map(s => s.trim()).filter(Boolean),
        branch: form.branch,
        batch_year: Number(form.batch_year),
        linkedin_link: form.linkedin_link.trim() || null,
        github_link: form.github_link.trim() || null,
        twitter_link: form.twitter_link.trim() || null,
        portfolio_url: form.portfolio_url.trim() || null,
        avatar_url: form.avatar_url.trim() || null,
        profile_completed: true,
      })
      if (error) throw error
      onSave()
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'message' in err && typeof (err as { message?: string }).message === 'string') {
        setSubmitError('Could not save profile. ' + ((err as { message?: string }).message || ''))
      } else {
        setSubmitError('Could not save profile.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{profile ? 'Edit Profile' : 'Create Profile'}</h2>
        {onCancel && (
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="username">Username *</Label>
          <Input
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
          {errors.username && <div className="text-red-500 text-xs">{errors.username}</div>}
        </div>
        <div>
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
          {errors.name && <div className="text-red-500 text-xs">{errors.name}</div>}
        </div>
        <div>
          <Label htmlFor="branch">Branch *</Label>
          <Select
            value={form.branch}
            onValueChange={value => setForm(f => ({ ...f, branch: value }))}
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select branch" />
            </SelectTrigger>
            <SelectContent>
              {branches.map(b => (
                <SelectItem key={b} value={b}>{b}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.branch && <div className="text-red-500 text-xs">{errors.branch}</div>}
        </div>
        <div>
          <Label htmlFor="batch_year">Batch Year *</Label>
          <Input
            id="batch_year"
            name="batch_year"
            type="number"
            value={form.batch_year}
            onChange={handleChange}
            placeholder="YYYY"
            required
          />
          {errors.batch_year && <div className="text-red-500 text-xs">{errors.batch_year}</div>}
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="skills">Skills (comma separated)</Label>
          <Input
            id="skills"
            name="skills"
            value={form.skills}
            onChange={handleChange}
            placeholder="e.g. React, Node.js"
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            value={form.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself"
          />
        </div>
        <div>
          <Label htmlFor="linkedin_link">LinkedIn</Label>
          <Input
            id="linkedin_link"
            name="linkedin_link"
            type="url"
            value={form.linkedin_link}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/..."
          />
        </div>
        <div>
          <Label htmlFor="github_link">GitHub</Label>
          <Input
            id="github_link"
            name="github_link"
            type="url"
            value={form.github_link}
            onChange={handleChange}
            placeholder="https://github.com/..."
          />
        </div>
        <div>
          <Label htmlFor="twitter_link">Twitter</Label>
          <Input
            id="twitter_link"
            name="twitter_link"
            type="url"
            value={form.twitter_link}
            onChange={handleChange}
            placeholder="https://twitter.com/..."
          />
        </div>
        <div>
          <Label htmlFor="portfolio_url">Portfolio URL</Label>
          <Input
            id="portfolio_url"
            name="portfolio_url"
            type="url"
            value={form.portfolio_url}
            onChange={handleChange}
            placeholder="https://yourportfolio.com"
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="avatar_url">Avatar URL</Label>
          <Input
            id="avatar_url"
            name="avatar_url"
            type="url"
            value={form.avatar_url}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>
      </div>
      {submitError && (
        <div className="text-red-500 text-sm">{submitError}</div>
      )}
      <div className="flex gap-4">
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Saving...' : (profile ? 'Save Changes' : 'Create Profile')}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true)
      setError(null)
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .limit(1)
          .single()
        if (error) throw error
        setProfile(data)
      } catch (err) {
        setProfile(null)
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  if (loading) {
    return <div className="max-w-4xl mx-auto py-12 px-4">Loading...</div>
  }

  if (error) {
    return <div className="max-w-4xl mx-auto py-12 px-4 text-red-500">{error}</div>
  }

  if (!profile && !editing) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <ProfileForm onSave={() => window.location.reload()} />
      </div>
    )
  }

  if (editing) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <Card>
          <CardContent className="p-6">
            <ProfileForm
              profile={profile}
              onSave={() => {
                setEditing(false)
                window.location.reload()
              }}
              onCancel={() => setEditing(false)}
            />
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Profile</h1>
        <Button onClick={() => setEditing(true)}>
          Edit Profile
        </Button>
      </div>
      <Card>
        <CardContent className="p-6 grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold">{profile?.name || profile?.username}</h2>
            <p className="text-muted-foreground">@{profile?.username}</p>
            <Avatar className='size-24 m-2'>
              <AvatarImage
                src={profile?.avatar_url || undefined}
              />
              <AvatarFallback>
                {profile?.name?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Personals</h3>
            <p>Branch: {profile?.branch || '-'}</p>
            <p>Batch Year: {profile?.batch_year || '-'}</p>
            
            <h3 className="text-lg font-semibold mt-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {profile?.skills?.map((skill, index) => (
                <Badge key={index}>{skill}</Badge>
              )) || 'No skills added.'}
            </div>
          </div>
          <div>
            
            <h3 className="text-lg font-semibold">Bio</h3>
            <p>{profile?.bio || 'No bio yet.'}</p>
            <br />
            <p>
              Visit my porfolio here: <br />
              <a href={profile?.portfolio_url || undefined} target="_blank" rel="noopener noreferrer" className='text-blue-500 underline'>
                Portfolio
              </a>
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Socials</h3>
            <div className="max-h-fit flex gap-4">
              {profile?.linkedin_link && (
                <SocialIcon url={profile.linkedin_link} />
              )}
              {profile?.github_link && (
                <SocialIcon url={profile.github_link} />
              )}
              {profile?.twitter_link && (
                <SocialIcon url={profile.twitter_link} />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
