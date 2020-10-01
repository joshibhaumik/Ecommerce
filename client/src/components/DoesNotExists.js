import React from 'react';

const DoesNotExists = () => {
    return (
        <div className="p-5">
            <p className="font-weight-bold" style={{fontSize:60}}><i className="fas fa-sad-tear"></i> 404 Does Not Exists</p>
            <p className="">The path you are looking for: {window.location.href} does not exists.</p>
        </div>
    );
}
 
export default DoesNotExists;