import { Given, Then, When } from "@cucumber/cucumber";
import logger from "../support/logger";
import scope from "../common/scope";
import http from "../support/http";

Given('the request url is {string}', function (apiPath: string) {
    logger.info("set the api path as := %s", apiPath)
    scope.apiPath = apiPath
});

Then('the request payload is the following json', function (requestJson: string) {
    logger.info("The requet payload is received")
    scope.payload = requestJson
});

When('the {string} request is triggered', async (method: string) => {
    logger.info('Trigger the %s request from the test suite', method)
    await http.processRequest(method)
});

Then('the response status code should be {string}', async (responseCode: string) => {
    logger.info("Verify api response code")
    await http.verifyResponseCode(responseCode)
});

Then('the response payload should match the following json', async (payload: string) => {
    logger.info("Verify the response payload")
    await http.verifyResponsePayload(payload)
});

Then('the response payload should match the {string} key to be {string}', async (expectedKey: string, value: string) => {
    logger.info("Verify teh payload key value pair")
    await http.verifyResponsePayloadKey(expectedKey, value)
});