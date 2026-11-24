import Matter from "matter-js";

export default (restart: any) => {
  const engine = Matter.Engine.create({ enableSleeping: false });
  const world = engine.world;

  world.gravity.y = 0.4;

  return {};
};
