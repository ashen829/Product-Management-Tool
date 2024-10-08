import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrl: './star.component.scss'
})

export class StarComponent implements OnChanges{
  @Input() rating : number = 0;
  cropWidth : number = 75;

  @Output() ratingClicked : EventEmitter<string> = 
                    new EventEmitter<string>();

  ngOnChanges(): void {
    this.cropWidth = this.rating * 75/5;    
  }

  onClick():void{
    this.ratingClicked.emit(`The rating ${this.rating} was clicked!`)
  }
}
