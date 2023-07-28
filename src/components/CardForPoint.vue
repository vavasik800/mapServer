<template>
  <div>
    <div class="card border-success mb-3" style="max-width: 18rem;">
      <!--      <div class="card-header">Точка</div>-->
      <div class="card-body pt-0">
        <div class="row float-end">
          <button type="button"
                  class='btn btn-link p-2 w-auto'
                  @click="insertInBuffer(point)"
                  data-bs-toggle="tooltip"
                 >
            <font-awesome-icon icon="fa-regular fa-paste"/>
          </button>
        </div>
        <div class="row pt-2">
          <div class="col">Широта</div>
          <div class="col">Долгота</div>

        </div>
        <div class="row">
          <div class="col"> {{ point.lat }}</div>
          <div class="col">{{ point.lon }}</div>
        </div>
        <hr>
      </div>
      <div class="card-footer">
        <small class="text-body-secondary">Последнее обновление 3 мин. назад</small>
      </div>
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css"
import {Tooltip} from "bootstrap";

export default {
  name: "CardForPoint",
  props: {
    point: {
      type: Object,
    },
  },
  data() {
    return {
      tooltip: {},
    }
  },
  mounted() {
    var tooltipTriggerList = Array.prototype.slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    this.tooltip = new Tooltip(tooltipTriggerList[0], {
        title: 'ААААААа',
        trigger: 'click',
        placement: 'top',
       delay: { show: 0, hide: 3000 }
    })
    console.log(this.tooltip)

  },
  methods: {
    insertInBuffer(point) {
      navigator.clipboard.writeText([point.lat, point.lon].join(', '))
    },
  }
}
</script>

<style scoped>

</style>