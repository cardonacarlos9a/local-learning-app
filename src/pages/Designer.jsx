import { useState } from 'react';
import Header from '../components/shared/Header';

export default function Designer(){

      const [dragging, setDragging] = useState(false);
      const [position, setPosition] = useState({ x: 0, y: 0 });
      const [offset, setOffset] = useState({ x: 0, y: 0 });
    
      const handleMouseDown = (e) => {
        setDragging(true);
        const rect = e.target.getBoundingClientRect();
        setOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      };
    
      const handleMouseUp = () => {
        setDragging(false);
      };
    
      const handleMouseMove = (e) => {
        if (!dragging) return;
    
        const container = document.getElementById('container');
        const containerRect = container.getBoundingClientRect();
    
        let x = e.clientX - containerRect.left - offset.x;
        let y = e.clientY - containerRect.top - offset.y;
    
        // Check boundaries to prevent the button from moving outside the container
        x = Math.max(0, Math.min(x, containerRect.width - e.target.offsetWidth));
        y = Math.max(0, Math.min(y, containerRect.height - e.target.offsetHeight));
    
        setPosition({ x, y });
      };
    
      return (
        <>
        <Header></Header>
        
        </>
      );
    }
    
    