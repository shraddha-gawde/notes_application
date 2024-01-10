const access = (permitRole)=>{
    return(req, res, next)=>{
        if(permitRole.includes(req.role)){
            next()
        }
        else{
            res.json({msg:"you are not authorized"})
        }
    }
}
module.exports={
    access
}