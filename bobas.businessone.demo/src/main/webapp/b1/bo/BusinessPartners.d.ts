/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace sap {
    export namespace b1 {
        export interface IBusinessPartners {
            acceptsEndorsedChecks: number;
            accountRecivablePayables: IBPAccountReceivablePayble[];
            accrualCriteria: number;
            additionalID: string;
            address: string;
            addresses: IBPAddresses[];
            affiliate: number;
            agentCode: string;
            aliasName: string;
            attachmentEntry: number;
            automaticPosting: number;
            avarageLate: number;
            bpBankAccounts: IBPBankAccounts[];
            bpBlockSendingMarketingContents: IBPBlockSendingMarketingContents[];
            bpBranchAssignment: IBPBranchAssignment[];
            bpPaymentDates: IBPPaymentDates[];
            bpPaymentMethods: IBPPaymentMethods[];
            bpWithholdingTax: IBPWithholdingTax[];
            backOrder: number;
            bankChargesAllocationCode: string;
            bankCountry: string;
            billToBuildingFloorRoom: string;
            billToState: string;
            billofExchangeonCollection: string;
            billtoDefault: string;
            block: string;
            blockDunning: number;
            blockSendingMarketingContent: number;
            bookkeepingCertified: number;
            box1099: string;
            businessType: string;
            campaignNumber: number;
            cardCode: string;
            cardForeignName: string;
            cardName: string;
            cardType: number;
            cellular: string;
            certificateNumber: string;
            channelBP: string;
            city: string;
            closingDateProcedureNumber: number;
            collectionAuthorization: number;
            commissionGroupCode: number;
            commissionPercent: number;
            companyPrivate: number;
            companyRegistrationNumber: string;
            contactEmployees: IContactEmployees[];
            contactPerson: string;
            country: string;
            county: string;
            creditCardCode: number;
            creditCardExpiration: Date;
            creditCardNum: string;
            creditLimit: number;
            currency: string;
            currentAccountBalance: number;
            customerBillofExchangDisc: string;
            customerBillofExchangPres: string;
            dme: string;
            datevAccount: number;
            datevFirstDataEntry: number;
            debitorAccount: string;
            deductibleAtSource: number;
            deductionOffice: string;
            deductionPercent: number;
            deductionValidUntil: Date;
            defaultAccount: string;
            defaultBankCode: string;
            defaultBlanketAgreementNumber: number;
            defaultBranch: string;
            defaultTechnician: number;
            deferredTax: number;
            discountBaseObject: number;
            discountGroups: IDiscountGroups[];
            discountPercent: number;
            discountRelations: number;
            downPaymentClearAct: string;
            downPaymentInterimAccount: string;
            dunningDate: Date;
            dunningLevel: number;
            dunningTerm: string;
            eCommerceMerchantID: string;
            ediRecipientID: string;
            ediSenderID: string;
            eDocBuildingNumber: number;
            eDocCity: string;
            eDocCountry: string;
            eDocDistrict: string;
            eDocGenerationType: number;
            eDocPECAddress: string;
            eDocRepresentativeAdditionalId: string;
            eDocRepresentativeCompany: string;
            eDocRepresentativeFirstName: string;
            eDocRepresentativeFiscalCode: string;
            eDocRepresentativeSurname: string;
            eDocStreet: string;
            eDocStreetNumber: string;
            eDocZipCode: string;
            eTaxWebSite: number;
            effectiveDiscount: number;
            emailAddress: string;
            endorsableChecksFromBP: number;
            equalization: number;
            exemptNum: string;
            exemptionMaxAmountValidationType: number;
            exemptionValidityDateFrom: Date;
            exemptionValidityDateTo: Date;
            expirationDate: Date;
            exportCode: string;
            fatherCard: string;
            fatherType: number;
            fax: string;
            federalTaxID: string;
            feeAccount: string;
            fiscalTaxID: IBPFiscalTaxID[];
            formCode1099: number;
            freeText: string;
            frozen: number;
            frozenFrom: Date;
            frozenRemarks: string;
            frozenTo: Date;
            gtsBankAccountNo: string;
            gtsBillingAddrTel: string;
            gtsRegNo: string;
            globalLocationNumber: string;
            groupCode: number;
            hierarchicalDeduction: number;
            houseBank: string;
            houseBankAccount: string;
            houseBankBranch: string;
            houseBankCountry: string;
            houseBankIBAN: string;
            iban: string;
            ipaCodeForPA: string;
            isrBillerID: string;
            indicator: string;
            industry: number;
            industryType: string;
            instructionKey: string;
            insuranceOperation347: number;
            interestAccount: string;
            intrastatExtension: IBPIntrastatExtension;
            intrestRatePercent: number;
            languageCode: number;
            lastMultiReconciliationNum: number;
            linkedBusinessPartner: string;
            mailAddress: string;
            mailCity: string;
            mailCountry: string;
            mailCounty: string;
            mailZipCode: string;
            maxAmountOfExemption: number;
            maxCommitment: number;
            minIntrest: number;
            nationalInsuranceNum: string;
            noDiscounts: number;
            notes: string;
            openDeliveryNotesBalance: number;
            openOpportunities: number;
            openOrdersBalance: number;
            operationCode347: number;
            otherReceivablePayable: string;
            ownerCode: number;
            ownerIDNumber: string;
            pager: string;
            partialDelivery: number;
            password: string;
            payTermsGrpCode: number;
            paymentBlock: number;
            paymentBlockDescription: number;
            peymentMethodCode: string;
            phone1: string;
            phone2: string;
            picture: string;
            planningGroup: string;
            priceListNum: number;
            priority: number;
            profession: string;
            projectCode: string;
            rateDiffAccount: string;
            referenceDetails: string;
            relationshipCode: string;
            relationshipDateFrom: Date;
            relationshipDateTill: Date;
            representativeName: string;
            residenNumber: number;
            salesPersonCode: number;
            series: number;
            shaamGroup: number;
            shipToBuildingFloorRoom: string;
            shipToDefault: string;
            shippingType: number;
            singlePayment: number;
            subjectToWithholdingTax: number;
            surchargeOverlook: number;
            taxExemptionLetterNum: string;
            taxRoundingRule: number;
            territory: number;
            thresholdOverlook: number;
            typeOfOperation: number;
            typeReport: number;
            unifiedFederalTaxID: string;
            unpaidBillofExchange: string;
            updateDate: Date;
            updateTime: Date;
            userFields: IUserFields;
            vatRegistrationNumber: string;
            valid: number;
            validFrom: Date;
            validRemarks: string;
            validTo: Date;
            vatGroup: string;
            vatGroupLatinAmerica: string;
            vatIDNum: string;
            vatLiable: number;
            verificationNumber: string;
            wtCode: string;
            website: string;
            withholdingTaxCertified: number;
            withholdingTaxDeductionGroup: number;
            zipCode: string;
        }


        export interface IBPAccountReceivablePayble {
            accountCode: string;
            accountType: number;
            bpCode: string;
        }

        export interface IBPAddresses {
            addressName: string;
            addressName2: string;
            addressName3: string;
            addressType: number;
            bpCode: string;
            block: string;
            buildingFloorRoom: string;
            city: string;
            country: string;
            county: string;
            federalTaxID: string;
            gstin: string;
            globalLocationNumber: string;
            gstType: number;
            nationality: string;
            rowNum: number;
            state: string;
            street: string;
            streetNo: string;
            taxCode: string;
            taxOffice: string;
            typeOfAddress: string;
            userFields: IUserFields;
            zipCode: string;
        }

        export interface IBPBankAccounts {
            abaRoutingNumber: string;
            accountName: string;
            accountNo: string;
            bicSwiftCode: string;
            bik: string;
            bpCode: string;
            bankCode: string;
            block: string;
            branch: string;
            buildingFloorRoom: string;
            city: string;
            controlKey: string;
            correspondentAccount: string;
            country: string;
            county: string;
            customerIdNumber: string;
            fax: string;
            iban: string;
            isrBillerID: string;
            isrType: number;
            internalKey: number;
            logInstance: number;
            mandateExpDate: Date;
            mandateID: string;
            phone: string;
            sepaSeqType: number;
            signatureDate: Date;
            state: string;
            street: string;
            userFields: IUserFields;
            userNo1: string;
            userNo2: string;
            userNo3: string;
            userNo4: string;
            zipCode: string;
        }

        export interface IBPBlockSendingMarketingContents {
            cardCode: string;
            choose: number;
            communicationMediaId: number;
        }

        export interface IBPBranchAssignment {
            bpCode: string;
            bplid: number;
        }

        export interface IBPPaymentDates {
            bpCode: string;
            paymentDate: string;
            userFields: IUserFields;
        }

        export interface IBPPaymentMethods {
            bpCode: string;
            paymentMethodCode: string;
            rowNumber: number;
            userFields: IUserFields;
        }

        export interface IBPWithholdingTax {
            bpCode: string;
            userFields: IUserFields;
            wtCode: string;
        }

        export interface IContactEmployees {
            active: number;
            address: string;
            blockSendingMarketingContent: number;
            cardCode: string;
            cityOfBirth: string;
            contactEmployeeBlockSendingMarketingContents: IContactEmployeeBlockSendingMarketingContents[];
            dateOfBirth: Date;
            e_Mail: string;
            emailGroupCode: string;
            fax: string;
            firstName: string;
            gender: number;
            internalCode: number;
            lastName: string;
            middleName: string;
            mobilePhone: string;
            name: string;
            pager: string;
            password: string;
            phone1: string;
            phone2: string;
            placeOfBirth: string;
            position: string;
            profession: string;
            remarks1: string;
            remarks2: string;
            title: string;
            userFields: IUserFields;
        }

        export interface IContactEmployeeBlockSendingMarketingContents {
            choose: number;
            communicationMediaId: number;
            contactEmployeeAbsEntry: number;
        }

        export interface IDiscountGroups {
            bpCode: string;
            baseObjectType: number;
            discountPercentage: number;
            objectEntry: string;
        }

        export interface IBPFiscalTaxID {
            addrType: number;
            address: string;
            bpCode: string;
            cnaeCode: number;
            taxId0: string;
            taxId1: string;
            taxId10: string;
            taxId11: string;
            taxId12: string;
            taxId13: string;
            taxId2: string;
            taxId3: string;
            taxId4: string;
            taxId5: string;
            taxId6: string;
            taxId7: string;
            taxId8: string;
            taxId9: string;
            userFields: IUserFields;
        }

        export interface IBPIntrastatExtension {
            cardCode: string;
            customsProcedure: number;
            domesticOrForeignID: string;
            incoterms: number;
            intrastatRelevant: number;
            natureOfTransactions: number;
            portOfEntryOrExit: number;
            statisticalProcedure: number;
            transportMode: number;
        }

    }
}