//With Composition

import axios, { AxiosResponse } from "axios";
import { Eventing } from "./Eventing";
import { Sync } from "./Sync";
import { Attributes } from "./Attributes";

export interface UserData {
	name?: string;
	age?: number;
	id?: number;
}
let rootUrl = "http://localhost:3000/users";
export class User {
	name: string;
	age: number;

	// events: Eventing = new Eventing();
	// static fromData(data: UserData): User {
	// 	let user = new User(new Eventing());
	// 	user.set(data);
	// 	return user;
	// }
	events: Eventing = new Eventing(); //hardcoding
	sync: Sync<UserData> = new Sync<UserData>(rootUrl);
	public attributes: Attributes<UserData>;

	constructor(attr: UserData) {
		this.attributes = new Attributes<UserData>(attr);
	}
	get on() {
		return this.events.on;
	}
	get get() {
		return this.attributes.get;
	}
	get trigger() {
		return this.events.trigger;
	}
	set(data: UserData): void {
		this.attributes.set(data);
		this.events.trigger("change");
	}
	fetch(): void {
		let id = this.get("id");
		if (typeof id !== "number") throw new Error("Cannot fetch user.");
		this.sync.fetch(id).then((res: AxiosResponse): void => {
			this.set(res.data);
		});
	}
	save(): void {
		this.sync
			.save(this.attributes.getAll())
			.then((res: AxiosResponse): void => {
				this.trigger("save");
			})
			.catch((): void => this.trigger("error"));
	}
}
