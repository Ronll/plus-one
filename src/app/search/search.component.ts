import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { DbService } from '../db.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  myUid: string
  
  followList: Observable<any>

  users: Observable<any>

  constructor(private db: AngularFireDatabase, public afAuth: AngularFireAuth) {
    this.db = db
    this.myUid = afAuth.auth.currentUser.uid
    this.followList = db.list('follow/' + this.myUid).valueChanges();
    this.users = db.list('users').valueChanges();
  }

  followUser(uid){
    var follow = {}
    follow[this.myUid] = uid
    this.db.list(`follow/${this.myUid}`).set(uid, {timestamp: String(Date.now()).slice(0,9)} )
    this.db.list(`followers/${uid}`).set(this.myUid, {timestamp: String(Date.now()).slice(0,9)} )    
  }

  unfollowUser(uid){
    var follow = {}
    follow[this.myUid] = uid
    this.db.list(`follow/${this.myUid}`).remove( uid )
    this.db.list(`followers/${uid}/${this.myUid}`).remove()
  }
  
  ngOnInit() {
  }

}
