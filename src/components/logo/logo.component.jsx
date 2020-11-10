import React from 'react';
import Tilt from 'react-tilt';

import brain from './brain.png';
import './logo.style.css';

const Logo = () => {
	return(
		<div className='ma4 mt0'>
			<Tilt className='Tilt br2 shadow-2 pa3' options={{max: 55}} style={{height: 150, width: 150}}>
				<div className='Tilt-inner'>
					<img src={brain} alt='brain-logo' style={{paddingTop:'5px'}}></img>
				</div>
			</Tilt>
		</div>
	);
}

export default Logo;