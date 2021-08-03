import React, { useEffect, useRef } from 'react'
import FolderColors from './FolderColors'
import FolderColors2 from './FolderColors2'
import _ from 'lodash'
import delete_button from 'images/delete_white.svg'

export default function EditFolder({ state, setState, vars }) {
	let inputRef = useRef()
	let selectedFolder = state.render[2]
	let selectedColor = state.render[3]

    useEffect(() => {
        
        
		setState.setInput(selectedFolder)
	}, [])

	useEffect(() => {
		//resets the add folder input value if not clicked within the input field
		function handleExit(e) {
			if (e.target.className == 'main_section_container') {
				setState.setInput('')
				setState.setRender(['mainSection'])
			}
		}

		document.addEventListener('mousedown', handleExit)
		return () => {
			document.removeEventListener('mousedown', handleExit)
		}
	}, [state.input])

	let error = () => {
		if (state.input) {
			if (
				state.folders[state.input.toLowerCase()] ||
				state.input.length > 15 ||
				state.input.length == 0
			) {
				return true
			}
		} else {
			return false
		}
	}

	function handleEdit() {
		if (state.input.length > 0) {
			let directory = [...vars.directoryChain(), 'folders']
			let newFolders = { ...state.folders }
			let newCurrentFolders = { ...vars.currentFolder.folders }
			if (!error() && state.input !== selectedFolder) {
				newCurrentFolders[state.input] = newCurrentFolders[selectedFolder]
				newCurrentFolders[state.input].name = state.input
				delete newCurrentFolders[selectedFolder]
			}
			newCurrentFolders[state.input].folderColor = selectedColor
			_.set(newFolders, directory.join('.'), newCurrentFolders)
			setState.setFolders(newFolders)
			setState.setRender(['mainSection'])
			setState.setInput()
		}
	}

	function handleClickDelete() {
		let newRender = [...state.render]
		newRender[1] = 'deleteFolder'
		setState.setRender(newRender)
	}

	return (
		<div className="current_page_add_folder_input_container">
			<p className="current_page_add_folder_input_title">EDIT FOLDER</p>
			<FolderColors state={state} setState={setState} vars={vars} />
			<input
				autoFocus
				className="current_page_add_folder_input"
				onChange={(e) => setState.setInput(e.target.value.toLowerCase())}
				ref={inputRef}
				placeholder="Add Folder"
				type="text"
				value={state.input && state.input.toUpperCase()}></input>
			<FolderColors2 state={state} setState={setState} vars={vars} />
			<p className="current_page_add_folder_input_add" onClick={handleEdit}>
				EDIT
			</p>
			<img
				className="current_edit_folder_delete_button"
				src={delete_button}
				onClick={handleClickDelete}
			/>
		</div>
	)
}
