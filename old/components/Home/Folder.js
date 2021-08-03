import React from 'react'
import menu_button from 'images/menu.svg'

export default function Folder({ state, setState, vars, folder }) {
	function handleClick(e) {
		let clickedFolderOrSettings =
			e.target.className == 'home_folder'
				? 'folder'
				: e.target.className == 'home_folder_menu_button' && 'settings'

		if (clickedFolderOrSettings == 'folder') {
			handleClickFolder()
		}
		if (clickedFolderOrSettings == 'settings') {
			handleClickSettings()
		}
	}

	function handleClickFolder() {
		let newFolders = { ...state.folders }
		newFolders[folder.name].lastSelected = Date.now()
		newFolders[folder.name].timesSelected += 1
		setState.setFolders(newFolders)
		setState.setDirectory([folder.name])
	}

	function handleClickSettings() {
		setState.setHomeRender(['folderSettings', folder.folderColor, folder.name])
	}

	return (
		<p
			className="home_folder"
			style={{ background: folder.folderColor }}
			onClick={handleClick}>
			{folder.name.toUpperCase()}
			<img className="home_folder_menu_button" src={menu_button} />
		</p>
	)
}
