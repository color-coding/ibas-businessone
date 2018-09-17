/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace sap {
    export namespace b1 {
        export interface IUserFields {
            fields: IField[];
        }


        export interface IField {
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
            validValues: IValidValue[];
            value: any;
        }

        export interface IValidValue {
            description: string;
            value: string;
        }
    }
}
