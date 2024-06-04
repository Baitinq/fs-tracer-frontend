import { useState } from 'react'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createClient } from '@supabase/supabase-js'

import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'

const supabase = createClient('https://slpoocycjgqsuoedhkbn.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNscG9vY3ljamdxc3VvZWRoa2JuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUyMDU0MjUsImV4cCI6MjAzMDc4MTQyNX0.xZYRTRN65rlms1Hb96IBAQvw3EGtMzUxlGPP5TVey34')

function App() {
  const [session, setSession] = useState(null)
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={
              <Home supabase={supabase} session={session} />
            } />
            <Route path="login" element={
              <Login supabase={supabase} session={session} setSession={setSession} />
            } />
            <Route path="*" element={<p>notfound</p>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
