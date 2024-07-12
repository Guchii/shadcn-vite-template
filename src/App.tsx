import { useRoutes } from "react-router-dom"
import { AIMessage, Message } from "./components/chat/message"
import { MessageInput } from "./components/chat/input"
import { MutableRefObject, useEffect, useRef } from "react"
import { atom, useAtomValue, useSetAtom } from "jotai"

const routes = [{ path: "/", element: <ChatPage /> }]

const times = async (nums: number, callback: () => Promise<void>) => {
	for (let i = 0; i < nums; i++) await callback()
}

const outputAtom = atom("")
const processingAtom = atom(false)

function ChatPage() {
	const setProcessing = useSetAtom(processingAtom)
	const setOutput = useSetAtom(outputAtom)
	const messageContainer = useRef<HTMLDivElement>(null)
	useEffect(() => {
		;(async () => {
			setProcessing(true)
			await new Promise<void>((res) => {
				setTimeout(() => res(), 4000)
			})
			setProcessing(false)
			await times(100, async () => {
				await new Promise<void>((res) => {
					setTimeout(() => res(), 100)
				})
				setOutput((output) => {
					return output.concat(
						"fdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfd",
					)
				})
			})
		})()
	}, [])

	return (
		<div className="flex h-screen w-full flex-col">
			<div
				ref={messageContainer}
				className="flex-1 space-y-6 overflow-y-auto rounded-xl bg-slate-200 p-4 text-sm leading-6 text-slate-900 shadow-sm dark:bg-slate-900 dark:text-slate-300 sm:text-base sm:leading-7"
			>
				<Message user="human" />
				<Message user="ai" />
				<Message user="human" />
				<Output messageContainer={messageContainer} />
			</div>
			{/* Prompt message input */}
			<MessageInput />
		</div>
	)
}

const Output = ({
	messageContainer,
}: {
	messageContainer: MutableRefObject<HTMLDivElement | null>
}) => {
	const processing = useAtomValue(processingAtom)
	const output = useAtomValue(outputAtom)

	useEffect(() => {
		if (output) {
			if (messageContainer.current) {
				messageContainer.current.scrollTop =
					messageContainer.current.scrollHeight
			}
		}
	}, [output, messageContainer])

	return <AIMessage processing={processing} text={output} user="ai" />
}

function App() {
	const children = useRoutes(routes)
	return children
}

export default App
