import { useQuery, useMutation } from '@apollo/client'
import { Types } from 'ably'
import { useChannel } from 'hooks/useChannel'
import { useEffect } from 'react'
import { store } from 'state/store'
import { useStore } from 'state/storeHooks'
import { Message } from 'types/chat'
import { getMessagesQuery, createMessageQuery } from '.'
import { addMessage, loadMessages, updateCurrMessage } from './chatBox.slice'

export function useChatBox(chatId: number) {
  const { data: messagesData } = useQuery(getMessagesQuery, { variables: chatId })
  const [createMessage] = useMutation(createMessageQuery)
  const { messages, currMessage } = useStore(({ chatBox }) => chatBox)
  // Use ably.connection.id to check if message.connectionId matches yours.
  const [channel, ably] = useChannel('chat-demo', handleAblyMessage)

  useEffect(() => {
    if (messagesData) {
      store.dispatch(
        loadMessages(
          messagesData.messages.map(
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
    if (event.key === 'Enter' && store.getState().chatBox.currMessage !== '') {
      sendMessage()
    }
  }

  return {
    messages,
    currMessage,
    handleKeyPress,
    sendMessage,
  } as const
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
