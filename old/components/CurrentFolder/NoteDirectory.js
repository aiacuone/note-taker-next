import React, { useRef, useEffect, useState } from 'react'

export default function NoteDirectory({
	state = { state },
	setState = { setState },
	vars = { vars },
}) {
	let notesNavRef = useRef()
	let isDown = false
	let startX
	let scrollLeft
	let scrollbarHeight

	let [element, setElement] = useState()

	useEffect(() => {
		function handleMouseDown(e) {
			e.preventDefault()
			isDown = true
			notesNavRef.current.classList.add('active')
			startX = e.pageX - notesNavRef.current.offsetLeft
			scrollLeft = notesNavRef.current.scrollLeft
		}
		function handleMouseleave() {
			isDown = false
			notesNavRef.current.classList.remove('active')
		}
		function handleMouseup() {
			isDown = false
			if (notesNavRef && notesNavRef.current) {
				notesNavRef.current.classList.remove('active')
			}
		}
		function handleMousemove(e) {
			if (!isDown) return
			if (notesNavRef && notesNavRef.current) {
				setState.setRender(['mainSection'])
				const x = e.pageX - notesNavRef.current.offsetLeft
				const walk = (x - startX) * 3
				notesNavRef.current.scrollLeft = scrollLeft - walk
			}
		}

		if (notesNavRef && notesNavRef.current) {
			notesNavRef.current.addEventListener('mousedown', handleMouseDown)
			notesNavRef.current.addEventListener('mouseleave', handleMouseleave)
			notesNavRef.current.addEventListener('mouseup', handleMouseup)
			notesNavRef.current.addEventListener('mousemove', handleMousemove)
			setElement({
				offsetHeight: notesNavRef.current.offsetHeight,
				clientHeight: notesNavRef.current.clientHeight,
			})
		}

		return () => {
			if (notesNavRef && notesNavRef.current) {
				notesNavRef.current.removeEventListener('mousedown', handleMouseDown)
				notesNavRef.current.removeEventListener('mouseleave', handleMouseleave)
				notesNavRef.current.removeEventListener('mouseup', handleMouseup)
				notesNavRef.current.removeEventListener('mousemove', handleMousemove)
			}
		}
	}, [])

	if (element) {
		scrollbarHeight = element.offsetHeight - element.clientHeight
	}

	return (
		<div className="current_page_directory">
			<div className="current_page_directory_wrapper_parent">
				<div
					className="current_page_directory_wrapper_child"
					ref={notesNavRef}
					style={{
						paddingBottom: element && scrollbarHeight + 'px',
						height: element && element.height - scrollbarHeight + 'px',
					}}>
					{state.directory.join('-').toUpperCase()}
				</div>
			</div>
		</div>
	)
}
