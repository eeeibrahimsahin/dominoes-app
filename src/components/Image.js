import React from 'react';
import './Image.css';
export default function Image(props) {
    return (
        <img
            src={require(`../assets/dominoes_tiles/${props.numbers}.png`)}
            className="Image"
            alt={props.numbers}
        />
    );
}
