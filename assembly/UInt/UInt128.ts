import { u128 } from "as-bignum";
import {BIT_LENGTH, Bytes} from "../utils/Bytes";

/** Representation for a UInt128 value in the system. */
export class UInt128 {

    readonly value: u128;

    constructor (value: u128) {
        this.value = value;
    }

    /** Encodes the value as u8[] as per the SCALE codec specification */
    toU8a (): u8[] {
        const bytes = new Array<u8>();
        if (this.value < u128.fromU32(1 << 6)) { // if value < 1 << 6
            Bytes.appendUint<u8>(bytes, u8(this.value.as<u8>()) << 2, BIT_LENGTH.INT_8); // 1 byte
        } else if (this.value < u128.fromU32(1 << 14)) { // if value < 1 << 14
            Bytes.appendUint<u16>(bytes, u16(this.value.as<u16>() << 2) + 1, BIT_LENGTH.INT_16); // 2 bytes
        } else if (this.value < u128.fromU64(1 << 30)) { // if value < 1 << 30
            Bytes.appendUint<u32>(bytes, u32(this.value.as<u32>() << 2) + 2, BIT_LENGTH.INT_32); // 4 bytes
        } else {
            const valueInBytes = this.value.toBytes();
            Bytes.trimEmptyBytes(valueInBytes);

            const topSixBits: u8 = u8(valueInBytes.length - 4);
            const lengthByte: u8 = (topSixBits << 2) + 3;

            // Encode Mode and Bytes length
            bytes.push(lengthByte);
            // copy the u128 bytes
            Bytes.copy(valueInBytes, bytes, 1);
        }
        return bytes;
    }

    toString(): string {
        return this.value.toString();
    }

    /**
     * Instantiates new UInt128 from Low and High U64 Numbers
     * @param lo
     * @param hi
     */
    static fromLowHighValues(lo: u64, hi: u64): UInt128 {
        return new UInt128(new u128(lo, hi));
    }

    /** Instantiates new UInt128 from u8[] SCALE encoded bytes */
    static fromU8a(input: u8[]): UInt128 {
        if (input.length == 0) {
            // Todo: Refactor as exception handling is not recommended
            // Return null for errors
            throw new Error('Invalid input: Byte array should not be empty');
        }

        const mode = input[0] & 0x03;
        if (i32(mode) <= 2) {
            return UInt128.fromLowHighValues(u64(Bytes.decodeSmallInt(input, mode).value), 0);
        }

        const topSixBits = input[0] >> 2;
        const byteLength = topSixBits + 4;

        const value = input.slice(1, byteLength + 1);
        Bytes.reverse(value);
        Bytes.padBytesWithZeros(value, BIT_LENGTH.INT_128);

        return new UInt128(u128.fromBytesBE(value));
    }
}
