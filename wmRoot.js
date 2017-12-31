require('./kbd');

let wnd = require('./wnd');

window.gWmRoot = {
  wnds: [],

  get maximized() {
    return this.active && this.active.maximized;
  },
};

module.exports = {
  oninit: function() {
    for (let evName of ['keydown', 'keyup']) {
      document.addEventListener(evName, ev => {
        if (ev.key !== 'Meta' || !this.dom) {
          return;
        }

        let dragMode = ev.type === 'keydown';

        let addOrRemoveClass = dragMode ?
          'addClass' : 'removeClass';

        this.$dom[addOrRemoveClass]('wmRoot--dragMode');

        let enableOrDisableDraggable = dragMode ?
          'enable' : 'disable';

        for (let wnd of gWmRoot.wnds) {
          try {
            wnd.$dom.draggable(enableOrDisableDraggable);
          }
          catch(err) {
            console.error(err);
          }
        }
      });
    }
  },

  oncreate: function(vn) {
    this.dom = vn.dom;
    this.$dom = $(this.dom);
  },

  view: function() {
    return m('.wmRoot', gWmRoot.wnds.map(
      x => m(wnd, x)
    ));
  },
};