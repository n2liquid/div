module.exports = {
  oninit: function(vn) {
    this.metal = vn.attrs.metal;
  },

  oncreate: function(vn) {
    let $input = $(vn.dom).find('.metalNav-urlInput');

    $input
      .on('dblclick', () => {
        if (this.focus) {
          return;
        }

        this.focus = true;
        $input.focus().select();
      })
      .on('focus', () => {
        if (this.focus) {
          return;
        }

        $input.blur();
      })
      .on('blur', () => {
        this.focus = false;
      })
      .on('keydown', ev => {
        switch (ev.key) {
          case 'Escape':
            $input.val(this.metal.url).blur();
            break;

          case 'Enter':
            let url = $input.val();

            if (!/^[^:]+:\/\//.test(url)) {
              url = `https://${url}`;
            }

            this.metal.url = url;

            $input.blur();
            m.redraw();

            break;
        }
      });
  },

  view: function(vn) {
    let { inMenuWndTitle } = vn.attrs;

    return m('.metalNav', {
      class: makeClassString({
        'metalNav--inWnd': !inMenuWndTitle,
        'metalNav--inMenuWndTitle': inMenuWndTitle,
      }),
    }, [
      m('input.metalNav-urlInput', {
        autocomplete: 'off',
        autocorrect: 'off',
        autocapitalize: 'off',
        spellcheck: false,
        value: this.metal.url,

        class: makeClassString({
          'metalNav-urlInput--inWnd': !inMenuWndTitle,
          'metalNav-urlInput--inMenuWndTitle': inMenuWndTitle,
        }),
      }),
    ]);
  },
};
