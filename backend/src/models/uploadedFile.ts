export class UploadedFile{
	id?: string;
	originalName!: string;
	path!: string;

	constructor(details: UploadedFile) {
		Object.assign(this,details)		
	}

}