import React from 'react';

const Profile = (props) => {
    return (
        <div className="center-it profile-container">
            <div style={{textAlign:'center'}}>
                <img style={{borderRadius:'50%'}} src={"https://picsum.photos/300"} alt="Profile" />
            </div>
            <div>
                {/* Profile Details */}
            </div>
        </div>
    );
}
 
export default Profile;