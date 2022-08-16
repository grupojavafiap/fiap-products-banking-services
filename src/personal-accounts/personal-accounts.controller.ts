/*
https://docs.nestjs.com/controllers#controllers
*/

import { CacheInterceptor, Controller, Get, Logger, Param, Query, UseInterceptors } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Brand } from './dto/personal-accounts.dto';
import { PersonalAccountsService } from './personal-accounts.service';

@ApiTags('Contas para Pessoa Fisica')
@Controller("personal-accounts")
@UseInterceptors(CacheInterceptor)
export class PersonalAccountsController {

    private logger = new Logger(PersonalAccountsController.name);

    constructor(private personalAccountsService: PersonalAccountsService){}

    @Get()
    @ApiResponse({
        status: 200,
        description: 'Retorna os produtos de conta para pessoa fisica de cada instituição financeira participante do open banking.',
        type: Brand
    })
    @ApiQuery({
        name: 'page',
        required: false
    })
    public findByPage(@Query('page') page:number)
    {
        this.logger.debug(`[findByPage] - Consultando contas para pessoal fisica page - ${page}... `);

        return this.personalAccountsService.findByPage(page || 1)
    }

    
    @Get("/types")
    @ApiResponse({
        status: 200,
        description: 'Retorna todos os tipos de conta disponiveis.',
        type: Brand
    })
    public findAllTypes()
    {
        this.logger.debug(`[findAllTypes] - Todos os tipos de conta`);

        return this.personalAccountsService.findAllType();
    }
    

    @Get("/:cnpjNumber")
    @ApiResponse({
        status: 200,
        description: 'Retorna todas as instituições participantes do open banking',
        type: Brand
    })
    @ApiParam({
        name: 'cnpjNumber',
        required: true,
        example: '92702067000196',
        description: 'CNPJ do participante'
    })
    public findByCnpj(@Param('cnpjNumber') cnpjNumber:string)
    {
        this.logger.debug(`[findByCnpj] - Consultando por CPNJ - ${cnpjNumber}`);

        return this.personalAccountsService.findByCnpj(cnpjNumber)
    }

    
    @Get("/:cnpjNumber/types/:accountType")
    @ApiResponse({
        status: 200,
        description: 'Retorna as informações do tipo de conta para a instituição pertencente ao CNPJ passado.',
        type: Brand
    })
    @ApiParam({
        name: 'cnpjNumber',
        required: true,
        example: '10573521000191',
        description: 'CNPJ do participante'
    })
    @ApiParam({
        name: 'accountType',
        required: true,
        example: 'CONTA_PAGAMENTO_PRE_PAGA',
        description: 'Tipos de conta'
    })
    public findByCnpjAndType(@Param('cnpjNumber') cnpjNumber:string, @Param('accountType') type:string)
    {
        this.logger.debug(`[findByType] - Consultando por CPNJ - ${cnpjNumber} - ACCOUNT_TYPE ${type}`);

        return this.personalAccountsService.findByCnpjAndType(cnpjNumber, type)
    }

}
