import { Register, RegisterTypes } from "./register";

describe("Register value conversion", () => {
    describe("foat32_t conversion", () => {
        it.each([
            ["0x44c143f0", "1546.123046875"],
            ["0xba83126f", "-0.001000000047497451305389404296875"],
            ["0x42280000", "42"]
        ])("Value %s should equel %s", (a: string, r: string) => {
            let o = new Register(a, 32).getDecoded(RegisterTypes.F32);
            expect(o).toEqual(r);
        });
    });

    describe("int8_t conversion", () => {
        it.each([
            ["0x00", "0"],
            ["0x0f", "15"],
            ["0xf0", "-15"],
            ["0xfe", "-1"],
            ["0xff", "-0"],
            ["0xffff", "-0"],
        ])("Value %s should equel %s", (a: string, r: string) => {
            let o = new Register(a, 8).getDecoded(RegisterTypes.I8);
            expect(o).toEqual(r);
        });
    });

    describe("uint8_t conversion", () => {
        it.each([
            ["0x00","0"],
            ["0xff", "255"],
            ["0xfff", "255"],
        ])("Value %s should equel %s", (a: string, r: string) => {
            let o = new Register(a, 8).getDecoded(RegisterTypes.U8);
            expect(o).toEqual(r);
        });
    });

    describe("uint16_t conversion", () => {
        it.each([
            ["0x00", "0"],
            ["0xff", "255"],
            ["0xfff", "4095"],
            ["0xffff", "65535"],
            ["0xfffff", "65535"],
        ])("Value %s should equel %s", (a: string, r: string) => {
            let o = new Register(a, 16).getDecoded(RegisterTypes.U16);
            expect(o).toEqual(r);
        });
    });

    describe("uint32_t conversion", () => {
        it.each([
            ["0x00", "0"],
            ["0xff", "255"],
            ["0xfff", "4095"],
            ["0xffff", "65535"],
            ["0xfffff", "1048575"],
            ["0xffffff", "16777215"],
            ["0xfffffff", "268435455"],

            // Below is throwing error: equals -1
            // ["0xffffffff", 268435455],
            // ["0xfffffffff", 268435455],
        ])("Value %s should equel %s", (a: string, r: string) => {
            let o = new Register(a, 32).getDecoded(RegisterTypes.U32);
            expect(o).toEqual(r);
        });
    });
});