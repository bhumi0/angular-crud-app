import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { FetchService } from '../services/fetch.service';


interface Value {
  value: any;
  user: string;
}

@Component({
  selector: 'agniveer-edit',
  templateUrl: './agniveer-edit.component.html',
  styleUrls: ['./agniveer-edit.component.scss'],
})
export class AgniveerEditComponent implements OnInit {
  empForm: FormGroup;
  user: any;
  display: string = 'Allow Bookout';
  error: boolean = false;



  constructor(
    private _fb: FormBuilder,
    private _empService: FetchService,
    private _dialogRef: MatDialogRef<AgniveerEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.empForm = this._fb.group({
      id:'',
      name: '',
      checkSuffix: '',
      trade: '',
      unit: '',
      recommendation:'',
      bookout:'',
      bookedIn:'',
      postIn:'',
      late:'',
      bookoutDetails:[
        {
          bookoutDate:'',
          bookinDate:''
        }
      ],
      imgUrl:''
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data.value);
    if(this.data.name == 'adjRev'){
      this.display = 'Revoke Bookout';
    }
    if(this.data.name == 'adjRec'){
      this.display = 'Recommend Bookout';
    }
    if(this.data.name == 'secoffrBookout'){
      this.display = 'Allow Bookout';
    }
    if(this.data.name == 'secoffrBookin'){
      this.display = "Booking In"
    }
  }


  onFormSubmit() {
    if (this.empForm.valid) {
      if(this.data.name == 'adjRec'){
        this.empForm.patchValue({recommendation: true});
        console.log(this.empForm);
      }
      else if(this.data.name == 'adjRev'){
        this.empForm.patchValue({recommendation: false, bookout: false});
        console.log(this.empForm);
      }
      else if(this.data.name == 'secoffrBookout'){
        const bookoutDetails = this.empForm.controls['bookoutDetails'] as FormArray;
        let currentDate = new Date();
        this.empForm.patchValue({bookout: false});
        if(bookoutDetails.getRawValue()){
          const temp = {
            bookoutDate: currentDate,
            bookinDate: null
          };
          bookoutDetails.getRawValue().push(temp);
        }
        this.empForm.patchValue({bookedIn: false});
      }
      else if(this.data.name == 'secoffrBookin'){
        let currentDate = new Date();
        const bookoutDetails = this.empForm.controls['bookoutDetails'] as FormArray;
        console.log(bookoutDetails.getRawValue());
        if(bookoutDetails.getRawValue()){
          let temp = bookoutDetails.getRawValue().at(bookoutDetails.getRawValue.length-1);
          let bookoutDateTemp = new Date(temp.bookoutDate);
          console.log(bookoutDateTemp)
          if(bookoutDateTemp.getDate()  != currentDate.getDate()) {
            this.error = true;
          }
          let temp1 = {
            bookoutDate: temp.bookoutDate,
            bookinDate: currentDate

          }
          
          bookoutDetails.getRawValue().splice(length-1);
          bookoutDetails.getRawValue().push(temp1);
          this.empForm.patchValue({bookedIn: true, bookout: false, recommendation:false})
        }
      }
      if (this.data.value) {
        this._empService
          .updateAgniveer(this.data.value.id, this.empForm.value)
          .subscribe({
            next: (val: any) => {
              if(this.error == false){
                this._coreService.openSnackBar('Agniveer detail updated!');
                this._dialogRef.close(true);
              }
              else{
                this._coreService.openSnackBar('Booking in on another day. Meet Security Officer.');
                this._dialogRef.close(true);
              }
            },
            error: (err: any) => {
              console.error(err);
            },
          });
        }
  }
  }
}
