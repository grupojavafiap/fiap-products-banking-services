import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { firstValueFrom, map } from 'rxjs';
import { CacheApp } from 'src/cache/cache-app.enum';
import { ArrayUtil } from 'src/shared/array-util';
import { ParticipantsService } from '../participants/participants.service';
import { Brand, PersonalAccount } from './dto/personal-accounts.dto';
import { Cache } from 'cache-manager';
import { PaginateService } from 'src/shared/paginate.service';

const MAX_PAGE_SIZE = 3;

@Injectable()
export class PersonalAccountsService {

    private logger = new Logger(PersonalAccountsService.name);

    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private participantsService: ParticipantsService,
        private paginateService: PaginateService,
        private http:HttpService){}

    /**
     * Método responsável por acionar as API's de cada participante e consultar
     * os produtos de conta para pessoal fisica.
     * 
     * Esse método é iniciado pelo cron a cada 15 minutos.
     * 
     */
    @Cron('*/15 * * * *')
    async updateCache()
    {
        const participants = await this.participantsService.findAllParticipants();
    
        const requests = new Array<Promise<{brand:Brand}>>();

        for(const participant of participants)
        {
            if(participant.endpoints && participant.endpoints.length)
            {
                this.logger.debug(`[updateCache] - ApiEndpoint ${participant.endpoints[0].ApiEndpoint} `);

                requests.push(firstValueFrom(
                    this.http.get(participant.endpoints[0].ApiEndpoint, {timeout: 1500})
                    .pipe(map(response => this.handlerUpdateCache(response.data.data))))
                );
            }
        }

        const responses = await Promise.allSettled(requests);

        responses.forEach(response => {
            if(response.status === 'rejected')
            {
                this.logger.warn(response.reason);
            }
        })

        const result = responses.filter(response => response.status === 'fulfilled')
                        .map(response => response['value'])

        const pages = ArrayUtil.chunkArray(result, MAX_PAGE_SIZE);
        const optionsCache = {ttl: CacheApp.TTL_DEFAULT};
                
        await this.cacheManager.set(CacheApp.PERSONAL_ACCOUNTS_FIND_PAGES_TOTAL_PAGES, pages.length, optionsCache);
        await this.cacheManager.set(CacheApp.PERSONAL_ACCOUNTS_FIND_PAGES_TOTAL_RECORDS, result.length, optionsCache);
        await this.cacheManager.set(CacheApp.PERSONAL_ACCOUNTS_FIND_ALL, result, optionsCache);
                
        for(let i = 0; i < pages.length; i++)
        {
            const dataPage = pages[i];
            if(dataPage)
            {
                await this.cacheManager.set(`${CacheApp.PERSONAL_ACCOUNTS_FIND_PAGES}:${i + 1}`, dataPage, optionsCache);
            }   
        }
        
    }

    private handlerUpdateCache(response: {brand: Brand})
    {
        if(response && response.brand &&  response.brand.companies)
        {
            response.brand.companies.forEach(company => company.personalAccounts.forEach(accounts => {
                delete accounts.serviceBundles;
                delete accounts.openingClosingChannels;
                delete accounts.additionalInfo;
                delete accounts.termsConditions;
            }))
        }

        return response;
    }


    async findByPage(page:number)
    {
        const personalAccounts = await this.cacheManager.get<Array<Brand>>(`${CacheApp.PERSONAL_ACCOUNTS_FIND_PAGES}:${page}`);
        
        const totalRecords = await  this.cacheManager.get<number>(`${CacheApp.PERSONAL_ACCOUNTS_FIND_PAGES_TOTAL_RECORDS}`);

        return this.paginateService.createResponse("/personal-accounts", personalAccounts, page, MAX_PAGE_SIZE, totalRecords);
    }



    async findByCnpj(cnpjNumber:string)
    {
        const accountsByBrand = await this.cacheManager.get<Array<{brand: Brand}>>(CacheApp.PERSONAL_ACCOUNTS_FIND_ALL);
        
        return accountsByBrand.filter(accounts => accounts.brand.companies.some(company => company.cnpjNumber == cnpjNumber));
    }


    async findByCnpjAndType(cnpjNumber:string, accountType:string)
    {
        const accountByCnpj =  await this.findByCnpj(cnpjNumber);

        if(accountByCnpj && accountByCnpj.length)
        {
            const companyAccounts = new Array<PersonalAccount>();

            accountByCnpj.forEach(account =>
                {
                    if(account && account.brand && account.brand.companies)
                    {
                        account.brand.companies.forEach(company => 
                        {
                            const matchAccount = company.personalAccounts.find(account => account.type == accountType)
        
                            companyAccounts.push(matchAccount);
                        })
                    }
                }
            );

            return {
                name: accountByCnpj[0].brand.name,
                cnpjNumber: cnpjNumber,
                accounts: companyAccounts
            }
        }
        return [];
    }


    
    async findAllType()
    {
        const accountsByBrand = await this.cacheManager.get<Array<{brand: Brand}>>(CacheApp.PERSONAL_ACCOUNTS_FIND_ALL);

        const types = new Set<string>();

        accountsByBrand.forEach(accounts => accounts.brand.companies
                       .forEach(company => company.personalAccounts.forEach(account => {

                        types.add(account.type);
        })))

        return Array.from(types);
    }

}
