const inquirer = require('inquirer');
const ZendeskAPIWrapper = require('./ZendeskAPIWrapper');

class Interface {
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
        }
    }

    #zendeskAPIWrapper = new ZendeskAPIWrapper()
      
    askForHomeCommand() {
        inquirer.prompt(this.#questions.homeQuestion).then(async (answer) => {
            switch(answer['choice']) {
                case 'View All Tickets':
                    console.log(await this.#zendeskAPIWrapper.getAllTickets())
                    this.askForPageCommand()
                    break;
                case 'View Ticket by ID':
                    console.log(await this.#zendeskAPIWrapper.getTicketById())
                    this.askForHomeCommand()
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
                    console.log(await this.#zendeskAPIWrapper.getAllTickets())
                    this.askForPageCommand()
                    break;
                case 'Go Back Home':
                    console.log('View Ticket by ID');
                    this.askForHomeCommand();
                    break;
            }
        })
    }
}

module.exports = Interface