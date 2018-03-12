import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit {
  
  myFollowList: Observable<any[]>;
  constructor(db: AngularFireDatabase, public afAuth: AngularFireAuth) {
    var fullFollowList = db.list('follow').valueChanges();
    this.myFollowList = fullFollowList[afAuth.auth.currentUser.uid]
  }
  ngOnInit() {
  }

}
