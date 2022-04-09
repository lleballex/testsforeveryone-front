<template>
  <div class="messages">
    <div
      v-for="message in messages"
      @click="startMessageRemoving(message.id)"
      @animationend="removeMessage"
      class="messages__message"
      :class="message.type"
      :data-message-id="message.id"
    >
      <span>{{ message.text }}</span>
      <div class="messages__message-front">
        <icon icon="times" />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { storeToRefs } from 'pinia'
  import { useMessages } from 'stores'

  const messagesStore = useMessages()
  const { messages } = storeToRefs(messagesStore)

  const startMessageRemoving = id => {
    document.querySelector(`.messages__message[data-message-id="${id}"]`)
      .classList.add('to-remove')
  }

  const removeMessage = ({ animationName, target }) => {
    if (animationName.includes('hideMessage')) {
      target.remove()
      if (!document.querySelector('.messages__message')) {
        messagesStore.$reset()
      }
    }
  }
</script>

<style lang="less" scoped>
  @import 'assets/css/config.less';

  @margin: 2em;
  @border: 5px;

  .messages {
    position: fixed;
    top: @margin;
    right: 0;
    max-width: calc(100% - @margin);
    overflow: hidden;
    font-size: 1.1rem;
    font-weight: 300;
  }

  .messages__message {
    position: relative;
    margin-right: @margin;
    margin-bottom: 1.5em;
    padding: 1.1em;
    width: 20em;
    max-width: calc(100% - @margin);
    box-sizing: border-box;
    border-radius: .3em;
    border-bottom-width: @border;
    border-bottom-style: solid;
    animation: showMessage @longTransition; 

    &.to-remove {
      animation: hideMessage @longTransition;
    }

    &.success {
      background: #d4edda;
      border-bottom-color: #99CC99;
      color: #155724;
    }

    &.error {
      background: #f8d7da;
      border-bottom-color: #f8aaaa;
      color: #721c24;
    }
  }

  @keyframes showMessage {
    from {transform: translateX(calc(100% + @margin));}
    to {transform: translateX(0);}
  }

  @keyframes hideMessage {
    from {transform: translateX(0);}
    to {transform: translateX(calc(100% + @margin));}
  }

  .messages__message-front {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: -@border;
    opacity: 0;
    background: rgba(0, 0, 0, .3);
    font-size: 2em;
    font-weight: 500;
    transition: @transition;

    .messages__message:hover & {
      opacity: 1;
      cursor: pointer;
    }
  }
</style>