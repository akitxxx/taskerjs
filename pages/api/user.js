const db = require('../../lib/db')

export default (req, res) => {
  switch(req.method) {
    case 'GET':
      const users = await db.query('select * from users')
      res.status(200).json({ message: `you requested for ${ JSON.stringify(users) }` })
      break
    case 'POST':
      res.status(200)
      break
  }
 }
