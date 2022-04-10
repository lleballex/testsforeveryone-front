<template>
  <div>
    <transition name="modal">
      <div v-if="isShowed" @click="clickHandler" class="modal">
        <div ref="modalContent" class="modal__content">
          <div class="modal__header">
            <div class="title">
              <slot name="title"></slot>
            </div>
            <button @click="toggle" class="modal__header-btn">
              <icon icon="times" />
            </button>
          </div>
          <div class="modal__main">
            <slot name="main"></slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
  const isShowed = ref(false)
  const modalContent = ref()

  const toggle = () => isShowed.value = !isShowed.value

  const clickHandler = ({ target }) => {
    if (modalContent.value && !modalContent.value.contains(target)) {
      toggle()
    }
  }

  defineExpose({toggle})
</script>

<style lang="less" scoped>
  @import 'assets/css/config.less';

  .modal {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, .5);
    font-size: 1rem;

    &.modal-enter-active {
      animation: showModal @longTransition;
    }

    &.modal-leave-active {
      animation: hideModal @longTransition;
    }
  }


  @keyframes showModal {
    from {background: rgba(0, 0, 0, 0);}
    to {background: rgba(0, 0, 0, .5);}
  }

  @keyframes hideModal {
    from {background: rgba(0, 0, 0, .5)}
    to {background: rgba(0, 0, 0, 0);}
  }

  .modal__content {
    display: flex;
    flex-direction: column;
    gap: 1.5em;
    padding: 1.5em;
    width: 35em;
    max-height: 30em;
    overflow: auto;
    background: #222;
    border-radius: @radius;

    .modal-enter-active & {
      animation: showModalContent @longTransition;
    }

    .modal-leave-active & {
      animation: hideModalContent @longTransition;
    }
  }  

  @keyframes showModalContent {
    from {transform: scale(0);}
    to {transform: scale(1);}
  }

  @keyframes hideModalContent {
    from {transform: scale(1);}
    to {transform: scale(0);}
  }

  .modal__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 2em;
  }

  .modal__header-btn {
    font-size: .8em;
    transition: @transition;

    &:hover {
      transform: scale(1.2);
    }
  }

  .modal__main {
    gap: inherit;
  }

  :slotted(input) {
    background: #333;
  }
</style>