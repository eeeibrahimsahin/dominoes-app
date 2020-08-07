import React from 'react';
import './Store.css';
import Image from './Image';

export default function Store(props) {
    const joinArray = (arr) => {
        return arr.join('-');
    };
    return (
        <div>
            <ul className="Store">
                {props.tiles.map((tile) => (
                    <Image numbers={joinArray(tile)} />
                ))}
            </ul>
        </div>
    );
}
