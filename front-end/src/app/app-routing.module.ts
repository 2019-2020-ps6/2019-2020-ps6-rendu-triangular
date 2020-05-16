import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuizListComponent} from './quizzes/quiz-list/quiz-list.component';
import {QuizFormComponent} from './quizzes/quiz-form/quiz-form.component';
import {EditQuizComponent} from './quizzes/edit-quiz/edit-quiz.component';
import {QuestionListComponent} from './questions/question-list/question-list.component';
import {QuestionFormComponent} from './questions/question-form/question-form.component';
import {QuestionComponent} from './questions/question/question.component';
import {AcceuilComponent} from './main/acceuil/acceuil.component';
import {AproposComponent} from './main/apropos/apropos.component';
import {LancementComponent} from './main/lancement/lancement.component';
import {QuizComponent} from './quizzes/quiz/quiz.component';
import {PageNotFoundComponent} from './main/page-not-found/page-not-found.component';
import {ModifyQuizComponent} from "./quizzes/modify-quiz/modify-quiz.component";
import {ViewListQuizComponent} from "./quizzes/view-list-quiz/view-list-quiz.component";
import {ResultatsComponent} from "./main/resultats/resultats.component";
import {ResultatsRecordComponent} from "./main/resultats-record/resultats-record.component";
import {DescriptionAccueilComponent} from "./main/acceuil/description-accueil/description-accueil.component";
import {UserFormComponent} from "./users/user-form/user-form.component";
import {UserSignInComponent} from "./users/user-sign-in/user-sign-in.component";
import {UserListComponent} from "./users/user-list/user-list.component";
import {UserProfileComponent} from "./users/user-profile/user-profile.component";
import {QuizColorListComponent} from "./quizzes-color/quiz-color-list/quiz-color-list.component";
import {QuizColorFormComponent} from "./quizzes-color/quiz-color-form/quiz-color-form.component";
import {QuizColorComponent} from "./quizzes-color/quiz-color/quiz-color.component";
import {QuizColorViewComponent} from "./quizzes-color/quiz-color-view/quiz-color-view.component";
import {LancementQuizColorComponent} from "./main/lancement-quiz-color/lancement-quiz-color.component";
import {QuizColorViewListComponent} from "./quizzes-color/quiz-color-view-list/quiz-color-view-list.component";
import {LoginGuard} from "./users/authentification/login-guard.service";
import {LogoutGuard} from "./users/authentification/logout.guard";


const routes: Routes = [
  {path: 'quiz-list', component: QuizListComponent, canDeactivate: [LogoutGuard]},
  {path: 'quiz-form', component: QuizFormComponent, canDeactivate: [LogoutGuard]},
  {path: 'edit-quiz/:id', component: EditQuizComponent, canDeactivate: [LogoutGuard]},
  {path: 'quiz', component: QuizComponent, canDeactivate: [LogoutGuard]},
  {path: 'modify-quiz/:id', component: ModifyQuizComponent, canDeactivate: [LogoutGuard]},
  {path: 'question-list', component: QuestionListComponent, canDeactivate: [LogoutGuard]},
  {path: 'question-form', component: QuestionFormComponent, canDeactivate: [LogoutGuard]},
  {path: 'question', component: QuestionComponent, canDeactivate: [LogoutGuard]},
  {path: 'apropos', component: AproposComponent},
  {path: 'view-list-quiz', component: ViewListQuizComponent, canDeactivate: [LogoutGuard]},
  {path: 'lancement/:id', component: LancementComponent, canDeactivate: [LogoutGuard]},
  {
    path: 'resultats-record',
    component: ResultatsRecordComponent,
    canActivate: [LoginGuard],
    canDeactivate: [LogoutGuard]
  },
  {path: 'resultats/:id', component: ResultatsComponent},
  {path: 'accueil', component: AcceuilComponent},
  {path: 'description', component: DescriptionAccueilComponent},
  {
    path: 'user-profile/:id',
    component: UserProfileComponent,
    canActivate: [LoginGuard],
    canDeactivate: [LogoutGuard],
    data: {title: 'Connexion'}
  },
  {path: 'user-form', component: UserFormComponent},
  {path: 'user-sign-in', component: UserSignInComponent},
  {path: 'user-list', component: UserListComponent, canActivate: [LoginGuard], canDeactivate: [LogoutGuard]},
  {path: 'quiz-color-list', component: QuizColorListComponent, canDeactivate: [LogoutGuard]},
  {path: 'quiz-color-form', component: QuizColorFormComponent, canDeactivate: [LogoutGuard]},
  {path: 'quiz-color', component: QuizColorComponent},
  {path: 'quiz-color-view', component: QuizColorViewComponent, canDeactivate: [LogoutGuard]},
  {path: 'quiz-color-list', component: QuizColorListComponent, canDeactivate: [LogoutGuard]},
  {
    path: 'quiz-color-view-list',
    component: QuizColorViewListComponent,
    canDeactivate: [LogoutGuard]
  },
  {
    path: 'lancement-quiz-color/:id',
    component: LancementQuizColorComponent,
    canDeactivate: [LogoutGuard]
  },
  {path: '', redirectTo: '/accueil', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})]
})
export class AppRoutingModule {
}

// tslint:disable-next-line:max-line-length
export const routingComponents = [QuizFormComponent, QuizListComponent, EditQuizComponent, QuestionListComponent,
  QuestionFormComponent, PageNotFoundComponent, AcceuilComponent,
  AproposComponent, ModifyQuizComponent,
  LancementComponent, ResultatsComponent, ResultatsRecordComponent, UserFormComponent, UserSignInComponent, UserListComponent];
