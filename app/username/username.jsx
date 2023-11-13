'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'

export default function UsernameForm({ session }) {
  const [fullname, setFullname] = useState('')
  const supabase = createClientComponentClient()
  const user = session?.user
  const router = useRouter()

  const handleUsernameEntry = async (e) => {
    e.preventDefault()

    console.log(session);
    try {
      let { error } = await supabase.from('profiles').upsert({
        id: user?.id,
        full_name: fullname,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      alert('Profile updated!')
      router.push("/");
    } catch (error) {
      alert('Error updating the data: ' + error);
    }
  };

return (
  <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
    <Link
      href="/"
      className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
      >
        <polyline points="15 18 9 12 15 6" />
      </svg>{' '}
      Back
      </Link>
        <form
          className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
          onSubmit={handleUsernameEntry}
        >
          <label className="text-md" htmlFor="fullname">
            What should we call you?
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="fullmane"
            onChange={(e) => setFullname(e.target.value)}
            value={fullname}
            placeholder="Enter Username"
          />
          <button className="bg-green-700 rounded px-4 py-2 text-white mb-6"
          >
            Submit
          </button>
        </form>

  </div>
)
}
