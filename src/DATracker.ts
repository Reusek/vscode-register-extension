/* eslint-disable no-case-declarations */
import * as vscode from "vscode";
import { DebugProtocol } from 'vscode-debugprotocol';
import { DebugAdapterTrackerFactory, DebugAdapterTracker } from 'vscode';

// TODO: Add all registers.
export type TRegisterName = "EAX" | "EBX" | "EFLAGS";

export interface IRegister {
	name: string,
	value: string
}

export class NASMDebugAdapterTracker implements DebugAdapterTracker {
	private regsName = ["eax", "acx", "adx", "abx", "asp", "asi", "adi", "aip", "eflags"];

	private scopes: DebugProtocol.Scope[] = [];
	private cpuVariable?: DebugProtocol.Variable;
	private regsVariables: DebugProtocol.Variable[] = [];

	private registers: IRegister[] = [];

	public onDidChangeRegisterEmitter = new vscode.EventEmitter<IRegister[]>();
	public readonly onDidChangeRegister: vscode.Event<IRegister[]> = this.onDidChangeRegisterEmitter.event;

	onWillStartSession?(): void {
		console.log('onWillStartSession called');
	}

	onWillReceiveMessage?(message: any): void {
		// console.log('[TX]', message);
		const msg = message as DebugProtocol.Request;
		// console.log(msg);
		if (msg.command == 'variables') {
			console.log('[TX VAR]', msg);
		} else if (msg.command == 'scopes') {
			console.log('[TX SCP]', msg);
		} else {
			console.log('[TX    ]', msg);
		}
	}

	onDidSendMessage?(_msg: any): void {
		const message = _msg as DebugProtocol.ProtocolMessage;
		if (!message) {
			console.log('?arg is not a DebugProtocol.ProtocolMessage type?');
			return;
		}
		switch (message.type) {
			case 'event':
				this.handleEvent(message as DebugProtocol.Event);
				this.updateRegisters();
				break;
			case 'response':
				this.handleResponse(message as DebugProtocol.Response);
				break;
			default:
				console.log("Unhandled Message type " + message.type);
				break;
		}
		// console.log('[RX]', _msg);
	}

	onWillStopSession?(): void {
		console.log('onWillStopSession called');
	}


	async handleResponse(res?: DebugProtocol.Response) : Promise<void> {
		if (!res)
			return;

		switch (res.command) {
			case 'scopes':
				// this.updateScopes(res as DebugProtocol.ScopesResponse);
				// this.loadVariables(1001);
				console.log('[RX SCP]', res);
				const a = await this.loadVariables(1001);
				console.log('[SCP   ]', a);
				const b = await this.loadVariables(1002);
				console.log('[SCP   ]', b);
				if (b?.variables?.length > 0) {
					const regs : IRegister[] = b.variables.map((e: any) => {return {name: e.name, value: e.value};});
					this.onDidChangeRegisterEmitter.fire(regs);
				}
				break;
			case 'variables':
				console.log('[RX VAR]', res);
				// this.updateVariables(res as DebugProtocol.VariablesResponse);
				break;
			default:
				// console.log("[RESPONSE] Unknown command " + res.command);
				break;
		}
	}

	private handleEvent(ev?: DebugProtocol.Event) : void {
		if (!ev)
			return;

		switch (ev.event) {
			case 'stopped':
				// this.updateRegisters();
				// this.updateScopes();
				break;
			case 'output':
			case 'continued':
			case 'initialized':
			case 'breakpoint':
			case 'thread':
			case 'terminated':
				// TODO: Do something with this, or not?!
				break;
			default:
				// console.log('Unhandled Event type ' + ev.event + ', ' + ev);
				break;
		}
	}

	/* async reqUpdateScopes() {

	} */

	private updateVariables(res: DebugProtocol.VariablesResponse) {
		if (!res)
			return;

		console.log("[UPDATE VARS]", res);

		const _cpuVar = res.body?.variables?.find(e => e.name === 'CPU');
		if (_cpuVar) {
			this.cpuVariable = _cpuVar;
			return;
		}

		const _regs = res.body?.variables?.filter(e => {
			this.regsName.includes(e.name);
		});
		if (!_regs)
			return;
		if (_regs.length > 0)
			this.regsVariables = _regs;

	}

	private async updateRegisters() {
		if (this.scopes.length > 0) {
			await this.loadVariables(1001);
			await this.loadVariables(1002);
		}
	}

	private async loadVariables(variablesReference: number) : Promise<any> {
		return await this.sendMsg('variables', { variablesReference });
		// console.log(a);
	}

	private updateScopes(res: DebugProtocol.ScopesResponse) {
		this.scopes = res.body.scopes;
	}

	private async  sendMsg(type: string, args?: any) : Promise<any> {
		// console.log("[TX MSG] " + type + " - " + JSON.stringify(args));
		return await vscode.debug.activeDebugSession?.customRequest(type, args);
	}
}

export class NASMAdapterTrackerFactory implements DebugAdapterTrackerFactory {
    public DATracker: NASMDebugAdapterTracker = new NASMDebugAdapterTracker();
    createDebugAdapterTracker(s: vscode.DebugSession): vscode.ProviderResult<vscode.DebugAdapterTracker> {
        return this.DATracker;
    }
}