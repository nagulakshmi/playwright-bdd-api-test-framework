import scope from "../common/scope"
import logger from "./logger"

class RequestHelper {
    
    processRequest = async (method: string) => {
        logger.info("Start processing the \"%s\" request", method)
        let options: any = {}

        if (scope.payload && scope.payload !== "") {
            options["data"] = scope.payload
        }

        if (scope.headers && Object.keys(scope.headers).length !== 0) {
            options["headers"] = scope.headers
        }

        switch(method) {
            case "POST":
                logger.info(`Post method process ${scope.apiPath}`)
                scope.response = await scope.request.post(scope.apiPath, options)
                break
            case "GET":
                logger.info(`Get method process ${scope.apiPath}`)
                scope.response = await scope.request.post(scope.apiPath, options)
            default:
                throw new Error("Invalid http method, framework doesn't support")

        }

        console.log('iam here', (await scope.response.json()))
    }

}

export default new RequestHelper()