import { Component, Input } from "@angular/core";

@Component({
  selector: 'valoration-stars',
  templateUrl: 'valoration-stars.html',
})
export class ValorationStarsComponent {
  @Input() valoration: number = Math.floor(Math.random() * 100);
  @Input() starsNumber: number = 5;
  @Input() starSize: number = 20;
  @Input() color: string = "#ffaf1d";
  @Input() fontSize: string = "25px";

  stars: Array < string > = [];
  constructor() {}
  ngOnInit() {
    this.printStars(this.starsNumber, this.starSize);
  }
  printStars(starsNumber, starSize) {
    let end = starSize;
    let valoration = this.valoration + 1;
    if (starSize <= 1) {
      valoration = this.valoration;
    }
    let initStar = 0;
    for (let idx = 1; idx <= starsNumber; idx++) {
      let finishStar = idx * end;
      if (starSize <= 1) {
        initStar = finishStar - (starSize - 0.001);
      } else {
        initStar = finishStar - (starSize - 1);
      }
      let middleStar = finishStar - (starSize / 2);
      if (valoration >= finishStar) {
        this.stars.push("md-star");
      } else if ((valoration >= initStar && valoration < middleStar) || (valoration < initStar)) {
        this.stars.push("md-star-outline");
      } else if (valoration >= middleStar && valoration < finishStar) {
        this.stars.push("md-star-half");
      }
    }
  }
}

