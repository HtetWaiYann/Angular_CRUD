import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { AllInOneService } from 'src/app/shared/services/all-in-one.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(
    private dialog : MatDialog,
    private allinoneService: AllInOneService,
  ) { }

  ngOnInit(): void {
  }

  logout(){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        message: "Are you sure?"
      },
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if(res){
        this.allinoneService.logout()
        window.location.reload()
      }
    });
  }

}
