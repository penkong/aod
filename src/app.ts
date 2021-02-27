import 'express-async-errors'

import express from 'express'
import morgan from 'morgan'
import cookieSession from 'cookie-session'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import hpp from 'hpp'
import xss from 'xss-clean'

// --

import { options } from './utils/'
import { errorHandler } from './errors'
import { csvUploaderRoute } from './routes'

// --

const app = express()

// Development logging
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

app.set('trust proxy', true)

//use cors middleware
app.use(cors(options))

// Set security HTTP headers
app.use(helmet())

// Limit requests from same API
const limiter = rateLimit({
	max: 100,
	windowMs: 60 * 60 * 1000,
	message: 'Too many requests from this IP, please try again in an hour!'
})

app.use('/api', limiter)

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '100kb' }))
app.use(express.urlencoded({ extended: true, limit: '100kb' }))

app.use(
	cookieSession({
		signed: false,
		secure: process.env.NODE_ENV !== 'test'
	})
)

// Data sanitization against NoSQL query injection
app.use(mongoSanitize())

// Data sanitization against XSS
app.use(xss())

app.use(
	hpp({
		whitelist: []
	})
)

// in case of auth we add this middleware to check of user
// app.use(currentUserDetection);

// Routes
app.use(csvUploaderRoute)

// ALL case for undefined routes
app.all('*', (_, __) => {
	throw new Error('Hey this is not designed here!!!!')
})

// global error handler
app.use(errorHandler)

export { app }
