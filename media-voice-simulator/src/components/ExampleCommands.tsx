import * as React from 'react'
import { Badge } from './ui/Badge'
import { Button } from './ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'
import { cn } from '../lib/utils'

const COMMANDS = [
  '播放：周杰伦《晴天》',
  '播放：网易云热歌榜 并随机播放',
  '开始听：喜马拉雅“情感故事”',
  '切换到：云听 并朗读今日新闻',
  '切换到：爱奇艺音乐 并推荐相似歌手',
  '全民K歌：开麦并进入演唱模式',
  '切换信源：只保留 QQ 音乐与网易云',
  '打开耳机模式（UI 联动演示）',
  '关闭屏幕展开状态（模拟收纳）',
  '开始仿真（演示波形与决策路径）',
] as const

export function ExampleCommands() {
  const [toast, setToast] = React.useState<string | null>(null)

  async function onCopy(text: string) {
    try {
      await navigator.clipboard.writeText(text)
      setToast('已复制到剪贴板')
    } catch {
      setToast('复制失败：请手动复制')
    } finally {
      window.setTimeout(() => setToast(null), 1200)
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-lg">底部示例指令库</CardTitle>
            <p className="mt-1 text-sm text-slate-600">点击按钮复制指令（不做真实 PK 逻辑）</p>
          </div>
          <Badge className="bg-white/90 border-sky-200/70 text-sky-900">10 条常用</Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="relative">
          {toast ? (
            <div className="absolute right-0 -top-10 rounded-2xl bg-sky-500 text-white text-sm px-4 py-2 shadow animate-ui-breathe">
              {toast}
            </div>
          ) : null}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {COMMANDS.map((cmd) => (
              <Button
                key={cmd}
                variant="outline"
                className={cn('h-11 justify-start', 'rounded-3xl')}
                onClick={() => onCopy(cmd)}
              >
                {cmd}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

