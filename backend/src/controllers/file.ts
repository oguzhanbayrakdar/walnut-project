import fs from 'fs';
import csv from 'csv-parser'
import { Request, Response } from 'express';
import { bulkInsertToDb } from './user';
import { User } from '../models/user';
import axios from 'axios';
import { UploadedFile } from '../models/uploadedFile';
import { db } from '../server'

export const upload = async (req: Request, res: Response) => {
	if (!req.file) return res.status(404);

	try {
		// Read CSV Data
		const csvData: User[] = [];
		const fileStream = fs.createReadStream(req.file.path);
		let fileBuffer!: Buffer;

		// We read CSV data in the file stream
		await new Promise<void>((resolve: any, reject: any) => fileStream.pipe(csv())
			.on('data', (row) => {
				csvData.push(row);
			})
			.on('end', () => {
				// We need buffer data to send to laravel
				fileBuffer = fs.readFileSync(req!.file!.path);
				// Delete file
				fs.unlinkSync(req!.file!.path);

				resolve({ csvData, fileBuffer })
			})
			.on('error', (err) => {
				console.error('Error processing CSV file:', err);
				reject(err);
			})
		)

		// Create FormData object
		const formData = new FormData();
		const fileBlob = new Blob([fileBuffer], { type: 'application/octet-stream' });

		// Append file to FormData object
		formData.append('file', fileBlob);

		const response = await axios.post('http://localhost:8000/file', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			}
		});

		// Create uploaded file model for db
		const uploadedFile = new UploadedFile({
			originalName: req.file?.originalname,
			path: response.data.path
		})

		// Save uploaded file model to db
		const uploadedFilesCollection = db.collection('uploadedFiles')
		const uploadedFileResult = await uploadedFilesCollection.insertOne(uploadedFile)

		// Uploads csv data to database
		await bulkInsertToDb(csvData)

		return res.status(200).json({
			uploadedFile: uploadedFile,
			csvData: csvData
		})
	}
	catch (err: any) {
		throw new Error(err)
	}
}

export const get = async (req: Request, res: Response) => {
	try {
		const uploadedFilesCollection = db.collection('uploadedFiles');
		const uploadedFiles = await uploadedFilesCollection.find({}).toArray();
		return res.status(200).json(uploadedFiles)
	} catch (err: any) {
		return res.status(400).json({ message: 'An error occurred.' })
	}

}