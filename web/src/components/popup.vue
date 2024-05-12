<template>
  <Transition name="fade">
    <div class="popup">
      <div class="content">
        <h2 class="w title" v-if="title">{{ title }}</h2>
        <slot/>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  methods: {
    clickOutsideEvent(event) {
      if (this.$el === event.target) {
        this.$emit("closed")
      }
    },
  },
  mounted() {
    document.body.addEventListener("click", this.clickOutsideEvent)
  },
  beforeDestroy() {
    document.body.removeEventListener("click", this.clickOutsideEvent)
  },
}
</script>

<style lang="scss" scoped>
.fade-enter-active {
  transition: opacity 0.3s ease;
}
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.popup {
  width: 100%;
  height: 100%;
  background: var(--popup-background-color);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  display: flex;
  justify-content: center;
  align-items: center;

  .content {
    max-width: 96%;
    margin-top: -140px;
    background: var(--block-color);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: var(--popup-content-color);
    backdrop-filter: blur(14.5px);
    -webkit-backdrop-filter: blur(14.5px);
    padding: 16px;
    border-radius: 3px;

    h2.title {
      width: 100%;
      font-size: 1.7rem;
      line-height: 1.3;
      text-align: left;
      margin: 0 0 16px 0;
    }
  }
}
</style>