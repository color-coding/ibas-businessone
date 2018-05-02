/// <reference path="3rdparty/jquery.d.ts" />
/// <reference path="3rdparty/require.d.ts" />
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace ibas {
    /**
     * 集合
     */
    interface IList<T> extends Array<T> {
        /**
         * 添加项目
         * @param item 项目
         */
        add(item: T): void;
        /**
         * 添加项目
         * @param items 项目数组
         */
        add(items: T[]): void;
        /**
         * 移出项目
         * @param item 项目
         */
        remove(item: T): void;
        /**
         * 移出项目
         * @param index 项目索引
         */
        removeAt(index: number): void;
        /**
         * 第一个或默认
         */
        where(lambda: (value: T) => boolean, thisArg?: any): T[];
        /**
         * 第一个或默认
         */
        firstOrDefault(): T;
        /**
         * 第一个或默认
         */
        firstOrDefault(lambda: (value: T) => boolean, thisArg?: any): T;
        /**
         * 最后一个或默认
         */
        lastOrDefault(): T;
        /**
         * 最后一个或默认
         */
        lastOrDefault(lambda: (value: T) => boolean, thisArg?: any): T;
        /**
         * 是否包含元素
         * @param item 元素
         */
        contain(item: T): boolean;
        /**
         * 清理所有元素
         */
        clear(): void;
    }
    /**
     * 集合
     */
    class ArrayList<T> extends Array<T> implements IList<T> {
        /** 创建集合，仅值 */
        static create<P>(map: Map<any, P>): ArrayList<P>;
        /**
         * 添加项目
         * @param item 项目
         */
        add(item: T): void;
        /**
         * 添加项目
         * @param items 项目数组
         */
        add(items: T[]): void;
        /**
         * 移出项目
         * @param item 项目
         */
        remove(item: T): void;
        /**
         * 移出项目
         * @param index 项目索引
         */
        removeAt(index: number): void;
        /**
         * 返回符合条件的数组
         */
        where(lambda: (value: T) => boolean, thisArg?: any): T[];
        /**
         * 第一个或默认
         */
        firstOrDefault(): T;
        /**
         * 第一个或默认
         */
        firstOrDefault(lambda: (value: T) => boolean, thisArg?: any): T;
        /**
         * 最后一个或默认
         */
        lastOrDefault(): T;
        /**
         * 最后一个或默认
         */
        lastOrDefault(lambda: (value: T) => boolean, thisArg?: any): T;
        /**
         * 是否包含
         */
        contain(value: T): boolean;
        /**
         * 清除所有元素
         */
        clear(): void;
    }
    /**
     * 键值
     */
    class KeyValue {
        constructor();
        constructor(value: string);
        constructor(key: string, value: any);
        /** 键 */
        key: string;
        /** 值 */
        value: any;
    }
    /**
     * 键描述
     */
    class KeyText {
        constructor();
        constructor(value: string);
        constructor(key: string, text: string);
        /** 键 */
        key: string;
        /** 描述 */
        text: string;
    }
    /**
     * 文件数据
     */
    class FileData {
        private FileName;
        /** 文件名称 */
        fileName: string;
        private Location;
        /** 位置 */
        location: string;
        private OriginalName;
        /** 原始名 */
        originalName: string;
    }
    /**
     * 消息
     */
    interface IMessage {
        /**
         * 消息级别
         */
        level: emMessageLevel;
        /**
         * 时间
         */
        time: Date;
        /**
         * 内容
         */
        content: string;
        /**
         * 标签
         */
        tag: string;
        /**
         * 消息
         */
        toString(): string;
        /**
         * 内容输出
         */
        outString(): string;
    }
    /**
     * 消息
     */
    class Message implements IMessage {
        constructor();
        /**
         * 消息级别
         */
        level: emMessageLevel;
        /**
         * 时间
         */
        time: Date;
        /**
         * 内容
         */
        content: string;
        /**
         * 标签
         */
        tag: string;
        /**
         * 格式化消息
         */
        toString(): string;
        /**
         * 格式化消息
         */
        outString(): string;
    }
    /** 数据分隔符（,） */
    const DATA_SEPARATOR: string;
    /** 最小库标记 */
    const SIGN_MIN_LIBRARY: string;
    /** 配置项目-默认货币 */
    const CONFIG_ITEM_DEFAULT_CURRENCY: string;
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace ibas {
    /**
     * 消息级别
     */
    enum emMessageLevel {
        /** 严重错误 */
        FATAL = 0,
        /** 错误 */
        ERROR = 1,
        /** 警告 */
        WARN = 2,
        /** 消息 */
        INFO = 3,
        /** 调试信息 */
        DEBUG = 4,
    }
    /**
     * 比较方式
     */
    enum emConditionOperation {
        /** 无 */
        NONE = 0,
        /** 等于(=) */
        EQUAL = 1,
        /** 大于(>) */
        GRATER_THAN = 2,
        /** 小于(<) */
        LESS_THAN = 3,
        /** 大于等于(>=) */
        GRATER_EQUAL = 4,
        /** 小于等于(<=) */
        LESS_EQUAL = 5,
        /** 不等于(<>) */
        NOT_EQUAL = 6,
        /** 包含Like (%) */
        CONTAIN = 7,
        /** 不包含Not like (%) */
        NOT_CONTAIN = 8,
        /** 开始为(...%) */
        START = 9,
        /** 结束为(%...) */
        END = 10,
        /** 是空 */
        IS_NULL = 11,
        /** 非空 */
        NOT_NULL = 12,
    }
    /**
     * 条件之间关系
     */
    enum emConditionRelationship {
        /** 没关系 */
        NONE = 0,
        /** 且 */
        AND = 1,
        /** 或 */
        OR = 2,
    }
    /**
     * 排序方式
     */
    enum emSortType {
        /** 降序 */
        DESCENDING = 0,
        /** 升序 */
        ASCENDING = 1,
    }
    /**
     * 是否
     */
    enum emYesNo {
        /** 否 */
        NO = 0,
        /** 是 */
        YES = 1,
    }
    /**
     * 单据状态
     */
    enum emDocumentStatus {
        /** 计划 */
        PLANNED = 0,
        /** 下达 */
        RELEASED = 1,
        /** 完成 */
        FINISHED = 2,
        /** 结算 */
        CLOSED = 3,
    }
    /**
     * 业务对象状态
     */
    enum emBOStatus {
        /** 未清 */
        OPEN = 0,
        /** 已清 */
        CLOSED = 1,
    }
    /**
     * 审批步骤状态
     */
    enum emApprovalStepStatus {
        /** 挂起的 */
        PENDING = 0,
        /** 审批中 */
        PROCESSING = 1,
        /** 已批准 */
        APPROVED = 2,
        /** 已拒绝 */
        REJECTED = 3,
        /** 已跳过 */
        SKIPPED = 4,
    }
    /**
     * 审批状态
     */
    enum emApprovalStatus {
        /** 不影响 */
        UNAFFECTED = 0,
        /** 审批中 */
        PROCESSING = 1,
        /** 已批准 */
        APPROVED = 2,
        /** 已拒绝 */
        REJECTED = 3,
        /** 已取消 */
        CANCELLED = 4,
    }
    /**
     * 审批结果
     */
    enum emApprovalResult {
        /** 已批准 */
        APPROVED = 0,
        /** 拒绝的 */
        REJECTED = 1,
        /** 重置为进行中 */
        PROCESSING = 2,
    }
    /**
     * 方向
     */
    enum emDirection {
        /** 入 */
        IN = 0,
        /** 出 */
        OUT = 1,
    }
    /**
     * 判断操作
     */
    enum emJudmentOperation {
        /**
         * 等于
         */
        EQUAL = 0,
        /**
         * 不等于
         */
        NOT_EQUAL = 1,
        /**
         * 大于
         */
        GRATER_THAN = 2,
        /**
         * 小于
         */
        LESS_THAN = 3,
        /**
         * 大于等于
         */
        GRATER_EQUAL = 4,
        /**
         * 小于等于
         */
        LESS_EQUAL = 5,
        /**
         * 开始于（仅字符比较有效）
         */
        BEGIN_WITH = 6,
        /**
         * 不是开始于（仅字符比较有效）
         */
        NOT_BEGIN_WITH = 7,
        /**
         * 结束于（仅字符比较有效）
         */
        END_WITH = 8,
        /**
         * 不是结束于（仅字符比较有效）
         */
        NOT_END_WITH = 9,
        /**
         * 包括（仅字符比较有效）
         */
        CONTAIN = 10,
        /**
         * 不包含（仅字符比较有效）
         */
        NOT_CONTAIN = 11,
        /**
         * 与（仅布尔比较有效）
         */
        AND = 12,
        /**
         * 或（仅布尔比较有效）
         */
        OR = 13,
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace ibas {
    /**
     * 字符串构建器
     */
    class StringBuilder {
        private values;
        /**
         * 获取当前长度
         */
        readonly length: number;
        /**
         * 添加字符
         */
        append(str: any): void;
        /**
         * 生成字符串
         */
        toString(): string;
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace ibas {
    /** 数据表 */
    class DataTable {
        /** 名称 */
        name: string;
        /** 描述 */
        description: string;
        /** 列 */
        columns: ArrayList<DataTableColumn>;
        /** 行 */
        rows: ArrayList<DataTableRow>;
        /** 转为对象 */
        convert(conversion: boolean): any[];
        /** 转为对象 */
        convert(): any[];
    }
    /** 数据表-列 */
    class DataTableColumn {
        /** 名称 */
        name: string;
        /** 描述 */
        description: string;
        /** 数据类型 */
        dataType: string;
        /** 获取数据定义类型 */
        definedDataType(): emTableDataType;
        /** 转换类型 */
        convert(data: string): any;
    }
    /** 数据表-行 */
    class DataTableRow {
        /** 值 */
        cells: ArrayList<string>;
    }
    /** 数据表 */
    enum emTableDataType {
        /** 字母数字 */
        ALPHANUMERIC = 0,
        /** 数字 */
        NUMERIC = 1,
        /** 日期 */
        DATE = 2,
        /** 小数 */
        DECIMAL = 3,
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace ibas {
    /**
     * 消息记录员
     */
    interface ILogger {
        /**
         * 消息输出的级别
         */
        level: emMessageLevel;
        /**
         * 记录消息
         * @param message
         */
        log(message: IMessage): void;
        /**
         * 记录消息
         * @param level 消息级别
         * @param message 消息格式
         * @param pars 格式内容
         */
        log(level: emMessageLevel, message: string, ...pars: any[]): void;
        /**
         * 记录消息
         * @param message 内容
         * @param pars 格式内容
         */
        log(message: string, ...pars: any[]): void;
    }
    /** 配置项目-消息输出级别 */
    const CONFIG_ITEM_MESSAGES_LEVEL: string;
    /**
     * 运行消息记录
     */
    class Logger implements ILogger {
        private _level;
        /**
         * 消息输出的级别
         */
        readonly level: emMessageLevel;
        language: emMessageLevel;
        /**
         * 记录消息
         * @param message
         */
        log(message: IMessage): void;
        /**
         * 记录消息
         * @param level 消息级别
         * @param message 消息格式
         * @param pars 格式内容
         */
        log(level: emMessageLevel, message: string, ...pars: any[]): void;
        /**
         * 记录消息
         * @param message 内容
         * @param pars 格式内容
         */
        log(message: string, ...pars: any[]): void;
    }
    /** 记录实例 */
    const logger: Logger;
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace ibas {
    /** 配置项目-语言编码 */
    const CONFIG_ITEM_LANGUAGE_CODE: string;
    /** 配置项目-资源分组名称 */
    const CONFIG_ITEM_I18N_GROUP_NAMES: string;
    /** 多语言 */
    class I18N {
        /** 默认语言编码 */
        private DEFAULT_LANGUAGE_CODE;
        private _language;
        /** 语言 */
        language: string;
        private _listeners;
        /**
         * 注册监听事件
         * @param listener 监听者
         */
        registerListener(listener: ILanguageChangedListener): void;
        /** 触发语言改变事件 */
        protected fireLanguageChanged(): void;
        /** 资源字典，已按前缀分类 */
        private resources;
        /**
         * 输出描述
         * @param key 检索值
         * @param args 替代内容
         */
        prop(key: string, ...args: any[]): string;
        private languageFiles;
        /** 重新加载已加载 */
        reload(): void;
        load(address: string): void;
        private groups;
        private groupName(key);
        add(key: string, value: string): string;
    }
    /** 语言变化监听者 */
    interface ILanguageChangedListener {
        /** 语言变化 */
        onLanguageChanged(value: string): void;
    }
    /** 语言实例 */
    const i18n: I18N;
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace ibas {
    /**
     * 对象
     */
    namespace objects {
        /**
         * 是否为空
         * @param object 判断对象
         */
        function isNull(object: any): boolean;
        /**
         * 判断数据是否为某类型
         * @param instance 数据
         * @param type 类型
         */
        function instanceOf(instance: any, type: any): boolean;
        /**
         * 判断是否为其子类
         * @param subType 待判断类型
         * @param type 父类型
         */
        function isAssignableFrom(subType: any, type: any): boolean;
        /**
         * 是否一样
         * @param type1 类型1
         * @param type2 类型2
         */
        function isSame(type1: any, type2: any): boolean;
        /**
         * 获取类型名称
         * @param type 类型
         */
        function getName(type: any): string;
        /**
         * 获取实例类型
         * @param 实例 类型
         */
        function getType(instance: any): any;
        /**
         * 克隆对象
         * @param data 数据
         */
        function clone<D>(data: D): D;
        /**
         * 获取属性值
         * @param propertyName 属性名称
         * @param data 对象
         */
        function getPropertyValue(propertyName: string, data: any): any;
    }
    /**
     * 对字符串操作的封装方法
     */
    namespace strings {
        /**
         * 是否为空
         * @param object 判断对象
         */
        function isEmpty(content: any): boolean;
        /**
         * 格式化输出
         * @param format 格式，I'm {0} and good at {1}.
         * @param args 替换字符
         */
        function format(format: string, ...args: any[]): string;
        /**
         * 存在多少个字符
         * @param content 待分析字符
         * @param value 查询的字符
         */
        function count(content: string, value: string): number;
        /**
         * 替换字符，全部
         * @param content 待分析字符
         * @param search 查询的字符
         * @param replace 替换的字符
         */
        function replace(content: string, search: string, replace: string): string;
        /**
         * 比较字符串
         * @param value1 字符1
         * @param value2 字符2
         */
        function equals(value1: string, value2: string): boolean;
        /**
         * 比较字符串，忽略大小写
         * @param value1 字符1
         * @param value2 字符2
         */
        function equalsIgnoreCase(value1: string, value2: string): boolean;
        /**
         * 补齐字符串
         * @param value 值
         * @param size 长度
         * @param char 补齐字符
         */
        function fill(value: any, size: number, char: string): string;
        /**
         * 转为字符类型
         * @param value 值
         */
        function valueOf(value: any): string;
    }
    /**
     * 唯一标识
     */
    namespace uuids {
        function random(): string;
    }
    /**
     * 枚举
     */
    namespace enums {
        /** 转换为枚举值
         * @param type 目标类型
         * @param value 值
         * @returns 枚举值，失败为undefined
         */
        function valueOf(type: any, value: any): number;
        /**
         * 转为字符串
         * @param type 类型
         * @param value 值
         */
        function toString(type: any, value: any): string;
        /**
         * 描述枚举值
         * @param type 目标类型
         * @param value 值
         * @returns 首先语言，然后枚举，最后原始
         */
        function describe(type: any, value: any): string;
    }
    /**
     * 日期
     */
    namespace dates {
        /**
         * 当前时间
         */
        function isDate(value: any): boolean;
        /**
         * 当前时间
         */
        function now(): Date;
        /**
         * 当前日期
         */
        function today(): Date;
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
        function valueOf(value: any): Date;
        /**
         * 转换日期
         * @param value 日期
         * @returns 日期字符串
         */
        function toString(value: Date): string;
        /**
         * 转换日期
         * @param value 日期
         * @param format 格式字符，yyyy-MM-dd
         * @returns 日期字符串
         */
        function toString(value: Date, format: string): string;
        enum emDifferenceType {
            DAY = 0,
            HOUR = 1,
            MINUTE = 2,
            SECOND = 3,
        }
        /**
         * 计算时间差
         * @param type 计算类型
         * @param minuend 被减数
         * @param value 减数
         */
        function difference(type: emDifferenceType, minuend: Date, value: Date): number;
        /**
         * 比较大小
         * @param left
         * @param right
         * @returns 0,相等；-1，right小；1，left小
         */
        function compare(left: Date, right: Date): number;
        /**
         * 是否相等
         * @param left
         * @param right
         */
        function equals(left: Date, right: Date): boolean;
        /**
         * 左值是否晚于右值
         * @param left
         * @param right
         */
        function after(left: Date, right: Date): boolean;
        /**
         * 左值是否早于右值
         * @param left
         * @param right
         */
        function before(left: Date, right: Date): boolean;
    }
    /**
     * 数字
     */
    namespace numbers {
        /** 转为整数 */
        function toInt(data: any): number;
        /**  数字 */
        function valueOf(data: any): number;
    }
    /**
     * 地址
     */
    namespace urls {
        /** 跟地址标记 */
        const ROOT_URL_SIGN: string;
        /** 上级标记 */
        const PARENT_URL_SIGN: string;
        /** 当前标记 */
        const CURRENT_URL_SIGN: string;
        /** 正常化地址 */
        function normalize(value: string): string;
        function rootUrl(): string;
        /**
         * 获取当前根地址
         * @param type 基准文件名称，null表示文档地址
         */
        function rootUrl(type: string): string;
        /**
         * 获取地址栏中的所有查询参数
         */
        function params(): IList<KeyText>;
        /**
         * 获取地址栏中的指定查询参数
         * @param name 指定参数名称
         */
        function param(name: string): KeyText;
        /**
         * 修改当前地址栏hash值，并触发hashchange事件
         * 如果当前hash值与要修改的值相同，则只触发hashchange事件
         * @param newHash
         */
        function changeHash(newHash: string): void;
    }
    /**
     * 数组
     */
    namespace arrays {
        /**
         * 排序
         * @param sorts 排序方式
         * @param datas 数据
         */
        function sort<T>(datas: Array<T>, sorts: ISort[]): Array<T>;
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace ibas {
    /** 配置项目-调试模式 */
    const CONFIG_ITEM_DEBUG_MODE: string;
    /** 配置项目-公司代码 */
    const CONFIG_ITEM_COMPANY: string;
    /** 默认配置文件名称 */
    const CONFIG_FILE_NAME: string;
    /** 配置项目-运行时版本 */
    const CONFIG_ITEM_RUNTIME_VERSION: string;
    /** 配置项目-使用最小库 */
    const CONFIG_ITEM_USE_MINIMUM_LIBRARY: string;
    /**
     * 配置
     */
    class Configuration {
        private items;
        /**
         * 加载配置文件
         */
        load(address: string): void;
        /**
         * 设置配置
         * @param key 项
         * @param value 值
         */
        set(key: string, value: any): void;
        /**
         * 获取配置
         * @param key 项
         */
        get(key: string): any;
        /**
         * 获取配置
         * @param key 项
         * @param defalut 默认值（未配置则使用此值）
         */
        get<T>(key: string, defalut: T): T;
        /**
         * 获取配置
         * @param key 项
         * @param defalut 默认值（未配置则使用此值）
         * @param type 值类型
         */
        get<T>(key: string, defalut: T, type: any): T;
        /** 返回配置项目 */
        all(): IList<KeyValue>;
        private log(level, message);
        private variableMap;
        /** 替换字符串中的配置项，配置项示例：${Company} */
        applyVariables(value: string): string;
        private _listeners;
        /**
         * 注册监听事件
         * @param listener 监听者
         */
        registerListener(listener: IConfigurationChangedListener): void;
        /** 触发语言改变事件 */
        protected fireConfigurationChanged(name: string, value: any): void;
    }
    /** 配置变化监听者 */
    interface IConfigurationChangedListener {
        /** 配置变化 */
        onConfigurationChanged(name: string, value: any): void;
    }
    /** 配置实例 */
    const config: Configuration;
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace ibas {
    /**
     * 属性改变监听者
     */
    interface IPropertyChangedListener {
        /** 调用者，this指向 */
        caller?: any;
        /** 标记 */
        id?: string;
        /**
         * 属性改变
         */
        propertyChanged(property: string): void;
    }
    /**
     * 可绑定对象
     */
    interface IBindable {
        /**
         * 注册监听事件
         * @param listener 监听者
         */
        registerListener(listener: IPropertyChangedListener): void;
        /**
         * 移出监听事件
         * @param listener 监听者
         */
        removeListener(listener: IPropertyChangedListener): void;
        /**
         * 移出全部监听事件
         */
        removeListener(recursive: boolean): void;
    }
    /**
     * 状态跟踪对象
     */
    interface ITrackable {
        /**
         * 是否新建
         */
        readonly isNew: boolean;
        /**
         * 是否修改
         */
        readonly isDirty: boolean;
        /**
         * 是否删除
         */
        readonly isDeleted: boolean;
        /**
         * 是否有效
         */
        readonly isVaild: boolean;
        /**
         * 是否加载数据中
         */
        isLoading: boolean;
        /**
         * 标记为未修改
         * @param recursive 递归
         */
        markOld(recursive: boolean): void;
        /**
         * 标记为未修改
         */
        markOld(): void;
        /**
         * 标记为新
         * @param recursive 递归
         */
        markNew(recursive: boolean): void;
        /**
         * 标记为新
         */
        markNew(): void;
        /**
         * 标记为删除
         * @param recursive 递归
         */
        markDeleted(recursive: boolean): void;
        /**
         * 标记为删除
         */
        markDeleted(): void;
        /**
         * 对象置为脏
         * @param recursive 递归
         */
        markDirty(recursive: boolean): void;
        /**
         * 对象置为脏
         */
        markDirty(): void;
        /**
         * 清除删除标记
         *
         * @param recursive 递归
         */
        clearDeleted(recursive: boolean): void;
        /**
         * 清除删除标记
         */
        clearDeleted(): void;
    }
    /**
     * 业务对象
     */
    interface IBusinessObject extends ITrackable {
        /**
         * 获取属性的值
         * @param property 属性名称
         */
        getProperty<P>(property: string): P;
        /**
         * 设置属性的值
         * @param property 属性名称
         * @param value 值
         */
        setProperty<P>(property: string, value: P): void;
        /** 输出字符串 */
        toString(): string;
        /** 删除 */
        delete(): void;
    }
    /**
     * 业务对象集合
     */
    interface IBusinessObjects<T extends IBusinessObject> extends IList<T> {
        /**
         * 新建并添加子项
         */
        create(): T;
        /** 过滤删除的项目 */
        filterDeleted(): T[];
    }
    /** 业务对象工厂 */
    interface IBOFactory {
        /** 注册对象 */
        register(bo: any): void;
        /** 获取对象类型，参数1：对象名称 */
        classOf(name: string): any;
        /** 创建对象实例，参数1：对象名称 */
        create<B extends IBusinessObject>(name: string): B;
    }
    /**
     * 可监听的对象
     */
    abstract class Bindable implements IBindable {
        private _listeners;
        /**
         * 注册监听事件
         * @param listener 监听者
         */
        registerListener(listener: IPropertyChangedListener): void;
        /** 移出全部监听 */
        removeListener(recursive: boolean): void;
        /**
         * 移出监听事件
         * @param listener 监听者
         */
        removeListener(listener: IPropertyChangedListener): void;
        /**
         * 通知属性改变
         * @param property 属性
         */
        protected firePropertyChanged(property: string): void;
    }
    /**
     * 状态跟踪对象
     */
    abstract class TrackableBase extends Bindable implements ITrackable {
        constructor();
        private _new;
        /**
         * 是否新建
         */
        isNew: boolean;
        private _dirty;
        /**
         * 是否修改
         */
        isDirty: boolean;
        private _deleted;
        /**
         * 是否刪除
         */
        isDeleted: boolean;
        private _savable;
        /**
         * 是否保存
         */
        isSavable: boolean;
        private _loading;
        /**
         * 是否加载
         */
        isLoading: boolean;
        private _vaild;
        /**
         * 是否有效
         */
        isVaild: boolean;
        /**
         * 标记为未修改
         */
        markOld(): void;
        /**
         * 标记为新
         */
        markNew(): void;
        /**
         * 标记为删除
         */
        markDeleted(): void;
        /**
         * 对象置为脏
         */
        markDirty(): void;
        /**
         * 清除删除标记
         */
        clearDeleted(): void;
    }
    /**
     * 业务对象基础
     */
    abstract class BusinessObjectBase<T extends IBusinessObject> extends TrackableBase implements IBusinessObject {
        constructor();
        /**
         * 初始化方法，属性在此方法初始化
         */
        protected abstract init(): void;
        /**
         * 通知属性改变
         * @param property 属性
         */
        protected firePropertyChanged(property: string): void;
        /**
         * 获取属性值
         */
        getProperty<P>(property: string): P;
        /**
         * 设置属性值
         */
        setProperty<P>(property: string, value: P): void;
        /**
         * 获取对象属性
         * @param recursive 递归
         */
        getProperties(recursive: boolean): Map<string, any>;
        protected getChildBOs(): Map<string, IBusinessObject>;
        markOld(): void;
        markOld(recursive: boolean): void;
        markNew(): void;
        markNew(recursive: boolean): void;
        markDeleted(): void;
        markDeleted(recursive: boolean): void;
        markDirty(): void;
        markDirty(recursive: boolean): void;
        clearDeleted(): void;
        clearDeleted(recursive: boolean): void;
        /** 移出监听实现 */
        removeListener(): void;
        abstract delete(): void;
    }
    /**
     * 业务对象集合基础
     */
    abstract class BusinessObjectsBase<T extends IBusinessObject> extends ArrayList<T> implements IBusinessObjects<T> {
        constructor();
        /**
         * 创建子项
         */
        abstract create(): T;
        /**
         * 添加项目
         * @param item 项目
         */
        add(item: T): void;
        /**
         * 添加项目
         * @param items 项目集合
         */
        add(items: T[]): void;
        /**
         * 添加项目后
         * @param item 项目
         */
        protected afterAdd(item: T): void;
        /**
         * 移出项目
         * @param item 项目
         */
        remove(item: T): void;
        /**
         * 移出项目后
         * @param item 项目
         */
        protected afterRemove(item: T): void;
        /** 过滤删除的项目 */
        filterDeleted(): T[];
    }
    /** 业务对象工厂 */
    class BOFactory implements IBOFactory {
        /** 业务对象字典 */
        private boMap;
        /**
         * 注册业务对象
         * @param name 检索值
         * @param type 注册类型
         */
        register(key: string, type: any): void;
        /**
         * 注册业务对象
         * @param type 注册类型
         */
        register(type: any): void;
        /** 获取对象类型，参数1：对象名称 */
        classOf(name: string): any;
        /** 创建对象实例，参数1：对象名称 */
        create<B>(name: string): B;
    }
    /** 业务对象工厂实例 */
    const boFactory: BOFactory;
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace ibas {
    /** 业务对象属性名称-DocEntry */
    const BO_PROPERTY_NAME_DOCENTRY: string;
    /** 业务对象属性名称-Code */
    const BO_PROPERTY_NAME_CODE: string;
    /** 业务对象属性名称-Name */
    const BO_PROPERTY_NAME_NAME: string;
    /** 业务对象属性名称-ObjectKey */
    const BO_PROPERTY_NAME_OBJECTKEY: string;
    /** 业务对象属性名称-LineId */
    const BO_PROPERTY_NAME_LINEID: string;
    /** 业务对象属性名称-objectCode */
    const BO_PROPERTY_NAME_OBJECTCODE: string;
    /** 业务对象属性名称-documentStatus */
    const BO_PROPERTY_NAME_DOCUMENTSTATUS: string;
    /** 业务对象属性名称-canceled */
    const BO_PROPERTY_NAME_CANCELED: string;
    /** 业务对象属性名称-approvalStatus */
    const BO_PROPERTY_NAME_APPROVALSTATUS: string;
    /** 业务对象属性名称-deleted */
    const BO_PROPERTY_NAME_DELETED: string;
    /** 业务对象属性名称-lineStatus */
    const BO_PROPERTY_NAME_LINESTATUS: string;
    /**
     * 业务对象-行
     */
    interface IBOLine {
        /**
         * 行编号
         */
        lineId: number;
    }
    /**
     * 业务对象-单据
     */
    interface IBODocument extends IBusinessObject {
        /**
         * 单据号 主键
         */
        docEntry: number;
        /**
         * 单据流水号
         */
        docNum: number;
        /**
         * 期间
         */
        period: number;
        /**
         * 状态
         */
        status: emBOStatus;
        /**
         * 单据状态
         */
        documentStatus: emDocumentStatus;
        /**
         * 过账日期
         */
        postingDate: Date;
        /**
         * 到期日
         */
        deliveryDate: Date;
        /**
         * 凭证日期
         */
        documentDate: Date;
    }
    /**
     * 业务对象-单据行
     */
    interface IBODocumentLine extends IBusinessObject, IBOLine {
        /**
         * 单据编号 主键
         */
        docEntry: number;
        /**
         * 行编号 主键
         */
        lineId: number;
        /**
         * 获取-顺序号
         */
        visOrder: number;
        /**
         * 设置-状态
         */
        status: emBOStatus;
        /**
         * 获取-单据状态
         */
        lineStatus: emDocumentStatus;
    }
    /**
     * 业务对象-单据行集合
     */
    interface IBODocumentLines<T extends IBODocumentLine> extends IBusinessObjects<T> {
    }
    /**
     * 业务对象-主数据
     */
    interface IBOMasterData extends IBusinessObject {
        /**
         * 编码 主键
         */
        code: string;
        /**
         * 名称
         */
        name: string;
        /**
         * 流水号
         */
        docEntry: number;
    }
    /**
     * 业务对象-主数据行
     */
    interface IBOMasterDataLine extends IBusinessObject, IBOLine {
        /**
         * 编码 主键
         */
        code: string;
        /**
         * 行编号 主键
         */
        lineId: number;
    }
    /**
     * 业务对象-主数据行集合
     */
    interface IBOMasterDataLines<T extends IBOMasterDataLine> extends IBusinessObjects<T> {
    }
    /**
     * 业务对象-简单对象
     */
    interface IBOSimple extends IBusinessObject {
        /**
         * 序号 主键
         */
        objectKey: number;
    }
    /**
     * 业务对象-简单对象行
     */
    interface IBOSimpleLine extends IBusinessObject, IBOLine {
        /**
         * 序号 主键
         */
        objectKey: number;
        /**
         * 行编号 主键
         */
        lineId: number;
    }
    /**
     * 业务对象-简单对象行集合
     */
    interface IBOSimpleLines<T extends IBOSimpleLine> extends IBusinessObjects<T> {
    }
    /**
     * 业务对象存储标记
     */
    interface IBOStorageTag {
        /**
         * 获取对象编号
         */
        objectCode: string;
        /**
         * 创建日期
         */
        createDate: Date;
        /**
         * 创建时间
         */
        createTime: number;
        /**
         * 更新日期
         */
        updateDate: Date;
        /**
         * 更细时间
         */
        updateTime: number;
        /**
         * 实例号
         */
        logInst: number;
        /**
         * 创建用户
         */
        createUserSign: number;
        /**
         * 更新用户
         */
        updateUserSign: number;
        /**
         * 创建动作标识
         */
        createActionId: string;
        /**
         * 更新动作标识
         */
        updateActionId: string;
        /**
         * 数据源
         */
        dataSource: string;
    }
    /**
     * 被引用的业务对象
     */
    interface IBOReferenced {
        /**
         * 是否被引用
         */
        referenced: emYesNo;
    }
    /**
     * 标记取消，已被引用的对象不能取消
     */
    interface IBOTagCanceled extends IBOReferenced {
        /**
         * 是否取消
         */
        canceled: emYesNo;
    }
    /**
     * 标记删除，已被引用的对象标记删除
     */
    interface IBOTagDeleted extends IBOReferenced {
        /**
         * 是否取消
         */
        deleted: emYesNo;
    }
    /**
     * 审批的数据
     */
    interface IApprovalData extends IBusinessObject {
        /**
         * 数据类型
         */
        objectCode: string;
        /**
         * 数据所有人
         */
        dataOwner: number;
        /**
         * 审批状态
         */
        approvalStatus: emApprovalStatus;
        /**
         * 识别码
         */
        identifiers: string;
        /**
         * 数据查询条件
         */
        criteria(): ICriteria;
    }
    /**
     * 数据所有权
     */
    interface IDataOwnership {
        /**
         * 数据类型
         */
        objectCode: string;
        /**
         * 数据所有者
         */
        dataOwner: number;
        /**
         * 数据所属组织
         */
        organization: string;
    }
    /**
     * 业务对象基类
     */
    abstract class BusinessObject<T extends IBusinessObject> extends BusinessObjectBase<T> {
        /** 构造 */
        constructor();
        /** 获取查询 */
        abstract criteria(): ICriteria;
        /** 输出字符串 */
        abstract toString(): string;
        /** 删除 */
        delete(): void;
        /** 克隆对象 */
        clone(): T;
        /** 属性改变时 */
        protected onPropertyChanged(name: string): void;
        /**
         * 初始化业务规则
         */
        private initRules();
        /**
         * 注册的业务规则
         */
        protected registerRules(): IBusinessRule[];
        protected firePropertyChanged(property: string): void;
    }
    /**
     * 业务对象集合基类
     */
    abstract class BusinessObjects<T extends IBusinessObject, P extends IBusinessObject> extends BusinessObjectsBase<T> implements IBusinessObjects<T> {
        /**
         * 构造
         * @param parent 父项
         */
        constructor(parent: P);
        private _listener;
        protected readonly listener: IPropertyChangedListener;
        private _parent;
        protected parent: P;
        /** 父项属性改变时 */
        protected onParentPropertyChanged(name: string): void;
        /** 子项属性改变时 */
        protected onChildPropertyChanged(item: T, name: string): void;
        /**
         * 添加项目后
         * @param item 项目
         */
        protected afterAdd(item: T): void;
        /**
         * 移出项目后
         * @param item 项目
         */
        protected afterRemove(item: T): void;
        private myRules;
        private runRules(property);
    }
    /**
     * 单据对象基类
     */
    abstract class BODocument<T extends IBODocument> extends BusinessObject<T> {
        /** 获取查询 */
        criteria(): ICriteria;
        /** 输出字符串 */
        toString(): string;
    }
    /**
     * 单据行对象基类
     */
    abstract class BODocumentLine<T extends IBODocumentLine> extends BusinessObject<T> {
        /** 获取查询 */
        criteria(): ICriteria;
        /** 输出字符串 */
        toString(): string;
    }
    /**
     * 主数据对象基类
     */
    abstract class BOMasterData<T extends IBOMasterData> extends BusinessObject<T> {
        /** 获取查询 */
        criteria(): ICriteria;
        /** 输出字符串 */
        toString(): string;
    }
    /**
     * 主数据行对象基类
     */
    abstract class BOMasterDataLine<T extends IBOMasterDataLine> extends BusinessObject<T> {
        /** 获取查询 */
        criteria(): ICriteria;
        /** 输出字符串 */
        toString(): string;
    }
    /**
     * 简单对象基类
     */
    abstract class BOSimple<T extends IBOSimple> extends BusinessObject<T> {
        /** 获取查询 */
        criteria(): ICriteria;
        /** 输出字符串 */
        toString(): string;
    }
    /**
     * 简单行对象基类
     */
    abstract class BOSimpleLine<T extends IBOSimpleLine> extends BusinessObject<T> {
        /** 获取查询 */
        criteria(): ICriteria;
        /** 输出字符串 */
        toString(): string;
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace ibas {
    /**
     * 查询
     */
    interface ICriteria {
        /**
         * 业务对象
         */
        businessObject: string;
        /**
         * 查询结果数量
         */
        result: number;
        /**
         * 不加载子项
         */
        noChilds: boolean;
        /**
         * 备注
         */
        remarks: string;
        /**
         * 查询条件集合
         */
        conditions: IConditions;
        /**
         * 排序字段集合
         */
        sorts: ISorts;
        /**
         * 子查询集合
         */
        childCriterias: IChildCriterias;
        /**
         * 克隆
         */
        clone(): ICriteria;
        /**
         * 转换为字符串
         */
        toString(): string;
        /**
         * 计算下一结果集的查询条件
         * 注意BO多主键情况下，请自行修正。
         * @param lastBO
         *            起始业务对象
         * @return 查询
         */
        next(lastBO: IBusinessObject): ICriteria;
        /**
         * 计算上一个结果集的查询条件
         * 注意BO多主键情况下，请自行修正。
         * @param firstBO
         *            起始业务对象
         * @return 查询
         */
        previous(firstBO: IBusinessObject): ICriteria;
        /**
         * 复制查询条件
         * @param criteria
         *            基于的查询
         * @return 查询
         */
        copyFrom(criteria: ICriteria): ICriteria;
    }
    /**
     * 查询条件
     */
    interface ICondition {
        /**
         * 获取-条件字段（属性）名
         */
        alias: string;
        /**
         * 几个闭括号"）"
         */
        bracketClose: number;
        /**
         * 几个开括号"（"
         */
        bracketOpen: number;
        /**
         * 比较的字段（属性）名
         */
        comparedAlias: string;
        /**
         * 比较的值
         */
        value: string;
        /**
         * 比较方法
         */
        operation: emConditionOperation;
        /**
         * 和后续条件关系
         */
        relationship: emConditionRelationship;
        /**
         * 获取-备注
         */
        remarks: string;
    }
    /**
     * 查询条件集合
     */
    interface IConditions extends IList<ICondition> {
        /**
         * 创建并返回新查询条件
         */
        create(): ICondition;
    }
    /**
     * 排序
     */
    interface ISort {
        /**
         * 排序的字段（属性）名
         */
        alias: string;
        /**
         * 排序方式
         */
        sortType: emSortType;
    }
    /**
     * 排序集合
     */
    interface ISorts extends IList<ISort> {
        /**
         * 创建并返回新排序
         */
        create(): ISort;
    }
    /**
     * 子项查询
     */
    interface IChildCriteria extends ICriteria {
        /**
         * 获取-属性路径
         */
        propertyPath: string;
        /**
         * 仅返回存在子项的
         */
        onlyHasChilds: boolean;
    }
    /**
     * 子项查询集合
     */
    interface IChildCriterias extends IList<IChildCriteria> {
        /**
         * 创建并返回新子项查询
         */
        create(): IChildCriteria;
    }
    /**
     * 查询
     */
    class Criteria implements ICriteria {
        constructor();
        /**
         * 业务对象
         */
        private BusinessObject;
        businessObject: string;
        /**
         * 查询结果数量
         */
        private Result;
        result: number;
        /**
         * 不加载子项
         */
        private NoChilds;
        noChilds: boolean;
        /**
         * 备注
         */
        private Remarks;
        remarks: string;
        /**
         * 查询条件集合
         */
        private Conditions;
        conditions: IConditions;
        /**
         * 排序字段集合
         */
        private Sorts;
        sorts: ISorts;
        /**
         * 子查询集合
         */
        private ChildCriterias;
        childCriterias: IChildCriterias;
        /**
         * 克隆
         */
        clone(): ICriteria;
        /**
         * 转换为字符串
         */
        toString(): string;
        private charRelationship(value);
        /**
         * 计算下一结果集的查询条件
         * 注意BO多主键情况下，请自行修正
         * @param lastBO
         *            起始业务对象
         * @return 查询
         */
        next(lastBO: BusinessObject<any>): ICriteria;
        /**
         * 计算上一个结果集的查询条件
         * 注意BO多主键情况下，请自行修正
         * @param firstBO
         *            起始业务对象
         * @return 查询
         */
        previous(firstBO: BusinessObject<any>): ICriteria;
        protected boCriteria(bo: BusinessObject<any>, operation: emConditionOperation): ICriteria;
        /**
         * 复制查询条件
         * @param criteria
         *            基于的查询
         * @return 查询
         */
        copyFrom(criteria: ICriteria): ICriteria;
    }
    /**
     * 查询条件
     */
    class Condition implements ICondition {
        constructor(alias: string, operation: emConditionOperation);
        constructor(alias: string, operation: emConditionOperation, value: string);
        constructor(alias: string, operation: emConditionOperation, value: number);
        constructor(alias: string, operation: emConditionOperation, value: Date);
        constructor();
        /**
         * 获取-条件字段（属性）名
         */
        private Alias;
        alias: string;
        /**
         * 几个闭括号"）"
         */
        private BracketClose;
        bracketClose: number;
        /**
         * 几个开括号"（"
         */
        private BracketOpen;
        bracketOpen: number;
        /**
         * 比较的字段（属性）名
         */
        private ComparedAlias;
        comparedAlias: string;
        /**
         * 比较的值
         */
        private Value;
        value: string;
        /**
         * 比较方法
         */
        private Operation;
        operation: emConditionOperation;
        /**
         * 和后续条件关系
         */
        private Relationship;
        relationship: emConditionRelationship;
        /**
         * 获取-备注
         */
        private Remarks;
        remarks: string;
        /**
         * 转换为字符串
         */
        toString(): string;
        private charOperation(value);
    }
    /**
     * 查询条件集合
     */
    class Conditions extends ArrayList<ICondition> implements IConditions {
        /**
         * 创建并返回新查询条件
         */
        create(): ICondition;
    }
    /**
     * 排序
     */
    class Sort implements ISort {
        constructor();
        constructor(alias: string, sortType: emSortType);
        /**
         * 排序的字段（属性）名
         */
        private Alias;
        alias: string;
        /**
         * 排序方式
         */
        private SortType;
        sortType: emSortType;
        /**
         * 转换为字符串
         */
        toString(): string;
    }
    /**
     * 排序集合
     */
    class Sorts extends ArrayList<ISort> implements ISorts {
        /**
         * 创建并返回新排序
         */
        create(): ISort;
    }
    /**
     * 子项查询
     */
    class ChildCriteria extends Criteria implements IChildCriteria {
        /**
         * 获取-属性路径
         */
        private PropertyPath;
        propertyPath: string;
        /**
         * 仅返回存在子项的
         */
        private OnlyHasChilds;
        onlyHasChilds: boolean;
    }
    /**
     * 子项查询集合
     */
    class ChildCriterias extends ArrayList<IChildCriteria> implements IChildCriterias {
        /**
         * 创建并返回子项查询
         */
        create(): IChildCriteria;
    }
    /** 查询结果集数量 */
    const CONFIG_ITEM_CRITERIA_RESULT_COUNT: string;
    /**
     * 查询方法
     */
    namespace criterias {
        /**
         * 检查-排序字段
         * @param criteria 待处理查询
         */
        function resultCount(criteria: ICriteria): ICriteria;
        /**
         * 检查-排序字段
         * @param criteria 待处理查询
         * @param target 查询目标类型
         */
        function sorts(criteria: ICriteria, target: any): ICriteria;
        /**
         * 检查-查询字段
         * @param criteria 待处理查询
         * @param target 查询目标类型
         * @param search 查询内容
         */
        function conditions(criteria: ICriteria, target: any, search: string): ICriteria;
        /**
         * 检查-查询字段
         * @param criteria 待处理查询
         * @param target 查询目标类型
         * @param search 查询内容
         * @param operation 查询方式
         */
        function conditions(criteria: ICriteria, target: any, search: string, operation: emConditionOperation): ICriteria;
    }
    /**
     * 检索条件项目：文件夹。如：documents，条件仅可等于，其他忽略。
     */
    const CRITERIA_CONDITION_ALIAS_FOLDER: string;
    /**
     * 检索条件项目：包含子文件夹。如： emYesNo.Yes，条件仅可等于，其他忽略。
     */
    const CRITERIA_CONDITION_ALIAS_INCLUDE_SUBFOLDER: string;
    /**
     * 检索条件项目：文件名称。如：ibas.*.jar，条件仅可等于，其他忽略。
     */
    const CRITERIA_CONDITION_ALIAS_FILE_NAME: string;
    /**
     * 检索条件项目：最后修改时间（文件时间）。如：1479965348，条件可等于，大小等于。
     */
    const CRITERIA_CONDITION_ALIAS_MODIFIED_TIME: string;
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace ibas {
    /**
     * 操作消息
     */
    interface IOperationMessage {
        /**
         * 结果标识
         */
        signID: string;
        /**
         * 结果编码
         */
        resultCode: number;
        /**
         * 结果描述
         */
        message: string;
        /**
         * 结果时间
         */
        time: Date;
        /**
         * 用户标识
         */
        userSign: string;
    }
    /**
     * 操作结果
     */
    interface IOperationResult<P> extends IOperationMessage {
        /**
         * 返回对象
         */
        resultObjects: IList<P>;
        /**
         * 操作执行信息
         */
        informations: IList<IOperationInformation>;
    }
    /**
     * 操作信息
     */
    interface IOperationInformation {
        /**
         * 获取-名称
         */
        name: string;
        /**
         * 获取-内容
         */
        content: string;
        /**
         * 获取-标签
         */
        tag: string;
    }
    /**
     * 操作信息
     */
    class OperationInformation implements IOperationInformation {
        /**
         * 获取-名称
         */
        private _name;
        name: string;
        /**
         * 获取-内容
         */
        private _content;
        content: string;
        /**
         * 获取-标签
         */
        private _tag;
        tag: string;
    }
    /**
     * 操作消息
     */
    class OperationMessage implements IOperationMessage {
        constructor();
        /**
         * 结果标识
         */
        private _signID;
        signID: string;
        /**
         * 结果编码
         */
        private _resultCode;
        resultCode: number;
        /**
         * 结果描述
         */
        private _message;
        message: string;
        /**
         * 结果时间
         */
        private _time;
        time: Date;
        /**
         * 用户标识
         */
        private _userSign;
        userSign: string;
    }
    /**
     * 操作消息结果
     */
    class OperationResult<P> extends OperationMessage implements IOperationResult<P> {
        /**
         * 返回对象
         */
        private _resultObjects;
        resultObjects: IList<P>;
        /** 添加结果 */
        addResults(value: P): void;
        /** 添加结果 */
        addResults(value: P[]): void;
        /**
         * 操作执行信息
         */
        private _informations;
        informations: IList<IOperationInformation>;
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace ibas {
    /** 等候的监听者 */
    interface IWaitingListener<T> {
        /** 完成 */
        onCompleted(result: T): void;
    }
    /** 等待者 */
    abstract class Waiter {
        private listeners;
        /** 注册监听 */
        register(listener: IWaitingListener<any>): void;
        protected fireCompleted(): void;
        protected fireCompleted(result: any): void;
        /** 开始等待 */
        abstract start(): void;
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace ibas {
    /**
     * 单元测试，断言相关
     */
    namespace assert {
        /**
         * 断言相等
         * @param message 消息
         * @param unexpected 目标值
         * @param actual 运行值
         */
        function equals(message: string, unexpected: any, actual: any): void;
        /**
         * 断言相等
         * @param unexpected 目标值
         * @param actual 运行值
         */
        function equals(unexpected: any, actual: any): void;
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/** ibas的java端数据声明 */
declare namespace ibas4j {
    /** 操作消息 */
    interface IDataDeclaration {
        /** 数据类型 */
        type: string;
    }
    /** 字符串 */
    interface IString extends IDataDeclaration {
        /** 值 */
        value: string;
    }
    /** 操作消息 */
    interface IOperationMessage extends IDataDeclaration {
        /** 结果标识 */
        SignID: string;
        /** 结果编码 */
        ResultCode: number;
        /** 结果描述 */
        Message: string;
        /** 结果时间 */
        Time: string;
        /** 用户标识 */
        UserSign: string;
    }
    /** 操作结果 */
    interface IOperationResult extends IOperationMessage {
        /** 返回对象 */
        ResultObjects: any[];
        /** 操作执行信息 */
        Informations: IOperationInformation[];
    }
    /** 操作消息 */
    interface IOperationInformation extends IDataDeclaration {
        /** 名称 */
        Name: string;
        /** 标签 */
        Tag: string;
        /** 内容 */
        Content: string;
    }
    /** 查询 */
    interface ICriteria extends IDataDeclaration {
        /** 业务对象 */
        BusinessObject: string;
        /** 查询结果数量 */
        ResultCount: number;
        /** 不加载子项 */
        NoChilds: boolean;
        /** 备注 */
        Remarks: string;
        /** 查询条件集合 */
        Conditions: ICondition[];
        /** 排序字段集合 */
        Sorts: ISort[];
        /** 子查询集合 */
        ChildCriterias: IChildCriteria[];
    }
    /** 查询条件 */
    interface ICondition extends IDataDeclaration {
        /** 条件字段（属性）名 */
        Alias: string;
        /** 几个闭括号"）" */
        BracketClose: number;
        /** 几个开括号"（" */
        BracketOpen: number;
        /** 比较的字段（属性）名 */
        ComparedAlias: string;
        /** 比较的值 */
        Value: string;
        /** 比较方法 */
        Operation: string;
        /** 和后续条件关系 */
        Relationship: string;
        /** 备注 */
        Remarks: string;
    }
    /** 排序 */
    interface ISort extends IDataDeclaration {
        /** 排序的字段（属性）名 */
        Alias: string;
        /** 排序方式 */
        SortType: string;
    }
    /** 子项查询 */
    interface IChildCriteria extends ICriteria {
        /** 属性路径  */
        PropertyPath: string;
        /** 仅返回存在子项的 */
        OnlyHasChilds: boolean;
    }
    /** 文件信息 */
    interface IFileData extends IDataDeclaration {
        /** 文件名称  */
        FileName: string;
        /** 位置 */
        Location: string;
        /** 原始名称 */
        OriginalName: string;
    }
    /** 数据表 */
    interface IDataTable extends IDataDeclaration {
        /** 名称 */
        Name: string;
        /** 描述 */
        Description: string;
        /** 列 */
        Columns: IDataTableColumn[];
        /** 行 */
        Rows: IDataTableRow[];
    }
    /** 数据表-列 */
    interface IDataTableColumn extends IDataDeclaration {
        /** 名称 */
        Name: string;
        /** 描述 */
        Description: string;
        /** 数据类型 */
        DataType: string;
    }
    /** 数据表-行 */
    interface IDataTableRow extends IDataDeclaration {
        /** 值 */
        Cells: string[];
    }
    /** 键值 */
    interface IKeyValue extends IDataDeclaration {
        /** 键 */
        Key: string;
        /** 值 */
        Value: any;
    }
    /** 键描述 */
    interface IKeyText extends IDataDeclaration {
        /** 键 */
        Key: string;
        /** 值 */
        Text: string;
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace ibas {
    /**
     * 查询调用监听者
     */
    interface IMethodCaller<T> {
        /** 调用者，若设置值，则为onCompleted方法的this */
        caller?: any;
        /**
         * 调用完成
         * @param opRslt 结果
         */
        onCompleted(opRslt: IOperationResult<T>): void;
    }
    /**
     * 查询调用者
     */
    interface IFetchCaller<P> extends IMethodCaller<P> {
        /** 查询条件 */
        criteria: ICriteria | ICondition[];
    }
    /**
     * 保存调用者
     */
    interface ISaveCaller<P> extends IMethodCaller<P> {
        /** 被保存对象 */
        beSaved: P;
        /**
         * 调用完成
         * @param opRslt 结果
         */
        onCompleted(opRslt: IOperationResult<P>): void;
    }
    /**
     * 业务对象仓库，只读
     */
    interface IBORepositoryReadonly {
        /**
         * 查询数据
         * @param boName 业务对象名称
         * @param caller 查询监听者
         */
        fetch<P>(boName: string, caller: IFetchCaller<P>): void;
    }
    /**
     * 业务对象仓库
     */
    interface IBORepository extends IBORepositoryReadonly {
        /**
         * 保存数据
         * @param boName 业务对象名称
         * @param caller 保存监听者
         */
        save<P>(boName: string, caller: ISaveCaller<P>): void;
    }
    /**
     * 远程仓库
     */
    interface IRemoteRepository {
        /**
         * 远程服务地址
         */
        address: string;
        /**
         * 访问口令
         */
        token: string;
        /**
         * 数据转换者
         */
        converter: IDataConverter;
        /**
         * 调用远程方法
         * @param method 方法地址
         * @param data 数据
         * @param caller 调用者
         */
        callRemoteMethod(method: string, data: any, caller: IMethodCaller<any>): void;
    }
    /**
     * 加载文件调用者
     */
    interface ILoadFileCaller extends IMethodCaller<any> {
        /** 协议类型 */
        contentType?: string;
        /** 数据类型 */
        dataType?: string;
    }
    /**
     * 文件仓库
     */
    interface IFileRepository {
        /**
         * 加载文件
         * @param fileName 文件名称
         * @param caller 调用者
         */
        load(fileName: string, caller: ILoadFileCaller): void;
    }
    /**
     * 上传文件调用者
     */
    interface IUploadFileCaller<T> extends IMethodCaller<T> {
        /** 文件上传数据 */
        fileData: FormData;
    }
    /**
     * 文件上传仓库
     */
    interface IFileRepositoryUpload {
        /**
         * 上传文件
         * @param method 方法地址
         * @param caller 调用者
         */
        upload<T>(method: string, caller: IUploadFileCaller<T>): void;
    }
    /**
     * 下载文件调用者，T类型一般为Blob
     */
    interface IDownloadFileCaller<T> extends IMethodCaller<T> {
        /** 下载条件 */
        criteria: ICriteria;
    }
    /**
     * 文件上传仓库
     */
    interface IFileRepositoryDownload {
        /**
         * 上传文件
         * @param method 方法地址
         * @param caller 调用者
         */
        download<T>(method: string, caller: IDownloadFileCaller<T>): void;
    }
    /**
     * 数据转换者
     */
    interface IDataConverter {
        /**
         * 转换业务对象数据
         * @param data 本地类型
         * @param sign 特殊标记
         * @returns 目标类型
         */
        convert(data: any, sign: string): any;
        /**
         * 解析业务对象数据
         * @param data 目标类型
         * @param sign 特殊标记
         * @returns 本地类型
         */
        parsing(data: any, sign: string): any;
    }
    /**
     * 数据转换者
     * 泛型1，本地类型
     * 泛型2，目标类型
     */
    interface IBOConverter<L, T> {
        /**
         * 转换业务对象数据
         * @param data 本地类型
         * @returns 目标类型
         */
        convert(data: L): T;
        /**
         * 解析业务对象数据
         * @param data 目标类型
         * @returns 本地类型
         */
        parsing(data: T): L;
    }
    /** 远程仓库 */
    abstract class RemoteRepository implements IRemoteRepository {
        /** 远程服务地址 */
        private _address;
        address: string;
        /** 访问口令 */
        private _token;
        token: string;
        private _converter;
        converter: IDataConverter;
        /**
         * 返回方法地址
         * @param method 方法名称
         */
        protected methodUrl(method: string): string;
        /**
         * 调用远程方法
         * @param method 方法地址
         * @param data 数据
         * @param caller 调用者
         */
        abstract callRemoteMethod(method: string, data: any, caller: IMethodCaller<any>): void;
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace ibas {
    /** 数据转换，ibas4java */
    abstract class DataConverter4j implements IDataConverter {
        /**
         * 转换业务对象数据
         * @param data 本地类型
         * @param sign 特殊标记
         * @returns 目标类型
         */
        convert(data: any, sign: string): any;
        /**
         * 解析业务对象数据
         * @param data 目标类型
         * @param sign 特殊标记
         * @returns 本地类型
         */
        parsing(data: any, sign: string): any;
        private _boConverter;
        protected readonly boConverter: IBOConverter<IBusinessObject, any>;
        /** 创建业务对象转换者 */
        protected abstract createConverter(): IBOConverter<IBusinessObject, any>;
    }
    /** 属性映射 */
    class PropertyMap {
        constructor(local: string, remote: string);
        /** 本地属性 */
        localProperty: string;
        /** 远程属性 */
        remoteProperty: string;
    }
    /** 属性映射 */
    class PropertyMaps extends ArrayList<PropertyMap> {
        localProperty(property: string): string;
        remoteProperty(property: string): string;
    }
    /** 远程对象，类型属性名称 */
    const REMOTE_OBJECT_TYPE_PROPERTY_NAME: string;
    /** 业务对象的数据转换 */
    abstract class BOConverter implements IBOConverter<IBusinessObject, any> {
        /** 获取对象类型 */
        private getTypeName(data);
        /** 设置对象类型 */
        private setTypeName(data, type);
        private _propertyMaps;
        private readonly propertyMaps;
        /**
         * 解析远程数据
         * @param datas 远程数据
         * @returns 操作结果数据
         */
        parsing(data: any): IBusinessObject;
        /**
         * 解析属性
         * @param source 源数据（远程类型）
         * @param target 目标数据（本地类型）
         */
        private parsingProperties(source, target);
        /**
         * 转换数据
         * @param data 当前类型数据
         * @returns 转换的数据
         */
        convert(data: IBusinessObject): Object;
        /**
         * 转换属性
         * @param source 源数据（本地类型）
         * @param target 目标数据（远程类型）
         * @returns 目标数据
         */
        private convertProperties(source, target);
        /**
         * 解析数据
         * @param boName 对象名称
         * @param property 属性名称
         * @param value 值
         * @returns 解析的值
         */
        protected parsingData(boName: string, property: string, value: any): any;
        /**
         * 转换数据
         * @param boName 对象名称
         * @param property 属性名称
         * @param value 值
         * @returns 转换的值
         */
        protected convertData(boName: string, property: string, value: any): any;
        /**
         * 自定义解析
         * @param data 远程数据
         * @returns 本地数据
         */
        protected abstract customParsing(data: any): IBusinessObject;
        /** 业务对象工厂实例 */
        protected abstract factory(): BOFactory;
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace ibas {
    /**
     * 表达式
     */
    interface IExpression {
    }
    /**
     * 判断表达式
     */
    interface IJudgmentExpression<T> extends IExpression {
        /**
         * 表达式结果
         * @return true，成立；false，不成立
         * @throws 不支持的操作
         */
        result(): boolean;
        /**
         * 左值
         */
        leftValue: T;
        /**
         * 右值
         */
        rightValue: T;
        /**
         * 操作
         */
        operation: emJudmentOperation;
    }
    /**
     * 值转换者
     */
    interface IValueConverter<T> {
        /** 转换值 */
        convert(value: any): T;
    }
    /**
     * 值操作者
     */
    interface IValueOperator {
        /** 获取值 */
        getValue(): any;
        /** 设置值 */
        setValue(value: any): void;
        /** 获取值类型 */
        valueType(): string;
    }
    /**
     * 增强值操作者
     */
    interface IValueOperatorEx extends IValueOperator {
        /** 类型转换者 */
        converter: IValueConverter<any>;
    }
    /**
     * 属性值操作者
     */
    interface IPropertyValueOperator extends IValueOperator {
        /** 属性名称 */
        propertyName: string;
    }
    /**
     * 判断链-项目
     */
    interface IJudgmentLinkItem {
        /** 关系（and、or） */
        relationship: emJudmentOperation;
        /** 开括号 */
        openBracket: number;
        /** 左取值 */
        leftOperter: IValueOperator;
        /** 比较方式 */
        operation: emJudmentOperation;
        /** 右取值 */
        rightOperter: IValueOperator;
        /** 闭括号 */
        closeBracket: number;
    }
    /**
     * 判断链
     */
    interface IJudgmentLink {
        /** 判断项目集合 */
        judgmentItems: IJudgmentLinkItem[];
        /**
         * 判断
         * @param value 比较值
         * @return true,满足;false,不满足
         * @throws 不支持的操作
         */
        judge(value: any): boolean;
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace ibas {
    /** 数据转换 */
    namespace judgment {
        namespace convert {
            function operation(value: emConditionOperation): emJudmentOperation;
            function relationship(value: emConditionRelationship): emJudmentOperation;
        }
        namespace expression {
            function create<T>(type: string): IJudgmentExpression<T>;
        }
    }
    /**
     * 判断表达式
     */
    abstract class JudgmentExpression<T> implements IJudgmentExpression<T> {
        /**
         * 表达式结果
         * @return true，成立；false，不成立
         * @throws 不支持的操作
         */
        result(): boolean;
        /**
         * 左值
         */
        leftValue: T;
        /**
         * 右值
         */
        rightValue: T;
        /**
         * 操作
         */
        operation: emJudmentOperation;
        /**
         * 字符串输出
         */
        toString(): string;
    }
    /**
     * 布尔值表达式比较
     */
    class JudgmentExpressionBoolean extends JudgmentExpression<boolean> {
        result(): boolean;
    }
    /**
     * 日期值表达式比较
     */
    class JudgmentExpressionDate extends JudgmentExpression<Date> {
        result(): boolean;
    }
    /**
     * 数字值表达式比较
     */
    class JudgmentExpressionNumber extends JudgmentExpression<number> {
        result(): boolean;
    }
    /**
     * 枚举值表达式比较
     */
    class JudgmentExpressionEnum extends JudgmentExpression<number> {
        result(): boolean;
    }
    /**
     * 字符串值表达式比较
     */
    class JudgmentExpressionString extends JudgmentExpression<string> {
        result(): boolean;
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace ibas {
    /** 值操作者 */
    class ValueOperator implements IValueOperator {
        private value;
        /** 获取值 */
        getValue(): any;
        /** 设置值 */
        setValue(value: any): void;
        /** 获取值类型 */
        valueType(): string;
    }
    /** 增强值操作者 */
    class ValueOperatorEx extends ValueOperator implements IValueOperatorEx {
        /** 类型转换者 */
        converter: IValueConverter<any>;
        /** 获取值 */
        getValue(): any;
    }
    /** 属性值操作者 */
    class PropertyValueOperator extends ValueOperator implements IPropertyValueOperator {
        /** 属性名称 */
        propertyName: string;
        /** 获取值 */
        getValue(): any;
    }
    class ValueConverterString implements IValueConverter<string> {
        convert(value: any): string;
    }
    namespace judgment {
        namespace converter {
            function create<T>(type: string): IValueConverter<T>;
        }
    }
    /**
     * 判断链-项目
     */
    class JudgmentLinkItem implements IJudgmentLinkItem {
        constructor();
        /** 关系（and、or） */
        relationship: emJudmentOperation;
        /** 开括号 */
        openBracket: number;
        /** 左取值 */
        leftOperter: IValueOperator;
        /** 比较方式 */
        operation: emJudmentOperation;
        /** 右取值 */
        rightOperter: IValueOperator;
        /** 闭括号 */
        closeBracket: number;
        /** 输出字符串 */
        toString(): string;
    }
    /**
     * 判断链
     */
    class JudgmentLink implements IJudgmentLink {
        constructor();
        /** 判断项目集合 */
        judgmentItems: IJudgmentLinkItem[];
        /**
         * 获取判断项目
         * @param startIndex 括号索引
         * @param judgmentItems 基于的项目
         */
        private getJudgmentItems(startIndex, judgmentItems);
        /**
         * 判断
         * @param value 比较值
         * @return true,满足;false,不满足
         */
        judge(value: any): boolean;
        /**
         * 判断链
         * @param bracket 括号索引
         * @param judgmentItems 判断链
         */
        protected judgeLink(bracket: number, judgmentItems: IJudgmentLinkItem[]): boolean;
        /**
         * 创建表达式
         * @param judgeItem 判断项
         */
        protected createExpression(judgeItem: IJudgmentLinkItem): IJudgmentExpression<any>;
    }
    /**
     * 业务对象的判断链
     */
    class BOJudgmentLink extends JudgmentLink {
        /**
         * 判断
         * @param value 比较值
         * @return true,满足;false,不满足
         */
        judge(value: any): boolean;
        /**
         * 创建表达式
         * @param judgeItem 判断项
         */
        protected createExpression(judgeItem: IJudgmentLinkItem): IJudgmentExpression<any>;
    }
    /**
     * 业务对象的判断链
     */
    class BOJudgmentLinkCondition extends BOJudgmentLink {
        /** 解析查询条件 */
        parsingConditions(conditions: ICondition[]): void;
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace ibas {
    /** 远程仓库 */
    abstract class RemoteRepositoryAjax extends RemoteRepository implements IRemoteRepository {
        /** 自动解析数据 */
        autoParsing: boolean;
        /**
         * 远程方法调用
         * 特殊调用参数可重载createAjaxSettings方法
         * @param method 方法名称
         * @param data 数据
         * @param caller 方法监听
         */
        callRemoteMethod(method: string, data: any, caller: IMethodCaller<any>): void;
        /**
         * 创建调用参数，可重载
         * @param method 方法名称
         * @param data 调用数据
         */
        protected abstract createAjaxSettings(method: string, data: any): JQueryAjaxSettings;
    }
    /** 远程业务对象仓库 */
    class BORepositoryAjax extends RemoteRepositoryAjax implements IBORepository {
        /**
         * 查询数据
         * @param boName 业务对象名称
         * @param caller 查询者
         */
        fetch<P>(boName: string, caller: IFetchCaller<P>): void;
        /**
         * 保存数据
         * @param boName 业务对象名称
         * @param caller 保存者
         */
        save<P>(boName: string, caller: ISaveCaller<P>): void;
        /**
         * 创建调用参数，可重载
         * @param method 方法名称
         * @param data 调用数据
         */
        protected createAjaxSettings(method: string, data: string): JQueryAjaxSettings;
    }
    /** 远程文件只读仓库 */
    class FileRepositoryAjax extends RemoteRepositoryAjax implements IFileRepository {
        constructor();
        /**
         * 创建调用参数，可重载
         * @param fileName 文件名
         * @param dataType 返回的数据类型
         */
        protected createAjaxSettings(fileName: string, caller: ILoadFileCaller): JQueryAjaxSettings;
        /**
         * 加载文件
         * @param fileName 文件名称
         * @param caller 调用者
         */
        load(fileName: string, caller: ILoadFileCaller): void;
    }
    /** 远程文件业务对象仓库 */
    class BOFileRepositoryAjax extends FileRepositoryAjax implements IBORepositoryReadonly {
        /**
         * 查询数据
         * @param boName 业务对象名称
         * @param caller 查询监听者
         */
        fetch<P>(boName: string, caller: IFetchCaller<P>): void;
        /**
         * 过滤数据
         * @param criteria 查询
         * @param data 数据
         * @return true,符合条件；false，不符合条件
         */
        private filter(criteria, data);
    }
    /** 文件上传仓库 */
    class FileRepositoryUploadAjax extends RemoteRepositoryAjax implements IFileRepositoryUpload {
        /**
         * 创建调用参数，可重载
         * @param fileName 文件名
         * @param dataType 返回的数据类型
         */
        protected createAjaxSettings(method: string, data: FormData): JQueryAjaxSettings;
        /**
         * 上传文件
         * @param method 方法地址
         * @param caller 调用者
         */
        upload<T>(method: string, caller: IUploadFileCaller<T>): void;
    }
    /** 远程仓库 */
    abstract class RemoteRepositoryXhr extends RemoteRepository {
        /** 自动解析数据 */
        autoParsing: boolean;
        /**
         * 远程方法调用
         * 特殊调用参数可重载createAjaxSettings方法
         * @param method 方法名称
         * @param data 数据
         * @param caller 方法监听
         */
        callRemoteMethod(method: string, data: any, caller: IMethodCaller<any>): void;
        protected abstract createHttpRequest(method: string, data: any): XMLHttpRequest;
    }
    /** 文件下载仓库 */
    class FileRepositoryDownloadAjax extends RemoteRepositoryXhr implements IFileRepositoryDownload {
        constructor();
        /**
         * 下载文件
         * @param method 方法地址
         * @param caller 调用者
         */
        download<T>(method: string, caller: IDownloadFileCaller<T>): void;
        protected createHttpRequest(method: string, data: any): XMLHttpRequest;
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace ibas {
    /** 模块仓库名称模板 */
    const MODULE_REPOSITORY_NAME_TEMPLATE: string;
    /** 配置项目-离线模式 */
    const CONFIG_ITEM_OFFLINE_MODE: string;
    /** 配置项目-仓库离线模式 */
    const CONFIG_ITEM_REPOSITORY_OFFLINE_MODE: string;
    /** 配置项目-远程仓库的默认地址模板 */
    const CONFIG_ITEM_TEMPLATE_REMOTE_REPOSITORY_ADDRESS: string;
    /** 配置项目-离线仓库的默认地址模板 */
    const CONFIG_ITEM_TEMPLATE_OFFLINE_REPOSITORY_ADDRESS: string;
    /** 配置项目-用户口令 */
    const CONFIG_ITEM_USER_TOKEN: string;
    /** 配置项目-仓库用户口令 */
    const CONFIG_ITEM_REPOSITORY_USER_TOKEN: string;
    /**
     * 业务仓库应用
     */
    interface IBORepositoryApplication {
        /**
         * 远程服务地址
         */
        address: string;
        /**
         * 访问口令
         */
        token: string;
        /**
         * 是否离线
         */
        offline: boolean;
    }
    /**
     * 业务仓库应用
     */
    abstract class BORepositoryApplication implements IBORepositoryApplication {
        constructor();
        private _address;
        /** 远程地址 */
        address: string;
        private _token;
        /** 访问口令 */
        token: string;
        private _offline;
        /** 是否离线 */
        offline: boolean;
        /** 创建只读业务仓库 */
        protected createReadonlyRepository(): IBORepositoryReadonly;
        /** 创建读写业务仓库 */
        protected createRepository(): IBORepository;
        /** 查询业务对象 */
        protected fetch<P>(boName: string, caller: IFetchCaller<P>): void;
        /** 保存业务对象 */
        protected save<P>(boName: string, caller: ISaveCaller<P>): void;
        /** 创建数据转换者 */
        protected abstract createConverter(): IDataConverter;
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace ibas {
    /**
     * 动作
     */
    abstract class Action {
        constructor();
        /**
         * 构造
         * @param logger 日志记录者
         */
        constructor(logger: ILogger);
        private config;
        /**
         * 添加配置
         * @param key 配置项
         * @param value 值
         */
        addConfig(key: string, value: any): void;
        /**
         * 获取配置
         * @param key 配置项
         */
        protected getConfig(key: string): any;
        /**
         * 获取配置
         * @param key 配置项
         * @param defalut 默认值
         */
        protected getConfig<T>(key: string, defalut: T): T;
        /** 日志记录者 */
        private logger;
        /** 设置日志记录者 */
        setLogger(logger: ILogger): void;
        /**
         * 记录消息
         * @param level 消息级别
         * @param message 消息格式
         * @param pars 格式内容
         */
        protected log(level: emMessageLevel, message: string, ...pars: any[]): void;
        /**
         * 记录消息
         * @param message 内容
         * @param pars 格式内容
         */
        protected log(message: string, ...pars: any[]): void;
        /** 标识 */
        id: string;
        /** 名称 */
        name: string;
        /** 开始时间 */
        private _startTime;
        readonly startTime: Date;
        /** 结束时间 */
        private _endTime;
        readonly endTime: Date;
        /** 是否运行中 */
        isRunning(): boolean;
        /** 进行 */
        do(): void;
        /** 完成 */
        protected done(): void;
        /** 停止（最好重载） */
        stop(): void;
        /** 运行（需要实现） */
        protected abstract run(): boolean;
        /** 额外的运行数据 */
        extraData: any;
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace ibas {
    /** 业务规则错误 */
    class BusinessRuleError extends Error {
    }
    /** 业务规则 */
    interface IBusinessRule {
        /**
         * 运行业务规则
         *
         * @param bo
         *            执行规则的业务对象
         */
        execute(bo: IBusinessObject): void;
        /**
         * 输入的属性集合
         *
         * 仅当属于此集合的属性变化时，才运行此规则
         */
        inputProperties: IList<string>;
        /**
         * 被影响的属性集合
         */
        affectedProperties: IList<string>;
    }
    /** 业务规则集合 */
    interface IBusinessRules extends Iterable<IBusinessRule> {
        /** 是否已初始化 */
        initialized: boolean;
        /** 注册规则 */
        register(rules: IBusinessRule[]): void;
        /** 大小 */
        size(): number;
        /**
         * 运行业务规则
         * @param bo
         *            执行规则的业务对象
         * @param properties
         *            变化的属性
         */
        execute(bo: IBusinessObject, ...properties: string[]): void;
    }
    /** 业务规则管理员 */
    interface IBusinessRulesManager {
        /**
         * 获取规则
         * @param type
         * @return
         */
        getRules(type: any): IBusinessRules;
    }
    /** 业务规则 */
    abstract class BusinessRule implements IBusinessRule {
        constructor();
        /** 规则名称 */
        name: string;
        /** 输入的属性集合 */
        inputProperties: IList<string>;
        /** 被影响的属性集合 */
        affectedProperties: IList<string>;
        /** 运行业务规则 */
        abstract execute(bo: IBusinessObject): void;
    }
    /** 业务规则内容 */
    class BusinessRuleContextCommon {
        constructor();
        source: IBusinessObject;
        inputValues: Map<string, any>;
        outputValues: Map<string, any>;
    }
    /** 普通业务规则 */
    abstract class BusinessRuleCommon extends BusinessRule {
        /** 运行业务逻辑 */
        execute(bo: IBusinessObject): void;
        /** 计算规则 */
        protected abstract compute(context: BusinessRuleContextCommon): void;
    }
    /** 业务规则内容 */
    class BusinessRuleContextCollection {
        constructor();
        source: IBusinessObject;
        inputValues: Map<string, any[]>;
        outputValues: Map<string, any>;
    }
    /** 集合属性业务规则 */
    abstract class BusinessRuleCollection extends BusinessRule {
        constructor(collection: string);
        /** 集合属性 */
        collection: string;
        /** 运行业务逻辑 */
        execute(bo: IBusinessObject): void;
        /** 计算规则 */
        protected abstract compute(context: BusinessRuleContextCommon): void;
    }
    const businessRulesManager: IBusinessRulesManager;
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace ibas {
    /** 业务规则-最大长度 */
    class BusinessRuleMaxLength extends BusinessRuleCommon {
        /**
         *
         * @param length 长度
         * @param properties 属性
         */
        constructor(length: number, ...properties: string[]);
        maxLength: number;
        /** 计算规则 */
        protected compute(context: BusinessRuleContextCommon): void;
    }
    /** 业务规则-最大值 */
    class BusinessRuleMaxValue<T extends number | Date> extends BusinessRuleCommon {
        /**
         *
         * @param maxValue 最大值
         * @param properties 属性
         */
        constructor(maxValue: T, ...properties: string[]);
        maxValue: T;
        /** 计算规则 */
        protected compute(context: BusinessRuleContextCommon): void;
    }
    /** 业务规则-最小值 */
    class BusinessRuleMinValue<T extends number | Date> extends BusinessRuleCommon {
        /**
         *
         * @param minValue 最小值
         * @param properties 属性
         */
        constructor(minValue: T, ...properties: string[]);
        minValue: T;
        /** 计算规则 */
        protected compute(context: BusinessRuleContextCommon): void;
    }
    /** 业务规则-要求有值 */
    class BusinessRuleRequired extends BusinessRuleCommon {
        /**
         *
         * @param properties 属性
         */
        constructor(...properties: string[]);
        /** 计算规则 */
        protected compute(context: BusinessRuleContextCommon): void;
    }
    /** 业务规则-求和 */
    class BusinessRuleSummation extends BusinessRuleCommon {
        /**
         *
         * @param result 属性-结果
         * @param addends 属性-加数
         */
        constructor(result: string, ...addends: string[]);
        /** 结果 */
        result: string;
        /** 求和 */
        addends: IList<string>;
        /** 计算规则 */
        protected compute(context: BusinessRuleContextCommon): void;
    }
    /** 业务规则-求差 */
    class BusinessRuleSubtraction extends BusinessRuleCommon {
        /**
         *
         * @param result 属性-结果
         * @param subtrahend 属性-被减数
         * @param subtractors 属性-减数
         */
        constructor(result: string, subtrahend: string, ...subtractors: string[]);
        /** 结果 */
        result: string;
        /** 被减数 */
        subtrahend: string;
        /** 减数 */
        subtractors: IList<string>;
        /** 计算规则 */
        protected compute(context: BusinessRuleContextCommon): void;
    }
    /** 业务规则-求积 */
    class BusinessRuleMultiplication extends BusinessRuleCommon {
        /**
         *
         * @param result 属性-结果
         * @param multiplicand 属性-被乘数
         * @param multiplier 属性-乘数
         */
        constructor(result: string, multiplicand: string, multiplier: string);
        /** 结果 */
        result: string;
        /** 被乘数 */
        multiplicand: string;
        /** 乘数 */
        multiplier: string;
        /** 计算规则 */
        protected compute(context: BusinessRuleContextCommon): void;
    }
    /** 业务规则-求商 */
    class BusinessRuleDivision extends BusinessRuleCommon {
        /**
         *
         * @param result 属性-结果
         * @param dividend 属性-被除数
         * @param divisor 属性-除数
         */
        constructor(result: string, dividend: string, divisor: string);
        /** 结果 */
        result: string;
        /** 被乘数 */
        dividend: string;
        /** 乘数 */
        divisor: string;
        /** 计算规则 */
        protected compute(context: BusinessRuleContextCommon): void;
    }
    /** 业务规则-加减法推导 */
    class BusinessRuleAdditiveDeduction extends BusinessRuleCommon {
        /**
         *
         * @param augend 属性-被加数
         * @param addend 属性-加数
         * @param result 属性-结果
         */
        constructor(augend: string, addend: string, result: string);
        /** 结果 */
        result: string;
        /** 被加数 */
        augend: string;
        /** 加数 */
        addend: string;
        /** 计算规则 */
        protected compute(context: BusinessRuleContextCommon): void;
    }
    /** 业务规则-乘除法推导 */
    class BusinessRuleMultiplicativeDeduction extends BusinessRuleCommon {
        /**
         *
         * @param augend 属性-被乘数
         * @param addend 属性-乘数
         * @param result 属性-结果
         */
        constructor(multiplicand: string, multiplier: string, result: string);
        /** 结果 */
        result: string;
        /** 被乘数 */
        multiplicand: string;
        /** 乘数 */
        multiplier: string;
        /** 计算规则 */
        protected compute(context: BusinessRuleContextCommon): void;
    }
    /**
     * 业务规则-集合元素属性求和
     */
    class BusinessRuleSumElements extends BusinessRuleCollection {
        /**
         *
         * @param result 属性-结果
         * @param collection 属性-集合
         * @param summing 属性-求和
         */
        constructor(result: string, collection: string, summing: string);
        /** 结果 */
        result: string;
        /** 求和 */
        summing: string;
        /** 计算规则 */
        protected compute(context: BusinessRuleContextCollection): void;
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace ibas {
    /** 系统用户-标记 */
    const SYSTEM_USER_ID: number;
    /** 位置用户-标记 */
    const UNKNOWN_USER_ID: number;
    /** 配置项目-审批方法 */
    const CONFIG_ITEM_APPROVAL_WAY: string;
    /** 配置项目-组织方式 */
    const CONFIG_ITEM_ORGANIZATION_WAY: string;
    /** 配置项目-权限判断方式 */
    const CONFIG_ITEM_OWNERSHIP_WAY: string;
    /** 配置项目-格式-日期 */
    const CONFIG_ITEM_FORMAT_DATE: string;
    /** 配置项目-格式-时间 */
    const CONFIG_ITEM_FORMAT_TIME: string;
    /** 配置项目-格式-日期时间 */
    const CONFIG_ITEM_FORMAT_DATETIME: string;
    /** 配置项目-小数位 */
    const CONFIG_ITEM_DECIMAL_PLACES: string;
    /** 配置项目-小数位-价格 */
    const CONFIG_ITEM_DECIMAL_PLACES_PRICE: string;
    /** 配置项目-小数位-数量 */
    const CONFIG_ITEM_DECIMAL_PLACES_QUANTITY: string;
    /** 配置项目-小数位-率 */
    const CONFIG_ITEM_DECIMAL_PLACES_RATE: string;
    /** 配置项目-小数位-总计 */
    const CONFIG_ITEM_DECIMAL_PLACES_SUM: string;
    /** 配置项目-小数位-单位数量 */
    const CONFIG_ITEM_DECIMAL_PLACES_MEASUREMENT: string;
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace ibas {
    /** 平台 */
    enum emPlantform {
        /** 平板和桌面 */
        COMBINATION = 0,
        /** 桌面 */
        DESKTOP = 1,
        /** 手机 */
        PHONE = 2,
        /** 平板 */
        TABLET = 3,
    }
    /** 消息类型 */
    enum emMessageType {
        /** 消息 */
        INFORMATION = 0,
        /** 成功 */
        SUCCESS = 1,
        /** 错误 */
        ERROR = 2,
        /** 警告 */
        WARNING = 3,
        /** 问询 */
        QUESTION = 4,
    }
    /** 消息动作 */
    enum emMessageAction {
        /** 终止 */
        ABORT = 0,
        /** 取消 */
        CANCEL = 1,
        /** 关闭 */
        CLOSE = 2,
        /** 删除 */
        DELETE = 3,
        /** 忽略 */
        IGNORE = 4,
        /** 否 */
        NO = 5,
        /** 确定 */
        OK = 6,
        /** 重试 */
        RETRY = 7,
        /** 是 */
        YES = 8,
    }
    /** 权限来源 */
    enum emPrivilegeSource {
        /** 模块设置 */
        MODULE = 0,
        /** 应用设置 */
        APPLICATION = 1,
        /** 业务对象设置 */
        BUSINESS_OBJECT = 2,
    }
    /** 权限值 */
    enum emAuthoriseType {
        /** 全部权限 */
        ALL = 0,
        /** 只取权限 */
        READ = 1,
        /** 没有权限 */
        NONE = 2,
    }
    /** 选择类型 */
    enum emChooseType {
        /** 单选 */
        SINGLE = 0,
        /** 多选 */
        MULTIPLE = 1,
    }
    /** 手指触控移动方向 */
    enum emTouchMoveDirection {
        /** 上 */
        UP = 0,
        /** 下 */
        DOWN = 1,
        /** 左 */
        LEFT = 2,
        /** 右 */
        RIGHT = 3,
        /** 无 */
        NONE = 4,
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace ibas {
    namespace requires {
        /** 加载器名称模板 */
        const CONTEXT_NAME_TEMPLATE_IBAS: string;
        /** 加载等待时间 */
        const CONFIG_ITEM_WAIT_SECONDS: string;
        /** 命名 */
        function naming(name: string): string;
        /**
         * 创建require实例
         * @param config 配置
         */
        function create(requireConfig: RequireConfig): Require;
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace ibas {
    interface IBrowserEventListener {
        id?: string;
        eventType: emBrowserEventType;
        /** 事件被触发 */
        onEventFired(event: Event): void;
    }
    class BrowserEventManager {
        /** 集合 */
        private _listeners;
        listeners(): IList<IBrowserEventListener>;
        listeners(type: emBrowserEventType): IList<IBrowserEventListener>;
        /** 获取 */
        listener(id: string): IBrowserEventListener;
        /** 注册 */
        registerListener(listener: IBrowserEventListener): void;
        /** 触发浏览器事件 */
        fireEvent(type: emBrowserEventType): void;
        fireEvent(type: emBrowserEventType, event: Event): void;
    }
    /** 浏览器事件类型 */
    enum emBrowserEventType {
        ABORT = 0,
        AFTERPRINT = 1,
        BEFOREPRINT = 2,
        BEFOREUNLOAD = 3,
        BLUR = 4,
        CANPLAY = 5,
        CANPLAYTHROUGH = 6,
        CHANGE = 7,
        CLICK = 8,
        COMPASSNEEDSCALIBRATION = 9,
        CONTEXTMENU = 10,
        DBLCLICK = 11,
        DEVICELIGHT = 12,
        DEVICEMOTION = 13,
        DEVICEORIENTATION = 14,
        DRAG = 15,
        DRAGEND = 16,
        DRAGENTER = 17,
        DRAGLEAVE = 18,
        DRAGOVER = 19,
        DRAGSTART = 20,
        DROP = 21,
        DURATIONCHANGE = 22,
        EMPTIED = 23,
        ENDED = 24,
        ERROR = 25,
        FOCUS = 26,
        /** 浏览器哈希值改变 */
        HASHCHANGE = 27,
        INPUT = 28,
        INVALID = 29,
        /** 用户按下任何键盘键（包括系统按钮，如箭头键和功能键） */
        KEYDOWN = 30,
        /** 按下并放开任何字母数字键（不包括系统按钮，如箭头键和功能键） */
        KEYPRESS = 31,
        /** 放开任何先前按下的键盘键 */
        KEYUP = 32,
        LOAD = 33,
        LOADEDDATA = 34,
        LOADEDMETADATA = 35,
        LOADSTART = 36,
        MESSAGE = 37,
        MOUSEDOWN = 38,
        MOUSEENTER = 39,
        MOUSELEAVE = 40,
        MOUSEMOVE = 41,
        MOUSEOUT = 42,
        MOUSEOVER = 43,
        MOUSEUP = 44,
        MOUSEWHEEL = 45,
        MSGESTURECHANGE = 46,
        MSGESTUREDOUBLETAP = 47,
        MSGESTUREEND = 48,
        MSGESTUREHOLD = 49,
        MSGESTURESTART = 50,
        MSGESTURETAP = 51,
        MSINERTIASTART = 52,
        MSPOINTERCANCEL = 53,
        MSPOINTERDOWN = 54,
        MSPOINTERENTER = 55,
        MSPOINTERLEAVE = 56,
        MSPOINTERMOVE = 57,
        MSPOINTEROUT = 58,
        MSPOINTEROVER = 59,
        MSPOINTERUP = 60,
        OFFLINE = 61,
        ONLINE = 62,
        ORIENTATIONCHANGE = 63,
        PAGEHIDE = 64,
        PAGESHOW = 65,
        PAUSE = 66,
        PLAY = 67,
        PLAYING = 68,
        POPSTATE = 69,
        PROGRESS = 70,
        RATECHANGE = 71,
        READYSTATECHANGE = 72,
        RESET = 73,
        RESIZE = 74,
        SCROLL = 75,
        SEEKED = 76,
        SEEKING = 77,
        SELECT = 78,
        STALLED = 79,
        STORAGE = 80,
        SUBMIT = 81,
        SUSPEND = 82,
        TIMEUPDATE = 83,
        /** 当系统停止跟踪触摸的时候触发 */
        TOUCHCANCEL = 84,
        /** 当手指从屏幕上离开的时候触发 */
        TOUCHEND = 85,
        /** 当手指在屏幕上滑动的时候连续地触发。在这个事件发生期间，调用preventDefault()事件可以阻止滚动 */
        TOUCHMOVE = 86,
        /** 当手指触摸屏幕时候触发，即使已经有一个手指放在屏幕上也会触发 */
        TOUCHSTART = 87,
        UNLOAD = 88,
        VOLUMECHANGE = 89,
        WAITING = 90,
    }
    /** 浏览器事件管理员实例 */
    const browserEventManager: BrowserEventManager;
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace ibas {
    /**
     * 文件
     */
    namespace files {
        /** 保存文件 */
        function save(data: Blob, fileName: string): void;
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace ibas {
    /** 系统元素 */
    interface IElement {
        /** 唯一标识 */
        id: string;
        /** 名称 */
        name: string;
        /** 类别 */
        category: string;
        /** 描述 */
        description: string;
    }
    /**
     * 模块
     */
    interface IModule extends IElement {
        /** 版本 */
        version: string;
        /** 版权声明 */
        copyright: string;
        /** 图标 */
        icon: string;
        /** 功能集合 */
        functions(): IFunction[];
    }
    /**
     * 功能
     */
    interface IFunction extends IElement {
    }
    /**
     * 功能-应用
     */
    interface IApplication<T extends IView> extends IElement {
        /** 应用的视图 */
        view: T;
        /** 运行 */
        run(): void;
        /** 显示视图 */
        show(): void;
        /** 关闭视图 */
        close(): void;
        /** 清理资源 */
        destroy(): void;
        /** 视图显示者 */
        viewShower: IViewShower;
        /** 视图导航 */
        navigation: IViewNavigation;
    }
    /**
     * 工具条-应用
     */
    interface IBarApplication<T extends IBarView> extends IApplication<T> {
    }
    /**
     * 应用-视图
     */
    interface IView {
        /** 唯一标识 */
        id: string;
        /** 标题 */
        title: string;
        /** 绘制视图 */
        draw(): any;
        /** 关闭视图 */
        closeEvent: Function;
    }
    /**
     * 应用-视图
     */
    interface IUrlView extends IView {
        /** 内部打开 */
        isInside: boolean;
        /** 地址 */
        url: string;
    }
    /**
     * 工具条应用-视图
     */
    interface IBarView extends IView {
        /** 绘制工具条视图 */
        drawBar(): any;
        /** 激活完整视图事件 */
        showFullViewEvent: Function;
        /** 工具条视图显示完成事件 */
        barShowedEvent: Function;
    }
    /** 对话消息调用者 */
    interface IMessgesCaller {
        /** 类型 */
        type: emMessageType;
        /** 内容 */
        message: string;
        /** 标题 */
        title?: string;
        /** 动作 */
        actions?: emMessageAction[];
        /** 调用完成 */
        onCompleted?(action: emMessageAction): void;
    }
    /**
     * 视图-显示者
     */
    interface IViewShower {
        /** 显示视图 */
        show(view: IView): void;
        /** 清理资源 */
        destroy(view: IView): void;
        /** 设置忙状态 */
        busy(view: IView, busy: boolean, msg: string): void;
        /** 进程消息 */
        proceeding(view: IView, type: emMessageType, msg: string): void;
        /** 对话消息 */
        messages(caller: IMessgesCaller): void;
    }
    /**
     * 视图-导航
     */
    interface IViewNavigation {
        /**
         * 创建视图
         * @param id 应用id
         */
        create(id: string): IView;
        /**
         * 创建视图
         * @param app 应用
         */
        create<T extends IView>(app: IApplication<T>): IView;
    }
    /**
     * 模块-控制台
     */
    interface IModuleConsole extends IModule {
        /** 模块名称 */
        module: string;
        /** 当前平台 */
        readonly plantform: emPlantform;
        /** 初始化完成 */
        isInitialized: boolean;
        /** 根地址 */
        rootUrl: string;
        /** 功能集合 */
        functions(): IModuleFunction[];
        /** 默认功能 */
        default(): IModuleFunction;
        /** 添加初始化完成监听 */
        addListener(listener: Function): void;
        /** 已实例应用集合 */
        applications(): IApplication<IView>[];
    }
    /**
     * 模块-功能
     */
    interface IModuleFunction extends IFunction {
        /** 所属模块 */
        module: IModule;
        /** 图标 */
        icon: string;
        /** 视图导航 */
        navigation: IViewNavigation;
        /** 激活的 */
        activated: boolean;
        /** 默认应用 */
        default(): IApplication<IView>;
    }
    /** 系统元素 */
    class Element implements IElement {
        /** 唯一标识 */
        id: string;
        /** 名称 */
        name: string;
        /** 类别 */
        category: string;
        /** 描述 */
        description: string;
    }
    /** 模块 */
    class Module extends Element implements IModule {
        constructor();
        /** 版本 */
        version: string;
        /** 版权声明 */
        copyright: string;
        /** 图标 */
        icon: string;
        private _functions;
        /** 功能集合 */
        functions(): IFunction[];
        /** 注册功能 */
        protected register(item: IFunction): void;
    }
    /** 地址hash值标记-功能 */
    const URL_HASH_SIGN_FUNCTIONS: string;
    /** 模块-功能 */
    abstract class AbstractFunction extends Element implements IFunction {
        constructor();
    }
    /** 配置项目-平台 */
    const CONFIG_ITEM_PLANTFORM: string;
    /** 功能-应用 */
    abstract class AbstractApplication<T extends IView> extends Element implements IApplication<T> {
        constructor();
        /** 当前平台 */
        protected readonly plantform: emPlantform;
        /** 视图显示者 */
        viewShower: IViewShower;
        /** 视图导航 */
        navigation: IViewNavigation;
        private _view;
        /** 应用的视图 */
        readonly view: T;
        /** 视图是否已显示 */
        isViewShowed(): boolean;
        /** 注册视图 */
        protected abstract registerView(): void;
        /** 运行 */
        abstract run(): void;
        /** 显示视图 */
        abstract show(): void;
        /** 关闭视图 */
        abstract close(): void;
        /** 清理资源（视图关闭并取消引用） */
        destroy(): void;
    }
    /** 地址hash值标记-视图 */
    const URL_HASH_SIGN_VIEWS: string;
    /** 视图 */
    abstract class View implements IView {
        /** 应用 */
        application: IApplication<IView>;
        /** 唯一标识 */
        id: string;
        /** 标题 */
        title: string;
        /** 隐藏标题栏 */
        hideTitle: boolean;
        /** 是否已显示 */
        isDisplayed: boolean;
        /** 是否忙 */
        isBusy: boolean;
        /** 绘制视图 */
        abstract draw(): any;
        /** 关闭视图 */
        closeEvent: Function;
        /**
         * 触发视图事件
         * @param event 触发的事件
         * @param pars 参数
         */
        protected fireViewEvents(event: Function, ...pars: any[]): void;
        /** 显示之后 */
        onDisplayed(): void;
        /** 关闭之后 */
        onClosed(): void;
        /** 按钮按下时 */
        onKeyDown(event: KeyboardEvent): void;
        /** 地址栏哈希值变化 */
        onHashChanged(event: HashChangeEvent): void;
        /** 手指触控移动 */
        onTouchMove(direction: emTouchMoveDirection, event: TouchEvent): void;
    }
    /** 配置项目-默认模块图标 */
    const CONFIG_ITEM_DEFALUT_MODULE_ICON: string;
    /** 配置项目-禁用平台视图 */
    const CONFIG_ITEM_DISABLE_PLATFORM_VIEW: string;
    /** 模块控制台 */
    abstract class ModuleConsole extends Module implements IModuleConsole {
        constructor();
        /** 模块名称 */
        module: string;
        /** 根地址 */
        rootUrl: string;
        /** 当前平台 */
        readonly plantform: emPlantform;
        /** 功能集合，仅激活的 */
        functions(): IModuleFunction[];
        /** 默认功能 */
        default(): IModuleFunction;
        private listeners;
        /** 添加初始化完成监听 */
        addListener(listener: Function): void;
        /** 初始化完成 */
        isInitialized: boolean;
        /** 初始化 */
        protected initialize(): void;
        /** 初始化完成，需要手工调用 */
        protected fireInitialized(): void;
        /** 注册 */
        protected abstract registers(): void;
        /** 运行，重载后必须保留基类调用 */
        run(): void;
        /** 创建视图导航 */
        abstract navigation(): IViewNavigation;
        /** 视图显示者 */
        viewShower: IViewShower;
        private _applications;
        /** 已实例应用集合 */
        applications(): IApplication<IView>[];
        /** 注册功能 */
        protected register(item: ModuleFunction): void;
        /** 注册应用 */
        protected register(item: AbstractApplication<IView>): void;
        /** 注册服务 */
        protected register(item: ServiceMapping): void;
        /** 设置仓库地址，返回值是否执行默认设置 */
        setRepository(address: string): boolean;
        /** 加载视图 */
        protected loadUI(ui: string | string[], ready: Function): void;
    }
    /** 模块控制台 */
    abstract class ModuleFunction extends AbstractFunction implements IModuleFunction {
        /** 所属模块 */
        module: IModule;
        /** 图标 */
        icon: string;
        /** 创建视图导航 */
        navigation: IViewNavigation;
        /** 激活的 */
        activated: boolean;
        /** 默认功能 */
        abstract default(): IApplication<IView>;
    }
    /** 视图-导航 */
    abstract class ViewNavigation implements IViewNavigation {
        /**
         * 创建视图
         * @param id 应用id
         */
        create(id: string): IView;
        /**
         * 创建视图
         * @param app 应用
         */
        create<T extends IView>(app: IApplication<T>): IView;
        /**
         * 创建实例
         * @param id 应用id
         */
        protected abstract newView(id: string): IView;
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace ibas {
    /** 使用查询面板 */
    interface IUseQueryPanel {
        /** 查询标识 */
        readonly queryId: string;
        /** 查询目标 */
        readonly queryTarget?: any;
        /** 使用的查询 */
        readonly usingCriteria?: ICriteria;
        /** 查询数据 */
        query(criteria: ICriteria): void;
        /** 嵌入下拉条 */
        embeddedPuller?(view: any): void;
    }
    /** 嵌入查询面板 */
    interface IEmbeddedQueryPanel {
        /** 嵌入 */
        embedded(view: any): void;
    }
    /**
     * 业务对象应用-视图
     */
    interface IBOView extends IView {
    }
    /** 使用查询面板 */
    interface IUseQueryPanel {
        /** 查询标识 */
        readonly queryId: string;
        /** 查询目标 */
        readonly queryTarget?: any;
        /** 使用的查询 */
        readonly usingCriteria?: ICriteria;
        /** 查询数据 */
        query(criteria: ICriteria): void;
        /** 嵌入下拉条 */
        embeddedPuller?(view: any): void;
    }
    /** 嵌入查询面板 */
    interface IEmbeddedQueryPanel {
        /** 嵌入 */
        embedded(view: any): void;
    }
    /**
     * 业务对象应用-选择视图
     */
    interface IBOQueryView extends IBOView, IUseQueryPanel {
        /** 查询数据事件，参数：查询条件 ICriteria */
        fetchDataEvent: Function;
    }
    /**
     * 业务对象应用-选择视图
     */
    interface IBOChooseView extends IBOQueryView {
        /** 选择数据事件，参数：选择数据 */
        chooseDataEvent: Function;
        /** 新建数据事件 */
        newDataEvent: Function;
        /** 选择类型 */
        chooseType: emChooseType;
    }
    /**
     * 业务对象应用-列表视图
     */
    interface IBOListView extends IBOQueryView {
        /** 新建数据事件 */
        newDataEvent: Function;
        /** 查看数据事件，参数：目标数据 */
        viewDataEvent: Function;
    }
    /**
     * 业务对象应用-编辑视图
     */
    interface IBOEditView extends IBOView {
        /** 保存数据事件 */
        saveDataEvent: Function;
    }
    /**
     * 业务对象应用-查看视图
     */
    interface IBOViewView extends IBOView {
        /** 编辑数据事件 */
        editDataEvent: Function;
    }
    /**
     * 常驻应用-视图
     */
    interface IResidentView extends IBarView {
    }
    /**
     * 快捷应用-视图
     */
    interface IShortcutView extends IBarView {
    }
    /**
     * 业务对象应用
     */
    abstract class Application<T extends IView> extends AbstractApplication<T> {
        /** 运行 */
        run(): void;
        /** 显示视图 */
        show(): void;
        /** 视图显示后 */
        private afterViewShow();
        /** 注册视图 */
        protected registerView(): void;
        /** 视图显示后 */
        protected abstract viewShowed(): void;
        /** 关闭视图 */
        close(): void;
        /** 设置忙状态 */
        protected busy(busy: boolean): void;
        /** 设置忙状态 */
        protected busy(busy: boolean, msg: string): void;
        /** 设置消息 */
        protected proceeding(msg: string): void;
        /** 设置消息 */
        protected proceeding(type: emMessageType, msg: string): void;
        /**
         * 显示消息对话框
         * @param caller 消息调用者
         */
        protected messages(caller: IMessgesCaller): void;
        /**
         * 显示消息对话框
         * @param type 消息类型
         * @param message 消息内容
         */
        protected messages(type: emMessageType, message: string): void;
        /**
         * 显示消息对话框
         * @param error 错误
         */
        protected messages(error: Error): void;
    }
    /**
     * 工具条应用
     */
    abstract class BarApplication<T extends IBarView> extends Application<T> {
        /** 注册视图，重载需要回掉此方法 */
        protected registerView(): void;
        /** 工具条显示完成，可重载 */
        protected barShowed(): void;
        /** 激活完整视图 */
        protected showFullView(): void;
        /** 运行 */
        run(): void;
    }
    /**
     * 服务应用
     */
    abstract class ServiceApplication<T extends IView, C extends IServiceContract> extends Application<T> implements IService<IServiceCaller<C>> {
        /** 注册视图，重载需要回掉此方法 */
        protected registerView(): void;
        /** 运行 */
        run(): void;
        /**
         * 运行
         * @param caller 服务调用者
         */
        run(caller: IServiceCaller<C>): void;
        /** 运行服务 */
        protected abstract runService(contract: C): void;
    }
    /**
     * 服务（带结果）应用
     */
    abstract class ServiceWithResultApplication<T extends IView, C extends IServiceContract, D> extends ServiceApplication<T, C> implements IService<IServiceWithResultCaller<C, D>> {
        /** 注册视图，重载需要回掉此方法 */
        protected registerView(): void;
        /** 运行 */
        run(): void;
        /**
         * 运行
         * @param caller 服务调用者
         */
        run(caller: IServiceWithResultCaller<C, D>): void;
        /** 运行服务 */
        protected abstract runService(contract: C): void;
        /** 完成事件 */
        private onCompleted;
        /** 触发完成事件 */
        protected fireCompleted(result: D): void;
    }
    /**
     * 业务对象应用
     */
    abstract class BOApplication<T extends IBOView> extends Application<T> {
        /** 业务对象编码 */
        boCode: string;
        /** 注册视图，重载需要回掉此方法 */
        protected registerView(): void;
    }
    /**
     * 业务对象查询应用
     */
    abstract class BOQueryApplication<T extends IBOQueryView> extends BOApplication<T> {
        /** 注册视图，重载需要回掉此方法 */
        protected registerView(): void;
        /** 查询数据 */
        protected abstract fetchData(criteria: ICriteria): void;
    }
    /**
     * 常驻应用
     */
    abstract class ResidentApplication<T extends IResidentView> extends BarApplication<T> {
        /** 注册视图，重载需要回掉此方法 */
        protected registerView(): void;
    }
    /**
     * 业务对象快捷应用
     */
    abstract class ShortcutApplication<T extends IShortcutView> extends BarApplication<T> {
        /** 注册视图，重载需要回掉此方法 */
        protected registerView(): void;
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace ibas {
    /**
     * 应用服务
     */
    interface IService<C extends IServiceCaller<IServiceContract>> {
        /** 运行服务 */
        run(caller: C): void;
    }
    /**
     * 业务对象选择服务
     */
    interface IBOChooseService<D> extends IService<IBOChooseServiceCaller<D>> {
    }
    /**
     * 业务对象选择服务
     */
    interface IBOLinkService extends IService<IBOLinkServiceCaller> {
    }
    /**
     * 应用服务映射
     */
    interface IServiceMapping extends IElement {
        /** 图标 */
        icon: string;
        /** 服务代理的类型 */
        proxy: any;
        /** 视图显示者 */
        viewShower: IViewShower;
        /** 视图导航 */
        navigation: IViewNavigation;
        /** 创建服务实例 */
        create(): IService<IServiceCaller<IServiceContract>>;
    }
    /**
     * 显示服务者
     */
    interface IServicesShower {
        /** 服务代理 */
        proxy: IServiceProxy<IServiceContract>;
        /** 显示服务 */
        displayServices(services: IServiceAgent[]): void;
    }
    /**
     * 应用服务代理
     */
    interface IServiceAgent extends IElement {
        /** 图标 */
        icon: string;
        /** 服务调用者 */
        caller: IServiceCaller<IServiceContract>;
        /** 运行服务 */
        run(): void;
    }
    /** 服务的契约 */
    interface IServiceContract {
    }
    /** 业务对象服务的契约 */
    interface IDataServiceContract<T> extends IServiceContract {
        /** 数据 */
        data: T;
    }
    /** 业务对象服务的契约 */
    interface IBOServiceContract extends IDataServiceContract<IBusinessObject> {
        /** 数据转换者 */
        converter?: IDataConverter;
    }
    /** 业务对象列表服务的契约 */
    interface IBOListServiceContract extends IDataServiceContract<IBusinessObject[]> {
        /** 数据转换者 */
        converter?: IDataConverter;
    }
    /** 业务对象连接服务的契约 */
    interface IBOLinkServiceContract extends IServiceContract {
        /** 业务对象编码 */
        boCode: string;
        /** 连接的值 */
        linkValue: string | ICriteria | ICondition[];
    }
    /** 业务对象选择服务的契约 */
    interface IBOChooseServiceContract extends IServiceContract {
        /** 业务对象编码 */
        boCode: string;
        /** 选择类型 */
        chooseType?: emChooseType;
        /** 条件 */
        criteria?: ICriteria | ICondition[];
        /** 选择服务标题 */
        title?: string;
    }
    /** 查询编辑服务契约 */
    interface ICriteriaEditorServiceContract extends IServiceContract {
        /** 查询或查询条件 */
        criteria: ICriteria | ICondition[];
        /** 目标对象（业务对象编码或对象类型） */
        target?: string | object;
        /** 查询条件字段 */
        aliases?: KeyText[];
    }
    /** 服务代理 */
    interface IServiceProxy<C extends IServiceContract> {
        /** 服务的契约 */
        contract: C;
    }
    /** 服务调用者 */
    interface IServiceCaller<C extends IServiceContract> {
        /** 服务契约代理 */
        proxy?: IServiceProxy<C>;
        /** 服务触发者 */
        trigger?: any;
        /** 服务类别码 */
        category?: string;
    }
    /** 服务调用者 */
    interface IServiceWithResultCaller<C extends IServiceContract, Out> extends IServiceCaller<C> {
        /** 服务调用完成 - 结果 */
        onCompleted(result: Out): void;
    }
    /** 业务对象选择服务调用者 */
    interface IBOChooseServiceCaller<D> extends IServiceWithResultCaller<IBOChooseServiceContract, IList<D>>, IBOChooseServiceContract {
        /** 服务契约代理 */
        proxy?: IServiceProxy<IBOChooseServiceContract>;
    }
    /** 业务对象连接服务调用者 */
    interface IBOLinkServiceCaller extends IServiceCaller<IBOLinkServiceContract>, IBOLinkServiceContract {
        /** 服务契约代理 */
        proxy?: IServiceProxy<IBOLinkServiceContract>;
    }
    /** 应用服务调用者 */
    interface IApplicationServiceCaller<In extends IServiceContract> extends IServiceCaller<In> {
        /** 应用标记 */
        appId?: string;
        /** 服务契约代理 */
        proxy: IServiceProxy<In>;
    }
    /** 带结果的应用服务调用者 */
    interface IApplicationServiceWithResultCaller<In extends IServiceContract, Out> extends IServiceWithResultCaller<In, Out> {
        /** 应用标记 */
        appId?: string;
        /** 服务契约代理 */
        proxy: IServiceProxy<In>;
    }
    /** 配置项目-默认服务图片 */
    const CONFIG_ITEM_DEFALUT_SERVICE_ICON: string;
    /** 地址hash值标记-服务 */
    const URL_HASH_SIGN_SERVICES: string;
    /** 服务映射 */
    abstract class ServiceMapping implements IServiceMapping {
        constructor();
        /** 视图显示者 */
        viewShower: IViewShower;
        /** 视图导航 */
        navigation: IViewNavigation;
        /** 唯一标识 */
        id: string;
        /** 名称 */
        name: string;
        /** 类别 */
        category: string;
        /** 描述 */
        description: string;
        /** 图标 */
        icon: string;
        /** 服务契约代理类型（非实例） */
        proxy: any;
        /** 创建服务实例 */
        abstract create(): IService<IServiceCaller<IServiceContract>>;
    }
    /** 业务对象选择服务映射 */
    abstract class BOChooseServiceMapping extends ServiceMapping {
        constructor();
        /** 重写此属性到boCode */
        category: string;
        /** 业务对象编码 */
        boCode: string;
    }
    /** 业务对象连接服务映射 */
    abstract class BOLinkServiceMapping extends ServiceMapping {
        constructor();
        /** 重写此属性到boCode */
        category: string;
        /** 业务对象编码 */
        boCode: string;
    }
    /** 应用服务映射 */
    abstract class ApplicationServiceMapping extends ServiceMapping {
        constructor();
        /** 重写此属性到id */
        category: string;
    }
    /** 服务代理 */
    abstract class ServiceProxy<C extends IServiceContract> implements IServiceProxy<C> {
        constructor(contract: C);
        /** 服务的契约 */
        contract: C;
    }
    /** 数据服务代理 */
    class DataServiceProxy<T> extends ServiceProxy<IDataServiceContract<T>> {
    }
    /** 业务对象服务代理 */
    class BOServiceProxy extends DataServiceProxy<IBOServiceContract> {
        constructor(contract: IBOServiceContract);
    }
    /** 业务对象列表服务代理 */
    class BOListServiceProxy extends DataServiceProxy<IBOListServiceContract> {
        constructor(contract: IBOListServiceContract);
    }
    /** 业务对象连接服务代理 */
    class BOLinkServiceProxy extends ServiceProxy<IBOLinkServiceContract> {
        constructor(contract: IBOLinkServiceContract);
    }
    /** 业务对象选择服务代理 */
    class BOChooseServiceProxy extends ServiceProxy<IBOChooseServiceContract> {
        constructor(contract: IBOChooseServiceContract);
    }
    /** 查询编辑服务代理 */
    class CriteriaEditorServiceProxy extends ServiceProxy<ICriteriaEditorServiceContract> {
        constructor(contract: ICriteriaEditorServiceContract);
    }
    /** 服务管理员 */
    class ServicesManager {
        constructor();
        /** 服务映射 */
        private mappings;
        /** 注册服务映射 */
        register(mapping: IServiceMapping): void;
        /** 获取服务映射 */
        getServiceMapping(id: string): IServiceMapping;
        /** 获取服务 */
        getServices(caller: IServiceCaller<IServiceContract>): IServiceAgent[];
        /**
         * 运行服务
         * @param caller 调用者
         * @returns 是否成功运行服务
         */
        private runService(caller);
        /** 运行选择服务 */
        runChooseService<D>(caller: IBOChooseServiceCaller<D>): void;
        /** 运行连接服务 */
        runLinkService(caller: IBOLinkServiceCaller): void;
        /**
         * 运行应用服务
         * @param caller 调用者<In>(<输入类型>)
         */
        runApplicationService<In>(caller: IApplicationServiceCaller<In>): void;
        /**
         * 运行应用服务
         * @param caller 调用者<In,Out>(<输入类型,输出类型>)
         */
        runApplicationService<In, Out>(caller: IApplicationServiceWithResultCaller<In, Out>): void;
        /**
         * 显示可用服务
         * @param shower 显示服务者
         */
        showServices(shower: IServicesShower): void;
    }
    /** 服务管理员实例 */
    const servicesManager: ServicesManager;
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace ibas {
    /**
     * 业务对象选择应用
     */
    abstract class BOChooseApplication<T extends IBOChooseView, D> extends BOQueryApplication<T> {
        /** 注册视图，重载需要回掉此方法 */
        protected registerView(): void;
        /** 选择数据，参数：数据 */
        protected abstract chooseData(datas: D[]): void;
        /** 新建数据 */
        protected abstract newData(): void;
    }
    /** 配置项目-自动选择数据 */
    const CONFIG_ITEM_AUTO_CHOOSE_DATA: string;
    /**
     * 业务对象选择服务
     * 类型参数：视图，选择数据
     */
    abstract class BOChooseService<T extends IBOChooseView, D> extends BOChooseApplication<T, D> implements IBOChooseService<D> {
        /** 运行 */
        run(): void;
        /**
         * 运行
         * @param caller 服务调用者
         */
        run(caller: IBOChooseServiceCaller<D>): void;
        /** 完成 */
        private onCompleted;
        /** 触发完成事件 */
        private fireCompleted(selecteds);
        /** 选择数据后,直接触发完成事件 */
        protected chooseData(datas: D[]): void;
    }
    /**
     * 业务对象列表应用
     */
    abstract class BOListApplication<T extends IBOListView, D> extends BOApplication<T> {
        /** 注册视图，重载需要回掉此方法 */
        protected registerView(): void;
        /** 运行 */
        run(): void;
        /**
         * 运行
         * @param criteria 查询或查询条件
         */
        run(criteria: ICriteria | ICondition[]): void;
        /** 查询数据 */
        protected abstract fetchData(criteria: ICriteria): void;
        /** 新建数据 */
        protected abstract newData(): void;
        /** 查看数据，参数：目标数据 */
        protected abstract viewData(data: D): void;
    }
    /**
     * 业务对象编辑应用
     */
    abstract class BOEditApplication<T extends IBOEditView, D> extends BOApplication<T> {
        /** 注册视图，重载需要回掉此方法 */
        protected registerView(): void;
        /** 当前编辑的数据 */
        protected abstract editData: D;
        /** 选择数据，参数：数据 */
        protected abstract saveData(): void;
        /** 关闭视图 */
        close(): void;
    }
    /**
     * 业务对象查看应用
     */
    abstract class BOViewApplication<T extends IBOViewView> extends BOApplication<T> {
        /** 注册视图，重载需要回掉此方法 */
        protected registerView(): void;
    }
    /**
     * 业务对象查看应用服务
     */
    abstract class BOViewService<T extends IBOViewView> extends BOViewApplication<T> {
        /** 运行 */
        run(): void;
        /**
         * 运行
         * @param criteria 查询或查询条件
         */
        run(caller: IBOLinkServiceCaller): void;
        /** 查询数据 */
        protected abstract fetchData(criteria: ICriteria | string): void;
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace ibas {
    /** 地址视图 */
    abstract class UrlView extends View implements IUrlView {
        /** 内部打开 */
        isInside: boolean;
        /** 地址 */
        url: string;
    }
    /** 业务对象视图 */
    abstract class BOView extends View implements IBOView {
    }
    /** 业务对象查询视图 */
    abstract class BODialogView extends BOView {
        /** 确认 */
        confirm(): void;
    }
    /** 业务对象查询视图 */
    abstract class BOQueryView extends BOView implements IBOQueryView {
        /** 查询标识 */
        readonly queryId: string;
        /** 使用的查询 */
        readonly usingCriteria: ICriteria;
        /** 上一次使用的查询 */
        protected lastCriteria: ICriteria;
        /** 查询数据事件，参数：查询条件 ICriteria */
        fetchDataEvent: Function;
        /** 查询数据 */
        query(criteria: ICriteria): void;
    }
    /** 业务对象查询对话视图 */
    abstract class BOQueryDialogView extends BODialogView implements IBOQueryView {
        /** 查询标识 */
        readonly queryId: string;
        /** 使用的查询 */
        readonly usingCriteria: ICriteria;
        /** 上一次使用的查询 */
        protected lastCriteria: ICriteria;
        /** 查询数据事件，参数：查询条件 ICriteria */
        fetchDataEvent: Function;
        /** 查询数据 */
        query(criteria: ICriteria): void;
    }
    /** 业务对象查询视图，带查询面板 */
    abstract class BOQueryViewWithPanel extends BOQueryView implements IEmbeddedQueryPanel {
        /** 嵌入查询面板，返回值：是否需要初始化 */
        abstract embedded(view: any): void;
    }
    /** 业务对象列表视图 */
    abstract class BOListView extends BOQueryView implements IBOListView {
        /** 新建数据事件 */
        newDataEvent: Function;
        /** 查看数据事件，参数：目标数据 */
        viewDataEvent: Function;
    }
    /** 业务对象选择视图 */
    abstract class BOChooseView extends BOQueryDialogView implements IBOChooseView {
        /** 新建数据事件 */
        newDataEvent: Function;
        /** 选择数据事件，参数：选择数据 */
        chooseDataEvent: Function;
        /** 选择类型 */
        chooseType: emChooseType;
    }
    /** 业务对象查看视图 */
    abstract class BOViewView extends BOView implements IBOViewView {
        /** 编辑数据事件 */
        editDataEvent: Function;
    }
    /** 业务对象编辑视图 */
    abstract class BOEditView extends BOView implements IBOEditView {
        /** 保存数据事件 */
        saveDataEvent: Function;
    }
    /** 业务对象工具条视图 */
    abstract class BOBarView extends BOView implements IBarView {
        /** 绘制工具条 */
        abstract drawBar(): any;
        /** 激活完整视图事件 */
        showFullViewEvent: Function;
        /** 工具条视图显示完成事件 */
        barShowedEvent: Function;
    }
    /** 业务对象面板视图 */
    abstract class BOPanelView extends BODialogView implements IBarView {
        /** 绘制工具条 */
        abstract drawBar(): any;
        /** 激活完整视图事件 */
        showFullViewEvent: Function;
        /** 工具条视图显示完成事件 */
        barShowedEvent: Function;
    }
    /** 业务对象常驻应用视图 */
    abstract class BOResidentView extends BOBarView implements IResidentView {
    }
    /** 业务对象快捷应用视图 */
    abstract class BOShortcutView extends BOBarView implements IShortcutView {
    }
    /** 页签视图 */
    abstract class TabView extends View implements IView {
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace ibas {
    /** 变量-用户ID */
    const VARIABLE_NAME_USER_ID: string;
    /** 变量-用户编码 */
    const VARIABLE_NAME_USER_CODE: string;
    /** 变量-用户名称 */
    const VARIABLE_NAME_USER_NAME: string;
    /** 变量-是否超级用户 */
    const VARIABLE_NAME_USER_SUPER: string;
    /** 变量-用户归属 */
    const VARIABLE_NAME_USER_BELONG: string;
    /** 变量-用户口令 */
    const VARIABLE_NAME_USER_TOKEN: string;
    /** 变量管理员 */
    class VariablesManager {
        /** 运行中的变量 */
        private variables;
        /** 注册系统观察者 */
        register(watcher: ISystemWatcher): void;
        /** 注册变量 */
        register(variable: KeyValue): void;
        /** 注册变量 */
        register(key: string, value: any): void;
        /** 获取所有变量 */
        all(): KeyValue[];
        /** 获取变量 */
        get(key: string): KeyValue;
        /** 获取变量 */
        getValue(key: string): any;
        /** 系统用户 */
        private watcher;
        getWatcher(): ISystemWatcher;
    }
    /** 系统运行状态观察者 */
    interface ISystemWatcher {
        /** 运行的模块 */
        modules(): IList<IModule>;
    }
    /** 变量管理员实例 */
    const variablesManager: VariablesManager;
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace ibas {
    /** 关于 */
    const about: any;
}
