export const useApiArgs = () => {
    let options = {
        baseURL: useRuntimeConfig().API_URL,
        initialCache: false
    }

    const authToken = useCookie('authToken').value
    if (authToken) {
        options.headers = {
            'Auth-Token': authToken
        }
    }

    return options
}