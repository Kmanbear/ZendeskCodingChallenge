# Zendesk Coding Challenge

## Prerequisite Installations

- [NodeJS](https://nodejs.org/en/) v10.16.0 or greater
- NPM v6.9.0 or greater (At the time of making this documentation, NPM comes with the Node.js installation)

## How to run (MacOS/Windows)

1. Clone the repository to your local machine.

```
$ git clone https://github.com/Kmanbear/ZendeskCodingChallenge.git
```

2. Install all npm modules with the following code.

```
$ npm install
```

3. Navigate to the .env file. Write OAuth 2.0 token into .env file.

```
TOKEN={API key here}
```

4. Run the program with the following code.

```
$ npm start
```

5. To navigate through the program, type the number for each command line option and press enter.

#### Run Tests

1. Run the tests with the following code

```
$ npm test
```

## Architectural Design Overview

### Assumptions
- Users are familar with CLI usage.
- Ticket requests to the Zendesk API will always return JSON with the same structure.
- Error responses from the Zendesk API will always return JSON with the same structure.

### Main Component Description

- ```index.js``` : Program entry point
- ```Ticket.js``` : Object to represent tickets. Handles what data fields are shown to users.
- ```ZendeskAPIWrapper.js``` : API wrapper that makes requests to Zendesk API to get ticket data
- ```UserInterface.js``` : Handles user input and routing, and outputs ticket data into command line.

### Design Choices

#### Connecting to Zendesk API Authorization

Ticket requests within my application use the NPM node-fetch module which is a node.js version of the vanilla js ```window.fetch``` method. The module makes it easy to write GET requests to get ticket data from the Zendesk API.

The application uses OAuth 2.0 as the primary method of communicating credentials, using the ```Bearer Token``` syntax, within the request Authorization header. The token is in the .env file and is read in config.js using the NPM dotenv package. The OAuth 2.0 key can be configured in Zendesk's admin page using the scope "tickets:read" which only allows for the application to read ticket data.

#### Getting User Input

The application uses an NPM package called inquirer to generate questions and handle user inputs. The question are consolidated into an questions object, and the user input is read from the returned answer object. The inquirer package allows for clear routing of which questions are asked, as after an answer is processed, a question can be recursively called.

#### Displaying Tickets

The application first gets JSON data from the ZendeskAPIWrapper. This JSON data creates a Ticket object. Within the Ticket object is a custom serialization function that preprocess and exposes the correct fields that a ticket should output to the user. In the UserInterface.js file, I can directly call console.table to output the ticket using the ticket.serialize() function. The advantage of using a serializer is that there is one place I can modify if I want to add information or change what information is passed to the user interface.

#### Page through tickets when more than 25 are returned

I used query parameters to specify how many tickets could be shown on a page and the page number. This way, my code wouldn't have to handle pagination as the server handles this. I ended up incrementing the page number query parameter rather than using the next url field because while it would be useful for this app, in the future, if the app needs to display a specific page, it would be more useful to have a single function responsible for getting the number of tickets on a specific page.