import { getAConversationURL } from "./urls";

async function getAConversation(body) {
    try {
        const response = await fetch(getAConversationURL, {
            method: "POST",
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        return response.json()
    } catch (e) {
        return e
    }
}

export {getAConversation}