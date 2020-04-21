import {Component, OnInit} from '@angular/core';
import {GameRecorder} from "../../../models/game-recorder.model";
import {GameRecordService} from "../../../services/game-record.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-resultats-record',
  templateUrl: './resultats-record.component.html',
  styleUrls: ['./resultats-record.component.scss']
})
export class ResultatsRecordComponent implements OnInit {

  public gameRecordList: GameRecorder[];
  public toPush: GameRecorder;
  duration: number;
  private subscription: Subscription;
  private subscription2: Subscription;
  private subscription3: Subscription;


  constructor(private game: GameRecordService) {
    this.subscription = this.game.gameRecorderList$.subscribe((list) => {
      this.gameRecordList = list;
    })

    this.subscription2 = this.game.gameRecorder$.subscribe((sm) => {
      this.toPush = sm;
    })

    this.subscription3 = this.game.tempsDeJeu$.subscribe(sm => {
      this.duration = sm;
    })

    if (typeof this.toPush.finalScore != 'undefined')
      this.addGameRecorder(this.toPush);

  }

  ngOnInit(): void {
    console.log(this.toPush.finalScore);
  }

  addGameRecorder(game: GameRecorder) {
    this.game.addGameRecorder(game);
  }

  deleteGameRecorder() {
    if (this.gameRecordList.length != 0) {
      console.log(this.gameRecordList.length - 1)
      const game = this.gameRecordList[this.gameRecordList.length - 1];
      this.game.deleteGameRecorder(game);
    }
    window.location.reload();
  }

  public emit() {
    this.game.gameRecorderList$.next(this.gameRecordList);
  }
}
