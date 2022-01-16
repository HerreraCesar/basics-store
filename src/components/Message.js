import React from 'react'

const Message = ({message, opacity}) => {
    /* const [active, setActive] = useState(active) */
    return (
        <div className="message">
            <i className="fas fa-check"></i>
            <span>{message}</span>
        </div>
    )
}

export default Message
