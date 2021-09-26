import { gql } from '@apollo/client'
import { Button } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import { ChangeEvent, KeyboardEvent, useEffect } from 'react'
import { store } from 'state/store'
import { updateCurrMessage } from './chatBox.slice'
import { useChatBox } from './hooks'

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
  console.log({ currMessage })
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

function handleCurrMessageChange(event: ChangeEvent<HTMLInputElement>) {
  event.preventDefault()
  store.dispatch(updateCurrMessage(event.currentTarget.value))
}

export default ChatBox
