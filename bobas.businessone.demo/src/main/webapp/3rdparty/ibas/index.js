/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
var ibas;
(function (ibas) {
    /**
     * 集合
     */
    class ArrayList extends Array {
        add() {
            // 无效值不做处理
            if (arguments === null || arguments === undefined) {
                return;
            }
            for (let arg of arguments) {
                if (arg instanceof Array) {
                    for (let item of arg) {
                        this.push(item);
                    }
                }
                else {
                    this.push(arg);
                }
            }
        }
        /**
         * 移出项目
         * @param item 项目
         */
        remove(item) {
            // 无效值不做处理
            if (item === null || item === undefined) {
                return;
            }
            let keeps = new Array(); // 临时数组
            for (let tmp of this) {
                if (item === tmp) {
                    // 被移出的数组，不保留
                    continue;
                }
                keeps.push(tmp);
            }
            // 清除数组
            while (this.length > 0) {
                this.pop();
            }
            // 重新插入被保存的
            for (let tmp of keeps) {
                this.push(tmp);
            }
        }
        /**
         * 移出项目
         * @param index 项目索引
         */
        removeAt(index) {
            if (index >= 0 && index < this.length) {
                this.remove(this[index]);
            }
        }
        /**
         * 返回符合条件的数组
         */
        where(lambda, thisArg) {
            let values = new Array();
            if (lambda instanceof Function) {
                for (let item of this) {
                    if (lambda(item)) {
                        values.push(item);
                    }
                }
            }
            return values;
        }
        /**
         * 第一个或默认
         */
        firstOrDefault() {
            let lambda = arguments[0];
            if (lambda instanceof Function) {
                for (let index = 0; index < this.length; index++) {
                    let item = this[index];
                    if (lambda(item)) {
                        return item;
                    }
                }
            }
            else {
                if (this.length > 0) {
                    return this[0];
                }
            }
            return null;
        }
        /**
         * 最后一个或默认
         */
        lastOrDefault() {
            let lambda = arguments[0];
            if (lambda instanceof Function) {
                for (let index = this.length - 1; index >= 0; index--) {
                    let item = this[index];
                    if (lambda(item)) {
                        return item;
                    }
                }
            }
            else {
                if (this.length > 0) {
                    return this[this.length - 1];
                }
            }
            return null;
        }
        /**
         * 是否包含
         */
        contain(value) {
            for (let tmp of this) {
                if (value === tmp) {
                    return true;
                }
            }
            return false;
        }
        /**
         * 清除所有元素
         */
        clear() {
            // 清除数组
            while (this.length > 0) {
                this.pop();
            }
        }
    }
    ibas.ArrayList = ArrayList;
    /**
     * 键值
     */
    class KeyValue {
        constructor() {
            if (arguments[0] !== undefined) {
                this.key = arguments[0];
                this.value = arguments[0];
            }
            if (arguments[1] !== undefined) {
                this.value = arguments[1];
            }
        }
    }
    ibas.KeyValue = KeyValue;
    /**
     * 键描述
     */
    class KeyText {
        constructor() {
            if (arguments[0] !== undefined) {
                this.key = arguments[0];
                this.text = arguments[0];
            }
            if (arguments[1] !== undefined) {
                this.text = arguments[1];
            }
        }
    }
    ibas.KeyText = KeyText;
    /**
     * 文件数据
     */
    class FileData {
        /** 文件名称 */
        get fileName() {
            return this.FileName;
        }
        set fileName(value) {
            this.FileName = value;
        }
        /** 位置 */
        get location() {
            return this.Location;
        }
        set location(value) {
            this.Location = value;
        }
        /** 原始名 */
        get originalName() {
            return this.OriginalName;
        }
        set originalName(value) {
            this.OriginalName = value;
        }
    }
    ibas.FileData = FileData;
    /**
     * 消息
     */
    class Message {
        constructor() {
            this.level = ibas.emMessageLevel.INFO;
            this.time = new Date(Date.now());
        }
        /**
         * 格式化消息
         */
        toString() {
            let builder = new ibas.StringBuilder();
            if (this.tag !== undefined) {
                builder.append(this.tag);
                builder.append(": ");
            }
            if (this.content !== undefined) {
                builder.append(this.content);
            }
            return builder.toString();
        }
        /**
         * 格式化消息
         */
        outString() {
            let builder = new ibas.StringBuilder();
            if (this.level !== undefined) {
                builder.append("[");
                builder.append(ibas.emMessageLevel[this.level]);
                builder.append("]");
            }
            if (this.time !== undefined) {
                builder.append(" ");
                builder.append("[");
                builder.append(this.time.toLocaleString());
                builder.append("]");
            }
            if (builder.length > 0) {
                builder.append("\r\n");
            }
            if (this.tag !== undefined) {
                builder.append(this.tag);
                builder.append(": ");
            }
            if (this.content !== undefined) {
                builder.append(this.content);
            }
            return builder.toString();
        }
    }
    ibas.Message = Message;
    /** 数据分隔符（,） */
    ibas.DATA_SEPARATOR = ",";
    /** 最小库标记 */
    ibas.SIGN_MIN_LIBRARY = ".min";
    /** 配置项目-默认货币 */
    ibas.CONFIG_ITEM_DEFAULT_CURRENCY = "defaultCurrency";
})(ibas || (ibas = {}));
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
var ibas;
(function (ibas) {
    /**
     * 消息级别
     */
    let emMessageLevel;
    (function (emMessageLevel) {
        /** 严重错误 */
        emMessageLevel[emMessageLevel["FATAL"] = 0] = "FATAL";
        /** 错误 */
        emMessageLevel[emMessageLevel["ERROR"] = 1] = "ERROR";
        /** 警告 */
        emMessageLevel[emMessageLevel["WARN"] = 2] = "WARN";
        /** 消息 */
        emMessageLevel[emMessageLevel["INFO"] = 3] = "INFO";
        /** 调试信息 */
        emMessageLevel[emMessageLevel["DEBUG"] = 4] = "DEBUG";
    })(emMessageLevel = ibas.emMessageLevel || (ibas.emMessageLevel = {}));
    /**
     * 比较方式
     */
    let emConditionOperation;
    (function (emConditionOperation) {
        /** 无 */
        emConditionOperation[emConditionOperation["NONE"] = 0] = "NONE";
        /** 等于(=) */
        emConditionOperation[emConditionOperation["EQUAL"] = 1] = "EQUAL";
        /** 大于(>) */
        emConditionOperation[emConditionOperation["GRATER_THAN"] = 2] = "GRATER_THAN";
        /** 小于(<) */
        emConditionOperation[emConditionOperation["LESS_THAN"] = 3] = "LESS_THAN";
        /** 大于等于(>=) */
        emConditionOperation[emConditionOperation["GRATER_EQUAL"] = 4] = "GRATER_EQUAL";
        /** 小于等于(<=) */
        emConditionOperation[emConditionOperation["LESS_EQUAL"] = 5] = "LESS_EQUAL";
        /** 不等于(<>) */
        emConditionOperation[emConditionOperation["NOT_EQUAL"] = 6] = "NOT_EQUAL";
        /** 包含Like (%) */
        emConditionOperation[emConditionOperation["CONTAIN"] = 7] = "CONTAIN";
        /** 不包含Not like (%) */
        emConditionOperation[emConditionOperation["NOT_CONTAIN"] = 8] = "NOT_CONTAIN";
        /** 开始为(...%) */
        emConditionOperation[emConditionOperation["START"] = 9] = "START";
        /** 结束为(%...) */
        emConditionOperation[emConditionOperation["END"] = 10] = "END";
        /** 是空 */
        emConditionOperation[emConditionOperation["IS_NULL"] = 11] = "IS_NULL";
        /** 非空 */
        emConditionOperation[emConditionOperation["NOT_NULL"] = 12] = "NOT_NULL";
    })(emConditionOperation = ibas.emConditionOperation || (ibas.emConditionOperation = {}));
    /**
     * 条件之间关系
     */
    let emConditionRelationship;
    (function (emConditionRelationship) {
        /** 没关系 */
        emConditionRelationship[emConditionRelationship["NONE"] = 0] = "NONE";
        /** 且 */
        emConditionRelationship[emConditionRelationship["AND"] = 1] = "AND";
        /** 或 */
        emConditionRelationship[emConditionRelationship["OR"] = 2] = "OR";
    })(emConditionRelationship = ibas.emConditionRelationship || (ibas.emConditionRelationship = {}));
    /**
     * 排序方式
     */
    let emSortType;
    (function (emSortType) {
        /** 降序 */
        emSortType[emSortType["DESCENDING"] = 0] = "DESCENDING";
        /** 升序 */
        emSortType[emSortType["ASCENDING"] = 1] = "ASCENDING";
    })(emSortType = ibas.emSortType || (ibas.emSortType = {}));
    /**
     * 是否
     */
    let emYesNo;
    (function (emYesNo) {
        /** 否 */
        emYesNo[emYesNo["NO"] = 0] = "NO";
        /** 是 */
        emYesNo[emYesNo["YES"] = 1] = "YES";
    })(emYesNo = ibas.emYesNo || (ibas.emYesNo = {}));
    /**
     * 单据状态
     */
    let emDocumentStatus;
    (function (emDocumentStatus) {
        /** 计划 */
        emDocumentStatus[emDocumentStatus["PLANNED"] = 0] = "PLANNED";
        /** 下达 */
        emDocumentStatus[emDocumentStatus["RELEASED"] = 1] = "RELEASED";
        /** 完成 */
        emDocumentStatus[emDocumentStatus["FINISHED"] = 2] = "FINISHED";
        /** 结算 */
        emDocumentStatus[emDocumentStatus["CLOSED"] = 3] = "CLOSED";
    })(emDocumentStatus = ibas.emDocumentStatus || (ibas.emDocumentStatus = {}));
    /**
     * 业务对象状态
     */
    let emBOStatus;
    (function (emBOStatus) {
        /** 未清 */
        emBOStatus[emBOStatus["OPEN"] = 0] = "OPEN";
        /** 已清 */
        emBOStatus[emBOStatus["CLOSED"] = 1] = "CLOSED";
    })(emBOStatus = ibas.emBOStatus || (ibas.emBOStatus = {}));
    /**
     * 审批步骤状态
     */
    let emApprovalStepStatus;
    (function (emApprovalStepStatus) {
        /** 挂起的 */
        emApprovalStepStatus[emApprovalStepStatus["PENDING"] = 0] = "PENDING";
        /** 审批中 */
        emApprovalStepStatus[emApprovalStepStatus["PROCESSING"] = 1] = "PROCESSING";
        /** 已批准 */
        emApprovalStepStatus[emApprovalStepStatus["APPROVED"] = 2] = "APPROVED";
        /** 已拒绝 */
        emApprovalStepStatus[emApprovalStepStatus["REJECTED"] = 3] = "REJECTED";
        /** 已跳过 */
        emApprovalStepStatus[emApprovalStepStatus["SKIPPED"] = 4] = "SKIPPED";
    })(emApprovalStepStatus = ibas.emApprovalStepStatus || (ibas.emApprovalStepStatus = {}));
    /**
     * 审批状态
     */
    let emApprovalStatus;
    (function (emApprovalStatus) {
        /** 不影响 */
        emApprovalStatus[emApprovalStatus["UNAFFECTED"] = 0] = "UNAFFECTED";
        /** 审批中 */
        emApprovalStatus[emApprovalStatus["PROCESSING"] = 1] = "PROCESSING";
        /** 已批准 */
        emApprovalStatus[emApprovalStatus["APPROVED"] = 2] = "APPROVED";
        /** 已拒绝 */
        emApprovalStatus[emApprovalStatus["REJECTED"] = 3] = "REJECTED";
        /** 已取消 */
        emApprovalStatus[emApprovalStatus["CANCELLED"] = 4] = "CANCELLED";
    })(emApprovalStatus = ibas.emApprovalStatus || (ibas.emApprovalStatus = {}));
    /**
     * 审批结果
     */
    let emApprovalResult;
    (function (emApprovalResult) {
        /** 已批准 */
        emApprovalResult[emApprovalResult["APPROVED"] = 0] = "APPROVED";
        /** 拒绝的 */
        emApprovalResult[emApprovalResult["REJECTED"] = 1] = "REJECTED";
        /** 重置为进行中 */
        emApprovalResult[emApprovalResult["PROCESSING"] = 2] = "PROCESSING";
    })(emApprovalResult = ibas.emApprovalResult || (ibas.emApprovalResult = {}));
    /**
     * 方向
     */
    let emDirection;
    (function (emDirection) {
        /** 入 */
        emDirection[emDirection["IN"] = 0] = "IN";
        /** 出 */
        emDirection[emDirection["OUT"] = 1] = "OUT";
    })(emDirection = ibas.emDirection || (ibas.emDirection = {}));
    /**
     * 判断操作
     */
    let emJudmentOperation;
    (function (emJudmentOperation) {
        /**
         * 等于
         */
        emJudmentOperation[emJudmentOperation["EQUAL"] = 0] = "EQUAL";
        /**
         * 不等于
         */
        emJudmentOperation[emJudmentOperation["NOT_EQUAL"] = 1] = "NOT_EQUAL";
        /**
         * 大于
         */
        emJudmentOperation[emJudmentOperation["GRATER_THAN"] = 2] = "GRATER_THAN";
        /**
         * 小于
         */
        emJudmentOperation[emJudmentOperation["LESS_THAN"] = 3] = "LESS_THAN";
        /**
         * 大于等于
         */
        emJudmentOperation[emJudmentOperation["GRATER_EQUAL"] = 4] = "GRATER_EQUAL";
        /**
         * 小于等于
         */
        emJudmentOperation[emJudmentOperation["LESS_EQUAL"] = 5] = "LESS_EQUAL";
        /**
         * 开始于（仅字符比较有效）
         */
        emJudmentOperation[emJudmentOperation["BEGIN_WITH"] = 6] = "BEGIN_WITH";
        /**
         * 不是开始于（仅字符比较有效）
         */
        emJudmentOperation[emJudmentOperation["NOT_BEGIN_WITH"] = 7] = "NOT_BEGIN_WITH";
        /**
         * 结束于（仅字符比较有效）
         */
        emJudmentOperation[emJudmentOperation["END_WITH"] = 8] = "END_WITH";
        /**
         * 不是结束于（仅字符比较有效）
         */
        emJudmentOperation[emJudmentOperation["NOT_END_WITH"] = 9] = "NOT_END_WITH";
        /**
         * 包括（仅字符比较有效）
         */
        emJudmentOperation[emJudmentOperation["CONTAIN"] = 10] = "CONTAIN";
        /**
         * 不包含（仅字符比较有效）
         */
        emJudmentOperation[emJudmentOperation["NOT_CONTAIN"] = 11] = "NOT_CONTAIN";
        /**
         * 与（仅布尔比较有效）
         */
        emJudmentOperation[emJudmentOperation["AND"] = 12] = "AND";
        /**
         * 或（仅布尔比较有效）
         */
        emJudmentOperation[emJudmentOperation["OR"] = 13] = "OR";
    })(emJudmentOperation = ibas.emJudmentOperation || (ibas.emJudmentOperation = {}));
    /** 数据库字段类型 */
    let emDbFieldType;
    (function (emDbFieldType) {
        /**
         * 未知
         */
        emDbFieldType[emDbFieldType["UNKNOWN"] = 0] = "UNKNOWN";
        /**
         * 字母数字
         */
        emDbFieldType[emDbFieldType["ALPHANUMERIC"] = 1] = "ALPHANUMERIC";
        /**
         * 长字符串
         */
        emDbFieldType[emDbFieldType["MEMO"] = 2] = "MEMO";
        /**
         * 数字
         */
        emDbFieldType[emDbFieldType["NUMERIC"] = 3] = "NUMERIC";
        /**
         * 日期
         */
        emDbFieldType[emDbFieldType["DATE"] = 4] = "DATE";
        /**
         * 小数
         */
        emDbFieldType[emDbFieldType["DECIMAL"] = 5] = "DECIMAL";
        /**
         * 字节
         */
        emDbFieldType[emDbFieldType["BYTES"] = 6] = "BYTES";
    })(emDbFieldType = ibas.emDbFieldType || (ibas.emDbFieldType = {}));
})(ibas || (ibas = {}));
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
var ibas;
(function (ibas) {
    /**
     * 字符串构建器
     */
    class StringBuilder {
        constructor() {
            /**
             * 已添加的值
             */
            this.values = new Array();
            this.valueMap = new Map();
            this.valueMap.set(null, "null");
            this.valueMap.set(undefined, "undefined");
        }
        /**
         * 设置值的映射字符串
         * @param value 值
         * @param str 映射的字符串
         */
        map(value, str) {
            if (ibas.objects.isNull(str)) {
                return;
            }
            this.valueMap.set(value, str);
        }
        /**
         * 获取当前长度
         */
        get length() {
            return this.values.length;
        }
        /**
         * 添加字符
         */
        append(str) {
            if (!ibas.objects.isNull(this.valueMap) && this.valueMap.has(str)) {
                this.values.push(this.valueMap.get(str));
            }
            else {
                if (!ibas.objects.isNull(str)) {
                    this.values.push(str.toString());
                }
            }
        }
        /**
         * 生成字符串
         */
        toString() {
            let str = "";
            for (let item of this.values) {
                str += item;
            }
            return str;
        }
    }
    ibas.StringBuilder = StringBuilder;
})(ibas || (ibas = {}));
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="./Data.ts" />
var ibas;
(function (ibas) {
    /** 数据表 */
    class DataTable {
        constructor() {
            /** 列 */
            this.columns = new ibas.ArrayList();
            /** 行 */
            this.rows = new ibas.ArrayList();
        }
        /** 转为对象 */
        convert(param = undefined) {
            if (ibas.objects.isNull(param)) {
                param = {
                    format: true,
                    nameAs: "name",
                };
            }
            let datas = [];
            for (let row of this.rows) {
                let data = {};
                for (let index = 0; index < this.columns.length; index++) {
                    let col = this.columns[index];
                    let value = row.cells[index];
                    if (param.format) {
                        // 转换类型
                        value = col.convert(value);
                    }
                    if (param.nameAs === "index") {
                        data[index.toString()] = value;
                    }
                    else if (param.nameAs === "description" && !ibas.strings.isEmpty(col.description)) {
                        data[col.description] = value;
                    }
                    else {
                        data[col.name] = value;
                    }
                }
                datas.push(data);
            }
            return datas;
        }
        /**
         * 克隆
         * @param rows 保留的行索引（未定义为全部）
         */
        clone(rows = undefined) {
            let nTable = new DataTable();
            nTable.name = this.name;
            nTable.description = this.description;
            for (let item of this.columns) {
                let nItem = new DataTableColumn();
                nItem.name = item.name;
                nItem.description = item.description;
                nItem.dataType = item.dataType;
                nTable.columns.push(nItem);
            }
            if (!(rows instanceof Array)) {
                rows = [];
                for (let index = 0; index < this.rows.length; index++) {
                    rows.push(index);
                }
            }
            for (let item of rows) {
                let row = this.rows[item];
                let nRow = new DataTableRow();
                for (let cell of row.cells) {
                    nRow.cells.add(cell);
                }
                nTable.rows.push(nRow);
            }
            return nTable;
        }
    }
    ibas.DataTable = DataTable;
    /** 数据表-列 */
    class DataTableColumn {
        /** 获取数据定义类型 */
        definedDataType() {
            if (this.dataType === "java.lang.String") {
                return emTableDataType.ALPHANUMERIC;
            }
            else if (this.dataType === "java.sql.Timestamp") {
                return emTableDataType.DATE;
            }
            else if (this.dataType === "java.lang.Integer"
                || this.dataType === "java.lang.Short") {
                return emTableDataType.NUMERIC;
            }
            else if (this.dataType === "java.math.BigDecimal") {
                return emTableDataType.DECIMAL;
            }
            return emTableDataType.ALPHANUMERIC;
        }
        /** 转换类型 */
        convert(data) {
            if (this.definedDataType() === emTableDataType.ALPHANUMERIC) {
                return data;
            }
            else if (this.definedDataType() === emTableDataType.NUMERIC) {
                return ibas.numbers.toInt(data);
            }
            else if (this.definedDataType() === emTableDataType.DECIMAL) {
                return ibas.numbers.valueOf(data);
            }
            else if (this.definedDataType() === emTableDataType.DATE) {
                return ibas.dates.valueOf(data);
            }
            else {
                // 未知的类型
                return data;
            }
        }
    }
    ibas.DataTableColumn = DataTableColumn;
    /** 数据表-行 */
    class DataTableRow {
        constructor() {
            /** 值 */
            this.cells = new ibas.ArrayList();
        }
    }
    ibas.DataTableRow = DataTableRow;
    /** 数据表 */
    let emTableDataType;
    (function (emTableDataType) {
        /** 字母数字 */
        emTableDataType[emTableDataType["ALPHANUMERIC"] = 0] = "ALPHANUMERIC";
        /** 数字 */
        emTableDataType[emTableDataType["NUMERIC"] = 1] = "NUMERIC";
        /** 日期 */
        emTableDataType[emTableDataType["DATE"] = 2] = "DATE";
        /** 小数 */
        emTableDataType[emTableDataType["DECIMAL"] = 3] = "DECIMAL";
    })(emTableDataType = ibas.emTableDataType || (ibas.emTableDataType = {}));
})(ibas || (ibas = {}));
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="./Data.ts" />
/// <reference path="./Configuration.ts" />
var ibas;
(function (ibas) {
    /** 配置项目-消息输出级别 */
    ibas.CONFIG_ITEM_MESSAGES_LEVEL = "msgLevel";
    const PROPERTY_LEVEL = Symbol("level");
    /**
     * 运行消息记录
     */
    class Logger {
        /**
         * 消息输出的级别
         */
        get level() {
            if (ibas.strings.isEmpty(this[PROPERTY_LEVEL])) {
                // 没有设置则每次都从配置取
                let level = ibas.config.get(ibas.CONFIG_ITEM_MESSAGES_LEVEL, ibas.emMessageLevel.ERROR, ibas.emMessageLevel);
                if (ibas.config.get(ibas.CONFIG_ITEM_DEBUG_MODE, false)) {
                    level = ibas.emMessageLevel.DEBUG;
                }
                return level;
            }
            return this[PROPERTY_LEVEL];
        }
        set level(value) {
            this[PROPERTY_LEVEL] = value;
        }
        /**
         * 记录消息
         * @param msgPars 消息参数
         */
        log() {
            // edge不开启调试模式,不能输出消息
            if (window.Debug !== undefined && window.Debug !== null) {
                if (window.Debug.debuggerEnabled !== true) {
                    return;
                }
            }
            let message;
            let useCount = 0; // 使用的参数
            if (arguments[0] instanceof ibas.Message) {
                message = arguments[0];
                useCount++;
            }
            else if (typeof (arguments[0]) === "number") {
                message = new ibas.Message();
                message.level = arguments[0];
                useCount++;
                message.content = arguments[1];
                useCount++;
            }
            else if (typeof (arguments[0]) === "string") {
                message = new ibas.Message();
                message.content = arguments[0];
                useCount++;
            }
            else {
                throw new Error("invalid parameters.");
            }
            // 如果参数未用完，则认为是模板输出的字符串
            if (arguments.length > useCount) {
                let tmpArgs = new Array();
                for (let index = useCount; index < arguments.length; index++) {
                    tmpArgs.push(arguments[index]);
                }
                message.content = ibas.strings.format(message.content, tmpArgs);
            }
            if (this.level < message.level) {
                // 超过日志输出的级别
                return;
            }
            // 根据消息级别，定义使用的输出方法
            let putter;
            if (message.level === ibas.emMessageLevel.ERROR) {
                putter = console.error;
            }
            else if (message.level === ibas.emMessageLevel.FATAL) {
                putter = console.error;
            }
            else if (message.level === ibas.emMessageLevel.WARN) {
                putter = console.warn;
            }
            if (putter === undefined || putter === null) {
                putter = console.log;
            }
            putter(message.outString());
        }
    }
    ibas.Logger = Logger;
    /** 记录实例 */
    ibas.logger = new Logger();
})(ibas || (ibas = {}));
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="./Data.ts" />
/// <reference path="./Configuration.ts" />
/// <reference path="./Logger.ts" />
var ibas;
(function (ibas) {
    /** 配置项目-语言编码 */
    ibas.CONFIG_ITEM_LANGUAGE_CODE = "language";
    /** 配置项目-资源分组名称 */
    ibas.CONFIG_ITEM_I18N_GROUP_NAMES = "i18nGroups";
    const PROPERTY_LISTENER = Symbol("listener");
    const PROPERTY_LANGUAGE = Symbol("language");
    /** 多语言 */
    class I18N {
        constructor() {
            /** 默认语言编码 */
            this.DEFAULT_LANGUAGE_CODE = "en_US";
            this.languageFiles = new ibas.ArrayList();
            // 分组标记
            this.groups = null;
        }
        /** 语言 */
        get language() {
            if (ibas.strings.isEmpty(this[PROPERTY_LANGUAGE])) {
                this[PROPERTY_LANGUAGE] = ibas.config.get(ibas.CONFIG_ITEM_LANGUAGE_CODE, this.DEFAULT_LANGUAGE_CODE);
            }
            return this[PROPERTY_LANGUAGE];
        }
        set language(value) {
            if (this[PROPERTY_LANGUAGE] !== value) {
                this[PROPERTY_LANGUAGE] = value;
                this.fireLanguageChanged();
            }
        }
        /**
         * 注册监听事件
         * @param listener 监听者
         */
        registerListener(listener) {
            if (ibas.objects.isNull(listener)) {
                return;
            }
            if (ibas.objects.isNull(this[PROPERTY_LISTENER])) {
                this[PROPERTY_LISTENER] = new ibas.ArrayList();
            }
            this[PROPERTY_LISTENER].add(listener);
        }
        /** 触发语言改变事件 */
        fireLanguageChanged() {
            if (!ibas.objects.isNull(this[PROPERTY_LANGUAGE])) {
                ibas.logger.log(ibas.emMessageLevel.INFO, "i18n: language change to [{0}].", this[PROPERTY_LANGUAGE]);
            }
            this.reload();
            if (!ibas.objects.isNull(this[PROPERTY_LISTENER])) {
                for (let item of this[PROPERTY_LISTENER]) {
                    item.onLanguageChanged(this[PROPERTY_LANGUAGE]);
                }
            }
        }
        /**
         * 输出描述
         * @param key 检索值
         * @param args 替代内容
         */
        prop(key, ...args) {
            if (ibas.strings.isEmpty(key)) {
                return key;
            }
            if (ibas.objects.isNull(this.resources)) {
                // 没有初始化则加载
                this.resources = new Map();
                this.load(null);
            }
            let value = null;
            let map = this.resources.get(this.groupName(key));
            if (!ibas.objects.isNull(map)) {
                value = map.get(key);
            }
            if (!ibas.strings.isEmpty(value)) {
                return ibas.strings.format(value, args);
            }
            return ibas.strings.format("[{0}]", key);
        }
        /** 重新加载已加载 */
        reload() {
            for (let item of this.languageFiles) {
                this.load(item);
            }
        }
        load(address) {
            let that = this;
            if (ibas.objects.isNull(address)) {
                return;
            }
            address = ibas.urls.normalize(address);
            if (!this.languageFiles.contain(address)) {
                this.languageFiles.add(address);
            }
            // 设置运行时版本
            let rtVersion = ibas.config.get(ibas.CONFIG_ITEM_RUNTIME_VERSION);
            if (!ibas.objects.isNull(rtVersion)) {
                address = address + (address.indexOf("?") === -1 ? "?" : "&") + "_=" + rtVersion;
            }
            let loader = new LanguageLoader();
            let caller = {
                address: address,
                onCompleted(resource) {
                    if (ibas.objects.isNull(that.resources)) {
                        that.resources = new Map();
                    }
                    let setMap = function (data) {
                        for (let name in data) {
                            if (ibas.objects.isNull(name)) {
                                continue;
                            }
                            let value = data[name];
                            if (ibas.objects.isNull(value)) {
                                continue;
                            }
                            that.add(name, value);
                        }
                    };
                    if (resource instanceof Array) {
                        for (let item of resource) {
                            setMap(item);
                        }
                    }
                    else {
                        setMap(resource);
                    }
                }
            };
            // 加载默认语言
            loader.load(caller);
            // 加载指定语言
            if (this.language !== this.DEFAULT_LANGUAGE_CODE) {
                let index = caller.address.lastIndexOf(".");
                if (index > 0) {
                    caller.address = caller.address.substring(0, index + 1) + this.language + caller.address.substring(index);
                    loader.load(caller);
                }
            }
        }
        groupName(key) {
            if (ibas.objects.isNull(this.groups)) {
                // 初始化分组配置
                this.groups = new ibas.ArrayList();
                let values = ibas.config.get(ibas.CONFIG_ITEM_I18N_GROUP_NAMES);
                if (!ibas.strings.isEmpty(values)) {
                    for (let item of values.split(",")) {
                        item = item.trim();
                        if (ibas.strings.isEmpty(item)) {
                            continue;
                        }
                        this.groups.add(item);
                    }
                }
            }
            let tmps = key.split("_");
            if (this.groups.contain(tmps[0])) {
                // 对象资源分组优化
                return tmps[0] + "_" + tmps[1].substring(0, 1);
            }
            else {
                return tmps[0];
            }
        }
        add(key, value) {
            if (ibas.strings.isEmpty(key)) {
                return;
            }
            let group = this.groupName(key);
            let map = this.resources.get(group);
            if (ibas.objects.isNull(map)) {
                map = new Map();
                this.resources.set(group, map);
            }
            map.set(key, value);
        }
    }
    ibas.I18N = I18N;
    /** 语言加载者 */
    class LanguageLoader {
        /** 加载 */
        load(caller) {
            let JQryAjxSetting = {
                url: caller.address,
                type: "GET",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                cache: true,
                error: function (xhr, status, error) {
                    ibas.logger.log(ibas.emMessageLevel.ERROR, "i18n: get language file [{2}] faild [{0} - {1}].", status, error, caller.address);
                    caller.onCompleted({});
                },
                success: function (data) {
                    /*
                    logger.log(emMessageLevel.DEBUG, "i18n: get language file [{0}] sucessful.", caller.address);
                    */
                    if (!ibas.objects.isNull(data)) {
                        caller.onCompleted(data);
                    }
                    else {
                        caller.onCompleted({});
                    }
                },
            };
            jQuery.ajax(JQryAjxSetting);
        }
    }
    /** 语言实例 */
    ibas.i18n = new I18N();
})(ibas || (ibas = {}));
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="./Data.ts" />
/// <reference path="./I18N.ts" />
/// <reference path="./Criteria.ts" />
/// <reference path="./Enum.ts" />
var ibas;
(function (ibas) {
    /**
     * 对象
     */
    let objects;
    (function (objects) {
        /**
         * 是否为空
         * @param object 判断对象
         */
        function isNull(object) {
            if (object === undefined || object === null) {
                return true;
            }
            return false;
        }
        objects.isNull = isNull;
        /**
         * 判断数据是否为某类型
         * @param instance 数据
         * @param type 类型
         */
        function instanceOf(instance, type) {
            if (isNull(instance) || isNull(type)) {
                return false;
            }
            // 直接判断
            if (instance instanceof type) {
                return true;
            }
            // 通过名称判断，不安全
            let tType = Object.getPrototypeOf(instance).constructor;
            if (isAssignableFrom(tType, type)) {
                return true;
            }
            return false;
        }
        objects.instanceOf = instanceOf;
        /**
         * 判断是否为其子类
         * @param subType 待判断类型
         * @param type 父类型
         */
        function isAssignableFrom(subType, type) {
            if (isNull(subType) || isNull(type)) {
                return false;
            }
            if (isSame(subType, type)) {
                return true;
            }
            let cType = Object.getPrototypeOf(subType);
            while (!isNull(cType)) {
                if (isSame(cType, type)) {
                    return true;
                }
                cType = Object.getPrototypeOf(cType);
            }
            return false;
        }
        objects.isAssignableFrom = isAssignableFrom;
        /**
         * 是否一样
         * @param type1 类型1
         * @param type2 类型2
         */
        function isSame(type1, type2) {
            if (type1 === type2) {
                return true;
            }
            if (isNull(type1) || isNull(type2)) {
                return false;
            }
            if (type1.name === type2.name) {
                return true;
            }
            return false;
        }
        objects.isSame = isSame;
        /**
         * 获取类型名称
         * @param type 类型
         */
        function getName(type) {
            if (objects.isNull(type)) {
                return undefined;
            }
            if (typeof type !== "function") {
                throw new Error("is not a class.");
            }
            return type.name;
        }
        objects.getName = getName;
        /**
         * 获取实例类型
         * @param 实例
         */
        function getType(instance) {
            if (objects.isNull(instance)) {
                return undefined;
            }
            if (typeof instance !== "object") {
                throw new Error("is not a object.");
            }
            return instance.constructor;
        }
        objects.getType = getType;
        /**
         * 获取实例的类型名称
         * @param instance 实例
         */
        function getTypeName(instance) {
            return getName(getType(instance));
        }
        objects.getTypeName = getTypeName;
        /**
         * 克隆对象
         * @param data 数据
         */
        function clone(data) {
            if (objects.isNull(data)) {
                return data;
            }
            let type = Object.getPrototypeOf(data).constructor;
            let newData = new type;
            // 置为加载数据状态，此状态不触发事件
            if (newData.isLoding !== undefined) {
                newData.isLoding = true;
            }
            for (let name in data) {
                if (objects.isNull(name)) {
                    continue;
                }
                if (name.startsWith("_")) {
                    continue;
                }
                let value = data[name];
                if (value instanceof Array) {
                    let nValue = newData[name];
                    if (nValue === undefined) {
                        nValue = new ibas.ArrayList();
                        newData[name] = nValue;
                    }
                    for (let item of value) {
                        let nItem = clone(item);
                        if (nValue.add !== undefined) {
                            nValue.add(nItem);
                        }
                        else {
                            nValue.push(nItem);
                        }
                    }
                }
                else if (value instanceof Date) {
                    newData[name] = new Date(value.getTime());
                }
                else if (value instanceof Object) {
                    // 克隆新对象
                    let nValue = clone(value);
                    if (objects.isNull(nValue)) {
                        newData[name] = nValue;
                    }
                }
                else {
                    newData[name] = value;
                }
            }
            // 取消加载数据状态
            if (newData.isLoding !== undefined) {
                newData.isLoding = false;
            }
            return newData;
        }
        objects.clone = clone;
        /**
         * 获取属性值
         * @param propertyName 属性名称
         * @param data 对象
         */
        function getPropertyValue(propertyName, data) {
            for (let key in data) {
                if (strings.equalsIgnoreCase(key, propertyName)) {
                    return data[key];
                }
            }
            return undefined;
        }
        objects.getPropertyValue = getPropertyValue;
    })(objects = ibas.objects || (ibas.objects = {}));
    /**
     * 对字符串操作的封装方法
     */
    let strings;
    (function (strings) {
        /**
         * 是否为空
         * @param object 判断对象
         */
        function isEmpty(content) {
            if (content === undefined || content === null) {
                return true;
            }
            if (typeof (content) === "string" && content.length === 0) {
                return true;
            }
            return false;
        }
        strings.isEmpty = isEmpty;
        /**
         * 格式化输出
         * @param format 格式，I'm {0} and good at {1}.
         * @param args 替换字符
         */
        function format(format, ...args) {
            let result = format;
            if (args.length > 0) {
                // 存在替代字符
                if (args.length === 1 && Array.isArray(args[0])) {
                    // 替代字符变量自身是个数组，则使用数组里的内容替代
                    args = args[0];
                    for (let key in args) {
                        if (args[key] !== undefined) {
                            let reg = new RegExp("\\{" + key + "\\}", "g");
                            result = result.replace(reg, args[key]);
                        }
                    }
                }
                else {
                    for (let i = 0; i < args.length; i++) {
                        if (args[i] !== undefined) {
                            let reg = new RegExp("\\{" + i + "\\}", "g");
                            result = result.replace(reg, args[i]);
                        }
                    }
                }
            }
            return result;
        }
        strings.format = format;
        /**
         * 存在多少个字符
         * @param content 待分析字符
         * @param value 查询的字符
         */
        function count(content, value) {
            let count = 0;
            if (content === undefined || content === null) {
                return count;
            }
            if (value === undefined || value === null) {
                return count;
            }
            let pos = content.indexOf(value, 0);
            while (pos >= 0) {
                count++;
                pos = content.indexOf(value, pos + 1);
            }
            return count;
        }
        strings.count = count;
        /**
         * 删除全部空格
         * @param content 待分析字符串
         */
        function trim(content) {
            return replace(content, " ", "");
        }
        strings.trim = trim;
        /**
         * 删除指定字符
         * @param content 待分析字符串
         * @param args 删除的字符
         */
        function remove(content, ...args) {
            if (content === undefined || content === null) {
                throw new Error("content is invalid.");
            }
            if (args === undefined || args === null || args.length === 0) {
                throw new Error("args is invalid.");
            }
            let removes = "";
            for (let item of args) {
                removes = removes + item;
            }
            let value = "";
            for (let item of content) {
                if (removes.indexOf(item) >= 0) {
                    continue;
                }
                value = value + item;
            }
            return value;
        }
        strings.remove = remove;
        /**
         * 替换字符，全部
         * @param content 待分析字符
         * @param search 查询的字符
         * @param replace 替换的字符
         */
        function replace(content, search, replace) {
            if (content === undefined || content === null) {
                throw new Error("content is invalid.");
            }
            if (search === undefined || search === null) {
                throw new Error("search is invalid.");
            }
            if (replace === undefined || replace === null) {
                throw new Error("replace is invalid.");
            }
            let pos = content.indexOf(search);
            while (pos >= 0) {
                content = content.replace(search, replace);
                pos = content.indexOf(search);
            }
            return content;
        }
        strings.replace = replace;
        /**
         * 比较字符串
         * @param value1 字符1
         * @param value2 字符2
         */
        function equals(value1, value2) {
            return value1 === value2;
        }
        strings.equals = equals;
        /**
         * 比较字符串，忽略大小写
         * @param value1 字符1
         * @param value2 字符2
         */
        function equalsIgnoreCase(value1, value2) {
            if (value1 === undefined || value1 === null) {
                return false;
            }
            if (value2 === undefined || value2 === null) {
                return false;
            }
            let tmp1 = value1.toLowerCase();
            let tmp2 = value2.toLowerCase();
            return equals(tmp1, tmp2);
        }
        strings.equalsIgnoreCase = equalsIgnoreCase;
        /**
         * 补齐字符串
         * @param value 值
         * @param size 长度
         * @param char 补齐字符
         */
        function fill(value, size, char) {
            let newValue = value.toString();
            for (let index = newValue.length; index < size; index++) {
                newValue = char + newValue;
            }
            return newValue;
        }
        strings.fill = fill;
        /**
         * 转为字符类型
         * @param value 值
         */
        function valueOf(value) {
            if (value === undefined || value === null) {
                return "";
            }
            else if (typeof value === "string") {
                return value;
            }
            else if (typeof value === "number") {
                return String(value);
            }
            else if (value instanceof Array) {
                let stringBuilder = new ibas.StringBuilder();
                for (let item of value) {
                    if (stringBuilder.length > 0) {
                        stringBuilder.append(", ");
                    }
                    stringBuilder.append(valueOf(item));
                }
                return stringBuilder.toString();
            }
            else {
                return value.toString();
            }
        }
        strings.valueOf = valueOf;
    })(strings = ibas.strings || (ibas.strings = {}));
    /**
     * 唯一标识
     */
    let uuids;
    (function (uuids) {
        function random() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + "-" + s4() + "-" + s4() + "-" +
                s4() + "-" + s4() + s4() + s4();
        }
        uuids.random = random;
    })(uuids = ibas.uuids || (ibas.uuids = {}));
    /**
     * 枚举
     */
    let enums;
    (function (enums) {
        /** 转换为枚举值
         * @param type 目标类型
         * @param value 值
         * @returns 枚举值，失败为undefined
         */
        function valueOf(type, value) {
            if (objects.isNull(type) || objects.isNull(value)) {
                return undefined;
            }
            for (let item in type) {
                if (typeof item === typeof value) {
                    if (item.toUpperCase() === value.toUpperCase()) {
                        return type[item];
                    }
                }
            }
            return undefined;
        }
        enums.valueOf = valueOf;
        /**
         * 转为字符串
         * @param type 类型
         * @param value 值
         */
        function toString(type, value) {
            if (type.hasOwnProperty(value)) {
                return type[value];
            }
            return value;
        }
        enums.toString = toString;
        /**
         * 描述枚举值
         * @param type 目标类型
         * @param value 值
         * @returns 首先语言，然后枚举，最后原始
         */
        function describe(type, value) {
            if (objects.isNull(type) || objects.isNull(value)) {
                return value;
            }
            // 获取枚举值
            let sValue = value;
            if (typeof sValue === "number") {
                sValue = type[sValue];
            }
            let dValue = sValue;
            // 获取枚举名称
            let name = "em_"; // type.name;
            if (!objects.isNull(name)) {
                dValue = ibas.i18n.prop((name + sValue).toLowerCase());
                if (dValue.startsWith("[") && dValue.endsWith("]")) {
                    // 没有找到语言描述
                    dValue = sValue;
                }
            }
            return dValue;
        }
        enums.describe = describe;
    })(enums = ibas.enums || (ibas.enums = {}));
    /**
     * 日期
     */
    let dates;
    (function (dates) {
        /**
         * 当前时间
         */
        function isDate(value) {
            if (typeof value === "object") {
                if (objects.getName(objects.getType(value)) === "Date") {
                    return true;
                }
            }
            return false;
        }
        dates.isDate = isDate;
        /**
         * 当前时间
         */
        function now() {
            return new Date(Date.now());
        }
        dates.now = now;
        /**
         * 当前日期
         */
        function today() {
            let date = now();
            // 月份从0开始
            return valueOf(strings.format("{0}-{1}-{2}", date.getFullYear(), date.getMonth() + 1, date.getDate()));
        }
        dates.today = today;
        /**
         * 解析日期，支持以下格式
         * yyyy/MM/dd'T'HH:mm:ss
         * yyyy-MM-dd'T'HH:mm:ss
         * yyyy/MM/ddTHH:mm:ss
         * yyyy-MM-ddTHH:mm:ss
         * yyyy-MM-dd HH:mm:ss
         * yyyy/MM/dd HH:mm:ss
         * @param value 日期字符
         * @returns 日期
         */
        function valueOf(value) {
            if (objects.isNull(value)) {
                return undefined;
            }
            if (value instanceof Date) {
                return value;
            }
            if (typeof value === "number") {
                return new Date(value);
            }
            if (typeof value === "string") {
                if (value.length === 0) {
                    return undefined;
                }
                let spTime = "T";
                if (value.indexOf("'T'") > 0) {
                    spTime = "'T'";
                }
                else if (value.indexOf(" ") > 0) {
                    spTime = " ";
                }
                let tmps = value.split(spTime);
                let date = tmps[0];
                let time = tmps[1];
                let year = 0, month = 0, day = 0, hour = 0, minute = 0, second = 0;
                if (!objects.isNull(date)) {
                    let spChar = "-";
                    if (date.indexOf("/") > 0) {
                        spChar = "/";
                    }
                    tmps = date.split(spChar);
                    if (!objects.isNull(tmps[0])) {
                        year = Number.parseInt(tmps[0], 0);
                    }
                    if (!objects.isNull(tmps[1])) {
                        month = Number.parseInt(tmps[1], 0);
                    }
                    if (!objects.isNull(tmps[2])) {
                        day = Number.parseInt(tmps[2], 0);
                    }
                }
                if (!objects.isNull(time)) {
                    let spChar = ":";
                    tmps = time.split(spChar);
                    if (!objects.isNull(tmps[0])) {
                        hour = Number.parseInt(tmps[0], 0);
                    }
                    if (!objects.isNull(tmps[1])) {
                        minute = Number.parseInt(tmps[1], 0);
                    }
                    if (!objects.isNull(tmps[2])) {
                        second = Number.parseInt(tmps[2], 0);
                    }
                }
                // 月份从0开始
                return new Date(year, month - 1, day, hour, minute, second);
            }
        }
        dates.valueOf = valueOf;
        const DATA_SEPARATOR = "-";
        const TIME_SEPARATOR = ":";
        const DATA_TIME_SEPARATOR = "T";
        const DATA_PART_YEAR = "yyyy";
        const DATA_PART_MONTH = "MM";
        const DATA_PART_DAY = "dd";
        const DATA_PART_HOUR = "HH";
        const DATA_PART_MINUTE = "mm";
        const DATA_PART_SECOND = "ss";
        /**
         * 转换日期
         * @param value 日期
         * @returns 日期字符串
         */
        function toString() {
            let value = arguments[0];
            if (objects.isNull(value) || !(value instanceof Date)) {
                return "";
            }
            let format = DATA_PART_YEAR + DATA_SEPARATOR +
                DATA_PART_MONTH + DATA_SEPARATOR +
                DATA_PART_DAY +
                DATA_TIME_SEPARATOR +
                DATA_PART_HOUR + TIME_SEPARATOR +
                DATA_PART_MINUTE + TIME_SEPARATOR +
                DATA_PART_SECOND;
            if (!objects.isNull(arguments[1])) {
                format = arguments[1];
            }
            let year = value.getFullYear(), month = value.getMonth(), day = value.getDate(), hour = value.getHours(), minute = value.getMinutes(), second = value.getSeconds();
            format = format.replace(DATA_PART_YEAR, strings.fill(year, DATA_PART_YEAR.length, "0"));
            format = format.replace(DATA_PART_MONTH, strings.fill(month + 1, DATA_PART_MONTH.length, "0"));
            format = format.replace(DATA_PART_DAY, strings.fill(day, DATA_PART_DAY.length, "0"));
            format = format.replace(DATA_PART_HOUR, strings.fill(hour, DATA_PART_HOUR.length, "0"));
            format = format.replace(DATA_PART_MINUTE, strings.fill(minute, DATA_PART_MINUTE.length, "0"));
            format = format.replace(DATA_PART_SECOND, strings.fill(second, DATA_PART_SECOND.length, "0"));
            return format;
        }
        dates.toString = toString;
        let emDifferenceType;
        (function (emDifferenceType) {
            emDifferenceType[emDifferenceType["DAY"] = 0] = "DAY";
            emDifferenceType[emDifferenceType["HOUR"] = 1] = "HOUR";
            emDifferenceType[emDifferenceType["MINUTE"] = 2] = "MINUTE";
            emDifferenceType[emDifferenceType["SECOND"] = 3] = "SECOND";
        })(emDifferenceType = dates.emDifferenceType || (dates.emDifferenceType = {}));
        /**
         * 计算时间差
         * @param type 计算类型
         * @param minuend 被减数
         * @param value 减数
         */
        function difference(type, minuend, value) {
            if (!objects.isNull(minuend) && !objects.isNull(value)) {
                let diff = minuend.getTime() - value.getTime();
                diff = Math.round(diff / 1000);
                if (type === emDifferenceType.SECOND) {
                    return diff;
                }
                diff = Math.round(diff / 60);
                if (type === emDifferenceType.MINUTE) {
                    return diff;
                }
                diff = Math.round(diff / 60);
                if (type === emDifferenceType.HOUR) {
                    return diff;
                }
                diff = Math.round(diff / 24);
                if (type === emDifferenceType.DAY) {
                    return diff;
                }
            }
            return NaN;
        }
        dates.difference = difference;
        /**
         * 比较大小
         * @param left
         * @param right
         * @returns 0,相等；-1，right小；1，left小
         */
        function compare(left, right) {
            if (!objects.isNull(left) && !objects.isNull(right)) {
                let leftTime = left.getTime();
                let rightTime = right.getTime();
                if (leftTime === rightTime) {
                    return 0;
                }
                else if (leftTime < rightTime) {
                    return 1;
                }
                else if (leftTime > rightTime) {
                    return -1;
                }
            }
            return NaN;
        }
        dates.compare = compare;
        /**
         * 是否相等
         * @param left
         * @param right
         */
        function equals(left, right) {
            let value = compare(left, right);
            if (isNaN(value)) {
                throw new Error(ibas.i18n.prop("sys_unrecognized_data"));
            }
            if (value === 0) {
                return true;
            }
            return false;
        }
        dates.equals = equals;
        /**
         * 左值是否晚于右值
         * @param left
         * @param right
         */
        function after(left, right) {
            let value = compare(left, right);
            if (isNaN(value)) {
                throw new Error(ibas.i18n.prop("sys_unrecognized_data"));
            }
            if (value < 0) {
                return true;
            }
            return false;
        }
        dates.after = after;
        /**
         * 左值是否早于右值
         * @param left
         * @param right
         */
        function before(left, right) {
            let value = compare(left, right);
            if (isNaN(value)) {
                throw new Error(ibas.i18n.prop("sys_unrecognized_data"));
            }
            if (value > 0) {
                return true;
            }
            return false;
        }
        dates.before = before;
    })(dates = ibas.dates || (ibas.dates = {}));
    /**
     * 数字
     */
    let numbers;
    (function (numbers) {
        /** 转为整数 */
        function toInt(data) {
            let value = parseInt(data, 0);
            if (isNaN(value)) {
                return 0;
            }
            else {
                return value;
            }
        }
        numbers.toInt = toInt;
        /**  数字 */
        function valueOf(data) {
            if (typeof data === "number") {
                return data;
            }
            let value = parseFloat(data);
            if (isNaN(value)) {
                return 0.0;
            }
            else {
                return value;
            }
        }
        numbers.valueOf = valueOf;
        /**
         * 保留小数位
         * @param value 数
         * @param scale 小数位（默认配置值）
         */
        function round(value, scale) {
            if (Math.round(value) !== value) {
                if (isNaN(scale)) {
                    scale = ibas.config.get(ibas.CONFIG_ITEM_DECIMAL_PLACES, 6);
                }
                if (Math.pow(0.1, scale) > value) {
                    return 0;
                }
                let sign = Math.sign(value);
                let arr = ("" + Math.abs(value)).split(".");
                if (arr.length > 1) {
                    if (arr[1].length > scale) {
                        let integ = +arr[0] * Math.pow(10, scale);
                        let dec = integ + (+arr[1].slice(0, scale) + Math.pow(10, scale));
                        let proc = +arr[1].slice(scale, scale + 1);
                        if (proc >= 5) {
                            dec = dec + 1;
                        }
                        dec = sign * (dec - Math.pow(10, scale)) / Math.pow(10, scale);
                        return dec;
                    }
                }
            }
            return value;
        }
        numbers.round = round;
    })(numbers = ibas.numbers || (ibas.numbers = {}));
    /**
     * 地址
     */
    let urls;
    (function (urls) {
        /** 跟地址标记 */
        urls.ROOT_URL_SIGN = ".../";
        /** 上级标记 */
        urls.PARENT_URL_SIGN = "../";
        /** 当前标记 */
        urls.CURRENT_URL_SIGN = "./";
        /** 正常化地址 */
        function normalize(value) {
            if (objects.isNull(value) || value.length === 0) {
                value = urls.ROOT_URL_SIGN;
            }
            let url;
            if (value.startsWith(urls.ROOT_URL_SIGN)) {
                // 存在根目录标记，则取文档地址作为根
                url = document.location.origin + document.location.pathname;
                // 去除文档.html
                let last = url.lastIndexOf(".");
                if (last > 0 && url.lastIndexOf("/", last) <= last) {
                    url = url.substring(0, url.lastIndexOf("/"));
                }
                if (!url.endsWith("/")) {
                    url = url + "/";
                }
                url = url + value.substring(urls.ROOT_URL_SIGN.length);
            }
            else {
                url = value;
            }
            // 处理当前目录
            let cIndex = url.indexOf(urls.CURRENT_URL_SIGN);
            while (cIndex >= 0) {
                let tmp = url.substring(0, cIndex);
                if (!tmp.endsWith(".")) {
                    url = tmp + url.substring(cIndex + urls.PARENT_URL_SIGN.length - 1);
                }
                cIndex = url.indexOf(urls.CURRENT_URL_SIGN, cIndex + 1);
            }
            // 处理上级目录
            let pIndex = url.indexOf(urls.PARENT_URL_SIGN);
            while (pIndex >= 0) {
                let tmp = url.substring(0, pIndex);
                tmp = tmp.substring(0, tmp.lastIndexOf("/"));
                tmp = tmp.substring(0, tmp.lastIndexOf("/"));
                url = tmp + url.substring(pIndex + urls.PARENT_URL_SIGN.length - 1);
                pIndex = url.indexOf(urls.PARENT_URL_SIGN);
            }
            return url;
        }
        urls.normalize = normalize;
        function rootUrl() {
            if (strings.isEmpty(arguments[0])) {
                // 未提供类型，则返回文档地址
                let url = document.location.origin + document.location.pathname;
                return url.substring(0, url.lastIndexOf("/"));
            }
            let fileName = arguments[0];
            if (!fileName.startsWith("/")) {
                fileName = "/" + fileName;
            }
            if (!fileName.endsWith(".js")) {
                fileName = fileName + ".js";
            }
            let fileName2 = fileName.indexOf(ibas.SIGN_MIN_LIBRARY + ".js") > 0 ? fileName : fileName.replace(".js", ibas.SIGN_MIN_LIBRARY + ".js");
            let root = window.document.location.origin;
            let scripts = document.getElementsByTagName("script");
            for (let index = 0; index < scripts.length; index++) {
                let script = scripts[index];
                if (script.src !== undefined && script.src !== null && script.src.length !== 0) {
                    let url = script.src;
                    if (url.indexOf("./") >= 0) {
                        // 相对路径地址，需要处理下
                        if (url.startsWith("http")) {
                            url = normalize(url);
                        }
                        else {
                            if (objects.isNull(script.baseURI)) {
                                // 有的浏览器，不存在此属性
                                url = normalize(window.document.location.origin + script.src);
                            }
                            else {
                                url = normalize(script.baseURI + script.src);
                            }
                        }
                    }
                    if (url.indexOf("?") > 0) {
                        // 去除参数部分
                        url = url.substring(0, url.indexOf("?"));
                    }
                    if (url.endsWith(fileName)) {
                        root = url.substring(0, url.lastIndexOf("/"));
                        break;
                    }
                    if (url.endsWith(fileName2)) {
                        root = url.substring(0, url.lastIndexOf("/"));
                        break;
                    }
                }
            }
            return root;
        }
        urls.rootUrl = rootUrl;
        /**
         * 获取地址栏中的所有查询参数
         */
        function params() {
            let params = new ibas.ArrayList();
            let items = window.location.search.substr(1).split("&");
            for (let item of items) {
                let keyText = item.split("=");
                if (keyText.length === 2) {
                    params.add(new ibas.KeyText(keyText[0], window.unescape(keyText[1])));
                }
            }
            return params;
        }
        urls.params = params;
        /**
         * 获取地址栏中的指定查询参数
         * @param name 指定参数名称
         */
        function param(name) {
            let params = this.params();
            return params.firstOrDefault((c) => {
                if (c.key === name) {
                    return true;
                }
            });
        }
        urls.param = param;
        /**
         * 修改当前地址栏hash值，并触发hashchange事件
         * 如果当前hash值与要修改的值相同，则只触发hashchange事件
         * @param newHash
         */
        function changeHash(newHash) {
            if (strings.equalsIgnoreCase(window.location.hash, newHash)) {
                let event = new HashChangeEvent("hashchange", { oldURL: window.location.href, newURL: newHash });
                window.dispatchEvent(event);
            }
            else {
                window.location.hash = newHash;
            }
        }
        urls.changeHash = changeHash;
    })(urls = ibas.urls || (ibas.urls = {}));
    /**
     * 数组
     */
    let arrays;
    (function (arrays) {
        /**
         * 排序
         * @param sorts 排序方式
         * @param datas 数据
         */
        function sort(datas, sorts) {
            if (objects.isNull(sorts) || sorts.length === 0) {
                return datas;
            }
            let newDatas = datas.sort((c, b) => {
                let compare = 0;
                for (let sort of sorts) {
                    compare = 0;
                    let cValue = objects.getPropertyValue(sort.alias, c);
                    let bValue = objects.getPropertyValue(sort.alias, b);
                    if (objects.isNull(cValue) && objects.isNull(bValue)) {
                        // 均空，一样
                        compare = 0;
                    }
                    else if (objects.isNull(cValue) && !objects.isNull(bValue)) {
                        // c，空，b不空，b大
                        compare = 1;
                    }
                    else if (!objects.isNull(cValue) && objects.isNull(bValue)) {
                        // c，不空，b空，c大
                        compare = -1;
                    }
                    else {
                        // 均不为空，调用比较
                        if (typeof cValue === "number" && typeof bValue === "number") {
                            let valueC = Number(cValue);
                            let valueB = Number(bValue);
                            if (valueC > valueB) {
                                compare = -1;
                            }
                            else if (valueC < valueB) {
                                compare = 1;
                            }
                            else {
                                compare = 0;
                            }
                        }
                        else if (dates.isDate(cValue) && dates.isDate(bValue)) {
                            // 日期类型比较
                            compare = dates.compare(cValue, bValue);
                        }
                        else {
                            // 默认字符串比较
                            compare = cValue.toString().localeCompare(bValue.toString());
                        }
                    }
                    if (sort.sortType === ibas.emSortType.ASCENDING) {
                        // 升序则比较值取反
                        compare = -compare;
                    }
                    if (compare !== 0) {
                        // 已出比较结果，不在继续
                        break;
                    }
                }
                return compare;
            });
            return newDatas;
        }
        arrays.sort = sort;
    })(arrays = ibas.arrays || (ibas.arrays = {}));
})(ibas || (ibas = {}));
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="./Data.ts" />
/// <reference path="./Logger.ts" />
/// <reference path="./Utils.ts" />
var ibas;
(function (ibas) {
    /** 配置项目-调试模式 */
    ibas.CONFIG_ITEM_DEBUG_MODE = "debug";
    /** 配置项目-公司代码 */
    ibas.CONFIG_ITEM_COMPANY = "company";
    /** 默认配置文件名称 */
    ibas.CONFIG_FILE_NAME = "config.json";
    /** 配置项目-运行时版本 */
    ibas.CONFIG_ITEM_RUNTIME_VERSION = "runtimeVersion";
    /** 配置项目-使用最小库 */
    ibas.CONFIG_ITEM_USE_MINIMUM_LIBRARY = "minLibrary";
    const PROPERTY_ITEMS = Symbol("items");
    const PROPERTY_LISTENER = Symbol("listener");
    /**
     * 配置
     */
    class Configuration {
        constructor() {
            this[PROPERTY_ITEMS] = new Map();
        }
        /**
         * 加载配置文件
         */
        load(address) {
            let that = this;
            let JQryAjxSetting = {
                url: address,
                type: "GET",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                cache: false,
                error: function (xhr, status, error) {
                    console.warn(ibas.strings.format("config: load file [{2}] faild [{0} - {1}].", status, error, address));
                },
                success: function (data) {
                    console.log(ibas.strings.format("config: load file [{0}] successful.", address));
                    if (data !== undefined && data !== null) {
                        if (data.appSettings !== undefined && data.appSettings !== null) {
                            let setting = data.appSettings;
                            for (let name in setting) {
                                if (setting[name] !== undefined) {
                                    that.set(name, setting[name]);
                                }
                            }
                        }
                    }
                },
            };
            jQuery.ajax(JQryAjxSetting);
        }
        /**
         * 设置配置
         * @param key 项
         * @param value 值
         */
        set(key, value) {
            this[PROPERTY_ITEMS].set(key, value);
            // 触发值改变事件
            this.fireConfigurationChanged(key, value);
        }
        /**
         * 获取配置
         */
        get() {
            let key, defalut, type;
            if (arguments.length === 0) {
                throw new Error(ibas.strings.format("invaild param."));
            }
            // 配置项参数
            key = arguments[0];
            // 默认值参数
            if (arguments.length > 0) {
                defalut = arguments[1];
            }
            // 类型参数
            if (arguments.length > 1) {
                type = arguments[2];
            }
            let value;
            if (this[PROPERTY_ITEMS].has(key)) {
                // 配置了
                value = this[PROPERTY_ITEMS].get(key);
                if (defalut !== undefined) {
                    // 提供了默认值
                    if (typeof value !== typeof defalut) {
                        // 配置的值与默认值类型不符
                        if (type !== undefined) {
                            // 提供了转换参数
                            for (let item in type) {
                                if (ibas.strings.equalsIgnoreCase(value, item)) {
                                    return type[item];
                                }
                            }
                        }
                    }
                }
                return value;
            }
            else {
                // 未配置
                if (defalut !== undefined) {
                    return defalut;
                }
            }
            // 记录不能获取到的配置
            // this.log(emMessageLevel.DEBUG, strings.format("config: unable to get value for [{0}].", key));
            return undefined;
        }
        /** 返回配置项目 */
        all() {
            let items = new ibas.ArrayList();
            for (let item of this[PROPERTY_ITEMS].keys()) {
                items.add(new ibas.KeyValue(item, this[PROPERTY_ITEMS].get(item)));
            }
            return items;
        }
        log(level, message) {
            if (window.ibas !== undefined && window.ibas !== null
                && window.ibas.logger !== undefined && window.ibas.logger !== null) {
                let logger = window.ibas.logger;
                logger.log(level, message);
            }
            else {
                if (level === ibas.emMessageLevel.WARN) {
                    console.warn(message);
                }
                if (level === ibas.emMessageLevel.ERROR) {
                    console.error(message);
                }
                else {
                    console.log(message);
                }
            }
        }
        /** 替换字符串中的配置项，配置项示例：${Company} */
        applyVariables(value) {
            if (value !== undefined && value !== null && value.indexOf("${") >= 0) {
                if (this.variableMap == null) {
                    this.variableMap = new Map();
                }
                if (this.variableMap.has(value)) {
                    return this.variableMap.get(value);
                }
                let reg = new RegExp("\\$\\{([\\!a-zA-Z].*?)\\}");
                let results = reg.exec(value);
                if (results !== undefined && results !== null) {
                    for (let item of results) {
                        if (!item.startsWith("${") || !item.endsWith("}")) {
                            // 正则写不对，麻痹的不搞了
                            continue;
                        }
                        let key = item.replace("${", "").replace("}", "");
                        // 首字母小写
                        key = key.substring(0, 1).toLowerCase() + key.substring(1);
                        let cValue = this.get(key);
                        if (cValue !== undefined && cValue !== null) {
                            return value.replace(item, cValue);
                        }
                    }
                }
            }
            return value;
        }
        /**
         * 注册监听事件
         * @param listener 监听者
         */
        registerListener(listener) {
            if (listener === undefined || listener === null) {
                return;
            }
            if (this[PROPERTY_LISTENER] === undefined || this[PROPERTY_LISTENER] === null) {
                this[PROPERTY_LISTENER] = new Array();
            }
            this[PROPERTY_LISTENER].push(listener);
        }
        /** 触发语言改变事件 */
        fireConfigurationChanged(name, value) {
            if (this[PROPERTY_LISTENER] === undefined || this[PROPERTY_LISTENER] === null) {
                return;
            }
            for (let item of this[PROPERTY_LISTENER]) {
                item.onConfigurationChanged(name, value);
            }
        }
    }
    ibas.Configuration = Configuration;
    /** 配置实例 */
    ibas.config = new Configuration();
})(ibas || (ibas = {}));
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../common/Data.ts" />
/// <reference path="../common/Configuration.ts" />
/// <reference path="../common/I18N.ts" />
var ibas;
(function (ibas) {
    const PROPERTY_LISTENER = Symbol("listener");
    /**
     * 可监听的对象
     */
    class Bindable {
        /**
         * 注册监听事件
         * @param listener 监听者
         */
        registerListener(listener) {
            if (this[PROPERTY_LISTENER] === undefined) {
                this[PROPERTY_LISTENER] = new ibas.ArrayList();
            }
            this[PROPERTY_LISTENER].push(listener);
        }
        /** 移出监听实现 */
        removeListener() {
            if (ibas.objects.isNull(this[PROPERTY_LISTENER])) {
                return;
            }
            let listener = arguments[0];
            if (!ibas.objects.isNull(listener)) {
                for (let item of this[PROPERTY_LISTENER]) {
                    if (item === listener) {
                        this[PROPERTY_LISTENER].remove(item);
                    }
                }
            }
        }
        /**
         * 通知属性改变
         * @param property 属性
         */
        firePropertyChanged(property) {
            if (ibas.objects.isNull(this[PROPERTY_LISTENER])) {
                return;
            }
            if (!ibas.objects.isNull(property) && property.length > 0) {
                if (property.startsWith("_")) {
                    // 除去映射符
                    property = property.substring(1);
                }
                // 属性首字母小写
                property = property[0].toLowerCase() + property.substring(1);
            }
            for (let item of this[PROPERTY_LISTENER]) {
                if (ibas.objects.isNull(item.caller)) {
                    item.propertyChanged(property);
                }
                else {
                    item.propertyChanged.apply(item.caller, [property, this]);
                }
            }
        }
    }
    ibas.Bindable = Bindable;
    const PROPERTY_ISLOADING = Symbol("isLoading");
    /**
     * 状态跟踪对象
     */
    class TrackableBase extends Bindable {
        constructor() {
            super();
            this.isNew = true;
            this.isDirty = true;
            this.isDeleted = false;
            this.isLoading = false;
            this.isSavable = true;
        }
        /** 是否加载 */
        get isLoading() {
            return this[PROPERTY_ISLOADING];
        }
        set isLoading(value) {
            this[PROPERTY_ISLOADING] = value;
        }
        /**
         * 标记为未修改
         */
        markOld() {
            this.isNew = false;
            this.isDirty = false;
            this.isDeleted = false;
        }
        /**
         * 标记为新
         */
        markNew() {
            this.isNew = true;
            this.isDirty = true;
            this.isDeleted = false;
        }
        /**
         * 标记为删除
         */
        markDeleted() {
            this.isDirty = true;
            this.isDeleted = true;
        }
        /**
         * 对象置为脏
         */
        markDirty() {
            this.isDirty = true;
        }
        /**
         * 清除删除标记
         */
        clearDeleted() {
            this.isDirty = true;
            this.isDeleted = false;
        }
    }
    ibas.TrackableBase = TrackableBase;
    /**
     * 业务对象基础
     */
    class BusinessObjectBase extends TrackableBase {
        constructor() {
            super();
            this.isLoading = true;
            this.init();
            this.isLoading = false;
        }
        /**
         * 通知属性改变
         * @param property 属性
         */
        firePropertyChanged(property) {
            if (this.isLoading) {
                return;
            }
            if (!this.isDirty) {
                this.markDirty(false);
            }
            super.firePropertyChanged(property);
        }
        /**
         * 获取属性值
         */
        getProperty(property) {
            return this[property];
        }
        /**
         * 设置属性值
         */
        setProperty(property, value) {
            if (this.isLoading) {
                // 读取状态，直接赋值
                this[property] = value;
            }
            else {
                let oldValue = this[property];
                this[property] = value;
                if (oldValue !== value) {
                    // 值发生变化触发属性改变
                    this.firePropertyChanged(property);
                }
            }
        }
        /**
         * 获取对象属性
         * @param recursive 递归
         */
        getProperties(recursive) {
            let properties = new Map();
            // 遍历属性名称
            for (let item in this) {
                if (this[item] === undefined) {
                    continue;
                }
                let name = item;
                let value = this[name];
                properties.set(name, value);
                if (recursive) {
                    // 遍历子项
                    if (Array.isArray(value)) {
                        // 数组子项，生成格式为： items[0].name {object}
                        let index = 0;
                        for (let sub of value) {
                            let subName = name + "[" + index + "]";
                            properties.set(subName, sub);
                            if (sub.getProperties !== undefined) {
                                for (let subSub of sub.getProperties(recursive)) {
                                    let subSubName = subName + "." + subSub[0];
                                    properties.set(subSubName, subSub[1]);
                                }
                            }
                            index++;
                        }
                    }
                    else if (value.getProperties !== undefined) {
                        // 存在此方法，则调用，生成格式： user.userCode
                        for (let sub of value.getProperties(recursive)) {
                            let subName = name + "." + sub[0];
                            properties.set(subName, sub[1]);
                        }
                    }
                }
            }
            return properties;
        }
        getChildBOs() {
            let childs = new Map();
            // 遍历属性名称
            for (let item of this.getProperties(true)) {
                let name = item[0];
                let value = item[1];
                if (ibas.objects.instanceOf(value, BusinessObjectBase)) {
                    // 继承此类，则认为是IBusinessObject
                    childs.set(name, value);
                }
            }
            return childs;
        }
        markOld() {
            super.markOld();
            let recursive = arguments[0];
            if (recursive !== undefined && recursive === true) {
                for (let item of this.getChildBOs()) {
                    let value = item[1];
                    if (value.markOld !== undefined) {
                        value.markOld(false); // 此处不再递归，因为已处于递归环境
                    }
                }
            }
        }
        markNew() {
            super.markNew();
            let recursive = arguments[0];
            if (recursive !== undefined && recursive === true) {
                for (let item of this.getChildBOs()) {
                    let value = item[1];
                    if (value.markNew !== undefined) {
                        value.markNew(false); // 此处不再递归，因为已处于递归环境
                    }
                }
            }
        }
        markDeleted() {
            super.markDeleted();
            let recursive = arguments[0];
            if (recursive !== undefined && recursive === true) {
                for (let item of this.getChildBOs()) {
                    let value = item[1];
                    if (value.markDeleted !== undefined) {
                        value.markDeleted(false); // 此处不再递归，因为已处于递归环境
                    }
                }
            }
        }
        markDirty() {
            super.markDirty();
            let recursive = arguments[0];
            if (recursive !== undefined && recursive === true) {
                for (let item of this.getChildBOs()) {
                    let value = item[1];
                    if (value.markDirty !== undefined) {
                        value.markDirty(false); // 此处不再递归，因为已处于递归环境
                    }
                }
            }
        }
        clearDeleted() {
            super.clearDeleted();
            let recursive = arguments[0];
            if (recursive !== undefined && recursive === true) {
                for (let item of this.getChildBOs()) {
                    let value = item[1];
                    if (value.clearDeleted !== undefined) {
                        value.clearDeleted(false); // 此处不再递归，因为已处于递归环境
                    }
                }
            }
        }
        /** 移出监听实现 */
        removeListener() {
            super.removeListener(arguments[0]);
            let recursive = arguments[0];
            if (recursive === true) {
                for (let item of this.getChildBOs()) {
                    let value = item[1];
                    if (value.removeListener !== undefined) {
                        value.removeListener(false);
                    }
                }
            }
        }
    }
    ibas.BusinessObjectBase = BusinessObjectBase;
    /**
     * 业务对象集合基础
     */
    class BusinessObjectsBase extends ibas.ArrayList {
        constructor() {
            super();
        }
        add() {
            // 无效值不做处理
            if (arguments === null || arguments === undefined) {
                return;
            }
            for (let arg of arguments) {
                if (arg instanceof Array) {
                    for (let item of arg) {
                        super.add(item);
                        this.afterAdd(item);
                    }
                }
                else {
                    super.add(arg);
                    this.afterAdd(arg);
                }
            }
        }
        /**
         * 添加项目后
         * @param item 项目
         */
        afterAdd(item) {
            // 可重载
        }
        /**
         * 移出项目（新数据，则移出集合；否则，标记删除）
         * @param item 项目
         */
        remove(item) {
            // 无效值不做处理
            if (item === null || item === undefined) {
                return null;
            }
            // 不是集合值
            if (!this.contain(item)) {
                return null;
            }
            if (!item.isNew) {
                item.delete();
                return false;
            }
            else {
                super.remove(item);
                this.afterRemove(item);
                return true;
            }
        }
        /**
         * 移出项目后
         * @param item 项目
         */
        afterRemove(item) {
            // 可重载
        }
        /** 过滤删除的项目 */
        filterDeleted() {
            return super.where((item) => {
                if (!item.isDeleted) {
                    return true;
                }
            });
        }
    }
    ibas.BusinessObjectsBase = BusinessObjectsBase;
    /** 业务对象工厂 */
    class BOFactory {
        constructor() {
            /** 业务对象字典 */
            this.boMap = new Map();
        }
        /** 注册对象 */
        register() {
            let bo, name;
            if (arguments.length === 1) {
                // 没有提供名称，则注册到模块
                bo = arguments[0];
                if (ibas.objects.isNull(bo)) {
                    return;
                }
                name = ibas.objects.getName(bo);
                if (ibas.strings.isEmpty(name)) {
                    throw new Error(ibas.i18n.prop("sys_unrecognized_data"));
                }
                this.boMap.set(name, bo);
            }
            else if (arguments.length === 2) {
                // 提供名称，则注册到全局
                name = arguments[0];
                if (ibas.strings.isEmpty(name)) {
                    throw new Error(ibas.i18n.prop("sys_unrecognized_data"));
                }
                name = ibas.config.applyVariables(name); // 去除变量
                bo = arguments[1];
                if (ibas.objects.isNull(bo)) {
                    return;
                }
                if (this !== ibas.boFactory) {
                    // 注册到模块
                    this.register(bo);
                    // 注册到全局
                    ibas.boFactory.register(name, bo);
                }
                else {
                    this.boMap.set(name, bo);
                }
            }
        }
        /** 获取对象类型，参数1：对象名称 */
        classOf(name) {
            // 去除变量
            name = ibas.config.applyVariables(name);
            if (this.boMap.has(name)) {
                return this.boMap.get(name);
            }
            throw new Error(ibas.i18n.prop("sys_bo_not_registered", name));
        }
        /** 创建对象实例，参数1：对象名称 */
        create(name) {
            let bo = this.classOf(name);
            if (ibas.objects.isNull(bo) && ibas.objects.isAssignableFrom(bo, BusinessObjectBase)) {
                throw new Error(ibas.i18n.prop("sys_bo_type_invalid", name));
            }
            let instance = new bo;
            return instance;
        }
    }
    ibas.BOFactory = BOFactory;
    /** 业务对象工厂实例 */
    ibas.boFactory = new BOFactory();
})(ibas || (ibas = {}));
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../common/Data.ts" />
/// <reference path="./BusinessObjectCore.ts" />
var ibas;
(function (ibas) {
    /** 业务对象属性名称-DocEntry */
    ibas.BO_PROPERTY_NAME_DOCENTRY = "docEntry";
    /** 业务对象属性名称-Code */
    ibas.BO_PROPERTY_NAME_CODE = "code";
    /** 业务对象属性名称-Name */
    ibas.BO_PROPERTY_NAME_NAME = "name";
    /** 业务对象属性名称-ObjectKey */
    ibas.BO_PROPERTY_NAME_OBJECTKEY = "objectKey";
    /** 业务对象属性名称-LineId */
    ibas.BO_PROPERTY_NAME_LINEID = "lineId";
    /** 业务对象属性名称-objectCode */
    ibas.BO_PROPERTY_NAME_OBJECTCODE = "objectCode";
    /** 业务对象属性名称-documentStatus */
    ibas.BO_PROPERTY_NAME_DOCUMENTSTATUS = "documentStatus";
    /** 业务对象属性名称-canceled */
    ibas.BO_PROPERTY_NAME_CANCELED = "canceled";
    /** 业务对象属性名称-approvalStatus */
    ibas.BO_PROPERTY_NAME_APPROVALSTATUS = "approvalStatus";
    /** 业务对象属性名称-deleted */
    ibas.BO_PROPERTY_NAME_DELETED = "deleted";
    /** 业务对象属性名称-lineStatus */
    ibas.BO_PROPERTY_NAME_LINESTATUS = "lineStatus";
    /** 需要被重置的属性名称 */
    const NEED_BE_RESET_PROPERTIES = [
        "createDate", "createTime", "updateDate", "updateTime", "logInst", "createUserSign", "updateUserSign", "createActionId", "updateActionId",
        "referenced", "canceled", "deleted", "approvalStatus", "lineStatus", "status", "documentStatus"
    ];
    /**
     * 业务对象基类
     */
    class BusinessObject extends ibas.BusinessObjectBase {
        /** 构造 */
        constructor() {
            super();
            // 注册属性改变监听
            this.initRules();
            let that = this;
            this.registerListener({
                propertyChanged(name) {
                    that.onPropertyChanged(name);
                }
            });
        }
        /** 删除 */
        delete() {
            this.markDeleted(true);
            super.firePropertyChanged("isDeleted");
        }
        /** 克隆对象 */
        clone() {
            let newBO = ibas.objects.clone(this);
            // 设置为新对象
            newBO.markNew(true);
            // 重置部分属性值
            newBO.isLoading = true;
            for (let item of NEED_BE_RESET_PROPERTIES) {
                if (newBO[item] !== undefined) {
                    newBO[item] = undefined;
                }
            }
            newBO.isLoading = false;
            return newBO;
        }
        /** 属性改变时 */
        onPropertyChanged(name) {
            // 属性改变时调用，可重载此函数加入业务逻辑
        }
        /**
         * 初始化业务规则
         */
        initRules() {
            let myRules = ibas.businessRulesManager.getRules(ibas.objects.getType(this));
            if (ibas.objects.isNull(myRules)) {
                return;
            }
            if (myRules.initialized) {
                return;
            }
            let rules = this.registerRules();
            if (ibas.objects.isNull(rules) || rules.length === 0) {
                return;
            }
            myRules.register(rules);
            myRules.initialized = true;
        }
        /**
         * 注册的业务规则
         */
        registerRules() {
            return null;
        }
        firePropertyChanged(property) {
            if (this.isLoading) {
                return;
            }
            let myRules = ibas.businessRulesManager.getRules(ibas.objects.getType(this));
            if (ibas.objects.isNull(myRules)) {
                return;
            }
            myRules.execute(this, property);
            super.firePropertyChanged(property);
        }
        get userFields() {
            if (ibas.objects.isNull(this.UserFields)) {
                this.UserFields = new UserFields(this);
                this.UserFields.registers();
            }
            return this.UserFields;
        }
    }
    ibas.BusinessObject = BusinessObject;
    const PROPERTY_LISTENER = Symbol("listener");
    const PROPERTY_PARENT = Symbol("parent");
    const PROPERTY_RULES = Symbol("rules");
    /**
     * 业务对象集合基类
     */
    class BusinessObjects extends ibas.BusinessObjectsBase {
        /**
         * 构造
         * @param parent 父项
         */
        constructor(parent) {
            super();
            this[PROPERTY_LISTENER] = {
                caller: this,
                propertyChanged(name) {
                    // this指向业务对象集合基类,arguments[1]指向触发事件的BO
                    let bo = arguments[1];
                    if (ibas.objects.isNull(bo)) {
                        return;
                    }
                    if (this.parent === bo) {
                        this.onParentPropertyChanged(name);
                    }
                    else {
                        if (name === "isDeleted") {
                            this.runRules(null);
                        }
                        else {
                            this.runRules(name);
                        }
                        this.onChildPropertyChanged(bo, name);
                    }
                }
            };
            if (!ibas.objects.isNull(parent)) {
                this.parent = parent;
            }
        }
        get parent() {
            return this[PROPERTY_PARENT];
        }
        set parent(value) {
            if (ibas.objects.instanceOf(this.parent, ibas.Bindable)) {
                this.parent.removeListener(this[PROPERTY_LISTENER]);
            }
            this[PROPERTY_PARENT] = value;
            if (ibas.objects.instanceOf(this.parent, ibas.Bindable)) {
                this.parent.registerListener(this[PROPERTY_LISTENER]);
            }
        }
        /** 父项属性改变时 */
        onParentPropertyChanged(name) {
            // 父项属性改变时调用，可重载此函数加入业务逻辑
            if (ibas.strings.equalsIgnoreCase(name, ibas.BO_PROPERTY_NAME_OBJECTKEY)) {
                if (ibas.objects.instanceOf(this.parent, BOSimple)
                    || ibas.objects.instanceOf(this.parent, BOSimpleLine)) {
                    // 简单对象
                    for (let item of this) {
                        if (ibas.objects.instanceOf(item, BOSimple)
                            || ibas.objects.instanceOf(item, BOSimpleLine)) {
                            item.setProperty(ibas.BO_PROPERTY_NAME_OBJECTKEY, this.parent.getProperty(ibas.BO_PROPERTY_NAME_OBJECTKEY));
                        }
                    }
                }
            }
            else if (ibas.strings.equalsIgnoreCase(name, ibas.BO_PROPERTY_NAME_CODE)) {
                if (ibas.objects.instanceOf(this.parent, BOMasterData)
                    || ibas.objects.instanceOf(this.parent, BOMasterDataLine)) {
                    // 主数据
                    for (let item of this) {
                        if (ibas.objects.instanceOf(item, BOMasterData)
                            || ibas.objects.instanceOf(item, BOMasterDataLine)) {
                            item.setProperty(ibas.BO_PROPERTY_NAME_CODE, this.parent.getProperty(ibas.BO_PROPERTY_NAME_CODE));
                        }
                    }
                }
            }
            else if (ibas.strings.equalsIgnoreCase(name, ibas.BO_PROPERTY_NAME_DOCENTRY)) {
                if (ibas.objects.instanceOf(this.parent, BODocument)
                    || ibas.objects.instanceOf(this.parent, BODocumentLine)) {
                    // 单据
                    for (let item of this) {
                        if (ibas.objects.instanceOf(item, BODocument)
                            || ibas.objects.instanceOf(item, BODocumentLine)) {
                            item.setProperty(ibas.BO_PROPERTY_NAME_DOCENTRY, this.parent.getProperty(ibas.BO_PROPERTY_NAME_DOCENTRY));
                        }
                    }
                }
            }
            else if (ibas.strings.equalsIgnoreCase(name, ibas.BO_PROPERTY_NAME_DOCUMENTSTATUS)) {
                if (ibas.objects.instanceOf(this.parent, BODocument)) {
                    // 单据
                    for (let item of this) {
                        if (ibas.objects.instanceOf(item, BODocument)) {
                            item.setProperty(ibas.BO_PROPERTY_NAME_DOCUMENTSTATUS, this.parent.getProperty(ibas.BO_PROPERTY_NAME_DOCUMENTSTATUS));
                        }
                        else if (ibas.objects.instanceOf(item, BODocumentLine)) {
                            item.setProperty(ibas.BO_PROPERTY_NAME_LINESTATUS, this.parent.getProperty(ibas.BO_PROPERTY_NAME_DOCUMENTSTATUS));
                        }
                    }
                }
            }
            else if (ibas.strings.equalsIgnoreCase(name, ibas.BO_PROPERTY_NAME_LINESTATUS)) {
                if (ibas.objects.instanceOf(this.parent, BODocumentLine)) {
                    // 单据
                    for (let item of this) {
                        if (ibas.objects.instanceOf(item, BODocument)) {
                            item.setProperty(ibas.BO_PROPERTY_NAME_DOCUMENTSTATUS, this.parent.getProperty(ibas.BO_PROPERTY_NAME_LINESTATUS));
                        }
                        else if (ibas.objects.instanceOf(item, BODocumentLine)) {
                            item.setProperty(ibas.BO_PROPERTY_NAME_LINESTATUS, this.parent.getProperty(ibas.BO_PROPERTY_NAME_LINESTATUS));
                        }
                    }
                }
            }
        }
        /** 子项属性改变时 */
        onChildPropertyChanged(item, name) {
            // 子项属性改变时调用，可重载此函数加入业务逻辑
        }
        /**
         * 添加项目后
         * @param item 项目
         */
        afterAdd(item) {
            if (!ibas.objects.isNull(this.parent)) {
                // 父项主键值给子项
                let docEntry = this.parent.getProperty(ibas.BO_PROPERTY_NAME_DOCENTRY);
                if (docEntry !== undefined) {
                    item.setProperty(ibas.BO_PROPERTY_NAME_DOCENTRY, docEntry);
                }
                let objectKey = this.parent.getProperty(ibas.BO_PROPERTY_NAME_OBJECTKEY);
                if (objectKey !== undefined) {
                    item.setProperty(ibas.BO_PROPERTY_NAME_OBJECTKEY, objectKey);
                }
                let code = this.parent.getProperty(ibas.BO_PROPERTY_NAME_CODE);
                if (code !== undefined) {
                    item.setProperty(ibas.BO_PROPERTY_NAME_CODE, code);
                }
            }
            // 存在行编号，为其自动编号
            if (ibas.objects.instanceOf(item, BODocumentLine)
                || ibas.objects.instanceOf(item, BOMasterDataLine)
                || ibas.objects.instanceOf(item, BOSimpleLine)) {
                let max = 0;
                for (let tmp of this) {
                    let id = tmp.getProperty(ibas.BO_PROPERTY_NAME_LINEID);
                    if (!isNaN(id)) {
                        if (id > max) {
                            max = id;
                        }
                    }
                }
                item.setProperty(ibas.BO_PROPERTY_NAME_LINEID, max + 1);
            }
            // 处理单据状态
            if (ibas.objects.instanceOf(item, BODocumentLine)) {
                if (ibas.objects.instanceOf(this.parent, BODocument)) {
                    item.setProperty(ibas.BO_PROPERTY_NAME_LINESTATUS, this.parent.getProperty(ibas.BO_PROPERTY_NAME_DOCUMENTSTATUS));
                }
                else if (ibas.objects.instanceOf(this.parent, BODocumentLine)) {
                    item.setProperty(ibas.BO_PROPERTY_NAME_LINESTATUS, this.parent.getProperty(ibas.BO_PROPERTY_NAME_LINESTATUS));
                }
            }
            if (ibas.objects.instanceOf(item, ibas.Bindable)) {
                item.registerListener(this[PROPERTY_LISTENER]);
            }
            this.runRules(null);
        }
        /**
         * 移出项目后
         * @param item 项目
         */
        afterRemove(item) {
            if (ibas.objects.instanceOf(item, ibas.Bindable)) {
                item.removeListener(this[PROPERTY_LISTENER]);
            }
            this.runRules(null);
        }
        runRules(property) {
            if (ibas.objects.isNull(this.parent)) {
                return;
            }
            if (this.parent.isLoading) {
                return;
            }
            if (ibas.objects.isNull(this[PROPERTY_RULES])) {
                this[PROPERTY_RULES] = ibas.businessRulesManager.getRules(ibas.objects.getType(this.parent));
            }
            if (ibas.objects.isNull(this[PROPERTY_RULES])) {
                return;
            }
            for (let rule of this[PROPERTY_RULES]) {
                if (!(rule instanceof ibas.BusinessRuleCollection)) {
                    continue;
                }
                if (this.parent.getProperty(rule.collection) !== this) {
                    // 不是为此集合规则
                    continue;
                }
                if (!ibas.strings.isEmpty(property) && !ibas.objects.isNull(rule.inputProperties)) {
                    // 根据属性筛选规则
                    let done = false;
                    for (let item of rule.inputProperties) {
                        if (ibas.strings.equalsIgnoreCase(item, property)) {
                            done = true;
                            break;
                        }
                    }
                    if (!done) {
                        continue;
                    }
                }
                try {
                    rule.execute(this.parent);
                }
                catch (error) {
                    ibas.logger.log(error);
                }
            }
        }
    }
    ibas.BusinessObjects = BusinessObjects;
    /**
     * 统一命名
     * @param value 待重命名属性
     */
    function naming(value) {
        if (!ibas.strings.isEmpty(value)) {
            return value[0].toUpperCase() + value.substring(1);
        }
        return value;
    }
    /**
     * 单据对象基类
     */
    class BODocument extends BusinessObject {
        /** 获取查询 */
        criteria() {
            let criteria = new ibas.Criteria();
            let condition = criteria.conditions.create();
            condition.alias = ibas.BO_PROPERTY_NAME_DOCENTRY;
            condition.value = this[ibas.BO_PROPERTY_NAME_DOCENTRY];
            return criteria;
        }
        /** 输出字符串 */
        toString() {
            let builder = new ibas.StringBuilder();
            builder.append("{");
            builder.append("[");
            builder.append(this[ibas.BO_PROPERTY_NAME_OBJECTCODE]);
            builder.append("].");
            builder.append("[");
            builder.append(naming(ibas.BO_PROPERTY_NAME_DOCENTRY));
            builder.append(" ");
            builder.append("=");
            builder.append(" ");
            builder.append(this[ibas.BO_PROPERTY_NAME_DOCENTRY]);
            builder.append("]");
            builder.append("}");
            return builder.toString();
        }
    }
    ibas.BODocument = BODocument;
    /**
     * 单据行对象基类
     */
    class BODocumentLine extends BusinessObject {
        /** 获取查询 */
        criteria() {
            let criteria = new ibas.Criteria();
            let condition = criteria.conditions.create();
            condition.alias = ibas.BO_PROPERTY_NAME_DOCENTRY;
            condition.value = this[ibas.BO_PROPERTY_NAME_DOCENTRY];
            condition = criteria.conditions.create();
            condition.alias = ibas.BO_PROPERTY_NAME_LINEID;
            condition.value = this[ibas.BO_PROPERTY_NAME_LINEID];
            return criteria;
        }
        /** 输出字符串 */
        toString() {
            let builder = new ibas.StringBuilder();
            builder.append("{");
            builder.append("[");
            builder.append(this[ibas.BO_PROPERTY_NAME_OBJECTCODE]);
            builder.append("].");
            builder.append("[");
            builder.append(naming(ibas.BO_PROPERTY_NAME_DOCENTRY));
            builder.append(" ");
            builder.append("=");
            builder.append(" ");
            builder.append(this[ibas.BO_PROPERTY_NAME_DOCENTRY]);
            builder.append("]");
            builder.append("&");
            builder.append("[");
            builder.append(naming(ibas.BO_PROPERTY_NAME_LINEID));
            builder.append(" ");
            builder.append("=");
            builder.append(" ");
            builder.append(this[ibas.BO_PROPERTY_NAME_LINEID]);
            builder.append("]");
            builder.append("}");
            return builder.toString();
        }
    }
    ibas.BODocumentLine = BODocumentLine;
    /**
     * 主数据对象基类
     */
    class BOMasterData extends BusinessObject {
        /** 获取查询 */
        criteria() {
            let criteria = new ibas.Criteria();
            let condition = criteria.conditions.create();
            condition.alias = ibas.BO_PROPERTY_NAME_CODE;
            condition.value = this[ibas.BO_PROPERTY_NAME_CODE];
            return criteria;
        }
        /** 输出字符串 */
        toString() {
            let builder = new ibas.StringBuilder();
            builder.append("{");
            builder.append("[");
            builder.append(this[ibas.BO_PROPERTY_NAME_OBJECTCODE]);
            builder.append("].");
            builder.append("[");
            builder.append(naming(ibas.BO_PROPERTY_NAME_CODE));
            builder.append(" ");
            builder.append("=");
            builder.append(" ");
            builder.append(this[ibas.BO_PROPERTY_NAME_CODE]);
            builder.append("]");
            builder.append("}");
            return builder.toString();
        }
    }
    ibas.BOMasterData = BOMasterData;
    /**
     * 主数据行对象基类
     */
    class BOMasterDataLine extends BusinessObject {
        /** 获取查询 */
        criteria() {
            let criteria = new ibas.Criteria();
            let condition = criteria.conditions.create();
            condition.alias = ibas.BO_PROPERTY_NAME_CODE;
            condition.value = this[ibas.BO_PROPERTY_NAME_CODE];
            condition = criteria.conditions.create();
            condition.alias = ibas.BO_PROPERTY_NAME_LINEID;
            condition.value = this[ibas.BO_PROPERTY_NAME_LINEID];
            return criteria;
        }
        /** 输出字符串 */
        toString() {
            let builder = new ibas.StringBuilder();
            builder.append("{");
            builder.append("[");
            builder.append(this[ibas.BO_PROPERTY_NAME_OBJECTCODE]);
            builder.append("].");
            builder.append("[");
            builder.append(naming(ibas.BO_PROPERTY_NAME_CODE));
            builder.append(" ");
            builder.append("=");
            builder.append(" ");
            builder.append(this[ibas.BO_PROPERTY_NAME_CODE]);
            builder.append("]");
            builder.append("&");
            builder.append("[");
            builder.append(naming(ibas.BO_PROPERTY_NAME_LINEID));
            builder.append(" ");
            builder.append("=");
            builder.append(" ");
            builder.append(this[ibas.BO_PROPERTY_NAME_LINEID]);
            builder.append("]");
            builder.append("}");
            return builder.toString();
        }
    }
    ibas.BOMasterDataLine = BOMasterDataLine;
    /**
     * 简单对象基类
     */
    class BOSimple extends BusinessObject {
        /** 获取查询 */
        criteria() {
            let criteria = new ibas.Criteria();
            let condition = criteria.conditions.create();
            condition.alias = ibas.BO_PROPERTY_NAME_OBJECTKEY;
            condition.value = this[ibas.BO_PROPERTY_NAME_OBJECTKEY];
            return criteria;
        }
        /** 输出字符串 */
        toString() {
            let builder = new ibas.StringBuilder();
            builder.append("{");
            builder.append("[");
            builder.append(this[ibas.BO_PROPERTY_NAME_OBJECTCODE]);
            builder.append("].");
            builder.append("[");
            builder.append(naming(ibas.BO_PROPERTY_NAME_OBJECTKEY));
            builder.append(" ");
            builder.append("=");
            builder.append(" ");
            builder.append(this[ibas.BO_PROPERTY_NAME_OBJECTKEY]);
            builder.append("]");
            builder.append("}");
            return builder.toString();
        }
    }
    ibas.BOSimple = BOSimple;
    /**
     * 简单行对象基类
     */
    class BOSimpleLine extends BusinessObject {
        /** 获取查询 */
        criteria() {
            let criteria = new ibas.Criteria();
            let condition = criteria.conditions.create();
            condition.alias = ibas.BO_PROPERTY_NAME_OBJECTKEY;
            condition.value = this[ibas.BO_PROPERTY_NAME_OBJECTKEY];
            condition = criteria.conditions.create();
            condition.alias = ibas.BO_PROPERTY_NAME_LINEID;
            condition.value = this[ibas.BO_PROPERTY_NAME_LINEID];
            return criteria;
        }
        /** 输出字符串 */
        toString() {
            let builder = new ibas.StringBuilder();
            builder.append("{");
            builder.append("[");
            builder.append(this[ibas.BO_PROPERTY_NAME_OBJECTCODE]);
            builder.append("].");
            builder.append("[");
            builder.append(naming(ibas.BO_PROPERTY_NAME_OBJECTKEY));
            builder.append(" ");
            builder.append("=");
            builder.append(" ");
            builder.append(this[ibas.BO_PROPERTY_NAME_OBJECTKEY]);
            builder.append("]");
            builder.append("&");
            builder.append("[");
            builder.append(naming(ibas.BO_PROPERTY_NAME_LINEID));
            builder.append(" ");
            builder.append("=");
            builder.append(" ");
            builder.append(this[ibas.BO_PROPERTY_NAME_LINEID]);
            builder.append("]");
            builder.append("}");
            return builder.toString();
        }
    }
    ibas.BOSimpleLine = BOSimpleLine;
    /** 用户字段 */
    class UserField {
        get name() {
            return this.Name;
        }
        set name(value) {
            this.Name = value;
        }
        get valueType() {
            return this.ValueType;
        }
        set valueType(value) {
            this.ValueType = value;
        }
        get value() {
            return this.Value;
        }
        set value(value) {
            this.Value = value;
        }
    }
    ibas.UserField = UserField;
    class UserFieldInfo {
    }
    class UserFieldManager {
        constructor() {
            this.userFieldInfos = new Map();
        }
        getInfos(type) {
            let infos = this.userFieldInfos.get(type);
            if (!ibas.objects.isNull(infos)) {
                return infos;
            }
            return new ibas.ArrayList();
        }
        register(type, name, valueType) {
            let infos = this.userFieldInfos.get(type);
            if (ibas.objects.isNull(infos)) {
                infos = new ibas.ArrayList();
                this.userFieldInfos.set(type, infos);
            }
            let info = infos.firstOrDefault(c => c.name === name);
            if (ibas.objects.isNull(info)) {
                info = new UserFieldInfo();
                info.name = name;
                info.valueType = valueType;
                infos.add(info);
            }
            return info;
        }
        create(info) {
            let userField = null;
            if (info.valueType === ibas.emDbFieldType.DATE) {
                userField = new UserField();
            }
            else if (info.valueType === ibas.emDbFieldType.NUMERIC) {
                userField = new UserField();
            }
            else if (info.valueType === ibas.emDbFieldType.DECIMAL) {
                userField = new UserField();
            }
            else {
                userField = new UserField();
            }
            return userField;
        }
    }
    const userFieldManager = new UserFieldManager();
    /** 用户字段集合 */
    class UserFields extends Array {
        constructor(bo) {
            super();
            this[PROPERTY_PARENT] = bo;
        }
        /** 注册全部用户字段 */
        registers() {
            for (let item of userFieldManager.getInfos(ibas.objects.getType(this[PROPERTY_PARENT]))) {
                this.register(item.name, item.valueType);
            }
        }
        /** 注册用户字段 */
        register(name, valueType) {
            for (let item of this) {
                if (item.name === name) {
                    return item;
                }
            }
            let info = userFieldManager.register(ibas.objects.getType(this[PROPERTY_PARENT]), name, valueType);
            let userField = userFieldManager.create(info);
            userField.name = name;
            userField.valueType = valueType;
            this.push(userField);
            return userField;
        }
        /** 大小 */
        size() {
            return this.length;
        }
        /** 变量集合 */
        forEach() {
            return this;
        }
        get() {
            let index = arguments[0];
            let userField = null;
            if (typeof index === "number") {
                userField = this[index];
            }
            else {
                for (let item of this) {
                    if (item.name === index) {
                        userField = item;
                        break;
                    }
                }
            }
            if (ibas.objects.isNull(userField)) {
                throw new Error(ibas.i18n.prop("sys_not_found_user_field", index));
            }
            return userField;
        }
    }
    ibas.UserFields = UserFields;
    /** 业务对象工具 */
    let businessobjects;
    (function (businessobjects) {
        /**
         * 业务对象名称
         * @param boCode 对象编码
         */
        function name(boCode) {
            try {
                return ibas.objects.getName(ibas.boFactory.classOf(boCode));
            }
            catch (error) {
                return boCode;
            }
        }
        businessobjects.name = name;
        /** 获取资源 */
        function resource(boName, field = undefined) {
            if (ibas.objects.isNull(field)) {
                // 对象
                let key = ibas.strings.format("bo_{0}", boName).toLowerCase();
                let value = ibas.i18n.prop(key);
                if (value.startsWith("[") && value.endsWith("]")) {
                    return boName;
                }
                else {
                    return value;
                }
            }
            else {
                // 属性
                let key = ibas.strings.format("bo_{0}_{1}", boName, field).toLowerCase();
                let value = ibas.i18n.prop(key);
                if (value.startsWith("[") && value.endsWith("]")) {
                    return field;
                }
                else {
                    return value;
                }
            }
        }
        /**
         * 描述业务对象
         * 如：{[CC_MM_ITEM].[Code = A00001]&[DocEntry = 3]}
         * @param boKeys 对象标记
         */
        function describe(boKeys) {
            if (ibas.strings.isEmpty(boKeys)) {
                return boKeys;
            }
            if (boKeys.startsWith("{[") && boKeys.endsWith("]}")) {
                boKeys = boKeys.substring(1, boKeys.length - 1);
                boKeys = ibas.strings.trim(boKeys);
                boKeys = ibas.strings.remove(boKeys, "[", "]");
                let values = boKeys.split(".");
                if (values.length === 2) {
                    let vFields = values[1].split("&");
                    if (vFields.length > 0) {
                        let boName = name(values[0]);
                        let builder = new ibas.StringBuilder();
                        builder.append(resource(boName));
                        builder.append(": ");
                        for (let field of vFields) {
                            field = field.trim();
                            if (ibas.strings.isEmpty(field)) {
                                continue;
                            }
                            if (builder.length > 2) {
                                builder.append(", ");
                            }
                            let tValues = field.split("=");
                            if (tValues.length !== 2) {
                                builder.append(field);
                            }
                            else {
                                builder.append(resource(boName, tValues[0]));
                                builder.append("-");
                                builder.append(tValues[1]);
                            }
                        }
                        return builder.toString();
                    }
                }
            }
            else {
                return resource(name(boKeys));
            }
            return boKeys;
        }
        businessobjects.describe = describe;
    })(businessobjects = ibas.businessobjects || (ibas.businessobjects = {}));
})(ibas || (ibas = {}));
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="./Data.ts" />
/// <reference path="./Enum.ts" />
/// <reference path="./Configuration.ts" />
/// <reference path="../bo/BusinessObject.ts" />
var ibas;
(function (ibas) {
    /**
     * 查询
     */
    class Criteria {
        constructor() {
            this.conditions = new Conditions();
            this.childCriterias = new ChildCriterias();
            this.sorts = new Sorts();
        }
        get businessObject() {
            return this.BusinessObject;
        }
        set businessObject(value) {
            this.BusinessObject = value;
        }
        get result() {
            return this.Result;
        }
        set result(value) {
            this.Result = value;
        }
        get noChilds() {
            return this.NoChilds;
        }
        set noChilds(value) {
            this.NoChilds = value;
        }
        get remarks() {
            return this.Remarks;
        }
        set remarks(value) {
            this.Remarks = value;
        }
        get conditions() {
            if (ibas.objects.isNull(this.Conditions)) {
                this.Conditions = new Conditions();
            }
            return this.Conditions;
        }
        set conditions(value) {
            this.Conditions = value;
        }
        get sorts() {
            if (ibas.objects.isNull(this.Sorts)) {
                this.Sorts = new Sorts();
            }
            return this.Sorts;
        }
        set sorts(value) {
            this.Sorts = value;
        }
        get childCriterias() {
            if (ibas.objects.isNull(this.ChildCriterias)) {
                this.ChildCriterias = new ChildCriterias();
            }
            return this.ChildCriterias;
        }
        set childCriterias(value) {
            this.ChildCriterias = value;
        }
        /**
         * 克隆
         */
        clone() {
            return ibas.objects.clone(this);
        }
        /**
         * 转换为字符串
         */
        toString() {
            let repeat = function (count, char) {
                let rChars = "";
                for (let index = 0; index < count; index++) {
                    rChars = rChars + char;
                }
                return rChars;
            };
            let builder = new ibas.StringBuilder();
            builder.append("{");
            for (let item of this.conditions) {
                if (builder.length > 1) {
                    builder.append(" ");
                    builder.append(this.charRelationship(item.relationship));
                    builder.append(" ");
                }
                builder.append(repeat(item.bracketOpen, "("));
                builder.append(item.toString());
                builder.append(repeat(item.bracketClose, ")"));
            }
            builder.append("}");
            return builder.toString();
        }
        charRelationship(value) {
            if (value === ibas.emConditionRelationship.OR) {
                return "||";
            }
            else {
                return "&&";
            }
        }
        /**
         * 计算下一结果集的查询条件
         * 注意BO多主键情况下，请自行修正
         * @param lastBO
         *            起始业务对象
         * @return 查询
         */
        next(lastBO) {
            if (lastBO != null) {
                let sortType = ibas.emSortType.ASCENDING;
                let operation = ibas.emConditionOperation.GRATER_THAN;
                if (this.sorts.length > 0) {
                    sortType = this.sorts[0].sortType;
                }
                if (sortType === ibas.emSortType.DESCENDING) {
                    operation = ibas.emConditionOperation.LESS_THAN;
                }
                let boCriteria = this.boCriteria(lastBO, operation);
                if (boCriteria == null) {
                    return null;
                }
                return this.copyFrom(boCriteria);
            }
            return null;
        }
        /**
         * 计算上一个结果集的查询条件
         * 注意BO多主键情况下，请自行修正
         * @param firstBO
         *            起始业务对象
         * @return 查询
         */
        previous(firstBO) {
            if (firstBO != null) {
                let sortType = ibas.emSortType.ASCENDING;
                let operation = ibas.emConditionOperation.LESS_THAN;
                if (this.sorts.length > 0) {
                    sortType = this.sorts[0].sortType;
                }
                if (sortType === ibas.emSortType.DESCENDING) {
                    operation = ibas.emConditionOperation.GRATER_THAN;
                }
                let boCriteria = this.boCriteria(firstBO, operation);
                if (boCriteria == null) {
                    return null;
                }
                return this.copyFrom(boCriteria);
            }
            return null;
        }
        boCriteria(bo, operation) {
            let boCriteria = null;
            // 判断BO类型，添加下个集合条件，尽量使用数值字段
            if (ibas.objects.instanceOf(bo, ibas.BODocument)
                || ibas.objects.instanceOf(bo, ibas.BOMasterData)) {
                boCriteria = new Criteria();
                let condition = boCriteria.conditions.create();
                condition.alias = ibas.BO_PROPERTY_NAME_DOCENTRY;
                condition.value = bo[ibas.BO_PROPERTY_NAME_DOCENTRY];
                condition.operation = operation;
            }
            else if (ibas.objects.instanceOf(bo, ibas.BOSimple)) {
                boCriteria = new Criteria();
                let condition = boCriteria.conditions.create();
                condition.alias = ibas.BO_PROPERTY_NAME_OBJECTKEY;
                condition.value = bo[ibas.BO_PROPERTY_NAME_OBJECTKEY];
                condition.operation = operation;
            }
            else if (ibas.objects.instanceOf(bo, ibas.BODocumentLine)) {
                boCriteria = new Criteria();
                // 父项相等时
                let condition = boCriteria.conditions.create();
                condition.bracketOpen = 2;
                condition.alias = ibas.BO_PROPERTY_NAME_DOCENTRY;
                condition.value = bo[ibas.BO_PROPERTY_NAME_DOCENTRY];
                condition = boCriteria.conditions.create();
                condition.bracketClose = 1;
                condition.alias = ibas.BO_PROPERTY_NAME_LINEID;
                condition.value = bo[ibas.BO_PROPERTY_NAME_LINEID];
                condition.operation = operation;
                condition = boCriteria.conditions.create();
                // 父项不相等时
                condition.bracketClose = 1;
                condition.alias = ibas.BO_PROPERTY_NAME_DOCENTRY;
                condition.value = bo[ibas.BO_PROPERTY_NAME_DOCENTRY];
                condition.operation = operation;
            }
            else if (ibas.objects.instanceOf(bo, ibas.BOMasterDataLine)) {
                boCriteria = new Criteria();
                // 父项相等时
                let condition = boCriteria.conditions.create();
                condition.bracketOpen = 2;
                condition.alias = ibas.BO_PROPERTY_NAME_CODE;
                condition.value = bo[ibas.BO_PROPERTY_NAME_CODE];
                condition = boCriteria.conditions.create();
                condition.bracketClose = 1;
                condition.alias = ibas.BO_PROPERTY_NAME_LINEID;
                condition.value = bo[ibas.BO_PROPERTY_NAME_LINEID];
                condition.operation = operation;
                condition = boCriteria.conditions.create();
                // 父项不相等时
                condition.bracketClose = 1;
                condition.alias = ibas.BO_PROPERTY_NAME_CODE;
                condition.value = bo[ibas.BO_PROPERTY_NAME_CODE];
                condition.operation = operation;
            }
            else if (ibas.objects.instanceOf(bo, ibas.BOSimpleLine)) {
                boCriteria = new Criteria();
                // 父项相等时
                let condition = boCriteria.conditions.create();
                condition.bracketOpen = 2;
                condition.alias = ibas.BO_PROPERTY_NAME_OBJECTKEY;
                condition.value = bo[ibas.BO_PROPERTY_NAME_OBJECTKEY];
                condition = boCriteria.conditions.create();
                condition.bracketClose = 1;
                condition.alias = ibas.BO_PROPERTY_NAME_LINEID;
                condition.value = bo[ibas.BO_PROPERTY_NAME_LINEID];
                condition.operation = operation;
                condition = boCriteria.conditions.create();
                // 父项不相等时
                condition.bracketClose = 1;
                condition.alias = ibas.BO_PROPERTY_NAME_OBJECTKEY;
                condition.value = bo[ibas.BO_PROPERTY_NAME_OBJECTKEY];
                condition.operation = operation;
            }
            // 不是标准类型
            if (boCriteria == null) {
                boCriteria = bo.criteria();
                for (let condition of boCriteria.conditions) {
                    condition.operation = operation;
                }
            }
            return boCriteria;
        }
        /**
         * 复制查询条件
         * @param criteria
         *            基于的查询
         * @return 查询
         */
        copyFrom(criteria) {
            let nCriteria = this.clone();
            if (criteria != null) {
                let tmpCriteria = criteria.clone();
                // 复制子项查询
                for (let tmpChildCriteria of tmpCriteria.childCriterias) {
                    if (ibas.objects.isNull(tmpChildCriteria.propertyPath)) {
                        continue;
                    }
                    let isNew = true;
                    for (let myChildCriteria of nCriteria.childCriterias) {
                        if (ibas.objects.isNull(myChildCriteria.propertyPath)) {
                            continue;
                        }
                        if (myChildCriteria.propertyPath === tmpChildCriteria.propertyPath) {
                            isNew = false;
                            break;
                        }
                    }
                    if (isNew) {
                        nCriteria.childCriterias.add(tmpChildCriteria);
                    }
                }
                // 复制查询条件
                if (nCriteria.conditions.length > 0) {
                    // 原始条件括号括起
                    let condition = nCriteria.conditions.firstOrDefault();
                    condition.bracketOpen = condition.bracketOpen + 1;
                    condition = nCriteria.conditions[nCriteria.conditions.length - 1];
                    condition.bracketClose = condition.bracketClose + 1;
                }
                if (tmpCriteria.conditions.length > 0) {
                    // 拷贝条件括号括起
                    let condition = tmpCriteria.conditions.firstOrDefault();
                    condition.bracketOpen = condition.bracketOpen + 1;
                    condition = tmpCriteria.conditions[tmpCriteria.conditions.length - 1];
                    condition.bracketClose = condition.bracketClose + 1;
                }
                for (let condition of tmpCriteria.conditions) {
                    nCriteria.conditions.add(condition);
                }
                // 复制排序条件
                for (let tmpSort of tmpCriteria.sorts) {
                    if (ibas.objects.isNull(tmpSort.alias)) {
                        continue;
                    }
                    let isNew = true;
                    for (let mySort of nCriteria.sorts) {
                        if (ibas.objects.isNull(mySort.alias)) {
                            continue;
                        }
                        if (mySort.alias === tmpSort.alias) {
                            isNew = false;
                            break;
                        }
                    }
                    if (isNew) {
                        nCriteria.sorts.add(tmpSort);
                    }
                }
            }
            return nCriteria;
        }
    }
    ibas.Criteria = Criteria;
    /**
     * 查询条件
     */
    class Condition {
        constructor() {
            this.alias = "";
            this.operation = ibas.emConditionOperation.EQUAL;
            this.relationship = ibas.emConditionRelationship.AND;
            this.bracketOpen = 0;
            this.bracketClose = 0;
            if (arguments[0] !== undefined) {
                this.alias = arguments[0];
            }
            if (arguments[1] !== undefined) {
                this.operation = arguments[1];
            }
            if (arguments[2] !== undefined) {
                this.value = arguments[2];
            }
        }
        get alias() {
            return this.Alias;
        }
        set alias(value) {
            this.Alias = value;
        }
        get bracketClose() {
            return this.BracketClose;
        }
        set bracketClose(value) {
            this.BracketClose = value;
        }
        get bracketOpen() {
            return this.BracketOpen;
        }
        set bracketOpen(value) {
            this.BracketOpen = value;
        }
        get comparedAlias() {
            return this.ComparedAlias;
        }
        set comparedAlias(value) {
            this.ComparedAlias = value;
        }
        get value() {
            return this.Value;
        }
        set value(value) {
            this.Value = value;
        }
        get operation() {
            return this.Operation;
        }
        set operation(value) {
            this.Operation = value;
        }
        get relationship() {
            return this.Relationship;
        }
        set relationship(value) {
            this.Relationship = value;
        }
        get remarks() {
            return this.Remarks;
        }
        set remarks(value) {
            this.Remarks = value;
        }
        /**
         * 转换为字符串
         */
        toString() {
            let builder = new ibas.StringBuilder();
            builder.map(undefined, "");
            builder.append("{");
            builder.append(this.alias);
            builder.append(" ");
            builder.append(this.charOperation(this.operation));
            builder.append(" ");
            builder.append(this.value);
            builder.append("}");
            return builder.toString();
        }
        charOperation(value) {
            switch (value) {
                case ibas.emConditionOperation.CONTAIN:
                    return "like";
                case ibas.emConditionOperation.END:
                    return "like";
                case ibas.emConditionOperation.EQUAL:
                    return "=";
                case ibas.emConditionOperation.GRATER_EQUAL:
                    return ">=";
                case ibas.emConditionOperation.GRATER_THAN:
                    return ">";
                case ibas.emConditionOperation.IS_NULL:
                    return "is null";
                case ibas.emConditionOperation.LESS_EQUAL:
                    return "<=";
                case ibas.emConditionOperation.LESS_THAN:
                    return "<";
                case ibas.emConditionOperation.NOT_CONTAIN:
                    return "not like";
                case ibas.emConditionOperation.NOT_EQUAL:
                    return "<>";
                case ibas.emConditionOperation.NOT_NULL:
                    return "not null";
                case ibas.emConditionOperation.START:
                    return "like";
                default:
                    return "?";
            }
        }
    }
    ibas.Condition = Condition;
    /**
     * 查询条件集合
     */
    class Conditions extends ibas.ArrayList {
        /**
         * 创建并返回新查询条件
         */
        create() {
            let item = new Condition();
            this.add(item);
            return item;
        }
    }
    ibas.Conditions = Conditions;
    /**
     * 排序
     */
    class Sort {
        constructor() {
            this.sortType = ibas.emSortType.ASCENDING;
            if (arguments[0] !== undefined) {
                this.alias = arguments[0];
            }
            if (arguments[1] !== undefined) {
                this.sortType = arguments[1];
            }
        }
        get alias() {
            return this.Alias;
        }
        set alias(value) {
            this.Alias = value;
        }
        get sortType() {
            return this.SortType;
        }
        set sortType(value) {
            this.SortType = value;
        }
        /**
         * 转换为字符串
         */
        toString() {
            let builder = new ibas.StringBuilder();
            builder.append("{");
            builder.append(this.alias);
            builder.append(" ");
            builder.append(ibas.emSortType[this.sortType]);
            builder.append("}");
            return builder.toString();
        }
    }
    ibas.Sort = Sort;
    /**
     * 排序集合
     */
    class Sorts extends ibas.ArrayList {
        /**
         * 创建并返回新排序
         */
        create() {
            let item = new Sort();
            this.add(item);
            return item;
        }
    }
    ibas.Sorts = Sorts;
    /**
     * 子项查询
     */
    class ChildCriteria extends Criteria {
        get propertyPath() {
            return this.PropertyPath;
        }
        set propertyPath(value) {
            this.PropertyPath = value;
        }
        get onlyHasChilds() {
            return this.OnlyHasChilds;
        }
        set onlyHasChilds(value) {
            this.OnlyHasChilds = value;
        }
    }
    ibas.ChildCriteria = ChildCriteria;
    /**
     * 子项查询集合
     */
    class ChildCriterias extends ibas.ArrayList {
        /**
         * 创建并返回子项查询
         */
        create() {
            let item = new ChildCriteria();
            this.add(item);
            return item;
        }
    }
    ibas.ChildCriterias = ChildCriterias;
    /** 查询结果集数量 */
    ibas.CONFIG_ITEM_CRITERIA_RESULT_COUNT = "resultCount";
    /**
     * 查询方法
     */
    let criterias;
    (function (criterias) {
        /**
         * 检查-排序字段
         * @param criteria 待处理查询
         */
        function resultCount(criteria) {
            if (ibas.objects.isNull(criteria)) {
                return criteria;
            }
            if (ibas.objects.isNull(criteria.result) || criteria.result < 1) {
                criteria.result = ibas.config.get(ibas.CONFIG_ITEM_CRITERIA_RESULT_COUNT, 30);
            }
            return criteria;
        }
        criterias.resultCount = resultCount;
        /**
         * 检查-排序字段
         * @param criteria 待处理查询
         * @param target 查询目标类型
         */
        function sorts(criteria, target) {
            if (ibas.objects.isNull(criteria) || ibas.objects.isNull(target)) {
                return criteria;
            }
            if (criteria.sorts.length !== 0) {
                return criteria;
            }
            if (ibas.objects.isAssignableFrom(target, ibas.BODocument)
                || ibas.objects.isAssignableFrom(target, ibas.BOMasterData)) {
                let sort = criteria.sorts.create();
                sort.alias = ibas.BO_PROPERTY_NAME_DOCENTRY;
                sort.sortType = ibas.emSortType.DESCENDING;
            }
            else if (ibas.objects.isAssignableFrom(target, ibas.BOSimple)) {
                let sort = criteria.sorts.create();
                sort.alias = ibas.BO_PROPERTY_NAME_OBJECTKEY;
                sort.sortType = ibas.emSortType.DESCENDING;
            }
            else if (ibas.objects.isAssignableFrom(target, ibas.BODocumentLine)) {
                let sort = criteria.sorts.create();
                sort.alias = ibas.BO_PROPERTY_NAME_DOCENTRY;
                sort.sortType = ibas.emSortType.DESCENDING;
                sort = criteria.sorts.create();
                sort.alias = ibas.BO_PROPERTY_NAME_LINEID;
                sort.sortType = ibas.emSortType.ASCENDING;
            }
            else if (ibas.objects.isAssignableFrom(target, ibas.BOMasterDataLine)) {
                let sort = criteria.sorts.create();
                sort.alias = ibas.BO_PROPERTY_NAME_CODE;
                sort.sortType = ibas.emSortType.DESCENDING;
                sort = criteria.sorts.create();
                sort.alias = ibas.BO_PROPERTY_NAME_LINEID;
                sort.sortType = ibas.emSortType.ASCENDING;
            }
            else if (ibas.objects.isAssignableFrom(target, ibas.BOSimpleLine)) {
                let sort = criteria.sorts.create();
                sort.alias = ibas.BO_PROPERTY_NAME_OBJECTKEY;
                sort.sortType = ibas.emSortType.DESCENDING;
                sort = criteria.sorts.create();
                sort.alias = ibas.BO_PROPERTY_NAME_LINEID;
                sort.sortType = ibas.emSortType.ASCENDING;
            }
            else if (ibas.objects.isAssignableFrom(target, ibas.BusinessObject)) {
                let bo = new target();
                let boCriteria = bo.criteria();
                if (!ibas.objects.isNull(boCriteria)) {
                    for (let item of boCriteria.conditions) {
                        let sort = criteria.sorts.create();
                        sort.alias = item.alias;
                        if (criteria.sorts.length === 0) {
                            sort.sortType = ibas.emSortType.DESCENDING;
                        }
                        else {
                            sort.sortType = ibas.emSortType.ASCENDING;
                        }
                    }
                }
            }
            return criteria;
        }
        criterias.sorts = sorts;
        function conditions() {
            let criteria, target, search, operation;
            criteria = arguments[0];
            target = arguments[1];
            search = arguments[2];
            operation = arguments[3];
            if (ibas.objects.isNull(criteria) || ibas.strings.isEmpty(search) || ibas.objects.isNull(target)) {
                return criteria;
            }
            // 默认like查询
            if (ibas.objects.isNull(operation)) {
                operation = ibas.emConditionOperation.CONTAIN;
            }
            if (criteria.conditions.length === 0) {
                // 添加主键查询
                if (ibas.objects.isAssignableFrom(target, ibas.BODocument)) {
                    let condition = criteria.conditions.create();
                    condition.alias = ibas.BO_PROPERTY_NAME_DOCENTRY;
                    condition.operation = operation;
                    condition.value = search;
                }
                else if (ibas.objects.isAssignableFrom(target, ibas.BOMasterData)) {
                    let condition = criteria.conditions.create();
                    condition.alias = ibas.BO_PROPERTY_NAME_CODE;
                    condition.operation = operation;
                    condition.value = search;
                    condition = criteria.conditions.create();
                    condition.relationship = ibas.emConditionRelationship.OR;
                    condition.alias = ibas.BO_PROPERTY_NAME_NAME;
                    condition.operation = operation;
                    condition.value = search;
                }
                else if (ibas.objects.isAssignableFrom(target, ibas.BOSimple)) {
                    let condition = criteria.conditions.create();
                    condition.alias = ibas.BO_PROPERTY_NAME_OBJECTKEY;
                    condition.operation = operation;
                    condition.value = search;
                }
            }
            return criteria;
        }
        criterias.conditions = conditions;
    })(criterias = ibas.criterias || (ibas.criterias = {}));
    /**
     * 检索条件项目：文件夹。如：documents，条件仅可等于，其他忽略。
     */
    ibas.CRITERIA_CONDITION_ALIAS_FOLDER = "FileFolder";
    /**
     * 检索条件项目：包含子文件夹。如： emYesNo.Yes，条件仅可等于，其他忽略。
     */
    ibas.CRITERIA_CONDITION_ALIAS_INCLUDE_SUBFOLDER = "IncludeSubfolder";
    /**
     * 检索条件项目：文件名称。如：ibas.*.jar，条件仅可等于，其他忽略。
     */
    ibas.CRITERIA_CONDITION_ALIAS_FILE_NAME = "FileName";
    /**
     * 检索条件项目：最后修改时间（文件时间）。如：1479965348，条件可等于，大小等于。
     */
    ibas.CRITERIA_CONDITION_ALIAS_MODIFIED_TIME = "ModifiedTime";
})(ibas || (ibas = {}));
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="./Data.ts" />
var ibas;
(function (ibas) {
    /**
     * 操作信息
     */
    class OperationInformation {
        constructor() {
            this.name = arguments[0];
            this.content = arguments[1];
            this.tag = arguments[2];
        }
    }
    ibas.OperationInformation = OperationInformation;
    /**
     * 操作消息
     */
    class OperationMessage {
        constructor() {
            if (arguments[0] instanceof Error) {
                this.resultCode = -1;
                this.message = arguments[0].message;
            }
            else {
                this.resultCode = 0;
                this.message = "";
            }
            this.time = new Date();
        }
    }
    ibas.OperationMessage = OperationMessage;
    /**
     * 操作消息结果
     */
    class OperationResult extends OperationMessage {
        constructor() {
            super(arguments[0]);
            this.resultObjects = new ibas.ArrayList();
            this.informations = new ibas.ArrayList();
        }
        addResults() {
            if (ibas.objects.isNull(arguments[0])) {
                return;
            }
            if (arguments[0] instanceof Array) {
                for (let item of arguments[0]) {
                    this.resultObjects.add(item);
                }
            }
            else {
                this.resultObjects.add(arguments[0]);
            }
        }
    }
    ibas.OperationResult = OperationResult;
})(ibas || (ibas = {}));
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
var ibas;
(function (ibas) {
    /** 等待者 */
    class Waiter {
        /** 注册监听 */
        register(listener) {
            if (!(this.listeners instanceof Array)) {
                this.listeners = new ibas.ArrayList();
            }
            this.listeners.add(listener);
        }
        /** 触发完成 */
        fireCompleted() {
            if (this.listeners instanceof Array) {
                for (let item of this.listeners) {
                    if (item.onCompleted instanceof Function) {
                        item.onCompleted.apply(item.onCompleted, arguments);
                    }
                }
            }
        }
    }
    ibas.Waiter = Waiter;
})(ibas || (ibas = {}));
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
var ibas;
(function (ibas) {
    /** 断言错误 */
    class AssertionError extends Error {
    }
    ibas.AssertionError = AssertionError;
    /**
     * 单元测试，断言相关
     */
    let asserts;
    (function (asserts) {
        /**
         * 断言相等
         * @param pars 参数
         */
        function equals() {
            let message, unexpected, actual;
            if (arguments.length === 2) {
                message = "assertion failure: not equals.";
                unexpected = arguments[0];
                actual = arguments[1];
            }
            else if (arguments.length === 3) {
                message = arguments[0];
                unexpected = arguments[1];
                actual = arguments[2];
            }
            else {
                throw new Error("assert equals invalid parameters.");
            }
            if (unexpected instanceof Date && actual instanceof Date) {
                if (equalsDate(unexpected, actual)) {
                    return;
                }
            }
            if (unexpected !== actual) {
                throw new AssertionError(message);
            }
        }
        asserts.equals = equals;
        /**
         * 是否为相等的日期
         * @param unexpected 判断的
         * @param actual 实际的
         */
        function equalsDate(unexpected, actual) {
            return unexpected.getTime() === actual.getTime();
        }
    })(asserts = ibas.asserts || (ibas.asserts = {}));
})(ibas || (ibas = {}));
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
var ibas;
(function (ibas) {
    /** 单元测试 */
    class TestCase {
        /**
         * 断言相等的实现
         */
        assertEquals() {
            ibas.asserts.equals.apply(this, arguments);
        }
        /**
         * 运行测试
         * @param result 运行结果
         */
        run(result = undefined) {
            if (ibas.objects.isNull(result)) {
                result = new TestResult();
            }
            for (let item of Object.getOwnPropertyNames(ibas.objects.getType(this).prototype)) {
                if (ibas.strings.isEmpty(item)) {
                    continue;
                }
                if (!item.startsWith("test")) {
                    continue;
                }
                if (!(this[item] instanceof Function)) {
                    continue;
                }
                try {
                    ibas.logger.log(ibas.emMessageLevel.WARN, "{0}: begin to run [{1}].", ibas.objects.getTypeName(this), item);
                    this[item]();
                }
                catch (error) {
                    if (error instanceof ibas.AssertionError) {
                        // 断言错误
                        ibas.logger.log(ibas.emMessageLevel.ERROR, "{0}: assertion faild, {1}.", ibas.objects.getTypeName(this), error.message);
                        result.addFailure(this, error);
                    }
                    else {
                        // 执行错误
                        ibas.logger.log(ibas.emMessageLevel.ERROR, "{0}: an error has occured, {1}", ibas.objects.getTypeName(this), error.message);
                        result.addError(this, error);
                    }
                }
            }
        }
    }
    ibas.TestCase = TestCase;
    const PROPERTY_ERRORS = Symbol("errors");
    const PROPERTY_FAILURES = Symbol("failures");
    /** 测试结果 */
    class TestResult {
        /** 添加运行错误 */
        addError(test, error) {
            if (!(this[PROPERTY_ERRORS] instanceof Array)) {
                this[PROPERTY_ERRORS] = new ibas.ArrayList();
            }
            this[PROPERTY_ERRORS].add(new TestFailure(test, error));
        }
        /** 添加断言错误 */
        addFailure(test, error) {
            if (!(this[PROPERTY_FAILURES] instanceof Array)) {
                this[PROPERTY_FAILURES] = new ibas.ArrayList();
            }
            this[PROPERTY_FAILURES].add(new TestFailure(test, error));
        }
        /** 运行错误 */
        errors() {
            return this[PROPERTY_ERRORS];
        }
        /** 断言错误 */
        failures() {
            return this[PROPERTY_FAILURES];
        }
    }
    ibas.TestResult = TestResult;
    /** 测试失败 */
    class TestFailure {
        constructor(test, error) {
            this.failedTest = test;
            this.thrownError = error;
        }
    }
    ibas.TestFailure = TestFailure;
    let test;
    (function (test) {
        /**
         * 返回程序包的测试用例
         * @param lib 程序包
         * @param namespace 分析的命名空间
         */
        function cases(lib) {
            let cases = new ibas.ArrayList();
            for (let item of Object.getOwnPropertyNames(lib)) {
                let Type = lib[item];
                if (!ibas.objects.isAssignableFrom(Type, TestCase)) {
                    continue;
                }
                let tCase = new Type;
                if (!(tCase instanceof TestCase)) {
                    continue;
                }
                cases.add(tCase);
            }
            return cases;
        }
        test.cases = cases;
    })(test = ibas.test || (ibas.test = {}));
})(ibas || (ibas = {}));
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../common/Data.ts" />
/// <reference path="../common/I18N.ts" />
var ibas;
(function (ibas) {
    /** 远程仓库 */
    class RemoteRepository {
        /**
         * 返回方法地址
         * @param method 方法名称
         */
        methodUrl(method) {
            if (ibas.objects.isNull(this.address)) {
                throw new Error(ibas.i18n.prop("sys_invalid_parameter", "address"));
            }
            let methodUrl = new ibas.StringBuilder();
            if (!ibas.strings.isEmpty(this.address)) {
                methodUrl.append(this.address);
            }
            if (!ibas.strings.isEmpty(method)) {
                if (!this.address.endsWith("/") && methodUrl.length > 0) {
                    methodUrl.append("/");
                }
                methodUrl.append(method);
            }
            if (!ibas.strings.isEmpty(this.token)) {
                if (method.indexOf("token=") < 0 && this.address.indexOf("token=") < 0) {
                    if (method.indexOf("?") >= 0) {
                        methodUrl.append("&");
                    }
                    else {
                        methodUrl.append("?");
                    }
                    methodUrl.append(ibas.strings.format("token={0}", this.token));
                }
            }
            return methodUrl.toString();
        }
    }
    ibas.RemoteRepository = RemoteRepository;
})(ibas || (ibas = {}));
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../common/Data.ts" />
/// <reference path="../common/I18N.ts" />
/// <reference path="../common/Configuration.ts" />
/// <reference path="../bo/BusinessObjectCore.ts" />
/// <reference path="./BORepositoryCore.ts" />
/// <reference path="./DataDeclaration.ts" />
var ibas;
(function (ibas) {
    const PROPERTY_BOCONVERTER = Symbol("boConverter");
    const MSG_SIGN_EXCEPTION = "Exception: ";
    /** 数据转换，ibas4java */
    class DataConverter4j {
        /**
         * 转换业务对象数据
         * @param data 本地类型
         * @param sign 特殊标记
         * @returns 目标类型
         */
        convert(data, sign) {
            if (ibas.objects.instanceOf(data, ibas.OperationResult)) {
                let newData = data;
                let resultObjects = [];
                for (let item of newData.resultObjects) {
                    resultObjects.push(this.convert(item, null));
                }
                let informations = [];
                for (let item of newData.informations) {
                    informations.push(this.convert(item, null));
                }
                let remote = {
                    type: data.constructor.name,
                    SignID: newData.signID,
                    Time: ibas.dates.toString(newData.time),
                    UserSign: newData.userSign,
                    ResultCode: newData.resultCode,
                    Message: newData.message,
                    ResultObjects: resultObjects,
                    Informations: informations
                };
                return remote;
            }
            else if (ibas.objects.instanceOf(data, ibas.OperationInformation)) {
                let newData = data;
                let remote = {
                    type: data.constructor.name,
                    Name: newData.name,
                    Tag: newData.tag,
                    Content: newData.content,
                };
                return remote;
            }
            else if (ibas.objects.instanceOf(data, ibas.OperationMessage)) {
                let newData = data;
                let remote = {
                    type: data.constructor.name,
                    SignID: newData.signID,
                    UserSign: newData.userSign,
                    Time: ibas.dates.toString(newData.time),
                    ResultCode: newData.resultCode,
                    Message: newData.message,
                };
                return remote;
            }
            else if (ibas.objects.instanceOf(data, ibas.ChildCriteria)) {
                let newData = data;
                let conditions = [];
                for (let item of newData.conditions) {
                    conditions.push(this.convert(item, null));
                }
                let sorts = [];
                for (let item of newData.sorts) {
                    sorts.push(this.convert(item, null));
                }
                let childCriteria = [];
                for (let item of newData.childCriterias) {
                    childCriteria.push(this.convert(item, null));
                }
                let remote = {
                    type: data.constructor.name,
                    BusinessObject: newData.businessObject,
                    ResultCount: newData.result,
                    NoChilds: newData.noChilds,
                    Remarks: newData.remarks,
                    PropertyPath: newData.propertyPath,
                    OnlyHasChilds: newData.onlyHasChilds,
                    Conditions: conditions,
                    ChildCriterias: childCriteria,
                    Sorts: sorts
                };
                return remote;
            }
            else if (ibas.objects.instanceOf(data, ibas.Criteria)) {
                let newData = data;
                let conditions = [];
                for (let item of newData.conditions) {
                    conditions.push(this.convert(item, null));
                }
                let sorts = [];
                for (let item of newData.sorts) {
                    sorts.push(this.convert(item, null));
                }
                let childCriteria = [];
                for (let item of newData.childCriterias) {
                    childCriteria.push(this.convert(item, null));
                }
                let remote = {
                    type: data.constructor.name,
                    BusinessObject: newData.businessObject,
                    ResultCount: newData.result,
                    NoChilds: newData.noChilds,
                    Remarks: newData.remarks,
                    Conditions: conditions,
                    ChildCriterias: childCriteria,
                    Sorts: sorts
                };
                return remote;
            }
            else if (ibas.objects.instanceOf(data, ibas.Condition)) {
                let newData = data;
                let remote = {
                    type: data.constructor.name,
                    Alias: newData.alias,
                    BracketClose: newData.bracketClose,
                    BracketOpen: newData.bracketOpen,
                    ComparedAlias: newData.comparedAlias,
                    Value: newData.value,
                    Operation: ibas.enums.toString(ibas.emConditionOperation, newData.operation),
                    Relationship: ibas.enums.toString(ibas.emConditionRelationship, newData.relationship),
                    Remarks: newData.remarks,
                };
                return remote;
            }
            else if (ibas.objects.instanceOf(data, ibas.Sort)) {
                let newData = data;
                let remote = {
                    type: data.constructor.name,
                    Alias: newData.alias,
                    SortType: ibas.enums.toString(ibas.emSortType, newData.sortType),
                };
                return remote;
            }
            else if (ibas.objects.instanceOf(data, ibas.FileData)) {
                let newData = data;
                let remote = {
                    type: data.constructor.name,
                    FileName: newData.fileName,
                    Location: newData.location,
                    OriginalName: newData.originalName
                };
                return remote;
            }
            else if (ibas.objects.instanceOf(data, ibas.KeyText)) {
                let newData = data;
                let remote = {
                    type: data.constructor.name,
                    Key: newData.key,
                    Text: newData.text,
                };
                return remote;
            }
            else if (ibas.objects.instanceOf(data, ibas.KeyValue)) {
                let newData = data;
                let remote = {
                    type: data.constructor.name,
                    Key: newData.key,
                    Value: newData.value,
                };
                return remote;
            }
            else if (ibas.objects.instanceOf(data, Array)) {
                let dataArray = new Array();
                for (let dataItem of data) {
                    dataArray.push(this.convert(dataItem, sign));
                }
                return dataArray;
            }
            else if (!ibas.objects.isNull(this.boConverter)) {
                // 尝试业务对象转换
                return this.boConverter.convert(data);
            }
            else {
                throw new Error(ibas.i18n.prop("sys_unable_to_convert_data", ibas.objects.getName(ibas.objects.getType(data))));
            }
        }
        /** 修正消息 */
        fixMessage(message) {
            if (ibas.strings.isEmpty(message)) {
                return message;
            }
            let index = message.lastIndexOf(MSG_SIGN_EXCEPTION);
            if (index > 0) {
                return message.substring(index + MSG_SIGN_EXCEPTION.length);
            }
            return message;
        }
        /**
         * 解析业务对象数据
         * @param data 目标类型
         * @param sign 特殊标记
         * @returns 本地类型
         */
        parsing(data, sign) {
            if (data.type === "string") {
                let remote = data;
                return remote.value;
            }
            else if (data.type === ibas.OperationResult.name) {
                let remote = data;
                let newData = new ibas.OperationResult();
                newData.signID = remote.SignID;
                newData.time = ibas.dates.valueOf(remote.Time);
                newData.userSign = remote.UserSign;
                newData.resultCode = remote.ResultCode;
                newData.message = remote.Message;
                if (newData.resultCode !== 0) {
                    newData.message = this.fixMessage(newData.message);
                }
                if (remote.ResultObjects instanceof Array) {
                    for (let item of remote.ResultObjects) {
                        newData.resultObjects.add(this.parsing(item, null));
                    }
                }
                if (remote.Informations instanceof Array) {
                    for (let item of remote.Informations) {
                        item.type = ibas.OperationInformation.name;
                        newData.informations.add(this.parsing(item, null));
                    }
                }
                return newData;
            }
            else if (data.type === ibas.OperationInformation.name) {
                let remote = data;
                let newData = new ibas.OperationInformation();
                newData.name = remote.Name;
                newData.tag = remote.Tag;
                newData.content = remote.Content;
                return newData;
            }
            else if (data.type === ibas.OperationMessage.name) {
                let remote = data;
                let newData = new ibas.OperationMessage();
                newData.signID = remote.SignID;
                newData.userSign = remote.UserSign;
                newData.time = ibas.dates.valueOf(remote.Time);
                newData.resultCode = remote.ResultCode;
                newData.message = remote.Message;
                if (newData.resultCode !== 0) {
                    newData.message = this.fixMessage(newData.message);
                }
                return newData;
            }
            else if (data.type === ibas.ChildCriteria.name) {
                let remote = data;
                let newData = new ibas.ChildCriteria();
                newData.businessObject = remote.BusinessObject;
                newData.result = remote.ResultCount;
                newData.noChilds = remote.NoChilds;
                newData.remarks = remote.Remarks;
                newData.onlyHasChilds = remote.OnlyHasChilds;
                newData.propertyPath = remote.PropertyPath;
                if (remote.Conditions instanceof Array) {
                    for (let item of remote.Conditions) {
                        item.type = ibas.Condition.name;
                        newData.conditions.add(this.parsing(item, null));
                    }
                }
                if (remote.ChildCriterias instanceof Array) {
                    for (let item of remote.ChildCriterias) {
                        item.type = ibas.ChildCriteria.name;
                        newData.childCriterias.add(this.parsing(item, null));
                    }
                }
                if (remote.Sorts instanceof Array) {
                    for (let item of remote.Sorts) {
                        item.type = ibas.Sort.name;
                        newData.sorts.add(this.parsing(item, null));
                    }
                }
                return newData;
            }
            else if (data.type === ibas.Criteria.name) {
                let remote = data;
                let newData = new ibas.Criteria();
                newData.businessObject = remote.BusinessObject;
                newData.result = remote.ResultCount;
                newData.noChilds = remote.NoChilds;
                newData.remarks = remote.Remarks;
                if (remote.Conditions instanceof Array) {
                    for (let item of remote.Conditions) {
                        item.type = ibas.Condition.name;
                        newData.conditions.add(this.parsing(item, null));
                    }
                }
                if (remote.ChildCriterias instanceof Array) {
                    for (let item of remote.ChildCriterias) {
                        item.type = ibas.ChildCriteria.name;
                        newData.childCriterias.add(this.parsing(item, null));
                    }
                }
                if (remote.Sorts instanceof Array) {
                    for (let item of remote.Sorts) {
                        item.type = ibas.Sort.name;
                        newData.sorts.add(this.parsing(item, null));
                    }
                }
                return newData;
            }
            else if (data.type === ibas.Condition.name) {
                let remote = data;
                let newData = new ibas.Condition();
                newData.alias = remote.Alias;
                newData.bracketClose = remote.BracketClose;
                newData.bracketOpen = remote.BracketOpen;
                newData.comparedAlias = remote.ComparedAlias;
                newData.value = remote.Value;
                newData.operation = ibas.enums.valueOf(ibas.emConditionOperation, remote.Operation);
                newData.relationship = ibas.enums.valueOf(ibas.emConditionRelationship, remote.Relationship);
                newData.remarks = remote.Remarks;
                return newData;
            }
            else if (data.type === ibas.Sort.name) {
                let remote = data;
                let newData = new ibas.Sort();
                newData.alias = remote.Alias;
                newData.sortType = ibas.enums.valueOf(ibas.emSortType, remote.SortType);
                return newData;
            }
            else if (data.type === ibas.FileData.name) {
                let remote = data;
                let newData = new ibas.FileData();
                newData.fileName = remote.FileName;
                newData.location = remote.Location;
                newData.originalName = remote.OriginalName;
                return newData;
            }
            else if (data.type === ibas.DataTable.name) {
                let remote = data;
                let newData = new ibas.DataTable();
                newData.name = remote.Name;
                newData.description = remote.Description;
                if (remote.Columns instanceof Array) {
                    for (let item of remote.Columns) {
                        item.type = ibas.DataTableColumn.name;
                        newData.columns.add(this.parsing(item, null));
                    }
                }
                if (remote.Rows instanceof Array) {
                    for (let item of remote.Rows) {
                        item.type = ibas.DataTableRow.name;
                        newData.rows.add(this.parsing(item, null));
                    }
                }
                return newData;
            }
            else if (data.type === ibas.DataTableColumn.name) {
                let remote = data;
                let newData = new ibas.DataTableColumn();
                newData.name = remote.Name;
                newData.description = remote.Description;
                newData.dataType = remote.DataType;
                return newData;
            }
            else if (data.type === ibas.DataTableRow.name) {
                let remote = data;
                let newData = new ibas.DataTableRow();
                if (remote.Cells instanceof Array) {
                    for (let item of remote.Cells) {
                        newData.cells.add(item);
                    }
                }
                return newData;
            }
            else if (data.type === ibas.KeyText.name) {
                let remote = data;
                let newData = new ibas.KeyText();
                newData.key = remote.Key;
                newData.text = remote.Text;
                return newData;
            }
            else if (data.type === ibas.KeyValue.name) {
                let remote = data;
                let newData = new ibas.KeyValue();
                newData.key = remote.Key;
                newData.value = remote.Value;
                return newData;
            }
            else if (ibas.objects.instanceOf(data, Array)) {
                let dataArray = new Array();
                for (let dataItem of data) {
                    dataArray.push(this.parsing(dataItem, sign));
                }
                return dataArray;
            }
            else if (!ibas.objects.isNull(this.boConverter)) {
                // 尝试业务对象解析
                return this.boConverter.parsing(data);
            }
            else {
                throw new Error(ibas.i18n.prop("sys_unable_to_parse_data", ibas.objects.isNull(data.type) ? "unknown" : data.type));
            }
        }
        get boConverter() {
            if (ibas.objects.isNull(this[PROPERTY_BOCONVERTER])) {
                this[PROPERTY_BOCONVERTER] = this.createConverter();
            }
            return this[PROPERTY_BOCONVERTER];
        }
    }
    ibas.DataConverter4j = DataConverter4j;
    /** 属性映射 */
    class PropertyMap {
        constructor(local, remote) {
            this.localProperty = local;
            this.remoteProperty = remote;
        }
    }
    ibas.PropertyMap = PropertyMap;
    /** 属性映射 */
    class PropertyMaps extends ibas.ArrayList {
        localProperty(property) {
            for (let item of this) {
                if (item.remoteProperty === property) {
                    return item.localProperty;
                }
            }
            return property;
        }
        remoteProperty(property) {
            for (let item of this) {
                if (item.localProperty === property) {
                    return item.remoteProperty;
                }
            }
            return property;
        }
    }
    ibas.PropertyMaps = PropertyMaps;
    /** 远程对象，类型属性名称 */
    ibas.REMOTE_OBJECT_TYPE_PROPERTY_NAME = "type";
    const PROPERTY_PROPERTYMAPS = Symbol("propertyMaps");
    /** 业务对象的数据转换 */
    class BOConverter {
        /** 获取对象类型 */
        getTypeName(data) {
            return data[ibas.REMOTE_OBJECT_TYPE_PROPERTY_NAME];
        }
        /** 设置对象类型 */
        setTypeName(data, type) {
            data[ibas.REMOTE_OBJECT_TYPE_PROPERTY_NAME] = type;
        }
        get propertyMaps() {
            if (ibas.objects.isNull(this[PROPERTY_PROPERTYMAPS])) {
                this[PROPERTY_PROPERTYMAPS] = new PropertyMaps;
            }
            return this[PROPERTY_PROPERTYMAPS];
        }
        /**
         * 解析远程数据
         * @param datas 远程数据
         * @returns 操作结果数据
         */
        parsing(data) {
            let dType = this.getTypeName(data);
            if (dType !== undefined) {
                // 创建对象实例
                let boFactory = this.factory();
                if (ibas.objects.isNull(boFactory)) {
                    throw new Error(ibas.i18n.prop("sys_invalid_parameter", boFactory));
                }
                let tType = boFactory.classOf(dType);
                if (ibas.objects.isNull(tType)) {
                    throw new Error(ibas.i18n.prop("sys_invaild_mapping_type", dType));
                }
                let newData = new tType;
                if (ibas.objects.isNull(newData)) {
                    throw new Error(ibas.i18n.prop("sys_cannot_create_mapping_type_instance", dType));
                }
                ibas.logger.log(ibas.emMessageLevel.DEBUG, "converter: {0} mapped {1}.", dType, tType.name);
                this.parsingProperties(data, newData);
                return newData;
            }
            else {
                dType = "unknown";
            }
            // 没有匹配的映射类型
            ibas.logger.log(ibas.emMessageLevel.DEBUG, "converter: {0} using custom parsing.", dType);
            let newData = this.customParsing(data);
            if (!ibas.objects.isNull(newData)) {
                return newData;
            }
            // 没处理，直接返回
            ibas.logger.log(ibas.emMessageLevel.WARN, ibas.i18n.prop("sys_not_parsed_data", dType));
            return data;
        }
        /**
         * 解析属性
         * @param source 源数据（远程类型）
         * @param target 目标数据（本地类型）
         */
        parsingProperties(source, target) {
            if (target instanceof ibas.TrackableBase) {
                target.isLoading = true;
            }
            for (let sName in source) {
                if (ibas.objects.isNull(sName)) {
                    continue;
                }
                // 首字母改为小写
                let sValue = source[sName];
                let tName = this.propertyMaps.localProperty(sName);
                if (ibas.objects.isNull(tName)) {
                    continue;
                }
                if (sValue instanceof Array) {
                    // 此属性是数组
                    if (ibas.objects.instanceOf(target[tName], ibas.BusinessObjectsBase)) {
                        // 如果是业务对象列表，则使用默认子项构造器
                        for (let item of sValue) {
                            // 创建子项实例并添加到集合
                            this.parsingProperties(item, target[tName].create());
                        }
                        // 已处理，继续下一个
                        continue;
                    }
                    else if (tName === "UserFields" && target instanceof ibas.BusinessObject) {
                        // 用户字段
                        for (let item of sValue) {
                            let remote = item;
                            let userField = target.userFields.register(remote.Name, ibas.enums.valueOf(ibas.emDbFieldType, remote.ValueType));
                            if (userField.valueType === ibas.emDbFieldType.DATE) {
                                userField.value = ibas.dates.valueOf(remote.Value);
                            }
                            else if (userField.valueType === ibas.emDbFieldType.NUMERIC) {
                                userField.value = parseInt(remote.Value, 0);
                            }
                            else if (userField.valueType === ibas.emDbFieldType.DECIMAL) {
                                userField.value = parseFloat(remote.Value);
                            }
                            else {
                                userField.value = remote.Value;
                            }
                        }
                        // 已处理，继续下一个
                        continue;
                    }
                }
                else if (typeof sValue === "object") {
                    // 此属性是对象
                    if (ibas.objects.isNull(target[tName])) {
                        // 解析对象
                        target[tName] = this.parsing(sValue);
                        // 已处理，继续下一个
                        continue;
                    }
                    else if (ibas.objects.instanceOf(target[tName], ibas.BusinessObjectBase)) {
                        // 对象属性赋值
                        this.parsingProperties(sValue, target[tName]);
                        // 已处理，继续下一个
                        continue;
                    }
                }
                else {
                    let boName = target.constructor.name;
                    let newValue = this.parsingData(boName, tName, sValue);
                    if (ibas.objects.isNull(newValue) && !ibas.objects.isNull(sValue)) {
                        let msg = boName + " - " + tName;
                        ibas.logger.log(ibas.emMessageLevel.WARN, ibas.i18n.prop("sys_not_parsed_data", msg));
                    }
                    else {
                        sValue = newValue;
                    }
                }
                target[tName] = sValue;
            }
            if (target instanceof ibas.TrackableBase) {
                target.isLoading = false;
            }
        }
        /**
         * 转换数据
         * @param data 当前类型数据
         * @returns 转换的数据
         */
        convert(data) {
            let newData = {};
            this.convertProperties(data, newData);
            return newData;
        }
        /**
         * 转换属性
         * @param source 源数据（本地类型）
         * @param target 目标数据（远程类型）
         * @returns 目标数据
         */
        convertProperties(source, target) {
            this.setTypeName(target, source.constructor.name);
            for (let sName in source) {
                if (ibas.objects.isNull(sName)) {
                    continue;
                }
                let value = source[sName];
                let name = this.propertyMaps.remoteProperty(sName);
                if (ibas.objects.isNull(name)) {
                    // 没有解析出映射关系，继续下一个属性
                    continue;
                }
                if (value instanceof Array) {
                    // 此属性是数组
                    let newValue = [];
                    for (let item of value) {
                        newValue.push(this.convertProperties(item, {}));
                    }
                    value = newValue;
                }
                else if (value instanceof Date) {
                    // 此属性是字符
                    value = ibas.dates.toString(value);
                }
                else if (value instanceof Object) {
                    // 此属性是对象
                    value = this.convertProperties(value, {});
                }
                else {
                    let newValue = this.convertData(source.constructor.name, sName, value);
                    if (ibas.objects.isNull(newValue) && !ibas.objects.isNull(value)) {
                        let msg = source.constructor.name + " - " + name;
                        ibas.logger.log(ibas.emMessageLevel.WARN, ibas.i18n.prop("sys_not_converted_data", msg));
                    }
                    else {
                        value = newValue;
                    }
                }
                if (ibas.objects.isNull(value)) {
                    // 无效的值，则不添加此属性
                    continue;
                }
                target[name] = value;
            }
            return target;
        }
        /**
         * 解析数据
         * @param boName 对象名称
         * @param property 属性名称
         * @param value 值
         * @returns 解析的值
         */
        parsingData(boName, property, value) {
            if (typeof value === "string") {
                // 日期类型，直接转换
                if (value.length < 20 && value.indexOf("T") > 0 && value.indexOf("-") > 0 && value.indexOf(":") > 0) {
                    // 字符格式为日期，yyyy-MM-ddTHH:mm:ss
                    return ibas.dates.valueOf(value);
                }
                else if (property === "DocumentStatus" || property === "LineStatus") {
                    return ibas.enums.valueOf(ibas.emDocumentStatus, value);
                }
                else if (property === "Canceled" || property === "Referenced" || property === "Locked"
                    || property === "Transfered" || property === "Activated" || property === "Deleted") {
                    return ibas.enums.valueOf(ibas.emYesNo, value);
                }
                else if (property === "Status") {
                    return ibas.enums.valueOf(ibas.emBOStatus, value);
                }
                else if (property === "ApprovalStatus") {
                    return ibas.enums.valueOf(ibas.emApprovalStatus, value);
                }
                else if (property === "Direction") {
                    return ibas.enums.valueOf(ibas.emDirection, value);
                }
            }
            // 不做处理，原始返回
            return value;
        }
        /**
         * 转换数据
         * @param boName 对象名称
         * @param property 属性名称
         * @param value 值
         * @returns 转换的值
         */
        convertData(boName, property, value) {
            if (boName === ibas.UserField.name && property === "ValueType") {
                return ibas.enums.toString(ibas.emDbFieldType, value);
            }
            else if (typeof value === "number") {
                // 枚举类型
                if (property === "DocumentStatus" || property === "LineStatus") {
                    return ibas.enums.toString(ibas.emDocumentStatus, value);
                }
                else if (property === "Canceled" || property === "Referenced" || property === "Locked"
                    || property === "Transfered" || property === "Activated" || property === "Deleted") {
                    return ibas.enums.toString(ibas.emYesNo, value);
                }
                else if (property === "Status") {
                    return ibas.enums.toString(ibas.emBOStatus, value);
                }
                else if (property === "ApprovalStatus") {
                    return ibas.enums.toString(ibas.emApprovalStatus, value);
                }
                else if (property === "Direction") {
                    return ibas.enums.toString(ibas.emDirection, value);
                }
            }
            else if (value instanceof Date) {
                // 日期类型
                return ibas.dates.toString(value);
            }
            // 不做处理，原始返回
            return value;
        }
    }
    ibas.BOConverter = BOConverter;
    /**
     * 查询方法
     */
    let criterias;
    (function (criterias) {
        class DataConverter extends DataConverter4j {
            createConverter() {
                throw new Error("Method not implemented.");
            }
        }
        /**
         * 解析查询
         * @param content 内容
         */
        function valueOf(content) {
            if (ibas.strings.isEmpty(content)) {
                return null;
            }
            if (content.startsWith("{[") && content.endsWith("]}")) {
                content = content.substring(1, content.length - 1);
                content = ibas.strings.remove(content, " ", "[", "]");
                let values = content.split(".");
                if (values.length === 2) {
                    let criteria = new ibas.Criteria();
                    let vFields = values[1].split("&");
                    if (vFields.length > 0) {
                        criteria.businessObject = values[0];
                        for (let field of vFields) {
                            field = field.trim();
                            if (ibas.strings.isEmpty(field)) {
                                continue;
                            }
                            let tValues = field.split("=");
                            if (tValues.length !== 2) {
                                return null;
                            }
                            else {
                                let condition = criteria.conditions.create();
                                condition.alias = tValues[0];
                                condition.value = tValues[1];
                            }
                        }
                        return criteria;
                    }
                }
            }
            else if (content.startsWith("{") && content.endsWith("}")) {
                return new DataConverter().parsing(JSON.parse(content), "");
            }
            return null;
        }
        criterias.valueOf = valueOf;
    })(criterias = ibas.criterias || (ibas.criterias = {}));
})(ibas || (ibas = {}));
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../common/Data.ts" />
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../common/Data.ts" />
/// <reference path="../common/I18N.ts" />
/// <reference path="./Expression.ts" />
var ibas;
(function (ibas) {
    /** 数据转换 */
    let judgment;
    (function (judgment) {
        let convert;
        (function (convert) {
            function operation(value) {
                if (ibas.objects.isNull(value)) {
                    throw new Error(ibas.i18n.prop("sys_invalid_parameter", "value"));
                }
                if (value === ibas.emConditionOperation.CONTAIN) {
                    return ibas.emJudmentOperation.CONTAIN;
                }
                else if (value === ibas.emConditionOperation.NOT_CONTAIN) {
                    return ibas.emJudmentOperation.NOT_CONTAIN;
                }
                else if (value === ibas.emConditionOperation.EQUAL) {
                    return ibas.emJudmentOperation.EQUAL;
                }
                else if (value === ibas.emConditionOperation.NOT_EQUAL) {
                    return ibas.emJudmentOperation.NOT_EQUAL;
                }
                else if (value === ibas.emConditionOperation.GRATER_EQUAL) {
                    return ibas.emJudmentOperation.GRATER_EQUAL;
                }
                else if (value === ibas.emConditionOperation.GRATER_THAN) {
                    return ibas.emJudmentOperation.GRATER_THAN;
                }
                else if (value === ibas.emConditionOperation.LESS_EQUAL) {
                    return ibas.emJudmentOperation.LESS_EQUAL;
                }
                else if (value === ibas.emConditionOperation.LESS_THAN) {
                    return ibas.emJudmentOperation.LESS_THAN;
                }
                else if (value === ibas.emConditionOperation.START) {
                    return ibas.emJudmentOperation.BEGIN_WITH;
                }
                else if (value === ibas.emConditionOperation.END) {
                    return ibas.emJudmentOperation.END_WITH;
                }
                throw new Error(ibas.i18n.prop("sys_unrecognized_data"));
            }
            convert.operation = operation;
            function relationship(value) {
                if (ibas.objects.isNull(value)) {
                    throw new Error(ibas.i18n.prop("sys_invalid_parameter", "value"));
                }
                if (value === ibas.emConditionRelationship.AND) {
                    return ibas.emJudmentOperation.AND;
                }
                else if (value === ibas.emConditionRelationship.OR) {
                    return ibas.emJudmentOperation.OR;
                }
                throw new Error(ibas.i18n.prop("sys_unrecognized_data"));
            }
            convert.relationship = relationship;
        })(convert = judgment.convert || (judgment.convert = {}));
        let expression;
        (function (expression) {
            function create(type) {
                if (ibas.strings.equalsIgnoreCase("string", type)) {
                    return new JudgmentExpressionString();
                }
                else if (ibas.strings.equalsIgnoreCase("boolean", type)) {
                    return new JudgmentExpressionBoolean();
                }
                else if (ibas.strings.equalsIgnoreCase("number", type)) {
                    return new JudgmentExpressionNumber();
                }
                else if (ibas.strings.equalsIgnoreCase("date", type)) {
                    return new JudgmentExpressionDate();
                }
                else if (ibas.strings.equalsIgnoreCase("enum", type)) {
                    return new JudgmentExpressionEnum();
                }
                throw new Error(ibas.i18n.prop("sys_unrecognized_data"));
            }
            expression.create = create;
        })(expression = judgment.expression || (judgment.expression = {}));
    })(judgment = ibas.judgment || (ibas.judgment = {}));
    /**
     * 判断表达式
     */
    class JudgmentExpression {
        /**
         * 表达式结果
         * @return true，成立；false，不成立
         * @throws 不支持的操作
         */
        result() {
            throw new Error(ibas.i18n.prop("sys_unsupported_operation"));
        }
        /**
         * 字符串输出
         */
        toString() {
            let builder = new ibas.StringBuilder();
            builder.append("{");
            builder.append("expression:");
            builder.append(" ");
            builder.append(this.leftValue);
            builder.append(" ");
            builder.append(ibas.enums.toString(ibas.emJudmentOperation, this.operation));
            builder.append(" ");
            builder.append(this.rightValue);
            builder.append("}");
            return builder.toString();
        }
    }
    ibas.JudgmentExpression = JudgmentExpression;
    /**
     * 布尔值表达式比较
     */
    class JudgmentExpressionBoolean extends JudgmentExpression {
        result() {
            if (this.operation === ibas.emJudmentOperation.EQUAL) {
                // 等
                if (this.leftValue === this.rightValue) {
                    return true;
                }
                return false;
            }
            else if (this.operation === ibas.emJudmentOperation.NOT_EQUAL) {
                // 不等
                if (this.leftValue !== this.rightValue) {
                    return true;
                }
                return false;
            }
            else if (this.operation === ibas.emJudmentOperation.AND) {
                // 且
                if (this.leftValue && this.rightValue) {
                    return true;
                }
                return false;
            }
            else if (this.operation === ibas.emJudmentOperation.OR) {
                // 或
                if (this.leftValue || this.rightValue) {
                    return true;
                }
                return false;
            }
            // 不支持的
            return super.result();
        }
    }
    ibas.JudgmentExpressionBoolean = JudgmentExpressionBoolean;
    /**
     * 日期值表达式比较
     */
    class JudgmentExpressionDate extends JudgmentExpression {
        result() {
            if (this.operation === ibas.emJudmentOperation.EQUAL) {
                // 等于
                // 左值为空
                if (ibas.objects.isNull(this.leftValue)) {
                    if (ibas.objects.isNull(this.rightValue)) {
                        return true;
                    }
                    return false;
                }
                // 比较左右值
                if (ibas.dates.equals(this.leftValue, this.rightValue)) {
                    return true;
                }
                return false;
            }
            else if (this.operation === ibas.emJudmentOperation.NOT_EQUAL) {
                // 不等于
                // 左值为空
                if (ibas.objects.isNull(this.leftValue)) {
                    if (this.rightValue !== null) {
                        return true;
                    }
                    return false;
                }
                // 比较左右值
                if (!ibas.dates.equals(this.leftValue, this.rightValue)) {
                    return true;
                }
                return false;
            }
            else if (this.operation === ibas.emJudmentOperation.GRATER_THAN) {
                // 大于
                // 左值为空或右值为空
                if (ibas.objects.isNull(this.leftValue) || ibas.objects.isNull(this.rightValue)) {
                    return false;
                }
                // 比较左右值
                if (ibas.dates.after(this.leftValue, this.rightValue)) {
                    return true;
                }
                return false;
            }
            else if (this.operation === ibas.emJudmentOperation.LESS_THAN) {
                // 小于
                // 左值为空或右值为空
                if (ibas.objects.isNull(this.leftValue) || ibas.objects.isNull(this.rightValue)) {
                    return false;
                }
                // 比较左右值
                if (ibas.dates.before(this.leftValue, this.rightValue)) {
                    return true;
                }
                return false;
            }
            else if (this.operation === ibas.emJudmentOperation.GRATER_EQUAL) {
                // 大于等于
                // 左值为空或右值为空
                if (ibas.objects.isNull(this.leftValue) || ibas.objects.isNull(this.rightValue)) {
                    return false;
                }
                // 比较左右值
                if (ibas.dates.after(this.leftValue, this.rightValue) || ibas.dates.equals(this.leftValue, this.rightValue)) {
                    return true;
                }
                return false;
            }
            else if (this.operation === ibas.emJudmentOperation.LESS_EQUAL) {
                // 小于等于
                // 左值为空或右值为空
                if (ibas.objects.isNull(this.leftValue) || ibas.objects.isNull(this.rightValue)) {
                    return false;
                }
                // 比较左右值
                if (ibas.dates.before(this.leftValue, this.rightValue) || ibas.dates.equals(this.leftValue, this.rightValue)) {
                    return true;
                }
                return false;
            }
            return super.result();
        }
    }
    ibas.JudgmentExpressionDate = JudgmentExpressionDate;
    /**
     * 数字值表达式比较
     */
    class JudgmentExpressionNumber extends JudgmentExpression {
        result() {
            if (this.operation === ibas.emJudmentOperation.EQUAL) {
                // 等于
                // 左值为空
                if (ibas.objects.isNull(this.leftValue)) {
                    if (ibas.objects.isNull(this.rightValue)) {
                        return true;
                    }
                    return false;
                }
                // 比较左右值
                if (this.leftValue === this.rightValue) {
                    return true;
                }
                return false;
            }
            else if (this.operation === ibas.emJudmentOperation.NOT_EQUAL) {
                // 不等于
                // 左值为空
                if (ibas.objects.isNull(this.leftValue)) {
                    if (this.rightValue !== null) {
                        return true;
                    }
                    return false;
                }
                // 比较左右值
                if (this.leftValue !== this.rightValue) {
                    return true;
                }
                return false;
            }
            else if (this.operation === ibas.emJudmentOperation.GRATER_THAN) {
                // 大于
                // 左值为空或右值为空
                if (ibas.objects.isNull(this.leftValue) || ibas.objects.isNull(this.rightValue)) {
                    return false;
                }
                // 比较左右值
                if (this.leftValue > this.rightValue) {
                    return true;
                }
                return false;
            }
            else if (this.operation === ibas.emJudmentOperation.LESS_THAN) {
                // 小于
                // 左值为空或右值为空
                if (ibas.objects.isNull(this.leftValue) || ibas.objects.isNull(this.rightValue)) {
                    return false;
                }
                // 比较左右值
                if (this.leftValue < this.rightValue) {
                    return true;
                }
                return false;
            }
            else if (this.operation === ibas.emJudmentOperation.GRATER_EQUAL) {
                // 大于等于
                // 左值为空或右值为空
                if (ibas.objects.isNull(this.leftValue) || ibas.objects.isNull(this.rightValue)) {
                    return false;
                }
                // 比较左右值
                if (this.leftValue >= this.rightValue) {
                    return true;
                }
                return false;
            }
            else if (this.operation === ibas.emJudmentOperation.LESS_EQUAL) {
                // 小于等于
                // 左值为空或右值为空
                if (ibas.objects.isNull(this.leftValue) || ibas.objects.isNull(this.rightValue)) {
                    return false;
                }
                // 比较左右值
                if (this.leftValue <= this.rightValue) {
                    return true;
                }
                return false;
            }
            return super.result();
        }
    }
    ibas.JudgmentExpressionNumber = JudgmentExpressionNumber;
    /**
     * 枚举值表达式比较
     */
    class JudgmentExpressionEnum extends JudgmentExpression {
        result() {
            if (this.operation === ibas.emJudmentOperation.EQUAL) {
                // 等于
                // 比较左右值
                if (this.leftValue === this.rightValue) {
                    return true;
                }
                return false;
            }
            else if (this.operation === ibas.emJudmentOperation.NOT_EQUAL) {
                // 不等于
                // 比较左右值
                if (this.leftValue !== this.rightValue) {
                    return true;
                }
                return false;
            }
        }
    }
    ibas.JudgmentExpressionEnum = JudgmentExpressionEnum;
    /**
     * 字符串值表达式比较
     */
    class JudgmentExpressionString extends JudgmentExpression {
        result() {
            if (this.operation === ibas.emJudmentOperation.EQUAL) {
                // 等于
                // 比较左右值
                if (this.leftValue === this.rightValue) {
                    return true;
                }
                return false;
            }
            else if (this.operation === ibas.emJudmentOperation.NOT_EQUAL) {
                // 不等于
                // 比较左右值
                if (this.leftValue !== this.rightValue) {
                    return true;
                }
                return false;
            }
            else if (this.operation === ibas.emJudmentOperation.BEGIN_WITH) {
                // 开始与
                if (ibas.objects.isNull(this.leftValue) || ibas.objects.isNull(this.rightValue)) {
                    return false;
                }
                if (this.leftValue.startsWith(this.rightValue)) {
                    return true;
                }
                return false;
            }
            else if (this.operation === ibas.emJudmentOperation.END_WITH) {
                // 结束于
                if (ibas.objects.isNull(this.leftValue) || ibas.objects.isNull(this.rightValue)) {
                    return false;
                }
                if (this.leftValue.endsWith(this.rightValue)) {
                    return true;
                }
                return false;
            }
            else if (this.operation === ibas.emJudmentOperation.NOT_BEGIN_WITH) {
                // 非开始于
                if (ibas.objects.isNull(this.leftValue) || ibas.objects.isNull(this.rightValue)) {
                    return false;
                }
                if (!this.leftValue.endsWith(this.rightValue)) {
                    return true;
                }
                return false;
            }
            else if (this.operation === ibas.emJudmentOperation.NOT_END_WITH) {
                // 非结束于
                if (ibas.objects.isNull(this.leftValue) || ibas.objects.isNull(this.rightValue)) {
                    return false;
                }
                if (!this.leftValue.endsWith(this.rightValue)) {
                    return true;
                }
                return false;
            }
            else if (this.operation === ibas.emJudmentOperation.CONTAIN) {
                // 包含
                if (ibas.objects.isNull(this.leftValue) || ibas.objects.isNull(this.rightValue)) {
                    return false;
                }
                if (this.leftValue.indexOf(this.rightValue) >= 0) {
                    return true;
                }
                return false;
            }
            else if (this.operation === ibas.emJudmentOperation.NOT_CONTAIN) {
                // 不包含
                if (ibas.objects.isNull(this.leftValue) || ibas.objects.isNull(this.rightValue)) {
                    return false;
                }
                if (this.leftValue.indexOf(this.rightValue) < 0) {
                    return true;
                }
                return false;
            }
            // 其他
            return super.result();
        }
    }
    ibas.JudgmentExpressionString = JudgmentExpressionString;
})(ibas || (ibas = {}));
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../common/Data.ts" />
/// <reference path="../common/I18N.ts" />
/// <reference path="../common/Logger.ts" />
/// <reference path="./Expression.ts" />
/// <reference path="./JudgmentExpression.ts" />
var ibas;
(function (ibas) {
    /** 值操作者 */
    class ValueOperator {
        /** 获取值 */
        getValue() {
            return this.value;
        }
        /** 设置值 */
        setValue(value) {
            this.value = value;
        }
        /** 获取值类型 */
        valueType() {
            let name = typeof this.getValue();
            if (name === "object") {
                // 日期类型
                name = ibas.objects.getName(ibas.objects.getType(this.getValue()));
            }
            return name;
        }
    }
    ibas.ValueOperator = ValueOperator;
    /** 增强值操作者 */
    class ValueOperatorEx extends ValueOperator {
        /** 获取值 */
        getValue() {
            if (ibas.objects.isNull(this.converter)) {
                return super.getValue();
            }
            return this.converter.convert(super.getValue());
        }
    }
    ibas.ValueOperatorEx = ValueOperatorEx;
    /** 属性值操作者 */
    class PropertyValueOperator extends ValueOperator {
        /** 获取值 */
        getValue() {
            return ibas.objects.getPropertyValue(this.propertyName, super.getValue());
        }
    }
    ibas.PropertyValueOperator = PropertyValueOperator;
    class ValueConverterString {
        convert(value) {
            return String(value);
        }
    }
    ibas.ValueConverterString = ValueConverterString;
    let judgment;
    (function (judgment) {
        let converter;
        (function (converter) {
            function create(type) {
                if (ibas.strings.equalsIgnoreCase("string", type)) {
                    return {
                        convert(value) {
                            return String(value);
                        }
                    };
                }
                else if (ibas.strings.equalsIgnoreCase("boolean", type)) {
                    return {
                        convert(value) {
                            return Boolean(value);
                        }
                    };
                }
                else if (ibas.strings.equalsIgnoreCase("number", type)) {
                    return {
                        convert(value) {
                            return Number(value);
                        }
                    };
                }
                else if (ibas.strings.equalsIgnoreCase("date", type)) {
                    return {
                        convert(value) {
                            if (typeof value === "string") {
                                return ibas.dates.valueOf(value);
                            }
                            return undefined;
                        }
                    };
                }
                throw new Error(ibas.i18n.prop("sys_unrecognized_data"));
            }
            converter.create = create;
        })(converter = judgment.converter || (judgment.converter = {}));
    })(judgment = ibas.judgment || (ibas.judgment = {}));
    /**
     * 判断链-项目
     */
    class JudgmentLinkItem {
        constructor() {
            this.relationship = ibas.emJudmentOperation.AND;
            this.openBracket = 0;
            this.operation = ibas.emJudmentOperation.EQUAL;
            this.closeBracket = 0;
        }
        /** 输出字符串 */
        toString() {
            let stringBuilder = new ibas.StringBuilder();
            stringBuilder.append(ibas.enums.toString(ibas.emJudmentOperation, this.relationship));
            stringBuilder.append(" ");
            for (let index = 0; index < this.openBracket; index++) {
                stringBuilder.append("(");
            }
            stringBuilder.append(this.leftOperter.getValue());
            stringBuilder.append(" ");
            stringBuilder.append(ibas.enums.toString(ibas.emJudmentOperation, this.operation.toString()));
            stringBuilder.append(" ");
            stringBuilder.append(this.rightOperter.getValue());
            for (let index = 0; index < this.closeBracket; index++) {
                stringBuilder.append(")");
            }
            return stringBuilder.toString();
        }
    }
    ibas.JudgmentLinkItem = JudgmentLinkItem;
    /**
     * 判断链
     */
    class JudgmentLink {
        constructor() {
            this.judgmentItems = new ibas.ArrayList();
        }
        /**
         * 获取判断项目
         * @param startIndex 括号索引
         * @param judgmentItems 基于的项目
         */
        getJudgmentItems(startIndex, judgmentItems) {
            let done = false; // 完成
            let closeCount = 0;
            let bracket = -1;
            let currentJudgmentItems = new ibas.ArrayList();
            for (let index = startIndex; index < judgmentItems.length; index++) {
                let jItem = judgmentItems[index];
                if (bracket === -1) {
                    bracket = jItem.openBracket;
                }
                currentJudgmentItems.add(jItem);
                if (jItem.closeBracket > 0) {
                    closeCount += jItem.closeBracket;
                }
                if (jItem.openBracket > 0 && index !== startIndex) {
                    closeCount -= jItem.openBracket;
                }
                if (closeCount >= bracket) {
                    // 闭环
                    done = true;
                    break;
                }
            }
            if (!done) {
                // 未标记完成，存在不匹配的括号
                throw new Error(ibas.i18n.prop("sys_invaild_judgment_link_bracket", bracket));
            }
            return currentJudgmentItems;
        }
        /**
         * 判断
         * @param value 比较值
         * @return true,满足;false,不满足
         */
        judge(value) {
            if (ibas.objects.isNull(value)) {
                // 空对象，
                return false;
            }
            if (this.judgmentItems === null) {
                // 无条件
                return true;
            }
            // 设置所以条件的比较值
            for (let item of this.judgmentItems) {
                // 左值
                if (item.leftOperter instanceof PropertyValueOperator) {
                    let operator = item.leftOperter;
                    operator.setValue(value);
                }
                // 右值
                if (item.rightOperter instanceof PropertyValueOperator) {
                    let operator = item.rightOperter;
                    operator.setValue(value);
                }
            }
            return this.judgeLink(0, this.judgmentItems);
        }
        /**
         * 判断链
         * @param bracket 括号索引
         * @param judgmentItems 判断链
         */
        judgeLink(bracket, judgmentItems) {
            let currentValue = false; // 当前的结果
            let rootJudExp = null;
            for (let index = 0; index < judgmentItems.length; index++) {
                let jItem = judgmentItems[index];
                if (rootJudExp !== null) {
                    rootJudExp.operation = jItem.relationship;
                }
                // 计算表达式结果
                if ((jItem.openBracket !== bracket || (jItem.openBracket === bracket && index > 0))
                    && jItem.openBracket > 0) {
                    // 新的括号，先执行新括号判断
                    let nextJudgmentItems = this.getJudgmentItems(index, judgmentItems);
                    currentValue = this.judgeLink(jItem.openBracket, nextJudgmentItems);
                    // 跳过已执行的
                    if (nextJudgmentItems.length > 0) {
                        index = index + nextJudgmentItems.length - 1;
                    }
                }
                else {
                    // 计算当前表达式
                    currentValue = this.createExpression(jItem).result();
                }
                if (rootJudExp === null) {
                    // 第一个表达式
                    rootJudExp = judgment.expression.create("boolean");
                    rootJudExp.leftValue = currentValue;
                    rootJudExp.operation = ibas.emJudmentOperation.AND;
                    rootJudExp.rightValue = true;
                }
                else {
                    // 后续表达式
                    rootJudExp.rightValue = currentValue;
                }
                currentValue = rootJudExp.result();
                rootJudExp.leftValue = currentValue; // 结果左移
                if (!rootJudExp.result()) {
                    // 表达式不成立
                    if (index === judgmentItems.length - 1) {
                        // 最后一个表达式，返回结果
                        return false;
                    }
                }
            }
            return true;
        }
        /**
         * 创建表达式
         * @param judgeItem 判断项
         */
        createExpression(judgeItem) {
            let expression = judgment.expression.create(judgeItem.leftOperter.valueType());
            expression.leftValue = judgeItem.leftOperter.getValue();
            expression.operation = judgeItem.operation;
            expression.rightValue = judgeItem.rightOperter.getValue();
            return expression;
        }
    }
    ibas.JudgmentLink = JudgmentLink;
    /**
     * 业务对象的判断链
     */
    class BOJudgmentLink extends JudgmentLink {
        /**
         * 判断
         * @param value 比较值
         * @return true,满足;false,不满足
         */
        judge(value) {
            if (ibas.objects.isNull(value)) {
                // 空对象，
                return false;
            }
            if (this.judgmentItems == null) {
                // 无条件
                return true;
            }
            let jItems = new ibas.ArrayList();
            // 设置所以条件的比较值
            for (let item of this.judgmentItems) {
                // 左值
                if (item.leftOperter instanceof PropertyValueOperator) {
                    let operator = item.leftOperter;
                    operator.setValue(value);
                }
                // 右值
                if (item.rightOperter instanceof PropertyValueOperator) {
                    let operator = item.rightOperter;
                    operator.setValue(value);
                }
                else if (item.rightOperter instanceof ValueOperatorEx) {
                    let operator = item.rightOperter;
                    operator.converter = judgment.converter.create(item.leftOperter.valueType());
                }
                jItems.add(item);
            }
            let stringBuilder = new ibas.StringBuilder();
            stringBuilder.append("judgment:");
            stringBuilder.append(" ");
            stringBuilder.append(value.toString());
            stringBuilder.append("\n\t");
            for (let item of jItems) {
                if (stringBuilder.length > 4) {
                    stringBuilder.append(" ");
                }
                stringBuilder.append(item.toString());
            }
            ibas.logger.log(ibas.emMessageLevel.DEBUG, stringBuilder.toString());
            return this.judgeLink(0, jItems);
        }
        /**
         * 创建表达式
         * @param judgeItem 判断项
         */
        createExpression(judgeItem) {
            if (judgeItem.operation === ibas.emJudmentOperation.BEGIN_WITH
                || judgeItem.operation === ibas.emJudmentOperation.END_WITH
                || judgeItem.operation === ibas.emJudmentOperation.NOT_BEGIN_WITH
                || judgeItem.operation === ibas.emJudmentOperation.NOT_END_WITH
                || judgeItem.operation === ibas.emJudmentOperation.CONTAIN
                || judgeItem.operation === ibas.emJudmentOperation.NOT_CONTAIN) {
                // 此操作均为字符串独有操作
                let expression = judgment.expression.create("string");
                expression.leftValue = ibas.strings.valueOf(judgeItem.leftOperter.getValue());
                expression.operation = judgeItem.operation;
                expression.rightValue = ibas.strings.valueOf(judgeItem.rightOperter.getValue());
                return expression;
            }
            return super.createExpression(judgeItem);
        }
    }
    ibas.BOJudgmentLink = BOJudgmentLink;
    /**
     * 业务对象的判断链
     */
    class BOJudgmentLinkCondition extends BOJudgmentLink {
        /** 解析查询条件 */
        parsingConditions(conditions) {
            // 判断无条件
            if (ibas.objects.isNull(conditions) || conditions.length === 0) {
                return;
            }
            let jLinkItems = new ibas.ArrayList();
            for (let item of conditions) {
                let jItem = new JudgmentLinkItem();
                jItem.openBracket = item.bracketOpen;
                jItem.closeBracket = item.bracketClose;
                if (item.relationship === ibas.emConditionRelationship.NONE) {
                    jItem.relationship = ibas.emJudmentOperation.AND;
                }
                else {
                    jItem.relationship = judgment.convert.relationship(item.relationship);
                }
                jItem.operation = judgment.convert.operation(item.operation);
                // 左边取值
                let operator = new PropertyValueOperator();
                operator.propertyName = item.alias;
                jItem.leftOperter = operator;
                // 右边取值
                if (!ibas.strings.isEmpty(item.comparedAlias)) {
                    // 与属性比较
                    operator = new PropertyValueOperator();
                    operator.propertyName = item.comparedAlias;
                    jItem.rightOperter = operator;
                }
                else {
                    // 与值比较
                    let operator = new ValueOperatorEx();
                    operator.setValue(item.value);
                    jItem.rightOperter = operator;
                }
                jLinkItems.add(jItem);
            }
            if (jLinkItems.length === 0) {
                throw new Error(ibas.i18n.prop("sys_invaild_judgment_link_conditions"));
            }
            super.judgmentItems = jLinkItems;
        }
    }
    ibas.BOJudgmentLinkCondition = BOJudgmentLinkCondition;
})(ibas || (ibas = {}));
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../../3rdparty/jquery.d.ts" />
/// <reference path="../common/Data.ts" />
/// <reference path="../common/I18N.ts" />
/// <reference path="../common/Configuration.ts" />
/// <reference path="../expression/JudgmentLink.ts" />
/// <reference path="./BORepositoryCore.ts" />
var ibas;
(function (ibas) {
    /** 远程仓库 */
    class RemoteRepositoryAjax extends ibas.RemoteRepository {
        constructor() {
            super(...arguments);
            /** 自动解析数据 */
            this.autoParsing = true;
        }
        /**
         * 远程方法调用
         * 特殊调用参数可重载createAjaxSettings方法
         * @param method 方法名称
         * @param data 数据
         * @param caller 方法监听
         */
        callRemoteMethod(method, data, caller) {
            let that = this;
            let ajaxSetting = this.createAjaxSettings(method, data);
            if (ibas.objects.isNull(ajaxSetting)) {
                throw new Error(ibas.i18n.prop("sys_invalid_parameter", "AjaxSetting"));
            }
            // 补充发生错误的事件
            ajaxSetting.error = function (jqXHR, textStatus, errorThrown) {
                let opRslt = new ibas.OperationResult();
                opRslt.resultCode = 10000 + jqXHR.status;
                opRslt.message = ibas.strings.format("{0} - {1}", textStatus, ibas.i18n.prop("sys_network_error"));
                ibas.logger.log(ibas.emMessageLevel.ERROR, "repository: call method [{2}] faild, {0} - {1}.", textStatus, errorThrown, ajaxSetting.url);
                caller.onCompleted.call(ibas.objects.isNull(caller.caller) ? caller : caller.caller, opRslt);
            };
            // 补充成功的事件
            ajaxSetting.success = function (data, textStatus, jqXHR) {
                if (that.autoParsing) {
                    let opRslt = that.converter.parsing(data, method);
                    if (ibas.objects.isNull(opRslt)) {
                        opRslt = new ibas.OperationResult();
                        opRslt.resultCode = 20000;
                        opRslt.message = ibas.i18n.prop("sys_data_converter_parsing_faild");
                        ibas.logger.log(ibas.emMessageLevel.ERROR, "repository: call method [{1}] faild, {0}", opRslt.message, ajaxSetting.url);
                    }
                    else if (!ibas.objects.instanceOf(opRslt, ibas.OperationResult) && !ibas.objects.instanceOf(opRslt, ibas.OperationMessage)) {
                        let tmpOpRslt = new ibas.OperationResult();
                        tmpOpRslt.addResults(opRslt);
                        opRslt = tmpOpRslt;
                    }
                    caller.onCompleted.call(ibas.objects.isNull(caller.caller) ? caller : caller.caller, opRslt);
                }
                else {
                    caller.onCompleted.call(ibas.objects.isNull(caller.caller) ? caller : caller.caller, data);
                }
            };
            // 调用远程方法
            jQuery.ajax(ajaxSetting);
        }
    }
    ibas.RemoteRepositoryAjax = RemoteRepositoryAjax;
    /** 远程业务对象仓库 */
    class BORepositoryAjax extends RemoteRepositoryAjax {
        /**
         * 查询数据
         * @param boName 业务对象名称
         * @param caller 查询者
         */
        fetch(boName, caller) {
            let method = "fetch" + boName;
            if (caller.criteria instanceof Array) {
                // 替换查询条件数组
                let criteria = new ibas.Criteria();
                for (let item of caller.criteria) {
                    if (ibas.objects.instanceOf(item, ibas.Condition)) {
                        criteria.conditions.add(item);
                    }
                    else {
                        throw new Error(ibas.i18n.prop("sys_invalid_parameter", "criteria"));
                    }
                }
                caller.criteria = criteria;
            }
            let data = JSON.stringify(this.converter.convert(caller.criteria, method));
            this.callRemoteMethod(method, data, caller);
        }
        /**
         * 保存数据
         * @param boName 业务对象名称
         * @param caller 保存者
         */
        save(boName, caller) {
            let method = "save" + boName;
            let data = JSON.stringify(this.converter.convert(caller.beSaved, method));
            this.callRemoteMethod(method, data, caller);
        }
        /**
         * 创建调用参数，可重载
         * @param method 方法名称
         * @param data 调用数据
         */
        createAjaxSettings(method, data) {
            let methodUrl = this.methodUrl(method);
            let ajaxSetting = {
                url: methodUrl,
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: true,
                data: data
            };
            return ajaxSetting;
        }
    }
    ibas.BORepositoryAjax = BORepositoryAjax;
    /** 远程文件只读仓库 */
    class FileRepositoryAjax extends RemoteRepositoryAjax {
        constructor() {
            super();
            // 关闭自动解析数据
            this.autoParsing = false;
        }
        /**
         * 创建调用参数，可重载
         * @param fileName 文件名
         * @param dataType 返回的数据类型
         */
        createAjaxSettings(fileName, caller) {
            let methodUrl = this.methodUrl(fileName);
            let type = "GET";
            let contentType = "application/json; charset=utf-8";
            if (!ibas.objects.isNull(caller.contentType)) {
                contentType = caller.contentType;
            }
            let dataType = "json";
            if (!ibas.objects.isNull(caller.dataType)) {
                dataType = caller.dataType;
            }
            let ajaxSetting = {
                url: methodUrl,
                type: type,
                contentType: contentType,
                dataType: dataType,
                async: true
            };
            return ajaxSetting;
        }
        /**
         * 加载文件
         * @param fileName 文件名称
         * @param caller 调用者
         */
        load(fileName, caller) {
            this.callRemoteMethod(fileName, caller, caller);
        }
    }
    ibas.FileRepositoryAjax = FileRepositoryAjax;
    /** 远程文件业务对象仓库 */
    class BOFileRepositoryAjax extends FileRepositoryAjax {
        /**
         * 查询数据
         * @param boName 业务对象名称
         * @param caller 查询监听者
         */
        fetch(boName, caller) {
            let criteria;
            if (caller.criteria instanceof Array) {
                criteria = new ibas.Criteria();
                for (let item of caller.criteria) {
                    if (!ibas.objects.instanceOf(item, ibas.Condition)) {
                        continue;
                    }
                    criteria.conditions.add(item);
                }
            }
            else if (ibas.objects.instanceOf(caller.criteria, ibas.Criteria)) {
                criteria = caller.criteria;
            }
            let fileName = ibas.strings.format("{0}s.json", boName).toLowerCase();
            let that = this;
            let loadFileCaller = {
                onCompleted(data) {
                    let opRslt = new ibas.OperationResult();
                    if (!ibas.objects.isNull(that.converter)) {
                        // 设置转换方法
                        if (data instanceof Array) {
                            let newDatas = new Array();
                            for (let item of data) {
                                if (item.type === undefined) {
                                    item.type = boName;
                                }
                                newDatas.push(that.converter.parsing(item, fileName));
                            }
                            // 排序
                            if (!ibas.objects.isNull(criteria) && criteria.sorts.length > 0) {
                                newDatas = ibas.arrays.sort(newDatas, criteria.sorts);
                            }
                            // 过滤数据
                            for (let item of newDatas) {
                                if (!ibas.objects.isNull(criteria)) {
                                    // 设置查询
                                    if (that.filter(criteria, item)) {
                                        opRslt.resultObjects.add(item);
                                    }
                                    if (criteria.result > 0 && opRslt.resultObjects.length >= criteria.result) {
                                        // 已够返回数量
                                        break;
                                    }
                                }
                                else {
                                    // 未设置查询
                                    opRslt.resultObjects.add(item);
                                }
                            }
                        }
                        else {
                            if (data.type === undefined) {
                                data.type = boName;
                            }
                            let newData = that.converter.parsing(data, fileName);
                            if (!ibas.objects.isNull(criteria)) {
                                // 设置查询
                                if (that.filter(criteria, newData)) {
                                    opRslt.resultObjects.add(newData);
                                }
                            }
                            else {
                                // 未设置查询
                                opRslt.resultObjects.add(newData);
                            }
                        }
                    }
                    else {
                        // 未设置转换方法，不能进行查询过滤
                        if (data instanceof Array) {
                            for (let item of data) {
                                opRslt.resultObjects.add(data);
                            }
                        }
                        else {
                            opRslt.resultObjects.add(data);
                        }
                    }
                    caller.onCompleted.call(ibas.objects.isNull(caller.caller) ? caller : caller.caller, opRslt);
                }
            };
            this.load(fileName, loadFileCaller);
        }
        /**
         * 过滤数据
         * @param criteria 查询
         * @param data 数据
         * @return true,符合条件；false，不符合条件
         */
        filter(criteria, data) {
            if (ibas.objects.isNull(criteria)) {
                return true;
            }
            if (criteria.conditions.length === 0) {
                return true;
            }
            let judgmentLink = new ibas.BOJudgmentLinkCondition();
            judgmentLink.parsingConditions(criteria.conditions);
            return judgmentLink.judge(data);
        }
    }
    ibas.BOFileRepositoryAjax = BOFileRepositoryAjax;
    /** 文件上传仓库 */
    class FileRepositoryUploadAjax extends RemoteRepositoryAjax {
        /**
         * 创建调用参数，可重载
         * @param fileName 文件名
         * @param dataType 返回的数据类型
         */
        createAjaxSettings(method, data) {
            let methodUrl = this.methodUrl(method);
            let ajaxSetting = {
                url: methodUrl,
                type: "POST",
                data: data,
                async: false,
                cache: false,
                contentType: false,
                processData: false
            };
            return ajaxSetting;
        }
        /**
         * 上传文件
         * @param method 方法地址
         * @param caller 调用者
         */
        upload(method, caller) {
            this.callRemoteMethod(method, caller.fileData, caller);
        }
    }
    ibas.FileRepositoryUploadAjax = FileRepositoryUploadAjax;
    /** 远程仓库 */
    class RemoteRepositoryXhr extends ibas.RemoteRepository {
        constructor() {
            super(...arguments);
            /** 自动解析数据 */
            this.autoParsing = true;
        }
        /**
         * 远程方法调用
         * 特殊调用参数可重载createAjaxSettings方法
         * @param method 方法名称
         * @param data 数据
         * @param caller 方法监听
         */
        callRemoteMethod(method, data, caller) {
            let request = this.createHttpRequest(method, data);
            if (ibas.objects.isNull(request)) {
                throw new Error(ibas.i18n.prop("sys_invalid_parameter", "HttpRequest"));
            }
            let that = this;
            request.onreadystatechange = function () {
                if (this.readyState === 4) {
                    let opRslt = new ibas.OperationResult();
                    // 响应完成
                    if ((this.status >= 200 && this.status < 300) || this.status === 304) {
                        // 成功
                        if (that.autoParsing) {
                            let opRslt = that.converter.parsing(this.response, method);
                            if (ibas.objects.isNull(opRslt)) {
                                throw new Error(ibas.i18n.prop("sys_data_converter_parsing_faild"));
                            }
                            caller.onCompleted.call(ibas.objects.isNull(caller.caller) ? caller : caller.caller, opRslt);
                        }
                        else {
                            caller.onCompleted.call(ibas.objects.isNull(caller.caller) ? caller : caller.caller, this.response);
                        }
                        let headers = request.getAllResponseHeaders();
                        if (!ibas.strings.isEmpty(headers)) {
                            headers = headers.replace("\r\n", "\n");
                            for (let item of headers.split("\n")) {
                                let values = item.split(":");
                                if (values.length < 2) {
                                    continue;
                                }
                                opRslt.informations.add(new ibas.OperationInformation(values[0].trim(), values[1].trim()));
                            }
                        }
                    }
                    else {
                        // 出错了
                        opRslt.resultCode = 10000 + this.status;
                        if (this.status === 500) {
                            opRslt.message = ibas.strings.format("{0} - {1}", this.statusText, ibas.i18n.prop("sys_server_internal_error"));
                        }
                        else {
                            opRslt.message = ibas.strings.format("{0} - {1}", this.statusText, ibas.i18n.prop("sys_network_error"));
                        }
                        ibas.logger.log(ibas.emMessageLevel.ERROR, "repository: call method [{2}] faild, {0} - {1}.", this.status, this.statusText, this.responseURL);
                        caller.onCompleted.call(ibas.objects.isNull(caller.caller) ? caller : caller.caller, opRslt);
                    }
                }
            };
            request.send(data);
        }
    }
    ibas.RemoteRepositoryXhr = RemoteRepositoryXhr;
    /** 文件下载仓库 */
    class FileRepositoryDownloadAjax extends RemoteRepositoryXhr {
        constructor() {
            super();
            this.autoParsing = false;
        }
        /**
         * 下载文件
         * @param method 方法地址
         * @param caller 调用者
         */
        download(method, caller) {
            let methodCaller = {
                onCompleted(data) {
                    let opRslt = null;
                    if (data instanceof ibas.OperationResult) {
                        opRslt = data;
                    }
                    else {
                        opRslt = new ibas.OperationResult();
                        opRslt.resultObjects.add(data);
                    }
                    caller.onCompleted.call(ibas.objects.isNull(caller.caller) ? caller : caller.caller, opRslt);
                }
            };
            let data = caller.criteria;
            if (!(data instanceof FormData)) {
                data = JSON.stringify(this.converter.convert(data, method));
            }
            this.callRemoteMethod(method, data, methodCaller);
        }
        createHttpRequest(method, data) {
            let methodUrl = this.methodUrl(method);
            let xhr = new XMLHttpRequest();
            xhr.open("POST", methodUrl, true);
            xhr.responseType = "blob";
            if (!(data instanceof FormData)) {
                xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            }
            return xhr;
        }
    }
    ibas.FileRepositoryDownloadAjax = FileRepositoryDownloadAjax;
})(ibas || (ibas = {}));
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../common/Data.ts" />
/// <reference path="../common/I18N.ts" />
/// <reference path="../common/Configuration.ts" />
/// <reference path="./BORepositoryCore.ts" />
var ibas;
(function (ibas) {
    /** 本地仓库 */
    class LocalRepository {
    }
    ibas.LocalRepository = LocalRepository;
    /** 本地仓库，IndexedDB */
    class LocalRepositoryIndexedDB extends LocalRepository {
        /** 打开数据库 */
        openDB(opener) {
            if (ibas.strings.isEmpty(this.name)) {
                opener.onError(new Error(ibas.i18n.prop("sys_invalid_parameter", "name")));
                return;
            }
            if (!ibas.objects.isNull(this.db)) {
                opener.onSuccess(this.db);
                return;
            }
            let dbFactory = window.indexedDB;
            if (ibas.objects.isNull(dbFactory)) {
                opener.onError(new Error(ibas.i18n.prop("sys_invalid_parameter", "indexedDB")));
                return;
            }
            let that = this;
            let dbRequest = dbFactory.open(this.name, 1);
            dbRequest.onerror = function (e) {
                opener.onError(e.currentTarget.error);
            };
            dbRequest.onsuccess = function (e) {
                that.db = e.target.result;
                opener.onSuccess(that.db);
            };
            dbRequest.onupgradeneeded = function (e) {
                that.db = e.target.result;
                opener.onSuccess(that.db);
                dbRequest.onsuccess = null;
            };
        }
        /** 关闭数据库 */
        closeDB() {
            if (ibas.objects.isNull(this.db)) {
                return;
            }
            this.db.close();
            this.db = null;
        }
    }
    ibas.LocalRepositoryIndexedDB = LocalRepositoryIndexedDB;
    /** 本地业务对象仓库 */
    class BORepositoryIndexedDB extends LocalRepositoryIndexedDB {
        /**
         * 查询数据
         * @param boName 业务对象名称
         * @param caller 查询监听者
         */
        fetch(boName, caller) {
            let that = this;
            this.openDB({
                onError(error) {
                    caller.onCompleted(new ibas.OperationResult(error));
                },
                onSuccess(db) {
                    let objectStore = db.transaction(boName, "readonly").objectStore(boName);
                    let dbRequest = objectStore.openCursor();
                    dbRequest.onerror = function (e) {
                        caller.onCompleted(new ibas.OperationResult(e.currentTarget.error));
                    };
                    let opRslt = new ibas.OperationResult();
                    dbRequest.onsuccess = function (e) {
                        let cursor = e.target.result;
                        if (cursor) {
                            let data = cursor.value;
                            if (!ibas.objects.isNull(that.converter)) {
                                data = that.converter.parsing(data, boName);
                            }
                            if (that.filter(caller.criteria, data)) {
                                opRslt.resultObjects.add(data);
                            }
                            cursor.continue();
                        }
                        else {
                            caller.onCompleted(opRslt);
                        }
                    };
                }
            });
        }
        /**
         * 过滤数据
         * @param criteria 查询
         * @param data 数据
         * @return true,符合条件；false，不符合条件
         */
        filter(criteria, data) {
            if (ibas.objects.isNull(criteria)) {
                return true;
            }
            if (criteria.conditions.length === 0) {
                return true;
            }
            let judgmentLink = new ibas.BOJudgmentLinkCondition();
            judgmentLink.parsingConditions(criteria.conditions);
            return judgmentLink.judge(data);
        }
        /**
         * 保存数据
         * @param boName 业务对象名称
         * @param caller 保存监听者
         */
        save(boName, caller) {
            if (ibas.strings.isEmpty(boName)) {
                boName = "buckets";
            }
            let storeParameters = {
                autoIncrement: true,
            };
            let that = this;
            this.openDB({
                onError(error) {
                    caller.onCompleted(new ibas.OperationResult(error));
                },
                onSuccess(db) {
                    let objectStore = null;
                    if (db.objectStoreNames.contains(boName)) {
                        objectStore = db.transaction(boName, "readwrite").objectStore(boName);
                    }
                    else {
                        if (ibas.objects.isNull(storeParameters)) {
                            objectStore = db.createObjectStore(boName);
                        }
                        else {
                            objectStore = db.createObjectStore(boName, storeParameters);
                        }
                    }
                    if (ibas.objects.isNull(objectStore)) {
                        caller.onCompleted(new ibas.OperationResult(new Error(ibas.i18n.prop("sys_invalid_parameter", "objectStore"))));
                        return;
                    }
                    let data = caller.beSaved;
                    if (!ibas.objects.isNull(that.converter)) {
                        data = that.converter.convert(data, boName);
                    }
                    let dbRequest = objectStore.put(data);
                    dbRequest.onerror = function (e) {
                        caller.onCompleted(new ibas.OperationResult(e.currentTarget.error));
                    };
                    dbRequest.onsuccess = function (e) {
                        let opRslt = new ibas.OperationResult();
                        opRslt.resultObjects.add(caller.beSaved);
                        caller.onCompleted(opRslt);
                    };
                }
            });
        }
    }
    ibas.BORepositoryIndexedDB = BORepositoryIndexedDB;
})(ibas || (ibas = {}));
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../common/Data.ts" />
/// <reference path="../common/I18N.ts" />
/// <reference path="../common/Configuration.ts" />
/// <reference path="./BORepositoryCore.ts" />
var ibas;
(function (ibas) {
    /** 模块仓库名称模板 */
    ibas.MODULE_REPOSITORY_NAME_TEMPLATE = "BORepository{0}";
    /** 配置项目-离线模式 */
    ibas.CONFIG_ITEM_OFFLINE_MODE = "offline";
    /** 配置项目-仓库离线模式 */
    ibas.CONFIG_ITEM_REPOSITORY_OFFLINE_MODE = "offline|{0}";
    /** 配置项目-远程仓库的默认地址模板 */
    ibas.CONFIG_ITEM_TEMPLATE_REMOTE_REPOSITORY_ADDRESS = "repositoryAddress|{0}";
    /** 配置项目-离线仓库的默认地址模板 */
    ibas.CONFIG_ITEM_TEMPLATE_OFFLINE_REPOSITORY_ADDRESS = "repositoryAddress|{0}Offline";
    /** 配置项目-用户口令 */
    ibas.CONFIG_ITEM_USER_TOKEN = "userToken";
    /** 配置项目-仓库用户口令 */
    ibas.CONFIG_ITEM_REPOSITORY_USER_TOKEN = "userToken|{0}";
    /**
     * 业务仓库应用
     */
    class BORepositoryApplication {
        constructor() {
            // 子类名称
            let name = this.constructor.name;
            // 获取全局离线状态
            this.offline = ibas.config.get(ibas.CONFIG_ITEM_OFFLINE_MODE, false);
            // 获取此仓库离线状态
            this.offline = ibas.config.get(ibas.strings.format(ibas.CONFIG_ITEM_REPOSITORY_OFFLINE_MODE, name), this.offline);
            // 获取远程仓库的默认地址
            let address;
            if (this.offline) {
                // 离线状态，获取离线地址
                address = ibas.config.get(ibas.strings.format(ibas.CONFIG_ITEM_TEMPLATE_OFFLINE_REPOSITORY_ADDRESS, name));
            }
            // 没获取到离线地址，则在线地址
            if (ibas.strings.isEmpty(address)) {
                // 在线状态
                address = ibas.config.get(ibas.strings.format(ibas.CONFIG_ITEM_TEMPLATE_REMOTE_REPOSITORY_ADDRESS, name));
            }
            if (!ibas.strings.isEmpty(address)) {
                address = ibas.urls.normalize(address);
                this.address = address;
                ibas.logger.log(ibas.emMessageLevel.DEBUG, "repository: [{0}] using address [{1}].", name, address);
            }
            // 用户口令，先获取仓库口令
            this.token = ibas.config.get(ibas.strings.format(ibas.CONFIG_ITEM_REPOSITORY_USER_TOKEN, name));
            // 没有仓库口令，则使用全局口令
            if (ibas.strings.isEmpty(this.token)) {
                this.token = ibas.config.get(ibas.CONFIG_ITEM_USER_TOKEN);
            }
        }
        /** 创建只读业务仓库 */
        createReadonlyRepository() {
            if (this.offline) {
                // 离线状态，使用文件仓库
                let boRepository = new ibas.BOFileRepositoryAjax();
                boRepository.address = this.address;
                boRepository.token = this.token;
                boRepository.converter = this.createConverter();
                return boRepository;
            }
            else {
                // 在线状态，使用服务仓库
                let boRepository = new ibas.BORepositoryAjax();
                boRepository.address = this.address;
                boRepository.token = this.token;
                boRepository.converter = this.createConverter();
                return boRepository;
            }
        }
        /** 创建读写业务仓库 */
        createRepository() {
            let boRepository = new ibas.BORepositoryAjax();
            boRepository.address = this.address;
            boRepository.token = this.token;
            boRepository.converter = this.createConverter();
            return boRepository;
        }
        /** 查询业务对象 */
        fetch(boName, caller) {
            let boRepository = this.createReadonlyRepository();
            if (ibas.objects.isNull(boRepository)) {
                throw new Error(ibas.i18n.prop("sys_invalid_parameter", "boRepository"));
            }
            boRepository.fetch(boName, caller);
        }
        /** 保存业务对象 */
        save(boName, caller) {
            if (this.offline) {
                throw new Error(ibas.i18n.prop("sys_operation_not_allowed_on_offline"));
            }
            let boRepository = this.createRepository();
            if (ibas.objects.isNull(boRepository)) {
                throw new Error(ibas.i18n.prop("sys_invalid_parameter", "boRepository"));
            }
            boRepository.save(boName, caller);
        }
    }
    ibas.BORepositoryApplication = BORepositoryApplication;
})(ibas || (ibas = {}));
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../common/Data.ts" />
/// <reference path="../common/Configuration.ts" />
var ibas;
(function (ibas) {
    const PROPERTY_STARTTIME = Symbol("startTime");
    const PROPERTY_ENDTIME = Symbol("endTime");
    const PROPERTY_LOGGER = Symbol("logger");
    const PROPERTY_CONFIG = Symbol("config");
    /**
     * 动作
     */
    class Action {
        /** 开始时间 */
        get startTime() {
            return this[PROPERTY_STARTTIME];
        }
        /** 结束时间 */
        get endTime() {
            return this[PROPERTY_ENDTIME];
        }
        /**
         * 添加配置
         * @param key 配置项
         * @param value 值
         */
        addConfig(key, value) {
            if (ibas.objects.isNull(this[PROPERTY_CONFIG])) {
                this[PROPERTY_CONFIG] = new ibas.Configuration();
            }
            this[PROPERTY_CONFIG].set(key, value);
            this.log(ibas.emMessageLevel.INFO, "new config item [{1} - {2}].", ibas.objects.isNull(this.name) ? this.id : this.name, key, value);
        }
        getConfig() {
            if (ibas.objects.isNull(this[PROPERTY_CONFIG])) {
                this[PROPERTY_CONFIG] = new ibas.Configuration();
            }
            return this[PROPERTY_CONFIG].get.apply(this[PROPERTY_CONFIG], arguments);
        }
        /** 设置日志记录者 */
        setLogger(logger) {
            this[PROPERTY_LOGGER] = logger;
        }
        log() {
            if (ibas.objects.isNull(this[PROPERTY_LOGGER])) {
                // 未提供则使用默认
                this.setLogger(new ibas.Logger());
            }
            let pars = [];
            let heard = ibas.strings.format("{0}: ", ibas.objects.isNull(this.name) ? ibas.objects.getTypeName(this) : this.name);
            if (typeof arguments[0] === "number") {
                // 类型
                pars.push(arguments[0]);
                // 内容
                pars.push(heard + arguments[1]);
                for (let index = 2; index < arguments.length; index++) {
                    pars.push(arguments[index]);
                }
            }
            else if (arguments[0] instanceof Error) {
                // 类型
                pars.push(ibas.emMessageLevel.ERROR);
                // 内容
                pars.push(heard + arguments[0].message);
                for (let index = 1; index < arguments.length; index++) {
                    pars.push(arguments[index]);
                }
            }
            else {
                // 类型
                pars.push(ibas.emMessageLevel.INFO);
                // 内容
                pars.push(heard + arguments[0]);
                for (let index = 1; index < arguments.length; index++) {
                    pars.push(arguments[index]);
                }
            }
            return this[PROPERTY_LOGGER].log.apply(this[PROPERTY_LOGGER], pars);
        }
        /** 是否运行中 */
        isRunning() {
            if (ibas.objects.isNull(this[PROPERTY_STARTTIME])) {
                return false;
            }
            if (!ibas.objects.isNull(this[PROPERTY_ENDTIME])) {
                return false;
            }
            return true;
        }
        /** 进行 */
        do() {
            if (this.isRunning()) {
                throw new Error("action is running.");
            }
            let done = false;
            this[PROPERTY_STARTTIME] = new Date();
            this[PROPERTY_ENDTIME] = undefined;
            this.log(ibas.emMessageLevel.INFO, "action is starting at [{0}].", this.startTime.toLocaleString());
            try {
                done = this.run();
            }
            catch (error) {
                this.log(ibas.emMessageLevel.ERROR, "occurred error [{0}].", error);
            }
            if (done) {
                // 任务完成
                this.done();
            }
        }
        /** 完成 */
        done() {
            // 任务执行完成
            if (!this.isRunning()) {
                throw new Error("action is not running.");
            }
            this[PROPERTY_ENDTIME] = new Date();
            this.log(ibas.emMessageLevel.INFO, "action was completed at [{0}], during [{1}]s.", this.endTime.toLocaleString(), ibas.dates.difference(ibas.dates.emDifferenceType.SECOND, this.endTime, this.startTime));
            if (this.onDone instanceof Function) {
                this.onDone();
            }
        }
        /** 停止（最好重载） */
        stop() {
            this.done();
        }
    }
    ibas.Action = Action;
})(ibas || (ibas = {}));
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
var ibas;
(function (ibas) {
    /** 业务规则错误 */
    class BusinessRuleError extends Error {
    }
    ibas.BusinessRuleError = BusinessRuleError;
    class BusinessRulesManager {
        getRules(type) {
            if (ibas.objects.isNull(this.rules)) {
                this.rules = new Map();
            }
            let rules = this.rules.get(type);
            if (ibas.objects.isNull(rules)) {
                rules = new BusinessRules();
                this.rules.set(type, rules);
            }
            return rules;
        }
    }
    class BusinessRules extends Array {
        constructor() {
            super();
            this.initialized = false;
        }
        /** 注册规则 */
        register(rules) {
            if (rules instanceof Array) {
                for (let item of rules) {
                    this.push(item);
                }
            }
            else {
                this.push(rules);
            }
        }
        /** 大小 */
        size() {
            if (ibas.objects.isNull(this)) {
                return 0;
            }
            return this.length;
        }
        /**
         * 运行业务规则
         * @param bo
         *            执行规则的业务对象
         * @param properties
         *            变化的属性
         */
        execute(bo, ...properties) {
            let rules = new ibas.ArrayList();
            for (let rule of this) {
                let done = false;
                for (let property of properties) {
                    if (ibas.objects.isNull(rule.inputProperties)) {
                        continue;
                    }
                    if (rule.inputProperties.contain(property)) {
                        done = true;
                        break;
                    }
                }
                if (done) {
                    rules.add(rule);
                }
            }
            for (let rule of rules) {
                rule.execute(bo);
            }
        }
    }
    /** 业务规则 */
    class BusinessRule {
        constructor() {
            this.name = ibas.objects.getName(ibas.objects.getType(this));
            this.inputProperties = new ibas.ArrayList();
            this.affectedProperties = new ibas.ArrayList();
        }
    }
    ibas.BusinessRule = BusinessRule;
    /** 业务规则内容 */
    class BusinessRuleContextCommon {
        constructor() {
            this.inputValues = new Map();
            this.outputValues = new Map();
        }
    }
    ibas.BusinessRuleContextCommon = BusinessRuleContextCommon;
    /** 普通业务规则 */
    class BusinessRuleCommon extends BusinessRule {
        /** 运行业务逻辑 */
        execute(bo) {
            try {
                let context = new BusinessRuleContextCommon();
                context.source = bo;
                if (!ibas.objects.isNull(this.inputProperties)) {
                    for (let item of this.inputProperties) {
                        context.inputValues.set(item, bo.getProperty(item));
                    }
                }
                ibas.logger.log(ibas.emMessageLevel.DEBUG, "rules: executing rule [{0} - {1}].", this.name, ibas.objects.getName(ibas.objects.getType(this)));
                this.compute(context);
                if (!ibas.objects.isNull(this.affectedProperties) && !ibas.objects.isNull(context.outputValues)) {
                    for (let item of this.affectedProperties) {
                        let value = context.outputValues.get(item);
                        if (value !== undefined) {
                            bo.setProperty(item, value);
                        }
                    }
                }
            }
            catch (error) {
                if (error instanceof BusinessRuleError) {
                    throw error;
                }
                else {
                    throw new BusinessRuleError(error);
                }
            }
        }
    }
    ibas.BusinessRuleCommon = BusinessRuleCommon;
    /** 业务规则内容 */
    class BusinessRuleContextCollection {
        constructor() {
            this.inputValues = new Map();
            this.outputValues = new Map();
        }
    }
    ibas.BusinessRuleContextCollection = BusinessRuleContextCollection;
    /** 集合属性业务规则 */
    class BusinessRuleCollection extends BusinessRule {
        constructor(collection) {
            super();
            this.collection = collection;
        }
        /** 运行业务逻辑 */
        execute(bo) {
            try {
                let context = new BusinessRuleContextCommon();
                context.source = bo;
                if (!ibas.objects.isNull(this.collection) && !ibas.objects.isNull(this.inputProperties)) {
                    let boValues = bo.getProperty(this.collection);
                    if (boValues instanceof Array) {
                        for (let item of this.inputProperties) {
                            let values = new ibas.ArrayList();
                            for (let boValue of boValues) {
                                if (boValue instanceof ibas.TrackableBase) {
                                    if (boValue.isDeleted) {
                                        continue;
                                    }
                                }
                                values.add(boValue.getProperty(item));
                            }
                            context.inputValues.set(item, values);
                        }
                    }
                }
                ibas.logger.log(ibas.emMessageLevel.DEBUG, "rules: executing rule [{0} - {1}].", this.name, ibas.objects.getName(ibas.objects.getType(this)));
                this.compute(context);
                if (!ibas.objects.isNull(this.affectedProperties) && !ibas.objects.isNull(context.outputValues)) {
                    for (let item of this.affectedProperties) {
                        let value = context.outputValues.get(item);
                        if (value !== undefined) {
                            bo.setProperty(item, value);
                        }
                    }
                }
            }
            catch (error) {
                if (error instanceof BusinessRuleError) {
                    throw error;
                }
                else {
                    throw new BusinessRuleError(error);
                }
            }
        }
    }
    ibas.BusinessRuleCollection = BusinessRuleCollection;
    ibas.businessRulesManager = new BusinessRulesManager();
})(ibas || (ibas = {}));
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
var ibas;
(function (ibas) {
    /** 业务规则-最大长度 */
    class BusinessRuleMaxLength extends ibas.BusinessRuleCommon {
        /**
         *
         * @param length 长度
         * @param properties 属性
         */
        constructor(length, ...properties) {
            super();
            this.maxLength = length;
            this.name = ibas.i18n.prop("sys_business_rule_max_length");
            for (let item of properties) {
                this.inputProperties.add(item);
            }
        }
        /** 计算规则 */
        compute(context) {
            for (let item of context.inputValues.entries()) {
                let name = item["0"];
                let value = item["1"];
                if (typeof value === "string") {
                    if (value.length > this.maxLength) {
                        throw new ibas.BusinessRuleError(ibas.i18n.prop("sys_business_rule_max_length_error", name, value, this.maxLength));
                    }
                }
            }
        }
    }
    ibas.BusinessRuleMaxLength = BusinessRuleMaxLength;
    /** 业务规则-最大值 */
    class BusinessRuleMaxValue extends ibas.BusinessRuleCommon {
        /**
         *
         * @param maxValue 最大值
         * @param properties 属性
         */
        constructor(maxValue, ...properties) {
            super();
            this.name = ibas.i18n.prop("sys_business_rule_max_value");
            this.maxValue = maxValue;
            for (let item of properties) {
                this.inputProperties.add(item);
            }
        }
        /** 计算规则 */
        compute(context) {
            for (let item of context.inputValues.entries()) {
                let name = item["0"];
                let value = item["1"];
                if (typeof this.maxValue === "number") {
                    value = ibas.numbers.valueOf(value);
                    if (value > this.maxValue) {
                        throw new ibas.BusinessRuleError(ibas.i18n.prop("sys_business_rule_max_value_error", name, value, this.maxValue));
                    }
                }
                else if (this.maxValue instanceof Date) {
                    value = ibas.dates.valueOf(value);
                    if (ibas.dates.compare(value, this.maxValue) > 0) {
                        throw new ibas.BusinessRuleError(ibas.i18n.prop("sys_business_rule_max_value_error", name, value, this.maxValue));
                    }
                }
            }
        }
    }
    ibas.BusinessRuleMaxValue = BusinessRuleMaxValue;
    /** 业务规则-最小值 */
    class BusinessRuleMinValue extends ibas.BusinessRuleCommon {
        /**
         *
         * @param minValue 最小值
         * @param properties 属性
         */
        constructor(minValue, ...properties) {
            super();
            this.name = ibas.i18n.prop("sys_business_rule_min_value");
            this.minValue = minValue;
            for (let item of properties) {
                this.inputProperties.add(item);
            }
        }
        /** 计算规则 */
        compute(context) {
            for (let item of context.inputValues.entries()) {
                let name = item["0"];
                let value = item["1"];
                if (typeof this.minValue === "number") {
                    value = ibas.numbers.valueOf(value);
                    if (value < this.minValue) {
                        throw new ibas.BusinessRuleError(ibas.i18n.prop("sys_business_rule_min_value_error", name, value, this.minValue));
                    }
                }
                else if (this.minValue instanceof Date) {
                    value = ibas.dates.valueOf(value);
                    if (ibas.dates.compare(value, this.minValue) < 0) {
                        throw new ibas.BusinessRuleError(ibas.i18n.prop("sys_business_rule_min_value_error", name, value, this.minValue));
                    }
                }
            }
        }
    }
    ibas.BusinessRuleMinValue = BusinessRuleMinValue;
    /** 业务规则-要求有值 */
    class BusinessRuleRequired extends ibas.BusinessRuleCommon {
        /**
         *
         * @param properties 属性
         */
        constructor(...properties) {
            super();
            this.name = ibas.i18n.prop("sys_business_rule_required");
            for (let item of properties) {
                this.inputProperties.add(item);
            }
        }
        /** 计算规则 */
        compute(context) {
            for (let item of context.inputValues.entries()) {
                let name = item["0"];
                let value = item["1"];
                if (ibas.objects.isNull(value)) {
                    throw new ibas.BusinessRuleError(ibas.i18n.prop("sys_business_rule_required_error", name));
                }
            }
        }
    }
    ibas.BusinessRuleRequired = BusinessRuleRequired;
    /** 业务规则-求和 */
    class BusinessRuleSummation extends ibas.BusinessRuleCommon {
        /**
         *
         * @param result 属性-结果
         * @param addends 属性-加数
         */
        constructor(result, ...addends) {
            super();
            this.name = ibas.i18n.prop("sys_business_rule_summation");
            this.result = result;
            this.addends = new ibas.ArrayList();
            for (let item of addends) {
                this.addends.add(item);
            }
            // 设置输入输出参数
            for (let item of this.addends) {
                this.inputProperties.add(item);
            }
            this.affectedProperties.add(this.result);
        }
        /** 计算规则 */
        compute(context) {
            let sum = 0;
            for (let property of this.addends) {
                let value = ibas.numbers.valueOf(context.inputValues.get(property));
                sum += value;
            }
            context.outputValues.set(this.result, ibas.numbers.round(sum));
        }
    }
    ibas.BusinessRuleSummation = BusinessRuleSummation;
    /** 业务规则-求差 */
    class BusinessRuleSubtraction extends ibas.BusinessRuleCommon {
        /**
         *
         * @param result 属性-结果
         * @param subtrahend 属性-被减数
         * @param subtractors 属性-减数
         */
        constructor(result, subtrahend, ...subtractors) {
            super();
            this.name = ibas.i18n.prop("sys_business_rule_subtraction");
            this.result = result;
            this.subtrahend = subtrahend;
            this.subtractors = new ibas.ArrayList();
            for (let item of subtractors) {
                this.subtractors.add(item);
            }
            // 设置输入输出参数
            this.inputProperties.add(this.subtrahend);
            for (let item of this.subtractors) {
                this.inputProperties.add(item);
            }
            this.affectedProperties.add(this.result);
        }
        /** 计算规则 */
        compute(context) {
            let total = context.inputValues.get(this.subtrahend);
            for (let property of this.subtractors) {
                let value = ibas.numbers.valueOf(context.inputValues.get(property));
                total -= value;
            }
            context.outputValues.set(this.result, ibas.numbers.round(total));
        }
    }
    ibas.BusinessRuleSubtraction = BusinessRuleSubtraction;
    /** 业务规则-求积 */
    class BusinessRuleMultiplication extends ibas.BusinessRuleCommon {
        /**
         *
         * @param result 属性-结果
         * @param multiplicand 属性-被乘数
         * @param multiplier 属性-乘数
         */
        constructor(result, multiplicand, multiplier) {
            super();
            this.name = ibas.i18n.prop("sys_business_rule_multiplication");
            this.result = result;
            this.multiplicand = multiplicand;
            this.multiplier = multiplier;
            this.inputProperties.add(this.multiplicand);
            this.inputProperties.add(this.multiplier);
            this.affectedProperties.add(this.result);
        }
        /** 计算规则 */
        compute(context) {
            let multiplicand = ibas.numbers.valueOf(context.inputValues.get(this.multiplicand));
            let multiplier = ibas.numbers.valueOf(context.inputValues.get(this.multiplier));
            let result = multiplicand * multiplier;
            context.outputValues.set(this.result, ibas.numbers.round(result));
        }
    }
    ibas.BusinessRuleMultiplication = BusinessRuleMultiplication;
    /** 业务规则-求商 */
    class BusinessRuleDivision extends ibas.BusinessRuleCommon {
        /**
         *
         * @param result 属性-结果
         * @param dividend 属性-被除数
         * @param divisor 属性-除数
         */
        constructor(result, dividend, divisor) {
            super();
            this.name = ibas.i18n.prop("sys_business_rule_division");
            this.result = result;
            this.dividend = dividend;
            this.divisor = divisor;
            this.inputProperties.add(this.dividend);
            this.inputProperties.add(this.divisor);
            this.affectedProperties.add(this.result);
        }
        /** 计算规则 */
        compute(context) {
            let dividend = ibas.numbers.valueOf(context.inputValues.get(this.dividend));
            let divisor = ibas.numbers.valueOf(context.inputValues.get(this.divisor));
            let result = dividend / divisor;
            context.outputValues.set(this.result, ibas.numbers.round(result));
        }
    }
    ibas.BusinessRuleDivision = BusinessRuleDivision;
    /** 业务规则-加减法推导 */
    class BusinessRuleAdditiveDeduction extends ibas.BusinessRuleCommon {
        /**
         *
         * @param augend 属性-被加数
         * @param addend 属性-加数
         * @param result 属性-结果
         */
        constructor(augend, addend, result) {
            super();
            this.name = ibas.i18n.prop("sys_business_rule_additive_deduction");
            this.result = result;
            this.augend = augend;
            this.addend = addend;
            this.inputProperties.add(this.result);
            this.inputProperties.add(this.augend);
            this.inputProperties.add(this.addend);
            this.affectedProperties.add(this.result);
            this.affectedProperties.add(this.addend);
        }
        /** 计算规则 */
        compute(context) {
            let result = ibas.numbers.valueOf(context.inputValues.get(this.result));
            let augend = ibas.numbers.valueOf(context.inputValues.get(this.augend));
            let addend = ibas.numbers.valueOf(context.inputValues.get(this.addend));
            if (augend === 0) {
                context.outputValues.set(this.result, ibas.numbers.round(addend));
                return;
            }
            if (addend !== 0 && result === 0) {
                // 结果 = 加数 + 被加数
                result = addend + augend;
                context.outputValues.set(this.result, ibas.numbers.round(result));
            }
            else if (addend === 0 && result !== 0) {
                // 加数 = 结果 - 被加数
                addend = result - augend;
                context.outputValues.set(this.addend, ibas.numbers.round(addend));
            }
        }
    }
    ibas.BusinessRuleAdditiveDeduction = BusinessRuleAdditiveDeduction;
    /** 业务规则-乘除法推导 */
    class BusinessRuleMultiplicativeDeduction extends ibas.BusinessRuleCommon {
        /**
         *
         * @param augend 属性-被乘数
         * @param addend 属性-乘数
         * @param result 属性-结果
         */
        constructor(multiplicand, multiplier, result) {
            super();
            this.name = ibas.i18n.prop("sys_business_rule_multiplicative_deduction");
            this.result = result;
            this.multiplicand = multiplicand;
            this.multiplier = multiplier;
            this.inputProperties.add(this.result);
            this.inputProperties.add(this.multiplicand);
            this.inputProperties.add(this.multiplier);
            this.affectedProperties.add(this.result);
            this.affectedProperties.add(this.multiplier);
        }
        /** 计算规则 */
        compute(context) {
            let result = ibas.numbers.valueOf(context.inputValues.get(this.result));
            let multiplicand = ibas.numbers.valueOf(context.inputValues.get(this.multiplicand));
            let multiplier = ibas.numbers.valueOf(context.inputValues.get(this.multiplier));
            if (multiplicand === 0) {
                context.outputValues.set(this.result, ibas.numbers.round(multiplicand));
                return;
            }
            if (multiplier !== 0 && result === 0) {
                // 结果 = 乘数 * 被乘数
                result = multiplier * multiplicand;
                context.outputValues.set(this.result, ibas.numbers.round(result));
            }
            else if (multiplicand !== 0 && result !== 0) {
                // 乘数 = 结果 / 被乘数
                multiplier = result / multiplicand;
                context.outputValues.set(this.multiplier, ibas.numbers.round(multiplier));
            }
        }
    }
    ibas.BusinessRuleMultiplicativeDeduction = BusinessRuleMultiplicativeDeduction;
    /**
     * 业务规则-集合元素属性求和
     */
    class BusinessRuleSumElements extends ibas.BusinessRuleCollection {
        /**
         *
         * @param result 属性-结果
         * @param collection 属性-集合
         * @param summing 属性-求和
         */
        constructor(result, collection, summing) {
            super(collection);
            this.name = ibas.i18n.prop("sys_business_rule_sum_elements");
            this.result = result;
            this.summing = summing;
            this.inputProperties.add(this.summing);
            this.affectedProperties.add(this.result);
        }
        /** 计算规则 */
        compute(context) {
            let result = 0;
            let values = context.inputValues.get(this.summing);
            if (!ibas.objects.isNull(values)) {
                for (let item of values) {
                    result += ibas.numbers.valueOf(item);
                }
            }
            context.outputValues.set(this.result, ibas.numbers.round(result));
        }
    }
    ibas.BusinessRuleSumElements = BusinessRuleSumElements;
})(ibas || (ibas = {}));
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
var ibas;
(function (ibas) {
    /** 系统用户-标记 */
    ibas.SYSTEM_USER_ID = -9;
    /** 位置用户-标记 */
    ibas.UNKNOWN_USER_ID = -1;
    /** 配置项目-审批方法 */
    ibas.CONFIG_ITEM_APPROVAL_WAY = "approvalWay";
    /** 配置项目-组织方式 */
    ibas.CONFIG_ITEM_ORGANIZATION_WAY = "organizationWay";
    /** 配置项目-权限判断方式 */
    ibas.CONFIG_ITEM_OWNERSHIP_WAY = "ownershipWay";
    /** 配置项目-格式-日期 */
    ibas.CONFIG_ITEM_FORMAT_DATE = "format|Date";
    /** 配置项目-格式-时间 */
    ibas.CONFIG_ITEM_FORMAT_TIME = "format|Time";
    /** 配置项目-格式-日期时间 */
    ibas.CONFIG_ITEM_FORMAT_DATETIME = "format|DateTime";
    /** 配置项目-小数位 */
    ibas.CONFIG_ITEM_DECIMAL_PLACES = "decimalPlaces";
    /** 配置项目-小数位-价格 */
    ibas.CONFIG_ITEM_DECIMAL_PLACES_PRICE = "decimalPlaces|Price";
    /** 配置项目-小数位-数量 */
    ibas.CONFIG_ITEM_DECIMAL_PLACES_QUANTITY = "decimalPlaces|Quantity";
    /** 配置项目-小数位-率 */
    ibas.CONFIG_ITEM_DECIMAL_PLACES_RATE = "decimalPlaces|Rate";
    /** 配置项目-小数位-总计 */
    ibas.CONFIG_ITEM_DECIMAL_PLACES_SUM = "decimalPlaces|Sum";
    /** 配置项目-小数位-单位数量 */
    ibas.CONFIG_ITEM_DECIMAL_PLACES_MEASUREMENT = "decimalPlaces|Measurement";
})(ibas || (ibas = {}));
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
var ibas;
(function (ibas) {
    /** 平台 */
    let emPlantform;
    (function (emPlantform) {
        /** 平板和桌面 */
        emPlantform[emPlantform["COMBINATION"] = 0] = "COMBINATION";
        /** 桌面 */
        emPlantform[emPlantform["DESKTOP"] = 1] = "DESKTOP";
        /** 手机 */
        emPlantform[emPlantform["PHONE"] = 2] = "PHONE";
        /** 平板 */
        emPlantform[emPlantform["TABLET"] = 3] = "TABLET";
    })(emPlantform = ibas.emPlantform || (ibas.emPlantform = {}));
    /** 消息类型 */
    let emMessageType;
    (function (emMessageType) {
        /** 消息 */
        emMessageType[emMessageType["INFORMATION"] = 0] = "INFORMATION";
        /** 成功 */
        emMessageType[emMessageType["SUCCESS"] = 1] = "SUCCESS";
        /** 错误 */
        emMessageType[emMessageType["ERROR"] = 2] = "ERROR";
        /** 警告 */
        emMessageType[emMessageType["WARNING"] = 3] = "WARNING";
        /** 问询 */
        emMessageType[emMessageType["QUESTION"] = 4] = "QUESTION";
    })(emMessageType = ibas.emMessageType || (ibas.emMessageType = {}));
    /** 消息动作 */
    let emMessageAction;
    (function (emMessageAction) {
        /** 终止 */
        emMessageAction[emMessageAction["ABORT"] = 0] = "ABORT";
        /** 取消 */
        emMessageAction[emMessageAction["CANCEL"] = 1] = "CANCEL";
        /** 关闭 */
        emMessageAction[emMessageAction["CLOSE"] = 2] = "CLOSE";
        /** 删除 */
        emMessageAction[emMessageAction["DELETE"] = 3] = "DELETE";
        /** 忽略 */
        emMessageAction[emMessageAction["IGNORE"] = 4] = "IGNORE";
        /** 否 */
        emMessageAction[emMessageAction["NO"] = 5] = "NO";
        /** 确定 */
        emMessageAction[emMessageAction["OK"] = 6] = "OK";
        /** 重试 */
        emMessageAction[emMessageAction["RETRY"] = 7] = "RETRY";
        /** 是 */
        emMessageAction[emMessageAction["YES"] = 8] = "YES";
    })(emMessageAction = ibas.emMessageAction || (ibas.emMessageAction = {}));
    /** 权限来源 */
    let emPrivilegeSource;
    (function (emPrivilegeSource) {
        /** 模块设置 */
        emPrivilegeSource[emPrivilegeSource["MODULE"] = 0] = "MODULE";
        /** 应用设置 */
        emPrivilegeSource[emPrivilegeSource["APPLICATION"] = 1] = "APPLICATION";
        /** 业务对象设置 */
        emPrivilegeSource[emPrivilegeSource["BUSINESS_OBJECT"] = 2] = "BUSINESS_OBJECT";
    })(emPrivilegeSource = ibas.emPrivilegeSource || (ibas.emPrivilegeSource = {}));
    /** 权限值 */
    let emAuthoriseType;
    (function (emAuthoriseType) {
        /** 全部权限 */
        emAuthoriseType[emAuthoriseType["ALL"] = 0] = "ALL";
        /** 只取权限 */
        emAuthoriseType[emAuthoriseType["READ"] = 1] = "READ";
        /** 没有权限 */
        emAuthoriseType[emAuthoriseType["NONE"] = 2] = "NONE";
    })(emAuthoriseType = ibas.emAuthoriseType || (ibas.emAuthoriseType = {}));
    /** 选择类型 */
    let emChooseType;
    (function (emChooseType) {
        /** 单选 */
        emChooseType[emChooseType["SINGLE"] = 0] = "SINGLE";
        /** 多选 */
        emChooseType[emChooseType["MULTIPLE"] = 1] = "MULTIPLE";
    })(emChooseType = ibas.emChooseType || (ibas.emChooseType = {}));
    /** 视图模式 */
    let emViewMode;
    (function (emViewMode) {
        /** 一般 */
        emViewMode[emViewMode["COMMON"] = 0] = "COMMON";
        /** 查看 */
        emViewMode[emViewMode["VIEW"] = 1] = "VIEW";
    })(emViewMode = ibas.emViewMode || (ibas.emViewMode = {}));
    /** 手指触控移动方向 */
    let emTouchMoveDirection;
    (function (emTouchMoveDirection) {
        /** 上 */
        emTouchMoveDirection[emTouchMoveDirection["UP"] = 0] = "UP";
        /** 下 */
        emTouchMoveDirection[emTouchMoveDirection["DOWN"] = 1] = "DOWN";
        /** 左 */
        emTouchMoveDirection[emTouchMoveDirection["LEFT"] = 2] = "LEFT";
        /** 右 */
        emTouchMoveDirection[emTouchMoveDirection["RIGHT"] = 3] = "RIGHT";
        /** 无 */
        emTouchMoveDirection[emTouchMoveDirection["NONE"] = 4] = "NONE";
    })(emTouchMoveDirection = ibas.emTouchMoveDirection || (ibas.emTouchMoveDirection = {}));
})(ibas || (ibas = {}));
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../../3rdparty/require.d.ts" />
/// <reference path="../../bobas/common/Data.ts" />
var ibas;
(function (ibas) {
    let requires;
    (function (requires) {
        /** 加载器名称模板 */
        requires.CONTEXT_NAME_TEMPLATE_IBAS = "ibas.{0}";
        /** 加载等待时间 */
        requires.CONFIG_ITEM_WAIT_SECONDS = "waitSeconds";
        /** 命名 */
        function naming(name) {
            return requires.CONTEXT_NAME_TEMPLATE_IBAS.replace("{0}", name).toLowerCase();
        }
        requires.naming = naming;
        /**
         * 创建require实例
         * @param config 配置
         */
        function create(requireConfig) {
            if (window.require === undefined || window.require === null) {
                throw new Error("not found requirejs.");
            }
            // 运行时版本
            let rtVersion = ibas.config.get(ibas.CONFIG_ITEM_RUNTIME_VERSION);
            if (!(ibas.objects.isNull(rtVersion)) && requireConfig.urlArgs === undefined) {
                requireConfig.urlArgs = function (id, url) {
                    return (url.indexOf("?") === -1 ? "?" : "&") + "_=" + rtVersion;
                };
            }
            return window.require.config(requireConfig);
        }
        requires.create = create;
    })(requires = ibas.requires || (ibas.requires = {}));
})(ibas || (ibas = {}));
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../../bobas/common/Data.ts" />
/// <reference path="../../bobas/common/Configuration.ts" />
/// <reference path="../../bobas/common/Logger.ts" />
/// <reference path="../../bobas/common/Utils.ts" />
var ibas;
(function (ibas) {
    const PROPERTY_LISTENER = Symbol("listener");
    class BrowserEventManager {
        listeners() {
            if (ibas.objects.isNull(this[PROPERTY_LISTENER])) {
                this[PROPERTY_LISTENER] = new ibas.ArrayList();
            }
            let type = arguments[0];
            if (ibas.objects.isNull(type)) {
                return this[PROPERTY_LISTENER];
            }
            else {
                let result = new ibas.ArrayList();
                result.add(this[PROPERTY_LISTENER].where((listener) => {
                    if (listener.eventType === type) {
                        return true;
                    }
                }));
                return result;
            }
        }
        /** 获取 */
        listener(id) {
            let listener = this.listeners().firstOrDefault((item) => {
                if (item.id === id) {
                    return true;
                }
            });
            return listener;
        }
        /** 注册 */
        registerListener(listener) {
            let that = this;
            if (ibas.objects.isNull(listener.id)) {
                listener.id = ibas.uuids.random();
            }
            if (!ibas.objects.isNull(this.listener(listener.id))) {
                return;
            }
            if (this.listeners(listener.eventType).length === 0) {
                let eventType = ibas.enums.toString(emBrowserEventType, listener.eventType).toLowerCase();
                window.addEventListener(eventType, function (event) {
                    that.fireEvent(listener.eventType, event);
                }, false);
            }
            this.listeners().add(listener);
        }
        fireEvent() {
            let type = arguments[0];
            let event = arguments[1];
            if (ibas.objects.isNull(type) || ibas.objects.isNull(event)) {
                return;
            }
            for (let listener of this.listeners()) {
                if (listener.eventType !== type) {
                    continue;
                }
                listener.onEventFired(event);
            }
        }
    }
    ibas.BrowserEventManager = BrowserEventManager;
    /** 浏览器事件类型 */
    let emBrowserEventType;
    (function (emBrowserEventType) {
        emBrowserEventType[emBrowserEventType["ABORT"] = 0] = "ABORT";
        emBrowserEventType[emBrowserEventType["AFTERPRINT"] = 1] = "AFTERPRINT";
        emBrowserEventType[emBrowserEventType["BEFOREPRINT"] = 2] = "BEFOREPRINT";
        emBrowserEventType[emBrowserEventType["BEFOREUNLOAD"] = 3] = "BEFOREUNLOAD";
        emBrowserEventType[emBrowserEventType["BLUR"] = 4] = "BLUR";
        emBrowserEventType[emBrowserEventType["CANPLAY"] = 5] = "CANPLAY";
        emBrowserEventType[emBrowserEventType["CANPLAYTHROUGH"] = 6] = "CANPLAYTHROUGH";
        emBrowserEventType[emBrowserEventType["CHANGE"] = 7] = "CHANGE";
        emBrowserEventType[emBrowserEventType["CLICK"] = 8] = "CLICK";
        emBrowserEventType[emBrowserEventType["COMPASSNEEDSCALIBRATION"] = 9] = "COMPASSNEEDSCALIBRATION";
        emBrowserEventType[emBrowserEventType["CONTEXTMENU"] = 10] = "CONTEXTMENU";
        emBrowserEventType[emBrowserEventType["DBLCLICK"] = 11] = "DBLCLICK";
        emBrowserEventType[emBrowserEventType["DEVICELIGHT"] = 12] = "DEVICELIGHT";
        emBrowserEventType[emBrowserEventType["DEVICEMOTION"] = 13] = "DEVICEMOTION";
        emBrowserEventType[emBrowserEventType["DEVICEORIENTATION"] = 14] = "DEVICEORIENTATION";
        emBrowserEventType[emBrowserEventType["DRAG"] = 15] = "DRAG";
        emBrowserEventType[emBrowserEventType["DRAGEND"] = 16] = "DRAGEND";
        emBrowserEventType[emBrowserEventType["DRAGENTER"] = 17] = "DRAGENTER";
        emBrowserEventType[emBrowserEventType["DRAGLEAVE"] = 18] = "DRAGLEAVE";
        emBrowserEventType[emBrowserEventType["DRAGOVER"] = 19] = "DRAGOVER";
        emBrowserEventType[emBrowserEventType["DRAGSTART"] = 20] = "DRAGSTART";
        emBrowserEventType[emBrowserEventType["DROP"] = 21] = "DROP";
        emBrowserEventType[emBrowserEventType["DURATIONCHANGE"] = 22] = "DURATIONCHANGE";
        emBrowserEventType[emBrowserEventType["EMPTIED"] = 23] = "EMPTIED";
        emBrowserEventType[emBrowserEventType["ENDED"] = 24] = "ENDED";
        emBrowserEventType[emBrowserEventType["ERROR"] = 25] = "ERROR";
        emBrowserEventType[emBrowserEventType["FOCUS"] = 26] = "FOCUS";
        /** 浏览器哈希值改变 */
        emBrowserEventType[emBrowserEventType["HASHCHANGE"] = 27] = "HASHCHANGE";
        emBrowserEventType[emBrowserEventType["INPUT"] = 28] = "INPUT";
        emBrowserEventType[emBrowserEventType["INVALID"] = 29] = "INVALID";
        /** 用户按下任何键盘键（包括系统按钮，如箭头键和功能键） */
        emBrowserEventType[emBrowserEventType["KEYDOWN"] = 30] = "KEYDOWN";
        /** 按下并放开任何字母数字键（不包括系统按钮，如箭头键和功能键） */
        emBrowserEventType[emBrowserEventType["KEYPRESS"] = 31] = "KEYPRESS";
        /** 放开任何先前按下的键盘键 */
        emBrowserEventType[emBrowserEventType["KEYUP"] = 32] = "KEYUP";
        emBrowserEventType[emBrowserEventType["LOAD"] = 33] = "LOAD";
        emBrowserEventType[emBrowserEventType["LOADEDDATA"] = 34] = "LOADEDDATA";
        emBrowserEventType[emBrowserEventType["LOADEDMETADATA"] = 35] = "LOADEDMETADATA";
        emBrowserEventType[emBrowserEventType["LOADSTART"] = 36] = "LOADSTART";
        emBrowserEventType[emBrowserEventType["MESSAGE"] = 37] = "MESSAGE";
        emBrowserEventType[emBrowserEventType["MOUSEDOWN"] = 38] = "MOUSEDOWN";
        emBrowserEventType[emBrowserEventType["MOUSEENTER"] = 39] = "MOUSEENTER";
        emBrowserEventType[emBrowserEventType["MOUSELEAVE"] = 40] = "MOUSELEAVE";
        emBrowserEventType[emBrowserEventType["MOUSEMOVE"] = 41] = "MOUSEMOVE";
        emBrowserEventType[emBrowserEventType["MOUSEOUT"] = 42] = "MOUSEOUT";
        emBrowserEventType[emBrowserEventType["MOUSEOVER"] = 43] = "MOUSEOVER";
        emBrowserEventType[emBrowserEventType["MOUSEUP"] = 44] = "MOUSEUP";
        emBrowserEventType[emBrowserEventType["MOUSEWHEEL"] = 45] = "MOUSEWHEEL";
        emBrowserEventType[emBrowserEventType["MSGESTURECHANGE"] = 46] = "MSGESTURECHANGE";
        emBrowserEventType[emBrowserEventType["MSGESTUREDOUBLETAP"] = 47] = "MSGESTUREDOUBLETAP";
        emBrowserEventType[emBrowserEventType["MSGESTUREEND"] = 48] = "MSGESTUREEND";
        emBrowserEventType[emBrowserEventType["MSGESTUREHOLD"] = 49] = "MSGESTUREHOLD";
        emBrowserEventType[emBrowserEventType["MSGESTURESTART"] = 50] = "MSGESTURESTART";
        emBrowserEventType[emBrowserEventType["MSGESTURETAP"] = 51] = "MSGESTURETAP";
        emBrowserEventType[emBrowserEventType["MSINERTIASTART"] = 52] = "MSINERTIASTART";
        emBrowserEventType[emBrowserEventType["MSPOINTERCANCEL"] = 53] = "MSPOINTERCANCEL";
        emBrowserEventType[emBrowserEventType["MSPOINTERDOWN"] = 54] = "MSPOINTERDOWN";
        emBrowserEventType[emBrowserEventType["MSPOINTERENTER"] = 55] = "MSPOINTERENTER";
        emBrowserEventType[emBrowserEventType["MSPOINTERLEAVE"] = 56] = "MSPOINTERLEAVE";
        emBrowserEventType[emBrowserEventType["MSPOINTERMOVE"] = 57] = "MSPOINTERMOVE";
        emBrowserEventType[emBrowserEventType["MSPOINTEROUT"] = 58] = "MSPOINTEROUT";
        emBrowserEventType[emBrowserEventType["MSPOINTEROVER"] = 59] = "MSPOINTEROVER";
        emBrowserEventType[emBrowserEventType["MSPOINTERUP"] = 60] = "MSPOINTERUP";
        emBrowserEventType[emBrowserEventType["OFFLINE"] = 61] = "OFFLINE";
        emBrowserEventType[emBrowserEventType["ONLINE"] = 62] = "ONLINE";
        emBrowserEventType[emBrowserEventType["ORIENTATIONCHANGE"] = 63] = "ORIENTATIONCHANGE";
        emBrowserEventType[emBrowserEventType["PAGEHIDE"] = 64] = "PAGEHIDE";
        emBrowserEventType[emBrowserEventType["PAGESHOW"] = 65] = "PAGESHOW";
        emBrowserEventType[emBrowserEventType["PAUSE"] = 66] = "PAUSE";
        emBrowserEventType[emBrowserEventType["PLAY"] = 67] = "PLAY";
        emBrowserEventType[emBrowserEventType["PLAYING"] = 68] = "PLAYING";
        emBrowserEventType[emBrowserEventType["POPSTATE"] = 69] = "POPSTATE";
        emBrowserEventType[emBrowserEventType["PROGRESS"] = 70] = "PROGRESS";
        emBrowserEventType[emBrowserEventType["RATECHANGE"] = 71] = "RATECHANGE";
        emBrowserEventType[emBrowserEventType["READYSTATECHANGE"] = 72] = "READYSTATECHANGE";
        emBrowserEventType[emBrowserEventType["RESET"] = 73] = "RESET";
        emBrowserEventType[emBrowserEventType["RESIZE"] = 74] = "RESIZE";
        emBrowserEventType[emBrowserEventType["SCROLL"] = 75] = "SCROLL";
        emBrowserEventType[emBrowserEventType["SEEKED"] = 76] = "SEEKED";
        emBrowserEventType[emBrowserEventType["SEEKING"] = 77] = "SEEKING";
        emBrowserEventType[emBrowserEventType["SELECT"] = 78] = "SELECT";
        emBrowserEventType[emBrowserEventType["STALLED"] = 79] = "STALLED";
        emBrowserEventType[emBrowserEventType["STORAGE"] = 80] = "STORAGE";
        emBrowserEventType[emBrowserEventType["SUBMIT"] = 81] = "SUBMIT";
        emBrowserEventType[emBrowserEventType["SUSPEND"] = 82] = "SUSPEND";
        emBrowserEventType[emBrowserEventType["TIMEUPDATE"] = 83] = "TIMEUPDATE";
        /** 当系统停止跟踪触摸的时候触发 */
        emBrowserEventType[emBrowserEventType["TOUCHCANCEL"] = 84] = "TOUCHCANCEL";
        /** 当手指从屏幕上离开的时候触发 */
        emBrowserEventType[emBrowserEventType["TOUCHEND"] = 85] = "TOUCHEND";
        /** 当手指在屏幕上滑动的时候连续地触发。在这个事件发生期间，调用preventDefault()事件可以阻止滚动 */
        emBrowserEventType[emBrowserEventType["TOUCHMOVE"] = 86] = "TOUCHMOVE";
        /** 当手指触摸屏幕时候触发，即使已经有一个手指放在屏幕上也会触发 */
        emBrowserEventType[emBrowserEventType["TOUCHSTART"] = 87] = "TOUCHSTART";
        emBrowserEventType[emBrowserEventType["UNLOAD"] = 88] = "UNLOAD";
        emBrowserEventType[emBrowserEventType["VOLUMECHANGE"] = 89] = "VOLUMECHANGE";
        emBrowserEventType[emBrowserEventType["WAITING"] = 90] = "WAITING";
        /** 自定义事件-扫码,CustomEvent */
        emBrowserEventType[emBrowserEventType["SCAN"] = 91] = "SCAN";
    })(emBrowserEventType = ibas.emBrowserEventType || (ibas.emBrowserEventType = {}));
    /** 浏览器事件管理员实例 */
    ibas.browserEventManager = new BrowserEventManager();
})(ibas || (ibas = {}));
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../../bobas/common/Data.ts" />
var ibas;
(function (ibas) {
    /**
     * 文件
     */
    let files;
    (function (files) {
        /** 保存文件 */
        function save(data, fileName) {
            if (ibas.strings.isEmpty(fileName)) {
                fileName = ibas.strings.format("file_{0}", ibas.dates.now().getTime());
            }
            if (window.Blob) {
                // ie 10+ (native saveAs FileAPI)
                if (window.navigator.msSaveOrOpenBlob) {
                    window.navigator.msSaveOrOpenBlob(data, fileName);
                    ibas.logger.log(ibas.emMessageLevel.DEBUG, "files: save file as [{0}].", fileName);
                    return;
                }
                else {
                    let oURL = window.URL || window.webkitURL;
                    let sBlobUrl = oURL.createObjectURL(data);
                    let oLink = window.document.createElement("a");
                    if ("download" in oLink) {
                        // use an anchor link with download attribute for download
                        let $body = jQuery(document.body);
                        let $link = jQuery(oLink).attr({
                            download: fileName,
                            href: sBlobUrl,
                            style: "display:none"
                        });
                        $body.append($link);
                        $link.get(0).click();
                        $link.remove();
                        ibas.logger.log(ibas.emMessageLevel.DEBUG, "files: save file as [{0}].", fileName);
                        return;
                    }
                }
            }
            throw new Error(ibas.i18n.prop("sys_unsupported_operation"));
        }
        files.save = save;
    })(files = ibas.files || (ibas.files = {}));
})(ibas || (ibas = {}));
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../../bobas/common/Data.ts" />
/// <reference path="../common/Enum.ts" />
var ibas;
(function (ibas) {
    /** 系统元素 */
    class Element {
    }
    ibas.Element = Element;
    const PROPERTY_ELEMENTS = Symbol("elements");
    /** 模块 */
    class Module extends Element {
        constructor() {
            super();
        }
        /** 元素 */
        elements() {
            if (ibas.objects.isNull(this[PROPERTY_ELEMENTS])) {
                this[PROPERTY_ELEMENTS] = new ibas.ArrayList();
            }
            let elements = new ibas.ArrayList();
            for (let item of this[PROPERTY_ELEMENTS]) {
                if (this.isSkip instanceof Function) {
                    if (this.isSkip(item)) {
                        continue;
                    }
                }
                elements.add(item);
            }
            return elements;
        }
        /** 注册功能 */
        register(item) {
            if (ibas.objects.isNull(item)) {
                return;
            }
            if (ibas.objects.isNull(this[PROPERTY_ELEMENTS])) {
                this[PROPERTY_ELEMENTS] = new ibas.ArrayList();
            }
            this[PROPERTY_ELEMENTS].add(item);
        }
    }
    ibas.Module = Module;
    /** 地址hash值标记-功能 */
    ibas.URL_HASH_SIGN_FUNCTIONS = "#/functions/";
    /** 模块-功能 */
    class AbstractFunction extends Element {
        constructor() {
            super();
        }
    }
    ibas.AbstractFunction = AbstractFunction;
    const PROPERTY_VIEW = Symbol("view");
    /** 配置项目-平台 */
    ibas.CONFIG_ITEM_PLANTFORM = "plantform";
    /** 功能-应用 */
    class AbstractApplication extends Element {
        constructor() {
            super();
        }
        /** 当前平台 */
        get plantform() {
            return ibas.config.get(ibas.CONFIG_ITEM_PLANTFORM, ibas.emPlantform.COMBINATION, ibas.emPlantform);
        }
        /** 应用的视图 */
        get view() {
            if (ibas.objects.isNull(this[PROPERTY_VIEW])) {
                if (ibas.objects.isNull(this.navigation)) {
                    throw new Error(ibas.i18n.prop("sys_invalid_view_navigation", this.name));
                }
                this[PROPERTY_VIEW] = this.navigation.create(this);
                if (this[PROPERTY_VIEW] instanceof View) {
                    this[PROPERTY_VIEW][PROPERTY_APPLICATION] = this;
                    if (!ibas.strings.isEmpty(this.description)) {
                        this[PROPERTY_VIEW].title = this.description;
                    }
                    else {
                        this[PROPERTY_VIEW].title = this.name;
                    }
                    this.registerView();
                }
                else {
                    throw new Error(ibas.i18n.prop("sys_invalid_view", this.name));
                }
            }
            return this[PROPERTY_VIEW];
        }
        /** 视图是否已显示 */
        isViewShowed() {
            if (ibas.objects.isNull(this[PROPERTY_VIEW])) {
                return false;
            }
            if (this[PROPERTY_VIEW] instanceof View) {
                if (this[PROPERTY_VIEW].isDisplayed) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        /** 清理资源（视图关闭并取消引用） */
        destroy() {
            this.close();
            if (!ibas.objects.isNull(this[PROPERTY_VIEW])) {
                this[PROPERTY_VIEW] = null;
            }
        }
    }
    ibas.AbstractApplication = AbstractApplication;
    /** 地址hash值标记-视图 */
    ibas.URL_HASH_SIGN_VIEWS = "#/views/";
    const PROPERTY_APPLICATION = Symbol("application");
    /** 视图 */
    class View {
        /** 应用 */
        get application() {
            return this[PROPERTY_APPLICATION];
        }
        /**
         * 触发视图事件
         * @param event 触发的事件
         * @param pars 参数
         */
        fireViewEvents(event, ...pars) {
            if (this.isBusy) {
                ibas.logger.log(ibas.emMessageLevel.DEBUG, "view: event skipping, [{0} - {1}] is busy.", this.id, this.title);
                return;
            }
            if (typeof event !== "function") {
                throw new Error(ibas.i18n.prop("sys_invalid_parameter", "event"));
            }
            try {
                event.apply(this.application, pars);
            }
            catch (error) {
                this.application.viewShower.messages({
                    title: this.application.description,
                    type: ibas.emMessageType.ERROR,
                    message: ibas.config.get(ibas.CONFIG_ITEM_DEBUG_MODE, false) ? error.stack : error.message
                });
            }
        }
        /** 显示之后 */
        onDisplayed() {
            // 重载要回调
        }
        /** 关闭之后 */
        onClosed() {
            // 重载要回调
        }
        /** 按钮按下时 */
        onKeyDown(event) {
            // 可重载
            // logger.log(emMessageLevel.DEBUG, "view: key [{0}] down at [{1}].", event.keyCode, this.id);
        }
        /** 地址栏哈希值变化 */
        onHashChanged(event) {
            // 可重载
            ibas.logger.log(ibas.emMessageLevel.DEBUG, "view: hash change to [{0}] at [{1}].", event.newURL, this.id);
        }
        /** 手指触控移动 */
        onTouchMove(direction, event) {
            // 可重载
        }
    }
    ibas.View = View;
    /** 配置项目-默认模块图标 */
    ibas.CONFIG_ITEM_DEFALUT_MODULE_ICON = "defalutModuleIcon";
    /** 配置项目-禁用平台视图 */
    ibas.CONFIG_ITEM_DISABLE_PLATFORM_VIEW = "disablePlatformView";
    /** 模块控制台 */
    class ModuleConsole extends Module {
        constructor() {
            super();
        }
        /** 当前平台 */
        get plantform() {
            return ibas.config.get(ibas.CONFIG_ITEM_PLANTFORM, ibas.emPlantform.COMBINATION, ibas.emPlantform);
        }
        /** 默认功能 */
        default() {
            let list = this.functions();
            if (list.length > 0) {
                return list[0];
            }
            return null;
        }
        /** 功能集合，仅激活的 */
        functions() {
            let list = new Array();
            for (let item of super.elements()) {
                if (!ibas.objects.instanceOf(item, ModuleFunction)) {
                    continue;
                }
                list.push(item);
            }
            return list;
        }
        /** 应用集合 */
        applications() {
            let list = new Array();
            for (let item of super.elements()) {
                if (!ibas.objects.instanceOf(item, ibas.Application)) {
                    continue;
                }
                list.push(item);
            }
            return list;
        }
        /** 服务集合 */
        services() {
            let list = new Array();
            for (let item of super.elements()) {
                if (!ibas.objects.instanceOf(item, ibas.ServiceMapping)) {
                    continue;
                }
                list.push(item);
            }
            return list;
        }
        /** 注册实现，需要区分注册内容 */
        register(item) {
            if (item instanceof ModuleFunction) {
                // 注册模块功能
                if (ibas.strings.isEmpty(item.id)) {
                    item.id = ibas.uuids.random();
                }
                item.navigation = this.navigation();
            }
            else if (item instanceof ibas.Application) {
                // 注册应用
                if (ibas.strings.isEmpty(item.id)) {
                    item.id = ibas.uuids.random();
                }
                item.navigation = this.navigation();
                item.viewShower = this.viewShower;
            }
            else if (item instanceof ibas.ServiceMapping) {
                // 注册服务
                item.navigation = this.navigation();
                item.viewShower = this.viewShower;
            }
            super.register(item);
        }
        /** 添加初始化完成监听 */
        addListener(listener) {
            if (ibas.objects.isNull(this.listeners)) {
                this.listeners = new Array();
            }
            this.listeners.push(listener);
        }
        /** 初始化 */
        initialize() {
            this.registers();
            this.fireInitialized();
        }
        /** 初始化完成，需要手工调用 */
        fireInitialized() {
            this.isInitialized = true;
            if (ibas.objects.isNull(this.listeners)) {
                return;
            }
            for (let listener of this.listeners) {
                if (listener instanceof Function) {
                    listener.call(listener, this);
                }
            }
            // 清除监听
            delete (this.listeners);
        }
        /** 运行，重载后必须保留基类调用 */
        run() {
            // 修正模块图标
            if (ibas.objects.isNull(this.icon) || this.icon.length === 0) {
                this.icon = ibas.config.get(ibas.CONFIG_ITEM_DEFALUT_MODULE_ICON);
            }
        }
        /** 设置仓库地址，返回值是否执行默认设置 */
        setRepository(address) {
            return true;
        }
        /** 加载视图 */
        loadUI(ui, ready) {
            let minLibrary = ibas.config.get(ibas.CONFIG_ITEM_USE_MINIMUM_LIBRARY, false);
            let modules = [];
            if (ui instanceof Array) {
                for (let item of ui) {
                    modules.push(item + (minLibrary ? ibas.SIGN_MIN_LIBRARY : ""));
                }
            }
            else {
                modules.push(ui + (minLibrary ? ibas.SIGN_MIN_LIBRARY : ""));
            }
            let require = ibas.requires.create({
                context: ibas.requires.naming(this.module)
            });
            let that = this;
            require(modules, function () {
                if (typeof ready === "function") {
                    let module = window[that.module];
                    if (!ibas.objects.isNull(module)) {
                        module = module["ui"];
                    }
                    ready(module);
                }
            }, function (error) {
                ibas.logger.log(ibas.emMessageLevel.ERROR, error.message);
            });
        }
    }
    ibas.ModuleConsole = ModuleConsole;
    /** 模块控制台 */
    class ModuleFunction extends AbstractFunction {
    }
    ibas.ModuleFunction = ModuleFunction;
    /** 视图-导航 */
    class ViewNavigation {
        /**
         * 创建视图
         */
        create(data) {
            let id = null;
            if (typeof data === "string") {
                id = data;
            }
            else if (data instanceof AbstractApplication) {
                id = data.id;
            }
            if (ibas.strings.isEmpty(id)) {
                throw new Error(ibas.i18n.prop("sys_invalid_parameter", "view id"));
            }
            let view = this.newView(id);
            if (ibas.objects.isNull(view)) {
                let name;
                if (data instanceof AbstractApplication) {
                    name = data.description;
                    if (ibas.strings.isEmpty(name)) {
                        name = data.name;
                    }
                }
                if (ibas.strings.isEmpty(name)) {
                    name = id;
                }
                throw new Error(ibas.i18n.prop("sys_invalid_view", name));
            }
            view.id = ibas.strings.format("{0}_{1}", id, ibas.uuids.random());
            return view;
        }
    }
    ibas.ViewNavigation = ViewNavigation;
})(ibas || (ibas = {}));
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../../bobas/common/Data.ts" />
/// <reference path="../../bobas/common/Configuration.ts" />
/// <reference path="../../bobas/common/Logger.ts" />
/// <reference path="../../bobas/common/Utils.ts" />
/// <reference path="../common/Enum.ts" />
/// <reference path="./Architecture.ts" />
var ibas;
(function (ibas) {
    /**
     * 业务对象应用
     */
    class Application extends ibas.AbstractApplication {
        /** 运行 */
        run() {
            this.show();
        }
        /** 显示视图 */
        show() {
            if (!ibas.objects.isNull(this.viewShower)) {
                try {
                    if (this.view instanceof ibas.View) {
                        if (this.view.isDisplayed) {
                            // 已显示的视图不在显示
                            this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_application_view_was_displayed", ibas.strings.isEmpty(this.description) ? this.name : this.description));
                            return;
                        }
                    }
                    else {
                        throw new Error(ibas.i18n.prop("sys_invalid_view", this.name));
                    }
                    this.viewShower.show(this.view);
                    this.afterViewShow();
                }
                catch (error) {
                    this.viewShower.messages({
                        title: this.description,
                        type: ibas.emMessageType.ERROR,
                        message: ibas.config.get(ibas.CONFIG_ITEM_DEBUG_MODE, false) ? error.stack : error.message
                    });
                }
            }
            else {
                throw new Error(ibas.i18n.prop("sys_invalid_view_shower", this.name));
            }
        }
        /** 视图显示后 */
        afterViewShow() {
            if (this.view instanceof ibas.View) {
                ibas.logger.log(ibas.emMessageLevel.DEBUG, "app: [{0} - {1}]'s view displayed.", this.id, this.name);
                this.viewShowed();
            }
            else {
                throw new Error(ibas.i18n.prop("sys_invalid_view", this.name));
            }
        }
        /** 注册视图 */
        registerView() {
            this.view.closeEvent = this.close;
        }
        /** 关闭视图 */
        close() {
            if (!ibas.objects.isNull(this.view)) {
                if (!ibas.objects.isNull(this.viewShower)) {
                    this.viewShower.destroy(this.view);
                }
            }
        }
        /** 设置忙状态 */
        busy() {
            if (!this.isViewShowed()) {
                return;
            }
            let busy = arguments[0];
            let msg = arguments[1];
            if (this.view instanceof ibas.View) {
                this.view.isBusy = busy;
            }
            if (!ibas.objects.isNull(this.viewShower)) {
                this.viewShower.busy(this.view, busy, msg);
            }
            else {
                throw new Error(ibas.i18n.prop("sys_invalid_view_shower", this.name));
            }
        }
        /** 设置消息 */
        proceeding() {
            let type = ibas.emMessageType.INFORMATION;
            let msg;
            if (arguments.length === 1) {
                if (arguments[0] instanceof Error) {
                    msg = arguments[0].message;
                    type = ibas.emMessageType.ERROR;
                }
                else {
                    msg = arguments[0];
                }
            }
            else if (arguments.length === 2) {
                type = arguments[0];
                msg = arguments[1];
            }
            if (!ibas.objects.isNull(this.viewShower)) {
                if (this.isViewShowed()) {
                    this.viewShower.proceeding(this.view, type, msg);
                }
                else {
                    this.viewShower.proceeding(undefined, type, msg);
                }
            }
            else {
                throw new Error(ibas.i18n.prop("sys_invalid_view_shower", this.name));
            }
        }
        /** 显示消息对话框 */
        messages() {
            let caller;
            if (arguments.length === 1) {
                if (arguments[0].message !== undefined && arguments[0].type !== undefined) {
                    caller = arguments[0];
                }
                else if (arguments[0] instanceof Error) {
                    caller = {
                        title: ibas.i18n.prop(this.name),
                        type: ibas.emMessageType.ERROR,
                        message: ibas.config.get(ibas.CONFIG_ITEM_DEBUG_MODE, false) ? arguments[0].stack : arguments[0].message
                    };
                }
                else {
                    caller = {
                        title: ibas.i18n.prop(this.name),
                        type: ibas.emMessageType.INFORMATION,
                        message: arguments[0]
                    };
                }
            }
            else if (arguments.length === 2) {
                caller = {
                    title: ibas.i18n.prop(this.name),
                    type: arguments[0],
                    message: arguments[1]
                };
            }
            if (!ibas.objects.isNull(this.viewShower)) {
                this.viewShower.messages(caller);
            }
            else {
                throw new Error(ibas.i18n.prop("sys_invalid_view_shower", this.name));
            }
        }
    }
    ibas.Application = Application;
    /**
     * 工具条应用
     */
    class BarApplication extends Application {
        /** 注册视图，重载需要回掉此方法 */
        registerView() {
            super.registerView();
            this.view.showFullViewEvent = this.showFullView;
            this.view.barShowedEvent = this.barShowed;
        }
        /** 工具条显示完成，可重载 */
        barShowed() {
            // 工具条显示完成
        }
        /** 激活完整视图 */
        showFullView() {
            this.show();
        }
        /** 运行 */
        run() {
            // 不支持运行
        }
    }
    ibas.BarApplication = BarApplication;
    /**
     * 服务应用
     */
    class ServiceApplication extends Application {
        /** 注册视图，重载需要回掉此方法 */
        registerView() {
            super.registerView();
        }
        /** 运行 */
        run() {
            if (arguments.length === 1) {
                // 判断是否为选择契约
                let caller = arguments[0];
                if (ibas.objects.instanceOf(caller.proxy, ibas.ServiceProxy)) {
                    this.runService(caller.proxy.contract);
                    return;
                }
            }
            // 保持参数原样传递
            super.run.apply(this, arguments);
        }
    }
    ibas.ServiceApplication = ServiceApplication;
    /**
     * 服务（带结果）应用
     */
    class ServiceWithResultApplication extends ServiceApplication {
        /** 注册视图，重载需要回掉此方法 */
        registerView() {
            super.registerView();
        }
        /** 运行 */
        run() {
            if (arguments.length === 1) {
                // 判断是否为选择契约
                let caller = arguments[0];
                if (ibas.objects.instanceOf(caller.proxy, ibas.ServiceProxy)) {
                    this.onCompleted = caller.onCompleted;
                    this.runService(caller.proxy.contract);
                    return;
                }
            }
            // 保持参数原样传递
            super.run.apply(this, arguments);
        }
        /** 触发完成事件 */
        fireCompleted(result) {
            // 关闭视图
            this.close();
            if (!(this.onCompleted instanceof Function)) {
                return;
            }
            try {
                // 调用完成事件
                this.onCompleted.call(this.onCompleted, result);
            }
            catch (error) {
                // 完成事件出错
                this.messages(error);
            }
        }
    }
    ibas.ServiceWithResultApplication = ServiceWithResultApplication;
    /**
     * 常驻应用
     */
    class ResidentApplication extends BarApplication {
        /** 注册视图，重载需要回掉此方法 */
        registerView() {
            super.registerView();
        }
    }
    ibas.ResidentApplication = ResidentApplication;
    /**
     * 业务对象快捷应用
     */
    class ShortcutApplication extends BarApplication {
        /** 注册视图，重载需要回掉此方法 */
        registerView() {
            super.registerView();
        }
    }
    ibas.ShortcutApplication = ShortcutApplication;
})(ibas || (ibas = {}));
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../../bobas/common/Data.ts" />
/// <reference path="../../bobas/common/Configuration.ts" />
/// <reference path="../../bobas/common/Logger.ts" />
/// <reference path="../../bobas/common/Utils.ts" />
/// <reference path="../common/Enum.ts" />
/// <reference path="../browser/Events.ts" />
/// <reference path="./Architecture.ts" />
var ibas;
(function (ibas) {
    /** 配置项目-默认服务图片 */
    ibas.CONFIG_ITEM_DEFALUT_SERVICE_ICON = "defalutServiceIcon";
    /** 地址hash值标记-服务 */
    ibas.URL_HASH_SIGN_SERVICES = "#/services/";
    /** 服务映射 */
    class ServiceMapping {
        constructor() {
            this.icon = ibas.config.get(ibas.CONFIG_ITEM_DEFALUT_SERVICE_ICON);
        }
    }
    ibas.ServiceMapping = ServiceMapping;
    /** 业务对象选择服务映射 */
    class BOChooseServiceMapping extends ServiceMapping {
        constructor() {
            super();
            this.proxy = BOChooseServiceProxy;
        }
        /** 重写此属性到boCode */
        get category() {
            return this.boCode;
        }
        set category(value) {
            this.boCode = value;
        }
    }
    ibas.BOChooseServiceMapping = BOChooseServiceMapping;
    /** 业务对象连接服务映射 */
    class BOLinkServiceMapping extends ServiceMapping {
        constructor() {
            super();
            this.proxy = BOLinkServiceProxy;
        }
        /** 重写此属性到boCode */
        get category() {
            return this.boCode;
        }
        set category(value) {
            this.boCode = value;
        }
    }
    ibas.BOLinkServiceMapping = BOLinkServiceMapping;
    /** 应用服务映射 */
    class ApplicationServiceMapping extends ServiceMapping {
        constructor() {
            super();
        }
        /** 重写此属性到id */
        get category() {
            return this.id;
        }
        set category(value) {
            this.id = value;
        }
    }
    ibas.ApplicationServiceMapping = ApplicationServiceMapping;
    /** 服务代理 */
    class ServiceProxy {
        constructor() {
            if (ibas.objects.isNull(arguments[0])) {
                throw new Error(ibas.i18n.prop("sys_invalid_parameter", "contract"));
            }
            this.contract = arguments[0];
        }
    }
    ibas.ServiceProxy = ServiceProxy;
    /** 数据服务代理 */
    class DataServiceProxy extends ServiceProxy {
    }
    ibas.DataServiceProxy = DataServiceProxy;
    /** 业务对象服务代理 */
    class BOServiceProxy extends DataServiceProxy {
        constructor() {
            super(arguments[0]);
        }
    }
    ibas.BOServiceProxy = BOServiceProxy;
    /** 数据表格服务代理 */
    class DataTableServiceProxy extends DataServiceProxy {
        constructor() {
            super(arguments[0]);
        }
    }
    ibas.DataTableServiceProxy = DataTableServiceProxy;
    /** 业务对象连接服务代理 */
    class BOLinkServiceProxy extends ServiceProxy {
        constructor() {
            super(arguments[0]);
        }
    }
    ibas.BOLinkServiceProxy = BOLinkServiceProxy;
    /** 业务对象选择服务代理 */
    class BOChooseServiceProxy extends ServiceProxy {
        constructor() {
            super(arguments[0]);
        }
    }
    ibas.BOChooseServiceProxy = BOChooseServiceProxy;
    /** 查询编辑服务代理 */
    class CriteriaEditorServiceProxy extends ServiceProxy {
        constructor() {
            super(arguments[0]);
        }
    }
    ibas.CriteriaEditorServiceProxy = CriteriaEditorServiceProxy;
    /** 服务管理员 */
    class ServicesManager {
        constructor() {
            let that = this;
            ibas.browserEventManager.registerListener({
                eventType: ibas.emBrowserEventType.HASHCHANGE,
                onEventFired(event) {
                    try {
                        if (event.newURL.indexOf(ibas.URL_HASH_SIGN_SERVICES) < 0) {
                            return;
                        }
                        let url = event.newURL.substring(event.newURL.indexOf(ibas.URL_HASH_SIGN_SERVICES) + ibas.URL_HASH_SIGN_SERVICES.length);
                        let serviceId = url.substring(0, url.indexOf("/"));
                        let mapping = that.getServiceMapping(serviceId);
                        if (!ibas.objects.isNull(mapping)) {
                            let service = mapping.create();
                            if (!ibas.objects.isNull(service)) {
                                let method = url.substring(url.indexOf("/") + 1);
                                ibas.logger.log(ibas.emMessageLevel.DEBUG, "services: call service [{0}-{1}], hash value [{2}] ", mapping.description, mapping.id, method);
                                // 运行服务
                                if (ibas.objects.instanceOf(service, ibas.Application)) {
                                    service.viewShower = mapping.viewShower;
                                    service.navigation = mapping.navigation;
                                }
                                service.run({
                                    category: method
                                });
                            }
                        }
                    }
                    catch (error) {
                        ibas.logger.log(error);
                    }
                }
            });
        }
        /** 注册服务映射 */
        register(mapping) {
            if (ibas.objects.isNull(mapping)) {
                return;
            }
            if (ibas.objects.isNull(this.mappings)) {
                this.mappings = new Map();
            }
            this.mappings.set(mapping.id, mapping);
            // 如当前注册的服务为Hash指向的服务,激活
            let currentHashValue = window.location.hash;
            if (currentHashValue.startsWith(ibas.URL_HASH_SIGN_SERVICES)) {
                let url = currentHashValue.substring(ibas.URL_HASH_SIGN_SERVICES.length);
                let index = url.indexOf("/") < 0 ? url.length : url.indexOf("/");
                let id = url.substring(0, index);
                if (ibas.strings.equals(mapping.id, id)) {
                    ibas.urls.changeHash(currentHashValue);
                }
            }
        }
        /** 获取服务映射 */
        getServiceMapping(id) {
            if (ibas.objects.isNull(this.mappings)) {
                return null;
            }
            if (this.mappings.has(id)) {
                return this.mappings.get(id);
            }
            return null;
        }
        /** 获取服务 */
        getServices(caller) {
            let services = new Array();
            if (!ibas.objects.isNull(this.mappings)) {
                for (let mapping of this.mappings.values()) {
                    if (!ibas.objects.instanceOf(caller.proxy, mapping.proxy)) {
                        continue;
                    }
                    // 创建服务
                    services.push({
                        id: mapping.id,
                        name: mapping.name,
                        category: mapping.category,
                        description: mapping.description ? mapping.description : mapping.name,
                        icon: mapping.icon,
                        caller: caller,
                        run() {
                            // 创建服务
                            let service = mapping.create();
                            if (!ibas.objects.isNull(service)) {
                                // 运行服务
                                if (ibas.objects.instanceOf(service, ibas.Application)) {
                                    service.viewShower = mapping.viewShower;
                                    service.navigation = mapping.navigation;
                                }
                                service.run(caller);
                            }
                        }
                    });
                }
            }
            return services;
        }
        /**
         * 运行服务
         * @param caller 调用者
         * @returns 是否成功运行服务
         */
        runService(caller) {
            if (ibas.objects.isNull(caller)) {
                throw new Error(ibas.i18n.prop("sys_invalid_parameter", "caller"));
            }
            if (ibas.objects.isNull(caller.proxy) || !ibas.objects.instanceOf(caller.proxy, ServiceProxy)) {
                throw new Error(ibas.i18n.prop("sys_invalid_parameter", "caller.proxy"));
            }
            for (let service of this.getServices(caller)) {
                if (!ibas.strings.isEmpty(caller.category)
                    && !(caller.category === service.category
                        || ibas.config.applyVariables(caller.category) === ibas.config.applyVariables(service.category))) {
                    // 类别不符
                    continue;
                }
                // 运行服务
                service.run();
                return true;
            }
            // 没有找到服务
            return false;
        }
        /** 运行选择服务 */
        runChooseService(caller) {
            if (ibas.objects.isNull(caller)) {
                throw new Error(ibas.i18n.prop("sys_invalid_parameter", "caller"));
            }
            if (ibas.objects.isNull(caller.boCode)) {
                throw new Error(ibas.i18n.prop("sys_invalid_parameter", "caller.boCode"));
            }
            if (ibas.objects.isNull(caller.proxy)) {
                // 设置代理
                caller.proxy = new BOChooseServiceProxy(caller);
            }
            // 设置服务类别码
            caller.category = caller.boCode;
            // 调用服务
            if (!this.runService(caller)) {
                // 服务未运行
                ibas.logger.log(ibas.emMessageLevel.WARN, "services: not found [{0}]'s choose service.", caller.boCode);
                return false;
            }
            return true;
        }
        /** 运行连接服务 */
        runLinkService(caller) {
            if (ibas.objects.isNull(caller)) {
                throw new Error(ibas.i18n.prop("sys_invalid_parameter", "caller"));
            }
            if (ibas.objects.isNull(caller.boCode)) {
                throw new Error(ibas.i18n.prop("sys_invalid_parameter", "caller.boCode"));
            }
            if (ibas.objects.isNull(caller.linkValue)) {
                throw new Error(ibas.i18n.prop("sys_invalid_parameter", "caller.linkValue"));
            }
            if (ibas.objects.isNull(caller.proxy)) {
                // 设置代理
                caller.proxy = new BOLinkServiceProxy(caller);
            }
            // 设置服务类别码
            caller.category = caller.boCode;
            // 调用服务
            if (!this.runService(caller)) {
                // 服务未运行
                ibas.logger.log(ibas.emMessageLevel.WARN, "services: not found [{0}]'s link service.", caller.boCode);
                return false;
            }
            return true;
        }
        /**
         * 运行应用服务
         * @param caller 调用者<In,Out>(<输入类型,输出类型>)
         */
        runApplicationService() {
            let caller = arguments[0];
            if (ibas.objects.isNull(caller)) {
                throw new Error(ibas.i18n.prop("sys_invalid_parameter", "caller"));
            }
            if (ibas.objects.isNull(caller.proxy) || !ibas.objects.instanceOf(caller.proxy, ServiceProxy)) {
                throw new Error(ibas.i18n.prop("sys_invalid_parameter", "caller.proxy"));
            }
            if (!ibas.strings.isEmpty(caller.appId)) {
                // 设置服务类别码
                caller.category = caller.appId;
            }
            // 调用服务
            if (!this.runService(caller)) {
                // 服务未运行
                ibas.logger.log(ibas.emMessageLevel.WARN, "services: not found [{0}]'s application service.", ibas.objects.getName(ibas.objects.getType(caller.proxy)));
                return false;
            }
            return true;
        }
        /**
         * 显示可用服务
         * @param shower 显示服务者
         */
        showServices(shower) {
            if (ibas.objects.isNull(shower)) {
                throw new Error(ibas.i18n.prop("sys_invalid_parameter", "shower"));
            }
            if (ibas.objects.isNull(shower.proxy)) {
                throw new Error(ibas.i18n.prop("sys_invalid_parameter", "shower.proxy"));
            }
            if (!(shower.displayServices instanceof Function)) {
                throw new Error(ibas.i18n.prop("sys_not_provided_display_service_method"));
            }
            // 获取服务
            let services = new Array();
            for (let service of ibas.servicesManager.getServices({
                proxy: shower.proxy
            })) {
                services.push(service);
            }
            if (services.length > 0) {
                // 服务排序
                services = services.sort((c, b) => {
                    return c.name.localeCompare(b.name);
                });
                // 显示可用服务
                shower.displayServices(services);
            }
        }
    }
    ibas.ServicesManager = ServicesManager;
    /** 服务管理员实例 */
    ibas.servicesManager = new ServicesManager();
})(ibas || (ibas = {}));
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../../bobas/common/Data.ts" />
/// <reference path="../../bobas/common/Configuration.ts" />
/// <reference path="../../bobas/common/Logger.ts" />
/// <reference path="../../bobas/common/Utils.ts" />
/// <reference path="../common/Enum.ts" />
/// <reference path="./Services.ts" />
/// <reference path="./Application.ts" />
var ibas;
(function (ibas) {
    /**
     * 业务对象应用
     */
    class BOApplication extends ibas.Application {
        /** 注册视图，重载需要回掉此方法 */
        registerView() {
            super.registerView();
        }
        /** 视图显示后 */
        viewShowed() {
        }
    }
    ibas.BOApplication = BOApplication;
    /**
     * 业务对象查询应用
     */
    class BOQueryApplication extends BOApplication {
        /** 注册视图，重载需要回掉此方法 */
        registerView() {
            super.registerView();
            this.view.fetchDataEvent = this.fetchData;
        }
    }
    ibas.BOQueryApplication = BOQueryApplication;
    /**
     * 业务对象选择应用
     */
    class BOChooseApplication extends BOQueryApplication {
        /** 注册视图，重载需要回掉此方法 */
        registerView() {
            super.registerView();
            this.view.chooseDataEvent = this.chooseData;
            this.view.newDataEvent = this.newData;
        }
    }
    ibas.BOChooseApplication = BOChooseApplication;
    /** 配置项目-自动选择数据 */
    ibas.CONFIG_ITEM_AUTO_CHOOSE_DATA = "autoChooseData";
    /**
     * 业务对象选择服务
     * 类型参数：视图，选择数据
     */
    class BOChooseService extends BOChooseApplication {
        /** 运行 */
        run() {
            if (arguments.length === 1) {
                // 判断是否为选择契约
                let caller = arguments[0];
                // 选择服务代理或其子类
                if (ibas.objects.instanceOf(caller.proxy, ibas.BOChooseServiceProxy)) {
                    // 设置返回方法
                    if (typeof caller.onCompleted === "function") {
                        this.onCompleted = caller.onCompleted;
                    }
                    // 设置标题
                    if (!ibas.strings.isEmpty(caller.title)) {
                        this.view.title = caller.title;
                    }
                    // 设置视图模式
                    if (!ibas.objects.isNull(caller.viewMode)) {
                        this.view.mode = caller.viewMode;
                    }
                    // 设置选择类型
                    let chooseType = caller.chooseType;
                    if (ibas.objects.isNull(chooseType)) {
                        chooseType = ibas.emChooseType.MULTIPLE;
                    }
                    this.view.chooseType = chooseType;
                    // 分析查询条件
                    let criteria;
                    if (ibas.objects.instanceOf(caller.criteria, ibas.Criteria)) {
                        criteria = caller.criteria;
                    }
                    else if (caller.criteria instanceof Array) {
                        criteria = new ibas.Criteria();
                        for (let item of caller.criteria) {
                            if (ibas.objects.instanceOf(item, ibas.Condition)) {
                                // 过滤无效查询条件
                                if (ibas.strings.isEmpty(item.alias)) {
                                    continue;
                                }
                                if (item.operation === ibas.emConditionOperation.IS_NULL
                                    || item.operation === ibas.emConditionOperation.NOT_NULL
                                    || !ibas.objects.isNull(item.value)
                                    || (!ibas.objects.isNull(item.comparedAlias) && item.comparedAlias.length > 0)) {
                                    criteria.conditions.add(item);
                                }
                            }
                        }
                    }
                    // 修正查询数量
                    ibas.criterias.resultCount(criteria);
                    // 根据对象类型，修正排序条件
                    try {
                        let boType = ibas.boFactory.classOf(caller.boCode);
                        if (!ibas.objects.isNull(boType)) {
                            // 获取到有效对象
                            ibas.criterias.sorts(criteria, boType);
                        }
                    }
                    catch (error) {
                        ibas.logger.log(ibas.emMessageLevel.WARN, "bo choose: not found [{0}]'s class.", caller.boCode);
                    }
                    // 存在查询，则直接触发查询事件
                    if (!ibas.objects.isNull(criteria) && criteria.conditions.length > 0) {
                        if (this.view.query instanceof Function) {
                            // 视图存在查询方法，则调用此方法
                            this.view.query(criteria);
                        }
                        else {
                            this.fetchData(criteria);
                        }
                        // 进入查询，不在执行后部分
                        return;
                    }
                }
            }
            // 保持参数原样传递
            super.run.apply(this, arguments);
        }
        /** 触发完成事件 */
        fireCompleted(selecteds) {
            // 关闭视图
            this.close();
            if (ibas.objects.isNull(this.onCompleted)) {
                return;
            }
            // 转换返回类型
            let list = new ibas.ArrayList();
            if (selecteds instanceof Array) {
                // 当是数组时
                for (let item of selecteds) {
                    list.add(item);
                }
            }
            else {
                // 非数组,认为是单对象
                list.add(selecteds);
            }
            if (list.length === 0) {
                // 没有数据不触发事件
                return;
            }
            try {
                // 调用完成事件
                this.onCompleted.call(this.onCompleted, list);
            }
            catch (error) {
                // 完成事件出错
                this.messages(error);
            }
        }
        /** 选择数据后,直接触发完成事件 */
        chooseData(datas) {
            this.fireCompleted(datas);
        }
    }
    ibas.BOChooseService = BOChooseService;
    /**
     * 业务对象列表应用
     */
    class BOListApplication extends BOApplication {
        /** 注册视图，重载需要回掉此方法 */
        registerView() {
            super.registerView();
            this.view.newDataEvent = this.newData;
            this.view.viewDataEvent = this.viewData;
            this.view.fetchDataEvent = this.fetchData;
        }
        /** 运行 */
        run() {
            if (arguments.length === 1) {
                // 分析查询条件
                let criteria;
                if (ibas.objects.instanceOf(arguments[0], ibas.Criteria)) {
                    criteria = arguments[0];
                }
                else if (arguments[0] instanceof Array) {
                    criteria = new ibas.Criteria();
                    for (let item of arguments[0]) {
                        if (ibas.objects.instanceOf(item, ibas.Condition)) {
                            // 过滤无效查询条件
                            if (ibas.strings.isEmpty(item.alias)) {
                                continue;
                            }
                            criteria.conditions.add(item);
                        }
                    }
                }
                if (!ibas.objects.isNull(criteria)) {
                    if (this.view.query instanceof Function) {
                        // 视图存在查询方法，则调用此方法
                        this.view.query(criteria);
                    }
                    else {
                        this.fetchData(criteria);
                    }
                    // 进入查询，不在执行后部分
                    return;
                }
            }
            // 保持参数原样传递
            super.run.apply(this, arguments);
        }
    }
    ibas.BOListApplication = BOListApplication;
    /**
     * 业务对象编辑应用
     */
    class BOEditApplication extends BOApplication {
        /** 注册视图，重载需要回掉此方法 */
        registerView() {
            super.registerView();
            this.view.saveDataEvent = this.saveData;
        }
        /** 视图显示后 */
        viewShowed() {
            // 修改标题
            if (!ibas.objects.isNull(this.editData)) {
                let data = this.editData;
                if (!ibas.objects.isNull(data.approvalStatus)
                    && data.approvalStatus !== ibas.emApprovalStatus.UNAFFECTED) {
                    this.view.title = ibas.strings.format("{0} · {1}", this.view.title, ibas.enums.describe(ibas.emApprovalStatus, data.approvalStatus));
                }
                else {
                    this.view.title = this.description;
                }
            }
        }
    }
    ibas.BOEditApplication = BOEditApplication;
    /**
     * 业务对象查看应用
     */
    class BOViewApplication extends BOApplication {
        /** 注册视图，重载需要回掉此方法 */
        registerView() {
            super.registerView();
        }
        /** 视图显示后 */
        viewShowed() {
            // 修改标题
            if (!ibas.objects.isNull(this.viewData)) {
                let data = this.viewData;
                if (!ibas.objects.isNull(data.approvalStatus)
                    && data.approvalStatus !== ibas.emApprovalStatus.UNAFFECTED) {
                    this.view.title = ibas.strings.format("{0} · {1}", this.view.title, ibas.enums.describe(ibas.emApprovalStatus, data.approvalStatus));
                }
                else {
                    this.view.title = this.description;
                }
            }
        }
    }
    ibas.BOViewApplication = BOViewApplication;
    /**
     * 业务对象查看应用服务
     */
    class BOViewService extends BOViewApplication {
        /** 运行 */
        run() {
            if (!ibas.objects.isNull(arguments[0])) {
                if (ibas.objects.instanceOf(arguments[0].proxy, ibas.BOLinkServiceProxy)) {
                    // 判断是否为选择契约
                    let caller = arguments[0];
                    // 链接服务代理或其子类
                    if (caller.boCode === this.boCode
                        || ibas.config.applyVariables(caller.boCode) === ibas.config.applyVariables(this.boCode)) {
                        // 分析查询条件
                        let criteria;
                        if (ibas.objects.instanceOf(caller.linkValue, ibas.Criteria)) {
                            criteria = caller.linkValue;
                        }
                        else if (typeof caller.linkValue === "string") {
                            criteria = caller.linkValue;
                        }
                        else if (caller.linkValue instanceof Array) {
                            criteria = new ibas.Criteria();
                            criteria.result = 1;
                            for (let item of caller.linkValue) {
                                if (ibas.objects.instanceOf(item, ibas.Condition)) {
                                    // 过滤无效查询条件
                                    if (ibas.strings.isEmpty(item.alias)) {
                                        continue;
                                    }
                                    criteria.conditions.add(item);
                                }
                            }
                        }
                        this.fetchData(criteria);
                        // 退出后续
                        return;
                    }
                }
                else if (typeof arguments[0].category === "string") {
                    // 判断是否为hash参数
                    let value = decodeURI(arguments[0].category);
                    if (!ibas.strings.isEmpty(value)) {
                        let criteria = new ibas.Criteria();
                        criteria.result = 1;
                        for (let item of value.split("&")) {
                            let tmps = item.split("=");
                            if (tmps.length >= 2) {
                                let condition = criteria.conditions.create();
                                condition.alias = tmps[0];
                                condition.value = tmps[1];
                            }
                        }
                        this.fetchData(criteria);
                        // 退出后续
                        return;
                    }
                }
            }
            // 保持参数原样传递
            super.run.apply(this, arguments);
        }
        /** 视图显示后 */
        viewShowed() {
            super.viewShowed();
            // 更新当前hash地址
            if (this.viewData instanceof ibas.BusinessObject) {
                let criteria = this.viewData.criteria();
                if (!ibas.objects.isNull(criteria) && criteria.conditions.length > 0) {
                    let bulider = new ibas.StringBuilder();
                    bulider.append(ibas.URL_HASH_SIGN_SERVICES);
                    bulider.append(this.id);
                    bulider.append("/");
                    for (let item of criteria.conditions) {
                        if (bulider.length > 3) {
                            bulider.append("&");
                        }
                        bulider.append(item.alias);
                        bulider.append("=");
                        bulider.append(item.value);
                    }
                    // 发送登录连接请求后,清除地址栏中的查询参数信息,并且不保留浏览器历史记录
                    window.history.replaceState(null, null, encodeURI(bulider.toString()));
                }
            }
        }
    }
    ibas.BOViewService = BOViewService;
})(ibas || (ibas = {}));
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../../bobas/common/Data.ts" />
/// <reference path="../../bobas/common/Utils.ts" />
/// <reference path="../../bobas/common/Criteria.ts" />
/// <reference path="../common/Data.ts" />
/// <reference path="./Application.ts" />
var ibas;
(function (ibas) {
    /** 地址视图 */
    class UrlView extends ibas.View {
    }
    ibas.UrlView = UrlView;
    /** 业务对象视图 */
    class BOView extends ibas.View {
    }
    ibas.BOView = BOView;
    /** 业务对象查询视图 */
    class BODialogView extends BOView {
        /** 确认 */
        confirm() {
            // 确认方法，可重载
        }
    }
    ibas.BODialogView = BODialogView;
    /** 配置项目-自动查询 */
    ibas.CONFIG_ITEM_AUTO_QUERY = "autoQuery";
    /** 业务对象查询视图 */
    class BOQueryView extends BOView {
        /** 查询标识 */
        get queryId() {
            return this.application.id;
        }
        /** 使用的查询 */
        get usingCriteria() {
            return this.lastCriteria;
        }
        /** 自动查询 */
        get autoQuery() {
            return ibas.config.get(ibas.CONFIG_ITEM_AUTO_QUERY, false);
        }
        /** 查询数据 */
        query(criteria) {
            this.lastCriteria = criteria;
            this.fireViewEvents(this.fetchDataEvent, criteria);
        }
    }
    ibas.BOQueryView = BOQueryView;
    /** 业务对象查询对话视图 */
    class BOQueryDialogView extends BODialogView {
        /** 查询标识 */
        get queryId() {
            return this.application.id;
        }
        /** 使用的查询 */
        get usingCriteria() {
            return this.lastCriteria;
        }
        /** 自动查询 */
        get autoQuery() {
            return false;
        }
        /** 查询数据 */
        query(criteria) {
            this.lastCriteria = criteria;
            this.fireViewEvents(this.fetchDataEvent, criteria);
        }
    }
    ibas.BOQueryDialogView = BOQueryDialogView;
    /** 业务对象查询视图，带查询面板 */
    class BOQueryViewWithPanel extends BOQueryView {
    }
    ibas.BOQueryViewWithPanel = BOQueryViewWithPanel;
    /** 业务对象列表视图 */
    class BOListView extends BOQueryView {
    }
    ibas.BOListView = BOListView;
    /** 业务对象选择视图 */
    class BOChooseView extends BOQueryDialogView {
    }
    ibas.BOChooseView = BOChooseView;
    /** 业务对象查看视图 */
    class BOViewView extends BOView {
    }
    ibas.BOViewView = BOViewView;
    /** 业务对象编辑视图 */
    class BOEditView extends BOView {
    }
    ibas.BOEditView = BOEditView;
    /** 业务对象工具条视图 */
    class BOBarView extends BOView {
    }
    ibas.BOBarView = BOBarView;
    /** 业务对象面板视图 */
    class BOPanelView extends BODialogView {
    }
    ibas.BOPanelView = BOPanelView;
    /** 业务对象常驻应用视图 */
    class BOResidentView extends BOBarView {
    }
    ibas.BOResidentView = BOResidentView;
    /** 业务对象快捷应用视图 */
    class BOShortcutView extends BOBarView {
    }
    ibas.BOShortcutView = BOShortcutView;
    /** 页签视图 */
    class TabView extends ibas.View {
    }
    ibas.TabView = TabView;
})(ibas || (ibas = {}));
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../../bobas/common/Data.ts" />
/// <reference path="../../bobas/common/Utils.ts" />
/// <reference path="../common/Data.ts" />
/// <reference path="./Architecture.ts" />
var ibas;
(function (ibas) {
    /** 变量-用户ID */
    ibas.VARIABLE_NAME_USER_ID = "${USER_ID}";
    /** 变量-用户编码 */
    ibas.VARIABLE_NAME_USER_CODE = "${USER_CODE}";
    /** 变量-用户名称 */
    ibas.VARIABLE_NAME_USER_NAME = "${USER_NAME}";
    /** 变量-是否超级用户 */
    ibas.VARIABLE_NAME_USER_SUPER = "${USER_SUPER}";
    /** 变量-用户归属 */
    ibas.VARIABLE_NAME_USER_BELONG = "${USER_BELONG}";
    /** 变量-用户口令 */
    ibas.VARIABLE_NAME_USER_TOKEN = "${USER_TOKEN}";
    /** 变量管理员 */
    class VariablesManager {
        /** 注册变量 */
        register() {
            let variable;
            if (arguments.length === 1) {
                if (ibas.objects.instanceOf(arguments[0], ibas.KeyValue)) {
                    variable = arguments[0];
                }
            }
            else if (arguments.length === 2) {
                variable = new ibas.KeyValue();
                variable.key = arguments[0];
                variable.value = arguments[1];
            }
            if (!ibas.objects.isNull(variable)) {
                if (ibas.objects.isNull(this.variables)) {
                    this.variables = new Map();
                }
                this.variables.set(variable.key, variable);
            }
        }
        /** 获取所有变量 */
        all() {
            let values = new Array();
            for (let item of this.variables.values()) {
                values.push(item);
            }
            return values;
        }
        /** 获取变量 */
        get(key) {
            if (ibas.objects.isNull(this.variables)) {
                return null;
            }
            if (this.variables.has(key)) {
                return this.variables.get(key);
            }
            return null;
        }
        /** 获取变量 */
        getValue(key) {
            let value = this.get(key);
            if (ibas.objects.isNull(value)) {
                return null;
            }
            return value.value;
        }
    }
    ibas.VariablesManager = VariablesManager;
    /** 变量管理员实例 */
    ibas.variablesManager = new VariablesManager();
})(ibas || (ibas = {}));
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="./bobas/common/Data.ts" />
/// <reference path="./bobas/common/Enum.ts" />
/// <reference path="./bobas/common/StringBuilder.ts" />
/// <reference path="./bobas/common/DataTable.ts" />
/// <reference path="./bobas/common/Criteria.ts" />
/// <reference path="./bobas/common/OperationResult.ts" />
/// <reference path="./bobas/common/Configuration.ts" />
/// <reference path="./bobas/common/Logger.ts" />
/// <reference path="./bobas/common/I18N.ts" />
/// <reference path="./bobas/common/Utils.ts" />
/// <reference path="./bobas/common/Waiter.ts" />
/// <reference path="./bobas/debug/Assert.ts" />
/// <reference path="./bobas/debug/TestCase.ts" />
/// <reference path="./bobas/bo/BusinessObjectCore.ts" />
/// <reference path="./bobas/bo/BusinessObject.ts" />
/// <reference path="./bobas/repository/DataDeclaration.ts" />
/// <reference path="./bobas/repository/DataConverter.ts" />
/// <reference path="./bobas/repository/BORepositoryCore.ts" />
/// <reference path="./bobas/repository/BORepositoryAjax.ts" />
/// <reference path="./bobas/repository/BORepositoryLocal.ts" />
/// <reference path="./bobas/repository/BORepository.ts" />
/// <reference path="./bobas/expression/Expression.ts" />
/// <reference path="./bobas/expression/JudgmentExpression.ts" />
/// <reference path="./bobas/expression/JudgmentLink.ts" />
/// <reference path="./bobas/task/Action.ts" />
/// <reference path="./bobas/rule/BusinessRuleCore.ts" />
/// <reference path="./bobas/rule/BusinessRule.ts" />
/// <reference path="./bsbas/common/Data.ts" />
/// <reference path="./bsbas/common/Enum.ts" />
/// <reference path="./bsbas/browser/Requires.ts" />
/// <reference path="./bsbas/browser/Events.ts" />
/// <reference path="./bsbas/browser/Files.ts" />
/// <reference path="./bsbas/application/Architecture.ts" />
/// <reference path="./bsbas/application/Application.ts" />
/// <reference path="./bsbas/application/BOApplication.ts" />
/// <reference path="./bsbas/application/View.ts" />
/// <reference path="./bsbas/application/Services.ts" />
/// <reference path="./bsbas/application/Variables.ts" />
var ibas;
(function (ibas) {
    /** 关于 */
    ibas.about = {
        /** 网址 */
        url: "https://colorcoding.org/",
        /** 版权 */
        copyright: "Color-Coding Studio",
        /** 许可 */
        license: "Apache License, Version 2.0",
        /** 版本 */
        version: "0.2.0",
        /** 维护者 */
        maintainer: "Niuren.Zhu <niuren.zhu@icloud.com>"
    };
    // 加载配置
    ibas.config.load(ibas.strings.format("{0}/{1}", ibas.urls.rootUrl("/ibas/index"), ibas.CONFIG_FILE_NAME));
    ibas.config.load(ibas.strings.format("{0}/{1}", ibas.urls.rootUrl(), ibas.CONFIG_FILE_NAME));
    // 加载资源
    ibas.i18n.load(ibas.strings.format("{0}/resources/languages/ibas.json", ibas.urls.rootUrl("/ibas/index")));
    ibas.i18n.load(ibas.strings.format("{0}/resources/languages/enums.json", ibas.urls.rootUrl("/ibas/index")));
})(ibas || (ibas = {}));
//# sourceMappingURL=index.js.map