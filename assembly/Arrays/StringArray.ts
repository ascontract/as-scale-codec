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

import { Bytes } from "../utils/Bytes";
import { AbstractArray } from "./AbstractArray";
import { ScaleString } from "../ScaleString";

import { DecodedData } from "../interfaces/DecodedData";
import { ArrayUtils } from "../utils/Arrays";
import { BytesReader, CompactInt } from "..";

// @ts-ignore
export class StringArray extends AbstractArray<ScaleString, string>{

    /**
    * @description BoolArray elements decryption implementation
    */
    public decodeElement (value: u8[]): DecodedData<string> {
        const stringLength = Bytes.decodeCompactInt(value);
        const encodedStringLength = i32(stringLength.decBytes + stringLength.value);

        return new DecodedData<string>(
            ScaleString.fromU8a(value.slice(0, encodedStringLength)).valueStr,
            encodedStringLength
        )
    }
    
    /**
     * @description Returns encoded byte length of the type
     */
    public encodedLength(): i32{
        let len: i32 = new CompactInt(this.values.length).encodedLength();
        for (let i: i32 = 0; i < this.values.length; i++){
            const value = new ScaleString(this.values[i]);
            len += value.encodedLength();
        }
        return len;
    }

    /**
     * @description Non-static constructor method used to populate defined properties of the model
     * @param bytes SCALE encoded bytes
     * @param index index to start decoding the bytes from
     */
    populateFromBytes(bytes: u8[], index: i32 = 0): void {
        const bytesReader = new BytesReader(bytes.slice(index));
        const data = bytesReader.readInto<CompactInt>();

        for(let i: i32 = 0; i < data.value; i++){
            const element: ScaleString = bytesReader.readInto<ScaleString>();
            this.values.push(element.valueStr);
        }
    }

    /**
    * @description Instantiates ScaleStringArray from u8[] SCALE encoded bytes (Decode)
    */
    static fromU8a (input: u8[]): StringArray {
        return AbstractArray.fromU8a<StringArray>(input);
    }


    @inline @operator('==')
    static eq(a: StringArray, b: StringArray): bool {
        return ArrayUtils.areEqual(a, b);
    }

    @inline @operator('!=')
    static notEq(a: StringArray, b: StringArray): bool {
        return !ArrayUtils.areEqual(a, b);
    }
}