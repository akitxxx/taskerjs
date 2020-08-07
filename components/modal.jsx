import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'

const ModalConfirm = (props) => {

  const handleClose = () => {
    props.onClose
  }

  const handleClick = () => {
    props.onClick
  }

  return (
    <Modal show={props.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{props.body}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClose={() => handleClose}>Cancel</Button>
        <Button variant={props.execButtonType} onClick={() => handleClick}>{props.execButton}</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalConfirm