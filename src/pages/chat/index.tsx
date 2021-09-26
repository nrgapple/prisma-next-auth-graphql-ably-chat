import { gql, useQuery } from '@apollo/client'
import { useEffect, useMemo } from 'react'
import { store } from 'state/store'
import { useStore } from 'state/storeHooks'
import { Chat } from 'types/chat'
import { loadChats } from './chat.slice'
import dynamic from 'next/dynamic'
import { Spinner } from '@chakra-ui/react'

const ChatBox = dynamic(() => import('../../components/ChatBox'), { ssr: false })

export const getUserChatsQuery = gql`
  query userChats {
    user {
      profile {
        chats {
          id
        }
      }
    }
  }
`

const ChatPage = () => {
  const { data: chatsData } = useQuery(getUserChatsQuery, { notifyOnNetworkStatusChange: true })
  const { loading, chats } = useStore(({ chat }) => chat)

  useEffect(() => {
    if (chatsData && chatsData.user?.profile) {
      loadChatsFromQuery(chatsData.user.profile.chats)
    }
  }, [chatsData])

  //if (loading) return <Spinner />

  return (
    <div className="container">
      <div></div>
      {chats.length && (
        <div>
          <ChatBox chatId={chats[0].id} />
        </div>
      )}
    </div>
  )
}

export default ChatPage

function loadChatsFromQuery(chats: Chat[]) {
  store.dispatch(loadChats(chats))
}
