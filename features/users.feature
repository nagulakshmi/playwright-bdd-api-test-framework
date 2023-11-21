Feature: Test Users Fake API

    @smoke
    Scenario: Create Users
    Given the request url is "/api/users"
    And the request payload is the following json
    """ 
    {
        "name": "morpheus",
        "job": "zion resident"
    }
    """
    When the "POST" request is triggered
    Then the response status code should be "200"
    And I should see the data in response body
    And the response payload should match the following json
    """
    {
        "name": "morpheus",
        "job": "zion resident",
        "updatedAt": "2023-11-21T08:48:07.529Z"
    }
    """ 