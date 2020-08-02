import { Container, Row, Col, Form, Button } from 'react-bootstrap'

const UserPage = ({ user }) => {
  return (
    <Container>
      <Row>
        <Col>
          <h2>ユーザ詳細</h2> 
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>{user.email}</h3>
        </Col>
      </Row>
    </Container>
  )
}

UserPage.getInitialProps = async (context) => {
  const { userId } = context.query
  const res = await fetch(`http://localhost:3000/api/users/${ userId }`, { method: 'GET' })
  const json = await res.json()
  return { user: json }
}

export default UserPage