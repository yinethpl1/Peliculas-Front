import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Header } from './components/ui/Header';
import { BrandView } from './components/brands/BrandView'
import { InventoryView } from './components/inventory/InventoryView'
import { EquipmentTypeView } from './components/type/EquipmentTypeView'
import { EquipmentStateView } from './components/states/EquipmentStateView'
import { UserView } from './components/users/UserView'


function App() {
  return <Router>
    <Header/>
    <Switch>
      <Route exact path='/' component={InventoryView} />
      <Route exact path='/users' component={UserView} />
      <Route exact path='/brands' component={BrandView} />
      <Route exact path='/states' component={EquipmentStateView} />
      <Route exact path='/types' component={EquipmentTypeView} />
      <Redirect to='/' />
    </Switch>
</Router>
}

export default App;
