import React, { useEffect, useRef, useState } from 'react'

export default function NoteTitle({
	state = { state },
	setState = { setState },
	vars = { vars },
}) {
	let [element, setElement] = useState()
	let page_title_ref = useRef()
	let isDown = false
	let startX
	let scrollLeft

	function handleMouseDown(e) {
		e.preventDefault()
		isDown = true
		page_title_ref.current.classList.add('active')
		startX = e.pageX - page_title_ref.current.offsetLeft
		scrollLeft = page_title_ref.current.scrollLeft
	}
	function handleMouseleave() {
		isDown = false
		page_title_ref.current.classList.remove('active')
	}
	function handleMouseup() {
		isDown = false
		page_title_ref.current.classList.remove('active')
	}
	function handleMousemove(e) {
		if (!isDown) return
		setState.setRender(['mainSection'])
		const x = e.pageX - page_title_ref.current.offsetLeft
		const walk = (x - startX) * 5
		page_title_ref.current.scrollLeft = scrollLeft - walk
	}
	let scrollbarHeight
	useEffect(() => {
		if (page_title_ref && page_title_ref.current) {
			page_title_ref.current.addEventListener('mousedown', handleMouseDown)
			page_title_ref.current.addEventListener('mouseleave', handleMouseleave)
			page_title_ref.current.addEventListener('mouseup', handleMouseup)
			page_title_ref.current.addEventListener('mousemove', handleMousemove)
			setElement({
				offsetHeight: page_title_ref.current.offsetHeight,
				clientHeight: page_title_ref.current.clientHeight,
			})
		}

		return () => {
			if (page_title_ref && page_title_ref.current) {
				page_title_ref.current.removeEventListener('mousedown', handleMouseDown)
				page_title_ref.current.removeEventListener(
					'mouseleave',
					handleMouseleave
				)
				page_title_ref.current.removeEventListener('mouseup', handleMouseup)
				page_title_ref.current.removeEventListener('mousemove', handleMousemove)
			}
		}
	}, [])

	if (element) {
		scrollbarHeight = element.offsetHeight - element.clientHeight
	}

	return (
		<div className="current_page_title">
			<div className="current_page_title_parent">
				<h1
					className="current_page_title_child"
					ref={page_title_ref}
					style={{
						paddingBottom: element && scrollbarHeight + 'px',
						height: element && element.height - scrollbarHeight + 'px',
					}}>
					{vars.currentFolder.name.toUpperCase()}
				</h1>
			</div>
		</div>
	)
}
