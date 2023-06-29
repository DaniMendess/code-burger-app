import { Router } from 'express'
import SessionController from './app/controllers/SessionController'
import UserContoller from './app/controllers/UserContoller'

const routes = new Router()

routes.post('/users', UserContoller.store)
routes.post('/sessions', SessionController.store)

export default routes
