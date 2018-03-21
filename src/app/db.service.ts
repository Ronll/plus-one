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
          const id = a.key;
          const username = this.db.object(`/users/${id}/username`).valueChanges()
          const points = 1;
          console.log({ id, username, ...data })
          return { id, username, ...data };
        });
    });
    
    this.fullReverseFollowersList = db.list('followers').valueChanges();
    this.allRankings = db.list('ranks').valueChanges()
  }

  getUsernameByUid(uid){
    return this.allUsers
  }

  getMyFollowings(){
    return this.myFollows
  }
  getMyRank(){
    return this.allRankings[this.myUid].map((currentRank)=>{
      currentRank += currentRank.rank
    })
  }
}
