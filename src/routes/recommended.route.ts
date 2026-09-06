import {Router} from 'express'
import { recommendMovies } from '../controllers/recommend.controller.js'


export const recommendedRouter = Router()

recommendedRouter.post('/', recommendMovies)