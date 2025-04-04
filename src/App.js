import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Header } from './components/ui/Header';
import { DirectorView } from './components/director/DirectorView'
import { MediaView } from './components/media/MediaView'
import { GenderView } from './components/gender/GenderView'
import { ProducerView } from './components/producer/ProducerView'
import { TypeView } from './components/type/TypeView'
import { UserView } from './components/users/UserView'
import { MediaUpdate } from "./components/media/MediaUpdate";


function App() {
  return <Router>
    <Header/>
    <Switch>
      <Route exact path='/' component={ MediaView} />
      <Route exact path='/users' component={UserView} />
      <Route exact path='/director' component={DirectorView} />
      <Route exact path='/gender' component={GenderView} />
      <Route exact path='/producer' component={ProducerView} />
      <Route exact path='/types' component={ TypeView} />
      <Route exact path='/media/:mediaId' component={ MediaUpdate } />
      <Redirect to='/' />
    </Switch>
</Router>
}

export default App;
