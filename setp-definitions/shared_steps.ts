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

Then('the response status code should be {string}', function (string) {
// Write code here that turns the phrase above into concrete actions
});

Then('I should see the data in response body', function () {
// Write code here that turns the phrase above into concrete actions
});

Then('the response payload should match the following json', function (docString) {
// Write code here that turns the phrase above into concrete actions
});