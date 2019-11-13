import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankAccountsComponent } from './components/bank-accounts/bank-accounts.component';
import { TopupwithdrawComponent } from './components/bank-accounts/topupwithdraw/topupwithdraw.component';

const routes: Routes = [
  {
    path : "",
    redirectTo : "789654/accounts",
    pathMatch : "full"
  },
  {
    path : "789654/accounts",
    component : BankAccountsComponent
  },
  {
    path : "789654/accounts/:accountNo/topup",
    component : TopupwithdrawComponent
  },
  {
    path : "789654/accounts/:accountNo/withdraw",
    component : TopupwithdrawComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }