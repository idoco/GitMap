var React = require('react');
var ReactDOM = require('react-dom');
var Modal = require('react-modal');


var Controller = require('./Controller');
var controller = new Controller();


var appElement = document.getElementById('example');

const customStyles = {
    overlay: {
        zIndex: 100
    },
    content : {
        top         : '50%',
        left        : '50%',
        right       : 'auto',
        bottom      : 'auto',
        marginRight : '-50%',
        transform   : 'translate(-50%, -50%)',
        zIndex: 101
    }
};

const mapFrameStyle = {
    width:'100%', height:'100%', position:'fixed'
};

const leftButtonStyle = {
    position: 'fixed', left: '70px', bottom: '70px'
};

const rightButtonStyle = {
    position: 'fixed', right: '70px', bottom: '70px'
};

const buttonClassName = "mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored";
const materialIcons = "material-icons";
const pageContent = "page-content";

var App = React.createClass({

    getInitialState: function() {
        return { modalIsOpen: false };
    },

    openModal: function() {
        this.setState({modalIsOpen: true});
    },

    closeModal: function() {
        this.setState({modalIsOpen: false});
    },

    render: function() {
        return (

            <div>

                <div className={pageContent}>
                    <iframe id="mapFrame"
                            src="https://render.githubusercontent.com/view/geojson?url=https://raw.githubusercontent.com/idoco/GeoJsonHack/gh-pages/map.geojson"
                            style={mapFrameStyle}>
                        Your browser doesn't support iframes
                    </iframe>
                </div>

                <button className={buttonClassName}
                        style={leftButtonStyle}
                        onClick={controller.refreshMap}>
                    <i id="refresh-button" className={materialIcons}>refresh</i>
                </button>

                <button className={buttonClassName}
                        style={rightButtonStyle}
                        onClick={this.openModal}>
                    <i id="submit-button" className={materialIcons}>add_location</i>
                </button>

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles} >

                    <h2>Submit new entry</h2>
                    <div>I am a modal</div>
                    <form>

                        <div class="form-group">
                            <label for="input_text">First Name</label>
                            <input type="text" id="input_text" placeholder="First Name"/>
                        </div>
                        <div class="form-group">
                            <label for="input_email">Email address</label>
                            <input type="email" id="input_email" placeholder="Email"/>
                        </div>
                        <div class="radio">
                            <label>
                                <input type="radio" name="optionsRadios" value="option1" checked>
                                    Option 1
                                </input>
                            </label>
                            <label>
                                <input type="radio" name="optionsRadios" value="option2">
                                    Option 2
                                </input>
                            </label>
                        </div>
                    </form>
                    <button onClick={this.closeModal}>close</button>
                </Modal>

            </div>
        );
        }
        });

        ReactDOM.render(<App/>, appElement);