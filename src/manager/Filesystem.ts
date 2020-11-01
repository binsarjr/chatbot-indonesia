import fs from "fs";
import path from "path";


const Recursive = require("recursive-readdir");

const lstat = async (filename: string): Promise<any> => {
	return new Promise((resolve, reject) => {
		fs.lstat(filename, (err, stats) => {
			if (err) return reject(err)
			return resolve(stats)
		})
	})
}

const readdir = async (folderPath: string): Promise<string[]> => {
	return new Promise((resolve, reject) => {
		fs.readdir(folderPath, (err, files) => {
			if (err) return reject(err)
			return resolve(files)
		})
	})
}


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