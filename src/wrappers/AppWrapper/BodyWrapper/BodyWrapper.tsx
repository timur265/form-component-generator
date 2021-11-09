import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { routes } from "src/config/routes";
import HomePage from "src/pages/HomePage";

function BodyWrapper() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={routes.home} exact component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default BodyWrapper;
