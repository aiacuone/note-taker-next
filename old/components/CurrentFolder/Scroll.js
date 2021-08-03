import React, { useState, useRef, useEffect } from 'react'

export default function Scroll({ state, setState, vars }) {
	let timer
	let scroller = useRef()
	let isDown = false
	let startX
	let scrollLeft

	useEffect(() => {
		function handleMouseDown(e) {
			e.preventDefault()
			isDown = true
			scroller.current.classList.add('active')
			startX = e.pageX - scroller.current.offsetLeft
			scrollLeft = scroller.current.scrollLeft
		}
		function handleMouseleave() {
			isDown = false
			scroller.current.classList.remove('active')
		}
		function handleMouseup() {
			isDown = false
			scroller.current.classList.remove('active')
			timer = setTimeout(() => {
				setState.setRenderCurrentFolder(['mainSection', 'header'])
			}, 1500)
		}
		function handleMousemove(e) {
			if (!isDown) return
			setState.setRenderCurrentFolder(['mainSection'])
			clearTimeout(timer)
			const x = e.pageX - scroller.current.offsetLeft
			const walk = (x - startX) * 3
			scroller.current.scrollLeft = scrollLeft - walk
		}

		scroller.current.addEventListener('mousedown', handleMouseDown)
		scroller.current.addEventListener('mouseleave', handleMouseleave)
		scroller.current.addEventListener('mouseup', handleMouseup)
		scroller.current.addEventListener('mousemove', handleMousemove)

		return () => {
			scroller.current.removeEventListener('mousedown', handleMouseDown)
			scroller.current.removeEventListener('mouseleave', handleMouseleave)
			scroller.current.removeEventListener('mouseup', handleMouseup)
			scroller.current.removeEventListener('mousemove', handleMousemove)
		}
	}, [])

	return (
		<div>
			<div ref={scroller} className="scroll"></div>
		</div>
	)
}
