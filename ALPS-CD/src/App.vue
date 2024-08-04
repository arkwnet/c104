<template>
  <div>
    <canvas class="canvas" ref="canvas" width="1480" height="720" @click="click"></canvas>
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
      context: null,
      isFullScreen: false
    }
  },
  mounted() {
    this.canvas = this.$refs.canvas
    this.context = this.canvas.getContext('2d')
    if (import.meta.env.MODE == 'development') {
      this.image.src = '/img/background.png'
    } else {
      this.image.src = './img/background.png'
    }

    this.update()
  },
  methods: {
    async update() {
      let url
      if (import.meta.env.MODE == 'development') {
        url = '/api'
      } else {
        url = import.meta.env.VITE_BACKEND_URL
      }
      const res = await this.axios.get(url + '/display', {
        headers: {
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Access-Control-Allow-Origin': '*'
        }
      })
      let data = res.data
      await this.context.drawImage(this.image, 0, 0, this.imageWidth, this.imageHeight)
      if (
        data.upper_left != '' ||
        data.upper_right != '' ||
        data.lower_left != '' ||
        data.lower_right != ''
      ) {
        this.context.fillStyle = '#fff'
        await this.context.fillRect(
          0,
          this.imageHeight / 2 - 60,
          this.imageWidth,
          this.imageHeight / 2 + 60
        )
        this.context.font = '160px sans-serif'
        this.context.fillStyle = '#000'
        this.context.textAlign = 'left'
        await this.context.fillText(data.upper_left, 30, this.imageHeight / 2 + 118)
        await this.context.fillText(data.lower_left, 30, this.imageHeight / 2 + 310)
        this.context.fillStyle = '#fff'
        await this.context.fillRect(
          this.imageWidth / 2 + 180,
          this.imageHeight / 2 - 60,
          this.imageWidth / 2 - 180,
          this.imageHeight / 2 + 60
        )
        this.context.fillStyle = '#000'
        this.context.textAlign = 'right'
        await this.context.fillText(
          data.upper_right,
          this.imageWidth - 30,
          this.imageHeight / 2 + 118
        )
        await this.context.fillText(
          data.lower_right,
          this.imageWidth - 30,
          this.imageHeight / 2 + 310
        )
      }
      const vm = this
      setTimeout(() => {
        vm.update()
      }, 1000 / 2)
    },
    click() {
      if (this.isFullScreen == false) {
        document.body.requestFullscreen()
        this.isFullScreen = true
      } else {
        document.exitFullscreen()
        this.isFullScreen = false
      }
    }
  }
}
</script>
