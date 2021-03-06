import React, { useState, useEffect } from 'react'
import { Button, Form,Icon, Segment, Message } from 'semantic-ui-react'
import Link from 'next/link'
import catchErrors from '../utils/catchErrors'

const INITIAL_USER = {
  email: '',
  password: ''
}

const Login = () => {

  const [user, setUser] = useState(INITIAL_USER)
  const [disabled, setDisabled ] = useState(true)
  const [loading, setLoading ] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const isUserNotEmpty = Object.values(user).every(Boolean)
    setDisabled(!isUserNotEmpty)
  },[user])

  const handleChange = e => {
    const { name, value } = e.target;
    setUser(prevState => ({ ...prevState, [name]: value }))
  }
  
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      setError('')
      setLoading(true)
    } catch (error) {
      catchErrors(error,setError)
    }finally{
      setLoading(false)
    }
  }

  const { email, password } = user
  return (
    <>
    <Message
      attached
      icon="privacy"
      header="Welcome Back!"
      content="Log in with the email and password"
      color="blue"
    />
    <Form error={!!error} onSubmit={handleSubmit} loading={loading}>
      <Message
        error
        header="Oops"
        content={error}
      />
      <Segment>
        <Form.Input
          fluid
          icon="envelope"
          iconPosition="left"
          name="email"
          label="Email"
          type="email"
          placeholder= "Email"
          value={email}
          onChange={handleChange}
        />
        <Form.Input
          fluid
          icon="lock"
          iconPosition="left"
          name="password"
          label="Password"
          type="password"
          placeholder= "Password"
          value={password}
          onChange={handleChange}
        />
        <Button
          icon="sign in"
          type="submit"
          color="orange"
          content="Login"
          disabled={disabled || loading}
        />
      </Segment>
    </Form>
    <Message attached="bottom" warning>
          <Icon name="help"/>
          New user ?{" "}
          <Link href="/signup">
            <a>Sign up here</a>
          </Link>{" "}instead.
        </Message>
    </>
  )
}

export default Login;
