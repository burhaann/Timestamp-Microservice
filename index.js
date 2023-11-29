// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
  // const now = Date.now(); // Unix timestamp in milliseconds
  // console.log(now);
});

// app.get("/api/:date", function (req, res) {
//   const date = req.params.date;
//   console.log("req.params.date =" + date);
//   const unixTimestamp = new Date(date).getTime();
//   const utcTimestamp = new Date(date).toUTCString();
//   res.json({ unix: unixTimestamp, utc: utcTimestamp });

//   if (typeof date === "number") {
//     const unixTime = new Date(date).setTime();
//     res.json({ unix: unixTime, utc: utcTimestamp });
//   }
// });
app.get("/api/:date", (req, res) => {
  const inputDate = req.params.date;

  if (!inputDate) {
    // Handle case where no date is provided
    return res.json({ error: "Invalid date" });
  }

  let dateObject;

  // Check if the provided date can be successfully parsed
  if (!isNaN(inputDate)) {
    // If it's a timestamp, convert it to a number and create a Date object
    dateObject = new Date(Number(inputDate));
  } else {
    // If it's a date string, create a Date object
    dateObject = new Date(inputDate);
  }

  // Check if the date is valid
  if (isNaN(dateObject.getTime())) {
    return res.json({ error: "Invalid date" });
  }

  // Format the response
  const response = {
    unix: dateObject.getTime(),
    utc: dateObject.toUTCString(),
  };

  // Send the response
  res.json(response);
});
