import { Message } from 'types/chat'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ChatBoxState {
  loading: boolean
  messages: Message[]
  currMessage: string
}

const initialState: ChatBoxState = {
  loading: true,
  messages: [],
  currMessage: '',
}

const slice = createSlice({
  name: 'chatBox',
  initialState,
  reducers: {
    loadMessages: (state, { payload: messages }: PayloadAction<Message[]>) => {
      state.messages = messages
      state.loading = false
    },
    updateCurrMessage: (state, { payload: text }: PayloadAction<string>) => {
      state.currMessage = text
    },
    addMessage: (state, { payload: message }: PayloadAction<Message>) => {
      // sort messages in assending order of time.
      state.messages = [...state.messages, message]
    },
    removeMessage: (state, { payload: message }: PayloadAction<Message>) => {
      state.messages = state.messages.filter((x) => x.id !== message.id)
    },
  },
})

export const { loadMessages, addMessage, removeMessage, updateCurrMessage } = slice.actions

export default slice.reducer
