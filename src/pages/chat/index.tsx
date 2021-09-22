import { gql, useQuery } from '@apollo/client'
import ChatBox from 'components/ChatBox'
import { useSession } from 'next-auth/client'
import { useEffect, useMemo } from 'react'
import { store } from 'state/store'
import { useStore } from 'state/storeHooks'
import { Chat } from 'types/chat'
import { loadChats } from './chat.slice'

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
    if (chatsData) {
      loadChatsFromQuery(chatsData.user.profile.chats)
    }
  }, [chatsData])

  if (chats.isSome()) {
    console.log(chats.unwrap())
  }

  return (
    <div className="container">
      <div></div>
      {chats.match({
        none: () => <></>,
        some: (c) => <div>{<ChatBox chatId={c[0].id} />}</div>,
      })}
    </div>
  )
}

export default ChatPage

function loadChatsFromQuery(chats: Chat[]) {
  store.dispatch(loadChats(chats))
}
