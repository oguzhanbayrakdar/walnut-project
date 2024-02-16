import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import { MongoClient } from 'mongodb';
import cors from 'cors'

import * as userController from './controllers/user'
import * as fileController from './controllers/file'

// Mongo DB Settings
const mongoUrl = 'mongodb+srv://admin:ofQWxFAuPzfl2FPF@walnutdb.a8sxryj.mongodb.net/?retryWrites=true&w=majority'
const mongoDbClient = new MongoClient(mongoUrl, {});
const dbName = 'walnutdb'
export const db = mongoDbClient.db(dbName)

const multerUpload = multer({
	dest: 'uploads/',

	fileFilter: function (req, file, cb) {
		// Checks file extension
		if (file.originalname.endsWith('.csv') || file.originalname.endsWith('.txt')) {
			// returns true if the file extension is .csv or .txt
			cb(null, true);
		} else {
			// returns error if the file extension is not .csv or .txt
			cb(new Error('Sadece CSV ve metin dosyaları kabul edilir.'));
		}
	}
});

const app = express()
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

// User Management
app.get('/users', userController.get)
app.post('/users', userController.create)
app.put('/users', userController.update)
app.delete('/users/:id', userController.remove)

// File Management
app.post('/file/upload', multerUpload.single('file'), fileController.upload)
app.get('/file', fileController.get)

app.listen(port, async () => {
	await mongoDbClient.connect();
	console.log(`Server is listening at http://localhost:${port}`);
});
