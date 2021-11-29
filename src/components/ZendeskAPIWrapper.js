const fetch = require('node-fetch')
const Ticket = require('./Ticket')

class ZendeskAPIWrapper {

    constructor(token) {
        this.token = token
        this.pageNum = 0
    }

    getPageNum() {
        return this.pageNum
    }

    resetPageNum() {
        this.pageNum = 1
    }

    incrPageNum() {
        this.pageNum++
    }
    
    async getAllTicketsOnPage() {
        let url = `https://zcc438.zendesk.com/api/v2/tickets.json?page=${this.pageNum}&per_page=25`
        let apiResponse = await this.fetchRequest(url)
        if (apiResponse != null && apiResponse.tickets != null) {
            return apiResponse.tickets.map((ticket) => new Ticket(ticket))
        } else {
            return null
        }
    }
  
    async getTicketById(id) {
        let url = `https://zcc438.zendesk.com/api/v2/tickets/${id}.json`
        let apiResponse = await this.fetchRequest(url)
        if (apiResponse != null && apiResponse.ticket != null) {
            return new Ticket(apiResponse.ticket)
        } else {
            return null
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
            .then(response => response.json())
            .catch(error => console.log(error))
    }

}
  
module.exports = ZendeskAPIWrapper