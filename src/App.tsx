import { useRoutes } from "react-router-dom"
import { TailwindIndicator } from "./components/tailwind-indicator"
import Split from "./split"
import TranscriptPanel from "./components/transcript-panel"
import Plyr, { PlyrProps } from "plyr-react"
import "plyr-react/plyr.css"
import { Menubar } from "./components/menubar"
import Recorder from "./components/recorder"

const plyrProps: PlyrProps = {
	source: {
		type: "video",
		sources: [
			{
				src: "h5Jct2Up3-A",
				provider: "youtube",
			},
		],
	},
}
const routes = [{ path: "/", element: <Home /> }]

function Home() {
	return (
		<Split
			left={
				<div>
						<Plyr id="h5Jct2Up3-A" {...plyrProps} />
            <Recorder/>
				</div>
			}
			right={<TranscriptPanel />}
		/>
	)
}

function App() {
	const children = useRoutes(routes)

	return (
		<>
			<div className="relative flex h-screen flex-col">
        <Menubar/>
				<div className="flex-1">{children}</div>
			</div>
			<TailwindIndicator />
		</>
	)
}

export default App
