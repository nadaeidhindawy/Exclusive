import { HomeComponent } from './components/home/home.component';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './core/guards/auth.guard';
import { logedGuard } from './core/guards/loged.guard';
import { ForgetComponent } from './components/forget/forget.component';


export const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, canActivate: [logedGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forget', component: ForgetComponent }
    ]
  },
  {
    path: '', component: BlankLayoutComponent, canActivate: [authGuard], children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'cart', loadComponent: () => import('./components/cart/cart.component').then((c) => c.CartComponent) },
      { path: 'product', loadComponent: () => import('./components/product/product.component').then((c) => c.ProductComponent) },
      { path: 'brands', loadComponent: () => import('./components/brands/brands.component').then((c) => c.BrandsComponent) },
      { path: 'categories', loadComponent: () => import('./components/categories/categories.component').then((c) => c.CategoriesComponent) },
      { path: 'details/:id', loadComponent: () => import('./components/details/details.component').then((c) => c.DetailsComponent) },
      { path: 'allorders', loadComponent: () => import('./components/allorders/allorders.component').then((c) => c.AllordersComponent) },
      { path: 'order/:id', loadComponent: () => import('./components/orders/order.component').then((c) => c.OrderComponent) },
      { path: 'detailsCat/:id', loadComponent: () => import('./components/details-cat/details-cat.component').then((c) => c.DetailsCatComponent) },
      { path: 'brand', loadComponent: () => import('./components/brands/brands.component').then((c) => c.BrandsComponent) },
      { path: 'detailsBrand/:id', loadComponent: () => import('./components/details-brand/details-brand.component').then((c) => c.DetailsBrandComponent) },
      { path: 'wish', loadComponent: () => import('./components/wish/wish.component').then((c) => c.WishComponent) },
    ]
  },
  { path: '**', component: NotfoundComponent }
];
