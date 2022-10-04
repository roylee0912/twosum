const backendPort = 9292
const baseURL = `http://localhost:${backendPort}`

const messagesRoute = `${baseURL}/messages`
const getAConversationURL = `${messagesRoute}/conversation`

export { getAConversationURL }