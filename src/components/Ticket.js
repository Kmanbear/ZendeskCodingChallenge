class Ticket {

    constructor(object) {
        this.id = object.id
        this.subject = object.subject
        this.description = object.description
        this.requesterId = object.requester_id
    }

    /**
    * Uses a regex search function to find and return the current page number from URL.
    *
    * @returns {String} Page number of the current URL.
    */
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
