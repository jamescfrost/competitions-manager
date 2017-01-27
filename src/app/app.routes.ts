import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'
import { CompetitionsComponent } from './competitions/competitions.component';
import { CompetitionEditorComponent } from './competition-editor/competition-editor.component';
import { AuthGuard } from './guards/auth.guard';

// Define the routes
export const routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'competitions',
    component: CompetitionsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'competition-editor/:id',
    component: CompetitionEditorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '',
  }

];
