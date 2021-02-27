import request from 'supertest'

declare global {
	namespace NodeJS {
		interface Global {
			helloWorld(id?: string): void
		}
	}
}

beforeAll(async () => {})

beforeEach(async () => {})

afterAll(async () => {})

global.helloWorld = (id?: string) => {
	console.log(id)
}
