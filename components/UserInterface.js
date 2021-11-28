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
        }
    }

    #zendeskAPIWrapper = new ZendeskAPIWrapper(TOKEN)
      
    askForHomeCommand() {
        inquirer.prompt(this.#questions.homeQuestion).then(async (answer) => {
            switch(answer['choice']) {
                case 'View All Tickets':
                    this.#zendeskAPIWrapper.resetPageNum()
                    const ticketsJSON = await this.#zendeskAPIWrapper.getAllTicketsOnPage()
                    ticketsJSON.forEach((ticket)=> {
                        console.log(`Ticket Id: ${ticket.id}, Title: ${ticket.subject}, Description: ${ticket.description}`)
                        console.log('----------------------------------------------------------------')
                    })
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
                    this.#zendeskAPIWrapper.incrPageNum()
                    console.log(await this.#zendeskAPIWrapper.getAllTicketsOnPage())
                    this.askForPageCommand()
                    break;
                case 'Go Back Home':
                    this.#zendeskAPIWrapper.resetPageNum()
                    this.askForHomeCommand();
                    break;
            }
        })
    }
}

module.exports = UserInterface