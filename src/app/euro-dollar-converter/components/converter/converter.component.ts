import { Component, OnInit } from '@angular/core';
import { History } from '../../history';

export enum RateType {
  fixed = "fixedRate",
  real = "realRate",
}

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {

  exchangeRate = 1.1;
  fixedRate: number;
  fixedRateActive = false;
  initialExchangeRate = 1.1;
  fromAmount = 1;
  convertedAmount = this.fromAmount * this.exchangeRate;
  isEuroToUsd = true;

  history: History[] = [];
  historyData: History[] = [];

  ngOnInit() {
    setInterval(this.updateExchangeRate.bind(this), 3000);
  }

  updateExchangeRate() {
    const randomChange = (Math.random() * 0.1 - 0.05) * this.initialExchangeRate;
    this.exchangeRate = this.initialExchangeRate + randomChange;

    if (this.fixedRateActive && this.fixedRate) {
      const rateDifference = Math.abs(this.exchangeRate - this.fixedRate);
      const rateDifferencePercentage = (rateDifference / this.exchangeRate) * 100;
      if (rateDifferencePercentage > 2) {
        this.fixedRateActive = false;
      }
      else {
        this.convertedAmount = this.isEuroToUsd ? this.fromAmount * this.fixedRate : this.fromAmount / this.fixedRate;
        this.addToHistory(RateType?.fixed);
        return;
      }
    }
    this.updateConversion();
  }

  updateConversion() {
    this.convertedAmount = this.isEuroToUsd ? this.fromAmount * this.exchangeRate : this.fromAmount / this.exchangeRate;
    this.addToHistory();
  }

  switchConversion() {
    this.isEuroToUsd = !this.isEuroToUsd;
    this.updateConversion();
  }

  addToHistory(type?: any) {

    const fromCurrency = this.isEuroToUsd ? '€' : '$';
    const toCurrency = this.isEuroToUsd ? '$' : '€';

    const historyItem: History = {
      realRate: this.exchangeRate,
      userRate: type && type == RateType?.fixed ? this.fixedRate : this.exchangeRate,
      initialAmount: this.fromAmount,
      convertedAmount: this.convertedAmount,
      fromCurrency,
      toCurrency,
    };

    this.history.unshift(historyItem);

    if (this.history.length > 5) {
      this.history.pop();
    }

    this.historyData = [...this.history]

  }

  toggleFixedRate() {
    this.fixedRateActive = !this.fixedRateActive;
    this.updateConversion();
  }
}
