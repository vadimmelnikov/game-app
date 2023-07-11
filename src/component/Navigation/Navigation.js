import React from "react";
import { Link, useHref } from "react-router-dom";


function Navigation() {
  const href = useHref();
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            {href === '/' ? 'React Test Game App' : 'Go Home'}
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
