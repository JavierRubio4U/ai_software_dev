import React, { Component } from 'react';
import { Link } from 'react-router';

const MobileMenu = props => {

    let btnClass = 'navbar-toggler hidden-md-up';
    let menuClass = 'container-fluid navContainer';
    if( props.menuState ) {
        btnClass += ' open';
        menuClass += ' open';
    } else {
        btnClass += ' closed';
        menuClass += ' closed';
    }

    if (props.currentUser) {
        return (
            <div>
                <div>
                    <Link to="/" className="navbar-brand hidden-md-up">{props.appName.toLowerCase()}</Link>
                    <button className={ btnClass } type="button" data-toggle="collapse" data-target="#collapseNav" onClick={ props.onClick }>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
                <div className={ menuClass }>
                    <ul className="mMenu" id="collapseNav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link" onClick={props.onNavClick}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="blogs" className="nav-link" onClick={props.onNavClick}>Blogs</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="editor" className="nav-link" onClick={props.onNavClick}><i className="ion-compose"></i>&nbsp;New Post</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={`@${props.currentUser.username}`} className="nav-link" onClick={props.onNavClick}>
                                <img src={props.currentUser.image} className="user-pic" alt={props.currentUser.username} />{props.currentUser.username}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <div>
                    <Link to="/" className="navbar-brand hidden-md-up">{props.appName.toLowerCase()}</Link>
                    <button className={ btnClass } type="button" data-toggle="collapse" data-target="#collapseNav" onClick={ props.onClick }>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
                <div className={ menuClass }>
                    <ul className="mMenu" id="collapseNav">
                      <li className="nav-item">
                          <Link to="/" className="nav-link" onClick={props.onNavClick}>Home</Link>
                      </li>
                      <li className="nav-item">
                          <Link to="blogs" className="nav-link" onClick={props.onNavClick}>Blogs</Link>
                      </li>
                      <li className="nav-item">
                          <Link to="login" className="nav-link" onClick={props.onNavClick}>Sign in</Link>
                      </li>
                      <li className="nav-item">
                          <Link to="register" className="nav-link" onClick={props.onNavClick}>Sign up</Link>
                      </li>
                    </ul>
                </div>
            </div>
        );
    }
};

class MobileNav extends Component {
    constructor(props){
        super(props);
        this.state = { menuState: false };
    }

    handleToggleBtnClick = ev => {
        ev.preventDefault();
        let menuState = this.state.menuState;
        if( menuState ) {
            this.setState({ menuState: false });
        } else {
            this.setState({ menuState: true });
        }
    };

    mobileNavClicked = (ev) => {
        this.setState({ menuState: false });
    }

    render() {
        return (<MobileMenu onClick={this.handleToggleBtnClick} menuState={this.state.menuState} onNavClick={this.mobileNavClicked} appName={this.props.appName} currentUser={this.props.currentUser}  />);
    }
}

export default MobileNav;
