import React from 'react'
import Notes from './Notes'

export default function NotesSection({
	state = { state },
	setState = { setState },
	vars = { vars },
}) {
	return (
		<div className="notes_container">
			{vars.currentFolder.notes ? (
				<Notes state={state} setState={setState} vars={vars} />
			) : (
				<div className="curret_page_notes">
					<h3 className="curret_page_note_text">NO NOTES</h3>
				</div>
			)}
		</div>
	)
}
