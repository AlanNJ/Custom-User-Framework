import { User, UserData } from "./User";

export class Attributes<T> {
	constructor(private data: T) {}
	get = <K extends keyof T>(key: string): T[K] => {
		return this.data[key];
	};
	set = (info: T): void => {
		Object.assign(this.data as UserData, info);
	};
	getAll(): T {
		return this.data;
	}
}
// let attr = new Attributes<UserData>({ id: 1, name: "alan", age: 10 });
// let id = attr.get("id") as number;
