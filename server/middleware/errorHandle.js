function errorHandler(err, req, res, next) {
    console.log(err, 'aaaabbbbbb');
    // console.log(err.name);
    switch (err.name) {
        case "not-authentic":
            return res.status(401).json({ message: `no authentic` })
        case "cannot-del":
            return res.status(401).json({ message: `data yang sudah tidak dapat di delete` })
        case "email-password invalid":
            return res.status(401).json({ message: `Invalid Email/Password` })
        case "cannot-duplicate":
            return res.status(401).json({ message: `Data Sudah di add di MyTicket` })
        case "user-error":
            return res.status(401).json({ message: `user not found` })
        case "data-invalid":
            return res.status(401).json({ message: `email or password invalid` })
        case "JsonWebTokenError":
            return res.status(401).json({ message: `not have permission` })
        case "forbiden":
            return res.status(403).json({ message: `forbiden error authorize` })
        case "not-found":
            return res.status(404).json({ message: `data not found` })
        case "FileisRequired":
            return res.status(404).json({ message: `file not found` })
        case "payment-done":
            return res.status(401).json({ message: "tickets have been purchased check history" })
        case "payment-error":
            return res.status(401).json({ message: "payment error please wait" })
        case "cannot-del":
            return res.status(401).json({ message: "succes payment ticket, you only can delete pending ticket" })
        case "googleToken-not":
            return res.status(400).json({ message: `google token not provide` })
        case "SequelizeValidationError":
        case "SequelizeConstraintError":
        case "SequelizeUniqueConstraintError":
            return res.status(400).json({ message: err.errors[0].message })
        default:
            return res.status(500).json({ message: `internal server error` })
    }
}
module.exports = errorHandler