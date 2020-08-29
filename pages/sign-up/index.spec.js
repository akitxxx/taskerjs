import React from 'react'
import { shallow } from 'enzyme'
import SignUpPage from './index'

describe('SignUpPage', () => {
  test('show sign up title', () => {
    const wrapper = shallow(<SignUpPage />)
    expect(wrapper.find('h2').text()).toEqual('Sign up')
  })
})