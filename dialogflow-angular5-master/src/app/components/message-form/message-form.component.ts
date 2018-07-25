import { Component, OnInit, Input } from '@angular/core';
import { Message } from '@app/models';
import { DialogflowService, FoodmenuService } from '@app/services';

@Component({
  selector: 'message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss']
})
export class MessageFormComponent implements OnInit {

  @Input('message')
  private message : Message;

  @Input('messages')
  private messages : Message[];

  constructor(private dialogFlowService: DialogflowService, private foodMenuService: FoodmenuService) { }

  ngOnInit() {
  }

  public sendMessage(): void {
      this.message.timestamp = new Date();
      this.messages.push(this.message);

      this.dialogFlowService.getResponse(this.message.content)
        .flatMap((response) => {


          console.log(response.result.parameters);

          let result = 'default response';
          result = this.foodMenuService.getMenuForDay(response.result.parameters.day, response.result.parameters.menutype);

          if(response.result.parameters.menutype != null)
          {
            console.log("response.result.parameters.menutype is", response.result.parameters.menutype);
          }

          if(response.result.parameters.day == null || response.result.parameters.day == "")
          {
            console.log("day is empty -> check follow up context", response.result.contexts[0]);
            result = this.foodMenuService.getMenuForDay(response.result.contexts[0].parameters.day, response.result.parameters.menutype);
          }

           console.log(response.result.contexts);

          return result;
      }).subscribe((message) => {

        this.messages.push(
          new Message(this.formatList(message), 'assets/images/bot.png', new Date())
        );
      })

      this.message = new Message('', 'assets/images/user.png');
  }

  private formatList(objs: any) {
    let result = '';

    result += '<ul>';
    for (const obj of objs) {
      result += '<li>' + obj.title + ' (' + obj.price + ')</li>';
    }
    result += '</ul';
    return result;

  }


}
