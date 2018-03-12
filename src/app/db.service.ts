import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DbService {

  allUsers: Observable<any[]>
  fullFollowList: Observable<any[]>
  fullReverseFollowersList: Observable<any[]>
  allRankings: Observable<any[]>
  myUid: string
  constructor(db: AngularFireDatabase, public afAuth: AngularFireAuth) {
    this.myUid = afAuth.auth.currentUser.uid
    this.allUsers = db.list('users').valueChanges();    
    this.fullFollowList = db.list('follow').valueChanges();
    this.fullReverseFollowersList = db.list('followers').valueChanges();
    this.allRankings = db.list('ranks').valueChanges()
  }
  followUser(uid){

  }
  getMyFollowings(){
  return this.fullFollowList[this.myUid]
  }
  getMyRank(){
    return this.allRankings[this.myUid].map((currentRank)=>{
      currentRank += currentRank.rank
    })
  }
   

}
