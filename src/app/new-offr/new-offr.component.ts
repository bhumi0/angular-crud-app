import { Component, Inject, OnInit, Type } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FetchService } from '../services/fetch.service';
import { CoreService } from '../core/core.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdmViewComponent } from '../adm-view/adm-view.component';

interface Types {
  value: string;
  viewValue: string;
}
interface Image {
  id:string,
  value:string,
  image: string
}

@Component({
  selector: 'app-new-offr',
  templateUrl: './new-offr.component.html',
  styleUrls: ['./new-offr.component.scss']
})
export class NewOffrComponent implements OnInit {
  empForm: FormGroup;

  types: Types[] = [
    {value: 'adj', viewValue: 'Adjutant'},
    {value: 'secoffr', viewValue: 'Security Officer'}
  ];

  branch: String[] = [
    'AE(L)',
    'AE(M)',
    'F(P)',
    'Adm',
    'Lgs',
    'Met'
  ]

  unit: String[] = [
    '20SQN',
    '30SQN',
    '7TS',
    '9TS',
    '2Wing'
  ]

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

  type: string = ''
  imgUrl: string = ''

  constructor(
    private _fb: FormBuilder,
    private _empService: FetchService,
    private _coreService: CoreService,
    private router: Router,
    private _dialogRef: MatDialogRef<AdmViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private activatedRoute:ActivatedRoute
  ){
    this.empForm = this._fb.group({
    id:'',
    name: '',
    branch:'',
    unit:'',
    type:'',
    imgUrl:'',
    password:''
  });
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      this._empService.addOffr(this.empForm.value).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('Security Officer added successfully');
          this._dialogRef.close(true);
          },
        error: (err: any) => {
          console.error(err);
          },
      });
    }
  }
}
