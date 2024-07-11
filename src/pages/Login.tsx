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

  //min-w-full broke the container
  return (
    <>
      <div className="flex flex-col items-center h-screen w-screen">
        <div className="flex flex-row items-center gap-x-8 m-auto">
          <div>
            <h1 className="text-4xl text-bold font-sans antialiased text-blue-700 tracking-wide">fs-tracer</h1>
          </div>

          <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
            <div className="mx-7 my-5">
              <h5 className="mb-2 text-2xl font-bold font-sans antialiased text-gray-900">Hello!</h5>
              <div className="flex flex-row items-center gap-2">
                <span className="font-normal text-gray-700" >Continue with</span>
                <span>
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
                      type={"icon"}
                    />
                  </GoogleOAuthProvider>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
