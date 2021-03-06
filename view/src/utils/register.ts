export enum RegisterTypes {
	U8,
	U16,
	U32,
	I8,
	I16,
	I32,
	F32,
	BITS,
	HEX,
}

export class Register {
	value: number;
	bits: number;

	constructor(raw: string, bits: number) {
		this.value = parseInt(raw, 16);
		this.bits = bits;
	}

	private convertToUInt(n: number, len: number) : number {
		let mask = (~0 >>> 32 - len);
		return (n & mask);
	}

	private convertToInt(n: number, len: number) : number {
		let sign_mask = 0x8 << (len / 2);
		let mask = (~0 >>> 32 - len);
		let sign = ((sign_mask & n) === sign_mask) ? -1 : 1;

		if ((sign_mask & n) === sign_mask) {
			return (~n & mask) * sign;
		} else {
			return (n & mask) * sign;
		}

	}

	/**
	 * Stolen from: https://gist.github.com/Jozo132/2c0fae763f5dc6635a6714bb741d152f
	 * @param Numbers
	 * @returns Float32
	 */
	private convertToFloat32(n: number) {
		var int = n;
		if (int > 0 || int < 0) {
			let sign = (int >>> 31) ? -1 : 1;
			let exp = (int >>> 23 & 0xff) - 127;
			let mantissa = ((int & 0x7fffff) + 0x800000).toString(2);
			let float32 = 0
			for (let i = 0; i < mantissa.length; i += 1) { float32 += parseInt(mantissa[i]) ? Math.pow(2, exp) : 0; exp-- }
			return float32 * sign;
		} else return 0
	}

	public get uint8_t() {
		return this.convertToUInt(this.value, 8);
	}

	public get uint16_t() {
		return this.convertToUInt(this.value, 16);
	}

	public get uint32_t() {
		return this.convertToUInt(this.value, 32);
	}

	public get int8_t() {
		return this.convertToInt(this.value, 8);
	}

	public get int16_t() {
		return this.convertToInt(this.value, 16);
	}

	public get int32_t() {
		return this.convertToInt(this.value, 32);
	}

	public get float32_t() {
		return this.convertToFloat32(this.value);
	}

	public get bin() {
		let v = this.value.toString(2);
		return Register.separate("0".repeat(this.bits - v.length) + v, 4);
	}

	public get hex() {
		let v = this.value.toString(16);
		 return Register.separate("0".repeat(((this.bits / 4)) - v.length) + v, 4);
	}

	static separate(s: string, len: number) : string {
		let ss = [];
		for (let i = 0; i < s.length; i = i + len) {
			ss.push(s.slice(i, i + len));
		}
		return ss.join("_");
	}

	/**
	 * Decode value as `d` type.
	 *
	 * @param d Register type.
	 * @returns Decoded value.
	 */
	public getDecoded(d: RegisterTypes) : string {
		switch (d) {
			case RegisterTypes.U8:
				return this.uint8_t.toString(10);
			case RegisterTypes.U16:
				return this.uint16_t.toString(10);
			case RegisterTypes.U32:
					return this.uint32_t.toString(10);
			case RegisterTypes.I8:
				return this.int8_t.toString(10);
			case RegisterTypes.I16:
				return this.int16_t.toString(10);
			case RegisterTypes.I32:
				return this.int32_t.toString(10);
			case RegisterTypes.F32:
				return this.float32_t.toString(10);
			case RegisterTypes.BITS:
				return this.bin;
			case RegisterTypes.HEX:
				return this.hex;
		}
	}
}

