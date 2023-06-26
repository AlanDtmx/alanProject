import React from "react";

function Lista({ Games }) {
    return (
        <>
        <h2>GAMES ABAIXO</h2>
        {Games.map(Game => {
            <p>{Game}</p>
        })}
        </>
    );
}

export default Lista;