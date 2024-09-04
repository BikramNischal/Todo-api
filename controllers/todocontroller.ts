import { IncomingMessage, ServerResponse } from "node:http";
import DataSource from "../data/datasource";
import { ParsedUrlQuery } from "node:querystring";

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
        let body:any = [];
        req.on("data", chunk => {
            body.push(chunk);
        }).on("end", () => {
            console.log(JSON.parse(Buffer.concat(body).toString()));
        })
    }
}
