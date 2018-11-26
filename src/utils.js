import velocity from "velocity-animate";

export function Velocity(el) {
  if (this instanceof Velocity) {
    this.$el = el;
  } else {
    return new Velocity(el);
  }
}

Velocity.prototype.add = function add({ x, y, duration, ...rest }) {
  const props = { transform: `translate(${x / 100}rem, ${y / 100}rem)` };
  const options = {
    duration,
    easing: "linear",
    ...rest,
  };

  velocity(this.$el, props, options);

  return this;
};
