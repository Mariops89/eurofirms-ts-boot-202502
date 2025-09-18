export const data = {
    setToken: (token: string) => {
        sessionStorage.setItem("token", token)
    },
    getToken: () => {
        return sessionStorage.getItem("token")
    },
    removeToken: () => {
        sessionStorage.removeItem("token")
    }
}
