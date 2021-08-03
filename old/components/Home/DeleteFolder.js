import React, { useEffect } from 'react'

export default function DeleteFolder({
	state = { state },
	setState = { setState },
	vars = { vars },
}) {
	let selectedFolder = state.homeRender[2]

	function handleYes() {
		let newRender = [...state.homeRender]
		newRender[3] = 'yes'
		setState.setHomeRender(newRender)
	}

	function handleExit() {}

	function handleDelete() {
		let newFolders = { ...state.folders }
		delete newFolders[selectedFolder]
		setState.setFolders(newFolders)
		setState.setHomeRender(['folders'])
	}

	let confirmDelete = () => {
		return (
			<p className="home_delete_folder_confirm_delete" onClick={handleDelete}>
				DELETE
			</p>
		)
	}

	function handleExit(e) {
		if (e.target.className == 'home') {
			setState.setHomeRender(['folders'])
			setState.setInput()
		}
	}

	useEffect(() => {
		setState.setInput(selectedFolder)

		document.addEventListener('mousedown', handleExit)

		return () => {
			document.removeEventListener('mousedown', handleExit)
		}
	}, [])

	return (
		<div className="home_delete_folder">
			<p>Are you sure you wanto Delete this folder?</p>
			<div className="home_delete_folder_option_container">
				<p className="home_delete_folder_yes" onClick={handleYes}>
					YES
				</p>
				<p className="home_delete_folder_no" onClick={handleExit}>
					NO
				</p>
			</div>
			{state.homeRender[3] == 'yes' && confirmDelete()}
		</div>
	)
}
