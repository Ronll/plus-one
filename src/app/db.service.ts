import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DbService {

  allUsers: Observable<any[]>
  myFollows: any
  fullReverseFollowersList: Observable<any[]>
  allRankings: Observable<any[]>
  myUid: string
  db: AngularFireDatabase
  constructor(db: AngularFireDatabase, public afAuth: AngularFireAuth) {
    this.db = db
    this.myUid = afAuth.auth.currentUser.uid
    
    this.allUsers = db.list('users').valueChanges();
    this.myFollows = db.list(`follow/${this.myUid}`).snapshotChanges().map(actions => {
        return actions.map(a => {
          const data = a.payload.val();
          const uid = a.key;
          const username = this.getUsernameByUid(uid)
          const rank = this.getUserRank(uid)
          const points = 1;
          return { uid, username, rank, ...data };
        });
    });
    
    this.fullReverseFollowersList = db.list('followers').valueChanges();
    this.allRankings = db.list('ranks').valueChanges()
  }

  rankUser(uid, rank, reason){
    this.db.list(`/ranks/${uid}`).push({
      rank: rank,
      ranker: this.myUid,
      reason: reason,
      timestamp: String(Date.now()).slice(0,9)
    })
  }

  getUsernameByUid(uid){
    return this.db.object(`/users/${uid}/username`).valueChanges()
  }

  getUserRank(uid){
    return this.db.list(`/ranks/${uid}`).valueChanges().map(array => array
    .reduce((acc, element)=>{ return acc + element['rank']}, 0))
  }

  getMyRank(){
    return this.allRankings[this.myUid].map((currentRank)=>{
      currentRank += currentRank.rank
    })
  }
}
