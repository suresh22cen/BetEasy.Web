This is a .Net Core Application - Web API with UI built using Angular 6

This application can be deployed in Windows or Linux or any other OS that has .net framework installed

It's built compatible with **MicroService Architecture** so It can be independently scaled and deployed using Docker Containers

Application HighLights
----------------------

1) Built with .Net Core 2.1 Web API
2) UI Built with Angular 6
3) Runs using Node JS Web Server
4) Gets Data from AWS End Point provided
5) Auto-Refresh races display twice in every minute
6) Dynamic Icon Display for races based on Event Type
7) Incorporated Bet Easy styling 
8) Unit Tests written in Jasmine to test Angular Service and Component
9) Application is built with dev/production deployment and configuration settings in mind. The application can be configured with different urls and other configuration for different 		
   environments.
10) A Global Error Handler is implemented on .net core side which would capture and log the actual exception and return internal server error with friendly error message to the caller
11) The UI shows custom user friendly error messages if there's some exception thrown from API or other processing

Unit Tests
----------

Unit tests are written using Jasmine and Karma to test various Angular Components

File: 

race-service.spec.ts 

This test file has test cases covering various tests on Race Service

race-component-spec.ts

This test file has all test cases to cover various tests on Races Component which serves the UI

Note: I have not written any tests for the Web API since it doesn't do much processing. It's calling the hosted API in AWS and returns the objects. 
When we go for actual project implmentation, we would follow Domain Driven Design with CQRS pattern to implement project and write test cases.

Deployment Instructions
-----------------------
	The files to be published are stored under the deployment folder.

	The application can be deployed using the default .net core Middleware Kestrel or using some other Web Server such as IIS, Apache etc.

	XCopy all the files inside the deployment folder to the website root folder or sub-domain's root folder
	



