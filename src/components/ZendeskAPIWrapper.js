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

    checkErrors(response) {
        if (!response.ok) {
          console.log('API Request Issue..')
          switch (response.status) {
            case 401:
              throw response.statusText + " Couldn't authenticate"
            case 404:
              throw response.statusText + 'Ticket not found'
            case 400:
              throw response.statusText + 'Invalid ticket id'
            default:
              throw response.statusText
          }
        }
        return response
    }

    async fetchRequest(url) {
        return fetch(url, { 
            method: 'get', 
            headers: {
                'Authorization': `Bearer ${this.token}`, 
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(this.checkErrors)
            .then(response => response.json())
            .catch(error => console.log(error))
    }

}
  
module.exports = ZendeskAPIWrapper