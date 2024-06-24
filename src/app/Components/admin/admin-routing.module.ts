import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboaredComponent } from "./dashboared/dashboared.component";
import { CategoryComponent } from "./Categories/category/category.component";
import { UsersComponent } from "./users/users.component";

const routes: Routes = [
  {
    path: 'dash', component: DashboaredComponent,
    children:[
      { path: 'categories', component: CategoryComponent },
      {path:'users',component:UsersComponent}
    ]}
];


@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
 })
export class adminRoutingModule{}