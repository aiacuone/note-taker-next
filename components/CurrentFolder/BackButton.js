import React from 'react'
import back from 'images/back.svg'

export default function BackButton({
	state = { state },
	setState = { setState },
	vars = { vars },
}) {
	function handleBack(e) {
		e.preventDefault()
		let arr = [...state.directory]
		arr.splice(arr.length - 1, 1)
		setState.setDirectory(arr)
		setState.setRender(['mainSection'])
	}
	return (
		<img src={back} onClick={handleBack} className="current_page_nav_button back"/>
	)
}
