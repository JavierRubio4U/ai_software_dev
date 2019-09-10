import React, { Component } from 'react';

const SocialBar = () => {
    return (
        <div className="socialGroup text-xs-center">
            <a id="lastSocial" href="https://www.facebook.com/College-Sports-Rant-116907178978669/" target="_blank" className="medBadge facebook"><i className="fa fa-facebook"></i></a>
            <a href="https://twitter.com/collsportsrant" target="_blank" className="medBadge twitter"><i className="fa fa-twitter"></i></a>
        </div>
    );
};

class Footer extends Component {
  render() {
    return (
        <div className="container-fluid">
           <div id="staticFooter" className="row">
               <div className="col-xs-12 col-sm-12 col-md-4 push-md-8 text-xs-center"><SocialBar /></div>
               <div className="col-xs-12 col-sm-12 col-md-8 pull-md-4 footerLinks text-xs-center">
                   <div className="row">
                       <div className="col-xs-6 col-sm-6 col-md-6"><span>&copy; 2017 <span className="color">infused Ideas</span></span></div>
                       <div className="col-xs-3 col-sm-3 col-md-3"><span><a href="mailto:marketing@collegesportsrant.com">Marketing</a></span></div>
                       <div className="col-xs-3 col-sm-3 col-md-3"> <span><a href="mailto:collegesportsrant@gmail.com">Support</a></span></div>
                   </div>
               </div>

           </div>
      </div>
    );
  }
}

export default Footer;
