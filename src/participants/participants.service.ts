import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';

import { Cron } from '@nestjs/schedule';
import { firstValueFrom, map } from 'rxjs';
import { CacheApp } from 'src/cache/cache-app.enum';
import { ApiDiscoveryEndpoint, ApiResource, AuthorisationServer, DiretoryParticipantsDto } from './dto/diretory-participants.dto';
import { ParticipantsDto } from './dto/participants.dto';
import { PaginateService } from '../shared/paginate.service';
import { ArrayUtil } from '../shared/array-util';

const MAX_PAGE_SIZE = 5;

@Injectable()
export class ParticipantsService { 

    private logger = new Logger(ParticipantsService.name);

    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private config:ConfigService,
        private http:HttpService,
        private paginateService: PaginateService
        ){} 


    /**
     * Método responsável por acionar a API de participantes e armazenar em cache o 
     * resultado da consulta. 
     * 
     * Esse método é iniciado pelo cron a cada 15 minutos.
     * 
     */
    @Cron('*/15 * * * *')
    async updateCache() 
    {
        const urlDiretoryParticipants =  this.config.get('URL_DIRETORY_PARTICIPANTS');

        this.logger.debug(`[updateCache] - Consultando informações dos participantes ${urlDiretoryParticipants}`);
        
        const result = await firstValueFrom(this.http.get(urlDiretoryParticipants)
                .pipe(map(response => this.handlerFindAll(response.data))));
        
        const pages = ArrayUtil.chunkArray(result, MAX_PAGE_SIZE);

        const optionsCache = {ttl: CacheApp.TTL_DEFAULT};

        await this.cacheManager.set(CacheApp.DIRETORY_PARTICIPANTS_FIND_PAGES_TOTAL_PAGES, pages.length, optionsCache);
        await this.cacheManager.set(CacheApp.DIRETORY_PARTICIPANTS_FIND_PAGES_TOTAL_RECORDS, result.length, optionsCache);
        await this.cacheManager.set(CacheApp.DIRETORY_PARTICIPANTS_FIND_ALL, result, optionsCache);

        for(let i = 0; i < pages.length; i++)
        {
            const dataPage = pages[i];
            if(dataPage)
            {
                await this.cacheManager.set(`${CacheApp.DIRETORY_PARTICIPANTS_FIND_PAGES}:${i + 1}`, dataPage, optionsCache);
            }   
        }

        this.logger.log(`[updateCache] - Cache atualizado com sucesso!! QUANTIDADE DE REGISTROS ${result.length}`);
    }


    private handlerFindAll(participants: Array<DiretoryParticipantsDto>) : Array<ParticipantsDto>
    {
        if(participants && participants.length)
        {
            const result =  participants.map(participant => {
                return {
                    organisationId: participant.OrganisationId,
                    organisationName: participant.OrganisationName,
                    city: participant.City,
                    endpoints: this.filterEndpointPersonalAccounts(participant.AuthorisationServers)  
            }});

            return result.filter(r => r.endpoints && r.endpoints.length);
        }
    }

    private filterEndpointPersonalAccounts(authorisationServers: AuthorisationServer[])
    {
        const patternEndpoint = this.config.get('PATTERN_ENDPOINT', 'products-services/v1/personal-accounts');

        const familyType = this.config.get('API_FAMILY_TYPE', 'products-services');

        let resources = new Array<ApiResource>();
        let endpoints = new Array<ApiDiscoveryEndpoint>();

        authorisationServers.filter(authorisation =>
        {
            resources = authorisation
                        .ApiResources
                        .filter(resources => resources.ApiFamilyType == familyType);
        })

        resources.filter(resource => {
            endpoints =  resource.ApiDiscoveryEndpoints.filter(endpoint => endpoint.ApiEndpoint.includes(patternEndpoint));
        })
        
        return endpoints;
    }

    /**
     * Consulta as informações de um participante a partir do organizationId;
     * 
     * @param organizationID 
     * @returns 
     */
    async findByOrganizationId(organizationID:string): Promise<ParticipantsDto>
    {
        const participantes = await this.findAllParticipants();

        return participantes.find(participant => participant.organisationId === organizationID);
    }  
    
    findAllParticipants(): Promise<Array<ParticipantsDto>>
    {
        return this.cacheManager.get(CacheApp.DIRETORY_PARTICIPANTS_FIND_ALL);
    }



    async findByPage(page:number)
    {
        const participants = await this.cacheManager.get<Array<ParticipantsDto>>(`${CacheApp.DIRETORY_PARTICIPANTS_FIND_PAGES}:${page}`);

        const totalRecords = await  this.cacheManager.get<number>(`${CacheApp.DIRETORY_PARTICIPANTS_FIND_PAGES_TOTAL_RECORDS}`);

        return this.paginateService.createResponse("/participants", participants, page, MAX_PAGE_SIZE, totalRecords);
    }
}

