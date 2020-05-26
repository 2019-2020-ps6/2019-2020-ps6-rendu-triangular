import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {QuizComponent} from './quizzes/quiz/quiz.component';
import {HeaderComponent} from './header/header.component';
import {QuestionListComponent} from './questions/question-list/question-list.component';
import {QuestionFormComponent} from './questions/question-form/question-form.component';
import {QuestionComponent} from './questions/question/question.component';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule, routingComponents} from './app-routing.module';
import {RouterModule} from '@angular/router';
import {FooterComponent} from './footer/footer.component';
import {MainContentComponent} from './main/main-content/main-content.component';
import {AcceuilComponent} from './main/acceuil/acceuil.component';
import {LancementComponent} from './main/lancement/lancement.component';
import {AproposComponent} from './main/apropos/apropos.component';
import {PageNotFoundComponent} from './main/page-not-found/page-not-found.component';
import {ModifyQuizComponent} from './quizzes/modify-quiz/modify-quiz.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ViewListQuizComponent} from './quizzes/view-list-quiz/view-list-quiz.component';
import {ViewQuizComponent} from './quizzes/view-quiz/view-quiz.component';
import {ViewQuestionComponent} from './questions/view-question/view-question.component';
import {ResultatsComponent} from './main/resultats/resultats.component';
import {ResultatsRecordComponent} from './main/resultats-record/resultats-record.component';
import {DescriptionAccueilComponent} from './main/acceuil/description-accueil/description-accueil.component';
import {GameRecordService} from "../services/game-record.service";
import {MDBBootstrapModule, ModalModule} from "angular-bootstrap-md";
import {UserListComponent} from './users/user-list/user-list.component';
import {UserFormComponent} from './users/user-form/user-form.component';
import {UserComponent} from './users/user/user.component';
import {UserSignInComponent} from './users/user-sign-in/user-sign-in.component';
import {UserService} from "../services/user.service";
import {QuizService} from "../services/quiz.service";
import {LancementQuizColorComponent} from './main/lancement-quiz-color/lancement-quiz-color.component';
import {AuthentificationService} from "../services/authentification.service";
import {UserProfileComponent} from './users/user-profile/user-profile.component';
import {UserProfilViewComponent} from './users/user-profil-view/user-profil-view.component';
import {QuizColorService} from "../services/quiz-color.service";
import {QuizColorComponent} from './quizzes-color/quiz-color/quiz-color.component';
import {QuizColorListComponent} from './quizzes-color/quiz-color-list/quiz-color-list.component';
import {QuizColorFormComponent} from "./quizzes-color/quiz-color-form/quiz-color-form.component";
import {QuizColorViewListComponent} from './quizzes-color/quiz-color-view-list/quiz-color-view-list.component';
import {QuizColorViewComponent} from './quizzes-color/quiz-color-view/quiz-color-view.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatDialogModule} from "@angular/material/dialog";
import {MatGridListModule} from "@angular/material/grid-list";
import {WrongAnswerDialogComponent} from './matDialogs/wrong-answer-dialog/wrong-answer-dialog.component';
import {CorrectAnswerDialogComponent} from './matDialogs/correct-answer-dialog/correct-answer-dialog.component';
import {TooManyAnswerDialogComponent} from './matDialogs/too-many-answer-dialog/too-many-answer-dialog.component';
import {OnEndingQuizComponent} from './matDialogs/on-ending-quiz/on-ending-quiz.component';
import {QuizAssignComponent} from './main/quiz-assign/quiz-assign.component';
import {SideNavContainerComponent} from './main/side-nav-container/side-nav-container.component';
import {MatSelectModule} from "@angular/material/select";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {DeleteUserDialogComponent} from './matDialogs/delete-user-dialog/delete-user-dialog.component';
import {QuizIsAssignedDialogComponent} from './matDialogs/quiz-is-assigned-dialog/quiz-is-assigned-dialog.component';
import {ConnectionDialogComponent} from './matDialogs/connection-dialog/connection-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    HeaderComponent,
    QuestionListComponent,
    QuestionFormComponent,
    QuestionComponent,
    routingComponents,
    FooterComponent,
    MainContentComponent,
    AcceuilComponent,
    LancementComponent,
    AproposComponent,
    PageNotFoundComponent,
    ModifyQuizComponent,
    ViewListQuizComponent,
    ViewQuizComponent,
    ViewQuestionComponent,
    ResultatsComponent,
    ResultatsRecordComponent,
    DescriptionAccueilComponent,
    UserListComponent,
    UserFormComponent,
    UserComponent,
    UserSignInComponent,
    LancementQuizColorComponent,
    UserProfileComponent,
    UserProfilViewComponent,
    QuizColorComponent,
    QuizColorListComponent,
    QuizColorFormComponent,
    QuizColorViewListComponent,
    QuizColorViewComponent,
    WrongAnswerDialogComponent,
    CorrectAnswerDialogComponent,
    TooManyAnswerDialogComponent,
    OnEndingQuizComponent,
    QuizAssignComponent,
    SideNavContainerComponent,
    DeleteUserDialogComponent,
    QuizIsAssignedDialogComponent,
    ConnectionDialogComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatGridListModule,
    MatSelectModule,
    MatExpansionModule,
    MatCheckboxModule,
  ],
  providers: [GameRecordService, UserService, QuizService, AuthentificationService, QuizColorService, ModalModule],
  bootstrap: [AppComponent],
  entryComponents: [QuestionComponent]
})
export class AppModule {
}
