import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageDto } from './dto/message.dto';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/gaurds/jwt-auth.guard';

@ApiTags('messages')
@ApiBearerAuth()
@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBody({ type: CreateMessageDto })
  @ApiResponse({ status: 201, type: MessageDto })
  create(
    @Request() req,
    @Body() createMessageDto: CreateMessageDto,
  ): MessageDto {
    return this.messagesService.createMessage(
      req.user.userId,
      createMessageDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiResponse({ status: 200, type: [MessageDto] })
  findAll(@Request() req): MessageDto[] {
    return this.messagesService.getUserMessages(req.user.userId);
  }
}
