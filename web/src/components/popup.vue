<template>
  <Transition name="fade">
    <div>
      <div class="background" @click="$emit('closed')"></div>
      <div class="popup row center middle">
        <div class="content column center middle">
          <h2 class="w title" v-if="title">{{ title }}</h2>
          <slot/>
        </div>
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

.background {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}

.popup {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  pointer-events: none;

  .content {
    max-width: 96%;
    margin-top: -140px;
    background: var(--block-color);
    background: var(--popup-content-color);
    backdrop-filter: blur(14.5px);
    -webkit-backdrop-filter: blur(14.5px);
    padding: 16px;
    border-radius: 3px;
    pointer-events: auto;

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