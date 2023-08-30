<template>
  <body class="d-flex flex-column min-vh-100">
  <header>
    <Header name-program="PointXY"
            path-img="../public/favicon.ico">
      <template #right-navbar>
        <ul class="nav-navbar nav">
          <li class="nav-item">
            <a class="navbar-brand row" data-bs-toggle="offcanvas" href="#settings" role="button"
               aria-controls="settings">
              <p class="col p-0 text-center fs-6 m-0">Настройки</p>
              <font-awesome-icon icon="fa-solid fa-gear" class="col p-1"/>
            </a>
          </li>
        </ul>
      </template>
    </Header>
    <!--    Настройки карты-->
    <div class="offcanvas offcanvas-end" tabindex="-1" id="settings" aria-labelledby="settingsLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="settingsLabel">Настройки</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <div class="container text-left">
          <div class="row">
            <div class="col">
              <span class="align-baseline">Режим</span>
            </div>
            <div class="col">
              <select class="form-select" aria-label="Выбор режима" v-model="selectValue">
                <option v-for="option in options" :value="option.value" :selected="option.selected">
                  {{ option.text }}
                </option>
              </select>
            </div>
          </div>
          <hr/>
          <div class="row">
            <div class="col">
              <p>Загрузка файла с точками</p>
              <FileReader @load="textFromFile = $event"
                          v-model:is-file="isFile"></FileReader>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <button type="button"
                      class="btn btn-outline-primary btn-sm"
                      :disabled="textFromFile === ''"
                      @click="readFile">
                Прочитать файл
                <font-awesome-icon icon="fa-solid fa-file-import" class="col"/>
                <spinner v-if="isReadFile" color="primary"
                         size="sm" class="ms-1"/>
              </button>
            </div>
            <div class="col d-flex justify-content-end">
              <button type="button"
                      class="btn btn-outline-danger btn-sm"
                      :disabled="pointMarkers.length === 0 "
                      @click="deleteData"
              >
                Удалить данные
                <font-awesome-icon icon="fa-solid fa-trash-can"/>
              </button>
            </div>
          </div>

          <hr/>
          <div class="row">
            <div class="col">
              <span class="align-baseline">Кластеризация точек</span>
            </div>
            <div class="col">
              <div class="form-check form-switch d-flex">
                <input class="form-check-input ms-auto"
                       type="checkbox"
                       role="switch"
                       id="flexSwitchCheckDefault"
                       v-model="isClustering"
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>

  <content>
    <!--    Кнопочная панель управления картой-->
    <div class="row m-3">
      <div class="col">
        <div class="btn-toolbar" role="toolbar">
          <div class="btn-group btn-group-sm" role="group">
            <button type="button" class="btn btn-outline-success n"
                    disabled
                    title="Сортировка списка дней">
              <font-awesome-icon icon="fa-solid fa-arrow-down-wide-short"/>
            </button>
            <button type="button" class="btn btn-outline-success ml-0"
                    disabled
                    title="Откат до изначальных данных">
              <font-awesome-icon icon="fa-solid fa-arrows-rotate"/>
            </button>
            <button type="button" class="btn btn-outline-success ml-0"
                    title="Следующие отбитие на выделенном маркере"
                    disabled
            >
              <font-awesome-icon icon="fa-solid fa-arrow-down"/>
            </button>
            <button type="button"
                    class="btn btn-outline-success ml-0"
                    title="Свернуть информацию"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse"
                    aria-expanded="false"
                    aria-controls="collapse"
                    @click="changeCollapse"
            >
              <font-awesome-icon icon="fa-solid fa-map-location-dot"/>
            </button>
          </div>
          <div class="btn-group btn-group-sm mx-2 d-inline-block" role="group">
            <button type="button"
                    class="btn btn-outline-info ml-0"
                    :title="isArrowHeads? 'Отключить наконечники линий' : 'Включить наконечники линий'"
                    disabled
                    @click="isArrowHeads = !isArrowHeads">
              <font-awesome-icon v-if="isArrowHeads" icon="fa-solid fa-arrow-right"/>
              <font-awesome-icon v-else icon="fa-solid fa-minus"/>
            </button>
            <button type="button"
                    class="btn btn-outline-info ml-0"
                    :title="isDraggable ? 'Отключить движение маркеров' : 'Включить движение маркеров'"
                    @click="draggableMarker"
                    :disabled="pointMarkers.length === 0"
            >
              <font-awesome-icon icon="fa-solid fa-location-dot" class="mx-1"/>
              <font-awesome-icon v-if="isDraggable" icon="fa-solid fa-wind"/>
            </button>
            <button type="button"
                    class="btn btn-outline-info d-inline-flex align-items-center h-100 "
                    :title="isPolyline ? 'Отключить линии' : 'Включить линии'"
                    @click="isPolyline = !isPolyline"
                    disabled
                    style="max-width: 40%"
            >
              <font-awesome-icon icon="fa-solid fa-arrow-trend-up" class="me-1 align-middle"/>
              <font-awesome-icon v-if="isPolyline" icon="fa-solid fa-check" class="me-3"/>
              <font-awesome-icon v-else icon="fa-solid fa-xmark" class="me-3"/>
            </button>
          </div>
        </div>
      </div>
      <div class="col p-0 d-flex justify-content-end">
        <div class="btn-toolbar mb-1 mt-0">
          <button type="button"
                  class="btn btn-outline-success btn-sm ml-0"
                  data-bs-toggle="modal"
                  :disabled="pointMarkers.length === 0"
                  data-bs-target="#downloadPoint">
            Выгрузить маршрут
            <font-awesome-icon icon="fa-solid fa-cloud-arrow-down"/>
          </button>
          <modal-window id="downloadPoint"
                        header="Выгрузка точек"
                        text-body="Вы действительно хотите выгрузить все точки в файл?"
                        img-body="city-maps.png"
                        title-ok-button="Выгрузить"
                        @click-ok="writeFile"/>
          <button type="button"
                  disabled
                  class="btn btn-outline-info btn-sm ms-4">
            Справка
            <font-awesome-icon icon="fa-regular fa-circle-question"/>
          </button>
        </div>
      </div>
    </div>
    <!--    Карточка с маршрутами и картой-->
    <div class="card m-3 text-dark bg-light border-light shadow" style="height: auto">
      <div class="card-body">
        <div class="row" style="height: 85vh">
          <div v-if="selectValue === 2" class="col-1 " style="max-height: 95%">
            <h5>Список дней</h5>
            <div class="overflow-auto p-0 h-100">
              <div class="m-0">
                <div class="tab-content">
                  <button type="button" class="btn btn-outline-secondary mb-1 text-lg-left">10-07-2023</button>
                </div>
              </div>
              <div>
                <div class="tab-content">
                  <button type="button" class="btn btn-outline-secondary mb-1 text-lg-left">10-07-2023</button>
                </div>
              </div>
              <div>
                <div class="tab-content">
                  <button type="button" class="btn btn-outline-secondary mb-1 text-lg-left">10-07-2023</button>
                </div>
              </div>
              <div>
                <div class="tab-content">
                  <button type="button" class="btn btn-outline-secondary mb-1 text-lg-left">10-07-2023</button>
                </div>
              </div>
              <div>
                <div class="tab-content">
                  <button type="button" class="btn btn-outline-secondary mb-1 text-lg-left">10-07-2023</button>
                </div>
              </div>
              <div>
                <div class="tab-content">
                  <button type="button" class="btn btn-outline-secondary mb-1 text-lg-left">10-07-2023</button>
                </div>
              </div>
              <div>
                <div class="tab-content">
                  <button type="button" class="btn btn-outline-secondary mb-1 text-lg-left">10-07-2023</button>
                </div>
              </div>
              <div>
                <div class="tab-content">
                  <button type="button" class="btn btn-outline-secondary mb-1 text-lg-left">10-07-2023</button>
                </div>
              </div>
              <div>
                <div class="tab-content">
                  <button type="button" class="btn btn-outline-secondary mb-1 text-lg-left">10-07-2023</button>
                </div>
              </div>
              <div>
                <div class="tab-content">
                  <button type="button" class="btn btn-outline-secondary mb-1 text-lg-left">10-07-2023</button>
                </div>
              </div>
              <div>
                <div class="tab-content">
                  <button type="button" class="btn btn-outline-secondary mb-1 text-lg-left">10-07-2023</button>
                </div>
              </div>
              <div>
                <div class="tab-content">
                  <button type="button" class="btn btn-outline-secondary mb-1 text-lg-left">10-07-2023</button>
                </div>
              </div>
              <div>
                <div class="tab-content">
                  <button type="button" class="btn btn-outline-secondary mb-1 text-lg-left">10-07-2023</button>
                </div>
              </div>
              <div>
                <div class="tab-content">
                  <button type="button" class="btn btn-outline-secondary mb-1 text-lg-left">10-07-2023</button>
                </div>
              </div>
              <div>
                <div class="tab-content">
                  <button type="button" class="btn btn-outline-secondary mb-1 text-lg-left">10-07-2023</button>
                </div>
              </div>
              <div>
                <div class="tab-content">
                  <button type="button" class="btn btn-outline-secondary mb-1 text-lg-left">10-07-2023</button>
                </div>
              </div>
              <div>
                <div class="tab-content">
                  <button type="button" class="btn btn-outline-secondary mb-1 text-lg-left">10-07-2023</button>
                </div>
              </div>
              <div>
                <div class="tab-content">
                  <button type="button" class="btn btn-outline-secondary mb-1 text-lg-left">10-07-2023</button>
                </div>
              </div>
              <div>
                <div class="tab-content">
                  <button type="button" class="btn btn-outline-secondary mb-1 text-lg-left">10-07-2023</button>
                </div>
              </div>
              <div>
                <div class="tab-content">
                  <button type="button" class="btn btn-outline-secondary mb-1 text-lg-left">10-07-2023</button>
                </div>
              </div>
              <div>
                <div class="tab-content">
                  <button type="button" class="btn btn-outline-secondary mb-1 text-lg-left">10-07-2023</button>
                </div>
              </div>
              <div>
                <div class="tab-content">
                  <button type="button" class="btn btn-outline-secondary mb-1 text-lg-left">10-07-2023</button>
                </div>
              </div>
              <div>
                <div class="tab-content">
                  <button type="button" class="btn btn-outline-secondary mb-1 text-lg-left">10-07-2023</button>
                </div>
              </div>
              <div>
                <div class="tab-content">
                  <button type="button" class="btn btn-outline-secondary mb-1 text-lg-left">10-07-2023</button>
                </div>
              </div>
              <div>
                <div class="tab-content">
                  <button type="button" class="btn btn-outline-secondary mb-1 text-lg-left">10-07-2023</button>
                </div>
              </div>
              <div>
                <div class="tab-content">
                  <button type="button" class="btn btn-outline-secondary mb-1 text-lg-left">10-07-2023</button>
                </div>
              </div>
              <div>
                <div class="tab-content">
                  <button type="button" class="btn btn-outline-secondary mb-1 text-lg-left">10-07-2023</button>
                </div>
              </div>
              <div>
                <div class="tab-content">
                  <button type="button" class="btn btn-outline-secondary mb-1 text-lg-left">10-07-2023</button>
                </div>
              </div>
              <div>
                <div class="tab-content">
                  <button type="button" class="btn btn-outline-secondary mb-1 text-lg-left">10-07-2023</button>
                </div>
              </div>
              <div>
                <div class="tab-content">
                  <button type="button" class="btn btn-outline-secondary mb-1 text-lg-left">10-07-2023</button>
                </div>
              </div>
              <div>
                <div class="tab-content">
                  <button type="button" class="btn btn-outline-secondary mb-1 text-lg-left">10-07-2023</button>
                </div>
              </div>
              <div>
                <div class="tab-content">
                  <button type="button" class="btn btn-outline-secondary mb-1 text-lg-left">10-07-2023</button>
                </div>
              </div>
              <div>
                <div class="tab-content">
                  <button type="button" class="btn btn-outline-secondary mb-1 text-lg-left">10-07-2023</button>
                </div>
              </div>
              <div>
                <div class="tab-content">
                  <button type="button" class="btn btn-outline-secondary mb-1 text-lg-left">10-07-2023</button>
                </div>
              </div>
              <div>
                <div class="tab-content">
                  <button type="button" class="btn btn-outline-secondary mb-1 text-lg-left">10-07-2023</button>
                </div>
              </div>
              <div>
                <div class="tab-content">
                  <button type="button" class="btn btn-outline-secondary mb-1 text-lg-left">10-07-2023</button>
                </div>
              </div>
              <div>
                <div class="tab-content">
                  <button type="button" class="btn btn-outline-secondary mb-1 text-lg-left">10-07-2023</button>
                </div>
              </div>
              <div>
                <div class="tab-content">
                  <button type="button" class="btn btn-outline-secondary mb-1 text-lg-left">10-07-2023</button>
                </div>
              </div>
              <div>
                <div class="tab-content">
                  <button type="button" class="btn btn-outline-secondary mb-1 text-lg-left">10-07-2023</button>
                </div>
              </div>
              <div>
                <div class="tab-content">
                  <button type="button" class="btn btn-outline-secondary mb-1 text-lg-left">10-07-2023</button>
                </div>
              </div>
              <div>
                <div class="tab-content">
                  <button type="button" class="btn btn-outline-secondary mb-1 text-lg-left">10-07-2023</button>
                </div>
              </div>
              <div>
                <div class="tab-content">
                  <button type="button" class="btn btn-outline-secondary mb-1 text-lg-left">10-07-2023</button>
                </div>
              </div>
              <div>
                <div class="tab-content">
                  <button type="button" class="btn btn-outline-secondary mb-1 text-lg-left">10-07-2023</button>
                </div>
              </div>
              <div>
                <div class="tab-content">
                  <button type="button" class="btn btn-outline-secondary mb-1 text-lg-left">10-07-2023</button>
                </div>
              </div>
              <div>
                <div class="tab-content">
                  <button type="button" class="btn btn-outline-secondary mb-1 text-lg-left">10-07-2023</button>
                </div>
              </div>
              <div>
                <div class="tab-content">
                  <button type="button" class="btn btn-outline-secondary mb-1 text-lg-left">10-07-2023</button>
                </div>
              </div>
              <div>
                <div class="tab-content">
                  <button type="button" class="btn btn-outline-secondary mb-1 text-lg-left">10-07-2023</button>
                </div>
              </div>
            </div>
          </div>
          <template v-if="isCollapse">
            <div class="col-2 collapse collapse-horizontal fade show" id="collapse" style="max-height: 95%">
              <h5 v-if="selectValue === 2">Маршрут</h5>
              <h5 v-else>Точки</h5>
              <div class="overflow-auto p-1 h-100" id="scrollPoints">
                <div v-for="(point, index) in pointMarkers" :key="index" class="m-0">
                  <card-for-point :point="point"
                                  :index-point="point.markerId"
                                  :custom-class="stylesPointMarkers[point.style]"
                                  @click="clickOnPoint(point.markerId)"
                                  @delete-point="deleteMarker($event)"
                  ></card-for-point>
                </div>
              </div>
            </div>
          </template>
          <div class="col">
            <map-with-func ref='map'
                           :center-map="center"
                           v-model:data-for-map="dataMap"
                           v-model:points="pointMarkers"
                           v-model:marker-for-delete="markerForDelete"
                           v-model:isClustering="isClustering"
                           :is-dragging="isDraggable"
                           :styles-marker="stylesMarkers"
                           @click-on-marker="clickOnMarker($event)"/>
          </div>
        </div>
      </div>
    </div>

  </content>
  <footer class="mt-auto">
    <div class="container-fluid d-flex justify-content-between">
      <p>
        RUSLAN_GOLD @ 2023
      </p>
      <p>
        Разработано с любовью
        <font-awesome-icon icon="fa-regular fa-heart" size="lg" style="color: #ff1100"/>
      </p>
    </div>
  </footer>
  </body>

