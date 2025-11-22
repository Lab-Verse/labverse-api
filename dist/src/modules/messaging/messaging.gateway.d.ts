import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagingService } from './messaging.service';
import { CreateMessageDto } from './dto/create-message.dto';
export declare class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly messagingService;
    server: Server;
    constructor(messagingService: MessagingService);
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleSendMessage(client: Socket, payload: CreateMessageDto): Promise<void>;
    handleReadMessage(client: Socket, payload: {
        conversationId: string;
        userId: string;
        messageId: string;
    }): Promise<void>;
}
