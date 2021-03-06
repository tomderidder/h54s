/* global Ext, sasAdapter */
Ext.define('h54sExample.view.LoginWindow', {
  extend: 'Ext.window.Window',
  alias: 'widget.LoginWindow',

  width: 328,
  bodyPadding: 10,
  title: 'SAS Logon Manager',
  modal: true,
  defaultListenerScope: true,
  closable: false,

  defaultFocus: 'userId',

  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [
    {
      xtype: 'textfield',
      flex: 1,
      name: 'ux',
      itemId: 'userId',
      fieldLabel: 'User ID',
      listeners: {
        specialkey: function (f, e) {
          if (e.getKey() == e.ENTER || e.getKey() === e.TAB) {
            e.preventDefault();
            this.up('window').down('textfield[name="px"]').focus(true, 10);
          }
        },
        change: function() {
          this.up('window').down('label').setText('');
        }
      }
    }, {
      xtype: 'textfield',
      inputType: 'password',
      flex: 1,
      name: 'px',
      fieldLabel: 'Password',
      listeners: {
        specialkey: function (f, e) {
          if (e.getKey() == e.ENTER) {
            this.up('window').onOkClick();
          }
          if(e.getKey() === e.TAB) {
            e.preventDefault();
            Ext.getCmp('loginSubmit').focus(false, 10);
          }
        },
        change: function() {
          this.up('window').down('label').setText('');
        }
      }
    }, {
      xtype: 'label',
      flex: 1,
      height: 20,
      style: {
        textAlign: 'center',
        lineHeight: '20px'
      }
    }, {
      xtype: 'container',
      height: 28,
      margin: '10 0 0 0',
      layout: {
        type: 'vbox',
        align: 'center'
      },
      items: [
        {
          id: 'loginSubmit',
          xtype: 'button',
          width: 120,
          text: 'Sign in',
          listeners: {
            click: 'onOkClick'
          }
        }
      ]
    }
  ],

  onOkClick: function () {
    var win = this;

    var message = win.down('label');
    var submitBtn = win.down('button');
    var user = win.down('textfield[name="ux"]').getValue();
    var pass = win.down('textfield[name="px"]').getValue();

    submitBtn.disable();
    message.setStyle('color', 'inherit');
    message.setText('Authenticating...');
    message.show();

    sasAdapter.login(user, pass, function (err) {
      submitBtn.enable();
      if (err) {
        message.setStyle('color', 'red');
        message.setText(err);
        return;
      }
      win.close();
    });
  }

});
