<template>
  <div id="map" class="h-100 w-100"></div>
  <modal-window id="loadPoint" :footer="false">
    <template v-slot:body>
      <h5>Подождите идёт загрузка данных...</h5>
      <div class="progress mt-3" role="progressbar" aria-label="Example with label" aria-valuenow="10" aria-valuemin="0"
           aria-valuemax="100">
        <div ref="progress" class="progress-bar overflow-visible text-dark" style="width: 0%">{{ progressText }}
        </div>
      </div>
    </template>
  </modal-window>
</template>

<script>
import {Modal} from 'bootstrap'
import L from 'leaflet'  //Импортируем библиотеку leaflet
import 'leaflet/dist/leaflet.css' //Импортируем CSS, без него не заработает
import 'leaflet-easybutton/src/easy-button.css'
import 'leaflet-easybutton/src/easy-button.js'
import 'leaflet-easybutton/src/easy-button.d.ts'
import 'font-awesome/css/font-awesome.css'
import 'leaflet.markercluster/dist/leaflet.markercluster.js'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import LPolylineMeasure from 'leaflet.polylinemeasure'
import 'leaflet.polylinemeasure/Leaflet.PolylineMeasure.css'
import ModalWindow from "./ModalWindow.vue";
import Spinner from "./Spinner.vue";

export default {
  name: "MapWithFunc",
  components: {Spinner, ModalWindow},
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
    isClustering: {
      type: Boolean,
      default: false
    },
    isDragging: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      L: L,
      map: null,
      tileLayer: null,
      markers: [],
      clust: null,
      progressText: '',
      madalProgress: null,
    }
  },
  mounted() {
    this.initMap();
    this.madalProgress = new Modal('#loadPoint')
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
        if (this.isClustering) {
          this.deleteClustMarkers()
        } else {
          this.deleteMarkers()
        }
      }
      this.$emit("update:points", this.markers)
    },
    markerForDelete(val, oldVal) {
      if (val !== 0) {
        if (this.isClustering) {
          this.deleteClustMarkers(val)
        } else {
          this.deleteMarkers(val)
        }
      }
      this.$emit("update:points", this.markers)
      this.$emit("update:markersForDelete", 0)
    },

    isClustering(val, oldVal) {
      if (val) {
        var progressBar = this.$refs.progress;
        let self = this

        function updateProgressBar(processed, total, elapsed, layersArray) {
          if (elapsed > 1000) {
            self.madalProgress.show()
            self.progressText = 'Загружено: '.concat(processed).concat('/').concat(total)
            progressBar.style.width = Math.round(processed / total * 100) + '%';
          }
          if (processed === total) {
            self.madalProgress.hide()
          }
        }
        this.clust = this.L.markerClusterGroup({
          chunkedLoading: true,
          chunkProgress: updateProgressBar
        })
        for (const marker of this.markers) {
          this.clust.addLayer(marker.marker)
        }
        this.deleteMarkers(null, true)
        this.map.addLayer(this.clust)
      } else {
        this.map.removeLayer(this.clust)
        this.showMarkersList(this.markers)
      }
    },
    centerMap(val, oldVal) {
      this.map.panTo(val)
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
      let marker = this.L.marker([this.map.getCenter().lat, this.map.getCenter().lng], {draggable: this.isDragging}).on('click', this.clickMarker)
      let objMarker = {
        'marker': marker,
        'markerId': null,
        'source': 'add',
        'remark': '',
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
      if (this.isClustering) {
        let mark = markers.map(marker => {
          return marker.marker
        })
        this.clust.addLayers(mark)
      } else {
        for (const marker of markers) {
          marker.marker.addTo(this.map)
        }
      }
    },
    showMarker(marker) {
      if (this.isClustering) {
        this.clust.addLayer(marker)
        return
      }
      marker.addTo(this.map)
    },
    deleteMarkers(markerId = null, deleteLayer = false) {
      if (markerId === null) {
        for (const marker of this.markers) {
          this.map.removeLayer(marker.marker)
        }
        if (deleteLayer) {
          return;
        }
        this.markers = []
        return
      }
      const indexMarker = this.markers.findIndex(x => x.markerId === markerId)
      this.map.removeLayer(this.markers[indexMarker].marker)
      if (deleteLayer) {
        return;
      }
      this.markers.splice(indexMarker, 1)
    },
    deleteClustMarkers(markerId = null, deleteLayer = false) {
      if (markerId === null) {
        this.clust.clearLayers()
        if (deleteLayer) {
          return;
        }
        this.markers = []
        return
      }
      const indexMarker = this.markers.findIndex(x => x.markerId === markerId)
      this.clust.removeLayer(this.markers[indexMarker].marker)
      if (deleteLayer) {
        return;
      }
      this.markers.splice(indexMarker, 1)
    },
  }

}
</script>

<style scoped>

</style>