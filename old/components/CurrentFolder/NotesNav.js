import React from 'react'
import NoteTitle from './NoteTitle'
import NoteDirectory from './NoteDirectory'
import SettingsButton from './SettingsButton'
import AddNoteButton from './AddNoteButton'

export default function NotesNav({
	state = { state },
	setState = { setState },
	vars = { vars },
}) {
	return (
		<div className="notes_nav_container">
			<NoteTitle state={state} setState={setState} vars={vars} />
			<NoteDirectory state={state} setState={setState} vars={vars} />
			<SettingsButton state={state} setState={setState} vars={vars} />
			<AddNoteButton state={state} setState={setState} vars={vars} />
		</div>
	)
}
