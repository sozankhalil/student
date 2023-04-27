import app from "./app.js";

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`first backend app listening on port ${port}`);
});

/* 
----- add this script to login route tests in postman to add it to enviroment variables automatically
----- then in bearer token use the environment variable by writing {{token}}
var jsonData = JSON.parse(responseBody);
postman.setEnvironmentVariable("token", jsonData.token);
*/
