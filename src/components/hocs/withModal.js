import React from "react";
import PropTypes from 'prop-types';

export default function withModal(Component) {
    return function(props) {
        const [visibility, setVisibility] = React.useState(false);
        
        function handleOpenModal() {
            setVisibility(true)
        }

        function handleCloseModal() {
            setVisibility(false)
        }

        return (
            <Component {...props} visibility={visibility} handleOpenModal={handleOpenModal} handleCloseModal={handleCloseModal} />
        )
    }
}

withModal.propTypes = {
    Component: PropTypes.element.isRequired
}