import React, { Component } from 'react';
import { connect } from 'react-redux';
import TwitterTimeline from 'react-twitter-embedded-timeline';

import Banner from '../Banner';
import Footer from '../Footer';
import VidSources from '../VidSources';
import Video from './Video';

const mainVid = VidSources.mainVid;
const vidSource1 =  VidSources.vidSource1;
const vidSource2 =  VidSources.vidSource2;
const vidSource3 =  VidSources.vidSource3;
const vidSource4 =  VidSources.vidSource4;
const headlineTag = VidSources.headline;

const mapStateToProps = state => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token
});

class Home extends Component {
    render() {
        return (
            <div className="home-page">

                <Banner token={this.props.token} appName={this.props.appName} />

                <section className="container-fluid page">
                        <div className="card">
                            <div className="card-img-top">
                                <Video config={ mainVid } />
                            </div>
                            <div className="card-block">
                                <p className="card-text lead">{ headlineTag }</p>
                            </div>
                        </div>
                        <div className="row vidRow">
                            <div className="col-xs-12 col-sm-12 col-md-6">
                                <Video config={ vidSource1 } />
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-6">
                                <br className="hidden-md-up" />
                                <Video config={ vidSource2 } />
                            </div>
                        </div>
                        <br />
                        <div className="row vidRow">
                            <div className="col-xs-12 col-sm-12 col-md-6">
                                <Video config={ vidSource3 } />
                                <br className="hidden-md-up" />
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-6">
                                <Video config={ vidSource4 } />
                            </div>
                        </div>
                </section>

                <section className="container-fluid intro">
                    <div className="row">
                        <div className="col-xs-8 offset-xs-2">
                            <p className="lead">College Sports Rant is a social blogging platform that enables our user community to converse, share and rant about their favorite college sports teams.</p>
                            <p className="lead">Check out our blog session for the spirited discussion and sign up to post your rants. Pass along to your friends!!</p>
                        </div>
                    </div>
                </section>

                <section className="container-fluid">
                    <h2>Sports News</h2>
                    <span className="lineBreak"></span>
                    <div className="row ">
                        <div className="col-xs-12 col-sm-12 col-md-8 painAss">
                            <div className="row">
                                <div className="col-xs-12 col-sm-12 col-md-12 text-xs-center">
                                    <iframe height="600" width="100%" src="https://feed.mikle.com/widget/v2/41885/" className="rssFeed" ></iframe>
                                </div>
                            </div>
                        </div>
                        <br className="hidden-md-up" />
                        <div className="col-xs-12 col-sm-12 col-md-4 painAss text-xs-center text-sm-center text-md-left">
                            <TwitterTimeline widgetId="897177123563155456" chrome="nofooter" />
                        </div>
                    </div>
                </section>

                <div className="spacer"></div>
                <div className="footer">
                     <Footer />
                </div>
            </div>
        );
    }
}

export default connect( mapStateToProps, {} )(Home);