</template>


<script>
import FileReader from "./components/FileReader.vue";
import Header from "./components/Header.vue";
import MapWithFunc from "./components/MapWithFunc.vue";
import CardForPoint from "./components/CardForPoint.vue";
import ModalWindow from "./components/ModalWindow.vue";
import Spinner from "@/components/Spinner.vue";

export default {
  name: 'App',
  data() {
    return {
      center: {lat: 54.8, lng: 21},
      isArrowHeads: true,
      isCollapse: true,
      isDraggable: true,
      isReadFile: false,
      isPolyline: true,
      isFile: false,
      selectValue: 1,
      options: [
        {value: 1, text: 'Точки', selected: true},
        {value: 2, text: 'Маршрут', selected: false},
      ],
      dataMap: [],
      markerForDelete: 0,
      textFromFile: '',
      pointMarkers: [],
      activeMarkerId: 0,
      stylesMarkers: {
        '': '',
        'active': 'hue-rotate(263deg)'
      },
      stylesPointMarkers: {
        '': '',
        'active': 'text-bg-success'
      },
      isClustering: false,

    }
  },
  components: {
    Spinner,
    ModalWindow,
    FileReader,
    Header,
    MapWithFunc,
    CardForPoint,
  },
  mounted() {
    this.isCollapse = localStorage.getItem('isCollapse') ? localStorage['isCollapse'] === "true" : false
    this.isClustering = localStorage.getItem('isClustering') ? localStorage['isClustering'] === "true" : false
  },
  watch: {
    isCollapse (newVal) {
      localStorage.setItem('isCollapse', newVal)
    },
    isClustering (newVal) {
      localStorage.setItem('isClustering', newVal)
    }
  },
  methods: {
    changeCollapse () {
      this.isCollapse = !this.isCollapse
    },
    deleteData() {
      this.isFile = false
      this.textFromFile = ''
      this.dataMap = []
      this.activeMarkerId = 0
    },
    clickOnPoint(markerId) {
      console.log(markerId)
      console.log(this.activeMarkerId)
      if (this.activeMarkerId !== 0) {
        var markerActive = this.pointMarkers.find(x => x.marker._leaflet_id === this.activeMarkerId)
        markerActive.style = ''
      }
      this.activeMarkerId = markerId
      const indexActiveElem = this.pointMarkers.findIndex(x => x.marker._leaflet_id === this.activeMarkerId)
      console.log(indexActiveElem, this.pointMarkers[indexActiveElem])
      this.pointMarkers[indexActiveElem].style = 'active'
      this.center = this.pointMarkers[indexActiveElem].marker.getLatLng()
      this.changeStyle(this.pointMarkers)
      return indexActiveElem
    },
    clickOnMarker(markerId) {
      const indexActiveElem = this.clickOnPoint(markerId)
      this.pointMarkers[indexActiveElem].marker.unbindPopup()
      let remark = this.pointMarkers[indexActiveElem].remark
      if (remark.trim() !== "") {
        this.pointMarkers[indexActiveElem].marker.bindPopup(remark).openPopup()
      }
      if (this.isCollapse) {
        var container = this.$el.querySelector('#scrollPoints')
        let countRow = this.pointMarkers.length
        let c = Math.floor(container.scrollHeight / countRow)
        container.scrollTop = c * (indexActiveElem - 1)
      }
    },
    changeStyle(markers) {
      for (var marker of markers) {
        const style = marker.style
        if (marker.marker._icon) {
          marker.marker._icon.style.setProperty('filter', this.stylesMarkers[style])
        }
      }
    },
    deleteMarker(markerId) {
      this.markerForDelete = markerId
      if (this.activeMarkerId === markerId) {
        this.activeMarkerId = 0
      }
    },
    draggableMarker() {
      this.isDraggable = !this.isDraggable
      for (let point of this.pointMarkers) {
        if (this.isDraggable) {
          point.marker.dragging.enable()
        } else {
          point.marker.dragging.disable()
        }
      }
    },
    writeFile() {
      let textForFile = ''
      for (const point of this.pointMarkers) {
        textForFile += point.marker.getLatLng().lat.toFixed(6)
        textForFile += '\t'
        textForFile += point.marker.getLatLng().lng.toFixed(6)
        textForFile += '\t'
        textForFile += point.remark
        textForFile += '\n'
      }
      const blob = new Blob([textForFile], {type: 'text/plain'});
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'points.txt');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    readFile() {
      const rows = this.textFromFile.split('\n');
      let result = []
      for (const row of rows) {
        if (row === '') continue;
        const textPoint = row.replace('\r', '').split('\t')
        // Подумать об исключении битых файлов
        const point = {
          'lat': parseFloat(textPoint[0]),
          'lon': parseFloat(textPoint[1]),
          'comment': textPoint[2]
        }
        result.push(point)
      }
      this.dataMap = result;
      this.textFromFile = ''
      return true
    },
  }
  ,
}
</script>

<style>

* {
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100%;
}

.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.content {
  flex: 1 0 auto;
}

.footer {
  flex: 0 0 auto;
}

::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0px 0px 10px 6px rgba(66, 170, 255, 1);
}

</style>

