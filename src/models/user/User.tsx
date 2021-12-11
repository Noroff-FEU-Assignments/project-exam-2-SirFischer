
export interface IUserData {
	id: number;
	name: string;
	email: string;
	jwt: string;
}

export interface IUserLogin {
	email: string;
	password: string;
}