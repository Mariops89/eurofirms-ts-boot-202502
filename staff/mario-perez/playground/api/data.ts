import { Data } from "./types"

const data: Data = {
    uuid() {
        return (Date.now() + Math.random()).toString(36).replace('.', '')
    },
    users: [],
    posts: []
}

export default data