import { Router } from 'express'

import { v4 } from 'uuid'

import User from './app/models/User'

const routes = new Router()

routes.get('/', async (request, response) => {
  const user = await User.create({
    id: v4(),
    name: 'Daniel Barbosa',
    email: 'danimendes1@gmail.com',
    password_hash: '23ds1242'

  })
  return response.json(user)
})

export default routes
