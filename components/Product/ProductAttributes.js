import React, { useState } from 'react'
import { Header, Button, Modal } from 'semantic-ui-react'
import axios from 'axios'
import baseUrl from '../../utils/baseUrl'
import { useRouter } from 'next/router'

const ProductAttributes = ({ description, _id }) => {
  const [modalVisibility, setModalVisibility] = useState(false)
  const router = useRouter()

  const openModal = () => setModalVisibility(true)
  const closeModal = () => setModalVisibility(false)

  const handleDelete = async() => {
    const url = `${baseUrl}/api/product`
    const payload = { params: { _id }}
    await axios.delete(url,payload)
    router.push('/')
  }

  return (
    <>
    <Header as="h3">About this product</Header>
    <p>{description}</p>
    <Button
      icon="trash alternate outline"
      color="red"
      content="Delete Product"
      onClick={openModal}
    />
    <Modal open={modalVisibility} dimmer="blurring">
      <Modal.Header>Confirm Delete</Modal.Header>
      <Modal.Content><p>Are you sure you want to delete this product?</p></Modal.Content>
      <Modal.Actions>
        <Button content="Cancel" onClick={closeModal}/>
        <Button
          negative
          icon="trash"
          labelPosition="right"
          content="Delete"
          onClick={handleDelete}
        />
      </Modal.Actions>
    </Modal>
    </>
  )
}

export default ProductAttributes;
