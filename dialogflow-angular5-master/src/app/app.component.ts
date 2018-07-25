import { Component } from '@angular/core';
import { Message } from '@app/models';
import { Http } from '../../node_modules/@angular/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public message : Message;
  public messages : Message[];


  constructor(private http: Http){
    this.message = new Message('', 'assets/images/user.png');
    this.messages = [
      new Message('Welcome to chatbot universe', 'assets/images/bot.png', new Date())
    ];

    // this.http.get('assets/menu_plan.json').map((response) => {
    //   return JSON.parse(response['_body']);
    // }).subscribe(json => {
    //   console.log(json);
    // });
  }
}
