import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {GameRecorder} from "../models/game-recorder.model";
import {httpOptionsBase} from "../configs/server.config";

@Injectable()
export class GameRecordService {
  urlGameRecorder = 'http://localhost:9428/api/game-record'
  public gameRecorder$: BehaviorSubject<GameRecorder> = new BehaviorSubject<GameRecorder>(new GameRecorder());
  private httpOptions = httpOptionsBase;

  private gameRecorderList: GameRecorder[];

  public gameRecorderList$: BehaviorSubject<GameRecorder[]> = new BehaviorSubject(this.gameRecorderList);

  constructor(private http: HttpClient) {
    this.getGameRecorder();
  }

  addGameRecorder(game: GameRecorder) {
    this.http.post(this.urlGameRecorder, game, this.httpOptions).subscribe(() => this.getGameRecorder());
  }

  getGameRecorder() {
    this.http.get<GameRecorder[]>(this.urlGameRecorder, this.httpOptions).subscribe((gameRecorderFromMock) => {
      this.gameRecorderList = gameRecorderFromMock;
      this.gameRecorderList$.next(this.gameRecorderList);
    })
  }

  deleteGameRecorder(game: GameRecorder) {
    console.log("game Recoder supprimé")
    console.log(game.id);
    const gameRecorderPath = this.urlGameRecorder + '/' + game.id;
    this.http.delete<GameRecorder>(gameRecorderPath, this.httpOptions).subscribe()

  }

  public performGameRecorder(game: GameRecorder) {
    this.gameRecorder$.next(game);
  }

  getGameRecorderList() {
    return this.gameRecorderList;
  }
}
