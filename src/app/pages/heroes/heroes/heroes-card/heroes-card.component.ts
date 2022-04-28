import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-heroes-card',
  templateUrl: './heroes-card.component.html',
  styleUrls: ['./heroes-card.component.scss']
})
export class HeroesCardComponent implements OnInit {

  @Input() public heroesList: any;
  @Input() public isSearch: boolean = false;
  @Output() public heroId: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }


  readMore(herosId: number) {
    this.heroId.emit(herosId);
  }

}
