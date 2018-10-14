import { Component, OnInit, ViewChild } from '@angular/core' ;
import { FormGroup, FormBuilder , FormControl,Validators} from '@angular/forms';
import { MatPaginator, MatSort } from '@angular/material' ;
import { UserTableDataSource } from './user-table-datasource' ;
import { UserService } from '../service/user.service' ; 
import { MatDialog } from '@angular/material' ; 
import { RegisterationFormComponent } from '../registeration-form/registeration-form.component' ; 
import { RoleService } from '../service/role.service' ; 
import { ContextMenuComponent } from '../context-menu/context-menu.component' ; 
import { UserProfileModalComponent } from '../user-profile-modal/user-profile-modal.component' ;
import { AlertComponent } from '../alert/alert.component' ; 
import { User } from '../model/User' ; 
import * as S from 'string';


@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})

export class UserTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator ;
  @ViewChild(MatSort) sort: MatSort ;
  dataSource: UserTableDataSource ;

  searchForm: FormGroup;
  contextMenu = ContextMenuComponent ; 
  message = {
    isThere: false, 
    class: '',
    text: '',
  };

  menuItems = [
    {icon: 'edit', text: 'Edit'},
    {icon: 'visibility', text: 'View profile'},
    {icon: 'delete', text: 'Remove user'},
  ] ;

  displayedColumns = ["profile_pic",'worker_id', 'name', 'role' /*, 'gender' , 'email' , 'phone'*/] ;
  public roles ; 
  public users: User[] ;

  constructor(
    public modal: MatDialog, 
    public _roles: RoleService, 
    public _user: UserService,
    public _formBuilder: FormBuilder){}
  ngOnInit() {
    this.dataSource = new UserTableDataSource(this.paginator, this.sort, []) ;

    this._user.getUsers().subscribe(
      data => {
        this.users = data ;
        this.dataSource = new UserTableDataSource(this.paginator, this.sort, data) ;
      }
    ) ;
    this._roles.getRoles().subscribe(
      result => {
        this.roles = result ; 
      }
    )

    this.searchForm = this._formBuilder.group(
      { 
        search: '',
        role: '' 
      }
    );
    this.searchForm.valueChanges.subscribe(
      key=>{
        let filtered;

        if(key.role == '')
          filtered = this.search(key.search); 
        else
          filtered = this.search(key.search).filter((v,i,a)=>{return v.role_id == key.role});

        if(filtered.length == 0){
          this.message = { isThere: true, class: "danger-text",text: "No results found" }
        }else{
          this.message.isThere = false; 
        }

        this.dataSource = new UserTableDataSource(this.paginator, this.sort, filtered) ;
      }
    )
  }
  search(key){
      key = key.toLowerCase();
    let start = this.users.filter((value, inxex,arr)=>{
      return  S((value.worker_id).toLowerCase()).startsWith(key)||
              S((value.first_name +" "+ value.father_name + " " +value.grand_father_name).toLowerCase()).startsWith(key)
    });
    let contains = this.users.filter((value, index, arr)=>{     
      return (S((value.worker_id).toLowerCase()).contains(key)||
              S((value.first_name + " " + value.father_name + " " + value.grand_father_name).toLowerCase()).contains(key))
              &&
              !(S((value.worker_id).toLowerCase()).startsWith(key)||
              S((value.first_name +" "+ value.father_name + " " +value.grand_father_name).toLowerCase()).startsWith(key));
      });
    return start.concat(contains); 
  }
  editUser(responce){
    let registerDialog = this.modal.open(RegisterationFormComponent,{
      width: '600px', 
      data: {
        roles: this.roles,
        user: responce.data
      },
    }) ; 

    registerDialog.afterClosed().subscribe(
      (responce) => {
        if(responce.responce){
         
          let i = this.users.findIndex(function(value: User){ 
            return (responce.data.id == value.id);
          });
          this.users[i] = responce.data;
          this.dataSource = new UserTableDataSource(this.paginator, this.sort, this.users) ;
        } 
      }
    ) ;
  }
  userProfile($user){
    return this.modal.open(UserProfileModalComponent,{
      width: '600px',
      data: {
        user: $user
      },
    }) ;

    // profileDialog.afterClosed().subscribe(
    //   responce => {
    //     console.log(responce) ; 
    //   }
    // ) ;
  }
  removeUser(responce){
    let deleteDialog = this.modal.open(AlertComponent, {
      data:{
        title: "Remove User", 
        message: "Are you shure? Do you want to remove <b>"+responce.data.first_name+ " " +responce.data.father_name + "</b>",
        dialog: "confirm",
        data: responce.data,
      }
    }) ; 

    deleteDialog.afterClosed().subscribe(
      confirmed => {
        if(confirmed.responce){
          this._user.deleteUser(confirmed.data.id).subscribe(
            responce => {
              let newTableData = this.users.filter(function(value, index, arr){
                return value != confirmed.data; 
              }); 
              this.dataSource = new UserTableDataSource(this.paginator, this.sort, newTableData) ;
            }
          ) ; 
        } 
      }
    )
  }
  onContextMenu(responce) {
    switch(responce.index) {
      case 0: 
        this.editUser(responce); 
        break ;
      case 1: 
        this.userProfile(responce); 
      break ; 
      case 2:
        this.removeUser(responce); 
      break ;
    } 
  }
}
