import axios, { AxiosPromise } from "axios";
import { UserData } from "./User";
interface hasId {
	id?: number;
}

export class Sync<T extends hasId> {
	constructor(public rootUrl: string) {}
	fetch(id: number): AxiosPromise {
		// axios.get(`${this.rootUrl}/${this.get("id")}`).then((res) => {
		// 	console.log(res.data);
		// });
		return axios.get(`${this.rootUrl}/${id}`);
	}
	save(data: T): AxiosPromise {
		let { id } = data;
		if (id) {
			return axios.put(`${this.rootUrl}/${id}`, data);
		} else {
			id;
			return axios.post(this.rootUrl, data);
		}
	}
}
