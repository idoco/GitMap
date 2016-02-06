var React = require('react');

var Entry = require("./Entry");

var NewEntryForm = React.createClass({

    getInitialState: function() {
        return {
            requestState: null,
            pullRequestUrl: '',
            err: ''
        }
    },

    componentDidUpdate: function() {
        componentHandler.upgradeDom();
    },

    componentDidMount: function() {
        componentHandler.upgradeDom();
    },

    submitForm: function() {
        var entry = new Entry({
            "lat": this.refs.lat.value,
            "lng": this.refs.lng.value,
            "title": this.refs.title.value,
            "description": this.refs.description.value,
            "symbol": this.refs.radio_startup.checked ? this.refs.radio_startup.value : this.refs.radio_job.value
        });

        var data = {
            username    : this.refs.username.value,
            password    : this.refs.password.value,
            entry       : entry,
            callback    : this.onPullRequestReady
        };

        console.info(data);
        this.setState({
            requestState: 'loading'
        });
        this.props.postNewEntry(data);
    },

    getLocation: function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                document.getElementById("lat_input").value = position.coords.latitude.toFixed(3);
                document.getElementById("lng_input").value = position.coords.longitude.toFixed(3);
            });
        } else {
            this.setState({
                requestState: 'error',
                err: 'Geolocation is not supported by this browser.'
            });
        }
    },

    onPullRequestReady: function(data) {
        if (data.err) {
            this.setState({
                requestState: 'error',
                err: data.err
            });
        } else {
            this.setState({
                requestState: 'ready',
                pullRequestUrl: data.pullRequestUrl
            });
        }
    },

    render: function() {
        return (
            <div>
                <h4>Post new entry</h4>
                <form>
                    <h6>GitHub Credentials</h6>

                    <div className="mdl-textfield mdl-js-textfield" style={{width: '200px'}}>
                        <input className="mdl-textfield__input" type="text" id="username" ref="username"/>
                        <label className="mdl-textfield__label" htmlFor="username">Username</label>
                    </div>

                    <div className="mdl-textfield mdl-js-textfield" style={{width: '200px'}}>
                        <input className="mdl-textfield__input" type="password" id="password" ref="password"/>
                        <label className="mdl-textfield__label" htmlFor="password">Password</label>
                    </div>

                    <h6>Position Details</h6>
                        <div className="mdl-textfield mdl-js-textfield">
                            <input className="mdl-textfield__input" type="text" id="title" ref="title"/>
                            <label className="mdl-textfield__label" htmlFor="title">Title</label>
                        </div>

                    <div>
                        <div style={{display: 'table-cell'}}>
                            <div className="mdl-textfield mdl-js-textfield" style={{width: '100px'}}>
                                <input className="mdl-textfield__input" type="text" id="lat_input" ref="lat"/>
                                <label className="mdl-textfield__label" htmlFor="lat_input">Latitude</label>
                            </div>
                            <div className="mdl-textfield mdl-js-textfield" style={{width: '100px'}}>
                                <input className="mdl-textfield__input" type="text" id="lng_input" ref="lng"/>
                                <label className="mdl-textfield__label" htmlFor="lng_input">Longitude</label>
                            </div>

                            <button className="mdl-button mdl-js-button mdl-button--accent"
                                    type="button" onClick={this.getLocation}>
                                Use My Location
                            </button>
                        </div>
                    </div>

                    <div className="mdl-textfield mdl-js-textfield">
                        <textarea className="mdl-textfield__input" type="text" rows= "5" id="description"
                                  ref="description">
                        </textarea>
                        <label className="mdl-textfield__label" htmlFor="description">Text lines...</label>
                    </div>

                    <div>
                        <label className="mdl-radio mdl-js-radio mdl-js-ripple-effect" htmlFor="radio_startup">
                            <input type="radio" id="radio_startup"
                                   className="mdl-radio__button" name="options"
                                   ref="radio_startup" value="rocket"/>
                            <span className="mdl-radio__label" >Startup</span>
                        </label>
                        <label className="mdl-radio mdl-js-radio mdl-js-ripple-effect" htmlFor="radio_job">
                            <input type="radio" id="radio_job"
                                   className="mdl-radio__button" name="options"
                                   ref="radio_job" value="rocket" />
                            <span className="mdl-radio__label" >Job Seeker</span>
                        </label>
                    </div>

                </form>
                <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                        onClick={this.submitForm}>
                    Post
                </button>

                {(function(state) {
                    if (!state.requestState) {
                        return (<div></div>);
                    } else if (state.requestState == 'loading') {
                        return (<div>Loading...</div>);
                    } else if (state.requestState == 'ready') {
                        return (<div><a href={state.pullRequestUrl}>Track your submission</a></div>);
                    } else if (state.requestState == 'error') {
                        return (<div>{state.err}</div>);
                    }
                })(this.state)}

            </div>
        );
    }
});

module.exports = NewEntryForm;