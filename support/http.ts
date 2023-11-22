import { expect } from '@playwright/test'
import scope from "../common/scope"
import logger from "./logger"
import jsonQuery from 'json-query'

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
            case "PUT":
                logger.info(`${method} method process ${scope.apiPath}`)
                scope.response = await scope.request.post(scope.apiPath, options)
                break
            case "GET":
                logger.info(`Get method process ${scope.apiPath}`)
                scope.response = await scope.request.get(scope.apiPath, options)
                break
            default:
                throw new Error("Invalid http method, framework doesn't support")

        }
    }

    verifyResponseCode = async (responseCode: string) => {
        expect(scope.response.status().toFixed()).toEqual(responseCode)
    }

    verifyResponsePayload = async (expected: string) => {
        let json: any
        try { //Playwright will throw error if the response payload not json
            json = await scope.response.json();
        } catch(err) {
            logger.error("Invalid respone recevied from the api")
            json = await scope.response.text()
            logger.info("The response recevied from the api \n %s \n", json)
            throw new Error("Invalid respone from api")
        }
        expect(this.isSubset(JSON.parse(expected), json)).toBeTruthy();
    }

    verifyResponsePayloadKey = async (key: string, value: string) => {
        let json: any
        try { //Playwright will throw error if the response payload not json
            json = await scope.response.json();
        } catch(err) {
            logger.error("Invalid respone recevied from the api")
            json = await scope.response.text()
            logger.info("The response recevied from the api \n %s \n", json)
            throw new Error("Invalid respone from api")
        }

        const keys = key.split('.')
        if (key.length === 1) { //given key in the root element
            let result = json[key[0]]
            if (typeof result === 'boolean') { //to handle boolean values
                result = Boolean(result)
                result = result.toString()
            }
            const expected: string | null = value === 'null' ? null : value
            expect(result).toEqual(value)
        } else { //query data in nested strucutre of json
            let result = jsonQuery(key, {data : json}).value
            if (typeof result) {
                result = String(result)
            }
            expect(value).toEqual(result)
        }
    }

    isSubset = (subset: any, superset: any) => {
        for (var key in subset) {
            if (!(key in superset)) {
                return false;
            }
    
            // Check if the values are objects and recursively check for subsets
            if (typeof subset[key] === 'object' && typeof superset[key] === 'object') {
                if (!this.isSubset(subset[key], superset[key])) {
                    return false;
                }
            } else if (subset[key] !== superset[key]) {
                return false;
            }
        }
        return true;
    }

}

export default new RequestHelper()