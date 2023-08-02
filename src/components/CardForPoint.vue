<template>
  <div>
    <div :class="'card border-success mb-3 '.concat(customClass)" style="max-width: 18rem;">
      <!--      <div class="card-header">Точка</div>-->
      <div class="card-body pt-0 pb-2">
        <div class="row float-end">
          <button type="button"
                  class='btn btn-link p-2 w-auto'
                  @click="insertInBuffer(point)"
                  :data-bs-toggle="'tooltip'.concat(indexPoint)"
                 >
            <font-awesome-icon icon="fa-regular fa-paste"/>
          </button>
        </div>
        <div class="row pt-2">
          <div class="col">Широта</div>
          <div class="col">Долгота</div>

        </div>
        <div class="row">
          <div class="col"> {{ point.marker.getLatLng().lat.toFixed(6) }}</div>
          <div class="col">{{ point.marker.getLatLng().lng.toFixed(6) }}</div>
        </div>
        <hr class="m-2">
        <div class="row px-4">
          {{ point.remark }}
        </div>
      </div>
<!--      <div class="card-footer">-->
<!--        <p>-->
<!--          <a href="#" class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">-->
<!--          Подробнее-->
<!--          </a>-->
<!--        </p>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script>
import {Tooltip} from "bootstrap";

export default {
  name: "CardForPoint",
  props: {
    point: {
      type: Object,
    },
    indexPoint: {
      type: Number,
    },
    customClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tooltip: {},
    }
  },
  mounted() {
    var strForFind = '[data-bs-toggle="tooltip'.concat(this.indexPoint).concat('"]')
    var tooltipTriggerList = Array.prototype.slice.call(document.querySelectorAll(strForFind))
    console.log(tooltipTriggerList)
    this.tooltip = new Tooltip(tooltipTriggerList[0], {
        title: 'Скопировано',
        trigger: 'manual',
        placement: 'top',
        customClass: 'custom-tooltip',
    })
    console.log(this.tooltip)

  },
  methods: {
    insertInBuffer(point) {
      this.tooltip.show()
      navigator.clipboard.writeText([point.lat, point.lon].join(', '))
      setTimeout(
          () => {
           this.tooltip.hide()
          },
          1 * 1000
);
    },
  }
}
</script>

<style>

.custom-tooltip {
  --bs-tooltip-bg: var(--bs-primary);
  --bs-tooltip-border-radius: 0.9rem;
}

</style>