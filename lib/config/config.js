//db config
const alertsSchema = new mongoose.Schema(
    {
        alertID: String,
        category: String,
        location: String,
        severity: String,
        type: {
            type: String,
            required: true 
        },
        state: String,
        date: {
            type: Date,
            default: Date.now
        },
        isTicketRaised: Boolean

    }
)

const Alert = new mongoose.model("alert", alertSchema)

// create document or insert
const list = new Alert()