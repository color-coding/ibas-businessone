/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="./3rdparty/ibas/index.d.ts" />
/// <reference path="./b1/index.ts" />
namespace businessone {
    /** 业务仓库 */
    export class BORepositoryDataInteraction extends ibas.BORepositoryApplication {
        /** 创建此模块的后端与前端数据的转换者 */
        protected createConverter(): ibas.IDataConverter {
            return new DataConverter;
        }
        /**
         * 查询 Items
         * @param fetcher 查询者
         */
        fetchItems(fetcher: ibas.IFetchCaller<sap.b1.IItems>): void {
            super.fetch("Items", fetcher);
        }
        /**
         * 查询 BusinessPartners
         * @param fetcher 查询者
         */
        fetchBusinessPartners(fetcher: ibas.IFetchCaller<sap.b1.IBusinessPartners>): void {
            super.fetch("BusinessPartners", fetcher);
        }
        /**
         * 查询 Orders
         * @param fetcher 查询者
         */
        fetchOrders(fetcher: ibas.IFetchCaller<sap.b1.IOrders>): void {
            super.fetch("Orders", fetcher);
        }
        /**
         * 查询 PurchaseOrders
         * @param fetcher 查询者
         */
        fetchPurchaseOrders(fetcher: ibas.IFetchCaller<sap.b1.IPurchaseOrders>): void {
            super.fetch("PurchaseOrders", fetcher);
        }
        /**
         * 查询 Recordset
         * @param fetcher 查询者
         */
        fetchItemRecords(fetcher: ibas.IFetchCaller<sap.b1.IRecordset>): void {
            super.fetch("ItemRecords", fetcher);
        }
        /**
         * 查询 Recordset (返回类型自己定义)
         * @param fetcher 查询者
         */
        fetchItemRecordsEx(fetcher: ibas.IFetchCaller<sap.b1.IItemRecord>): void {
            super.fetch("ItemRecords", {
                caller: fetcher.caller,
                criteria: fetcher.criteria,
                onCompleted(opRslt: ibas.IOperationResult<any>): void {
                    try {
                        let converter: DataConverter = new DataConverter();
                        let datas: ibas.ArrayList<sap.b1.IItemRecord> = new ibas.ArrayList<sap.b1.IItemRecord>();
                        for (let data of opRslt.resultObjects) {
                            datas.add(converter.parsing(data, "UserDefined"));
                        }
                        opRslt.resultObjects = datas;
                        fetcher.onCompleted(opRslt);
                    } catch (error) {
                        fetcher.onCompleted(new ibas.OperationResult<sap.b1.IItemRecord>(error));
                    }
                }
            });
        }

    }
    /** 数据转换者 */
    class DataConverter extends ibas.DataConverter4j {
        /** 解析数据 */
        parsing(data: any, sign: string): any {
            if (data.type === "DataWrapping") {
                return JSON.parse(data.Content);
            } else if (data.type === "Recordset") {
                let remote: sap.b1.IRecordset = data;
                let newData: any = new Object();
                for (let field of remote.fields) {
                    newData[field.name] = field.value;
                }
                return newData;
            } else {
                return super.parsing(data, sign);
            }
        }
        /** 创建业务对象转换者 */
        protected createConverter(): ibas.BOConverter {
            return null;
        }

    }
}