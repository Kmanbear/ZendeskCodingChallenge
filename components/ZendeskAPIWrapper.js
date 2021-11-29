const fetch = require('node-fetch')
const Ticket = require('./Ticket')

class ZendeskAPIWrapper {

    constructor(token) {
        this.token = token.TOKEN
        this.pageNum = 0
    }

    resetPageNum() {
        this.pageNum = 0
    }

    incrPageNum() {
        this.pageNum++
    }
    
    async getAllTicketsOnPage() {
        let url = `https://zcc438.zendesk.com/api/v2/tickets.json?page=${this.pageNum}&per_page=25`
        let apiResponse = await this.fetchRequest(url)
        if (apiResponse != null) {
            return apiResponse.tickets.map((ticket) => new Ticket(ticket))
        }
    }
  
    async getTicketById(id) {
        let url = `https://zcc438.zendesk.com/api/v2/tickets/${id}.json`
        let apiResponse = await this.fetchRequest(url)
        if (apiResponse != null) {
            return new Ticket(apiResponse.ticket)
        }
    }

    async fetchRequest(url) {
        return fetch(url, { 
            method: 'get', 
            headers: {
                'Authorization': `Bearer ${this.token}`, 
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            // .then((response) => console.log("API Error"))
            .then(response => response.json())
            .catch(error => console.log(error))
    }

}
  
module.exports = ZendeskAPIWrapper