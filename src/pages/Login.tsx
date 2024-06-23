import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

export default function Login(props: any) {
  const navigate = useNavigate();

  useEffect(() => {
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
  }, [props.supabase])

  useEffect(() => {
    if (props.session) {
      navigate('/')
    }
  }, [props.session])

  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="text-blue-700">Login</h1>

        <GoogleOAuthProvider clientId="952965459060-nrnrsdoq22mf646vfa72hk410pvdda5q.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={async (credentialResponse: any) => {
              await props.supabase.auth.signInWithIdToken({
                provider: 'google',
                token: credentialResponse.credential,
              })

            }}
            onError={() => {
              console.log('Login Failed');
            }}
            width={7777}
            size={"large"}
            shape={"pill"}
          />
        </GoogleOAuthProvider>
      </div>
    </>
  )
}
