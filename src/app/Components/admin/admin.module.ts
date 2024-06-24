import { NgModule } from "@angular/core";
import { DashboaredComponent } from "./dashboared/dashboared.component";
import { SidebarComponent } from "./Sidebar/sidebar/sidebar.component";
import { CategoryComponent } from "./Categories/category/category.component";
import { adminRoutingModule } from "./admin-routing.module";
import { RouterModule, RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";
import { UsersComponent } from './users/users.component';
import {MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatListModule} from '@angular/material/list';
@NgModule({
declarations:[
    DashboaredComponent,
    SidebarComponent,
    CategoryComponent,
    UsersComponent
],
imports:[
    adminRoutingModule,
    RouterModule,
    CommonModule,
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule
]
})


export class adminModule{}