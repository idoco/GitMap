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
                document.getElementById("lat_input").value = position.coords.latitude;
                document.getElementById("lng_input").value = position.coords.longitude;
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
                    <div>
                        <label>Username</label>
                        <div></div>
                        <input type="text" ref="username"/>
                    </div>
                    <div>
                        <label>Password</label>
                        <div></div>
                        <input type="password" ref="password"/>
                    </div>

                    <h6>Position Details</h6>
                    <div>
                        <label>Title</label>
                        <div></div>
                        <input type="text" ref="title"/>
                    </div>


                    <div>
                        <br/>
                        <span>
                            <label>Latitude</label>
                            <input type="text" ref="lat" id="lat_input"/>
                            <label>Longitude</label>
                            <input type="text" ref="lng" id="lng_input"/>
                            <button type="button" onClick={this.getLocation}>Use My</button>
                        </span>
                    </div>

                    <div>
                        <br/>
                        <label>Description</label>
                        <div></div>
                        <textarea ref="description" rows="10" cols="60"/>
                    </div>

                    <div>
                        <label>
                            <span>Startup</span>
                            <input type="radio" name="myRadioInput" ref="radio_startup" value="rocket" defaultChecked={true}/>
                        </label>
                        <label>
                            <span>Job Seeker</span>
                            <input type="radio" name="myRadioInput" ref="radio_job" value="clothing-store"/>
                        </label>
                    </div>

                </form>
                <button onClick={this.submitForm}>Post</button>

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