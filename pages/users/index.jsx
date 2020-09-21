import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button, Table, Alert } from 'react-bootstrap'
import Link from 'next/link'
import ModalConfirm from '../../components/modal'

const ManageUserPage = (props) => {

  const [users, setUsers] = useState(props.users)
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [showModalConfirm, setShowModalConfirm] = useState(false)
  const [deleteUserId, setDeleteUserId] = useState('')

  useEffect(() => {
    // show success if query param is true.
    if(props.query.success) {
      const message = `Registered User : ${props.query.registeredUser}`
      alertSuccess(message)
    }
  }, [props.query])

  // show success
  const alertSuccess = (message) => {
    setShowSuccess(true)
    setSuccessMessage(message)
    setTimeout(() => {
      setShowSuccess(false)
    }, 3000)
  }

  const refreshUserList = async () => {
      const res = await fetch('http://localhost:3000/api/users', { method: 'GET' })
      const userJson = await res.json()
      setUsers(userJson)
  }

  const handleClickDelete = (e, userId) => {
    // give userId and show confirm dialog.
    setDeleteUserId(userId)
    setShowModalConfirm(true)
  }

  const deleteUser = async () => {
    // fetch delete user api.
    try {
      await fetch(`http://localhost:3000/api/users/${deleteUserId}`, { method: 'DELETE' }) 

      alertSuccess('Deleted Successfully.')
      refreshUserList()
    } catch(err) {
      alert('Error: ' + err)
    }

    setShowModalConfirm(false)
  }

  const closeModalConfirm = () => {
    setShowModalConfirm(false)
  }

  const userList = () => {
    if(!users) {
      return
    }

    return users.map((user, index) => (
      <tr key={index + 1}>
        <td>{index + 1}</td>
        <td>
          <Link href="/users/[userId]" as={`/users/${user.id}`}>
            <a>{user.email}</a>
          </Link>
        </td>
        <td>
          <Button variant="danger" onClick={(e) => handleClickDelete(e, user.id)}>削除</Button>
        </td>
      </tr>
    ))
  }

  return (
    <Container>
      <Row>
        <Col>
          <Alert
            variant="success"
            show={showSuccess}
            onClose={() => setShowSuccess(false)}
            dismissible
          >{successMessage}
          </Alert>
        </Col>
      </Row>
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
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No.</th>
                <th>ユーザ</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {userList}
            </tbody>
          </Table>
        </Col>
      </Row>
      <ModalConfirm
        show={showModalConfirm}
        title="Delete Confirmation" 
        body="Are you sure?"
        execButton="Delete"
        execButtonType="danger"
        onClick={deleteUser}
        onClose={closeModalConfirm}
      />
    </Container>
  )
}

ManageUserPage.getInitialProps = async ({ query }) => {
  const res = await fetch('http://localhost:3000/api/users', { method: 'GET' })
  const json = await res.json()
  return { users: json, query: query }
}

export default ManageUserPage