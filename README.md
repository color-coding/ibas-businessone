<div align="center">

# IBAS BusinessOne

**SAP Business One 适配层**

为 IBAS 框架提供 SAP Business One (B1) DI API 的 Java 封装，包括数据访问、序列化、数据结构转换与代码生成工具。

Java adapter layer providing SAP Business One (B1) DI API integration for the IBAS framework — data access, serialization, structure transformation, and code generation.

[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](LICENSE)
[![Java](https://img.shields.io/badge/Java-1.8+-orange.svg)](https://www.oracle.com/java/)
[![Maven](https://img.shields.io/badge/Maven-3.x-red.svg)](https://maven.apache.org/)
[![Version](https://img.shields.io/badge/version-0.2.0-green.svg)](pom.xml)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#-贡献--contributing)

</div>

---

## 📖 目录 | Table of Contents

- [✨ 特性 | Features](#-特性--features)
- [📦 模块结构 | Modules](#-模块结构--modules)
- [🚀 快速开始 | Quick Start](#-快速开始--quick-start)
- [🏗️ 架构 | Architecture](#️-架构--architecture)
- [⚙️ 配置 | Configuration](#️-配置--configuration)
- [📚 相关项目 | Related Projects](#-相关项目--related-projects)
- [🤝 贡献 | Contributing](#-贡献--contributing)
- [📄 许可证 | License](#-许可证--license)
- [🙏 鸣谢 | Thanks](#-鸣谢--thanks)

---

## ✨ 特性 | Features

- **🔗 B1 DI API 封装** — Java 封装 SAP Business One DI API，提供 `ICompany` 连接池管理
- **🔄 双数据库适配** — 根据 B1 公司数据库类型（HANA / MSSQL）自动选择对应的 SQL 适配器
- **📡 JSON / XML 序列化** — 通过反射分析 B1 DI API 接口结构，支持 JSON 和 XML 双向序列化
- **🛠️ 代码生成** — 从 B1 DI API 接口反射生成 ibas 代码模型（Domain / Model / BusinessObject）
- **📋 数据结构管理** — B1 用户表（UserTablesMD）和用户字段（UserFieldsMD）的创建/更新/删除
- **📤 结构导出** — 从 B1 公司导出自定义表/字段和系统字段结构为 XML 模型文件
- **🔢 枚举映射** — 通过反射读取 `SBOCOMConstants` 常量，建立 B1 对象类型编码映射
- **🔄 多版本支持** — 支持 B1 8.8 ~ 10 多个版本编译

---

## 📦 模块结构 | Modules

| 模块 | 类型 | 说明 |
|------|------|------|
| `bobas.businessobjectscommon.b1` | JAR | **核心库** — B1 数据访问、序列化、连接池、数据库适配 |
| `btulz.transforms.b1` | JAR | **转换工具** — B1 代码生成、数据结构部署、结构导出（命令行工具） |
| `bobas.businessone.demo` | WAR | **演示项目** — 基于 Jersey 的 REST 服务，暴露 B1 查询接口 |

---

## 🚀 快速开始 | Quick Start

### 环境要求 | Prerequisites

- **JDK** 1.8+
- **Maven** 3.x
- SAP Business One 服务环境（含 DI API）

### 构建 | Build

```bash
# 克隆仓库
git clone https://github.com/color-coding/ibas-businessone.git
cd ibas-businessone

# 编译所有模块（按 compile_order.txt 顺序）
./compile_packages.sh

# 编译核心库
mvn clean package install -Dmaven.test.skip=true -f bobas.businessobjectscommon.b1/pom.xml

# 编译转换工具
mvn clean package install -Dmaven.test.skip=true -f btulz.transforms.b1/pom.xml

# 编译 demo（WAR 包）
mvn clean package -Dmaven.test.skip=true -f bobas.businessone.demo/pom.xml

# 发布到 Maven 仓库
./deploy_packages.sh [仓库名]
```

### 多版本 B1 编译

`btulz.transforms.b1` 通过不同的 POM 文件支持多个 B1 版本：

| POM 文件 | B1 版本 |
|-----------|---------|
| `pom.b188.xml` | B1 8.8 |
| `pom.b191.xml` | B1 9.1 |
| `pom.b192.xml` | B1 9.2 |
| `pom.b193.xml` | B1 9.3 |
| `pom.b110.xml` | B1 10（默认版本） |

---

## 🏗️ 架构 | Architecture

```
┌──────────────────────────────────────┐
│      bobas.businessone.demo (WAR)    │  REST 服务（Jersey）
├──────────────────────────────────────┤
│    btulz.transforms.b1 (JAR)         │  代码生成 / 数据结构 / 导出
├──────────────────────────────────────┤
│  bobas.businessobjectscommon.b1 (JAR)│  连接池 / 序列化 / DB 适配
├──────────────────────────────────────┤
│        ibas-framework (BOBAS)        │  业务对象框架
└──────────────────────────────────────┘
```

### 核心组件

| 组件 | 说明 |
|------|------|
| `B1CompanyPool` | ICompany 连接池（单例），管理 B1 公司连接的获取/回收/释放 |
| `B1Adapter` | 继承 ibas DbAdapter，根据 B1 数据库类型委托对应 SQL 适配器 |
| `B1Serializer` | 通过反射分析 B1 DI API 接口结构，支持 JSON / XML 序列化 |
| `BORepositoryBusinessOne` | B1 仓库基类，封装连接管理、事务、查询、序列化 |
| `CodeTransformer` | 从 B1 DI API 接口反射生成 ibas 代码模型 |
| `DsTransformer` | XML 模型 → B1 用户表/用户字段创建 |

---

## ⚙️ 配置 | Configuration

B1 连接配置在 `app.xml` 中：

| 配置键 | 说明 | 示例 |
|--------|------|------|
| `B1Server` | B1 服务地址 | `ibas-db-mssql` |
| `B1Company` | 账套名称 | `SBODemoCN` |
| `B1User` / `B1Password` | B1 用户/密码 | `manager` |
| `B1LicenseServer` | 许可服务地址 | `host:30000` |
| `B1SLDServer` | SLD 架构地址 | `host:40000` |
| `B1DbType` | 数据库类型枚举 | `dst_MSSQL2017` |
| `B1Serialization` | 序列化方式 | `json` / `xml` |
| `B1CompanyPoolSize` | 连接池大小 | 默认 `1` |

---

## 📚 相关项目 | Related Projects

| 项目 | 说明 |
|------|------|
| [ibas-framework](https://github.com/color-coding/ibas-framework) | BOBAS 业务对象框架 |
| [btulz.transforms](https://github.com/color-coding/btulz.transforms) | 代码生成工具链 |

---

## 🤝 贡献 | Contributing

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支（`git checkout -b feature/amazing-feature`）
3. 提交更改（`git commit -m 'Add amazing feature'`）
4. 推送到分支（`git push origin feature/amazing-feature`）
5. 发起 Pull Request

---

## 📄 许可证 | License

本项目基于 [Apache License 2.0](LICENSE) 开源。
---

## 🙏 鸣谢 | Thanks

<div align="center">

**[Color-Coding Studio](http://colorcoding.org/)** · 咔啦工作室

</div>
