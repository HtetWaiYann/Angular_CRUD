import { Component, OnInit } from '@angular/core';
import { AllInOneService } from 'src/app/shared/services/all-in-one.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { TastysoftService } from 'src/app/shared/services/tastysoft.service';
import { Sort } from '@angular/material/sort';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  gettingUserList: boolean = false;
  isFocus: boolean = false;

  userList: any[] = [];

  searchText: string = '';

  constructor(
    private allinoneService: AllInOneService,
    private messageService: MessageService,
    private tastysoftService: TastysoftService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList() {
    this.gettingUserList = true;
    this.userList = [];
    const data = {};
    this.tastysoftService.getusers(data).subscribe(
      (res: any) => {
        if (res.returncode == '300') {
          this.userList = res.data;
          setTimeout(()=>{
            this.gettingUserList = false;
          },3000)
        } else {
          this.gettingUserList = false;
          this.messageService.openSnackBar(res.message, 'warn');
        }
      },
      (err: any) => {
        this.gettingUserList = false;
      }
    );
  }

  sortData(sort: Sort) {
    const data = this.userList;
    if (!sort.active || sort.direction === '') {
      this.userList = data;
      return;
    }

    this.userList = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return this.allinoneService.compare(a.name, b.name, isAsc);
        case 'email':
          return this.allinoneService.compare(a.email, b.email, isAsc);
        case 'role':
          return this.allinoneService.compare(a.role, b.role, isAsc);
        case 'createdat':
          return this.allinoneService.compare(a.createdAt, b.createdAt, isAsc);
        default:
          return 0;
      }
    });
  }

  clear() {
    this.searchText = '';
  }


  confirmDelete(user: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      minWidth: '250px',
      maxWidth: '300px',
      data: {
        message: user.name + " will be deleted. Are you sure?"
      },
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if(res){
        this.deleteUser(user)
      }
    });
  }

  deleteUser(user: any){
    const data = {
      id : user._id
    }
    this.tastysoftService.deleteuser(data).subscribe((res: any) => {
      if(res.returncode == "300"){
        this.messageService.openSnackBar(res.message, 'success')
        this.getUserList()
      }
      else{
        this.messageService.openSnackBar(res.message, 'warn')
      }
    }
    )
  }
}
