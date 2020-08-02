import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

const UserNewPage = () => {
  const router = useRouter()

  const [state, setState] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const user = await registerUser(state)
      alert(`Success.\nUser registered：${user.email}`)
      router.push('/users')
    } catch(err) {
      alert('failed to register.\n' + 'Error: ' + err)
      return
    }
  }

  // Register user
  const registerUser = async (user) => {
    const res = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user)
    })

    // if has error, throw exception.
    if(!res.ok) {
      const json = await res.json()
      throw json.error
    }

    // return user object.
    const json = await res.json()
    return json.user
  }

  return (
    <Container className="mx-auto">
      <Row>
        <Col md={{span:8, offset:2}}>
          <h2 className="text-center">ユーザ新規登録</h2>
        </Col>
        <Col md={{span:8, offset:2}}>
          <Form>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="text"
                name="email"
                placeholder="email"
                autoComplete="off"
                onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password"
                name="password"
                placeholder="password"
                autoComplete="new-password"
                onChange={handleChange}
              />
            </Form.Group>
            <Button type="submit" onClick={handleSubmit}>登録</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default UserNewPage