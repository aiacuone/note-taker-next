import React, { useEffect, useRef } from 'react'
import SunEditor, { buttonList } from 'suneditor-react'
import _ from 'lodash'
import delete_note from 'images/delete_white.svg'
import NoteExit from './NoteExit'
import NoteNameWarning from './NoteNameWarning'

export default function EditNote({ state, setState, vars }) {
	let currentNote = state.render[1]
	let selectedNote = currentNote.title
	let input = state.input
	let inputRef = useRef()

	let error = () => {
		if (
			(state.input.toLowerCase() !== selectedNote.toLowerCase() &&
				vars.currentFolder.notes[state.input.toLowerCase()]) ||
			state.input.length > 20
		) {
			return true
		} else {
			return false
		}
	}

	function handleEdit() {
		if (!error()) {
			let newFolders = { ...state.folders }
			let newNotes = { ...vars.currentFolder.notes }
			let directory = [...vars.directoryChain(), 'notes']
			if (input.toLowerCase() !== selectedNote) {
				newNotes[input.toLowerCase()] = newNotes[selectedNote]
				newNotes[input.toLowerCase()].title = input.toLowerCase()
				delete newNotes[selectedNote]
			}
			newNotes[input.toLowerCase()].content = state.content
			_.set(newFolders, directory.join('.'), newNotes)
			setState.setFolders(newFolders)
			setState.setRender(['mainSection'])
			setState.setInput()
			setState.setContent()
		}
	}

	useEffect(() => {
		setState.setContent(currentNote.content)

		function handleMouseDown(e) {
			if (e.target.className == 'current_folder_edit_note') {
				let arr = [...state.render]
				arr[2] = 'exit'
				setState.setRender(arr)
			}
		}

		if (inputRef && inputRef.current) {
			document.addEventListener('mousedown', handleMouseDown)
		}

		return () => {
			if (inputRef && inputRef.current) {
				document.removeEventListener('mousedown', handleMouseDown)
			}
		}
	}, [])

	function handleExit() {
		setState.setRender(['mainSection'])
	}

	function handleDelete() {
		let arr = [...state.render]
		arr[0] = 'deleteNote'
		setState.setRender(arr)
	}

	let renderError = () => {
		if (state.input && error()) {
			return <NoteNameWarning state={state} setState={setState} vars={vars} />
		}
	}

	return (
		<div className="current_folder_edit_note">
			<img
				className="current_folder_edit_note_delete_button"
				src={delete_note}
				onClick={handleDelete}
			/>
			<p className="current_folder_edit_note_exit" onClick={handleExit}>
				EXIT
			</p>
			<div className="current_folder_edit_note_wrapper">
				<input
					ref={inputRef}
					className="current_folder_edit_note_input"
					onChange={(e) => setState.setInput(e.target.value.toLowerCase())}
					value={state.input.toUpperCase()}
					placeholder="Title"
					type="text"
				/>
				{renderError()}
			</div>

			<SunEditor
				height="570px"
				width="340px"
				setContents={state.content}
				autoFocus={true}
				onChange={(content) => setState.setContent(content)}
				setOptions={{
					minHeight: '250px',
					videoHeight: '200px',
					videoWidth: '300px',
					imageWidth: '300px',
					height: '100%',
					buttonList: [
						[
							'fontSize',
							'bold',
							'fontColor',
							'align',
							'list',
							'image',
							'video',
						],
					],
				}}
			/>
			<p className="current_folder_edit_note_edit_button" onClick={handleEdit}>
				EDIT
			</p>
			{state.render[2] == 'exit' && (
				<NoteExit state={state} setState={setState} vars={vars} />
			)}
		</div>
	)
}
