export const useApiError = (error, handlers) => {
    const detail = error.data?.detail
    const code = error.response?.status
    let isProcessed = false

    if (handlers) {
        for (let i = 0; i < handlers.length; i++) {
            if (
                (!handlers[i].detail || handlers[i].detail == detail) &&
                (!handlers[i].code || handlers[i].code == code)
            ) {
                useErrorMsg(handlers[i].message)
                isProcessed = true
            }
        }
    }

    if (!isProcessed) useErrorMsg('Ой-ой... Что-то пошло не так')
}