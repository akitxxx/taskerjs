import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'

const ModalConfirm = (props) => {

  return (
    <Modal show={props.show} onHide={props.onClose} animation>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{props.body}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>Cancel</Button>
        <Button variant={props.execButtonType} onClick={props.onClick}>{props.execButton}</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalConfirm