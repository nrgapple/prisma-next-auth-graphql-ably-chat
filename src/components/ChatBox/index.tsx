import { gql, useMutation, useQuery } from '@apollo/client'
import { Button } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import { ChangeEvent } from 'react'
import { store } from 'state/store'
import { useStore } from 'state/storeHooks'
import { addMessage, updateCurrMessage } from './chatBox.slice'

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
  const { data: messagesData } = useQuery(getMessagesQuery, { variables: chatId })
  const [createMessage, { data }] = useMutation(createMessageQuery)
  const { messages, currMessage } = useStore(({ chatBox }) => chatBox)

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.match({
          none: () => <div></div>,
          some: (messages) => (
            <>
              {messages.map((m) => (
                <div className="message" key={m.id}>
                  <div className="sender">{m.sender}</div>
                  <div className="message-text">{m.message}</div>
                </div>
              ))}
            </>
          ),
        })}
      </div>
      <div className="new-message-container">
        <Input value={currMessage} onChange={handleCurrMessageChange} />
        <Button
          onClick={() => {
            createMessage({ variables: { chatId, message: currMessage } })
          }}
        >
          Send
        </Button>
      </div>
    </div>
  )
}

function handleCurrMessageChange(event: ChangeEvent<HTMLInputElement>) {
  event.preventDefault()
  store.dispatch(updateCurrMessage(event.currentTarget.value))
}

export default ChatBox
