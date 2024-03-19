import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsOverviewComponent } from './products-overview/products-overview.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UpdateCompanyInfoComponent } from './update-company-info/update-company-info.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/products-overview',
    pathMatch: 'full',
  },
  {
    path: 'products-overview',
    component: ProductsOverviewComponent,
  },
  {
    path: 'product-details/:id',
    component: ProductDetailsComponent,
  },
  {
    path: 'update-company/:idProd/:idCom',
    component: UpdateCompanyInfoComponent,
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
