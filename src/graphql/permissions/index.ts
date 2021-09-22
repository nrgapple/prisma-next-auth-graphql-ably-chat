import { shield } from 'graphql-shield'
import { isAuthenticated } from './rules/isAuthenticated'

export const permissions = shield({
  Query: {
    user: isAuthenticated,
    messages: isAuthenticated,
  },
  Mutation: {
    '*': isAuthenticated,
  },
})
