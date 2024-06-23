import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

export default function Logout(props: any) {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      await props.supabase.auth.signOut()
    }
    logout()
    navigate('/login')
  }, [props.session])

  return (<></>)
}
