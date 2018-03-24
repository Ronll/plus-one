import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { DbService } from '../db.service'
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

  constructor(
    private db: AngularFireDatabase, 
    public afAuth: AngularFireAuth,
    private dbs: DbService
  ) {

    this.myUid = afAuth.auth.currentUser.uid
    
    this.myFollows = dbs.myFollows

  }

  rankUser(uid, rank){
    this.dbs.rankUser(uid, rank, "")
  }

  ngOnInit() {
  }

}
