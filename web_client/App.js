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

const geoJsonContent = "?url=https://raw.githubusercontent.com/idoco/GitMap/gh-pages/map.geojson";
const renderMapUrl = "https://render.githubusercontent.com/view/geojson"+ geoJsonContent;

var App = React.createClass({

    getInitialState: function() {
        return { modalIsOpen: controller.isUrlWithCode() };
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
                <div className="page-content">
                    <iframe id="mapFrame"
                            src={renderMapUrl}
                            style={{width:'100%', height:'100%', position:'fixed'}}>
                        Your browser doesn't support iframes
                    </iframe>
                </div>

                <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"
                        style={{position: 'fixed', left: '65px', bottom: '65px'}}
                        onClick={controller.refreshMap}>
                    <i id="refresh-button" className="material-icons">refresh</i>
                </button>

                <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"
                        style={{position: 'fixed', right: '65px', bottom: '65px'}}
                        onClick={this.openModal}>
                    <i id="submit-button" className="material-icons">add_location</i>
                </button>

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles} >
                    <NewEntryForm postNewEntry={controller.postNewEntry}
                                  isTokenReady={controller.isTokenReady}
                                  isUrlWithCode={controller.isUrlWithCode}
                    />
                </Modal>
            </div>
        );
    }
});

ReactDOM.render(<App/>, appElement);
