// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as path from 'path';
import * as vscode from 'vscode';


import { IRegister } from "./DATracker";

class ColorsViewProvider implements vscode.WebviewViewProvider {

	public static readonly viewType = 'debugRegisters';

	private _view?: vscode.WebviewView;

	constructor(
		private readonly _extensionUri: vscode.Uri,
		private _onDidRegister: vscode.Event<IRegister[]>
	) {
		this._onDidRegister(this.testEvent.bind(this));
	}

	private testEvent(reg: IRegister[]) {
		console.log("[TEST EVENT]", reg);
		if (this._view) {
			this._view.webview.postMessage({type: "update", data: reg});
			console.log("post");
		}
	}

	public resolveWebviewView(
		webviewView: vscode.WebviewView,
		context: vscode.WebviewViewResolveContext,
		_token: vscode.CancellationToken,
	) {
		this._view = webviewView;

		this._view.webview.postMessage({type: "test", data: "kkt!"});

		webviewView.webview.options = {
			// Allow scripts in the webview
			enableScripts: true,

			localResourceRoots: [
				this._extensionUri
			]
		};

		webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

		console.log(webviewView);

		// webviewView.webview.onDidReceiveMessage(data => {
		// 	switch (data.type) {
		// 		case 'colorSelected':
		// 			{
		// 				vscode.window.activeTextEditor?.insertSnippet(new vscode.SnippetString(`#${data.value}`));
		// 				break;
		// 			}
		// 	}
		// });
	}


	/* public addColor() {
		if (this._view) {
			this._view.show?.(true); // `show` is not implemented in 1.49 but is for 1.50 insiders
			this._view.webview.postMessage({ type: 'addColor' });
		}
	}

	public clearColors() {
		if (this._view) {
			this._view.webview.postMessage({ type: 'clearColors' });
		}
	} */

