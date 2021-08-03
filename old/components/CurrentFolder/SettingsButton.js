import React from 'react'
import menu from 'images/menu.svg'

export default function SettingsButton({ state, setState, vars }) {
	function handleClick() {
		setState.setRender(['mainSection', 'settings'])
	}

	return (
		<img
			className="current_folder_footer_menu_button"
			src={menu}
			onClick={handleClick}
		/>
	)
}
