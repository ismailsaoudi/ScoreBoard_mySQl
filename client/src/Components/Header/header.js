import React, { useState, useEffect } from 'react';
import '../Header/Header.css'

function Header() {
  const [time, setTime] = useState(new Date()); 
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="clock">
      <div className='Time'>
        {time.toLocaleTimeString([])}
      </div>
      
    </div>
  );
}

export default Header;
