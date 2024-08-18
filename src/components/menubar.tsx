import { MenubarShortcut } from "./ui/menubar";

export function Menubar() {
	return (
		<div className="flex h-[40px] items-center justify-start gap-4 px-4">
			<h1 className="font-semibold">SimpleRecorder</h1>
            <MenubarShortcut className="ml-0">⌘J</MenubarShortcut>
		</div>
	)
}
