import { cn } from "@/lib/utils"
import { isEqual } from "lodash"
import { Fragment, forwardRef } from "react"

type MessageProps = {
	text?: string
	user?: "human" | "ai"
	processing?: boolean
}

export const Message = (props: MessageProps) => {
	if (isEqual(props.user, "ai")) return <AIMessage {...props} />
	const { text = "Explain quantum computing in simple terms" } = props
	return (
		<div className="flex flex-row-reverse items-start">
			<img
				className="ml-2 h-8 w-8 rounded-full"
				src="https://api.dicebear.com/9.x/rings/svg?seed=Fluffy"
			/>
			<div className="flex  rounded-b-xl rounded-tl-xl bg-slate-50 p-4 dark:bg-slate-800 sm:max-w-md md:max-w-2xl">
				<p>{text}</p>
			</div>
		</div>
	)
}

const defaultAiMessage = `Certainly! Quantum computing is a new type of computing that
relies on the principles of quantum physics. Traditional
computers, like the one you might be using right now, use bits to
store and process information. These bits can represent either a 0
or a 1. In contrast, quantum computers use quantum bits, or
qubits.`

export const AIMessage = forwardRef<HTMLDivElement, MessageProps>(
	({ processing = false, text = defaultAiMessage }, ref) => {
		return (
			<div
				ref={ref}
				className={cn("flex items-start", {
					"items-center": processing,
				})}
			>
				<img
					className="mr-2 h-8 w-8 rounded-full"
					src="https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Fluffy"
				/>
				{processing ? (
					<div className="flex flex-row gap-1">
						<div className="h-2 w-2 animate-bounce rounded-full bg-blue-700 [animation-delay:.3s]" />
						<div className="h-2 w-2 animate-bounce rounded-full bg-blue-700 [animation-delay:.1s]" />
						<div className="h-2 w-2 animate-bounce rounded-full bg-blue-700 [animation-delay:.3s]" />
					</div>
				) : (
					<Fragment>
						<div className="flex min-h-[85px] rounded-b-xl rounded-tr-xl bg-slate-50 p-4 dark:bg-slate-800 sm:min-h-0 sm:max-w-md md:max-w-2xl">
							<p className="break-all">{text}</p>
						</div>
						<div className="ml-2 mt-1 flex flex-col-reverse gap-2 text-slate-500 sm:flex-row">
							<button className="hover:text-blue-600" type="button">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									viewBox="0 0 24 24"
									strokeWidth="2"
									stroke="currentColor"
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z"></path>
									<path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"></path>
								</svg>
							</button>
							<button className="hover:text-blue-600" type="button">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									viewBox="0 0 24 24"
									strokeWidth="2"
									stroke="currentColor"
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3"></path>
								</svg>
							</button>
							<button className="hover:text-blue-600">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									viewBox="0 0 24 24"
									strokeWidth="2"
									stroke="currentColor"
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3"></path>
								</svg>
							</button>
						</div>
					</Fragment>
				)}
			</div>
		)
	},
)