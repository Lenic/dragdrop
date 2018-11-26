<template>
  <div id="app">
    <transition name="showRect"
                @before-enter="handleBeforeEnter"
                @enter="handleEnter"
                @after-enter="handleAfterEnter"
                @before-leave="handleBeforeLeave"
                @leave="handleLeave"
                @after-leave="handleAfterLeave"
                :css="false">
      <div class="rect"
           v-show="show"></div>
    </transition>
    <button class="add"
            @click="handleClick">
      切换显示方块
    </button>
  </div>
</template>

<style lang="less">
.rect {
  width: 50px;
  height: 50px;
  background: #4dd0e1;
  // position: absolute;
  // top: 0;
  // left: 0;
}
.add {
  position: absolute;
  top: 100px;
  left: 100px;
}
</style>

<script>
/* eslint-disable */
import Velocity from 'velocity-animate';

function getStyle({ x, y }) {
  if (!x) {
    return {};
  }

  return { marginLeft: `+${x}px`, marginTop: `+${y}px` };
}

function add(el, opts) {
  // debugger;
  const style = getStyle(opts);
  const { x, y, duration, ...rest } = opts;

  Velocity(el, style, {
    duration,
    easing: "linear",
    ...rest,
  });
}

export default {
  data: () => ({
    // show状态决定方块是显示还是隐藏
    show: false,
    initial: { x: 100, y: 50, duration: 800 },
    list: [
      { x: 200, y: 100, duration: 1500 },
      { x: 400, y: 400, duration: 3000 },
    ]
  }),
  methods: {
    handleClick: function () {
      this.show = !this.show;
    },
    handleBeforeEnter: function (el) {
      el.style.opacity = 1;
      el.style.marginLeft = this.initial.x;
      el.style.marginTop = this.initial.y;

      console.log('方块显示动画即将执行');
    },
    handleEnter: function (el, done) {
      Velocity(el, 'stop');
      // debugger;

      add(el, this.list[0]);

      add(el, {
        ...this.list[1],
        // delay: this.list[0].duration,
        complete: done,
      });

      // done();

      // Velocity(el, {
      //   backgroundColor: '#0085eb',
      //   opacity: 1,
      //   translateX: 260,
      //   rotateZ: ['360deg', 0]
      // }, {
      //     duration: 1000,
      //     easing: [0.4, 0.01, 0.165, 0.99],
      //     complete: done
      //   });
      console.log('方块显示动画执行中...');
    },
    handleAfterEnter: function (el) {
      console.log('方块显示动画结束');
    },
    handleBeforeLeave: function (el) {
      console.log('方块隐藏动画即将执行');
    },
    handleLeave: function (el, done) {
      Velocity(el, 'stop');
      Velocity(el, { opacity: 0 }, { duration: 1000 });
      Velocity(el, { marginLeft: 0, marginTop: 0 }, { duration: 0, complete: done });
      // Velocity(el, {
      //   backgroundColor: '#4dd0e1',
      //   opacity: 0,
      //   translateX: 0,
      //   rotateZ: [0, '360deg']
      // }, {
      //     duration: 1000,
      //     easing: [0.4, 0.01, 0.165, 0.99],
      //     complete: done
      //   });
      console.log('方块隐藏动画执行中...');
    },
    handleAfterLeave: function (el) {
      console.log('方块隐藏动画结束');
    }
  }
}
</script>
