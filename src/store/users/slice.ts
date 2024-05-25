import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type UserId = string;

export interface User {
	name: string;
	email: string;
	github: string;
}

export interface UserWithId extends User {
	id: UserId;
}

const DEFAULT_STATE = [
	{
		name: "John Doe",
		email: "john.doe@example.com",
		github: "midudev",
		id: "12345",
	},
	{
		name: "Jane Smith",
		email: "jane.smith@example.com",
		github: "janesmith",
		id: "54321",
	},
	{
		name: "Alice Johnson",
		email: "alice.johnson@example.com",
		github: "alicej",
		id: "98765",
	},
	{
		name: "Bob Williams",
		email: ["bob.williams@primary.com", "bob.williams@secondary.com"],
		github: "bwilliams",
		id: "abc123",
	},
	{
		name: "Emily Jones",
		email: "emily.jones@example.com",
		github: "emilyj",
		id: "def456",
	},
];

const initialState: UserWithId[] = (() => {
	const persistedState = localStorage.getItem("__redux__state");
	if (persistedState) {
		return JSON.parse(persistedState).users;
	}
	return DEFAULT_STATE;
})();

export const userSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		addNewUser: (state, action: PayloadAction<User>) => {
			const id = crypto.randomUUID();
			return [...state, { id, ...action.payload }];
		},
		deleteUserById: (state, action: PayloadAction<UserId>) => {
			const id = action.payload;
			return state.filter((user) => user.id !== id);
		},
		rollbackUser: (state, action: PayloadAction<UserWithId>) => {
			const isRollBackedAlready = state.some(
				(user) => user.id === action.payload.id,
			);
			if (!isRollBackedAlready) {
				state.push(action.payload);
			}
		},
	},
});

export default userSlice.reducer;

export const { deleteUserById, addNewUser, rollbackUser } = userSlice.actions;
