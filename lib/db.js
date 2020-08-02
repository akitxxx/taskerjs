  const mysql = require('serverless-mysql')
  
  const db = mysql({
    config: {
      host: 'tasker_dev_db',
      database: 'tasker_dev',
      user: 'root',
      password: 'root',
      onConnectError: (e) => {
        console.log('Connect Error: ' + e.code)
      },
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

  exports.transaction = async (query) => {
    const results = await db.transaction()
      .query(query)
      .rollback()
      .commit()

    await db.end()
    return results
  }