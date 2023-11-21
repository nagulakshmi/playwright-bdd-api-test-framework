import { After, AfterAll, Before, BeforeAll, ITestCaseHookParameter, setDefaultTimeout } from "@cucumber/cucumber"
import logger from "../support/logger"
import scope from "../common/scope"
import appConfig from "./appConfig"

setDefaultTimeout(appConfig.cucumberTimeout)

BeforeAll(async function() {
    logger.info("Starting the testsuite execution")
})

AfterAll(async function () {
    
})

Before(async function(testCase: ITestCaseHookParameter) {
   
})

After(async function(testCase: ITestCaseHookParameter) {
    logger.info("The status of the test case is:= %s", testCase.result?.status)    
})