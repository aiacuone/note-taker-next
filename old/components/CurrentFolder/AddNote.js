import React, { useEffect, useRef } from 'react'
import _ from 'lodash'
import NoteExit from './NoteExit'
import NoteNameWarning from './NoteNameWarning'
import SunEditor, { buttonList } from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'

export default function AddNote({ state, setState, vars }) {
	let editorRef = useRef()
	useEffect(() => {
		function handleConfirmExit(e) {
			if (e.target.className == 'add_note_container') {
				setState.setRender(['addNote', 'exit'])
			}
		}

		document.addEventListener('mousedown', handleConfirmExit)
		return () => {
			document.addEventListener('mousedown', handleConfirmExit)
		}
	})

	let error = () => {
		if (state.input) {
			if (
				vars.currentFolder.notes[state.input.toLowerCase()] ||
				state.input.length > 20
			) {
				return true
			}
		} else {
			return false
		}
	}

	function handleAdd() {
		if (!error() && state.input && state.content) {
			let newFolders = { ...state.folders }
			let newNotes = { ...vars.currentFolder.notes }

			newNotes[state.input.toLowerCase()] = new vars.Note({
				title: state.input.toLowerCase(),
				dateCreated: Date.now(),
				content: state.content,
			})
			let newDirectoryChain = [...vars.directoryChain(), 'notes']
			_.set(newFolders, newDirectoryChain.join('.'), newNotes)
			setState.setFolders(newFolders)
			setState.setInput('')
			setState.setContent('')
			setState.setRender(['mainSection'])
		}
	}

	function handleExit() {
		setState.setRender(['mainSection'])
	}

	return (
		<div className="add_note_container">
			<div className="add_note_input_wrapper">
				<input
					className="add_note_input"
					placeholder="TITLE"
					type="text"
					onChange={(e) => setState.setInput(e.target.value.toUpperCase())}
					value={state.input}
					pattern="[a-zA-Z0-9-]+"
					required
				/>
				{error() && (
					<NoteNameWarning state={state} setState={setState} vars={vars} />
				)}
			</div>
			<SunEditor
				// showInline={showInline}
				height="570px"
				width="340px"
				setContents={state.content}
				autoFocus={true}
				ref={editorRef}
				onChange={(content) => setState.setContent(content)}
				setOptions={{
					// position: 'right',
					minHeight: '250px',
					videoHeight: '200px',
					videoWidth: '300px',
					imageWidth: '300px',
					// imageHeight:'200px',
					// youtubeQuery : 'autoplay=1&mute=1&enablejsapi=1',
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
							// 'undo',
						],
					],
				}}
			/>

			<p className="add_button_submit" onClick={handleAdd}>
				ADD NOTE
			</p>
			<p onClick={handleExit} className="add_note_exit_button">
				EXIT
			</p>
			{state.render.indexOf('exit') > -1 && (
				<NoteExit state={state} setState={setState} vars={vars} />
			)}
		</div>
	)
}
