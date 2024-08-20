import { Schema, model, Document } from 'mongoose';

export interface IUser {
	email: string;
	nickname: string;
	password: string;
}

export interface IUserModel extends IUser, Document {}

export interface IUserInput extends IUser {
	passwordConfirm: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: objectId
 *         email:
 *           type: string
 *         nickname:
 *           type: string
 *         password:
 *           type: string
 *       example:
 *         _id: 60a9a1c1f2d3b12f3c8d0f1c
 *         email: john@example.com
 *         nickname: johndoe
 *         password: password123
 *     UserInput:
 *       type: object
 *       required:
 *         - email
 *         - nickname
 *         - password
 *         - passwordConfirm
 *       properties:
 *         email:
 *           type: string
 *         nickname:
 *           type: string
 *         password:
 *           type: string
 *         passwordConfirm:
 *           type: string
 */
const userSchema = new Schema({
	email: { type: String, required: true, unique: true },
	nickname: { type: String, required: true },
	password: { type: String, required: true },
});

export const User = model<IUserModel>('Users', userSchema);
