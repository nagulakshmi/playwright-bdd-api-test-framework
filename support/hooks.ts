import { After, AfterAll, Before, BeforeAll, ITestCaseHookParameter, setDefaultTimeout } from "@cucumber/cucumber"
import logger from "../support/logger"
import scope from "../common/scope"
import appConfig from "./appConfig"
import { request } from "playwright"

setDefaultTimeout(appConfig.cucumberTimeout)

BeforeAll(async function() {
    logger.info("Starting the testsuite execution")
})

AfterAll(async function () {
    
})

Before(async function(testCase: ITestCaseHookParameter) {

   logger.info("Executing scenario: \"%s\"", testCase.pickle.name)
   
   scope.request = await request.newContext({
    baseURL: appConfig.baseUrl,
    extraHTTPHeaders: {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "Connection": "keep-alive"
    }
   })
   scope.payload = ""
   scope.headers = {}
})

After(async function(testCase: ITestCaseHookParameter) {
    logger.info("The status of the test case is:= %s", testCase.result?.status)    
})