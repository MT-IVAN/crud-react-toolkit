import {
	addNewUser,
	deleteUserById,
	type User,
	type UserId,
} from "../store/users/slice";
import { useAppDispatch } from "./store";

export const useUserActions = () => {
	const dispatch = useAppDispatch();

	const removeUser = (id: UserId) => {
		dispatch(deleteUserById(id));
	};

	const addUser = (user: User) => {
		dispatch(addNewUser(user));
	};
	return { removeUser, addUser };
};
