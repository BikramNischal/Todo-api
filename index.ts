import { createServer } from "node:http";
import url from "url";

import DataSource from "./data/datasource";
import routes from "./routes/routes";

const hostname = "127.0.0.1";
const port = 3000;

const server = createServer((req, res) => {
	const parsedUrl = url.parse(req.url as string, true);
	const query = parsedUrl.query;
	const path: string = parsedUrl.path as string;
	const basePath = path.includes("?")
		? path.substring(0, path.indexOf("?"))
		: path;
	const method = req.method as string;

	const handler = routes[basePath] && routes[basePath][method];
	if (handler) {
		handler(req, res, query);
	}
	// if (req.url === "/" || req.url === "/home") {
	// }
	// else {
	//     console.log(`Request to url : ${req.url} Not Found \n Path: ${path} \n Method : ${method}`)
	//     res.statusCode = 404;
	//     res.setHeader("Content-Type", "text/plane");
	//     res.end("Page Not Found!");
	// }
});

server.listen(port, hostname, () => {
	console.log(`Server listening to http://${hostname}:${port}`);
});
