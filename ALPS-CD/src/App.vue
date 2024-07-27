<template>
  <div>
    <div class="photo"><img :src="imageUrl" /></div>
    <canvas class="canvas" ref="canvas" width="1480" height="720"></canvas>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      status: false,
      image: new Image(),
      imageUrl: '',
      imageWidth: 1480,
      imageHeight: 720,
      canvas: null,
      context: null
    }
  },
  mounted() {
    this.canvas = this.$refs.canvas
    this.context = this.canvas.getContext('2d')
    this.image.src = '/img/background.png'
    this.update()
  },
  methods: {
    update() {
      this.context.drawImage(this.image, 0, 0, this.imageWidth, this.imageHeight)
      this.imageUrl = this.canvas.toDataURL()
      const vm = this
      setTimeout(() => {
        vm.update()
      }, 500)
    }
  }
}
</script>
