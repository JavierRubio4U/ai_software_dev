import React, { Component } from 'react';

class Video extends Component {
    render() {
        return (
            <div className="embed-responsive embed-responsive-16by9">
                <iframe width="auto" height="auto" src={ this.props.config.source } allowFullScreen></iframe>
            </div>
        );
    }
}

export default Video;
