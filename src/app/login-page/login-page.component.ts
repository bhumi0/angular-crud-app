import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FetchService } from '../services/fetch.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder } from '@angular/forms';

interface Types {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit{

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  types: Types[] = [
    {value: 'adj', viewValue: 'Adjutant'},
    {value: 'secoffr', viewValue: 'Security Officer'},
    {value: 'adm', viewValue: 'Administrator'}
  ];
  user: any;
  static isLoggedIn: boolean = false;

  constructor(private _fb: FormBuilder,
    private router: Router,
    private _empService: FetchService) {
      this.user = this._fb.group({
        id:'',
        name: '',
        branch:'',
        unit: '',
        password:''
        
      });
     }

  id: any;
  password: string='';
  loginType: string='';
  res:any;

  ngOnInit() {
    LoginPageComponent.isLoggedIn = false;
  }

  login() : void {
    if(this.loginType=='adj' || this.loginType == 'secoffr'){
      this._empService.getOffrById(this.id).subscribe(data => {
        if(this.password == data.password){
          LoginPageComponent.isLoggedIn = true;
          this.router.navigateByUrl('/display', { state: {user : data} });
        }
        else {
          alert("Wrong Password");
        }
      });
    }
    else if(this.loginType=='adm'){
      this._empService.getAdmById(this.id).subscribe(data => {
        if(this.password == data.password){
          LoginPageComponent.isLoggedIn = true;
          this.router.navigateByUrl('/adm', { state: {user : data} });
        }
        else {
          alert("Wrong Password");
        }
      });
    }
    else {
      LoginPageComponent.isLoggedIn = false;
      alert("Invalid credentials");
    }
  }

}
