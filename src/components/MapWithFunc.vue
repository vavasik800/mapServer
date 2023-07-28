<template>
  <div id="map" class="h-100 w-100"></div>
</template>

<script>
import L from 'leaflet'  //Импортируем библиотеку leaflet
import 'leaflet/dist/leaflet.css' //Импортируем CSS, без него не заработает

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
    }

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
        this.showMarkers(this.markers)
      }
      else {
       this.deleteMarkers()
      }
    }
  },
  methods: {
    initMap() {
      this.map = L.map('map').setView(this.centerMap, 5);
      this.tileLayer = L.tileLayer(this.serverMapUrl, {
        maxZoom: 19,
      })
      this.tileLayer.addTo(this.map);
    },
    calculatedListMarkers(dateForWork) {
      for (const indexRow in dateForWork) {
        let marker = this.L.marker([dateForWork[indexRow].lat, dateForWork[indexRow].lon], {draggable: true})
        let objMarker = {
          'marker': marker,
          'markerId': 1000 + indexRow,
          'source': 'data'
        }
        this.markers.push(objMarker)
      }
    },
    showMarkers(markers) {
      for (const marker of markers) {
        marker.marker.addTo(this.map)
      }
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