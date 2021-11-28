const Interface = require('./components/UserInterface')
const userInterface = new Interface()

console.log("Welcome to the Zendesk Ticket Viewer!")
userInterface.askForHomeCommand()