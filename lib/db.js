  const mysql = require('serverless-mysql')
  
  const db = mysql({
    config: {
      host: 'tasker_dev_db',
      database: 'tasker_dev',
      user: 'root',
      password: 'root',
    }
  })

  exports.query = async query => {
    try {
      const results = await db.query(query)
      await db.end()
      return results
    } catch(error) {
      return { error }
    }
  }