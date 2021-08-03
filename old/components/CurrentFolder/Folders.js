import React from 'react'
import Folder from './Folder'

export default function Folders({ state, setState, vars }) {
	let sortedFolders = () => {
		let arr = []
		Object.keys(vars.currentFolder.folders).map((folder) => {
			arr.push(vars.currentFolder.folders[folder])
		})
		if (vars.currentFolder.settings.sortFolders == 'date') {
			return arr.sort((a, b) => {
				return a['dateCreated'] - b['dateCreated']
			})
		} else if (vars.currentFolder.settings.sortFolders == 'recent') {
			return arr
				.sort((a, b) => {
					return a['lastSelected'] - b['lastSelected']
				})
				.reverse()
		} else if (vars.currentFolder.settings.sortFolders == 'name') {
			return arr.sort((a, b) => {
				if (a['name'] < b['name']) {
					return -1
				}
				if (a['name'] > b['name']) {
					return 1
				}
				return 0
			})
		}
	}

	let folders = sortedFolders().map((folder) => {
		return (
			<Folder
				key={folder.name}
				state={state}
				setState={setState}
				vars={vars}
				folder={folder}
			/>
		)
	})

	return (
		<div className="current_page_folders">
			{' '}
			<div className="current_folders_section_gap_fill" />
			{folders} <div className="current_folders_section_gap_fill" />
		</div>
	)
}
