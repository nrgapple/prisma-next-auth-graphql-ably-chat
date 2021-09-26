import React, { useEffect } from 'react'
import { signIn, signOut, useSession } from 'next-auth/client'
import { useQuery, gql } from '@apollo/client'
import Image from 'next/image'
import { loadUser } from './app.slice'
import { store } from 'state/store'
import { loadUserIntoApp, User } from 'types/user'
import image from 'next/image'
import { useStore, useStoreWithInitializer } from 'state/storeHooks'

export const exampleQuery = gql`
  query example {
    example {
      message
    }
  }
`

export const getUserQuery = gql`
  query userInfo {
    user {
      id
      email
    }
  }
`

const IndexPage = () => {
  const [session, loading] = useSession()
  const { loading: appLoading, user } = useStore(({ app }) => app)

  useEffect(() => {
    if (session) {
      const {
        user: { name, image, email },
      } = session
      loadUserIntoApp({ name, image, email } as User)
    }
  }, [session])

  const {
    data: userData,
    loading: userQueryLoading,
    error: userQueryError,
    refetch,
  } = useQuery(getUserQuery, { notifyOnNetworkStatusChange: true })

  if (loading) {
    return (
      <div className="flex justify-center mt-8 text-center">
        <div className="flex-auto">
          <div className="text-lg mb-2">Loading...</div>
        </div>
      </div>
    )
  }

  if (session) {
    return (
      <div className="flex justify-center mt-8 text-center">
        <div className="flex-auto">
          {session.user.image && (
            <Image
              // @ts-ignore
              src={session.user.image}
              // @ts-ignore
              alt={session.user.email ?? session.user.name}
              width="60"
              height="60"
              className="h-16 w-16 rounded-full mx-auto mb-2"
            />
          )}
          <div className="text-lg mb-2">Hello, {session.user.email ?? session.user.name}</div>
          <div className="mb-2">
            gql test query: {userQueryLoading ? 'fetching...' : userData?.user.email}
            <button className="btn-blue ml-2" onClick={() => refetch()}>
              Refetch!
            </button>
          </div>
          <button className="btn-green" onClick={() => signOut()}>
            Sign out
          </button>
        </div>
      </div>
    )
  } else {
    return (
      <div className="flex justify-center mt-8 text-center">
        <div className="flex-auto">
          <div className="text-lg mb-2">You are not logged in!</div>
          <button className="btn-green" onClick={() => signIn()}>
            Sign in
          </button>
        </div>
      </div>
    )
  }
}

export default IndexPage
