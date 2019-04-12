import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from "./login-page/login-page.component";
import {AuthLayoutComponent} from "./shared/layouts/auth-layout/auth-layout.component";
import {SiteLayoutComponent} from "./shared/layouts/site-layout/site-layout.component";

const routes: Routes = [
    {
        path: '',
        component: AuthLayoutComponent,
        children:[
            {path: 'login', component: LoginPageComponent}
        ]
    },
    {
        path: '',
        component: SiteLayoutComponent,
        children:[
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
