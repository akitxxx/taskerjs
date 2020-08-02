import React, { useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Link from 'next/link'

const ManageUserPage = ({ users }) => {

  const userList = users.map(user => (
    <li key={user.id}>
      <Link href="/users/[userId]" as={`/users/${ user.id }`}>
        <a>{user.email}</a>
      </Link>
    </li>
  ))

  return (
    <Container>
      <Row>
        <Col sm={3}>
          <h2>ユーザ一覧</h2>
        </Col>
        <Col sm={9}>
          <Link href="/users/new">
            <a><Button>新規登録</Button></a>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <ul>
            {userList}
          </ul>
        </Col>
      </Row>
    </Container>
  )
}

ManageUserPage.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/users', { method: 'GET' })
  const json = await res.json()
  return { users: json }
}

export default ManageUserPage