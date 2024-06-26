import { Fragment } from 'react';
import { Routes, Route } from "react-router-dom";
import { authenticatedPaths } from '../../app-modules';
import AdminNavigation from '../administrator/AdminNavigation';
import Carousel from '../administrator/component/Carousel';
const Authenticated = () => {
  return (
    <Fragment>
    <AdminNavigation />
    <main>
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      {
        <Routes>
        {authenticatedPaths.map((route, idx) => (
          <Route
            key={idx}
            path={route.path}
            element={route.component}
          />
        ))}
        </Routes>
      }
      </div>
    
    </main>
  
    </Fragment>
  )
}

export default Authenticated;