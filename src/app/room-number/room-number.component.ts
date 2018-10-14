import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms'; 
import { UserService } from '../service/user.service'; 
import { CommonMessageService } from '../service/common-message.service'; 

@Component({
  selector: 'app-room-number',
  templateUrl: './room-number.component.html',
  styleUrls: ['./room-number.component.scss']
})
export class RoomNumberComponent implements OnInit {

  private room: FormControl = new FormControl(); 

  @Input()
  set roomNumber(value: number){
    console.log(value); 
    this.room.setValue(value); 
  }

  @Output() status = new EventEmitter(); 

  constructor(private _user: UserService, private _message: CommonMessageService) { }

  ngOnInit() {
  }

  changeRoomNumber(){
    this._user.roomNumber(this.room.value).subscribe(
      (user) => {
        this._message.httpSuccess("Your room number is set "+ user.room_number); 
        this.status.emit('success'); 
      },
      (error) => {
        this._message.httpError(error); 
        this.status.emit('error'); 
      }
    ); 
  }
}
