import { gql, useQuery } from '@apollo/client'
import { useStore } from 'state/storeHooks'

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
  mutation createMessage($chatId: ID!, $message: String) {
    createMessage(chatId: $chatId, message: $message) {
      chatId
      message
    }
  }
`

const ChatBox = ({ chatId }: { chatId: number }) => {
  const { data: messagesData } = useQuery(getMessagesQuery, { variables: chatId })
  const { loading: chatBoxLoading, messages, currMessage } = useStore(({ chatBox }) => chatBox)

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
        <input className="message-body" />
        <div>Send</div>
      </div>
    </div>
  )
}

export default ChatBox
