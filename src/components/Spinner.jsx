import { useState, useEffect } from 'react';

export default function Spinner({ duration = 1500 }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  return visible ? <div className="spinner"></div> : null;
}
