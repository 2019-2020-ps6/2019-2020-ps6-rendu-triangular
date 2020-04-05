import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { QuizComponent } from './quizzes/quiz/quiz.component';
import { HeaderComponent } from './header/header.component';
import { QuestionListComponent } from './questions/question-list/question-list.component';
import { QuestionFormComponent } from './questions/question-form/question-form.component';
import { QuestionComponent } from './questions/question/question.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import {RouterModule} from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { MainContentComponent } from './main/main-content/main-content.component';
import { AcceuilComponent } from './main/acceuil/acceuil.component';
import { LancementComponent } from './main/lancement/lancement.component';
import { AproposComponent } from './main/apropos/apropos.component';
import { PageNotFoundComponent } from './main/page-not-found/page-not-found.component';
import { ModifyQuizComponent } from './quizzes/modify-quiz/modify-quiz.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


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
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
