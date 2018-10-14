import { Injectable } from '@angular/core';

declare var M; 
@Injectable({
  providedIn: 'root'
})
export class CommonMessageService {

  constructor() { }
  httpError(error){
    let message = ''; 

    if(error.status == 0) message = "Error: Please check your connection!"; 
    else if(error.status == 406) message = "Error: " + error.message; 
    else if(error.status == 500 ) message = "Error: we have got some problem please try again letter"; 
    else message = "Some error occured"; 
    
    M.toast({
      classes: 'red white-text', 
      html: '<strong>'+ message +'</strong>'
    })
  }
  
  httpSuccess(message = "made the request"){
    M.toast({
      classes: 'green white-text', 
      // @ts-ignore
      html: "<strong>You have succefully "+ message +" </b></strong>"
    }) 
  }
}
