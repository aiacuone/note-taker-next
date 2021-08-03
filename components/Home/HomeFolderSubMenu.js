import React from 'react'

export default function HomeFolderSubMenu({ folder, state, setState, vars }) {
	let colors = vars.colors.map((item, index) => {
		if (index >= vars.colors.length / 2) {
			return (
				<div
					className="home_folder_color_option"
					onMouseDown={() => {
						let newFolders = { ...state.folders }
						newFolders[state.toggleHomeFolderMenu[0]].folderColor = item
						setState.setFolders(newFolders)
						setState.setToggleHomeFolderMenu(null)
					}}
					style={{ background: item }}></div>
			)
		}
	})

	let subMenu = () => {
		if (
			state.toggleHomeFolderMenu &&
			state.toggleHomeFolderMenu[1] == 'color'
		) {
			return colors
		} else if (
			state.toggleHomeFolderMenu &&
			state.toggleHomeFolderMenu[1] == 'delete' &&
			state.toggleHomeFolderMenu[2] == 'yes'
		) {
			return (
				<div>
					<p
						className="home_folder_delete_confirm"
						style={{ color: 'red' }}
						onClick={() => {
							let newFolders = { ...state.folders }
							delete newFolders[state.toggleHomeFolderMenu[0]]
							setState.setFolders(newFolders)
							setState.setToggleHomeFolderMenu('')
						}}>
						DELETE
					</p>
				</div>
			)
		}
	}

	return <div className="home_folder_sub_menu">{subMenu()}</div>
}
