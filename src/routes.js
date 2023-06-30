import { Router } from 'express'

import multer from 'multer'
import multerConfig from './config/multer'

import ProductController from './app/controllers/ProductController'
import SessionController from './app/controllers/SessionController'
import UserContoller from './app/controllers/UserContoller'

const upload = multer(multerConfig)
const routes = new Router()

routes.post('/users', UserContoller.store)
routes.post('/sessions', SessionController.store)
routes.post('/products', upload.single('file'), ProductController.store)

export default routes
