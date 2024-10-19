import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import BNSIntegration from './components/BNSIntegration';
import SmartWallet from './components/SmartWallet';
import Analytics from './components/Analytics';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/bns" component={BNSIntegration} />
          <Route path="/wallet" component={SmartWallet} />
          <Route path="/analytics" component={Analytics} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;