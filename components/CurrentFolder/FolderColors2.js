import React from 'react'

export default function FolderColors2({ state, setState, vars }) {
	let addOrEdit =
		state.render[1] == 'editFolder'
			? 'edit'
			: state.render[1] == 'addFolder' && 'add'

	let selectedColor =
		addOrEdit == 'add'
			? state.render[2]
			: addOrEdit == 'edit' && state.render[3]

	function handleColorChange(color) {
		let newRender = [...state.render]
		if (addOrEdit == 'add') {
			newRender[2] = color
		}
		if (addOrEdit == 'edit') {
			newRender[3] = color
		}

		setState.setRender(newRender)
	}

	let colors = vars.colors.map((color, index) => {
		let style = {
			background: color,
			border: selectedColor == color ? '2px white solid' : null,
		}
		if (index >= vars.colors.length / 2) {
			return (
				<div
					key={color}
					className="current_folder_color_option"
					onMouseDown={() => handleColorChange(color)}
					style={style}></div>
			)
		}
	})
	return <div className="current_add_folder_addcolors">{colors}</div>
}
