import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { DbService } from '../db.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ScoresReasonDialogComponent } from './scores-reason-dialog/scores-reason-dialog.component';
import 'rxjs/add/observable/combineLatest';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit {
  
  myFollows: Observable<any[]>
  list: Observable<any[]>

  myUid: string

  myScore: Observable<any>

  isThereNoScore: any

  constructor(
    private db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    private dbs: DbService,
    public dialog: MatDialog
  ) {

    this.myUid = afAuth.auth.currentUser.uid
    
    this.myFollows = dbs.myFollows

    this.checkIfUserHasRank()
    
  }

  openDialog(): Promise<any> {
    let dialogRef = this.dialog.open(ScoresReasonDialogComponent, {});
    return dialogRef.afterClosed().toPromise()
  }

  rankUser(uid, rank){
    var result = this.openDialog()
    result.then((reason) => {
      if(reason !== undefined)
       this.dbs.rankUser(uid, rank, reason)
    })
  }

  checkIfUserHasRank(){
    this.dbs.isObjectDefined(`/ranks/user_is_ranked/${this.myUid}`, (isDefined)=> this.isThereNoScore = !isDefined)
  }

  ngOnInit() {
  }

}
