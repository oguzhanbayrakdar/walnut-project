export class User{
	id?: string
	firstname!: string
	lastname!: string
	email!: string

	constructor(details: User) {
		Object.assign(this, details)
	}
}