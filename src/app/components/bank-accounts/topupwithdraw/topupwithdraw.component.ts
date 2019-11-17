import { Component, OnInit } from "@angular/core";
import { AccountService } from "src/app/services/account.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-topupwithdraw",
  templateUrl: "./topupwithdraw.component.html",
  styleUrls: ["./topupwithdraw.component.scss"]
})
export class TopupwithdrawComponent implements OnInit {
  keys = Object.keys;
  accountDetails;
  inputValue;
  currentPage;
  accountBalance;
  maxWithdrawal;
  messages = {
    success: "",
    error: "",
    warningMessage: ""
  };

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit() {
    this.accountDetails = history.state.accountDetails;
    if (this.accountDetails === undefined) {
      let accountNo = this.router.url.split("/")[3];
      accountNo &&
        this.accountService.getBankAccounts().subscribe(data => {
          this.accountDetails = data.filter(
            account => account.accountNumber === accountNo
          )[0];
        });
        this.updateDetails();
    }
    this.updateDetails();
  }

  updateDetails(){
    this.currentPage = this.router.url.split("/")[4] === "topup" ? "topup" : "withdraw";
    this.messages.warningMessage = this.currentPage === "topup" ? "Minimum topup value is 500" : "";
    if(this.accountDetails){
      this.accountBalance = this.accountDetails.balance;
      this.maxWithdrawal = (this.accountDetails.accountType === "CHECKING" && this.currentPage === "withdraw")
          ? this.accountDetails.balance + (this.accountDetails.overdraft && this.accountDetails.overdraft)
          : this.accountDetails && this.accountDetails.balance;
      console.log(this.maxWithdrawal);
    }
  }

  updateAccount($event) {
    if (this.currentPage === "topup") {
      if ($event >= 500) {
        this.accountDetails.balance += $event;
      }
    } else {
      if ($event) {
        if ($event > this.accountDetails.balance) {
          this.messages.warningMessage = "The account is in overdraft";
        }
        this.accountDetails.balance -= $event;
      } else {
        this.messages.warningMessage = "";
        this.accountDetails.balance = this.accountBalance;
      }
    }
  }

  submit(account) {
    this.accountService.updateBalance(account, this.currentPage).subscribe(
      result => {
        this.inputValue = "";
        this.messages.success = result;
      },
      error => {
        this.messages.error = error;
      }
    );
  }

  buttonState() {
    if (this.currentPage === "topup") {
      return this.inputValue === undefined || this.inputValue <= 500;
    } else {
      return (
        this.inputValue === undefined || this.inputValue >= this.maxWithdrawal
      );
    }
  }
}
