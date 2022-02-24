/* eslint-disable no-undef */
(() => {
	const vscode = acquireVsCodeApi();

	const oldState = vscode.getState() || { colors: [] };

	const e = document.getElementById("test");
	// e.innerHTML = JSON.stringify("test");

	console.log("[main] idk from main.js");
	window.addEventListener('message', event => {
		const message = event.data; // The json data that the extension sent
		// e.innerHTML = JSON.stringify(message);
		// e.innerHTML(JSON.stringify(event));
		switch (message.type) {
			case 'test':
				{
					test(message.data);
					break;
				}
		}
	});

	const test = (a) => {
		// const e = document.getElementById("test");
		e.innerHTML = JSON.stringify("test");
		// console.log("idk from main.js");
	};
})();