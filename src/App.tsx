import { useState } from 'react'

import { createClient } from '@supabase/supabase-js'

import './App.css'
import Login from './pages/Login'

const supabase = createClient('https://slpoocycjgqsuoedhkbn.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNscG9vY3ljamdxc3VvZWRoa2JuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUyMDU0MjUsImV4cCI6MjAzMDc4MTQyNX0.xZYRTRN65rlms1Hb96IBAQvw3EGtMzUxlGPP5TVey34')

function App() {
  const [session, setSession] = useState(null)
  return (
    <>
      <Login supabase={supabase} session={session} setSession={setSession} />
    </>
  )
}

export default App
