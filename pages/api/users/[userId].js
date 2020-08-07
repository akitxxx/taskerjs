const db = require('../../../lib/db')

export default async (req, res) => {
  switch(req.method) {
    case 'GET':
      // get user
      const user = await db.query(`select * from users where id = ${ req.query.userId }`)
      res.status(200).json(user[0])
      break
    
    case 'DELETE':
      // delete user
      await db.query(`delete from users where id = ${ req.query.userId }`)
      res.status(200).end()
      break

    default:
      res.status(404).end()
      break
  }
}