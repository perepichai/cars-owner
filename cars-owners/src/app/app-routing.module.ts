import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnerComponent } from './core/components/owners/owner/owner.component';
import { OwnersComponent } from './core/components/owners/owners.component';

const routes: Routes = [
  { path: '', component: OwnersComponent },
  {
    path: 'owner',
    component: OwnerComponent,
    // loadChildren: () => import('./core/modules/details/details.module').then(m => m.DetailsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
