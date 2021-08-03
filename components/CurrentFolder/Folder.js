import React from 'react'
import useLongPress from '../../hooks/useLongPress'
import _ from 'lodash'

export default function Folder({ state, setState, vars, folder }) {
	let color = () => {
		let arr = [...vars.directoryChain(), 'folders', folder.name, 'folderColor']
		return arr.reduce((a, b) => {
			return a[b]
		}, state.folders)
	}
	let selectedFolder = state.render[2]

	function handleLongPress() {
		if (!state.foldersScrolling) {
			setState.setRender([
				'mainSection',
				'editFolder',
				folder.name.toLowerCase(),
				folder.folderColor,
			])
		}
	}

	function handleClick() {
		if (!state.foldersScrolling) {
			//CHANGING FOLDER PROPERTIES
			let directory = [...vars.directoryChain(), 'folders']
			let newFolders = { ...state.folders }
			let newCurrentFolders = { ...vars.currentFolder.folders }
			newCurrentFolders[folder.name].timesSelected += 1
			newCurrentFolders[folder.name].lastSelected = Date.now()
			_.set(newFolders, directory.join('.'), newCurrentFolders)
			setState.setFolders(newFolders)
			//RENDER
			let arr = [...state.directory]
			arr.push(folder.name)
			setState.setDirectory(arr)
			setState.setRender(['mainSection'])
		}
	}

	return (
		<div
		className="current_page_folder_menu_folder"
			{...useLongPress(
				() => handleLongPress(),
				() => handleClick(),
				{ shouldPreventDefault: true, delay: 500 }
			)}
			style={{
				background: selectedFolder == folder.name ? 'white' : color(),
			}}>
			<p
				className="current_page_folder_menu_title"
				style={{
					color:
						selectedFolder == folder.name
							? 'black'
							: color() == 'rgb(236, 236, 80)' || color() == '#FFA300'
							? 'black'
							: 'white',
				}}>
				{folder.name.toUpperCase()}
			</p>
		</div>
	)
}
