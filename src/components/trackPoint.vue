<template>
  <div class="track-container">
    <transition name="trackPoint"
                @before-enter="handleBeforeEnter"
                @enter="handleEnter"
                @after-enter="handleAfterEnter"
                @before-leave="handleBeforeLeave"
                @leave="handleLeave"
                @after-leave="handleAfterLeave"
                :css="false">
      <div ref="point"
           class="iconfont">
        &#xe773;
      </div>
    </transition>
  </div>
</template>

<script>
import Velocity from 'velocity-animate';

function getStyle = ({ x, y }) => {
  if (!x) {
    return {};
  }

  return { transform: `translate(${x / 100}rem, ${y / 100}rem)` };
}

function add(el, opts) {
  const { x, y, duration, ...rest } = opts;

  Velocity(el, getStyle(opts), {
    duration,
    easing: "linear",
    ...rest,
  });
}

export default {
  data() {
    return {
      initial: null,
      list: [],
    };
  },
  methods: {
    start: function (list) {
      if (!list || !list.length) {
        return;
      }

      const [first, ...rest] = list;

      this.initial = first;
      this.list = rest;
    },
    handleBeforeEnter: function (el) {
      el.style.transform = getStyle(this.initial).transform;
      console.log('方块显示动画即将执行');
    },
    handleEnter: function (el, done) {
      Velocity(el, 'stop');
      Velocity(el, {
        backgroundColor: '#0085eb',
        opacity: 1,
        translateX: 260,
        rotateZ: ['360deg', 0]
      }, {
          duration: 1000,
          easing: [0.4, 0.01, 0.165, 0.99],
          complete: done
        });
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
      Velocity(el, {
        backgroundColor: '#4dd0e1',
        opacity: 0,
        translateX: 0,
        rotateZ: [0, '360deg']
      }, {
          duration: 1000,
          easing: [0.4, 0.01, 0.165, 0.99],
          complete: done
        });
      console.log('方块隐藏动画执行中...');
    },
    handleAfterLeave: function (el) {
      console.log('方块隐藏动画结束');
    }
  }
}
</script>
