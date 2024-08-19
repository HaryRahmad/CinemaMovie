const { resultJwt } = require("../helpers/jwt");
const { User, Ticket } = require(`../models`)
const { Op } = require("sequelize");

async function authorization(req, res, next) {
    try {
        const { authorization } = req.headers
        // console.log(authorization,`----------`);
        // let isitoken = authorization.substring(0, 6)
        // console.log(req.user);
        let [bearer, token] = authorization.split(` `);
        // console.log(isitoken !== `Bearer`);
        if (bearer !== `Bearer`) {
            throw { name: `not-authentic` }
        }
        // let tokenR = authorization.split(isitoken);
        // console.log(tokenR);
        // console.log(token,`------------------`);
        let checkToken = resultJwt(token)
        // console.log(checkToken);
        // console.log(checkToken,`-,---<----------`);
        let dataUser = await User.findOne({
            where: {
                email: checkToken.data
            }
        })
        // console.log(dataUser,`-----------`);
        // console.log(dataUser.id, `---------------`,req.params.id, `----------------------------- ini data user`);
        const { id } = req.params
        let dataId = req.user.id
        console.log(id, dataId);
        // console.log(+id,`--------------`);
        // console.log(dataUser.dataValues);
        // console.log(req.params,`aaaaaaaaaaaaaaaaa`);
        console.log(+id, dataId);
        let dataMov = await Ticket.findAll({
            where: {
                [Op.and]: [
                    { id: +id },
                    { UserId: dataId }
                ]
            }
        })

        // console.log(dataMov,`aaaaaaaaaaaaaaaaaaaaaaaaaa`);
        // console.log(dataMov,`---------`);
        // console.log(dataMov.dataValues.UserId,`--------------`, dataUser);
        // console.log(dataUser.dataValues.id, dataMov[0].dataValues.UserId, `------------------ ini datamov`);
        if (dataMov[0].dataValues.UserId !== dataUser.dataValues.id) {
            throw { name: `not-authentic` }
        }
        next()
    } catch (error) {
        next(error)
    }
}
module.exports = { authorization }