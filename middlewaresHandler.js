import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const middlewareDir = path.join(__dirname, 'midlewares');

const importMiddlewares = async () => {
	const middlewareFiles = await fs.promises.readdir(middlewareDir);
	const middlewareArray = [];

	for (const file of middlewareFiles) {
		console.log(`./midlewares/${file}`);
		const middleware = await import(`./midlewares/${file}`);
		middlewareArray.push(middleware.default);
		console.log(middlewareArray);
	}

	return middlewareArray;
};

export default importMiddlewares;
