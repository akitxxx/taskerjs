import axios from 'axios'
import React from 'react'
import { shallow } from 'enzyme'
import SignUpPage from './index'
import { Form } from 'react-bootstrap'

jest.mock('axios')

describe('SignUpPage', () => {
  test('should exist input forms', () => {
    const wrapper = shallow(<SignUpPage />)
    expect(wrapper.find(<Form.Control name='id' />))
    expect(wrapper.find(<Form.Control name='password' />))
    expect(wrapper.find(<Form.Control name='confirmPassword' />))
  })

  test('should request creating account with entered params', async () => {
    const axiosMock = axios.post.mockImplementation(() => Promise.resolve())

    const input = {
      id: 'id',
      password: 'password',
      confirmPassword: 'password',
    }

    const wrapper = shallow(<SignUpPage />)
    wrapper.find({ name: 'id' }).simulate('change', { target: { name: 'id',  value: input.id } })
    wrapper.find({ name: 'password' }).simulate('change', { target: { name: 'password', value: input.password } })
    wrapper.find({ name: 'confirmPassword' }).simulate('change', { target: { name: 'confirmPassword', value: input.confirmPassword } })
    await wrapper.find('Button').simulate('click')

    expect(axiosMock.mock.calls[0][1]).toEqual({
      id: 'id',
      password: 'password',
      confirmPassword: 'password',
    })
  }) 

  test.only('should login after successful request', () => {
    const axiosMock = axios.post.mockImplementation(() => Promise.resolve())

    const input = {
      id: 'id',
      password: 'password',
      confirmPassword: 'password',
    }

    const wrapper = shallow(<SignUpPage />)
    wrapper.find({ name: 'id' }).simulate('change', { target: { name: 'id',  value: input.id } })
    wrapper.find({ name: 'password' }).simulate('change', { target: { name: 'password', value: input.password } })
    wrapper.find({ name: 'confirmPassword' }).simulate('change', { target: { name: 'confirmPassword', value: input.confirmPassword } })
    await wrapper.find('Button').simulate('click')
  })

  test('should show error after bad request', () => {

  })

}) 