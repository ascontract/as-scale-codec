// Copyright 2020 LimeChain Ltd.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Hash } from "../Hash";

describe("Hash", () => {

    it("should encode hash", () => {
        let hash: Hash = new Hash([0xff]);
        expect<Array<u8>>(hash.toU8a()).toStrictEqual([0xff, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);

        hash = new Hash([0xff, 0x00, 0xab]);
        expect<Array<u8>>(hash.toU8a()).toStrictEqual([0xff, 0x00, 0xab, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);

        hash = new Hash([0xff, 0x00, 0xab, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
        expect<Array<u8>>(hash.toU8a()).toStrictEqual([0xff, 0x00, 0xab, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);

        const longHash: Hash = new Hash([0xff, 0x00, 0xab, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff]);
        expect<i32>(longHash.values.length).toStrictEqual(32);
        expect<Array<u8>>(longHash.toU8a()).toStrictEqual([0xff, 0x00, 0xab, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
    });

    it("should decode hash", () => {
        let hash: Hash = Hash.fromU8a([0xff]);
        const expected: Array<u8> = [0xff, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00];

        expect<i32>(hash.values.length).toStrictEqual(32);
        expect<Hash>(hash).toStrictEqual(new Hash(expected));

        hash = Hash.fromU8a([0xff, 0x00, 0xab]);
        expect<Hash>(hash).toStrictEqual(new Hash([0xff, 0x00, 0xab, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]));

        hash = Hash.fromU8a([0xff, 0x00, 0xab, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
        expect<Hash>(hash).toStrictEqual(new Hash([0xff, 0x00, 0xab, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]));

        const longHash: Hash = Hash.fromU8a([0xff, 0x00, 0xab, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff]);
        expect<i32>(longHash.values.length).toStrictEqual(32);
        expect<Hash>(longHash).toStrictEqual(new Hash([0xff, 0x00, 0xab, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]));
    });

    it("should decode using populate method", () => {
        const instance = new Hash();
        instance.populateFromBytes([1, 12, 12, 12, 1, 1, 1, 0, 0, 0, 1, 12, 123, 123, 11, 123, 33, 121]);
        expect<Hash>(instance).toStrictEqual(new Hash([1, 12, 12, 12, 1, 1, 1, 0, 0, 0, 1, 12, 123, 123, 11, 123, 33, 121, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
        instance.populateFromBytes([0xff, 0x00, 0xab]);
        expect<Hash>(instance).toStrictEqual(new Hash([0xff, 0x00, 0xab, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]));
    });

    it("should convert bytes to hash", () => {
        let hash: Hash = Hash.bytesToHash([0xff]);

        expect<i32>(hash.values.length).toStrictEqual(32);
        expect<Hash>(hash).toStrictEqual(new Hash([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff]));

        hash = Hash.bytesToHash([0xff, 0x00, 0xab]);
        expect<Hash>(hash).toStrictEqual(new Hash([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0x00, 0xab]));

        hash = Hash.bytesToHash([0xff, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
        expect<Hash>(hash).toStrictEqual(new Hash([0xff, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]));
    });

    it("should return hex representation of a hash", () => {
        let hash: Hash = new Hash([0xff]);
        expect<string>(hash.toString()).toStrictEqual('0x2550000000000000000000000000000000');

        hash = new Hash([0xff, 0x00, 0xff]);
        expect<string>(hash.toString()).toStrictEqual('0x255025500000000000000000000000000000');

        hash = new Hash([0xff, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff]);
        expect<string>(hash.toString()).toStrictEqual('0x255000000000000000000000000000000255');
    });

    it("equals should work", () => {
        let hash: Hash = new Hash([0xff]);
        let hash2: Hash = new Hash([0xff]);

        assert(hash == hash2, "hashes are not equal")
    })

    it("should not be equal when hashes are different", () => {
        let hash1: Hash = new Hash([0x01]);
        let hash2: Hash = new Hash([0xff]);

        assert(hash1 != hash2, "hashes should be different");
    })

    itThrows('should throw when index is out of range', () => {
        Hash.fromU8a([8, 0, 1, 12, 0, 1, 12], 8);
    });
});
