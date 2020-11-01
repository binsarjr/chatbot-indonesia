import fs from "fs";
import path from "path";


const Recursive = require("recursive-readdir");


export class Filesystem {
	public async getFiles(folderPath: string, modeRecursive: boolean = true) {
		if (modeRecursive) {
			return await Recursive(folderPath)
		} else {
			let files = fs.readdirSync(folderPath).map(dir => {
				if (fs.lstatSync(path.join(folderPath, dir)).isFile()) {
					return path.join(folderPath, dir)
				}
			})
			files = files.filter(el => el != null)
			return files
		}
	}
}