import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createClient } from '@supabase/supabase-js'
import { Provider, defaultTheme } from '@adobe/react-spectrum'
import { today, getLocalTimeZone } from '@internationalized/date';

import Home from './pages/Home'
import Login from './pages/Login'
import Logout from './pages/Logout';
import Recent from './pages/Recent';
import File from './pages/File';
import { useLocalStorage } from "@uidotdev/usehooks";
import { useState } from "react";
import Search from "./pages/Search";

const supabase = createClient('https://slpoocycjgqsuoedhkbn.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNscG9vY3ljamdxc3VvZWRoa2JuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUyMDU0MjUsImV4cCI6MjAzMDc4MTQyNX0.xZYRTRN65rlms1Hb96IBAQvw3EGtMzUxlGPP5TVey34')

function App() {
  const [session, setSession] = useLocalStorage("session", null)

  const endTimeframe = today(getLocalTimeZone());
  const [timeframe, setTimeframe] = useState({
    start: endTimeframe.subtract({ days: 7 }),
    end: endTimeframe
  })

  return (
    <>
      <Provider theme={defaultTheme}>
        <BrowserRouter basename={import.meta.env.DEV ? '/' : '/fs-tracer-frontend'}>
          <Routes>
            <Route index element={
              <Home supabase={supabase} session={session} timeframe={timeframe} setTimeframe={setTimeframe} />
            } />
            <Route path="/recent" element={
              <Recent supabase={supabase} session={session} timeframe={timeframe} setTimeframe={setTimeframe} />
            } />
            <Route path="/search" element={
              <Search supabase={supabase} session={session} timeframe={timeframe} setTimeframe={setTimeframe} />
            } />
            <Route path="/login" element={
              <Login supabase={supabase} session={session} setSession={setSession} timeframe={timeframe} setTimeframe={setTimeframe} />
            } />
            <Route path="/logout" element={
              <Logout supabase={supabase} session={session} setSession={setSession} timeframe={timeframe} setTimeframe={setTimeframe} />
            } />
            <Route path="/file/:fileID" element={
              <File supabase={supabase} session={session} setSession={setSession} />
            } />
            <Route path="*" element={<p>notfound</p>} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
