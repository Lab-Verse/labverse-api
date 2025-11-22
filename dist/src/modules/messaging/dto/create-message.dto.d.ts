export declare enum MessageType {
    TEXT = "text",
    IMAGE = "image",
    FILE = "file"
}
export declare class CreateMessageDto {
    conversationId: string;
    senderId: string;
    content: string;
    messageType?: MessageType;
}
