import React, { useState, useEffect } from 'react'
import axios from 'axios'
import baseUrl from '../utils/baseUrl'
import catchErrors from '../utils/catchErrors'
import { 
  Header,
  Form,
  Input,
  TextArea,
  Button,
  Image,
  Message,
  Icon
 } from 'semantic-ui-react'
 

const INITIAL_PRODUCT = {
  name: '',
  price: '',
  media: '',
  description: ''
}

const CreateProduct = () => {

  const [product, setProduct] = useState(INITIAL_PRODUCT)
  const [mediaPreview, setMediaPreview] = useState('')
  const [success,setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const isProductNotEmpty = Object.values(product).every(Boolean)
    setDisabled(!isProductNotEmpty)
  }, [product])

  const handleChange = e => {
    const { name, value, files } = e.target
    if(name === "media"){
      setProduct(prevState => ({ ...prevState, media: files[0] }))
      setMediaPreview(window.URL.createObjectURL(files[0]))
    }
    else{
      setProduct(prevState => ({ ...prevState, [name]: value }))
    }
  }


  const handleImageUpload = async () => {
    const data = new FormData()
    data.append('file', product.media)
    data.append('upload_preset','reserved')
    data.append('cloud_name', 'cloudfer0')
    const response = await axios.post(process.env.CLOUDINARY_URL,data)
    return response.data.url
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      setLoading(true)
      setError('')

      const mediaUrl = await handleImageUpload()
      const url = `${baseUrl}/api/product`
      const { media, ...otherParams } = product
      const payload = { ...otherParams, mediaUrl}

      await axios.post(url,payload)
      setProduct(INITIAL_PRODUCT)
      setSuccess(true)

    } catch (error) {
      catchErrors(error, setError)
    }
    finally{
      setLoading(false)
    }
  }

  const { name, description,price } = product

  return (
    <>
    <Header as="h2" block>
      <Icon name="add" color="orange"/>
      Create New Product
    </Header>
    <Form loading={loading} success={success} error={!!error} onSubmit={handleSubmit}>
      <Message 
        error
        header= "Oops!"
        content={error}
      />
      <Message 
        success
        icon="check"
        header= "Success!"
        content="Your product has been posted"
      />
      <Form.Group widths="equal">
        <Form.Field
          control={Input}
          name= "name"
          label= "Name"
          placeholder= "Name"
          value={name}
          onChange={handleChange}
        />
        <Form.Field
          control={Input}
          name= "price"
          label= "Price"
          placeholder= "Price"
          min="0.00"
          step="0.01"
          type="number"
          value={price}
          onChange={handleChange}
        />
        <Form.Field
          control={Input}
          name= "media"
          label= "Media"
          type="file"
          content="Select Image"
          accept="image/*"
          onChange={handleChange}
        />
      </Form.Group>
        <Image src={mediaPreview} rounded centered size="small"/>
        <Form.Field
          control={TextArea}
          name= "description"
          label= "Description"
          placeholder= "Description"
          value={description}
          onChange={handleChange}
        />
        <Form.Field
          control={Button}
          disabled={disabled || loading}
          color="blue"
          icon="pencil alternate"
          content="Submit"
          type="submit"
        />
    </Form>
    </>
  )
}

export default CreateProduct;
