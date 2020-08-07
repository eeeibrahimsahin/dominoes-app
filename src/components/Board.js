import React from 'react';

export default function Board(props) {
    return (
        <div>
            <Board tiles={props.tiles} />
        </div>
    );
}
