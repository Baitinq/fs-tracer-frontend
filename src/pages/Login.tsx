import { createClient } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'

const supabase = createClient('https://slpoocycjgqsuoedhkbn.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNscG9vY3ljamdxc3VvZWRoa2JuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUyMDU0MjUsImV4cCI6MjAzMDc4MTQyNX0.xZYRTRN65rlms1Hb96IBAQvw3EGtMzUxlGPP5TVey34')

window.HandleSignInWithGoogle = async (response: any) => {
  console.log(response)
  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: 'google',
    token: response.credential,
  })
  console.log(data, error)
}

export default function Login() {
  const [_, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      console.log("LOGIN SESSION", session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      console.log("SESSION CHANGE", session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <>
      <div>
        <h1>Login</h1>
        <p>Log in to access your account!</p>
      </div>

      <div id="g_id_onload"
        data-client_id="952965459060-nrnrsdoq22mf646vfa72hk410pvdda5q.apps.googleusercontent.com"
        data-context="signin"
        data-ux_mode="popup"
        data-callback="HandleSignInWithGoogle"
        data-auto_prompt="false">
      </div>

      <div className="g_id_signin"
        data-type="standard"
        data-shape="pill"
        data-theme="outline"
        data-text="signin"
        data-size="large"
        data-logo_alignment="center">
      </div>
    </>
  )
}
