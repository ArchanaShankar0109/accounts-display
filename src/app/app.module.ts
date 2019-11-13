import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { BankAccountsComponent } from "./components/bank-accounts/bank-accounts.component";
import { AppRoutingModule } from "./app-routing.module";
import { AccountsProvider } from "./interceptor/http-interceptor";
import { HttpClientModule } from "@angular/common/http";
import { AccordionModule, ButtonsModule } from "ngx-bootstrap";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { TopupwithdrawComponent } from './components/bank-accounts/topupwithdraw/topupwithdraw.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    AccordionModule.forRoot(),
    BrowserAnimationsModule,
    ButtonsModule
  ],
  declarations: [
    AppComponent,
    BankAccountsComponent,
    HeaderComponent,
    FooterComponent,
    TopupwithdrawComponent
  ],
  bootstrap: [AppComponent],
  providers: [AccountsProvider]
})
export class AppModule {}
