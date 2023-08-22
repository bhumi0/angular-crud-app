import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgniveerEditComponent } from '../agniveer-edit/agniveer-edit.component';
import { FetchService } from '../services/fetch.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../core/core.service';
import { ImgComponent } from '../img/img.component';
import { DetailsComponent } from '../details/details.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NewEntryComponent } from '../new-entry/new-entry.component';


@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {
    displayedColumns: string[] = [
      'id',
      'name',
      'trade',
      'unit',
      'postIn',
      'bookout',
      'recommendation',
      'bookedin',
      'imageUrl',
      'action'
    ];
  
    dataSource!: MatTableDataSource<any>;
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  
    user: any;
    total = 0;
    outside = 0;
    inCampus = 0;

    constructor(
      private _dialog: MatDialog,
      private _empService: FetchService,
      private _coreService: CoreService,
      private router: Router,
      private activatedRoute:ActivatedRoute
    ) {
    }
  
    ngOnInit(): void {
      this.getAgniveerList();
      this.user = history.state.user;
    }

    create(){
      const dialogRef = this._dialog.open(NewEntryComponent, {
        data:{
          user:this.user
        },
      });
      dialogRef.afterClosed().subscribe({
        next: (val) => {
          if (val) {
            this.getAgniveerList();
          }
        },
      });
    }

    getAgniveerList() {
      this._empService.getAgniveerList().subscribe({
        next: (res) => {
          let outside = 0;
            if(this.user.type == 'adj'){
              let newArray=[];
              let index = res.length;
              while(index){
                if(this.user.unit == res[index-1].unit){
                  newArray.push(res[index-1]);
                }
              index--;
            }
              this.dataSource = new MatTableDataSource(newArray);
            }
            else{
              this.dataSource = new MatTableDataSource(res);

            }        
          let index1 = this.dataSource.data.length;

          this.total = index1;
          let currDate = new Date();

          while (index1) {
            let agniveerDetails = this.dataSource.data[index1-1];
            if(agniveerDetails.bookoutDetails[agniveerDetails.bookoutDetails.length -1]){
              let lastBookout = new Date(agniveerDetails.bookoutDetails[agniveerDetails.bookoutDetails.length-1].bookoutDate);
              if(agniveerDetails.bookedIn == false){
                outside++;
              }
              let bookinDate = new Date(agniveerDetails.bookoutDetails[agniveerDetails.bookoutDetails.length-1].bookinDate);
              let numOfDays = Math.round((currDate.getTime()-lastBookout.getTime())/(1000*60*60*24));
              if(numOfDays<=30 || agniveerDetails.recommendation != true){
                agniveerDetails.bookout = false;
              }else{
                agniveerDetails.bookout = true;
              }
              if(bookinDate.getDate() > lastBookout.getDate()){
                agniveerDetails.late = true;
              }
            }
            index1--;
          }
          
          this.outside = outside;
          this.inCampus = this.total - this.outside;
          // console.log(this.total + " " + this.outside + " " + this.inCampus);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        error: console.log,
      });
    }
  
    deleteAgniveer(id: number) {
      this._empService.deleteAgniveer(id).subscribe({
        next: (res) => {
          this._coreService.openSnackBar('Agniveer deleted!', 'done');
          this.getAgniveerList();
        },
        error: console.log,
      });
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  
    Logout(){
      this.router.navigate(['login']);
    }

    openEditForm(data: any, user:string) {
      console.log(data);
      const dialogRef = this._dialog.open(AgniveerEditComponent, {
        data:{
          value : data,
          name: user
        },
      });
  
      dialogRef.afterClosed().subscribe({
        next: (val) => {
          if (val) {
            this.getAgniveerList();
          }
        },
      });
    }

    bookoutDetails(data:any) {
      const dialogRef = this._dialog.open(DetailsComponent, {
        data,
      });
  
      dialogRef.afterClosed().subscribe({
        next: (val) => {
          if (val) {
            this.getAgniveerList();
          }
        },
      });
    }
  
    openImg(data: any){
      const dialogRef = this._dialog.open(ImgComponent, {
        data,
      });
    }
}
