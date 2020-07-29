export default (req, res) => {
  switch(req.method) {
    case 'GET':
      res.status(200).json({ message: `you requested for ${req.query.name}` });
      break;
    case 'POST':
      res.status(200).json({ message: `user name is ${req.body['name']}`});
      break;
  }
      
 };