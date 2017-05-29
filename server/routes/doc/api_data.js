define({ "api": [
  {
    "type": "post",
    "url": "/:councils",
    "title": "Create council",
    "version": "0.1.0",
    "name": "CreateCouncil",
    "group": "Council",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Council.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the Council.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "studentPositions",
            "description": "<p>Number of student Positions in the Council.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "phdPositions",
            "description": "<p>Number of phd Positions in the Council.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"name\": \"Utbildningsråd\",\n  \"description\": \"...\",\n  \"studentPositions\": 2,\n  \"phdPositions\": 2\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"payload\": {\n    \"id\": 3,\n    \"name\": \"Utbildningsråd\",\n    \"description\": \"...\",\n    \"studentPositions\": 2,\n    \"phdPositions\": 2,\n    \"facultyId\": 1,\n    \"updatedAt\": \"2017-05-02T08:15:03.453Z\",\n    \"createdAt\": \"2017-05-02T08:15:03.453Z\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DuplicateCouncilName",
            "description": "<p>There alredy exist a council with that name in the faculty</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad request\n{\n  \"error\": \"DuclicateCouncilName\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/CRUDcouncilsRouter.ts",
    "groupTitle": "Council"
  },
  {
    "type": "delete",
    "url": "/:councils/:id",
    "title": "Delete council",
    "version": "0.1.0",
    "name": "DeleteCouncil",
    "group": "Council",
    "parameter": {
      "fields": {
        "uriParams": [
          {
            "group": "uriParams",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Council unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"payload\": {\n \"id\": 1,\n  \"name\": \"Utbildningsråd\",\n  \"description\": \"...\",\n  \"facultyId\": 1,\n  \"studentPositions\": 2,\n  \"phdPositions\": 2,\n  \"createdAt\": \"2017-05-17T19:25:05.159Z\",\n  \"updatedAt\": \"2017-05-17T19:25:05.159Z\"\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoCouncilWithId",
            "description": "<p>No faculty with that id exists</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"CouncilNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/CRUDcouncilsRouter.ts",
    "groupTitle": "Council"
  },
  {
    "type": "get",
    "url": "/:faculty/:id",
    "title": "Get all councils in a faculty.",
    "version": "0.1.0",
    "name": "GetCouncils",
    "group": "Council",
    "parameter": {
      "fields": {
        "uriParams": [
          {
            "group": "uriParams",
            "type": "Number",
            "optional": false,
            "field": "faculty",
            "description": "<p>Faculty unique ID.</p>"
          },
          {
            "group": "uriParams",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Council unique ID.</p>"
          }
        ],
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Council.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": "<p>Lastname of the User.</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "councils",
            "description": "<p>Array of councils</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  payload: {\n    id: 1,\n    name: \"Utbildningsråd\",\n    description: \"...\",\n    facultyId: 1,\n    studentPositions: 2,\n    phdPositions: 2,\n    \"Employees\": [{\n      \"id\": 1,\n      \"firstName\": \"Olga\",\n      \"lastName\": \"Oc\",\n      \"phone\": \"0123456-123\",\n      \"email\": \"oc@gmail.com\",\n      \"facultyId\": 1,\n      \"pro*fileUrl\": \"kllökök\",\n      \"password\": \"$2a$08$PhENYMj6bfSaQ1aLRk1DxesMXThlEC/IAtNGil/53uCTJDNLyUe9i\",\n      \"EmployeePosition\": {\n        \"CouncilId\": 1,\n        \"EmployeeId\": 1,\n        \"secretary\": false,\n        \"chairman\": true,\n        \"convener\": false,\n        \"createdAt\": \"2017-05-17T18:16:40.810Z\",\n        \"updatedAt\": \"2017-05-17T18:16:40.810Z\"\n      },\n      {...]],\n    \"CouncilInstances\": [\n    {\n          \"id\": 1,\n          \"firstName\": \"Fredrik\",\n          \"lastName\": \"Olsson\",\n          \"birthDate\": \"1980-10-10T00:00:00.000Z\",\n          \"phd\": false,\n          \"phone\": \"0123456-123\",\n          \"email\": \"fredriko.olsson@gmail.com\",\n          \"graduationYear\": \"1970-01-01T00:00:02.018Z\",\n          \"program\": \"UDM\",\n          \"comments\": \"bla\",\n          \"UserPosition\": {\n            \"UserId\": 1,\n            \"CouncilInstanceId\": 1,\n            \"from\": \"2017-01-02T00:00:00.000Z\",\n            \"till\": \"2017-05-29T00:00:00.000Z\",\n            \"elected\": true,\n            \"createdAt\": \"2017-05-17T18:16:40.864Z\",\n            \"updatedAt\": \"2017-05-17T18:16:40.864Z\"\n          }\n        },\n        {...}],\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CouncilNotFound",
            "description": "<p>The id of the Council was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"CouncilNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/CRUDcouncilsRouter.ts",
    "groupTitle": "Council"
  },
  {
    "type": "post",
    "url": "/councilsinst",
    "title": "Create a Council Instance",
    "version": "0.1.0",
    "name": "CreateCouncilInstance",
    "group": "CouncilInstance",
    "parameter": {
      "fields": {
        "String": [
          {
            "group": "String",
            "optional": false,
            "field": "from",
            "description": "<p>A date object that shows the start of the period.</p>"
          },
          {
            "group": "String",
            "optional": false,
            "field": "till",
            "description": "<p>A date object that shows the end of the period.</p>"
          }
        ],
        "Number": [
          {
            "group": "Number",
            "optional": false,
            "field": "councilId",
            "description": "<p>The id of the council.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"from\": \"2017-01-01T00:00:00.000Z\",\n  \"till\": \"2017-05-30T00:00:00.000Z\",\n  \"councilId\": 2,\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\"payload\": {\n \"id\": 1,\n \"councilId\": 1,\n \"from\": \"2017-01-01T00:00:00.000Z\",\n \"till\": \"2017-05-30T00:00:00.000Z\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoCouncilInstancesFound",
            "description": "<p>No Council Instance found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"NoCouncilInstancesFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/CRUDcouncilInstRouter.ts",
    "groupTitle": "CouncilInstance"
  },
  {
    "type": "delete",
    "url": "/councilsinst/:id",
    "title": "Delete council Instance",
    "version": "0.1.0",
    "name": "DeleteCouncilInstance",
    "group": "CouncilInstance",
    "parameter": {
      "fields": {
        "uriParams": [
          {
            "group": "uriParams",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Council Instance unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"payload\": {\n \"id\": 1,\n  \"from\": \"2017-01-01T00:00:00.000Z\",\n  \"till\": \"2017-05-30T00:00:00.000Z\",\n  \"councilId\": 1,\n  \"createdAt\": \"2017-05-19T15:20:56.552Z\",\n  \"updatedAt\": \"2017-05-19T15:20:56.552Z\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoCouncilInstancesFound",
            "description": "<p>No Council Instance found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"NoCouncilInstancesFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/CRUDcouncilInstRouter.ts",
    "groupTitle": "CouncilInstance"
  },
  {
    "type": "get",
    "url": "councilsinst/:id/",
    "title": "Get a Council Instance",
    "version": "0.1.0",
    "name": "GetCouncilInstance",
    "group": "CouncilInstance",
    "parameter": {
      "fields": {
        "uriParams": [
          {
            "group": "uriParams",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Council Instance unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\"payload\": {\n \"id\": 1,\n \"councilId\": 1,\n \"from\": \"2017-01-01T00:00:00.000Z\",\n \"till\": \"2017-05-30T00:00:00.000Z\",\n \"Users\": [\n{\n \"id\": 1,\n  \"firstName\": \"Fredrik\",\n  \"lastName\": \"Olsson\",\n  \"birthDate\": \"1980-10-10T00:00:00.000Z\",\n  \"phd\": false,\n  \"phone\": \"0123456-123\",\n  \"email\": \"fredriko.olsson@gmail.com\",\n  \"graduationYear\": \"1970-01-01T00:00:02.018Z\",\n  \"program\": \"UDM\",\n  \"comments\": \"bla\",\n  \"UserPosition\": {\n    \"UserId\": 1,\n    \"CouncilInstanceId\": 1,\n    \"from\": \"2017-01-02T00:00:00.000Z\",\n    \"till\": \"2017-05-29T00:00:00.000Z\",\n    \"elected\": true,\n    \"createdAt\": \"2017-05-19T14:53:13.793Z\",\n    \"updatedAt\": \"2017-05-19T14:53:13.793Z\"\n  }\n},\n {...}\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoCouncilInstancesFound",
            "description": "<p>No Council Instance found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"NoCouncilInstancesFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/CRUDcouncilInstRouter.ts",
    "groupTitle": "CouncilInstance"
  },
  {
    "type": "patch",
    "url": "/councilsinst/:id",
    "title": "Update council Instance",
    "version": "0.1.0",
    "name": "UpdateCouncilInstance",
    "group": "CouncilInstance",
    "parameter": {
      "fields": {
        "uriParams": [
          {
            "group": "uriParams",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Council unique ID.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"from\": \"2018-01-01T00:00:00.000Z\",\n  \"till\": \"2018-05-30T00:00:00.000Z\",\n  \"councilId\": 2,\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"payload\": {\n \"id\": 1,\n \"from\": \"2018-01-01T00:00:00.000Z\",\n \"till\": \"2018-05-30T00:00:00.000Z\",\n \"councilId\": 2,\n \"createdAt\": \"2017-05-17T19:27:17.342Z\",\n \"updatedAt\": \"2017-05-17T19:27:21.199Z\"\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoCouncilInstancesFound",
            "description": "<p>No Council Instance found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"NoCouncilInstancesFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/CRUDcouncilInstRouter.ts",
    "groupTitle": "CouncilInstance"
  },
  {
    "type": "patch",
    "url": "/:councils/:id",
    "title": "Update council",
    "version": "0.1.0",
    "name": "UpdateCouncil",
    "group": "Council",
    "parameter": {
      "fields": {
        "uriParams": [
          {
            "group": "uriParams",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Council unique ID.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"name\": \"Utbildningsråd #2\",\n  \"description\": \"...\",\n  \"studentPositions\": 3,\n  \"phdPositions\": 2\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"payload\": {\n \"id\": 1,\n \"name\": \"Utbildningsråd #2\",\n \"description\": \"...\",\n \"facultyId\": \"1\",\n \"studentPositions\": \"2\",\n \"phdPositions\": \"2\",\n \"createdAt\": \"2017-05-17T19:27:17.342Z\",\n \"updatedAt\": \"2017-05-17T19:27:21.199Z\"\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoCouncilWithId",
            "description": "<p>No faculty with that id exists</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"CouncilNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/CRUDcouncilsRouter.ts",
    "groupTitle": "Council"
  },
  {
    "type": "post",
    "url": "/employees",
    "title": "Create a Employee",
    "version": "0.1.0",
    "name": "CreateEmployee",
    "group": "Employee",
    "parameter": {
      "fields": {
        "String": [
          {
            "group": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>The persons first name.</p>"
          },
          {
            "group": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>The persons last name.</p>"
          },
          {
            "group": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>The persons phone number.</p>"
          },
          {
            "group": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The persons email address.</p>"
          },
          {
            "group": "String",
            "optional": false,
            "field": "profileUrl",
            "description": "<p>A link to the persons profile.</p>"
          },
          {
            "group": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The persons password used to login.</p>"
          }
        ],
        "Number": [
          {
            "group": "Number",
            "optional": false,
            "field": "facultyId",
            "description": "<p>The persons current faculty.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"firstName\":\"Fredrik\",\n  \"lastName\":\"Olsson\",\n  \"phone\":\"0123456-123\",\n  \"email\":\"email@gmail.com\",\n  \"facultyId\":1,\n  \"profileUrl\": \"...\",\n  \"password\": \"supersecret\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n* {\n  \"payload\": [\n    {\n      \"id\": 1,\n      \"firstName\": \"Fredrik\",\n      \"lastName\": \"Olsson\",\n      \"phone\": \"0123456-123\",\n      \"email\": \"email@gmail.com\",\n      \"facultyId\":1,\n      \"profileUrl\": \"...\",\n      \"password\": \"$2a$08$myH82IsvEy/ksZNkNeWUPubhxsc1fo.D3Kst3ACIHQWNcPd9XnIv2\",\n      \"updatedAt\": \"2017-05-19T15:45:06.355Z\",\n      \"createdAt\": \"2017-05-19T15:45:06.355Z\",\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoEmployeeFound",
            "description": "<p>No employee found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"NoEmployeeFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/CRUDemployeeRouter.ts",
    "groupTitle": "Employee"
  },
  {
    "type": "delete",
    "url": "/employees/:id",
    "title": "Delete Employee",
    "version": "0.1.0",
    "name": "DeleteEmployee",
    "group": "Employee",
    "parameter": {
      "fields": {
        "uriParams": [
          {
            "group": "uriParams",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Employee unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"payload\": {\n      \"id\": 1,\n      \"firstName\": \"Fredrik\",\n      \"lastName\": \"Olsson\",\n      \"phone\": \"0123456-123\",\n      \"email\": \"email@gmail.com\",\n      \"facultyId\":1,\n      \"profileUrl\": \"...\",\n      \"password\": \"$2a$08$myH82IsvEy/ksZNkNeWUPubhxsc1fo.D3Kst3ACIHQWNcPd9XnIv2\",\n      \"updatedAt\": \"2017-05-19T15:45:06.355Z\",\n      \"createdAt\": \"2017-05-19T15:45:06.355Z\",\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoEmployeeFound",
            "description": "<p>No employee found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"NoEmployeeFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/CRUDemployeeRouter.ts",
    "groupTitle": "Employee"
  },
  {
    "type": "get",
    "url": "/employees/:id",
    "title": "Get a employee",
    "version": "0.1.0",
    "name": "GetEmployee",
    "group": "Employee",
    "parameter": {
      "fields": {
        "uriParams": [
          {
            "group": "uriParams",
            "type": "number",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the Employee.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"payload\": [\n    {\n      \"id\": 1,\n      \"firstName\": \"Fredrik\",\n      \"lastName\": \"Olsson\",\n      \"phone\": \"0123456-123\",\n      \"email\": \"email@gmail.com\",\n      \"facultyId\": 1,\n      \"profileUrl\": \"...\",\n      \"password\": \"...\"\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoEmployeeFound",
            "description": "<p>No employee found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"NoEmployeeFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/CRUDemployeeRouter.ts",
    "groupTitle": "Employee"
  },
  {
    "type": "get",
    "url": "/employees/",
    "title": "Get all employees",
    "version": "0.1.0",
    "name": "GetEmployees",
    "group": "Employee",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"payload\": [\n    {\n      \"id\": 1,\n      \"firstName\": \"Fredrik\",\n      \"lastName\": \"Olsson\",\n      \"phone\": \"0123456-123\",\n      \"email\": \"email@gmail.com\",\n      \"facultyId\": 1,\n      \"profileUrl\": \"...\",\n      \"password\": \"...\"\n    },\n    {...}\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoEmployeeFound",
            "description": "<p>No employee found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"NoEmployeeFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/CRUDemployeeRouter.ts",
    "groupTitle": "Employee"
  },
  {
    "type": "patch",
    "url": "/employees/:id",
    "title": "Update a Employee",
    "version": "0.1.0",
    "name": "UpdateEmployee",
    "group": "Employee",
    "parameter": {
      "fields": {
        "String": [
          {
            "group": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>The persons first name.</p>"
          },
          {
            "group": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>The persons last name.</p>"
          },
          {
            "group": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>The persons phone number.</p>"
          },
          {
            "group": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The persons email address.</p>"
          },
          {
            "group": "String",
            "optional": false,
            "field": "profileUrl",
            "description": "<p>A link to the persons profile.</p>"
          },
          {
            "group": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The persons password used to login.</p>"
          }
        ],
        "Number": [
          {
            "group": "Number",
            "optional": false,
            "field": "facultyId",
            "description": "<p>The persons current faculty.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"firstName\":\"Fredrik\",\n  \"lastName\":\"Olsson\",\n  \"phone\":\"0123456-123\",\n  \"email\":\"email@gmail.com\",\n  \"facultyId\":1,\n  \"profileUrl\": \"...\",\n  \"password\": \"supersecret\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n* {\n  \"payload\": [\n    {\n      \"id\": 1,\n      \"firstName\": \"Fredrik\",\n      \"lastName\": \"Olsson\",\n      \"phone\": \"0123456-123\",\n      \"email\": \"email@gmail.com\",\n      \"facultyId\":1,\n      \"profileUrl\": \"...\",\n      \"password\": \"$2a$08$myH82IsvEy/ksZNkNeWUPubhxsc1fo.D3Kst3ACIHQWNcPd9XnIv2\",\n      \"updatedAt\": \"2017-05-19T15:45:06.355Z\",\n      \"createdAt\": \"2017-05-19T15:45:06.355Z\",\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoEmployeeFound",
            "description": "<p>No employee found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"NoEmployeeFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/CRUDemployeeRouter.ts",
    "groupTitle": "Employee"
  },
  {
    "type": "post",
    "url": "/faculty/",
    "title": "Create faculty",
    "version": "0.1.0",
    "name": "CreateFaculty",
    "group": "Faculty",
    "parameter": {
      "fields": {
        "uriParams": [
          {
            "group": "uriParams",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Faculty unique ID.</p>"
          }
        ],
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Faculty.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"name\": \"Fakulteten för teknik\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"payload\": {\n    \"id\": 1,\n    \"name\": \"Fakulteten för teknik\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DuplicateFacultyName",
            "description": "<p>There alredy exist a faculty with that name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad request\n{\n  \"error\": \"DuclicateFacultyName\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/CRUDfacultiesRouter.ts",
    "groupTitle": "Faculty"
  },
  {
    "type": "delete",
    "url": "/faculty/:id",
    "title": "Delete faculty",
    "version": "0.1.0",
    "name": "DeleteFaculty",
    "group": "Faculty",
    "parameter": {
      "fields": {
        "uriParams": [
          {
            "group": "uriParams",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Faculty unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"payload\": {\n    \"id\": 1,\n    \"name\": \"Fakulteten för teknik\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoFacultyWithId",
            "description": "<p>No faculty with that id exists</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"FacultyNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/CRUDfacultiesRouter.ts",
    "groupTitle": "Faculty"
  },
  {
    "type": "get",
    "url": "/faculties/",
    "title": "Get all faculties",
    "version": "0.1.0",
    "name": "GetFaculties",
    "group": "Faculty",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "true/false",
            "description": "<p>If set to true the Api will only show currently active councils.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"payload\": [\n    {\n      \"id\": 1,\n      \"name\": \"Fakulteten för teknik\",\n      \"councils\": [\n        {\n           \"id\": 2,\n           \"name\": \"Rådet för de som gillar back-end\",\n           \"studentPositions\": 3,\n           \"phdPositions\": 2,\n           \"from\": \"2017-01-01T00:00:00.000Z\",\n           \"till\": \"2017-05-30T00:00:00.000Z\",\n           \"facultyId\": 1\n        }\n      ]\n    },\n    {...}\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoFacultiesFound",
            "description": "<p>No faculties found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"NoFacultiesFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/CRUDfacultiesRouter.ts",
    "groupTitle": "Faculty"
  },
  {
    "type": "get",
    "url": "/faculty/:id",
    "title": "Get faculty",
    "version": "0.1.0",
    "name": "GetFaculty",
    "group": "Faculty",
    "parameter": {
      "fields": {
        "uriParams": [
          {
            "group": "uriParams",
            "type": "number",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the Faculty.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\"payload\": {\n  \"id\": 1,\n  \"name\": \"Fakulteten för teknik\",\n  \"councils\": [\n    {\n      \"id\": 1,\n      \"name\": \"Utbildningsråd\",\n      \"description\": \"...\",\n      \"facultyId\": 1\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "FacultyNotFound",
            "description": "<p>Id of the Faculty was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"FacultyNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/CRUDfacultiesRouter.ts",
    "groupTitle": "Faculty"
  },
  {
    "type": "patch",
    "url": "/faculty/:id",
    "title": "Update faculty",
    "version": "0.1.0",
    "name": "patchFaculty",
    "group": "Faculty",
    "parameter": {
      "fields": {
        "uriParams": [
          {
            "group": "uriParams",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Faculty unique ID.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"name\": \"Fakulteten för \"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\"payload\": {\n    \"id\": 1,\n    \"name\": \"Fakulteten för samhällsvetenskap\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DuplicateFacultyName",
            "description": "<p>There alredy exist a faculty with that name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad request\n{\n  \"error\": \"DuclicateFacultyName\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/CRUDfacultiesRouter.ts",
    "groupTitle": "Faculty"
  },
  {
    "type": "post",
    "url": "/users",
    "title": "Create a User",
    "version": "0.1.0",
    "name": "CreateUser",
    "group": "User",
    "parameter": {
      "fields": {
        "String": [
          {
            "group": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>The persons first name.</p>"
          },
          {
            "group": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>The persons last name.</p>"
          },
          {
            "group": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>The persons phone number.</p>"
          },
          {
            "group": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The persons email address.</p>"
          },
          {
            "group": "String",
            "optional": false,
            "field": "program",
            "description": "<p>The persons current program.</p>"
          },
          {
            "group": "String",
            "optional": false,
            "field": "comments",
            "description": "<p>Comments about the person.</p>"
          },
          {
            "group": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The persons password used to login.</p>"
          }
        ],
        "Date": [
          {
            "group": "Date",
            "optional": false,
            "field": "birthDate",
            "description": "<p>The persons birthday.</p>"
          },
          {
            "group": "Date",
            "optional": false,
            "field": "graduationYear",
            "description": "<p>The persons graduation date.</p>"
          }
        ],
        "Boolean": [
          {
            "group": "Boolean",
            "optional": false,
            "field": "phd",
            "description": "<p>Wheter the person is working on a phd or not.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"firstName\":\"Fredrik\",\n  \"lastName\":\"Olsson\",\n  \"birthDate\": \"1980-07-20\",\n  \"phd\":true,\n  \"phone\":\"0123456-123\",\n  \"email\":\"email@gmail.com\",\n  \"graduationYear\":\"2019-06-01\",\n  \"program\":\"dingDong\",\n  \"comments\": \"...\",\n  \"password\": \"supersecret\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n* {\n  \"payload\": [\n    {\n      \"id\": 1,\n      \"firstName\": \"Fredrik\",\n      \"lastName\": \"Olsson\",\n      \"birthDate\": \"1980-10-10T00:00:00.000Z\",\n      \"phd\": false,\n      \"phone\": \"0123456-123\",\n      \"email\": \"email@gmail.com\",\n      \"graduationYear\": \"1970-01-01T00:00:02.018Z\",\n      \"program\": \"UDM\",\n      \"comments\": \"...\",\n      \"password\": \"$2a$08$myH82IsvEy/ksZNkNeWUPubhxsc1fo.D3Kst3ACIHQWNcPd9XnIv2\",\n      \"updatedAt\": \"2017-05-19T15:45:06.355Z\",\n      \"createdAt\": \"2017-05-19T15:45:06.355Z\",\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoUsersFound",
            "description": "<p>No users found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"NoUsersFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/CRUDusersRouter.ts",
    "groupTitle": "User"
  },
  {
    "type": "delete",
    "url": "/users/:id",
    "title": "Delete User",
    "version": "0.1.0",
    "name": "DeleteUser",
    "group": "User",
    "parameter": {
      "fields": {
        "uriParams": [
          {
            "group": "uriParams",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>User unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"payload\": {\n      \"id\": 1,\n      \"firstName\": \"Fredrik\",\n      \"lastName\": \"Olsson\",\n      \"birthDate\": \"1980-10-10T00:00:00.000Z\",\n      \"phd\": false,\n      \"phone\": \"0123456-123\",\n      \"email\": \"email@gmail.com\",\n      \"graduationYear\": \"1970-01-01T00:00:02.018Z\",\n      \"program\": \"UDM\",\n      \"comments\": \"...\",\n      \"password\": \"$2a$08$myH82IsvEy/ksZNkNeWUPubhxsc1fo.D3Kst3ACIHQWNcPd9XnIv2\",\n      \"updatedAt\": \"2017-05-19T15:45:06.355Z\",\n      \"createdAt\": \"2017-05-19T15:45:06.355Z\",\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoUsersFound",
            "description": "<p>No users found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"NoUsersFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/CRUDusersRouter.ts",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users/:id",
    "title": "Get a user",
    "version": "0.1.0",
    "name": "GetUser",
    "group": "User",
    "parameter": {
      "fields": {
        "uriParams": [
          {
            "group": "uriParams",
            "type": "number",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the User.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"payload\": [\n    {\n      \"id\": 1,\n      \"firstName\": \"Fredrik\",\n      \"lastName\": \"Olsson\",\n      \"birthDate\": \"1980-10-10T00:00:00.000Z\",\n      \"phd\": false,\n      \"phone\": \"0123456-123\",\n      \"email\": \"email@gmail.com\",\n      \"graduationYear\": \"1970-01-01T00:00:02.018Z\",\n      \"program\": \"UDM\",\n      \"comments\": \"...\"\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoUsersFound",
            "description": "<p>No users found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"NoUsersFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/CRUDusersRouter.ts",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users/",
    "title": "Get all users",
    "version": "0.1.0",
    "name": "GetUsers",
    "group": "User",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"payload\": [\n    {\n      \"id\": 1,\n      \"firstName\": \"Fredrik\",\n      \"lastName\": \"Olsson\",\n      \"birthDate\": \"1980-10-10T00:00:00.000Z\",\n      \"phd\": false,\n      \"phone\": \"0123456-123\",\n      \"email\": \"email@gmail.com\",\n      \"graduationYear\": \"1970-01-01T00:00:02.018Z\",\n      \"program\": \"UDM\",\n      \"comments\": \"...\"\n    },\n    {...}\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoUsersFound",
            "description": "<p>No users found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"NoUsersFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/CRUDusersRouter.ts",
    "groupTitle": "User"
  },
  {
    "type": "patch",
    "url": "/users/:id",
    "title": "Update a User",
    "version": "0.1.0",
    "name": "UpdateUser",
    "group": "User",
    "parameter": {
      "fields": {
        "uriParams": [
          {
            "group": "uriParams",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>User unique ID.</p>"
          }
        ],
        "String": [
          {
            "group": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>The persons first name.</p>"
          },
          {
            "group": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>The persons last name.</p>"
          },
          {
            "group": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>The persons phone number.</p>"
          },
          {
            "group": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The persons email address.</p>"
          },
          {
            "group": "String",
            "optional": false,
            "field": "program",
            "description": "<p>The persons current program.</p>"
          },
          {
            "group": "String",
            "optional": false,
            "field": "comments",
            "description": "<p>Comments about the person.</p>"
          },
          {
            "group": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The persons password used to login.</p>"
          }
        ],
        "Date": [
          {
            "group": "Date",
            "optional": false,
            "field": "birthDate",
            "description": "<p>The persons birthday.</p>"
          },
          {
            "group": "Date",
            "optional": false,
            "field": "graduationYear",
            "description": "<p>The persons graduation date.</p>"
          }
        ],
        "Boolean": [
          {
            "group": "Boolean",
            "optional": false,
            "field": "phd",
            "description": "<p>Wheter the person is working on a phd or not.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"firstName\":\"Fredrik\",\n  \"lastName\":\"Olsson\",\n  \"birthDate\": \"1980-07-20\",\n  \"phd\":true,\n  \"phone\":\"0123456-123\",\n  \"email\":\"email@gmail.com\",\n  \"graduationYear\":\"2019-06-01\",\n  \"program\":\"dingDong\",\n  \"comments\": \"...\",\n  \"password\": \"supersecret\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n* {\n  \"payload\": [\n    {\n      \"id\": 1,\n      \"firstName\": \"Fredrik\",\n      \"lastName\": \"Olsson\",\n      \"birthDate\": \"1980-10-10T00:00:00.000Z\",\n      \"phd\": false,\n      \"phone\": \"0123456-123\",\n      \"email\": \"email@gmail.com\",\n      \"graduationYear\": \"1970-01-01T00:00:02.018Z\",\n      \"program\": \"UDM\",\n      \"comments\": \"...\",\n      \"password\": \"$2a$08$myH82IsvEy/ksZNkNeWUPubhxsc1fo.D3Kst3ACIHQWNcPd9XnIv2\",\n      \"updatedAt\": \"2017-05-19T15:45:06.355Z\",\n      \"createdAt\": \"2017-05-19T15:45:06.355Z\",\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoUsersFound",
            "description": "<p>No users found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"NoUsersFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/CRUDusersRouter.ts",
    "groupTitle": "User"
  }
] });
