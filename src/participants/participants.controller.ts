import { CacheInterceptor, Controller, Get, Logger, Param, Query, UseInterceptors } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DiretoryParticipantsDto } from './dto/diretory-participants.dto';
import { ParticipantsService } from './participants.service';


@ApiTags('Instituições Finaceiras Participantes')
@Controller("participants")
@UseInterceptors(CacheInterceptor)
export class ParticipantsController {

    private logger = new Logger(ParticipantsController.name);

    constructor(private participantsService: ParticipantsService){}

    @Get()
    @ApiResponse({
        status: 200,
        description: 'Retorna todas as instituições participantes do open banking',
        type: DiretoryParticipantsDto
    })
    @ApiQuery({
        name: 'page',
        required: false
    })
    public find(@Query('page') page:number)
    {
        this.logger.debug(`[find] - Consultando participantes - page ${page}`);

        return this.participantsService.findByPage(page || 1);
    }


    @Get("/:organizationId")
    @ApiResponse({
        status: 200,
        description: 'Retorna todas as instituições participantes do open banking',
        type: DiretoryParticipantsDto,
    })
    public findByOrganizationId(@Param('organizationId') organizationId:string)
    {
        this.logger.debug(`[findByOrganizationId] - Consultando participantes a partir do organizationId ${organizationId}`);

        return this.participantsService.findByOrganizationId(organizationId);
    }
}
