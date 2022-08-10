import React from 'react';
import ReactDOM from 'react-dom';
import domready from 'domready';
import { Provider } from 'react-redux';
import store from './redux/store';
import { appContext } from './redux/utils';
import App from './components/App';

const render = () => {
  ReactDOM.render(
    <Provider store={store} context={appContext}>
      <App />
    </Provider>,
    document.getElementById('app')
  );
};

domready(() => {
  render();
});

if (module.hot) {
  module.hot.accept('./components/App', () => {
    render();
  });
}
