import { ApiProperty } from "@nestjs/swagger";

export class ParticipantsDto {

    @ApiProperty({ example: 'fefac57d-1d50-5615-89b2-0b2d80623a28', description: 'ID da Organização' })
    organisationId: string;

    organisationName:string;
    city: string;
    endpoints: ApiDiscoveryEndpoint[];

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
