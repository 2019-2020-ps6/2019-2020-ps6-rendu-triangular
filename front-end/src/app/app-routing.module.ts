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


const routes: Routes = [
  {path: 'quiz-list', component: QuizListComponent},
  {path: 'quiz-form', component: QuizFormComponent},
  {path: 'edit-quiz/:id', component: EditQuizComponent},
  {path: 'quiz', component: QuizComponent},
  {path: 'modify-quiz/:id', component: ModifyQuizComponent},
  {path: 'question-list', component: QuestionListComponent},
  {path: 'question-form', component: QuestionFormComponent},
  {path: 'question', component: QuestionComponent},
  {path: 'apropos', component: AproposComponent},
  {path: 'view-list-quiz', component: ViewListQuizComponent},
  {path: 'lancement/:id', component: LancementComponent},
  {path: '', redirectTo: '/accueil', pathMatch: 'full'},
  {path: 'resultats-record', component: ResultatsRecordComponent},
  {path: 'resultats/:id', component: ResultatsComponent},
  {path: 'accueil', component: AcceuilComponent},
  {path: 'description', component: DescriptionAccueilComponent},
  {path: '**', component: PageNotFoundComponent},

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})]
})
export class AppRoutingModule { }
// tslint:disable-next-line:max-line-length
export const routingComponents = [QuizFormComponent, QuizListComponent, EditQuizComponent, QuestionListComponent,
  QuestionFormComponent, PageNotFoundComponent, AcceuilComponent,
  AproposComponent, ModifyQuizComponent,
  LancementComponent, ResultatsComponent, ResultatsRecordComponent];
