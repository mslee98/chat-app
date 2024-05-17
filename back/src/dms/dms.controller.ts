import { Controller, Get, Param, Query } from '@nestjs/common';
import { DmsService } from './dms.service';

@Controller('api/dm')
export class DmsController {
    constructor(
        private dmsService: DmsService
    ) {}

    @Get(':id/chats')
    getChat(@Query() query, @Param() param) {
        console.log("ss");
    }


}
