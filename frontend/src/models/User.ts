export default class User{
	_id?: string;
	firstname!: string;
	lastname!: string;
	email!:string;

	constructor(details: User) {
		Object.assign(this, details);
	}
}