	private _getHtmlForWebview(webview: vscode.Webview) {
		// Get the local path to main script run in the webview, then convert it to a uri we can use in the webview.
		// const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'main.js'));

		// Do the same for the stylesheet.
		// const styleResetUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'reset.css'));
		// const styleVSCodeUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'vscode.css'));
		// const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'main.css'));


		// eslint-disable-next-line @typescript-eslint/no-var-requires
		const manifest = require(path.join(this._extensionUri.path, 'view', 'build', 'asset-manifest.json'));
		const mainScript = manifest["files"]['main.js'];
		console.log("[TEST] ", mainScript);
		const mainStyle = manifest["files"]['main.css'];
		console.log("[TEST] ", mainStyle);
// 
		const scriptPathOnDisk = vscode.Uri.file(path.join(this._extensionUri.path, 'view', 'build', mainScript));
		const scriptUri = scriptPathOnDisk.with({ scheme: 'vscode-resource' });
		console.log("TEST -- ", scriptUri);
		const stylePathOnDisk = vscode.Uri.file(path.join(this._extensionUri.path, 'view', 'build', mainStyle));
		const styleUri = stylePathOnDisk.with({ scheme: 'vscode-resource' });
		console.log("TEST -- ", styleUri);

		// Use a nonce to only allow a specific script to be run.
		const nonce = getNonce();

		console.log("[NONCE IDK]", nonce);

		return `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta name="theme-color" content="#000000" />
			<meta
			name="description"
			content="Web site created using create-react-app"
			/>
			<link rel="stylesheet" type="text/css" href="${styleUri}">
			<title>React App</title>
		</head>
		<body>
			<noscript>You need to enable JavaScript to run this app.</noscript>
			<div id="root">test</div>
			<script nonce="${nonce}" src="${scriptUri}"></script>
		</body>
		</html>
		`;

		/* return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
				<meta name="theme-color" content="#000000">
				<title>React App</title>
				<link rel="stylesheet" type="text/css" href="${styleUri}">
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src vscode-resource: https:; script-src 'nonce-${nonce}';style-src vscode-resource: 'unsafe-inline' http: https: data:;">
			</head>
			<body>
			<div class="container">
				<div class="reg" id="reg-eax">
					<h3>Accumulator</h3>
					<div class="split">
						<div class="frame">
							<div class="center">
								<span>0x00000000</span>
							</div>
						</div>
						<div class="reg-name"><div class="reg-name-align">EAX</div></div>
					</div>
					<div class="split">
						<div class="fill"></div>
						<div class="frame">
							<div class="center">
								<span>0x0000</span>
							</div>
						</div>
						<div class="reg-name"><div class="reg-name-align">AX</div></div>
					</div>
					<div class="split">
						<div class="fill"></div>
						<div class="fill"></div>
						<div class="frame">
							<div class="center">
								<!-- <span class="reg-name">AH</span> --><span>0x00</span>
							</div>
						</div>
						<div class="frame">
							<div class="center">
								<!--  --><span>0x00</span>
							</div>
						</div>
						<div class="reg-name"><div class="reg-name-align">AH, AL</div></div>
					</div>
					
				</div>
				<div class="reg" id="reg-ecx">
					<h3>Counter</h3>
					<div class="split">
						<div class="frame">
							<div class="center">
								<span>0x00000000</span>
							</div>
						</div>
						<div class="reg-name"><div class="reg-name-align">ECX</div></div>
					</div>
					<div class="split">
						<div class="fill"></div>
						<div class="frame">
							<div class="center">
								<span>0x0000</span>
							</div>
						</div>
						<div class="reg-name"><div class="reg-name-align">CX</div></div>
					</div>
					<div class="split">
						<div class="fill"></div>
						<div class="fill"></div>
						<div class="frame">
							<div class="center">
								<!-- <span class="reg-name">AH</span> --><span>0x00</span>
							</div>
						</div>
						<div class="frame">
							<div class="center">
								<!--  --><span>0x00</span>
							</div>
						</div>
						<div class="reg-name"><div class="reg-name-align">CH, CL</div></div>
					</div>
				</div>
				<div class="reg" id="reg-edx">
					<h3>Data</h3>
					<div class="split">
						<div class="frame">
							<div class="center">
								<span>0x00000000</span>
							</div>
						</div>
						<div class="reg-name"><div class="reg-name-align">EDX</div></div>
					</div>
					<div class="split">
						<div class="fill"></div>
						<div class="frame">
							<div class="center">
								<span>0x0000</span>
							</div>
						</div>
						<div class="reg-name"><div class="reg-name-align">DX</div></div>
					</div>
					<div class="split">
						<div class="fill"></div>
						<div class="fill"></div>
						<div class="frame">
							<div class="center">
								<!-- <span class="reg-name">AH</span> --><span>0x00</span>
							</div>
						</div>
						<div class="frame">
							<div class="center">
								<!--  --><span>0x00</span>
							</div>
						</div>
						<div class="reg-name"><div class="reg-name-align">DH, DL</div></div>
					</div>
				</div>
				<div class="reg" id="reg-ebx">
					<h3>Base</h3>
					<div class="split">
						<div class="frame">
							<div class="center">
								<span>0x00000000</span>
							</div>
						</div>
						<div class="reg-name"><div class="reg-name-align">EBX</div></div>
					</div>
					<div class="split">
						<div class="fill"></div>
						<div class="frame">
							<div class="center">
								<span>0x0000</span>
							</div>
						</div>
						<div class="reg-name"><div class="reg-name-align">BX</div></div>
					</div>
					<div class="split">
						<div class="fill"></div>
						<div class="fill"></div>
						<div class="frame">
							<div class="center">
								<!-- <span class="reg-name">AH</span> --><span>0x00</span>
							</div>
						</div>
						<div class="frame">
							<div class="center">
								<!--  --><span>0x00</span>
							</div>
						</div>
						<div class="reg-name"><div class="reg-name-align">BH, BL</div></div>
					</div>
				</div>
				<div class="reg" id="reg-esp">
					<h3>Stack Pointer</h3>
					<div class="split">
						<div class="frame">
							<div class="center">
								<span>0x00000000</span>
							</div>
						</div>
						<div class="reg-name"><div class="reg-name-align">ESP</div></div>
					</div>
					<div class="split">
						<div class="fill"></div>
						<div class="frame">
							<div class="center">
								<span>0x0000</span>
							</div>
						</div>
						<div class="reg-name"><div class="reg-name-align">SP</div></div>
					</div>
				</div>
				<div class="reg" id="reg-ebp">
					<h3>Stack Base Pointer</h3>
					<div class="split">
						<div class="frame">
							<div class="center">
								<span>0x00000000</span>
							</div>
						</div>
						<div class="reg-name"><div class="reg-name-align">EBP</div></div>
					</div>
					<div class="split">
						<div class="fill"></div>
						<div class="frame">
							<div class="center">
								<span>0x0000</span>
							</div>
						</div>
						<div class="reg-name"><div class="reg-name-align">BP</div></div>
					</div>
				</div>
				<div class="reg" id="reg-esi">
					<h3>Source</h3>
					<div class="split">
						<div class="frame">
							<div class="center">
								<span>0x00000000</span>
							</div>
						</div>
						<div class="reg-name"><div class="reg-name-align">ESI</div></div>
					</div>
					<div class="split">
						<div class="fill"></div>
						<div class="frame">
							<div class="center">
								<span>0x0000</span>
							</div>
						</div>
						<div class="reg-name"><div class="reg-name-align">SI</div></div>
					</div>
				</div>
				<div class="reg" id="reg-edi">
					<h3>Destination</h3>
					<div class="split">
						<div class="frame">
							<div class="center">
								<span>0x00000000</span>
							</div>
						</div>
						<div class="reg-name"><div class="reg-name-align">EDI</div></div>
					</div>
					<div class="split">
						<div class="fill"></div>
						<div class="frame">
							<div class="center">
								<span>0x0000</span>
							</div>
						</div>
						<div class="reg-name"><div class="reg-name-align">DI</div></div>
					</div>
				</div>
			</div>

				<script nonce="${nonce}" src="${scriptUri}"></script>
			</body>
			</html>`; */
	}
}

