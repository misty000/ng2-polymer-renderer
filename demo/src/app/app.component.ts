import {Component} from '@angular/core';

declare var Polymer

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular2 Polymer DomRenderer!';
  prefix = '¥'

  registrations = Polymer.telemetry.registrations

  togglePrefix() {
    this.prefix = (this.prefix == '¥') ? '$' : '¥'
  }
}
