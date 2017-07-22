import {Component, OnInit} from "@angular/core";

@Component({
  selector: '[app-slider-banner]',
  templateUrl: './slider-banner.component.html',
  styleUrls: ['../sliders.component.css']
})
export class SliderBannerComponent implements OnInit {
  images = ["../../../assets/images/slide/slid1.png",
    "../../../assets/images/slide/slid1.png",
    "../../../assets/images/slide/slid1.png",
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
