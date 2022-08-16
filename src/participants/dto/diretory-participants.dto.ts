import { ApiProperty } from "@nestjs/swagger";

export class DiretoryParticipantsDto {

    @ApiProperty({ example: 'fefac57d-1d50-5615-89b2-0b2d80623a28', description: 'ID da Organização' })
    OrganisationId: string;

    @ApiProperty({ example: 'Active', description: 'Status do participante' })
    Status: string;

    @ApiProperty({ example: 'Banco do Brasil', description: 'Nome da organização participante' })
    OrganisationName: string;

    
    CreatedOn: Date;
    LegalEntityName: string;
    CountryOfRegistration: string;
    CompanyRegister: string;

    @ApiProperty({ example: 'Active', description: 'ID da Organização', required: false })
    Tag?: any;
    Size?: any;
    RegistrationNumber: string;
    RegistrationId: string;
    RegisteredName: string;
    AddressLine1: string;
    AddressLine2: string;
    City: string;
    Postcode: string;
    Country: string;
    ParentOrganisationReference: string;
    AuthorisationServers: AuthorisationServer[];
    OrgDomainClaims: OrgDomainClaim[];
    OrgDomainRoleClaims: OrgDomainRoleClaim[];
}


export interface ApiDiscoveryEndpoint {
    ApiDiscoveryId: string;
    ApiEndpoint: string;
}

export interface ApiResource {
    ApiResourceId: string;
    ApiVersion: string;
    ApiDiscoveryEndpoints: ApiDiscoveryEndpoint[];
    FamilyComplete: boolean;
    ApiCertificationUri?: any;
    CertificationStatus?: any;
    CertificationStartDate?: any;
    CertificationExpirationDate?: any;
    ApiFamilyType: string;
}

export interface AuthorisationServer {
    AuthorisationServerId: string;
    AutoRegistrationSupported: boolean;
    AutoRegistrationNotificationWebhook?: any;
    SupportsCiba: boolean;
    SupportsDCR: boolean;
    ApiResources: ApiResource[];
    AuthorisationServerCertifications: any[];
    CustomerFriendlyDescription: string;
    CustomerFriendlyLogoUri: string;
    CustomerFriendlyName: string;
    DeveloperPortalUri: string;
    TermsOfServiceUri: string;
    NotificationWebhookAddedDate?: any;
    OpenIDDiscoveryDocument: string;
    Issuer?: any;
    PayloadSigningCertLocationUri: string;
    ParentAuthorisationServerId?: any;
}

export interface OrgDomainClaim {
    AuthorisationDomainName: string;
    AuthorityName: string;
    RegistrationId: string;
    Status: string;
}

export interface OrgDomainRoleClaim {
    Status: string;
    AuthorisationDomain: string;
    Role: string;
    Authorisations: any[];
    RegistrationId: string;
}


