import { Badge } from './ui/Badge'
import { Button } from './ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'
import { Checkbox } from './ui/Checkbox'
import { Switch } from './ui/Switch'
import { Separator } from './ui/Separator'

export type AudioZoneCount = 2 | 4 | 6
export type ScreenType = 'single' | 'allInOne' | 'full'

export interface ControlPanelProps {
  audioZones: AudioZoneCount
  onAudioZonesChange: (value: AudioZoneCount) => void

  screenType: ScreenType
  onScreenTypeChange: (value: ScreenType) => void

  headphoneMode: boolean
  onHeadphoneModeChange: (value: boolean) => void

  expanded: boolean
  onExpandedChange: (value: boolean) => void

  sources: string[]
  onSourcesChange: (value: string[]) => void
}

const SOURCE_OPTIONS = ['QQ音乐', '网易云', '喜马拉雅', '云听', '爱奇艺', '全民K歌'] as const

export function ControlPanel({
  audioZones,
  onAudioZonesChange,
  screenType,
  onScreenTypeChange,
  headphoneMode,
  onHeadphoneModeChange,
  expanded,
  onExpandedChange,
  sources,
  onSourcesChange,
}: ControlPanelProps) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-lg">车舱媒体/语音配置</CardTitle>
            <p className="mt-1 text-sm text-slate-600">
              变更后将立即在车舱中对应高亮显示
            </p>
          </div>
          <Badge className="bg-white/90 border-sky-200/70 text-sky-900">实时联动</Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {/* 音区 */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-sm font-bold text-slate-900">音区</div>
            <div className="text-xs text-slate-500">当前：{audioZones} 区</div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {([2, 4, 6] as AudioZoneCount[]).map((z) => {
              const label = z === 2 ? '双区' : z === 4 ? '四区' : '六区'
              return (
              <Button
                key={z}
                variant={audioZones === z ? 'primary' : 'outline'}
                size="md"
                className="h-10"
                onClick={() => onAudioZonesChange(z)}
              >
                {label}
              </Button>
              )
            })}
          </div>
        </section>

        <Separator className="my-5" />

        {/* 屏幕类型 */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-sm font-bold text-slate-900">屏幕类型</div>
          </div>
          <div className="grid gap-2">
            <Button
              variant={screenType === 'single' ? 'primary' : 'outline'}
              onClick={() => onScreenTypeChange('single')}
              className="h-11 justify-start"
            >
              单中控
            </Button>
            <Button
              variant={screenType === 'allInOne' ? 'primary' : 'outline'}
              onClick={() => onScreenTypeChange('allInOne')}
              className="h-11 justify-start"
            >
              一体屏
            </Button>
            <Button
              variant={screenType === 'full' ? 'primary' : 'outline'}
              onClick={() => onScreenTypeChange('full')}
              className="h-11 justify-start"
            >
              中控+副驾+后排
            </Button>
          </div>
        </section>

        <Separator className="my-5" />

        {/* 耳机模式 */}
        <section className="space-y-3">
          <Switch
            checked={headphoneMode}
            onCheckedChange={onHeadphoneModeChange}
            label="耳机模式"
          />
          <p className="text-xs text-slate-500">
            影响车舱高亮的“柔和度/包围感”（仅 UI 展示）
          </p>
        </section>

        <Separator className="my-5" />

        {/* 屏幕展开状态 */}
        <section className="space-y-3">
          <Switch checked={expanded} onCheckedChange={onExpandedChange} label="屏幕展开状态" />
          <p className="text-xs text-slate-500">用于模拟展开/收纳的 3D 透视变化</p>
        </section>

        <Separator className="my-5" />

        {/* 信源多选 */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-sm font-bold text-slate-900">信源多选</div>
            <div className="text-xs text-slate-500">已选 {sources.length} 个</div>
          </div>
          <div className="max-h-56 overflow-auto pr-1">
            <div className="grid grid-cols-1 gap-2">
              {SOURCE_OPTIONS.map((s) => (
                <Checkbox
                  key={s}
                  checked={sources.includes(s)}
                  onCheckedChange={(next) => {
                    const set = new Set(sources)
                    if (next) set.add(s)
                    else set.delete(s)
                    onSourcesChange(Array.from(set))
                  }}
                  label={s}
                />
              ))}
            </div>
          </div>
          <Button
            variant="ghost"
            size="md"
            className="w-full justify-center"
            onClick={() => onSourcesChange([])}
            disabled={sources.length === 0}
          >
            清空信源
          </Button>
        </section>
      </CardContent>
    </Card>
  )
}

