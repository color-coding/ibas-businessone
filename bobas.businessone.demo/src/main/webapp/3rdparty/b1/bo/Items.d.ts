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
        export interface Items {
            apTaxCode: string;
            arTaxCode: string;
            assetClass: string;
            assetGroup: string;
            assetItem: number;
            assetSerialNumber: string;
            assetStatus: number;
            attachmentEntry: number;
            attributeGroups: AttributeGroups[];
            autoCreateSerialNumbersOnRelease: number;
            avgStdPrice: number;
            barCode: string;
            barCodes: BarCodes[];
            baseUnitName: string;
            beverageCommercialBrandCode: number;
            beverageGroupCode: string;
            beverageTableCode: string;
            capitalizationDate: Date;
            cession: number;
            chapterID: number;
            commissionGroup: number;
            commissionPercent: number;
            commissionSum: number;
            componentWarehouse: number;
            costAccountingMethod: number;
            countingItemsPerUnit: number;
            customsGroupCode: number;
            dnfEntry: number;
            dataExportCode: string;
            deactivateAfterUsefulLife: number;
            defaultCountingUnit: string;
            defaultCountingUoMEntry: number;
            defaultPurchasingUoMEntry: number;
            defaultSalesUoMEntry: number;
            defaultWarehouse: string;
            depreciationGroup: string;
            depreciationParameters: DepreciationParameters[];
            desiredInventory: number;
            distributionRules: DistributionRules[];
            ecExpensesAccount: string;
            ecRevenuesAccount: string;
            employee: number;
            enforceAssetSerialNumbers: number;
            excisable: number;
            exemptIncomeAccount: string;
            expanseAccount: string;
            forceSelectionOfSerialNumber: number;
            foreignExpensesAccount: string;
            foreignName: string;
            foreignRevenuesAccount: string;
            frozen: number;
            frozenFrom: Date;
            frozenRemarks: string;
            frozenTo: Date;
            fuelID: number;
            glMethod: number;
            gstRelevnt: number;
            gstTaxCategory: number;
            gtsItemSpec: string;
            gtsItemTaxCategory: string;
            inCostRollup: number;
            incomeAccount: string;
            incomingServiceCode: number;
            indirectTax: number;
            intrastatExtension: IntrastatExtension;
            inventoryItem: number;
            inventoryNumber: string;
            inventoryUOM: string;
            inventoryUoMEntry: number;
            inventoryWeight: number;
            inventoryWeight1: number;
            inventoryWeightUnit: number;
            inventoryWeightUnit1: number;
            isPhantom: number;
            issueMethod: number;
            issuePrimarilyBy: number;
            itemClass: number;
            itemCode: string;
            itemCountryOrg: string;
            itemName: string;
            itemType: number;
            itemsGroupCode: number;
            leadTime: number;
            linkedResource: string;
            localizationInfos: LocalizationInfos[];
            location: number;
            mainsupplier: string;
            manageBatchNumbers: number;
            manageByQuantity: number;
            manageSerialNumbers: number;
            manageSerialNumbersOnReleaseOnly: number;
            manageStockByWarehouse: number;
            manufacturer: number;
            materialGroup: number;
            materialType: number;
            maxInventory: number;
            minInventory: number;
            minOrderQuantity: number;
            movingAveragePrice: number;
            ncmCode: number;
            noDiscounts: number;
            orderIntervals: string;
            orderMultiple: number;
            outgoingServiceCode: number;
            periodControls: PeriodControls[];
            picture: string;
            planningSystem: number;
            preferredVendors: PreferredVendors[];
            priceList: PriceList;
            procurementMethod: number;
            prodStdCost: number;
            productSource: number;
            projects: Projects[];
            purchaseFactor1: number;
            purchaseFactor2: number;
            purchaseFactor3: number;
            purchaseFactor4: number;
            purchaseHeightUnit: number;
            purchaseHeightUnit1: number;
            purchaseItem: number;
            purchaseItemsPerUnit: number;
            purchaseLengthUnit: number;
            purchaseLengthUnit1: number;
            purchasePackagingUnit: string;
            purchaseQtyPerPackUnit: number;
            purchaseUnit: string;
            purchaseUnitHeight: number;
            purchaseUnitHeight1: number;
            purchaseUnitLength: number;
            purchaseUnitLength1: number;
            purchaseUnitVolume: number;
            purchaseUnitWeight: number;
            purchaseUnitWeight1: number;
            purchaseUnitWidth: number;
            purchaseUnitWidth1: number;
            purchaseVATGroup: string;
            purchaseVolumeUnit: number;
            purchaseWeightUnit: number;
            purchaseWeightUnit1: number;
            purchaseWidthUnit: number;
            purchaseWidthUnit1: number;
            quantityOnStock: number;
            quantityOrderedByCustomers: number;
            quantityOrderedFromVendors: number;
            sacEntry: number;
            sriAndBatchManageMethod: number;
            sww: string;
            salesFactor1: number;
            salesFactor2: number;
            salesFactor3: number;
            salesFactor4: number;
            salesHeightUnit: number;
            salesHeightUnit1: number;
            salesItem: number;
            salesItemsPerUnit: number;
            salesLengthUnit: number;
            salesLengthUnit1: number;
            salesPackagingUnit: string;
            salesQtyPerPackUnit: number;
            salesUnit: string;
            salesUnitHeight: number;
            salesUnitHeight1: number;
            salesUnitLength: number;
            salesUnitLength1: number;
            salesUnitVolume: number;
            salesUnitWeight: number;
            salesUnitWeight1: number;
            salesUnitWidth: number;
            salesUnitWidth1: number;
            salesVATGroup: string;
            salesVolumeUnit: number;
            salesWeightUnit: number;
            salesWeightUnit1: number;
            salesWidthUnit: number;
            salesWidthUnit1: number;
            scsCode: string;
            serialNum: string;
            series: number;
            serviceGroup: number;
            shipType: number;
            spProdType: number;
            statisticalAsset: number;
            supplierCatalogNo: string;
            taxType: number;
            technician: number;
            toleranceDays: number;
            treeType: number;
            typeOfAdvancedRules: number;
            unitOfMeasurements: UnitOfMeasurements[];
            uoMGroupEntry: number;
            updateDate: Date;
            updateTime: Date;
            userFields: UserFields;
            user_Text: string;
            valid: number;
            validFrom: Date;
            validRemarks: string;
            validTo: Date;
            vatLiable: number;
            virtualAssetItem: number;
            wtLiable: number;
            warrantyTemplate: string;
            whsInfo: WhsInfo[];
        }


        export interface AttributeGroups {
            attribute1: string;
            attribute10: string;
            attribute11: string;
            attribute12: string;
            attribute13: string;
            attribute14: string;
            attribute15: string;
            attribute16: string;
            attribute17: string;
            attribute18: string;
            attribute19: string;
            attribute2: string;
            attribute20: string;
            attribute21: string;
            attribute22: string;
            attribute23: string;
            attribute24: string;
            attribute25: string;
            attribute26: string;
            attribute27: string;
            attribute28: string;
            attribute29: string;
            attribute3: string;
            attribute30: string;
            attribute31: string;
            attribute32: string;
            attribute33: number;
            attribute34: number;
            attribute35: number;
            attribute36: number;
            attribute37: number;
            attribute38: number;
            attribute39: number;
            attribute4: string;
            attribute40: number;
            attribute41: number;
            attribute42: number;
            attribute43: Date;
            attribute44: Date;
            attribute45: Date;
            attribute46: Date;
            attribute47: Date;
            attribute48: number;
            attribute49: number;
            attribute5: string;
            attribute50: number;
            attribute51: number;
            attribute52: number;
            attribute53: number;
            attribute54: number;
            attribute55: number;
            attribute56: number;
            attribute57: number;
            attribute58: number;
            attribute59: number;
            attribute6: string;
            attribute60: number;
            attribute61: number;
            attribute62: number;
            attribute63: number;
            attribute64: number;
            attribute7: string;
            attribute8: string;
            attribute9: string;
        }

        export interface BarCodes {
            absEntry: number;
            barCode: string;
            freeText: string;
            uoMEntry: number;
        }

        export interface DepreciationParameters {
            depreciationArea: string;
            depreciationEndDate: Date;
            depreciationStartDate: Date;
            depreciationType: string;
            fiscalYear: string;
            remainingLife: number;
            remainingUnits: number;
            standardUnits: number;
            totalUnitsInUsefulLife: number;
            usefulLife: number;
        }

        export interface DistributionRules {
            distributionRule: string;
            distributionRule2: string;
            distributionRule3: string;
            distributionRule4: string;
            distributionRule5: string;
            lineNumber: number;
            validFrom: Date;
            validTo: Date;
        }

        export interface IntrastatExtension {
            commodityCode: number;
            countryOfOrigin: string;
            exportNatureOfTransaction: number;
            exportRegionCountry: string;
            exportRegionState: number;
            exportStatisticalProcedure: number;
            factorOfSupplementaryUnit: number;
            importNatureOfTransaction: number;
            importRegionCountry: string;
            importRegionState: number;
            importStatisticalProcedure: number;
            intrastatRelevant: number;
            itemCode: string;
            serviceCode: number;
            servicePaymentMethod: number;
            serviceSupplyMethod: number;
            statisticalCode: string;
            supplementaryUnit: number;
            type: number;
            useWeightInCalculation: number;
        }

        export interface LocalizationInfos {
            incomeNature: string;
            itemCode: string;
        }

        export interface PeriodControls {
            actualUnits: number;
            depreciationArea: string;
            depreciationStatus: number;
            factor: number;
            fiscalYear: string;
            subPeriod: number;
        }

        export interface PreferredVendors {
            bpCode: string;
        }

        export interface PriceList {
            additionalCurrency1: string;
            additionalCurrency2: string;
            additionalPrice1: number;
            additionalPrice2: number;
            basePriceList: number;
            currency: string;
            factor: number;
            price: number;
            priceList: number;
            priceListName: string;
            uoMPrices: UoMPrices[];
            userFields: UserFields;
        }

        export interface UoMPrices {
            additionalCurrency1: string;
            additionalCurrency2: string;
            additionalPrice1: number;
            additionalPrice2: number;
            additionalReduceBy1: number;
            additionalReduceBy2: number;
            auto: number;
            currency: string;
            price: number;
            priceList: number;
            reduceBy: number;
            uoMEntry: number;
        }

        export interface Projects {
            lineNumber: number;
            project: string;
            validFrom: Date;
            validTo: Date;
        }

        export interface UnitOfMeasurements {
            defaultBarcode: number;
            defaultPackage: number;
            height1: number;
            height1Unit: number;
            height2: number;
            height2Unit: number;
            length1: number;
            length1Unit: number;
            length2: number;
            length2Unit: number;
            packages: Packages[];
            uoMEntry: number;
            uoMType: number;
            volume: number;
            volumeUnit: number;
            weight1: number;
            weight1Unit: number;
            weight2: number;
            weight2Unit: number;
            width1: number;
            width1Unit: number;
            width2: number;
            width2Unit: number;
        }

        export interface Packages {
            height1: number;
            height1Unit: number;
            height2: number;
            height2Unit: number;
            length1: number;
            length1Unit: number;
            length2: number;
            length2Unit: number;
            packageTypeEntry: number;
            quantityPerPackage: number;
            uoMEntry: number;
            uoMType: number;
            volume: number;
            volumeUnit: number;
            weight1: number;
            weight1Unit: number;
            weight2: number;
            weight2Unit: number;
            width1: number;
            width1Unit: number;
            width2: number;
            width2Unit: number;
        }

        export interface WhsInfo {
            committed: number;
            costAccount: string;
            costInflationAccount: string;
            costInflationOffsetAccount: string;
            counted: number;
            countedQuantity: number;
            decreasingAccount: string;
            defaultBin: number;
            defaultBinEnforced: number;
            euExpensesAccount: string;
            euPurchaseCreditAcc: string;
            euRevenuesAccount: string;
            exchangeRateDifferencesAcct: string;
            exemptIncomeAcc: string;
            exemptedCredits: string;
            expenseClearingAct: string;
            expenseOffsettingAccount: string;
            expensesAccount: string;
            foreignExpensAcc: string;
            foreignPurchaseCreditAcc: string;
            foreignRevenueAcc: string;
            glDecreaseAcct: string;
            glIncreaseAcct: string;
            goodsClearingAcct: string;
            inStock: number;
            increasingAccount: string;
            inventoryAccount: string;
            inventoryOffsetProfitAndLossAccount: string;
            itemCycleCount: ItemCycleCount;
            locked: number;
            maximalStock: number;
            minimalOrder: number;
            minimalStock: number;
            negativeInventoryAdjustmentAccount: string;
            ordered: number;
            paReturnAcct: string;
            priceDifferenceAcc: string;
            purchaseAcct: string;
            purchaseBalanceAccount: string;
            purchaseCreditAcc: string;
            purchaseOffsetAcct: string;
            returningAccount: string;
            revenuesAccount: string;
            salesCreditAcc: string;
            salesCreditEUAcc: string;
            salesCreditForeignAcc: string;
            shippedGoodsAccount: string;
            standardAveragePrice: number;
            stockInTransitAccount: string;
            stockInflationAdjustAccount: string;
            stockInflationOffsetAccount: string;
            transferAccount: string;
            userFields: UserFields;
            vatInRevenueAccount: string;
            varienceAccount: string;
            whIncomingCenvatAccount: string;
            whOutgoingCenvatAccount: string;
            warehouseCode: string;
            wasCounted: number;
            wipAccount: string;
            wipOffsetProfitAndLossAccount: string;
            wipVarianceAccount: string;
        }

        export interface ItemCycleCount {
            alert: number;
            alertTime: Date;
            cycleCode: number;
            destinationUser: number;
            nextCountingDate: Date;
            userFields: UserFields;
            warehouseCode: string;
        }

    }
}
