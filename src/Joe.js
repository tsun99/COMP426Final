import React from 'react'

const Joe = ({handleLogout}) => {
    return (
        <section className="joe">
            <div className="btncontainer">
                <div className="btncontainerchild">
                    <button className="loginbtn" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </section>
    )
}

export default Joe
