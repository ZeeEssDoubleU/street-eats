import { useEffect } from "react"
import { useTheme } from "@material-ui/core/styles"
// import store / actions
import useStore from "../store/useStore"
import { setIsSmallerThanLarge } from "../store/actions/layout"

// ***********
// hook
// ***********

export default function useWindowResize() {
	const theme = useTheme()
	const { state, dispatch } = useStore()

	// function runs on window resize event
	const onWindowResize = () => {
		setIsSmallerThanLarge(theme, state, dispatch)
	}

	// effect adds event listener on window resize to check if app is mobile
	useEffect(() => {
		// add listener on mount
		window.addEventListener("resize", onWindowResize)
		// remove on unmount
		return () => window.removeEventListener("resize", onWindowResize)
	}, ["resize", onWindowResize])
}
