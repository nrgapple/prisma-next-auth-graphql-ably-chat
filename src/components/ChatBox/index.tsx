import { gql, useMutation, useQuery } from '@apollo/client'
import { Button } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import { useChannel } from 'hooks/useChannel'
import { ChangeEvent, KeyboardEvent, useEffect } from 'react'
import { store } from 'state/store'
import { useStore } from 'state/storeHooks'
import { addMessage, loadMessages, updateCurrMessage } from './chatBox.slice'
import { Types } from 'ably'
import { Message } from 'types/chat'

// ably integrated using this tutorial: https://ably.com/blog/realtime-chat-app-nextjs-vercel?ref=morioh.com&utm_source=morioh.com

export const getMessagesQuery = gql`
  query getMessages($chatId: Int) {
    messages(chatId: $chatId) {
      id
      message
      sender
    }
  }
`

export const createMessageQuery = gql`
  mutation createMessage($chatId: Int!, $message: String) {
    createMessage(chatId: $chatId, message: $message) {
      chatId
      message
    }
  }
`

const ChatBox = ({ chatId }: { chatId: number }) => {
  const { messages, currMessage, handleKeyPress, sendMessage } = useChatBox(chatId)

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((m) => (
          <div className="message" key={m.id}>
            <div className="sender">{m.sender}</div>
            <div className="message-text">{m.message}</div>
          </div>
        ))}
      </div>
      <div className="new-message-container">
        <Input value={currMessage} onChange={handleCurrMessageChange} onKeyPress={handleKeyPress} />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  )
}

function useChatBox(chatId: number) {
  const { data: messagesData } = useQuery(getMessagesQuery, { variables: chatId })
  const [createMessage] = useMutation(createMessageQuery)
  const { messages, currMessage } = useStore(({ chatBox }) => chatBox)
  // Use ably.connection.id to check if message.connectionId matches yours.
  const [channel, ably] = useChannel('chat-demo', handleAblyMessage)

  useEffect(() => {
    if (messagesData) {
      store.dispatch(
        loadMessages(
          messagesData.map(
            (x) =>
              ({
                id: x.id,
                message: x.message,
                sender: x.sender,
              } as Message),
          ),
        ),
      )
    }
  }, [messagesData])

  const sendMessage = () => {
    const currMsg = store.getState().chatBox.currMessage
    createMessage({ variables: { chatId, message: currMsg } })
    channel.publish({ name: 'chat-message', data: currMsg })
    store.dispatch(updateCurrMessage(''))
  }

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault()
    if (event.key !== 'Enter' || store.getState().chatBox.currMessage === '') {
      return
    }
    sendMessage()
  }

  return {
    messages,
    currMessage,
    handleKeyPress,
    sendMessage,
  } as const
}

function handleCurrMessageChange(event: ChangeEvent<HTMLInputElement>) {
  event.preventDefault()
  store.dispatch(updateCurrMessage(event.currentTarget.value))
}

function handleAblyMessage(msg: Types.Message) {
  store.dispatch(
    addMessage({
      id: msg.id,
      createdAt: new Date(msg.timestamp),
      sender: null,
      message: msg.encoding,
    } as Message),
  )
}

export default ChatBox
