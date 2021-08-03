import React from 'react'
import add_note from './images/add_note.svg'

export default function AddFolderButton({
	state = { state },
	setState = { setState },
	vars = { vars },
}) {

	function handlePageChange(e) {
		e.preventDefault()
		setState.setRender(['mainSection','addFolder','#A0A0A0'])
	}
	return (
		<div
		className="current_folder_add_folder_button"
			onClick={handlePageChange}>
			<img src={add_note} className="current_folder_add_folder_img" />
			<p className="current_folder_add_folder_text">FOLDER</p>
		</div>
	)
}
