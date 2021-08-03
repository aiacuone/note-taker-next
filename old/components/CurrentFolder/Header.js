import React from 'react'
import NotesNav from './NotesNav'

export default function Header({
	state = { state },
	setState = { setState },
	vars = { vars },
}) {
	return (
		<div className="current_folder_header">
			<NotesNav state={state} setState={setState} vars={vars} />
		</div>
	)
}
