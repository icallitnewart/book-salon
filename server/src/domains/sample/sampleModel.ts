import { Schema, model, Document } from 'mongoose';

export interface ISample extends Document {
	name: string;
	email: string;
	password: string;
}
/**
 * @swagger
 * components:
 *   schemas:
 *     Sample:
 *       type: object
 *       properties:
 *         _id:
 *           type: objectId
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *       example:
 *         _id: 59b99db4cfa9a34dcd7885b6
 *         name: John Doe
 *         email: john@example.com
 *         password: password123
 *     SampleInput:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 */
const sampleSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});

export const Sample = model<ISample>('Users', sampleSchema);
