import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { FetchService } from '../services/fetch.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  empForm: FormGroup;
  tableDataSource!: MatTableDataSource<any>;

  displayedColumns: string[] = ['bookoutDate','bookoutTime', 'bookinDate','bookinTime'];


  constructor(private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<DetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService){
      
      this.empForm = this._fb.group({
        id:'',
        name: '',
        checkSuffix: '',
        recommendation:'',
        bookout:'',
        bookedin:'',
        bookoutDetails:[
          {
            bookoutDate:'',
            bookinDate:''
          }
        ],
        imgUrl:''
      });
    }

    get bookoutDetails(): FormArray {
      return this.empForm.controls["bookoutDetails"] as FormArray;
    }

    ngOnInit(): void {
      this.empForm.patchValue(this.data);
      console.log((this.empForm.get('bookoutDetails') as FormArray).getRawValue())
      this.tableDataSource = new MatTableDataSource((this.empForm.get('bookoutDetails') as FormArray).getRawValue());
    }

}
