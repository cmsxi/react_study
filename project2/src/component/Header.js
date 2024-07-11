import './Header.css';
import React from 'react';

export default React.memo(() => {
    console.log('header');
    return (
        <div className="Header">
            <h3>오늘은 📅</h3>
            <h1>{new Date().toDateString()}</h1>
        </div>
    );
});
