import { AbstractControl } from '@angular/forms'; 
import { UserService } from '../service/user.service'; 
import { HttpClient } from '@angular/common/http';


export function confirmValidator(control: AbstractControl){
    if(control.value !== '' && (control.value !== null || control.value !== undefined)){
        let password = control.root.get('new_password'); 
        if(control.value != password.value){
            return {confimation: true}; 
        };
    }
    return null;    
}
