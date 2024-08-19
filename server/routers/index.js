const express = require(`express`)
const Controller = require("../controllers/controller")
const { authentication } = require("../middleware/authen")
const { authorization } = require("../middleware/authorization")

const router = express.Router()

router.post(`/register`, Controller.Register)
router.post(`/login`, Controller.Login)
router.post(`/google-login`, Controller.loginGoogle)
router.post(`/chat`, Controller.OpenAi)
router.get(`/menu`, authentication,Controller.getDataMovie)
router.get(`/myticket`,authentication, Controller.getMyTicket)
router.post('/payment', authentication,Controller.initiatePayment)
router.post('/menu/:id', authentication, Controller.createTicket)
router.patch('/payment/status/:id',authentication,authorization, Controller.updatePayment)
router.post("/myticket/:id", authentication, authorization, Controller.editPayment)
router.delete("/myticket/:id", Controller.delMyTicket)

module.exports = router