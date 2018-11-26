import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';

@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  exports: [AngularFireModule, AngularFirestoreModule, AngularFireAuthModule],
})
export class FirebaseModule {}