function getNonce() {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}




import { NASMDebugAdapterTracker, NASMAdapterTrackerFactory } from './DATracker';


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "helloworld-sample" is now active!');

	vscode.debug.onDidChangeActiveDebugSession(() => {
		console.log("Debugger event!");
	});

	vscode.debug.onDidReceiveDebugSessionCustomEvent(() => {
		console.log("Debugger custom event!");
	});

	vscode.debug.onDidStartDebugSession(async () => {
		console.log("Debugger start session event!");
		/* const session = vscode.debug.activeDebugSession;
		const response = await session?.customRequest('evaluate', { expression: 'Registers'});
		const registers = response.result;
		console.log("Regs: ", registers); */
	});

	vscode.debug.onDidTerminateDebugSession(() => {
		console.log("Debugger terminate session event!");
	});

	vscode.debug.onDidChangeBreakpoints(() => {
		console.log("Debugger onDidChangeBreakpoints!");
	});


	const fac = new NASMAdapterTrackerFactory();
	vscode.debug.registerDebugAdapterTrackerFactory('cppdbg', fac);

	const provider = new ColorsViewProvider(context.extensionUri, fac.DATracker.onDidChangeRegister);
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(ColorsViewProvider.viewType, provider));

	// context.subscriptions.push()

	// const debugRegisters = new DebugRegisters();
	// vscode.window.registerTreeDataProvider('debugRegisters', debugRegisters);

	/* const provider = new ColorsViewProvider(context.extensionUri);
	// provider.addColor();
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(ColorsViewProvider.viewType, provider));

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World!');
	}); */

	

	// context.subscriptions.push(disposable);
}
