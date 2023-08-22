import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewOffrComponent } from '../new-offr/new-offr.component';
import { MatDialog } from '@angular/material/dialog';
import { FetchService } from '../services/fetch.service';
import { CoreService } from '../core/core.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ImgComponent } from '../img/img.component';
import { OffrEditComponent } from '../offr-edit/offr-edit.component';

@Component({
  selector: 'app-adm-view',
  templateUrl: './adm-view.component.html',
  styleUrls: ['./adm-view.component.scss']
})
export class AdmViewComponent implements OnInit{
  user: any;
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'id',
    'name',
    'branch',
    'unit',
    'type',
    'password',
    'imageUrl',
    'action'
  ];

  constructor(
    private _dialog: MatDialog,
    private _empService: FetchService,
    private _coreService: CoreService,
    private router: Router,
    private activatedRoute:ActivatedRoute){
      
    }

  ngOnInit(): void {
    this.getOfficersList();
    this.user = history.state.user;
  }

  getOfficersList() {
    this._empService.getOffrList().subscribe({
      next: (res) => {
        this.dataSource =  new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      }
    });

  }

  logout(){
    this.router.navigate(['login']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openImg(data: any){
    const dialogRef = this._dialog.open(ImgComponent, {
      data,
    });
  }

  create(){
    const dialogRef = this._dialog.open(NewOffrComponent, {
      data:{
        user:this.user
      },
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getOfficersList();
        }
      },
    });
  }

  deleteOffr(id:number,type:string){
    this._empService.deleteOffrById(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Officer deleted!', 'done');
        this.getOfficersList();
      },
      error: console.log,
    });
  }

  editOffr(data: any, type:string){
      const dialogRef = this._dialog.open(OffrEditComponent, {
        data:{
          value : data,
          type: type
        },
      });
  
      dialogRef.afterClosed().subscribe({
        next: (val) => {
          if (val) {
            this.getOfficersList();
          }
        },
      });
  }
}
