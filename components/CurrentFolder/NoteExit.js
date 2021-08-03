import React from 'react'

export default function NoteExit({ state, setState, vars }) {
	function handleExit() {
		setState.setInput()
		setState.setContent()
		setState.setRender(['mainSection'])
	}

	function handleStay() {
		let arr = [...state.render]
		arr.pop()
		setState.setRender(arr)
	}

	return (
		<div className="current_folder_edit_note_exit_confirm">
			<div className="current_folder_edit_note_exit_confirm_container">
				<p className="current_folder_delete_note_p">
					Are you sure you want to Exit? Your progress will be lost.
				</p>
				<div className="current_folder_delete_note_confirm_container">
					{' '}
					<p
						className="current_folder_delete_note_confirm yes"
						onClick={handleExit}>
						YES{' '}
					</p>
					<p className="current_folder_delete_note_confirm">/ </p>
					<p
						className="current_folder_delete_note_confirm confirm_no"
						onClick={handleStay}>
						NO
					</p>
				</div>
			</div>
		</div>
	)
}
