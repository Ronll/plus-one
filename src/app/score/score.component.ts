import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Observable } from '@firebase/util';
import { DbService } from '../db.service'

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  uid: string

  rankEvents: any

  constructor(private route: ActivatedRoute, private dbs: DbService) {
    this.uid = this.route.snapshot.params.uid;
    this.rankEvents = 
    dbs.getUserRankEvents(this.uid)
      .map(ranks => ranks.sort((a, b) => a['timestamp'] - b['timestamp']))
  }

  ngOnInit() {
  }

}
