const {resultJwt} = require('../helpers/jwt');
const {User} = require('../models')

async function authentication(req,res,next) {
    try {
        const {authorization} = req.headers
        console.log(authorization);
        // console.log(authorization);
         let [bearer, token] = authorization.split(` `);
        // let isitoken = authorization.substring(0, 6)
        // console.log(isitoken);
        // console.log(!authorization,`-------------------`);
        if (!authorization) {
            throw {name:`not-authentic`}
        }
        console.log(bearer !== `Bearer`,`-----------`);
        if (bearer !== `Bearer`) {
            throw {name:`not-authentic`}
        }
        // let tokenR = authorization.split(isitoken);
        // console.log(tokenR);
        // let checkToken = resultJwt(tokenR[1]);
        let checkToken = resultJwt(token);
        // console.log(checkToken,`----------------`);
        // console.log(checkToken,`----------<`);
        let dataUser = await User.findOne({where:{
            email:checkToken.data
        }})
        // console.log(dataUser,`-----------`);
        if (!dataUser) {
            throw {name:`not-authentic`}
        }
        // console.log(dataUser,`aaaaaaaaaaaaaaa`);
        req.user= {
            id : dataUser.id,
            email : dataUser.email,
            username: dataUser.username
        }
        // console.log(req.user,`-----------------------`);
        next();
    } catch (error) {
        // console.log(error)
        // res.send(error)
        next(error)
    }
}
module.exports = {authentication}