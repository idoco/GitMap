var React = require('react');
var ReactDOM = require('react-dom');
var Modal = require('react-modal');


var Controller = require('./Controller');
var controller = new Controller();


var appElement = document.getElementById('example');

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
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

                    <h2>Hello</h2>
                    <button onClick={this.closeModal}>close</button>
                    <div>I am a modal</div>
                    <form>
                        <input />
                        <button>tab navigation</button>
                        <button>stays</button>
                        <button>inside</button>
                        <button>the modal</button>
                    </form>
                </Modal>

            </div>
        );
    }
});

ReactDOM.render(<App/>, appElement);