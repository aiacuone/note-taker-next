import React from 'react'
import point from 'images/bubble_point.svg'

export default function NoteNameWarning({ state, setState, vars }) {
	let message

	let warningForNotesSection = state.directory.length > 0 ? true : false

	if (warningForNotesSection) {
		message = vars.currentFolder.notes[state.input.toLowerCase()]
			? 'That title already Exists'
			: state.input.length > 15
			? 'Too many characters'
			: vars.currentFolder.folders[state.input] && 'That title already Exists'
	} else {
		message = state.folders[state.input.toLowerCase()]
			? 'That title already Exists'
			: state.input.length > 15 && 'Too many characters'
	}

	return (
		<div className="current_folder_add_note_warning">
			<div className="current_folder_add_note_warning_wrapper">
				<p className="current_folder_add_note_warning_text">{message}</p>
			</div>
			<img className="current_folder_add_note_warning_point" src={point} />
		</div>
	)
}
