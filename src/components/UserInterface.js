const inquirer = require('inquirer');
const ZendeskAPIWrapper = require('./ZendeskAPIWrapper');
const { TOKEN } = require('../config')

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
    }

    #zendeskAPIWrapper = new ZendeskAPIWrapper(TOKEN)
      
    askForHomeCommand() {
        inquirer.prompt(this.#questions.homeQuestion).then(async (answer) => {
            switch(answer['choice']) {
                case 'View All Tickets':
                    this.#zendeskAPIWrapper.resetPageNum()
                    this.printTickets(await this.#zendeskAPIWrapper.getAllTicketsOnPage())
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
                    this.printTickets(await this.#zendeskAPIWrapper.getAllTicketsOnPage())
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
            this.printTickets([ticket])
            this.askForHomeCommand()
        })
    }

    printTickets(tickets) {
        if (tickets != null) {
            console.table(tickets
                .filter((e) => e)
                .map((ticket) => ticket.serialize()))
        }
    }
}

module.exports = UserInterface