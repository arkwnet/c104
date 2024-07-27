<template>
  <div>
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
      this.context.fillStyle = '#fff'
      this.context.fillRect(
        0,
        this.imageHeight / 2 - 60,
        this.imageWidth,
        this.imageHeight / 2 + 60
      )
      this.context.font = '160px sans-serif'
      this.context.fillStyle = '#000'
      this.context.textAlign = 'left'
      this.context.fillText('お預かり', 30, this.imageHeight / 2 + 118)
      this.context.fillText('お釣り', 30, this.imageHeight / 2 + 310)
      this.context.textAlign = 'right'
      this.context.fillText('500', this.imageWidth - 30, this.imageHeight / 2 + 118)
      this.context.fillText('300', this.imageWidth - 30, this.imageHeight / 2 + 310)
      const vm = this
      setTimeout(() => {
        vm.update()
      }, 500)
    }
  }
}
</script>
