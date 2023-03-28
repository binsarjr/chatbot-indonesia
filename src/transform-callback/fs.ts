import fs from "fs"

export const readFile = async (filepath: string, encoding: string = ''): Promise<string> => {
	return new Promise((resolve, reject) => {
		// @ts-ignore
		fs.readFile(filepath, encoding, (err, data) => {
			if (err) return reject(err)
			resolve(data)
		})
	})
}

export const lstat = async (filename: string): Promise<any> => {
	return new Promise((resolve, reject) => {
		fs.lstat(filename, (err, stats) => {
			if (err) return reject(err)
			return resolve(stats)
		})
	})
}

export const readdir = async (folderPath: string): Promise<string[]> => {
	return new Promise((resolve, reject) => {
		fs.readdir(folderPath, (err, files) => {
			if (err) return reject(err)
			return resolve(files)
		})
	})
}