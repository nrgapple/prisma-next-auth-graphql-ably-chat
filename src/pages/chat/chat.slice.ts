import { None, Option, Some } from '@hqoss/monads'
import { Chat } from 'types/chat'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ChatsState {
  loading: boolean
  chats: Chat[]
}

const initialState: ChatsState = {
  loading: true,
  chats: [],
}

const slice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    loadChats: (state, { payload: chats }: PayloadAction<Chat[]>) => {
      state.chats = chats
      state.loading = false
    },
    addChat: (state, { payload: chat }: PayloadAction<Chat>) => {
      state.chats = [chat, ...state.chats]
    },
    removeChat: (state, { payload: chat }: PayloadAction<Chat>) => {
      state.chats = state.chats.filter((x) => x.id !== chat.id)
    },
  },
})

export const { loadChats, addChat, removeChat } = slice.actions

export default slice.reducer
