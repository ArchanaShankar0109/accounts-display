import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { isDevMode } from "@angular/core";
import { AccountService } from "src/app/services/account.service";

@Component({
  selector: "app-bank-accounts",
  templateUrl: "./bank-accounts.component.html",
  styleUrls: ["./bank-accounts.component.scss"],
  encapsulation : ViewEncapsulation.None
})
export class BankAccountsComponent implements OnInit {
  constructor(private accountService: AccountService) {}
  accountDetails;
  accountNo;

  ngOnInit() {
    console.log(isDevMode());
    this.accountService.getBankAccounts().subscribe(data => {
      console.log(data, "data");
      this.accountDetails = data;
    });
  }

  accountSelection(account){
    console.log(account , 'account ::');
    this.accountNo = account;
  }

}
