import { Toaster } from "sonner";
import "./App.css";
import Example from "./components/CreateNewUser";
import { ListOfUsers } from "./components/ListOfUsers";

function App() {
	return (
		<>
			<ListOfUsers />
			<Example />
			<Toaster richColors />
		</>
	);
}

export default App;
