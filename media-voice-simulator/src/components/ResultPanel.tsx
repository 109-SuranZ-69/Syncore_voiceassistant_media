import * as React from 'react'
import { Badge } from './ui/Badge'
import { Button } from './ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'
import { Separator } from './ui/Separator'
import type { TalkingRegion } from './CabinVisualization'
import { cn } from '../lib/utils'

const STEPS = [
  { title: '语音采集', desc: '采集主/副/后排音区的能量与方向特征（仅 UI 演示）' },
  { title: '音区能量分析', desc: '对每个音区的能量曲线进行初步归一化与阈值判断（仅 UI 演示）' },
  { title: '信源匹配', desc: '根据信源列表与当前媒体策略选择可能的内容通道（仅 UI 演示）' },
  { title: '选择输出', desc: '输出到对应屏幕与扬声器/耳机通道（仅 UI 演示）' },
  { title: '生成结果', desc: '展示决策路径与最终提示语（仅 UI 演示）' },
] as const

export interface ResultPanelProps {
  simulating: boolean
  stepIndex: number // 0..STEPS.length
  talkingRegion: TalkingRegion | null
  onToggleSimulation: () => void
  onReset: () => void
}

function Waveform({ running }: { running: boolean }) {
  const [tick, setTick] = React.useState(0)
  React.useEffect(() => {
    if (!running) return
    const t = window.setInterval(() => setTick((v) => v + 1), 280)
    return () => window.clearInterval(t)
  }, [running])

  const bars = React.useMemo(() => {
    // 简单随机波形：只用于 UI 动画感
    const base = []
    for (let i = 0; i < 24; i++) {
      const v = Math.round(20 + Math.abs(Math.sin(i * 0.77 + tick * 0.35)) * 75)
      base.push(v)
    }
    return base
  }, [tick])

  return (
    <div className="rounded-2xl bg-white/70 border border-slate-200/70 p-4">
      <div className="flex items-end h-16 gap-1">
        {bars.map((v, i) => {
          const heightPct = Math.max(12, Math.min(100, v))
          const delay = i * 45
          return (
            <div
              key={i}
              className={cn(
                'w-1.5 rounded-full bg-slate-300/70',
                running ? 'animate-ui-wave' : 'opacity-70'
              )}
              style={{
                height: `${heightPct}%`,
                animationDelay: `${delay}ms`,
                animationDuration: running ? '1100ms' : '0ms',
              }}
            />
          )
        })}
      </div>
      <div className="mt-2 text-xs text-slate-600">
        {running ? '语音输入流正在模拟（波形动态）' : '点击开始仿真后波形将自动播放'}
      </div>
    </div>
  )
}

export function ResultPanel({ simulating, stepIndex, talkingRegion, onToggleSimulation, onReset }: ResultPanelProps) {
  const total = STEPS.length
  const progress = Math.max(0, Math.min(total, stepIndex))
  const activeIdx = Math.max(0, Math.min(total - 1, progress - (simulating ? 0 : 1)))

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-lg">结果预览</CardTitle>
            <p className="mt-1 text-sm text-slate-600">语音输入 + 波形 + 决策路径示例</p>
          </div>
          <Badge className="bg-white/90 border-sky-200/70 text-sky-900">
            {simulating ? '运行中' : '待机'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {/* 语音输入框 */}
        <section className="space-y-3">
          <div className="rounded-2xl bg-white/70 border border-slate-200/70 p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-bold text-slate-900">语音输入</div>
              <div className="text-xs text-slate-500">
                {talkingRegion ? `当前说话：${talkingRegion === 'driver' ? '主驾' : talkingRegion === 'passenger' ? '副驾' : '后排'}` : '未触发'}
              </div>
            </div>
            <input
              readOnly
              className="mt-3 w-full rounded-xl border border-slate-200/80 bg-white/90 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-200"
              value={simulating ? '正在聆听：请对准座舱' : '点击开始仿真后将模拟语音输入...'}
            />
          </div>

          <Waveform running={simulating} />
        </section>

        <Separator className="my-5" />

        {/* 控制按钮 */}
        <section className="grid grid-cols-2 gap-2">
          <Button
            variant={simulating ? 'secondary' : 'primary'}
            className="justify-center"
            onClick={onToggleSimulation}
          >
            {simulating ? '停止仿真' : '开始仿真'}
          </Button>
          <Button variant="outline" className="justify-center" onClick={onReset} disabled={!simulating && progress === 0}>
            重置
          </Button>
        </section>

        <Separator className="my-5" />

        {/* 决策路径示例卡片 */}
        <section className="space-y-3">
          <div className="text-sm font-bold text-slate-900">决策路径示例</div>

          {/* 进度条 */}
          <div className="h-3 rounded-full bg-slate-100 border border-slate-200/80 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sky-400 via-violet-400 to-emerald-400 transition-all"
              style={{ width: `${(progress / total) * 100}%` }}
            />
          </div>
          <div className="text-xs text-slate-600">
            当前步骤：{progress === 0 ? '尚未开始' : STEPS[activeIdx]?.title}
          </div>

          <div className="space-y-2">
            {STEPS.map((s, idx) => {
              const done = idx < progress - 0.0001
              const active = idx === progress - (simulating ? 0 : 1)
              return (
                <div
                  key={s.title}
                  className={cn(
                    'rounded-2xl border p-3 bg-white/70',
                    active ? 'border-sky-300/80 shadow-sm' : 'border-slate-200/80'
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <div
                          className={cn(
                            'h-7 min-w-7 rounded-xl flex items-center justify-center text-xs font-bold',
                            done
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : active
                                ? 'bg-sky-100 text-sky-800 border border-sky-200'
                                : 'bg-slate-100 text-slate-600 border border-slate-200'
                          )}
                        >
                          {idx + 1}
                        </div>
                        <div className="text-sm font-bold text-slate-900">{s.title}</div>
                      </div>
                      <div className="mt-1 text-xs text-slate-600">{s.desc}</div>
                    </div>
                    {done ? (
                      <Badge className="bg-emerald-50 border-emerald-200 text-emerald-800">完成</Badge>
                    ) : active ? (
                      <Badge className="bg-sky-50 border-sky-200 text-sky-800">进行中</Badge>
                    ) : (
                      <Badge className="bg-slate-50 border-slate-200 text-slate-700">等待</Badge>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </CardContent>
    </Card>
  )
}

