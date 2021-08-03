import React, { useEffect } from 'react'
import _ from 'lodash'

export default function DeleteFolder({ state, setState, vars }) {
	let selectedFolder = state.render[2]

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
	}, [])

	function handleDelete() {
		let newRender = [...state.render]
		newRender[4] = 'yes'
		setState.setRender(newRender)
	}

	function handleExit() {
		setState.setRender(['mainSection'])
	}

	function handleConfirmDelete() {
		let newFolders = { ...state.folders }
		let directory = [...vars.directoryChain(), 'folders']
		let newCurrentFolders = { ...vars.currentFolder.folders }
		delete newCurrentFolders[selectedFolder]
		_.set(newFolders, directory.join('.'), newCurrentFolders)
		setState.setFolders(newFolders)
		setState.setRender(['mainSection'])
		setState.setInput()
	}

	let confirmDelete = () => {
		return (
			<p className="confirm_delete_container_delete" onClick={handleConfirmDelete}>
				DELETE
			</p>
		)
	}
	return (
		<div className="confirm_delete_container">
			<p className="confirm_delete">Are you sure you want to delete this folder?</p>
			<div className="current_folder_folder_settings_delete_options">
				<p
					className="current_folder_folder_settings_delete_option yes"
					onMouseDown={handleDelete}>
					YES
				</p>
				<p className="current_folder_folder_settings_delete_option">/</p>
				<p
					className="current_folder_folder_settings_delete_option"
					onClick={handleExit}>
					NO
				</p>
			</div>
			{state.render[4] == 'yes' && confirmDelete()}
		</div>
	)
}
