import { Component } from '@angular/core';
import { SocketIoService } from './share/services/socketio/socket-io.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chatSupporter';
}
