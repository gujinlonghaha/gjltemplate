const vscode = require('vscode');
const fs = require('fs')
const path = require('path')

const findDir = (filePath) => {
	if (fs.statSync(filePath).isFile()) {
		return path.dirname(filePath);
	}

	return filePath;
};

let generatePage = (file) => {
	vscode.window
		.showInputBox({
			value: "",
			prompt: "page name",
			ignoreFocusOut: true,
			valueSelection: [-1, -1],
		})
		.then((name) => {
			if (!name) {
				return;
			}
			const dir = findDir(file.fsPath);
			const targetPath = path.join(dir);
			fs.readFile(path.resolve(__dirname, './template/page.txt'), 'utf8', (err, data) => {
				if (err) {
					console.error(err)
					return
				}
				let moduleFile = data.replace(/{componentName}/g, name)
				fs.writeFile(`${targetPath}/${name}.vue`, moduleFile, err => {
					if (err) {
						console.error(err)
						return
					}
					//文件写入成功。
				})
			})
		});
};

let generateService = (file) => {
	vscode.window
		.showInputBox({
			value: "",
			prompt: "service name",
			ignoreFocusOut: true,
			valueSelection: [-1, -1],
		})
		.then((name) => {
			if (!name) {
				return;
			}
			const dir = findDir(file.fsPath);
			const targetPath = path.join(dir);
			fs.readFile(path.resolve(__dirname, './template/api.txt'), 'utf8', (err, data) => {
				if (err) {
					console.error(err)
					return
				}
				let moduleFile = data.replace(/{componentName}/g, name)
				fs.writeFile(`${targetPath}/${name}.js`, moduleFile, err => {
					if (err) {
						console.error(err)
						return
					}
					//文件写入成功。
				})
			})
		});
};

let generateModule = (file) => {
	vscode.window
		.showInputBox({
			value: "",
			prompt: "module name",
			ignoreFocusOut: true,
			valueSelection: [-1, -1],
		})
		.then((name) => {
			if (!name) {
				return;
			}
			const dir = findDir(file.fsPath);
			const targetPath = path.join(dir);
			fs.readFile(path.resolve(__dirname, './template/compontent.txt'), 'utf8', (err, data) => {
				if (err) {
					console.error(err)
					return
				}
				let moduleFile = data.replace(/{componentName}/g, name)
				fs.writeFile(`${targetPath}/${name}.vue`, moduleFile, err => {
					if (err) {
						console.error(err)
						return
					}
					//文件写入成功。
				})
			})
		});
}; 


/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('gjl-template.page', generatePage));
	context.subscriptions.push(vscode.commands.registerCommand('gjl-template.api', generateService));
	context.subscriptions.push(vscode.commands.registerCommand('gjl-template.compontent', generateModule));
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
