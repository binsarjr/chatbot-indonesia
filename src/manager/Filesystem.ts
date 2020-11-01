import { lstat, readdir } from "../transform-callback/fs";
import path from "path";


const Recursive = require("recursive-readdir");




export class Filesystem {
	public async getFiles(folderPath: string, modeRecursive: boolean = true) {
		if (modeRecursive) {
			return await Recursive(folderPath)
		} else {
			let files = await readdir(folderPath)
			files = await <Promise<string[]>>Promise.all(files.map(async file => {
				let stat = await lstat(path.join(folderPath, file))
				if (stat.isFile()) return path.join(folderPath, file)
				else return null
			}))
			files = files.filter(el => el != null)
			return files
		}
	}
}