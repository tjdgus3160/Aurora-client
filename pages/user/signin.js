import SigninProcess from '../../src/components/user/SigninProcess'
import GoogleOAuthSignin from '../../src/components/user/GoogleOAuthSignin'
import FacebookOAuthSignin from '../../src/components/user/FacebookOAuthSignin'
import AppUserLayout from '../../src/components/user/AppUserLayout'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Signin = () => {
  const router = useRouter()
  const { loginLoading, tokenError } = useSelector((state) => state.user)

  useEffect(() => {
    if (loginLoading) {
      router.push('../')
    }
  }, [loginLoading])

  return (
    <AppUserLayout>
      {tokenError
        ? <p>{tokenError}</p>
        : (
          <>
            <SigninProcess />
            <GoogleOAuthSignin />
            <FacebookOAuthSignin />
          </>
          )}

    </AppUserLayout>
  )
}

export default Signin
