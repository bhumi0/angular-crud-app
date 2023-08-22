import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FetchService } from '../services/fetch.service';
import { AgniveerEditComponent } from '../agniveer-edit/agniveer-edit.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { ActivatedRoute, Router } from '@angular/router';

interface Image {
  id:string,
  value:string,
  image: string
}


@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.component.html',
  styleUrls: ['./new-entry.component.scss']
})
export class NewEntryComponent implements OnInit{
  empForm: FormGroup;
  userUnit: any;

  constructor(
    private _fb: FormBuilder,
    private _empService: FetchService,
    private _dialogRef: MatDialogRef<AgniveerEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
    private router: Router,
    private activatedRoute:ActivatedRoute
  ) {
    this.empForm = this._fb.group({
      id:'',
      name: '',
      unit:'',
      trade:'',
      recommendation:'',
      bookout:'',
      bookedIn:'',
      postIn:'',
      bookoutDetails:[
        {
          bookoutDate:'',
          bookinDate:''
        }
      ],
      imgUrl:''
    });
  }

  imgUrl: string = ''

  imgUrls: Image[] = [
    {id:'1',value:'male1', image:'assets/male1.jpg'},
    {id:'2',value:'male2', image:'assets/male2.png'},
    {id:'3',value:'male3', image:'assets/male3.png'},
    {id:'4',value:'male4', image:'assets/male4.jpg'},
    {id:'5',value:'female1', image:'assets/female1.png'},
    {id:'6',value:'female2', image:'assets/female2.png'},
    {id:'7',value:'female3', image:'assets/female3.png'},
    {id:'8',value:'female4', image:'assets/female4.png'}
  ]

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
    this.userUnit = history.state.user.unit;
  }

  onFormSubmit() {
    this.empForm.patchValue({bookout: true,recommendation:true, bookedIn:true, unit:this.userUnit,bookoutDetails:[]})
    if (this.empForm.valid) {
      this._empService.addAgniveer(this.empForm.value).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('Agniveer added successfully');
          this._dialogRef.close(true);
          },
        error: (err: any) => {
          console.error(err);
          },
      });
    }
  }
}
