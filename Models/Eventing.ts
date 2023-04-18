type Callback = () => void;
export class Eventing {
	events: { [key: string]: Callback[] } = {};
	on = (eventName: string, callBack: Callback): void => {
		const handler = this.events[eventName] || [];
		handler.push(callBack);
		this.events[eventName] = handler;
	};
	trigger = (eventName: string): void => {
		const handler = this.events[eventName];
		console.log(handler);
		if (!handler) return;
		handler.forEach((callback: Callback) => callback());
	};
}
