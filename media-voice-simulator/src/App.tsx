import * as React from 'react'
import { Badge } from './components/ui/Badge'
import { CabinVisualization, type TalkingRegion } from './components/CabinVisualization'
import {
  ControlPanel,
  type AudioZoneCount,
  type ScreenType,
} from './components/ControlPanel'
import { ExampleCommands } from './components/ExampleCommands'
import { ResultPanel } from './components/ResultPanel'
import { Card } from './components/ui/Card'

const STEPS_COUNT = 5
const SOURCE_DEFAULT = ['QQ音乐', '网易云', '喜马拉雅'] as const

export default function App() {
  const [audioZones, setAudioZones] = React.useState<AudioZoneCount>(4)
  const [screenType, setScreenType] = React.useState<ScreenType>('full')
  const [headphoneMode, setHeadphoneMode] = React.useState(false)
  const [expanded, setExpanded] = React.useState(true)
  const [sources, setSources] = React.useState<string[]>(Array.from(SOURCE_DEFAULT))

  const [simulating, setSimulating] = React.useState(false)
  const [stepIndex, setStepIndex] = React.useState(0) // 0..STEPS_COUNT
  const [talkingRegion, setTalkingRegion] = React.useState<TalkingRegion | null>(null)

  const availableTalkingRegions = React.useMemo<TalkingRegion[]>(() => {
    const regions: TalkingRegion[] = []
    if (audioZones >= 2) regions.push('driver', 'passenger')
    if (audioZones >= 4 && screenType === 'full') regions.push('rear')
    return regions
  }, [audioZones, screenType])

  React.useEffect(() => {
    if (!simulating) return
    if (availableTalkingRegions.length === 0) return

    const id = window.setInterval(() => {
      const idx = Math.floor(Math.random() * availableTalkingRegions.length)
      setTalkingRegion(availableTalkingRegions[idx] ?? null)
    }, 900)

    return () => window.clearInterval(id)
  }, [simulating, availableTalkingRegions])

  React.useEffect(() => {
    if (!simulating) return

    setStepIndex(0)
    const id = window.setInterval(() => {
      setStepIndex((v) => (v >= STEPS_COUNT ? v : v + 1))
    }, 1400)

    return () => window.clearInterval(id)
  }, [simulating])

  React.useEffect(() => {
    if (!simulating) return
    if (stepIndex >= STEPS_COUNT) {
      setSimulating(false)
      setTalkingRegion(null)
    }
  }, [stepIndex, simulating])

  function onToggleSimulation() {
    if (simulating) {
      onReset()
      return
    }
    if (sources.length === 0) {
      // 仅 UI 骨架：无信源时不启动
      return
    }
    setSimulating(true)
  }

  function onReset() {
    setSimulating(false)
    setStepIndex(0)
    setTalkingRegion(null)
  }

  const splitText = audioZones === 2 ? '2X' : audioZones === 4 ? '3X' : '6X'

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white">
      <header className="w-full border-b border-slate-200/70 bg-gradient-to-r from-sky-100 via-cyan-50 to-white">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-sky-500 to-violet-500 shadow-sm" />
            <div>
              <div className="text-2xl font-extrabold text-slate-900 leading-tight">
                媒体语音仿真器
              </div>
              <div className="text-sm text-slate-600">车载多音区/多屏 UI 交互演示（仅骨架）</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-white/90 border-sky-200/70 text-sky-900">技术栈：React 18 + 车载UI样式</Badge>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-4 pb-10">
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-[280px_1fr_380px] items-start">
          <aside>
            <ControlPanel
              audioZones={audioZones}
              onAudioZonesChange={setAudioZones}
              screenType={screenType}
              onScreenTypeChange={setScreenType}
              headphoneMode={headphoneMode}
              onHeadphoneModeChange={setHeadphoneMode}
              expanded={expanded}
              onExpandedChange={setExpanded}
              sources={sources}
              onSourcesChange={setSources}
            />
          </aside>

          <section className="min-w-0">
            <Card className="h-full p-3 sm:p-4 rounded-3xl">
              <div className="flex items-center justify-between gap-3 px-1">
                <div className="space-y-1">
                  <div className="text-sm font-bold text-slate-900">车舱可视化</div>
                  <div className="text-xs text-slate-600">
                    当前分屏：{splitText}（主驾浅绿 / 副驾浅紫 / 后排橙）
                  </div>
                </div>
                <Badge
                  className={
                    expanded
                      ? 'bg-white/90 border-sky-200/70 text-sky-900'
                      : 'bg-white/60 border-slate-200 text-slate-700'
                  }
                >
                  {expanded ? '展开中' : '收纳中'}
                </Badge>
              </div>

              <div className="mt-3">
                <CabinVisualization
                  audioZones={audioZones}
                  screenType={screenType}
                  expanded={expanded}
                  earphoneMode={headphoneMode}
                  talkingRegion={simulating ? talkingRegion : null}
                />
              </div>
            </Card>
          </section>

          <aside className="min-w-0">
            <ResultPanel
              simulating={simulating}
              stepIndex={stepIndex}
              talkingRegion={simulating ? talkingRegion : null}
              onToggleSimulation={onToggleSimulation}
              onReset={onReset}
            />
          </aside>
        </div>

        <div className="mt-4">
          <ExampleCommands />
        </div>
      </main>
    </div>
  )
}
