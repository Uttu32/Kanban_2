import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div>
      Page Not Found

      <button onClick={()=> navigate("/")}>Go to Home</button>
      
    </div>
  )
}
