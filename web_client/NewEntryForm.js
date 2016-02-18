var React = require('react');

var Entry = require("./Entry");

var NewEntryForm = React.createClass({

    getInitialState: function() {
        return {
            requestState: 'notSent',
            pullRequestUrl: '',
            err: ''
        };
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
                document.getElementById("lat_div").className += " is-dirty";

                document.getElementById("lng_input").value = position.coords.longitude.toFixed(3);
                document.getElementById("lng_div").className += " is-dirty";
                componentHandler.upgradeDom();
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

        if (!this.props.isTokenReady() && !this.props.isUrlWithCode()){
            return (
                <div>
                    <a href="https://github.com/login/oauth/authorize?client_id=7c710fb3bcb9805f7c3a&scope=public_repo">
                        First, allow me to fork this repository for you.
                    </a>
                </div>
            );
        }

        return (
            <div>
                <form>

                    <h6>Position Details</h6>
                    <div className="mdl-textfield mdl-js-textfield">
                        <input className="mdl-textfield__input" type="text" id="title" ref="title"/>
                        <label className="mdl-textfield__label" htmlFor="title">Title</label>
                    </div>

                    <div>
                        <div style={{display: 'table-cell'}}>
                            <div className="mdl-textfield mdl-js-textfield" style={{width: '100px'}}
                                 id="lat_div">
                                <input className="mdl-textfield__input" type="text" id="lat_input"
                                       pattern="-?[0-9]*(\.[0-9]+)?" ref="lat"/>
                                <label className="mdl-textfield__label" htmlFor="lat_input" >Latitude</label>
                                <span className="mdl-textfield__error">Input is not a number!</span>
                            </div>
                            <div className="mdl-textfield mdl-js-textfield" style={{width: '100px'}}
                                 id="lng_div">
                                <input className="mdl-textfield__input" type="text" id="lng_input"
                                       pattern="-?[0-9]*(\.[0-9]+)?" ref="lng"/>
                                <label className="mdl-textfield__label" htmlFor="lng_input">Longitude</label>
                                <span className="mdl-textfield__error">Input is not a number!</span>
                            </div>

                            <button className="mdl-button mdl-js-button mdl-button--accent"
                                    type="button" onClick={this.getLocation}>
                                Use My Location
                            </button>
                        </div>
                    </div>

                    <div className="mdl-textfield mdl-js-textfield" style={{width: '100%'}}>
                        <textarea className="mdl-textfield__input" type="text" rows= "4" id="description"
                                  ref="description">
                        </textarea>
                        <label className="mdl-textfield__label" htmlFor="description">Job Desciption</label>
                    </div>

                    <div>
                        <label className="mdl-radio mdl-js-radio mdl-js-ripple-effect"
                               htmlFor="radio_startup" style={{margin: '10px'}}>
                            <input type="radio" id="radio_startup" defaultChecked={true}
                                   className="mdl-radio__button" name="options"
                                   ref="radio_startup" value="rocket"/>
                            <span className="mdl-radio__label" >Startup</span>
                        </label>
                        <label className="mdl-radio mdl-js-radio mdl-js-ripple-effect"
                               htmlFor="radio_job">
                            <input type="radio" id="radio_job"
                                   className="mdl-radio__button" name="options"
                                   ref="radio_job" value="clothing-store" />
                            <span className="mdl-radio__label" >Job Seeker</span>
                        </label>
                    </div>

                </form>
                <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                        disabled={this.state.requestState == 'loading' || this.state.requestState == 'ready'}
                        onClick={this.submitForm}>
                    Publish
                </button>

                {(function(state) {
                    if (!state.requestState) {
                        return (<div></div>);
                    } else if (state.requestState == 'loading') {
                        return (
                            <div>
                                <br/>
                                <div className={"mdl-progress mdl-js-progress mdl-progress__indeterminate"}
                                     style={{width: '100%'}}></div>
                            </div>);
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