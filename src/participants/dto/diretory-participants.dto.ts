import { ApiProperty } from "@nestjs/swagger";

export class DiretoryParticipantsDto {

    @ApiProperty({ example: 'fefac57d-1d50-5615-89b2-0b2d80623a28', description: 'ID da Organização' })
    OrganisationId: string;

    @ApiProperty({ example: 'Active', description: 'Status do participante' })
    Status: string;

    @ApiProperty({ example: 'Banco do Brasil', description: 'Nome da organização participante' })
    OrganisationName: string;

    @ApiProperty({ example: '2021-01-11T17:11:30.743Z', description: 'Data da criação do registro' })
    CreatedOn: Date;

    @ApiProperty({ example: 'COOPERATIVA DE CRÉDITO RURAL DE OURO   SULCREDI/OURO', description: 'Nome da Instituição' })
    LegalEntityName: string;

    @ApiProperty({ example: 'BR', description: 'Pais' })
    CountryOfRegistration: string;

    @ApiProperty({ example: 'Cadastro Nacional da Pessoa Jurídica', description: 'CNPJ' })
    CompanyRegister: string;

    @ApiProperty({ example: 'Tag', description: 'Tag', required: false })
    Tag?: any;

    @ApiProperty({ example: 'Size', description: 'Size', required: false })
    Size?: any;

    @ApiProperty({ example: '07853842000135' })
    RegistrationNumber: string;

    @ApiProperty({ example: '07853842' })
    RegistrationId: string;

    @ApiProperty({ example: 'COOPERATIVA DE CRÉDITO RURAL DE OURO   SULCREDI/OURO' })
    RegisteredName: string;

    @ApiProperty({ example: 'Rua Felipe Schmidt 1882' })
    AddressLine1: string;

    @ApiProperty({ example: 'Rua Felipe Schmidt 1882' })
    AddressLine2: string;

    @ApiProperty({ example: 'Ouro, SC' })
    City: string;

    @ApiProperty({ example: '89663-000' })
    Postcode: string;
    
    @ApiProperty({ example: 'BR' })
    Country: string;

    @ApiProperty({ example: '' })
    ParentOrganisationReference: string;

    @ApiProperty({ example: '' })
    AuthorisationServers: AuthorisationServer[];

    OrgDomainClaims: OrgDomainClaim[];
    
    OrgDomainRoleClaims: OrgDomainRoleClaim[];
}


export class ApiDiscoveryEndpoint {
    @ApiProperty({ example: '' })
    ApiDiscoveryId: string;

    @ApiProperty({ example: 'https://api.sulcrediouro.com.br/open-banking/channels/v1/branches' })
    ApiEndpoint: string;
}

export class ApiResource {
    @ApiProperty({ example: '1c506bea-ed19-4289-81b7-f00ab48d8a1d' })
    ApiResourceId: string;

    @ApiProperty({ example: '1' })
    ApiVersion: string;

    ApiDiscoveryEndpoints: ApiDiscoveryEndpoint[];

    @ApiProperty({ example: 'true' })
    FamilyComplete: boolean;
    
    @ApiProperty({ example: '' })
    ApiCertificationUri?: any;

    @ApiProperty({ example: '' })
    CertificationStatus?: any;

    @ApiProperty({ example: '' })
    CertificationStartDate?: any;

    @ApiProperty({ example: '' })
    CertificationExpirationDate?: any;

    @ApiProperty({ example: '' })
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


