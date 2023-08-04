<template>
  <div id="map" class="h-100 w-100"></div>
</template>

<script>
import L from 'leaflet'  //Импортируем библиотеку leaflet
import 'leaflet/dist/leaflet.css' //Импортируем CSS, без него не заработает
import 'leaflet-easybutton/src/easy-button.css'
import 'leaflet-easybutton/src/easy-button.js'
import 'leaflet-easybutton/src/easy-button.d.ts'
import 'font-awesome/css/font-awesome.css'
import LPolylineMeasure from 'leaflet.polylinemeasure'
import 'leaflet.polylinemeasure/Leaflet.PolylineMeasure.css'

export default {
  name: "MapWithFunc",
  props: {
    serverMapUrl: {
      type: String,
      default: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    },
    centerMap: {
      type: Object
    },
    dataForMap: {
      type: Array,
      default: []
    },
    markerForDelete: {
      type: Number,
      default: 0
    },
    points: {
      type: Array,
      default: []
    },
    activeMarkerId: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      L: L,
      map: null,
      tileLayer: null,
      markers: [],
    }
  },
  mounted() {
    this.initMap();
  },
  watch: {
    dataForMap(val, oldVal) {
      if (val.length !== 0) {
        this.calculatedListMarkers(val)
        this.showMarkersList(this.markers)
        for (var marker of this.markers) {
          marker.markerId = marker.marker._leaflet_id
        }
      } else {
        this.deleteMarkers()
      }
      this.$emit("update:points", this.markers)
    },
    markerForDelete(val, oldVal) {
      console.log('Delete in Map')
      console.log(this.markers)
      if (val !== 0) {
        this.deleteMarkers(val)
      }
      console.log(this.markers)
      this.$emit("update:points", this.markers)
      this.$emit("update:markersForDelete", 0)
    },
  },
  methods: {
    initMap() {
      this.map = L.map('map').setView(this.centerMap, 4);
      this.tileLayer = L.tileLayer(this.serverMapUrl, {
        maxZoom: 19,
      })
      this.tileLayer.addTo(this.map)
      var toggle = L.easyButton({
        states: [{
          icon: 'fa-map-marker',
          title: 'Добавить маркер',
          onClick: this.addMarker,
        }]
      });
      toggle.addTo(this.map);

    },
    clickMarker(event) {
      this.$emit("clickOnMarker", event.target._leaflet_id)

    },
    addMarker() {
      let marker = this.L.marker([this.map.getCenter().lat, this.map.getCenter().lng], {draggable: true}).on('click', this.clickMarker)
      let objMarker = {
        'marker': marker,
        'markerId': null,
        'source': 'add',
        'remark': 'sssss',
        'style': '',
      }
      this.markers.push(objMarker)
      this.showMarker(this.markers.at(-1).marker)
      // Добавление айди макркера
      this.markers.at(-1).markerId = this.markers.at(-1).marker._leaflet_id
      this.$emit("update:points", this.markers)
    },
    calculatedListMarkers(dateForWork) {
      for (const indexRow in dateForWork) {
        let marker = this.L.marker([dateForWork[indexRow].lat, dateForWork[indexRow].lon], {draggable: true}).on('click', this.clickMarker)
        let objMarker = {
          'marker': marker,
          'markerId': null,
          'source': 'data',
          'remark': dateForWork[indexRow].comment,
          'style': '',
        }
        this.markers.push(objMarker)
      }
    },
    showMarkersList(markers) {
      for (const marker of markers) {
        marker.marker.addTo(this.map)
      }
    },
    showMarker(marker) {
      marker.addTo(this.map)
    },
    deleteMarkers(markerId = null) {
      if (markerId === null) {
        for (const marker of this.markers) {
          this.map.removeLayer(marker.marker)
        }
        this.markers = []
        return
      }
      const indexMarker = this.markers.findIndex(x => x.markerId === markerId)
      this.map.removeLayer(this.markers[indexMarker].marker)
      this.markers.splice(indexMarker, 1)
    },
  }

}
</script>

<style scoped>

</style>