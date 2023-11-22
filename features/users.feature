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
    Then the response status code should be "201"
    And the response payload should match the following json
    """
    {
        "name": "morpheus",
        "job": "zion resident"
    }
    """ 

    @smoke
    Scenario: Update Users
    Given the request url is "/api/users/2"
    And the request payload is the following json
    """ 
    {
        "name": "morpheus",
        "job": "zion resident"
    }
    """
    When the "PUT" request is triggered
    Then the response status code should be "201"
    And the response payload should match the following json
    """
    {
        "name": "morpheus",
        "job": "zion resident"
    }
    """ 

     @smoke
    Scenario: Get Single user
    Given the request url is "/api/users/2"
    When the "GET" request is triggered
    Then the response status code should be "200"
    And the response payload should match the following json
    """
    {
        "data": {
            "id": 2,
            "email": "janet.weaver@reqres.in",
            "first_name": "Janet",
            "last_name": "Weaver",
            "avatar": "https://reqres.in/img/faces/2-image.jpg"
        }
    }
    """ 

    @smoke
    Scenario: User not found
    Given the request url is "/api/users/23"
    When the "GET" request is triggered
    Then the response status code should be "404"
    And the response payload should match the following json
    """
    {
    }
    """ 

    @smoke
    Scenario: Get all users
    Given the request url is "/api/users?page=2"
    When the "GET" request is triggered
    Then the response status code should be "200"
    And the response payload should match the "total_pages" key to be "2"
    And the response payload should match the "total" key to be "12"
    And the response payload should match the "total" key to be "12"
    # here it verifies only subset of json
    And the response payload should match the following json 
    """
    {
        "page": 2,
        "per_page": 6,
        "total": 12,
        "total_pages": 2,
        "data": [
            {
                "id": 7,
                "email": "michael.lawson@reqres.in",
                "first_name": "Michael",
                "last_name": "Lawson",
                "avatar": "https://reqres.in/img/faces/7-image.jpg"
            }
        ]
    }
    """