const React = require('react');
const IdyllComponent = require('idyll-component');
const firebase = require('firebase');
const config = {
  apiKey: "AIzaSyDTb8s6iBJQr1CnNGQNLIqim4H73HShwW0",
  authDomain: "idyll-test.firebaseapp.com",
  databaseURL: "https://idyll-test.firebaseio.com",
  projectId: "idyll-test",
  storageBucket: "idyll-test.appspot.com",
  messagingSenderId: "285966778389"
};

class DrawComponent extends IdyllComponent {
  componentDidMount() {
    const fb = firebase
      .initializeApp(config)
      .database()
      .ref();


    fb.on('value', snapshot => {
      const store = snapshot.val();
      console.log(store);
      this.updateProps({state: store})
    });

    this.updateProps({ database:fb });
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <span />;
  }
}

module.exports = DrawComponent;

