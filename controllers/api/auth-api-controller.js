const { User } = require('../../models/index')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const Joi = require('joi');
/** 
 * Force Delete User API
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const getAccessToken = async (req, res)=>{
    try {
        const body = req.body;
        const schema = Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required(),
        })
        const validator = schema.validate(body)
        if(validator.error){
            return res.status(400).json({
                code: 400,
                message: validator.error.message,
            });
        }

        const user = await User.findOne({
            where:{
                email: body.email
            }
        })
    
        if(user){
            const passMatch = bcrypt.compareSync(body.password, user.password)
            if(passMatch){
                const token = jwt.sign({subUsr: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'})
                
                // res.cookie('acs', token, {maxAge: 1000*60*60}) // One Hour Expired
               return res.json({
                    code: 200,
                    message: 'Success Get Token',
                    data:{
                        access_token: token,
                        type: 'Bearer',
                        user: {
                            name: user.name,
                            email: user.email,
                            phone: user.phone,
                            role: user.role
                        },
                    }
               });
            }
        }

        return res.status(403).json({
            code: 403,
            message: "email atau password anda salah"
        })
    } catch (error) {
        return res.status(400).json({
            code: 400,
            message: error.message,
        });
    }
}

module.exports= {
    getAccessToken
}