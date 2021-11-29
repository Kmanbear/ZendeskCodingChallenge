// const userInterface = require('../src/components/UserInterface')

// describe('Ticket', () => {
//   it('successfully filters out unnecessary properties', () => {
//     const mockTicket = {
//       id: 1,
//       subject: 'velit eiusmod reprehenderit officia cupidatat',
//       description: 'Aute ex sunt culpa ex ea esse sint cupid',
//       requester_id: 422172754311,
//       unnecessary: "unnecessary"
//     }
//     expect(new Ticket(mockTicket)).toEqual({
//       id: 1,
//       subject: 'velit eiusmod reprehenderit officia cupidatat',
//       description: 'Aute ex sunt culpa ex ea esse sint cupid',
//       requesterId: 422172754311
//     })
//   })

//   it('should format the ticket into the correct structure when provided an unformatted ticket object.', () => {
//     const mockTicket = {}
//     console.log(new Ticket(mockTicket))
//     expect(new Ticket(mockTicket)).toEqual({
//       id: undefined,
//       subject: undefined,
//       description: undefined,
//       requesterId: undefined
//     })
//   })

//   it('successfully trim subject', () => {
//     const mockTicket = {
//       id: 1,
//       subject: '    velit eiusmod reprehenderit officia cupidatat    ',
//       description: 'Aute ex sunt culpa ex ea esse sint cupid',
//       requester_id: 422172754311,
//       unnecessary: "unnecessary"
//     }
//     console.log(new Ticket(mockTicket))
//     expect((new Ticket(mockTicket)).serialize()).toEqual({
//       id: 1,
//       subject: 'velit eiusmod reprehenderit officia cupidatat',
//       description: 'Aute ex sunt culpa ex ea esse sint cupid',
//       requesterId: 422172754311
//     })
//   })

//   it('successfully shorten description', () => {
//     const mockTicket = {
//       id: 1,
//       subject: 'velit eiusmod reprehenderit officia cupidatat',
//       description: 'Aute ex sunt culpa ex ea esse sint cupidextra',
//       requester_id: 422172754311,
//       unnecessary: "unnecessary"
//     }
//     console.log(new Ticket(mockTicket))
//     expect((new Ticket(mockTicket)).serialize()).toEqual({
//       id: 1,
//       subject: 'velit eiusmod reprehenderit officia cupidatat',
//       description: 'Aute ex sunt culpa ex ea esse sint cupid',
//       requesterId: 422172754311
//     })
//   })
// })