var React = require('react');
var ReactDOM = require('react-dom');
var Modal = require('react-modal');

var NewEntryForm = require('./NewEntryForm');

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
    position: 'fixed', left: '65px', bottom: '65px'
};

const rightButtonStyle = {
    position: 'fixed', right: '65px', bottom: '65px'
};

const geoJsonContent = "?url=https://raw.githubusercontent.com/idoco/GeoJsonHack/gh-pages/map.geojson";
const map = "https://render.githubusercontent.com/view/geojson"+ geoJsonContent;

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
                            src={map}
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

                    <NewEntryForm postNewEntry={controller.postNewEntry} />

                </Modal>

            </div>
        );
        }
        });

        ReactDOM.render(<App/>, appElement);
