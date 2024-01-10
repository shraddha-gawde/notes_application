const jwt = require("jsonwebtoken")

const auth = async(req, res, next)=>{
    const token = req.headers.authorization?.split(" ")[1]
    
    if(token){
        try{
            const decode = jwt.verify(token,"shraddhaBooks")
            if(decode){
                console.log(decode)
                req.body.userID = decode.userID
                req.body.username = decode.username
                next()
            }
            else{
                res.json({msg:"you are not authorized"})
            }
        }
        catch(err){
            res.json({error:err})
        }
    }
    else{
        res.json({msg:"please login!!!"})
    }
}
module.exports={
    auth
}