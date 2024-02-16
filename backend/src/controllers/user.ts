import { Request, Response } from 'express';
import { body, check, validationResult } from 'express-validator'
import { ObjectId } from 'mongodb';

import { db } from '../server';
import { User } from '../models/user';

export const get = async (req: Request, res: Response) => {

	try{
		const usersCollection = db.collection('users');
		const users = await usersCollection.find({}).toArray();
		return res.status(200).json(users)
	}catch(err: any){
		return res.status(400).json({message: 'An error occurred.'})
	}
	
}
export const create = async (req: Request, res: Response) => {
	await check('email', "E-mail is not valid").isEmail().run(req)
	await check('firstname', "Firstname is not valid").isString().run(req)
	await check('lastname', "Lastname is not valid").isString().run(req)

	const errors = validationResult(req);

	if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});

	const { email, firstname, lastname } = req.body;

	try{
		const usersCollection = db.collection('users');
		
		const newUser = new User({
			email, firstname, lastname
		})
		const result = await usersCollection.insertOne(newUser);
		return res.status(200).json({result})
	}catch(err: any){
		return res.status(400).json({message: 'An error occurred.'})
	}
}
export const update = async (req: Request, res: Response) => {
	await check('email', "E-mail is not valid").isEmail().run(req)
	await check('firstname', "Firstname is not valid").isString().run(req)
	await check('lastname', "Lastname is not valid").isString().run(req)
	console.log(req.body)
	await check('_id', "ID is not valid").isString().run(req)

	const errors = validationResult(req);

	if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});

	const { email, firstname, lastname } = req.body;

	try{
		const usersCollection = db.collection('users');
		const user = await usersCollection.findOneAndUpdate({_id: new ObjectId(req.body._id)},
		{
			$set: {
				email, firstname, lastname
			}
		})
		return res.status(200).json({user})
	}catch(err: any){
		return res.status(400).json({message: 'An error occurred!'})
	}	
}
export const remove = async (req: Request, res: Response) => {
	const id = req.params.id;

	try{
		const userCollection = db.collection('users');
		await userCollection.deleteOne({_id: new ObjectId(id)})

		return res.status(200).json({message: 'The user successfully deleted.'})
	}
	catch(err: any){
		return res.status(400).json({message: 'An error occurred!'});
	}
}

export async function bulkInsertToDb(users: User[]){
	try{
		const usersCollection = db.collection('users');
		const addedUsers = usersCollection.insertMany(users);
		return addedUsers;
	}
	catch(err: any){
		throw new Error(err);
	}
}

