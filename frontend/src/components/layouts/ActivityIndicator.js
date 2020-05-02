import React from 'react';
import "../../styles/loading.css";

function Loading(props) {
    return(
        <div className="loading-container">
            <div className="loading-background"></div>
            <div className="loading-symbol">
                <div className="loading-circle"></div>
                <div className="loading-text">
                    Loading...
                </div>
            </div>
        </div>
    );
}

export default Loading;