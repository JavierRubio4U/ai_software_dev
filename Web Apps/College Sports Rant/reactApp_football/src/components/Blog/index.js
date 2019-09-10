import React, { Component } from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';

import Banner from '../Banner';
import MainView from './MainView';
import Tags from './Tags';

import {
  BLOG_PAGE_LOADED,
  BLOG_PAGE_UNLOADED,
  APPLY_TAG_FILTER
} from '../../constants/actionTypes';

const Promise = global.Promise;

const mapStateToProps = state => ({
  ...state.blog,
  appName: state.common.appName,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onClickTag: (tag, pager, payload) =>
    dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload }),
  onLoad: (tab, pager, payload) =>
    dispatch({ type: BLOG_PAGE_LOADED, tab, pager, payload }),
  onUnload: () =>
    dispatch({  type: BLOG_PAGE_UNLOADED })
});

class Blog extends Component {
  componentWillMount() {
    const tab = this.props.token ? 'feed' : 'all';
    const articlesPromise = this.props.token ?
      agent.Articles.feed :
      agent.Articles.all;

    this.props.onLoad(tab, articlesPromise, Promise.all([agent.Tags.getAll(), articlesPromise()]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
      return (

          <div className="home-page">

              <Banner token={this.props.token} appName={this.props.appName} />

              <div className="container page">
                  <div className="row">

                      <MainView />

                      <div className="col-xs-12 col-sm-12 col-md-3">
                          <div className="sidebar">

                              <p>Team &amp; Popular Tags</p>

                              <Tags tags={this.props.tags} onClickTag={this.props.onClickTag} />

                          </div>
                      </div>
                  </div>
              </div>
              <div className="spacer"></div>
          </div>
      );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
