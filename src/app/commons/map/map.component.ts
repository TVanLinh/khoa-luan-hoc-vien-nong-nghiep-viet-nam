import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  lat: number = 21.004436;
  lng: number = 105.933012;
  constructor() { }

  ngOnInit() {
  }

}
