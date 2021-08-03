import React, { useEffect, useState, useRef } from 'react'
import ReactHtmlParser from 'react-html-parser'
import menu from 'images/menu.svg'

export default function ViewNote({ state, setState, vars, Folder, Note }) {
	let note = state.render[1]
	let contentRef = useRef()
	let [element, setElement] = useState()

	function handleBack() {
		setState.setRender(['mainSection'])
	}

	function handleEdit() {
		setState.setRender(['editNote', note])
		setState.setInput(note.title)
	}

	let scrollbarWidth

	useEffect(() => {
		if (contentRef && contentRef.current) {
			setElement({
				offsetWidth: contentRef.current.offsetWidth,
				clientWidth: contentRef.current.clientWidth,
			})
		}
	}, [])

	if (element) {
		scrollbarWidth = element.offsetWidth - element.clientWidth
	}

	return (
		<div className="view_note">
			<h1 className="view_note_title">{note.title.toUpperCase()}</h1>
			<div className="view_note_content_parent">
				<div
					className="view_note_content_child"
					ref={contentRef}
					style={{
						paddingRight: element && scrollbarWidth + 1 + 'px',
					}}>
					{ReactHtmlParser(note.content)}
				</div>
			</div>
			<p className="view_note_exit_button" onClick={handleBack}>
				BACK
			</p>
			<img className="view_note_settings" src={menu} onClick={handleEdit} />
			<div className="view_note_gap_fill" />
		</div>
	)
}
