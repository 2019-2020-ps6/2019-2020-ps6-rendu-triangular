import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
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


const routes: Routes = [
  {path: 'quiz-list', component: QuizListComponent},
  {path: 'quiz-form', component: QuizFormComponent},
  {path: 'edit-quiz/:id', component: EditQuizComponent},
  {path: 'quiz', component: QuizComponent},
  {path: 'question-list', component: QuestionListComponent},
  {path: 'question-form', component: QuestionFormComponent},
  {path: 'question', component: QuestionComponent},
  {path: 'apropos', component: AproposComponent},
  {path: 'lancement', component: LancementComponent},
  {path: '', redirectTo: '/accueil', pathMatch: 'full'},
  {path: 'accueil', component: AcceuilComponent},
  {path: '**', component: PageNotFoundComponent},

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
// tslint:disable-next-line:max-line-length
export const routingComponents = [QuizFormComponent, QuizListComponent, EditQuizComponent, QuestionListComponent, QuestionFormComponent, PageNotFoundComponent, AcceuilComponent, AproposComponent];
