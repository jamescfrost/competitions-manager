import { DefaultComponent } from './default/default.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component'
import { RegisterComponent } from './register/register.component'
import { CompetitionsComponent } from './competitions/competitions.component';
import { CompetitionEditorComponent } from './competition-editor/competition-editor.component';
import { AuthGuard } from './guards/auth.guard';

// Define the routes
export const routes = [
  {
    path: '',
    component: DefaultComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
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
