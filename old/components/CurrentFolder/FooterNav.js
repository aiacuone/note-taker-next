import React from 'react'
import BackButton from './BackButton'
import AddFolderButton from './AddFolderButton'

export default function FooterNav({ state, setState, vars }) {
    function handleClick() {
		setState.setDirectory([])
		setState.setRender(['mainSection'])
	}
	return (
		<div className="current_folder_footer_nav">
			<AddFolderButton state={state} setState={setState} vars={vars} />
			<BackButton state={state} setState={setState} vars={vars} />
			<h3 onClick={handleClick} className="current_page_nav_button home_nav">
				HOME
			</h3>
		</div>
	)
}
