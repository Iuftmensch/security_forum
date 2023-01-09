import './App.scss';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './containers/header';
import Modal from './containers/modal';
import Thread from './containers/thread';
import Home from './containers/home';
import Tag from './containers/tag';
import UserDetail from './containers/user';
import Account from './containers/account';
import GuideContainer from './containers/guidelines';
import Release from './components/Release';
import NotFoundPage from './components/NotFoundPage';
import About from './components/About';
import Footer from './components/Footer';
import ScrollRestoration from 'react-scroll-restoration'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import 'react-markdown-editor-lite/lib/index.css';
import 'react-calendar-heatmap/dist/styles.css';
import "easymde/dist/easymde.min.css";
import { useIdleTimer } from 'react-idle-timer'

function App(props) {

  const onIdle = () => {
    props.logout();
  }

  const {
    getRemainingTime,
  } = useIdleTimer({
    onIdle, timeout: 1000 * 60 * 60 * 24 // set the expiration time up to 24 hours
  })


  return (
    <div className="App">
      {/* <header className="header-background" /> */}
      <Header />
      <div className="app-layout">
        <Router>
          <ScrollRestoration />
          <Switch>
            <Route path="/thread/:thread" component={Thread} />
            <Route path="/user/:username" component={UserDetail} />
            <Route path="/account/:username" component={Account} />
            <Route path="/tag" component={Tag} />
            <Route path="/about" component={About} />
            <Route path="/guide" component={GuideContainer} />
            <Route path="/release" component={Release} />
            <Route path="/" component={Home} />
            <Route component={NotFoundPage} />
          </Switch>
        </Router>
      </div>
      <Footer />
      <Modal />
    </div>
  );
}

export default App;
