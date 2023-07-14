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
              <a class="navbar-brand row" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button"
                 aria-controls="offcanvasExample">
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
    <div class="row m-3">
      <div class="col p-0">
        <div class="btn-toolbar mb-1 mt-0" role="toolbar">
          <div class="btn-group btn-group-sm" role="group">
            <button type="button" class="btn btn-outline-success n"
                      title="Сортировка списка дней">1
<!--              <b-icon-sort-down></b-icon-sort-down>-->
            </button>
            <button type="button"  class="btn btn-outline-success ml-0"
                      title="Откат до изначальных данных">2
<!--              <feather-icon icon="RefreshCwIcon"-->
<!--                            size="16"/>-->
            </button>
            <button type="button" class="btn btn-outline-success ml-0"
                      title="Следующие отбитие на выделенном маркере"
                      >3
<!--              <feather-icon icon="ArrowDownIcon"-->
<!--                            size="16"/>-->
            </button>
          </div>
          <div class="btn-group mx-3 btn-group-sm" role="group">
            <button type="button" class="btn btn-outline-info ml-0"
                    title="Отключить наконечники линий">4
<!--              <feather-icon v-if="isArrowHeads"-->
<!--                            icon="ArrowRightIcon"-->
<!--                            size="16"/>-->
<!--              <feather-icon v-else-->
<!--                            icon="MinusIcon"-->
<!--                            size="16"/>-->
            </button>
            <button type="button" class="btn btn-outline-info ml-0"
                    title="Отключить движение маркеров"
            >5
            </button>
            <button type="button" class="btn btn-outline-info ml-0"
                    title="Отключить линии"
            >6
            </button>
          </div>
        </div>
      </div>
      <div class="col p-0 d-flex justify-content-end">
        <div class="btn-toolbar mb-1 mt-0">
          <button  type="button" class="btn btn-outline-success btn-sm ml-0">
            Выгрузить маршрут
          </button>
          <button  type="button" class="btn btn-outline-info btn-sm ms-4">
            Справка
          </button>
        </div>
      </div>
    </div>


    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasExampleLabel">Настройки</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <div class="container text-left">
          <div class="row">
            <div class="col">
              <span class="align-baseline">Режим</span>
            </div>
            <div class="col">
              <select class="form-select" aria-label="Выбор режима">
                <option value="1" selected>Маршрут</option>
                <option value="2">Точки</option>
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
                <font-awesome-icon icon="fa-solid fa-trash-can" />
              </button>
            </div>
          </div>
          <hr/>


        </div>
      </div>
    </div>

    <div class="card m-3 text-dark bg-light border-light shadow">
      <div class="card-body">
        <div class="row" style="height: 85vh">
          <div class="col-1 ">
            <h5>Список дней</h5>
            <div class="overflow-auto" style="height: 80vh">
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
              <div>
                <div class="tab-content">
                  <button type="button" class="btn btn-outline-secondary mb-1 text-lg-left">10-07-2023</button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-2 pl-1">
            <h5>Маршрут</h5>
          </div>
          <div class="col">
            <div id="map"></div>
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
      tileLayer: null
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

#map {
  height: 100%;
  width: 100%;
}
</style>

