# .NETCORE_3.0 RESTFUL API WITH REACT IN THE FRONT END BY DIEGO MAQUILL
# THIS COULD BE USE AS A BASE FOR A TWITTER TYPE WEB APPLICATION

My setup may be different than yours as I am using VS code for running project, yours may vary.
There are 3 sides to this project: backend, backendTest and frontend. 
(I believe backendTest is project where controllers are tested. You don’t need to fire that up, just put it aside )
I would open the backend folder in 1 window, and run it with

-	`dotnet run`

Authentication is managed by a 3rd party app called “Auth0”. Open yourself an account and look for the appropriate setting given by this app.
Double check the connection string in `appsettings.json` points to your database and that the Auth0 settings are correct. 

- The tests can be run using the *Test Explorer* window
- The backend can be run by pressing *F5*
 
 To restore the frontend code for this chapter, open the `frontend` folder in a different VS Code window and run `npm install` in the terminal. Enter your Auth0 settings in `AppSettings.ts`. Put your test username and password in the cypress tests.

- `npm start` will then run the app in dev mode. 
- `npm test` will run the Jest tests
- `npm run cy:open` will open the Cypress tests

# Some CRUD Operation may need to be added. I believe you may find GET and POST are already setup. You need to implement UPDATE AND DELETE
