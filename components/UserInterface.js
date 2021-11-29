const inquirer = require('inquirer');
const ZendeskAPIWrapper = require('./ZendeskAPIWrapper');
const TOKEN = require('../config')

class UserInterface {
    #questions = {
        homeQuestion: {
          type: 'rawlist',
          name: 'choice',
          message: 'What would you like to do today?',
          choices: ['View All Tickets', 'View Ticket by ID', 'Quit Program'],
        },
        pageQuestion: {
            type: 'rawlist',
            name: 'choice',
            message: 'Continue to next page or go back to home?',
            choices: ['Continue to Next Page', 'Go Back Home'],
        },
        idQuestion: {
            type: 'number',
            name: 'choice',
            message: 'Enter Ticket ID',
        },
        idPageQuestion: {
            type: 'rawlist',
            name: 'choice',
            message: 'Search new ticket by id or go back to home?',
            choices: ['Search New Ticket By Id', 'Go Back Home'],
        }

    }

    #zendeskAPIWrapper = new ZendeskAPIWrapper(TOKEN)
      
    askForHomeCommand() {
        inquirer.prompt(this.#questions.homeQuestion).then(async (answer) => {
            switch(answer['choice']) {
                case 'View All Tickets':
                    this.#zendeskAPIWrapper.resetPageNum()
                    const tickets = await this.#zendeskAPIWrapper.getAllTicketsOnPage()
                    console.table(tickets.map((ticket) => ticket.serialize()))
                    this.askForPageCommand()
                    break;
                case 'View Ticket by ID':
                    this.askForIdCommand()
                    break;
                case 'Quit Program':
                    console.log('Goodbye!')
                    break;
            }
        })
    }

    askForPageCommand() {
        inquirer.prompt(this.#questions.pageQuestion).then(async (answer) => {
            switch(answer['choice']) {
                case 'Continue to Next Page':
                    this.#zendeskAPIWrapper.incrPageNum()
                    console.log(await this.#zendeskAPIWrapper.getAllTicketsOnPage())
                    this.askForPageCommand()
                    break;
                case 'Go Back Home':
                    this.#zendeskAPIWrapper.resetPageNum()
                    this.askForHomeCommand()
                    break;
            }
        })
    }

    askForIdCommand() {
        inquirer.prompt(this.#questions.idQuestion).then(async (answer) => {
            const ticket = await this.#zendeskAPIWrapper.getTicketById(answer['choice'])
            console.table([ticket.serialize()])
            this.askForHomeCommand()
        })
    }
}

module.exports = UserInterface