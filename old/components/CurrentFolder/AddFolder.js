import React, { useRef, useEffect } from 'react'
import _ from 'lodash'
import FolderColors from './FolderColors'
import FolderColors2 from './FolderColors2'
import NoteNameWarning from './NoteNameWarning'

export default function AddFolder({ state, setState, vars }) {
	let add_folder_input = useRef()
	let selectedColor = state.render[2]

	useEffect(() => {
		//resets the add folder input value if not clicked within the input field
		function handleExit(e) {
			if (e.target.className == 'main_section_container') {
				add_folder_input.current.placeholder = 'Add Folder'
				setState.setInput('')
				setState.setRender(['mainSection'])
			}
		}

		document.addEventListener('mousedown', handleExit)
		return () => {
			document.removeEventListener('mousedown', handleExit)
		}
	}, [state.input])

	function handleAddFolder() {
		if (state.input) {
			let newFolders = { ...state.folders }
			let newObj = { ...vars.currentFolder.folders }
			newObj[state.input] = new vars.Folder({
				name: state.input,
				dateCreated: Date.now(),
				folderColor: selectedColor,
			})
			let newDirectoryChain = [...vars.directoryChain(), 'folders']
			_.set(newFolders, newDirectoryChain.join('.'), newObj)
			setState.setFolders(newFolders)
			setState.setInput('')
			setState.setRender(['mainSection'])
		}
	}
	useEffect(() => {
		//handles enter button
		function handleEnter(e) {
			if (e.key == 'Enter') {
				handleAddFolder()
			}
		}

		document.addEventListener('keydown', handleEnter)
		return () => {
			document.removeEventListener('keydown', handleEnter)
		}
	}, [state.input])

	let error = () => {
		if (state.input) {
			if (vars.currentFolder.folders[state.input.toLowerCase()] || state.input.length > 15) {
				return true
			}
		} else {
			return false
		}
	}

	return (
		<div className="current_page_add_folder_input_container">
			<p className="current_page_add_folder_input_title">ADD FOLDER</p>
			<FolderColors state={state} setState={setState} vars={vars} />
			<input
				autoFocus
				className="current_page_add_folder_input"
				onChange={(e) => setState.setInput(e.target.value.toLowerCase())}
				ref={add_folder_input}
				placeholder="Add Folder"
				type="text"
				value={state.input && state.input.toUpperCase()}></input>
			<FolderColors2 state={state} setState={setState} vars={vars} />
			<p className="current_page_add_folder_input_add" onClick={handleAddFolder}>
				ADD
			</p>
			{error()&&<NoteNameWarning state={state} setState={setState} vars={vars} />}
		</div>
	)
}
