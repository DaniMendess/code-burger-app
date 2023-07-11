import { Router } from 'express'

import multer from 'multer'
import multerConfig from './config/multer'

import ProductController from './app/controllers/ProductController'
import SessionController from './app/controllers/SessionController'
import UserContoller from './app/controllers/UserContoller'
import CategoryController from './app/controllers/CategoryController'
import OrderController from './app/controllers/OrderController'

import authMiddleware from './app/middlewares/auth'

const upload = multer(multerConfig)
const routes = new Router()

routes.post('/users', UserContoller.store)
routes.post('/sessions', SessionController.store)

routes.use(authMiddleware) // Será chamado por todas as rotas abaixo

routes.post('/products', upload.single('file'), ProductController.store)
routes.get('/products', ProductController.index)

routes.post('/categories', CategoryController.store)
routes.get('/categories', CategoryController.index)

routes.post('/orders', OrderController.store)
routes.get('/orders', OrderController.index)
routes.put('/orders/:id', OrderController.update)

export default routes
