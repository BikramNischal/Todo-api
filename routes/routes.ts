import { IncomingMessage, ServerResponse } from "node:http";
import DataSource from "../data/datasource";
import TodoController from "../controllers/todocontroller";
import { ParsedUrlQuery } from "node:querystring";

type Action = (
	req: IncomingMessage,
	res: ServerResponse,
	query: ParsedUrlQuery
) => void;

interface Method {
	[method: string]: Action;
}

interface Routes {
	[path: string]: Method;
}

const routes: Routes = {
	"/": {
		GET: TodoController.todoList,
	},
	"/detail": {
		GET: TodoController.todoDetails,
	},
    "/add":{
        POST: TodoController.addTodo,
		// post body data must be in Todo data format
    },
	"/delete":{
		DELETE:TodoController.deleteTodo, 
	},
	"/complete":{
		GET: TodoController.completeTodo,
	}
};

export default routes;
