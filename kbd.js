window.gKbd = {
  bindings: {},
  keysDown: {},

  addBinding: function(name, handler) {
    if (!this.bindings[name]) {
      this.bindings[name] = [];
    }

    this.bindings[name].push(handler);
  },
};

for (let evName of ['keydown', 'keypress', 'keyup']) {
  document.addEventListener(evName, keyHandler);
}

function upperCaseFirst(str) {
  return `${str[0].toUpperCase()}${str.slice(1)}`;
}

function keyHandler(ev) {
  let key = upperCaseFirst(ev.key);

  let isKeyDownEv = ev.type === 'keydown';
  let isKeyPressEv = ev.type === 'keypress';
  let isKeyUpEv = ev.type === 'keyup';

  if (isKeyDownEv) {
    gKbd.keysDown[key] = true;
  }
  else
  if (isKeyUpEv) {
    gKbd.keysDown[key] = false;
  }

  if (isKeyPressEv) {
    for (let [k, v] of Object.entries(gKbd.bindings)) {
      let binding = k.split('-').map(upperCaseFirst);

      let match = binding.every(boundKey => {
        if (boundKey === key) {
          return true;
        }

        switch (boundKey) {
          case 'Alt':
            return ev.altKey;

          case 'Control':
            return ev.ctrlKey;

          case 'Meta':
            return ev.metaKey;

          case 'Shift':
            return ev.shiftKey;
        }

        return false;
      });

      if (!match) {
        continue;
      }

      ev.preventDefault();

      for (let handler of v) {
        try {
          handler();
        }
        catch(err) {
          console.error(err);
        }
      }

      break;
    }
  }
}
