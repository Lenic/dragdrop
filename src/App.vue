<template>
  <div id="app">
    <img class="bg"
         src="./assets/map.jpg">
    <div ref="dragContaner"
         class="drag-container">
      <el-tooltip :key="item.id"
                  effect="light"
                  placement="top"
                  v-for="item in nodes"
                  :content="item.tooltip">
        <div :data-id="item.id"
             class="iconfont drag"
             :data-x="item.position.x"
             :data-y="item.position.y"
             :style="getStyle(item.id)">
          &#xe773;
        </div>
      </el-tooltip>
    </div>
    <div>
      <button>轨迹回放</button>
    </div>
    <div class="track">
      <transition name="trackPoint"
        @before-enter="beforeEnterHandler">

      </transition>
    </div>
  </div>
</template>

<script>
import interact from 'interactjs';
import Velocity from 'velocity-animate';

export default {
  name: 'app',
  data() {
    return {
      nodes: [
        { id: 's1', tooltip: '天线 1', position: { x: 0, y: 0 } },
        { id: 's2', tooltip: '天线 2', position: { x: 100, y: 50 } },
        { id: 's3', tooltip: '天线 3', position: { x: 200, y: 100 } },
        { id: 's4', tooltip: '天线 4', position: { x: 300, y: 150 } },
        { id: 's5', tooltip: '天线 5', position: { x: 400, y: 200 } }
      ]
    };
  },
  mounted() {
    this.setDragable('.drag', { context: this.$refs.dragContaner });
  },
  methods: {
    getStyle(id) {
      const item = this.nodes.find(v => v.id === id).position;
      if (!item) {
        return null;
      }

      const { x, y } = item;
      return {
        transform: `translate(${x / 100}rem, ${y / 100}rem)`
      };
    },
    setDragable(...args) {
      const self = this;

      interact(...args).draggable({
        onmove(event) {
          const target = event.target,
            x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
            y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

          self.nodes.find(v => v.id === target.getAttribute('data-id')).position = { x, y };
        }
      })
    },
    moveIt(id, newPosition) {
      const node = this.nodes.find(v => v.id === id);
      if (!node) {
        return;
      }

      node.position = {
        x: newPosition.x,
        y: newPosition.y,
      };
    }
  }
}
</script>

<style lang="less">
#app {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  > .bg {
    width: 19.2rem;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .drag {
    width: 0.24rem;
    height: 0.24rem;
    font-size: 0.24rem;
    line-height: 0.24rem;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    color: blue;
  }
}
</style>
