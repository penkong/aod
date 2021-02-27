import mongoose, { Document } from 'mongoose'

// for handling concurrency

import { updateIfCurrentPlugin } from 'mongoose-update-if-current'

// --

interface IpatientAttrs {
	relatedFields: any
	id: any
}

interface IpatientDoc extends mongoose.Document {
	relatedFields: any
	treatmentId: string
}

interface IpatientModel extends mongoose.Model<IpatientDoc> {
	build(attrs: any): any
}

// --

const patientSchema = new mongoose.Schema(
	{
		relatedFields: String
	},
	{
		toJSON: {
			transform(_, ret) {
				ret.id = ret._id
				delete ret._id
			}
		}
	}
)

// -- middlewares

// for handling concurrency
patientSchema.set('versionKey', 'version')
patientSchema.plugin(updateIfCurrentPlugin)

// -- methods

patientSchema.statics.build = (attrs: IpatientAttrs) => {
	return new patient({
		_id: attrs.id,
		relatedFields: attrs.relatedFields
	})
}

// -- model

const patient = mongoose.model<Document<IpatientModel>>(
	'patient',
	patientSchema
)

export { patient }
