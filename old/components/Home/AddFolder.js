import React, { useEffect } from 'react'
import NoteNameWarning from 'components/CurrentFolder/NoteNameWarning'
import AddFolderColors from './AddFolderColors'
import AddFolderColors2 from './AddFolderColors2'

export default function AddFolder({
	state = { state },
	setState = { setState },
	vars = { vars },
}) {
	function handleExit(e) {
		if (e.target.className == 'home') {
			setState.setHomeRender(['folders'])
			setState.setInput()
		}
	}

	let selectedColor = state.homeRender[1]

	function handleAddFolder() {
		if (!error() && state.input.length > 0) {
			let newFolders = { ...state.folders }
			newFolders[state.input.toLowerCase()] = new vars.Folder({
				name: state.input.toLowerCase(),
				dateCreated: Date.now(),
				folderColor: selectedColor,
			})
			setState.setFolders(newFolders)
			setState.setHomeRender(['folders'])
			setState.setInput('')
		}
	}

	function handleEnter(e) {
		if (e.key == 'Enter') {
			handleAddFolder()
		}
	}

	useEffect(() => {
		document.addEventListener('keydown', handleEnter)
		document.addEventListener('mousedown', handleExit)
		return () => {
			document.removeEventListener('keydown', handleEnter)
			document.removeEventListener('mousedown', handleExit)
		}
	})

	let error = () => {
		if (state.input) {
			if (state.folders[state.input.toLowerCase()] || state.input.length > 15) {
				return true
			}
		} else {
			return false
		}
	}

	return (
		<div className="home_add_folder">
			<h3 className="home_add_folder_title">ADD FOLDER</h3>
			<AddFolderColors state={state} setState={setState} vars={vars} />
			<div className="home_add_folder_input_wrapper">
				<input
					className="home_add_folder_input"
					autoFocus
					type="text"
					value={state.input && state.input.toUpperCase()}
					onChange={(e) => setState.setInput(e.target.value)}
					style={{ textAlign: 'center' }}
					placeholder="Title"
				/>
				{error() && (
					<NoteNameWarning state={state} setState={setState} vars={vars} />
				)}
			</div>
			<AddFolderColors2 state={state} setState={setState} vars={vars} />
			<p className="home_add_folder_add" onClick={handleAddFolder}>
				ADD
			</p>
		</div>
	)
}
