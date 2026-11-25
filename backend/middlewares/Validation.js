import joi from 'joi'

const signUpValidation = (req, res, next)=>{
    const schema = joi.object({
        name: joi.string().min(3).max(100).required(),
        email: joi.string().trim().lowercase().email().required(),
        password: joi.string().min(8).max(100).required()
    }).required()
    const {error: err, value} = schema.validate(req.body, { abortEarly: false });
    if(err){
        return res.status(400).json({
            message: "Validation failed",
            errors: err.details.map(({ message, path }) => ({ message, field: path.join('.') }))
        })
    }
    req.body = value;
    next()
}

const loginValidation = (req, res, next)=>{
    const schema = joi.object({
        email: joi.string().trim().lowercase().email().required(),
        password: joi.string().min(8).max(100).required()
    }).required()
    const {error: err, value} = schema.validate(req.body, { abortEarly: false });
    if(err){
        return res.status(400).json({
            message: "Validation failed",
            errors: err.details.map(({ message, path }) => ({ message, field: path.join('.') }))
        })
    }
    req.body = value;
    next()
}

export {
    signUpValidation,
    loginValidation
}
