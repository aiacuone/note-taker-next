import React, { useEffect } from 'react'
import _ from 'lodash'

export default function DeleteNote({ state, setState, vars }) {
	let note = state.render[1]
	let selectedNote = note.title.toLowerCase()
	
	function handleDelete() {
		let directory = [...vars.directoryChain(), 'notes']
		let newCurrentNotes = { ...vars.currentFolder.notes }
		let newFolders = { ...state.folders }
		delete newCurrentNotes[selectedNote]
		_.set(newFolders, directory.join('.'), newCurrentNotes)
		setState.setFolders(newFolders)
		setState.setRender(['mainSection'])
		setState.setInput()
	}

	function handleExit() {
		setState.setRender(['mainSection'])
	}

	useEffect(() => {
		function handleMouseDown(e) {
			if (e.target.className == 'app') {
				handleExit()
			}
		}

		document.addEventListener('mousedown', handleMouseDown)

		return () => {
			document.removeEventListener('mousedown', handleMouseDown)
		}
	}, [])

	return (
		<div className="current_folder_delete_note">
			<p className="current_folder_delete_note_p">
				Are you sure you want to Delete?
			</p>
			<div className="current_folder_delete_note_confirm_container">
				{' '}
				<p
					className="current_folder_delete_note_confirm yes"
					onClick={handleDelete}>
					YES{' '}
				</p>
				<p className="current_folder_delete_note_confirm">/ </p>
				<p
					className="current_folder_delete_note_confirm confirm_no"
					onClick={handleExit}>
					NO
				</p>
			</div>
		</div>
	)
}
