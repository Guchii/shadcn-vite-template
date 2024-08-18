import { useMemo, useRef, useState } from "react"
import WavesurferPlayer, { useWavesurfer } from "@wavesurfer/react"
import RecordPlugin from "wavesurfer.js/dist/plugins/record.esm.js"
import { Button } from "./ui/button"
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet"
import { format } from "date-fns"
import { MicIcon, Square} from "lucide-react"
import WaveSurfer from "wavesurfer.js"

const DOWNLOAD_ON_COMPLETION = false

export default function Recorder() {
	const containerRef = useRef(null)
	const [isRecording, setIsRecording] = useState(false)

	const { wavesurfer } = useWavesurfer({
		container: containerRef,
		height: 100,
		waveColor: "rgb(15, 23, 42)",
		progressColor: "rgb(100, 0, 100)",
		barWidth: 0,
		barRadius: 0,
		plugins: useMemo(() => [], []),
	})

	const record = useMemo(() => {
		const record = wavesurfer?.registerPlugin(
			RecordPlugin.create({
				scrollingWaveform: false,
				renderRecordedAudio: false,
			}),
		)
		if (record) {
			record.on("record-end", (blob) => {
				setIsRecording(false)
				if (DOWNLOAD_ON_COMPLETION) {
					const recordedUrl = URL.createObjectURL(blob)
					const a = document.createElement("a")
					a.href = recordedUrl
					a.download = "masti.wav"
					a.click()
					a.remove()
					URL.revokeObjectURL(recordedUrl)
				}
			})
		}
		return record
	}, [wavesurfer])

	async function startRecord() {
		if (!record) return
		stopRecording()
		const deviceId = await RecordPlugin.getAvailableAudioDevices().then(
			(devices) => {
				return devices[0].deviceId
			},
		)

		record.startRecording({ deviceId }).then(() => {
			setIsRecording(true)
		})
	}

	function stopRecording() {
		if (!record) return
		if (record.isRecording() || record.isPaused()) {
			console.log("stop recording")
			record.stopRecording()
			return
		}
	}

	return (
		<div className="space-y-4 p-8">
			<div ref={containerRef} hidden={!isRecording} />
			<Button
				onClick={isRecording ? stopRecording : startRecord}
				className="mx-auto aspect-square h-16 w-full rounded-full"
			>
				{isRecording ? <Square /> : <MicIcon />}
			</Button>
			<Sheet>
				<SheetTrigger>See Recordings</SheetTrigger>
				<SheetContent className="!max-w-[640px] overflow-y-auto" side={"left"}>
					<SheetHeader>
						<SheetTitle>Your Recordings</SheetTitle>
					</SheetHeader>
					<Recording />
					<Recording />
					<Recording />
					<Recording />
					<Recording />
					<Recording />
					<Recording />
				</SheetContent>
			</Sheet>
		</div>
	)
}

export function Recording({date = new Date(), url = 'https://cdn.freesound.org/previews/751/751450_5674468-lq.mp3'}) {
	const [wavesurfer, setWavesurfer] = useState<WaveSurfer>()
	const [isPlaying, setIsPlaying] = useState(false)

	const onReady = (ws: WaveSurfer) => {
		setWavesurfer(ws)
		setIsPlaying(false)
	}

	const onPlayPause = () => {
		wavesurfer?.playPause()
	}

	return (
		<div>
			<p>{format(date, "hh:mm bb eeee, do MMM yyyy")}</p>
			<WavesurferPlayer
				height={100}
				waveColor="violet"
				url={url}
				onReady={onReady}
				onPlay={() => setIsPlaying(true)}
				onPause={() => setIsPlaying(false)}
			/>

			<button onClick={onPlayPause}>{isPlaying ? "Pause" : "Play"}</button>
		</div>
	)
}
