import { useEffect } from "react"

import { useNavigate } from "react-router-dom"

export default function Home(props: any) {
  const navigate = useNavigate()

  useEffect(() => {
    if (!props.session) {
      navigate('/login')
    }
  }, [props.session])

  return (
    <>
      <div>
        <h1>Home</h1>
        <p>Logged in to access your account: {JSON.stringify(props.session)}</p>
      </div>
    </>
  )
}
