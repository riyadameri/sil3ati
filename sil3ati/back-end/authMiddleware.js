
const jwt = require('jsonwebtoken');
module.exports = (req,res,next) =>{
  const authHeader = req.headers.authorization ;
  if(!authHeader){
    return res.sendStatus(401);
  }
  const data = jwt.verify(authHeader,
    'hgjkhgkjtygjhktg86r565GFHGHFTWFERgjhghgRiyadAmeri',
  );
  if(!data){
    return res.sendStatus(401);
  }
  return res.status(200).json({data : data})
  next(); 
}
