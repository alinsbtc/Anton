import React from 'react';
import Typewriter from 'typewriter-effect';

const TypeMessage = React.memo(({ text, onDone }) => {
    return (
        <Typewriter
            options={{ delay: 20, cursor: '' }}
            onInit={(typewriter) => {
                typewriter
                    .typeString(text)
                    .callFunction(() => {
                        if (onDone) onDone();
                    })
                    .start();
            }}
        />
    );
});

export default TypeMessage;