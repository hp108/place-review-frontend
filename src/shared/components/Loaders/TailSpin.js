import React from 'react';
import './TailSpin.css';
import {ClipLoader} from 'react-spinners'

function TailSpin() {
  return (
    <div className='tail-spin-spinner'  >
    <ClipLoader
  color="#36d7b7"
  size={100}
  speedMultiplier={1}
/>
</div>
);
}
export default TailSpin;
