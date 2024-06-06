import { useEffect } from 'react'

import { useNavigate } from "react-router-dom";

export default function Login(props: any) {
  const navigate = useNavigate();

  useEffect(() => {
    (window as any).HandleSignInWithGoogle = async (response: any) => {
      await props.supabase.auth.signInWithIdToken({
        provider: 'google',
        token: response.credential,
      })
    }

    props.supabase.auth.getSession().then(({ data: { session } }: any) => {
      props.setSession(session)
      console.log("LOGIN SESSION", session)
    })

    const {
      data: { subscription },
    } = props.supabase.auth.onAuthStateChange((_event: any, session: any) => {
      props.setSession(session)
      console.log("SESSION CHANGE", session)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (props.session) {
      navigate('/')
    }
  }, [props.session])

  return (
    <>
      <div>
        <h1>Login</h1>
        <p>Log in to access your account! {JSON.stringify(props.session)}</p>
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
