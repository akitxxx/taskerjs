import axios from 'axios'
import React from 'react'
import { shallow } from 'enzyme'
import SignUpPage from './index'
import { Form } from 'react-bootstrap'

jest.mock('axios')

describe('SignUpPage', () => {
  test('show sign up title', () => {
    const wrapper = shallow(<SignUpPage />)
    expect(wrapper.find('h2').text()).toEqual('Sign up')
  })
  // ui test

  // func test
  test('test', async ()=>{
    // (axios.post).mockResolvedValue({ data: { message: 'Mock response!!!' } });
    const axiosMock = axios.post.mockImplementation(() => Promise.resolve({ data: {message: 'hello'} }))

    const wrapper = shallow(<SignUpPage />)
    wrapper.find({ name: 'id' }).simulate('change', { target: { value: 'id' } })
    await wrapper.find('Button').simulate('click')

    console.log(axiosMock.mock)

  }) 
})