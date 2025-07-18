"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { createClient } from '@/lib/supabase/client';
import React, { useState } from 'react'

interface Superhero {
  id: number;
  name: string;
  league: string;
  super_powers: string[];
}

const Superheroes = () => {
  const [heroName, setHeroName] = useState("");
  const [heroLeague, setHeroLeague] = useState("");
  const [heroPowers, setHeroPowers] = useState<string[]>([]);
  const [superheroes, setSuperheroes] = useState<Superhero[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient();

  const addSuperhero = async () => {
    const hero = { name: heroName, league: heroLeague, super_powers: heroPowers };
    const { error } = await supabase.from('superheroes').insert(hero);
    if (error) {
      console.log(error);
    }
    setHeroLeague("");
    setHeroName("");
    setHeroPowers([]);
  }

  const getSuperheroes = async () => {
    setLoading(true)
    setError(null)
    const { data, error } = await supabase.from('superheroes').select()
    setLoading(false)
    if (error) {
      setError(error.message)
      setSuperheroes([])
    } else {
      setSuperheroes(data || [])
    }
  }

  return (
    <div className='min-h-screen flex justify-center items-center gap-6'>
      <div className='border p-6 rounded-2xl w-full max-w-2xl h-[400px] overflow-y-scroll'>
        <Button variant="default" onClick={getSuperheroes} disabled={loading} className='m-2'>
          {loading ? "Loading..." : "Get Superheroes"}
        </Button>
        <pre>{error}</pre>
        <div>
          {superheroes.map((hero) => (
            <div key={hero.id} className="mb-4 bg-gray-900 text-white rounded p-2">
              <div><strong>ID:</strong> {hero.id}</div>
              <div><strong>Name:</strong> {hero.name}</div>
              <div><strong>League:</strong> {hero.league}</div>
              <div><strong>Super Powers:</strong> {hero.super_powers.join(", ")}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4 border p-4 rounded-2xl">
        <p>Add superhero</p>
        <Input value={heroName} type='text' placeholder='Enter superhero name' onChange={(e) => setHeroName(e.target.value)} />
        <Input value={heroLeague} type='text' placeholder='Enter superhero league' onChange={(e) => setHeroLeague(e.target.value)} />
        <Input value={heroPowers} type='text' placeholder='Enter superhero powers comma separated' onChange={(e) => {
          const powers = e.target.value.split(",");
          setHeroPowers(powers);
        }} />
        <Button variant="outline" onClick={addSuperhero}>
          +Add
        </Button>
      </div>
    </div>
  )
}

export default Superheroes
