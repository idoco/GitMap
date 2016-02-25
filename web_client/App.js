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
        console.log(controller.isUrlWithCode());
        return {
            modalIsOpen: controller.isUrlWithCode(),
            isAboutOpen: !controller.isUrlWithCode()
        };
    },

    openModal: function() {
        this.setState({modalIsOpen: true});
    },

    closeModal: function() {
        this.setState({modalIsOpen: false});
    },

    closeAbout: function() {
        this.setState({isAboutOpen: false});
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

                <Modal
                    isOpen={this.state.isAboutOpen}
                    onRequestClose={this.closeAbout}
                    style={customStyles}  >
                    <div style={{width: '360px'}}>
                        <h5 className="mdl-dialog__title">How GitMap Works?</h5>
                        <div className="mdl-dialog__content">
                            <p>
                                This demo explores the possibility of building a "serverless" location based app by
                                using only GitHub's cool ability to render GeoJSON files as interactive maps, and the
                                powerful GitHub API.
                            </p>
                            <p>
                                The map view is rendered by GitHub from a GeoJSON file stored on GitHub pages and new
                                entries are added to it by forking and creating a pull request on behalf of the
                                submitting user. This GitHub "serverless" architecture is powered by using GitHub itself
                                as the app's database and writing to it by using GitHub's API directly from the user's
                                browser.
                            </p>
                        </div>
                        <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                                onClick={this.closeAbout}>
                            Close
                        </button>
                    </div>
                </Modal>


            </div>
        );
    }
});

ReactDOM.render(<App/>, appElement);
