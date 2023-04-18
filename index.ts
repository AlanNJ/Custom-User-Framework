import { User } from "./Models/User";

const user = new User({ name: "Anj", age: 5, id: 1 });

user.on("save", () => {
	console.log("User was saved");
});
user.save();
console.log(user);
