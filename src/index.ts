import mongoose from 'mongoose'
import dotenv from 'dotenv'
// --

import { app } from './app'
import { STRINGS } from './utils/'

// --

dotenv.config({ path: './config.env' })
const start = async () => {
	if (!process.env.STH_KEY) throw new Error(STRINGS[0])

	try {
		const DB = process.env.MONGO_URI!.replace(
			'<PASSWORD>',
			process.env.DATABASE_PASSWORD!
		)
		await mongoose.connect(DB!, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		})
		console.log(STRINGS[1])
	} catch (err) {
		console.log(STRINGS[2])
		console.error(err)
	}

	const port = process.env.PORT || 5000

	// server init
	const server = app.listen(port, () => {
		console.log(STRINGS[3])
	})

	// special type of error
	process.on('unhandledRejection', err => {
		console.log(STRINGS[4])
		console.log(err)
		server.close(() => {
			process.exit(1)
		})
	})

	// special type of error
	process.on('uncaughtException', err => {
		console.log(STRINGS[5])
		console.log(err.name, err.message)
		process.exit(1)
	})

	// special type of error
	process.on('SIGTERM', () => {
		console.log(STRINGS[6])
		server.close(() => {
			console.log(STRINGS[8])
		})
	})

	// special type of error
	process.on('SIGINT', () => {
		console.log(STRINGS[7])
		server.close(() => {
			console.log(STRINGS[8])
		})
	})
}

start()
