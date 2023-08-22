import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit {

  img: any;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogRef: MatDialogRef<ImgComponent>){
    
  }

  ngOnInit(): void {
    this.img = this.data.imgUrl;
  }

}
