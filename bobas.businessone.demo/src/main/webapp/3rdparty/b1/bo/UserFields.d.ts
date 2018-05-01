/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../Data.d.ts" />
declare namespace sap {
    export namespace b1 {
        export interface UserFields {
            fields: Fields[];
        }


        export interface Fields {
            defaultValue: string;
            description: string;
            fieldID: number;
            linkedTable: string;
            mandatory: number;
            name: string;
            size: number;
            subType: number;
            table: string;
            type: number;
            validValue: string;
            validValues: ValidValues[];
            value: any;
        }

        export interface ValidValues {
            description: string;
            value: string;
        }

    }
}
