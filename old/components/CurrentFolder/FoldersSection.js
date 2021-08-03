import React, { useRef, useEffect, useState } from 'react'
import Folder from './Folder'
import Folders from './Folders'

export default function FoldersSection({ state, setState, vars }) {
	let [element, setElement] = useState()
	let scroller = useRef()
	let isDown = false
	let startX
	let scrollLeft
	let timeout

	function handleMouseDown(e) {
		e.preventDefault()
		isDown = true
		if (scroller && scroller.current) {
			scroller.current.classList.add('active')
			startX = e.pageX - scroller.current.offsetLeft
			scrollLeft = scroller.current.scrollLeft
		}
	}
	function handleMouseleave() {
		clearTimeout(timeout)
		timeout = setTimeout(() => {
			setState.setFoldersScrolling(false)
		}, 10)
		isDown = false
		if (scroller && scroller.current) {
			scroller.current.classList.remove('active')
		}
	}
	function handleMouseup() {
		clearTimeout(timeout)
		timeout = setTimeout(() => {
			setState.setFoldersScrolling(false)
		}, 10)
		isDown = false
		if (scroller && scroller.current) {
			scroller.current.classList.remove('active')
		}
	}
	function handleMousemove(e) {
		if (!isDown) return
		setState.setFoldersScrolling(true)
		timeout = setTimeout(() => {
			setState.setFoldersScrolling(false)
		}, 500)
		if (scroller && scroller.current) {
			const x = e.pageX - scroller.current.offsetLeft
			const walk = (x - startX) * 2
			scroller.current.scrollLeft = scrollLeft - walk
		}
	}
	function handleScroll() {
		// setState.setFoldersScrolling(true)
		// clearTimeout(timeout)
	}

	function handleWheel(e) {
		if (scroller && scroller.current) {
			scroller.current.scrollLeft += e.deltaY * 25
		}
	}
	let scrollbarHeight
	useEffect(() => {
		if (scroller && scroller.current) {
			scroller.current.addEventListener('wheel', handleWheel)
			scroller.current.addEventListener('scroll', handleScroll)
			scroller.current.addEventListener('mousedown', handleMouseDown)
			scroller.current.addEventListener('mouseleave', handleMouseleave)
			scroller.current.addEventListener('mouseup', handleMouseup)
			scroller.current.addEventListener('mousemove', handleMousemove)
			setElement({
				offsetHeight: scroller.current.offsetHeight,
				clientHeight: scroller.current.clientHeight,
			})
		}

		// if (scroller && scroller.current) {

		// }

		return () => {
			if (scroller && scroller.current) {
				scroller.current.removeEventListener('wheel', handleWheel)
				scroller.current.removeEventListener('scroll', handleScroll)
				scroller.current.removeEventListener('mousedown', handleMouseDown)
				scroller.current.removeEventListener('mouseleave', handleMouseleave)
				scroller.current.removeEventListener('mouseup', handleMouseup)
				scroller.current.removeEventListener('mousemove', handleMousemove)
			}
		}
	}, [])

	if (element) {
		scrollbarHeight = element.offsetHeight - element.clientHeight
	}

	return (
		<div className="current_page_folders_container">
			<div className="current_page_folders_wrapper_parent">
				<div
					className="current_page_folders_wrapper_child"
					ref={scroller}
					style={{
						paddingBottom: element && scrollbarHeight + 'px',
						height:element&&element.height-scrollbarHeight+'px'

					}}>
					<Folders state={state} setState={setState} vars={vars} />
				</div>
			</div>
		</div>
	)
}
