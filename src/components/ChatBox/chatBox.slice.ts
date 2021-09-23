import { None, Option, Some } from '@hqoss/monads'
import { Message } from 'types/chat'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ChatBoxState {
  loading: boolean
  messages: Option<Message[]>
  currMessage: string
}

const initialState: ChatBoxState = {
  loading: true,
  messages: None,
  currMessage: '',
}

const slice = createSlice({
  name: 'chatBox',
  initialState,
  reducers: {
    loadMessages: (state, { payload: messages }: PayloadAction<Message[]>) => {
      state.messages = Some(messages)
      state.loading = false
    },
    updateCurrMessage: (state, { payload: text }: PayloadAction<string>) => {
      state.currMessage = text
    },
    addMessage: (state, { payload: message }: PayloadAction<Message>) => {
      state.messages = Some(
        state.messages.match({
          none: () => [message],
          some: (messages) => [message, ...messages],
        }),
      )
    },
    removeMessage: (state, { payload: message }: PayloadAction<Message>) => {
      state.messages = Some(
        state.messages.match({
          none: () => [],
          some: (messages) => messages.filter((x) => x.id !== message.id),
        }),
      )
    },
  },
})

export const { loadMessages, addMessage, removeMessage, updateCurrMessage } = slice.actions

export default slice.reducer
