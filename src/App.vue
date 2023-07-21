<template>
  <body class="d-flex flex-column min-vh-100">
  <header>
    <nav class="navbar bg-body-tertiary">
      <div class="container-fluid p-0 ps-4">
        <a class="navbar-brand ms-2" href="#">
          <img src="../public/favicon.ico" alt="Logo" width="30" height="24"
               class="d-inline-block align-text-top">
          PointXY
        </a>
        <div class="navbar-header navbar-right">
          <ul class="nav-navbar nav">
            <li class="nav-item">
              <a class="navbar-brand row" data-bs-toggle="offcanvas" href="#settings" role="button"
                 aria-controls="settings">
                <p class="col p-0 text-center fs-6 m-0">Настройки</p>
                <font-awesome-icon icon="fa-solid fa-gear" class="col p-1"/>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <content>
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
              <div class="mb-3">
                <input class="form-control form-control-sm" id="formFileSm" type="file">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <button type="button" class="btn btn-outline-primary btn-sm">
                Прочитать файл
                <font-awesome-icon icon="fa-solid fa-file-import" class="col"/>
              </button>
            </div>
            <div class="col d-flex justify-content-end">
              <button type="button" class="btn btn-outline-danger btn-sm">
                Удалить данные
                <font-awesome-icon icon="fa-solid fa-trash-can"/>
              </button>
            </div>
          </div>
          <hr/>


        </div>
      </div>
    </div>
    <!--    Кнопочная панель управления картой-->
    <div class="row m-3">
      <div class="col">
        <div class="btn-toolbar" role="toolbar">
          <div class="btn-group btn-group-sm" role="group">
            <button type="button" class="btn btn-outline-success n"
                    title="Сортировка списка дней">
              <font-awesome-icon icon="fa-solid fa-arrow-down-wide-short"/>
            </button>
            <button type="button" class="btn btn-outline-success ml-0"
                    title="Откат до изначальных данных">
              <font-awesome-icon icon="fa-solid fa-arrows-rotate"/>
            </button>
            <button type="button" class="btn btn-outline-success ml-0"
                    title="Следующие отбитие на выделенном маркере"
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
            >
              <font-awesome-icon icon="fa-solid fa-map-location-dot"/>
            </button>
          </div>
          <div class="btn-group btn-group-sm mx-2 d-inline-block" role="group">
            <button type="button"
                    class="btn btn-outline-info ml-0"
                    :title="isArrowHeads? 'Отключить наконечники линий' : 'Включить наконечники линий'"
                    @click="isArrowHeads = !isArrowHeads">
              <font-awesome-icon v-if="isArrowHeads" icon="fa-solid fa-arrow-right"/>
              <font-awesome-icon v-else icon="fa-solid fa-minus"/>
            </button>
            <button type="button"
                    class="btn btn-outline-info ml-0"
                    :title="isDraggable ? 'Отключить движение маркеров' : 'Включить движение маркеров'"
                    @click="isDraggable = !isDraggable"
            >
              <font-awesome-icon icon="fa-solid fa-location-dot" class="mx-1"/>
              <font-awesome-icon v-if="isDraggable" icon="fa-solid fa-wind"/>
            </button>
            <button type="button"
                    class="btn btn-outline-info d-inline-flex align-items-center h-100 "
                    :title="isPolyline ? 'Отключить линии' : 'Включить линии'"
                    @click="isPolyline = !isPolyline"
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
          <button type="button" class="btn btn-outline-success btn-sm ml-0">
            Выгрузить маршрут
            <font-awesome-icon icon="fa-solid fa-cloud-arrow-down"/>
          </button>
          <button type="button" class="btn btn-outline-info btn-sm ms-4">
            Справка
            <font-awesome-icon icon="fa-regular fa-circle-question"/>
          </button>
        </div>
      </div>
    </div>

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
          <div class="col-2 collapse collapse-horizontal fade show" id="collapse" style="max-height: 95%">
            <h5 v-if="selectValue === 2">Маршрут</h5>
            <h5 v-else>Точки</h5>
          </div>
          <div class="col">
            <div id="map" class="h-100 w-100"></div>
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
import L from 'leaflet'  //Импортируем библиотеку leaflet
import 'leaflet/dist/leaflet.css' //Импортируем CSS, без него не заработает


export default {
  name: 'App',
  data() {
    return {
      centerCoordinates: [51.505, -0.09],
      map: null,
      tileLayer: null,
      isArrowHeads: true,
      isDraggable: false,
      isPolyline: true,
      isExpandMap: false,
      selectValue: 1,
      options: [
          {value: 1, text: 'Точки', selected: true},
          {value: 2, text: 'Маршрут', selected: false},
      ]
    }
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.map = L.map('map').setView([51.505, -0.09], 13);
      this.tileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      })
      this.tileLayer.addTo(this.map);
    },
    expandMap() {
      this.isExpandMap = !this.isExpandMap;
    },
    selectOption(value) {
      for (var option of this.options) {
        if (option.value === value){
          option.selected = true
          this.selectValue = value
        }else {
          option.selected = false
        }
      }
      console.log(this.selectValue)
    },
  },
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

/*#map {*/
/*  height: 100%;*/
/*  width: 100%;*/
/*}*/
</style>

