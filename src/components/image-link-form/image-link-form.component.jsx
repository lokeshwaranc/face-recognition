import React from 'react';

import './image-link-form.style.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
	return(
		<div>
			<p className='f3'>
				{'This is Magic Brain will detect faces on your pictures. Give it a try!'}
			</p>
			<div className='center'>
			<div className='form center pa4 br3 shadow-5'>
				<input 
					type='text' 
					className='f4 pa2 w-70 center' 
					onChange={onInputChange}
				/>
				<button 
					onClick={onButtonSubmit}
					className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'>Detect</button>
			</div>
				
			</div>
		</div>
	);
}

export default ImageLinkForm;