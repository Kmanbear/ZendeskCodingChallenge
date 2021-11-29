class Ticket {

    constructor(object) {
        this.id = object.id
        this.subject = object.subject
        this.description = object.description
        this.requesterId = object.requester_id
    }

    serialize() {
        return {
            id: this.id,
            subject: this.subject.trim(),
            description: this.description.substr(0, 40).trim(),
            requesterId: this.requesterId
        }
    }
    
}

module.exports = Ticket
