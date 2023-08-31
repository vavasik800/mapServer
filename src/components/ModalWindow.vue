<template>
  <div class="modal fade" :id="id" data-bs-backdrop="static" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-m">
      <div class="modal-content">
        <div v-if="header" class="modal-header">
          <h5  class="modal-title">{{ header }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
        </div>
        <div class="modal-body">
          <slot name="body" />
          <img v-if="imgBody"
               :src="imgBody"
               class="w-75 h-75 mx-auto d-block"
               alt="img for modal"/>
          <p class=" mb-0 mt-3">{{ textBody }}</p>
        </div>
        <div v-if="footer" class="modal-footer">
          <button type="button"
                  class="btn btn-outline-primary btn-sm"
                  @click="clickSaveButton"
          >{{ titleOkButton }}</button>
          <button type="button" class="btn btn-outline-danger btn-sm" data-bs-dismiss="modal">{{ titleCancelButton }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap'

export default {
  name: "ModalWindow",
  props: {
    id: {
      type: String,
    },
    header: {
      type: String,
      default: '',
    },
    textBody: {
      type: String,
    },
    imgBody: {
      type: String,
    },
    titleOkButton: {
      type: String,
      default: 'Ок',
    },
    titleCancelButton: {
      type: String,
      default: 'Отмена',
    },
    footer: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    this.theModal = new Modal('#'.concat(this.id))
  },
  methods: {
    clickSaveButton() {
      this.theModal.hide()
      this.$emit('clickOk')
    },
  }
}
</script>

<style scoped>
.modal-m {
  max-width: 450px;
}
</style>