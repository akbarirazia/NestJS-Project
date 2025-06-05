// src/messages/messages.service.ts
import { Injectable } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { v4 as uuidv4 } from 'uuid';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class MessagesService {
  private messages: Message[] = [];

  createMessage(
    senderId: string,
    createMessageDto: CreateMessageDto,
  ): MessageDto {
    const message: Message = {
      id: uuidv4(),
      senderId,
      receiverId: createMessageDto.receiverId,
      content: createMessageDto.content,
      createdAt: new Date(),
    };

    this.messages.push(message);
    return message;
  }

  getUserMessages(userId: string): MessageDto[] {
    return this.messages.filter(
      (message) => message.senderId === userId || message.receiverId === userId,
    );
  }
}
