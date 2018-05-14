import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { isNgTemplate } from '@angular/compiler';

@Injectable()
export class DbService {

  allUsers: Observable<any[]>
  myFollows: any
  fullReverseFollowersList: Observable<any[]>
  allRankings: Observable<any[]>
  myUid: string
  db: AngularFireDatabase
  myRank: Observable<any>

  constructor(db: AngularFireDatabase, public afAuth: AngularFireAuth) {
    this.db = db
    this.myUid = afAuth.auth.currentUser.uid
    this.myRank = this.getUserRank(this.myUid)
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
    })

    this.fullReverseFollowersList = db.list('followers').valueChanges();
    this.allRankings = db.list('ranks').valueChanges()
  }

  rankUser(uid, rank, reason) {
    let timestamp = String(Date.now()).slice(0, 9)

    let reference = this.db.list(`/ranks/ranks`).push({})

    this.db.object(`/ranks/ranks/${reference.key}`).set({
      id: reference.key,
      rank: rank,
      ranked: uid,
      ranker: this.myUid,
      reason: reason,
      timestamp: timestamp
    })

    this.db.list(`/ranks/user_is_ranked/${uid}`)
    .set(reference.key, { timestamp: timestamp })
    

    this.db.list(`/ranks/user_is_ranker/${this.myUid}`)
    .set(reference.key, { timestamp: timestamp })
  }

  getUsernameByUid(uid) {
    return this.db.object(`/users/${uid}/username`).valueChanges()
  }

  getUserRank(uid) {
    return this.db.list(`/ranks/ranks`).valueChanges()
    .map(ranks =>
      ranks
        .filter(rank => rank['ranked'] === uid)
        .reduce((acc, rank) => { return acc + rank['rank'] }, 0)
    )
  }

  getUserRankEvents(uid) {
    return this.db.list(`/ranks/user_is_ranked/${uid}`).snapshotChanges().map((eventList) => {
      return eventList.map((event) => {
        return this.db.object(`/ranks/ranks/${event.key}`).valueChanges().map(rank => {
          let username = this.getUsernameByUid(rank['ranker'])
          return { ...rank, username}
        })
      })
    })
  }

  isObjectDefined(uri: string, callback) {
    return this.db.object(uri).snapshotChanges().subscribe((obj) => {
      callback(obj.key !== null)
    })
  }

  getMyRank() {
    return this.getUserRank(this.myUid)
  }
}