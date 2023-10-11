import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { History } from '../../history';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {

  exchangeRate: number = 1.1;
  fixedRate: number;
  fixedRateActive: boolean = false;
  initialExchangeRate: number = 1.1;
  fromAmount: number = 1;
  convertedAmount: number = this.fromAmount * this.exchangeRate;
  isEuroToUsd: boolean = true;

  displayedColumns: string[] = ['realRate', 'userRate', 'initialAmount', 'convertedAmount'];
  dataSource = new MatTableDataSource<History>();
  history: History[] = [];

  ngOnInit() {
    setInterval(() => {
      const randomChange = (Math.random() * 0.1 - 0.05) * this.initialExchangeRate;
      this.exchangeRate = this.initialExchangeRate + randomChange;
      if (this.fixedRateActive && this.fixedRate) {
        const rateDifference = Math.abs(this.exchangeRate - this.fixedRate);
        const rateDifferencePercentage = (rateDifference / this.exchangeRate) * 100;
        if (rateDifferencePercentage > 2) {
          this.fixedRateActive = false;
        }
      }
      this.updateConversion();
    }, 3000);
  }

  updateConversion() {
    if (this.isEuroToUsd) {
      this.convertedAmount = this.fromAmount * this.exchangeRate;
    } else {
      this.convertedAmount = this.fromAmount / this.exchangeRate;
    }
    this.addToHistory();
  }

  switchConversion() {
    this.isEuroToUsd = !this.isEuroToUsd;
    this.updateConversion();
  }

  addToHistory() {

    const historyItem: History = {
      realRate: this.exchangeRate,
      userRate: this.exchangeRate,
      initialAmount: this.fromAmount,
      convertedAmount: this.convertedAmount,
      fromCurrency: this.isEuroToUsd ? '€' : '$',
      toCurrency: this.isEuroToUsd ? '$' : '€'
    };

    this.history.unshift(historyItem);

    if (this.history.length > 5) {
      this.history.pop();
    }

    this.dataSource = new MatTableDataSource<any>(this.history);

  }

  toggleFixedRate() {
    this.fixedRateActive = !this.fixedRateActive;

    this.updateConversion();
  }
}
