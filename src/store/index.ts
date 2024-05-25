import { configureStore, type Middleware } from "@reduxjs/toolkit";
import { toast } from "sonner";
import usersReducer, { rollbackUser } from "./users/slice";

const persistanceMiddleware: Middleware = (store) => (next) => (action) => {
	next(action);
	localStorage.setItem("__redux__state", JSON.stringify(store.getState()));
};

const syncWithDatabaseMiddleware: Middleware =
	(store) => (next) => (action) => {
		console.log({ action, state: store.getState() });

		const { type, payload } = action;
		const prevState = store.getState();
		next(action);

		if (type === "users/deleteUserById") {
			//uso mi prev state porque aca ya paso la accion
			const userToBeDeleted = prevState.users.find(
				(user) => user.id === payload,
			);

			fetch(`https://jsonplaceholder.typicode.com/users/${payload}`, {
				method: "get",
			})
				.then((res) => {
					if (res.ok) {
						return toast.success("eliminado correctament");
					}
					throw new Error("could not be deleted");
				})
				.catch((err) => {
					toast.error(`Error deleting user ${userToBeDeleted.name}`);
					if (userToBeDeleted) store.dispatch(rollbackUser(userToBeDeleted));
				});
		}
	};

export const store = configureStore({
	reducer: {
		users: usersReducer,
	},
	middleware: () => [persistanceMiddleware, syncWithDatabaseMiddleware],
});

//this line solves the ts issue that says that it does not know what type is in ListOfUsers.tsx
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
