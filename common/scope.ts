import { APIRequestContext, APIResponse } from 'playwright'

class ApplicationScope {
    request: APIRequestContext
    response: APIResponse
    apiPath: string
    headers: {[key: string]: string }
    method: string
    payload: string
}

export default new ApplicationScope()