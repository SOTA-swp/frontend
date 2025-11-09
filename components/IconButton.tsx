import React from 'react'

function IconButton({ children }: { children?: React.ReactNode }) {
    return (
        <button
            className='
                p-2
                rounded-full
                hover:bg-gray-200
                active:bg-gray-300
                transition
                duration-150
                ease-in-out
                text-text-secondary
            '
        >
            {children}
        </button>
    )
}

export default IconButton