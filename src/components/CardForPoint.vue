<template>
  <div>
    <div :class="'card border-success mb-3 '.concat(customClass)" style="max-width: 18rem;">
      <div class="card-body pt-0 pb-2">
        <div class="row float-start">
          <button type="button"
                  class='btn btn-link p-2 w-auto'
                  @click.stop="insertInBuffer(point)"
                  :data-bs-toggle="'tooltip'.concat(indexPoint)"
          >
            <font-awesome-icon icon="fa-regular fa-paste"/>
          </button>
        </div>
        <div class="row float-end">
          <button type="button"
                  class='btn btn-link p-2 w-auto'
                  @click.stop="deletePoint(point)"
          >
            <font-awesome-icon icon="fa-solid fa-xmark" style="color: red"/>
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
        <hr class="m-1">
        <div class="input-group mb-0 align-items-center h-100">
          <button type="button"
                  class='btn btn-link p-2 w-auto'
                  @click.stop="isCreateComment = true"
                  title="Изменить комментарий к точке"
          >
            <font-awesome-icon icon="fa-regular fa-comment" />
          </button>
          <p class="m-0" v-if="!isCreateComment">
            {{ point.remark }}
          </p>
          <input v-if="isCreateComment"
                 v-model="textRemark"
                 @input.stop
                 @click.stop
                 type="text"
                 class="form-control form-control-sm">
          <button v-if="isCreateComment"
                  class="btn btn-link p-2 w-auto"
                  type="button"
                  @click.stop="saveComment"
                  title="Сохранить комментарий"
          >
            <font-awesome-icon icon="fa-regular fa-square-plus" />
          </button>
        </div>
<!--        <div class="row px-4">-->
<!--          -->

<!--        </div>-->
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
      isCreateComment: false,
      newPoint: null,
      textRemark: this.point.remark,
    }
  },
  mounted() {
    var strForFind = '[data-bs-toggle="tooltip'.concat(this.indexPoint).concat('"]')
    var tooltipTriggerList = Array.prototype.slice.call(document.querySelectorAll(strForFind))
    if (tooltipTriggerList.length === 0) return
    this.tooltip = new Tooltip(tooltipTriggerList[0], {
      title: 'Скопировано',
      trigger: 'manual',
      placement: 'top',
      customClass: 'custom-tooltip',
    })
  },
  methods: {
    insertInBuffer(point) {
      this.tooltip.show()
      navigator.clipboard.writeText([point.marker.getLatLng().lat.toFixed(6), point.marker.getLatLng().lng.toFixed(6)].join(', '))
      setTimeout(
          () => {
            this.tooltip.hide()
          },
          1 * 1000
      );
    },
    deletePoint() {
      console.log(this.indexPoint)
      this.$emit("deletePoint", this.point.markerId)
    },
    saveComment() {
      this.newPoint = this.point
      this.newPoint.remark = this.textRemark
      this.$emit('update:point', this.newPoint)
      this.isCreateComment = false
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