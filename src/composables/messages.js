import { useMessages } from 'stores'

export const useSuccessMsg = text => useMessages().success(text)

export const useErrorMsg = text => useMessages().error(text)