import { Component } from "@angular/core";

import * as L from "leaflet";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {

  constructor() {}

  welcomeMessage = "Hello! Please choose the place !";
  currentDate = new Date();
  copyright = " Copyright " + this.currentDate.getFullYear().toString();

  map;

  markerIconOne = new L.LayerGroup();
  thePlaceMarker = new L.LayerGroup();
  theHomeMarker = new L.LayerGroup();

  x: string = "48.8725";
  y: string = "2.3577";

  popup = L.popup();

  markerIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",

    iconSize: [38, 65], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
  });

  /*
   * Init the home component
   */
  ngOnInit(): void {
    // the map
    this.map = L.map("map", {
      center: [this.x, this.y],
      zoom: 12
    });

    // the map layer
    const tiles = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }
    );

    // init map
    tiles.addTo(this.map);

    // on map click
    this.map.on("click", e => {
      this.popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(this.map);
      this.x = e.latlng.lat;
      this.y = e.latlng.lng;

      this.map.removeLayer(this.thePlaceMarker);

      this.thePlaceMarker = new L.LayerGroup();

      this.thePlaceMarker = L.marker([this.x, this.y], {
        icon: this.markerIcon
      })
        .addTo(this.map)
        .bindPopup("<b>Hello world!</b><br />This is my place.")
        .openPopup();
    });

    // refresh map
    this.map.panTo(new L.LatLng(this.x, this.y));
  }
}
