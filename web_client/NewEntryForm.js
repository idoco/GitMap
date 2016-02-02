var React = require('react');

var NewEntryForm = React.createClass({

    submitForm: function() {
        var data = {
            username    : this.refs.username.value,
            password    : this.refs.password.value,
            title       : this.refs.title.value,
            description : this.refs.description.value,
            lat         : this.refs.lat.value,
            lng         : this.refs.lng.value,
            type        : "rocket"
        };

        console.info(data);
        //this.props.submit(data);
    },

    render: function() {
        return (
            <div>
                <h4>Submit new entry</h4>
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
                            <input type="text" ref="lat"/>
                            <label>Longitude</label>
                            <input type="text" ref="lng"/>
                        </span>
                    </div>

                    <div>
                        <br/>
                        <label>Description</label>
                        <div></div>
                        <textarea ref="description" rows="10" cols="70"/>
                    </div>

                    <div>
                        <label>
                            <span>Startup</span>
                            <input type="radio" name="myRadioInput" value="rocket"/>
                        </label>
                        <label>
                            <span>Job Seeker</span>
                            <input type="radio" name="myRadioInput" value="clothing-store"/>
                        </label>
                    </div>

                </form>
                <button onClick={this.submitForm}>submit</button>
            </div>
        );
    }
});

module.exports = NewEntryForm;