import React, { Component } from 'react';
import { Link } from 'react-router';

import MobileNav from './MobileNav';

const LoggedOutView = props => {
  if (!props.currentUser) {
    return (
        <ul className="nav navbar-nav pull-xs-right hidden-sm-down">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="blogs" className="nav-link">Blogs</Link>
          </li>
          <li className="nav-item">
            <Link to="login" className="nav-link">Sign in</Link>
          </li>
          <li className="nav-item">
            <Link to="register" className="nav-link">Sign up</Link>
          </li>
        </ul>
    );
  }
  return null;
};

const LoggedInView = props => {
  if (props.currentUser) {
    return (
        <ul className="nav navbar-nav pull-xs-right hidden-sm-down">
            <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
                <Link to="blogs" className="nav-link">Blogs</Link>
            </li>
            <li className="nav-item">
                <Link to="editor" className="nav-link"><i className="ion-compose"></i>&nbsp;New Post</Link>
            </li>
            <li className="nav-item">
                <Link to={`@${props.currentUser.username}`} className="nav-link">
                    <img src={props.currentUser.image} className="user-pic" alt={props.currentUser.username} />{props.currentUser.username}
                </Link>
            </li>
        </ul>
    );
  }
  return null;
};

class Header extends Component {
  render() {
    return (
        <div>
            <nav className="navbar navbar-light">
              <div className="container">

                  <Link to="/" className="navbar-brand hidden-sm-down">{this.props.appName.toLowerCase()}</Link>

                  <LoggedOutView className="hidden-sm-down" currentUser={this.props.currentUser} />

                  <LoggedInView className="hidden-sm-down" currentUser={this.props.currentUser} />

                  <MobileNav className="hidden-md-up" appName={this.props.appName} currentUser={this.props.currentUser} />

              </div>
            </nav>
        </div>
    );
  }
}

export default Header;
