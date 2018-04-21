import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-scores-reason-dialog',
  templateUrl: './scores-reason-dialog.component.html',
  styleUrls: ['./scores-reason-dialog.component.css']
})
export class ScoresReasonDialogComponent implements OnInit {

  private reason: string

  constructor( public dialogRef: MatDialogRef<ScoresReasonDialogComponent> ) {
    this.reason = ''
   }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
