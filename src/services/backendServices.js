import { 
    getAConversationURL, 
    getConnectionsURL,
    createUserURL,
    getAUserURL
} from "./urls"; 

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

async function getConnections(number) {
    try {
        const response = await fetch(getConnectionsURL(number), {
            method: "GET",
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.json()
    } catch (e) {
        return e
    }
}

async function createUser(data) {
    return fetch(createUserURL, {
        method: "POST",
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

async function getAUser(id) {
    try {
        const response = await fetch(getAUser(id), {
            method: "GET",
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.json()
    } 
    catch (e) {
        return e
    }
}

export {
    getAConversation, 
    getConnections,
    createUser,
    getAUser
}