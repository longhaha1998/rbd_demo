import EventEmitter from 'eventemitter3';

const sensorEmitter = new EventEmitter();

function sleep1(fn, time = 300) {
    return new Promise((resolve) => {
      setTimeout(() => {
        fn();
        resolve();
      }, time);
    });
}

function sleep2(fn, time = 300) {
    return new Promise((resolve) => {
        let id = null, count = 0;
        id = setInterval(() => {
          fn();
          count = count + 1;
          if (count === 9) {
              clearInterval(id);
              resolve();
          }
        }, time);
    });
}

function useSensor(api) {

    async function up(id) {
        const preDrag = api.tryGetLock(id);
        // Could not get lock
        if (!preDrag) {
          return;
        }
      
        const actions = preDrag.snapLift();
        const { moveUp, drop, isActive } = actions;

        await sleep2(() => {
            // might no longer be active after delay
            if (!isActive()) {
              return;
            }
            moveUp();
        }, 80);

        if (isActive()) {
          await sleep1(drop, 100);
        }
    }

    async function down(id) {
        const preDrag = api.tryGetLock(id);
        // Could not get lock
        if (!preDrag) {
          return;
        }
      
        const actions = preDrag.snapLift();
        const { moveDown, drop, isActive } = actions;

        await sleep2(() => {
            // might no longer be active after delay
            if (!isActive()) {
              return;
            }
            moveDown();
        }, 80);

        if (isActive()) {
          await sleep1(drop, 100);
        }
    }

    if (!sensorEmitter.eventNames().includes('up')) {
        console.log('?')
        sensorEmitter.on('up', up);
    }

    if (!sensorEmitter.eventNames().includes('down')) {
        sensorEmitter.on('down', down);
    }
}

export {
    sensorEmitter,
    useSensor
}