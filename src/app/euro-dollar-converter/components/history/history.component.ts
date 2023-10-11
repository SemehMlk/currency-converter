import { Component, Input } from '@angular/core';
import { History } from '../../history';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
  @Input() history: History[] = [];

  displayedColumns: string[] = ['realRate', 'userRate', 'initialAmount', 'convertedAmount'];

}
