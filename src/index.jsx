import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';
import './index.scss';
import MainView from './components/main-view/main-view';

const store = createStore(moviesApp, devToolsEnhancer());
console.log(store.getState());


class MyFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}> 
          <MainView />       
      </Provider>
      
    );
  }
}

const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(MyFlixApplication), container);

