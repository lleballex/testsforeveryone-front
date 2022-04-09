<template>
  <div v-show="isShowed" class="cropper">
    <div class="cropper__image">
      <img ref="imageRef">
    </div>
    <div class="cropper__btns">
      <button @click="cancelSaving" class="cropper__btn secondary">
        <icon icon="times" class="cropper__btn-icon" />
      </button>
      <button @click="saveImage" class="cropper__btn primary">
        <icon icon="check" class="cropper__btn-icon" />
      </button>
    </div>
    <input ref="input" v-show="false" @change="setImage" type="file" accept="image/*">
  </div>
</template>

<script setup>
  import Cropper from 'cropperjs'
  import 'cropperjs/dist/cropper.css'

  const imageRef = ref()
  const input = ref()
  const isShowed = ref(false)
  var cropper

  const props = defineProps({
    aspectRatio: Number
  })

  const emit = defineEmits(['update:modelValue'])

  onMounted(() => {
    cropper = new Cropper(imageRef.value, {
      viewMode: 2,
      ...props
    })
  })
  
  const chooseImage = () => input.value.click()

  const setImage = event => {
    const file = event.target.files[0]
    event.target.value = ''

    if (!file) return

    if (!file.type.includes('image/')) {
      alert('not image')
      return
    }

    const reader = new FileReader()
    reader.onload = event => {
      cropper.replace(event.target.result)
      isShowed.value = true
    }
    reader.readAsDataURL(file)
  }

  const cancelSaving = () => {
    isShowed.value = false
  }

  const saveImage = async () => {
    isShowed.value = false
    emit('update:modelValue', await cropper.getCroppedCanvas().toDataURL())
  }

  defineExpose({chooseImage})
</script>

<style lang="less" scoped>
  @import 'assets/css/config.less';

  .cropper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5em;
    padding: 1.5em;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, .5);
  }

  .cropper__image {
    width: 100%;
    // height: calc(100vh - 1.5em * 3 - @padding * 2 - 1.5em);
    height: 85%;
  }

  .cropper__btns {
    display: flex;
    gap: inherit;
  }

  .cropper__btn {
    .field();
    .button();

   padding-left: 5em;
   padding-right: 5em;
  }

  .cropper__btn-icon {
    font-size: 1.5em;
  }
</style>