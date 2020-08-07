const db = require('../../../lib/db')

export default async (req, res) => {
  switch(req.method) {
    case 'GET':
      // get user list.
      const users = await db.query('select id, email from users')
      res.status(200).json(users)
      break

    case 'POST':
      // set param.
      const user = {
        email: req.body['email'],
        password: req.body['password'],
      }

      // check required param.
      if(!user.email || !user.password) {
        res.status(400).json({ error: 'param(email, password) is required.' })
        return
      }

      // insert record.
      try {
        await db.transaction(`insert into users(email, password) values('${ user.email }', '${user.password }')`)

        const retUser = { email: user.email }
        res.status(201).json({ user: retUser })
      } catch(err) {
        res.status(500).json({ error: err.sqlMessage })
        return
      }
      break

    default:
      res.status(404).end()
      break
  }
 }
