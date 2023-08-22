import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FetchService } from '../services/fetch.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-offr-edit',
  templateUrl: './offr-edit.component.html',
  styleUrls: ['./offr-edit.component.scss']
})
export class OffrEditComponent implements OnInit{
  empForm: FormGroup;
  user: any;
  
constructor(private _fb: FormBuilder,
  private _empService: FetchService,
  private _dialogRef: MatDialogRef<OffrEditComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private _coreService: CoreService){

    this.empForm = this._fb.group({
      id:'',
      name: '',
      type: '',
      unit: '',
      branch:'',
      imgUrl:'',
      password:''
    });
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data.value);
    if(this.data.type == 'adj'){
      this.user = 'adj';
    }
    else{
      this.user = 'secoffr';
    }
  }

  onFormSubmit(){
    if (this.data.value) {
      this._empService
        .updateOffr(this.data.value.id, this.empForm.value)
        .subscribe({
          next: (val: any) => {
              this._coreService.openSnackBar('Officer detail updated!');
              this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
  }
}
