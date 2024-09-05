import { IncomingMessage, ServerResponse } from "node:http";
import DataSource from "../data/datasource";
import { ParsedUrlQuery } from "node:querystring";
import Todo from "../model/todo";

export default class TodoController {
	public static todoList(req: IncomingMessage, res: ServerResponse) {
		res.statusCode = 200;
		res.setHeader("Content-Type", "application/json");
		res.end(JSON.stringify(DataSource.read()));
	}

	public static todoDetails(
		req: IncomingMessage,
		res: ServerResponse,
		query: ParsedUrlQuery
	) {
		if (query.id) {
			const allData = DataSource.read();
			const todoId = parseInt(query.id as string);
			const data = allData.filter((todo) => todo.id === todoId);

			if (data.length) {
				res.statusCode = 200;
				res.setHeader("Content-Type", "plain/text");
				res.end(JSON.stringify(data[0]));
			} else {
			}
		} else {
			res.statusCode = 400;
			res.setHeader("Content-Type", "plain/text");
			const msg = Object.keys(query).length
				? `Unknow parameters: ${Object.keys(query).join(" ")}`
				: " No parameters provided";
			res.end(msg);
		}
	}

	public static addTodo(req: IncomingMessage, res: ServerResponse) {
		let body: any = [];
		req.on("data", (chunk) => {
			body.push(chunk);
		}).on("end", () => {
			const parsedBody:Todo = JSON.parse(Buffer.concat(body).toString());	
			DataSource.writeOne(parsedBody);
		});
		res.statusCode = 200;
		res.setHeader("Content-Type", "plain/text");
		res.end("Todo added!");
	}

	public static deleteTodo(req: IncomingMessage, res: ServerResponse, query: ParsedUrlQuery){
		if(query.id){
			const deleteId = parseInt(query.id as string);
			const fileData: Todo[]	= DataSource.read();
			const deleteData: Todo[] = fileData.filter((todo) => todo.id !== deleteId);
			DataSource.write(deleteData);

			res.statusCode = 200;
			res.setHeader("Content-Type", "plain/text");
			res.end(`Successfully Deleted Id: ${deleteId}`);
			
		} else {
			res.statusCode = 400;
			res.setHeader("Content-Type", "plain/text");
			const msg = Object.keys(query).length
				? `Unknow parameters: ${Object.keys(query).join(" ")}`
				: " No parameters provided";
			res.end(msg);

		}
	}

	public static completeTodo(req: IncomingMessage, res: ServerResponse, query: ParsedUrlQuery){
		const fileData = DataSource.read();
		const updateId = parseInt(query.id as string);
		let found = false;

		for(let index =0 ; index < fileData.length; ++index){
			if(fileData[index].id === updateId){
				fileData[index].completed = true;
				found = true;
				break;
			}
		}

		if(found){
			DataSource.write(fileData);
			res.statusCode = 200;
			res.setHeader("Content-Type" , "plain/text");
			res.end(`Completed Todo Id: ${updateId}`)
		} else {
			res.statusCode = 404;
			res.setHeader("Content-Type" , "plain/text");
			res.end(`Todo Id: ${updateId} Not Found!`);
		}

	}
}
