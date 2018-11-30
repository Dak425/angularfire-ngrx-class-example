import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';

import { Exercise } from './exercise.model';
import { UIService } from '../shared/ui.service';
import * as fromRoot from '../app.reducer';
import * as fromTraining from './training.reducer';
import * as UI from '../shared/ui.actions';
import * as Training from './training.actions';

@Injectable()
export class TrainingService {
  private fbSubs: Subscription[] = [];
  private viewer$: Observable<string>;

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTraining.State>
  ) {
    this.viewer$ = this.store.pipe(select(fromRoot.getViewer));
  }

  fetchAvailableExercises() {
    this.store.dispatch(new UI.StartLoading());
    this.fbSubs.push(
      this.db
        .collection('availableExercises')
        .snapshotChanges()
        .pipe(
          map(docArray => {
            return docArray.map(doc => {
              return {
                id: doc.payload.doc.id,
                name: doc.payload.doc.get('name'),
                duration: doc.payload.doc.get('duration'),
                calories: doc.payload.doc.get('calories'),
              };
            });
          })
        )
        .subscribe(
          (exercises: Exercise[]) => {
            this.store.dispatch(new UI.StopLoading());
            this.store.dispatch(new Training.SetAvailableTrainings(exercises));
          },
          error => {
            this.store.dispatch(new UI.StopLoading());
            this.uiService.showSnackBar(
              'Fetching exercises failed, please try again later',
              null,
              3000
            );
          }
        )
    );
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new Training.StartTraining(selectedId));
  }

  completeExercise() {
    this.store
      .pipe(
        select(fromTraining.getActiveTraining),
        take(1)
      )
      .subscribe(exercise => {
        const finishedExercise: Exercise = {
          ...exercise,
          date: new Date(),
          state: 'completed',
          user: this.viewer(),
        };
        this.addDataToDatabase(finishedExercise);
        this.store.dispatch(new Training.StopTraining());
      });
  }

  cancelExercise(progress: number) {
    this.store
      .pipe(
        select(fromTraining.getActiveTraining),
        take(1)
      )
      .subscribe(exercise => {
        const finishedExercise: Exercise = {
          ...exercise,
          duration: exercise.duration * (progress / 100),
          calories: exercise.calories * (progress / 100),
          date: new Date(),
          state: 'cancelled',
          user: this.viewer(),
        };
        this.addDataToDatabase(finishedExercise);
        this.store.dispatch(new Training.StopTraining());
      });
  }

  fetchCompletedOrCancelledExercises() {
    this.store.dispatch(new UI.StartLoading());
    this.fbSubs.push(
      this.db
        .collection(this.getFinishedExerciseCollection(), ref =>
          ref.where('user', '==', this.viewer())
        )
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
          this.store.dispatch(new UI.StopLoading());
          this.store.dispatch(new Training.SetFinishedTrainings(exercises));
        })
    );
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection(this.getFinishedExerciseCollection()).add(exercise);
  }

  private getFinishedExerciseCollection(): string {
    return 'finishedExercises';
  }

  private viewer(): string {
    let viewer: string;
    this.viewer$.pipe(take(1)).subscribe(uid => (viewer = uid));
    return viewer;
  }
}
