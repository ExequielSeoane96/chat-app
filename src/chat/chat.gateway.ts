import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  // Cuando un cliente se conecta
  handleConnection(client: Socket) {
    console.log(`Cliente conectado: ${client.id}`);
  }

  // Un evento para unirse a una sala
  @SubscribeMessage('joinRoom')
  handleJoinRoom(@MessageBody() data: { roomId: string }, @ConnectedSocket() client: Socket) {
    client.join(data.roomId);
    client.emit('joinedRoom', { roomId: data.roomId });
  }

  // Evento para enviar mensajes
  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @MessageBody() data: { roomId: string; senderId: string; content: string },
    @ConnectedSocket() client: Socket,
  ) {
    // Guarda el mensaje en la base de datos
    await this.chatService.saveMessage(data);
    // Emite el mensaje a la sala correspondiente
    this.server.to(data.roomId).emit('newMessage', data);
  }
}
