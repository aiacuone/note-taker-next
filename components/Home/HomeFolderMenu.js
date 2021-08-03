import React, { useEffect } from 'react'
import _ from 'lodash'

export default function HomeFolderMenu({ folder, state, setState, vars }) {
	let menuOptions = () => {
		let arr = ['delete', 'rename', 'color']
		if (
			state.toggleHomeFolderMenu &&
			state.toggleHomeFolderMenu[1] == 'color'
		) {
			return vars.colors.map((item, index) => {
				if (index < vars.colors.length / 2) {
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
		} else if (
			state.toggleHomeFolderMenu &&
			state.toggleHomeFolderMenu[1] == 'delete'
		) {
			return (
				<div className="home_folder_delete_confirm">
					<p className="home_folder_delete_confirm">
						Are you sure you want to delete?
					</p>
				</div>
			)
		} else {
			return arr.map((item) => {
				return (
					<p
						className="home_folder_menu_options"
						onMouseDown={() => {
							let newArr = [...state.toggleHomeFolderMenu]
							newArr[1] = item
							setState.setToggleHomeFolderMenu(newArr)
						}}>
						{item.toUpperCase()}
					</p>
				)
			})
		}
	}

	useEffect(() => {
		function handleMouseDown(e) {
			if (
				e.target.parentElement &&
				e.target.parentElement.className !== 'home_folder_menu' &&
				e.target.parentElement.className !== 'home_folder_sub_menu' &&
				e.target.parentElement.className !== 'home_folder_delete_confirm' &&
				e.target.className !== 'home_folder_delete_confirm' &&
				e.target.className !== 'home_folder_title_rename_input'
			) {
				setState.setToggleHomeFolderMenu('')
				setState.setHomeRenameFolderInput('')
			}
		}
		document.addEventListener('mousedown', handleMouseDown)
		return () => {
			document.removeEventListener('mousedown', handleMouseDown)
		}
	}, [state.toggleHomeFolderMenu])

	return <div className="home_folder_menu">{menuOptions()}</div>
}
