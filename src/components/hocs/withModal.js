import React from "react";

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