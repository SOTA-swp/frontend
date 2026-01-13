import React from 'react'

type TextLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';

const className = (level: TextLevel) => {
    switch (level) {
        case 'h1':
            return 'text-4xl font-bold';
        case 'h2':
            return 'text-3xl font-bold';
        case 'h3':
            return 'text-2xl font-bold';
        case 'h4':
            return 'text-xl font-bold';
        case 'h5':
            return 'text-lg font-bold';
        case 'h6':
            return 'text-base font-bold';
        case 'p':
        default:
            return 'text-base';
    }
}

function CommonText(
    {
        level = 'p',
        children,
        ...props
    }:
        {
            level?: TextLevel,
            children?: React.ReactNode,
        } & React.HTMLAttributes<HTMLElement>
) {
    const Tag = level;
    props.className = `${className(level)} ${props.className ?? ''}`.trim();

    return (
        <Tag className={`${className(level)} ${props.className}`} {...props}>{children}</Tag>
    )
}

export default CommonText