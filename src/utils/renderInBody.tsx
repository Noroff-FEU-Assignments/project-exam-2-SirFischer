
import React, { } from 'react'
import ReactDOM from 'react-dom';

export function InBody({ children } : any) {
    const [hasMounted, setHasMounted] = React.useState(false);
    React.useEffect(() => {
        setHasMounted(true);
    }, []);
    if (!hasMounted) {
        return null;
    }
    return ReactDOM.createPortal(
        children,
        document.body
    );
}