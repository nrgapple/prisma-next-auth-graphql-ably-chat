import { gql, useQuery } from '@apollo/client'
import { useSession } from 'next-auth/client'
import { useMemo } from 'react'

export const getUserChatsQuery = gql`
  query userChats {
    user {
      profile {
        chats {
          id
        }
        id
      }
    }
  }
`

export const getMessagesQuery = gql`
  query getMessages($chatId: ID!) {
    messages(chatId: $chatId) {
      id
      message
      sender
    }
  }
`

const ChatPage = () => {
  const [session, loading] = useSession()
  const { data: chatsData } = useQuery(getUserChatsQuery, { notifyOnNetworkStatusChange: true })

  console.log(chatsData)

  return <></>
}

const ChatBox = ({ chatId }: { chatId: number }) => {
  const { data: messagesData } = useQuery(getMessagesQuery, { variables: chatId })

  return <></>
}

export default ChatPage
