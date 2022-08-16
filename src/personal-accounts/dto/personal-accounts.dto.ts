import { ApiProperty } from "@nestjs/swagger";

export class Brand {
    @ApiProperty()
    name: string;

    @ApiProperty()
    companies: Company[];
}

export interface Customers {
    rate: string;
}

export interface Price {
    interval: string;
    value: string;
    currency: string;
    customers: Customers;
}

export interface Minimum {
    value: string;
    currency: string;
}

export interface Maximum {
    value: string;
    currency: string;
}

export interface PriorityService {
    name: string;
    code: string;
    chargingTriggerInfo: string;
    prices: Price[];
    minimum: Minimum;
    maximum: Maximum;
}

export interface Customers2 {
    rate: string;
}

export interface Price2 {
    interval: string;
    value: string;
    currency: string;
    customers: Customers2;
}

export interface Minimum2 {
    value: string;
    currency: string;
}

export interface Maximum2 {
    value: string;
    currency: string;
}

export interface OtherService {
    name: string;
    code: string;
    chargingTriggerInfo: string;
    prices: Price2[];
    minimum: Minimum2;
    maximum: Maximum2;
}

export interface Fees {
    priorityServices: PriorityService[];
    otherServices: OtherService[];
}

export interface Service {
    code: string;
    chargingTriggerInfo: string;
    eventLimitQuantity: string;
    freeEventQuantity: string;
}

export interface Customers3 {
    rate: string;
}

export interface Price3 {
    interval: string;
    monthlyFee: string;
    currency: string;
    customers: Customers3;
}

export interface Minimum3 {
    value: string;
    currency: string;
}

export interface Maximum3 {
    value: string;
    currency: string;
}

export interface ServiceBundle {
    name: string;
    services: Service[];
    prices: Price3[];
    minimum: Minimum3;
    maximum: Maximum3;
}

export interface MinimumBalance {
    value: string;
    currency: string;
}

export interface TermsConditions {
    minimumBalance: MinimumBalance;
    elegibilityCriteriaInfo: string;
    closingProcessInfo: string;
}

export interface IncomeRate {
}

export interface PersonalAccount {
    type: string;
    fees: Fees;
    serviceBundles: ServiceBundle[];
    openingClosingChannels: string[];
    additionalInfo: string;
    transactionMethods: string[];
    termsConditions: TermsConditions;
    incomeRate: IncomeRate;
}

export interface Company {
    cnpjNumber: string;
    name: string;
    personalAccounts: PersonalAccount[];
}





