import { Fragment } from 'react';
import { Routes, Route } from "react-router-dom";
import { anAuthenticatedPaths } from '../../app-modules';


const UnAuthenticated = () => {
  return (
    <Fragment>
      {
        <Routes>
        {anAuthenticatedPaths.map((route, idx) => (
          <Route
            key={idx}
            path={route.path}
            element={route.component}
          />
        ))}
        </Routes>
      }
    </Fragment>
  )
}

export default UnAuthenticated;