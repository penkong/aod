import mongoose, { Document } from 'mongoose'

// for handling concurrency

import { updateIfCurrentPlugin } from 'mongoose-update-if-current'

// --

interface ITreatmentAttrs {
	relatedFields: any
	id: any
}

interface ITreatmentDoc extends mongoose.Document {
	relatedFields: any
	patientId: string
}

interface ITreatmentModel extends mongoose.Model<ITreatmentDoc> {
	build(attrs: any): any
}

// --

const treatmentSchema = new mongoose.Schema(
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
treatmentSchema.set('versionKey', 'version')
treatmentSchema.plugin(updateIfCurrentPlugin)

// -- methods

treatmentSchema.statics.build = (attrs: ITreatmentAttrs) => {
	return new treatment({
		_id: attrs.id,
		relatedFields: attrs.relatedFields
	})
}

// -- model

const treatment = mongoose.model<Document<ITreatmentModel>>(
	'treatment',
	treatmentSchema
)

export { treatment }
