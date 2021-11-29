const ZendeskAPIWrapper = require('../src/components/ZendeskAPIWrapper')
const Ticket = require('../src/components/Ticket')
const { TOKEN } = require('../src/config')

describe('ZendeskAPIWrapper ', () => {
    describe('getAllTickets when', () => {
        it('returns tickets with credentials', async () => {
            const zendeskAPIWrapper = new ZendeskAPIWrapper(TOKEN)
            const tickets = await zendeskAPIWrapper.getAllTicketsOnPage()
            expect(tickets[0] instanceof Ticket).toBeTruthy()
        })
        
        it('returns tickets with no credentials', async () => {
            const zendeskAPIWrapper = new ZendeskAPIWrapper()
            const tickets = await zendeskAPIWrapper.getAllTicketsOnPage()
            expect(tickets).toBeNull()
        })
    })

    describe('get Ticket by ID when ', () => {
        it('returns ticket with existing id credentials', async () => {
            const zendeskAPIWrapper = new ZendeskAPIWrapper(TOKEN)
            const ticket = await zendeskAPIWrapper.getTicketById(25)
            expect(ticket instanceof Ticket).toBeTruthy()
        })

        it('returns ticket with nonexisting id credentials', async () => {
            const zendeskAPIWrapper = new ZendeskAPIWrapper(TOKEN)
            const ticket = await zendeskAPIWrapper.getTicketById(-1)
            expect(ticket).toBeNull()
        })
    })

    describe('pageNum when', () => {
        it('is reset', async () => {
            const zendeskAPIWrapper = new ZendeskAPIWrapper(TOKEN)
            await zendeskAPIWrapper.resetPageNum()
            expect(zendeskAPIWrapper.getPageNum() === 1).toBeTruthy()
        })
        
        it('is incremented', async () => {
            const zendeskAPIWrapper = new ZendeskAPIWrapper(TOKEN)
            await zendeskAPIWrapper.resetPageNum()
            await zendeskAPIWrapper.incrPageNum()
            expect(zendeskAPIWrapper.getPageNum() === 2).toBeTruthy()
        })
    })

})
