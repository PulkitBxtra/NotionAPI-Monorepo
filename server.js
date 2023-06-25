const express = require('express');
const { Client } = require('@notionhq/client');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 4000;
const HOST = "localhost";

const notion = new Client({ auth: "secret_V5vJ1Rv2hZE8heLFjKyZEJgXZJcKpXkWlqg7mPdiAX2" });

// const databaseID = "52844a354a7a4c6cbe849020bca2b56b";
const databaseID = "df440c87fbfb4548a3ef67c4f749571a";

app.post('/addEvent', async (req, res) => {
  const name = "meet";
  const phoneNumber = req.body.phoneNumber;
  
  // Get the current date and time
  const currentDate = new Date();
  const extraInfo = currentDate.toISOString();

  try {
 

    const { summary, description, location, startTime, endTime } = req.body;

    const response = await notion.pages.create({
        parent: { database_id: databaseID },
        properties: {
          Name: {
            title: [
              {
                text: {
                  content: summary
                }
              }
            ]
          },
          Description: {
            rich_text: [
              {
                text: {
                  content: description
                }
              }
            ]
          },
          Location: {
            rich_text: [
              {
                text: {
                  content: location
                }
              }
            ]
          },
          StartTime: {
            date: {
              start: startTime
            }
          },
          EndTime: {
            date: {
              start: endTime
            }
          }

        }
      });
  
      console.log(summary, description, location, startTime, endTime, extraInfo);
  
    res.send("Event added to Notion");

  } catch (err) {
    console.log(err);
    res.status(500).send("Error occurred");
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://${HOST}:${port}`);
});
