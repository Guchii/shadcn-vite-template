import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable"
import React from "react"

export default function Split({
	left,
	right,
}: {
	left: React.ReactNode
	right: React.ReactNode
}) {
	return (
		<ResizablePanelGroup className="h-full" direction="horizontal">
			<ResizablePanel>{left}</ResizablePanel>
			<ResizableHandle withHandle />
			<ResizablePanel>{right}</ResizablePanel>
		</ResizablePanelGroup>
	)
}
