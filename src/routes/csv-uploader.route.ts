import express, { Request, Response } from 'express'

// --

const router = express.Router()

// --

router.post('/api/csv-upload', async (req: Request, res: Response) => {
	// we here catch file from uploader , front or nats or maybe read it from file
	// exact implementation will come in future.
})

// --

export { router as csvUploaderRoute }
