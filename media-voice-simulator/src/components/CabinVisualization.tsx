import type { AudioZoneCount, ScreenType } from './ControlPanel'
import { cn } from '../lib/utils'

export type TalkingRegion = 'driver' | 'passenger' | 'rear'

export interface CabinVisualizationProps {
  audioZones: AudioZoneCount
  screenType: ScreenType
  expanded: boolean
  earphoneMode: boolean
  talkingRegion: TalkingRegion | null
}

function splitLabel(zones: AudioZoneCount) {
  if (zones === 2) return '2X'
  if (zones === 4) return '3X'
  return '6X'
}

export function CabinVisualization({
  audioZones,
  screenType,
  expanded,
  earphoneMode,
  talkingRegion,
}: CabinVisualizationProps) {
  const driverScreenVisible = true
  const passengerScreenVisible = true
  const rearScreenVisible = screenType === 'full'

  const driverActive = audioZones >= 2 && driverScreenVisible
  const passengerActive = audioZones >= 2 && passengerScreenVisible
  const rearActive = audioZones >= 4 && rearScreenVisible

  const talkingDriver = talkingRegion === 'driver' && driverActive
  const talkingPassenger = talkingRegion === 'passenger' && passengerActive
  const talkingRear = talkingRegion === 'rear' && rearActive

  const split = splitLabel(audioZones)

  const green = earphoneMode ? 'rgba(34, 197, 94, 0.72)' : 'rgba(34, 197, 94, 0.58)'
  const purple = earphoneMode ? 'rgba(168, 85, 247, 0.68)' : 'rgba(168, 85, 247, 0.52)'
  const orange = earphoneMode ? 'rgba(249, 115, 22, 0.68)' : 'rgba(249, 115, 22, 0.52)'

  const greenSoft = earphoneMode ? 'rgba(34, 197, 94, 0.14)' : 'rgba(34, 197, 94, 0.10)'
  const purpleSoft = earphoneMode ? 'rgba(168, 85, 247, 0.14)' : 'rgba(168, 85, 247, 0.10)'
  const orangeSoft = earphoneMode ? 'rgba(249, 115, 22, 0.14)' : 'rgba(249, 115, 22, 0.10)'

  // 只做 UI 透视：展开时更“贴近屏幕”
  const perspective = expanded ? '1200px' : '900px'
  const transform = expanded ? 'rotateX(10deg) translateY(-4px)' : 'rotateX(10deg) translateY(10px)'

  return (
    <div className="relative h-[430px] sm:h-[520px] w-full overflow-hidden rounded-3xl bg-gradient-to-b from-sky-50 via-sky-50 to-white border border-slate-200/70">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-28 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-sky-200/35 blur-2xl" />
        <div className="absolute -top-24 right-10 h-48 w-48 rounded-full bg-violet-200/25 blur-2xl" />
        <div className="absolute top-28 left-10 h-56 w-56 rounded-full bg-emerald-200/20 blur-2xl" />
      </div>

      <div className="relative h-full p-3 sm:p-4">
        <div className="flex h-full items-center justify-center">
          <div className="w-full h-full [perspective:1200px] sm:[perspective:1200px]">
            <div
              className={cn('relative h-full w-full [transform-style:preserve-3d]')}
              style={{
                perspective,
                transform,
              }}
            >
              {/* ===== SVG 车舱主体 ===== */}
              <svg viewBox="0 0 800 520" className="h-full w-full">
                <defs>
                  <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#ffffff" stopOpacity="0.88" />
                    <stop offset="1" stopColor="#e2e8f0" stopOpacity="0.75" />
                  </linearGradient>
                  <linearGradient id="dash" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#f8fafc" stopOpacity="1" />
                    <stop offset="1" stopColor="#e5e7eb" stopOpacity="1" />
                  </linearGradient>
                  <filter id="shadowSoft" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#0f172a" floodOpacity="0.12" />
                  </filter>
                </defs>

                {/* 车舱底座 */}
                <g filter="url(#shadowSoft)">
                  <path
                    d="M70 335 C 145 285, 240 265, 325 270 C 410 275, 485 250, 560 240 C 655 226, 740 260, 770 325 L 770 470 L 70 470 Z"
                    fill="#f1f5f9"
                    opacity="0.95"
                  />
                  <path
                    d="M105 345 C 180 310, 240 298, 322 302 C 404 306, 478 292, 555 285 C 645 277, 720 310, 747 345 L 747 470 L 105 470 Z"
                    fill="#eaf2fb"
                    opacity="0.65"
                  />
                </g>

                {/* 座椅（主驾/副驾/后排） */}
                <g opacity="0.98">
                  {/* 主驾 */}
                  <path
                    d="M210 305 C 240 265, 280 255, 320 256 C 360 257, 395 270, 402 310 L 410 385 C 398 402, 360 418, 318 420 C 270 422, 232 402, 210 385 Z"
                    fill="#111827"
                    opacity="0.10"
                  />
                  <path
                    d="M240 292 C 268 270, 293 266, 320 266 C 348 266, 368 276, 382 296 L 390 375 C 378 392, 355 403, 322 405 C 290 406, 262 394, 242 375 Z"
                    fill="#0b1220"
                    opacity={driverActive ? 0.16 : 0.12}
                  />

                  {/* 副驾 */}
                  <path
                    d="M450 305 C 480 265, 520 255, 560 256 C 600 257, 635 270, 642 310 L 650 385 C 638 402, 600 418, 558 420 C 510 422, 472 402, 450 385 Z"
                    fill="#111827"
                    opacity="0.10"
                  />
                  <path
                    d="M478 292 C 506 270, 531 266, 560 266 C 588 266, 608 276, 622 296 L 630 375 C 618 392, 595 403, 562 405 C 530 406, 502 394, 482 375 Z"
                    fill="#0b1220"
                    opacity={passengerActive ? 0.16 : 0.12}
                  />

                  {/* 后排 */}
                  {rearScreenVisible ? (
                    <>
                      <path
                        d="M260 380 C 295 360, 340 355, 395 356 C 450 357, 505 365, 540 382 L 565 465 C 525 485, 455 495, 398 492 C 338 488, 292 478, 235 460 Z"
                        fill="#0b1220"
                        opacity={rearActive ? 0.16 : 0.11}
                      />
                      <path
                        d="M312 397 C 346 382, 392 380, 430 382 C 468 384, 507 392, 525 402 L 536 463 C 498 477, 445 482, 402 480 C 358 478, 330 470, 292 456 Z"
                        fill="#0b1220"
                        opacity={rearActive ? 0.18 : 0.12}
                      />
                    </>
                  ) : null}
                </g>

                {/* 中控区域/屏幕 */}
                <g>
                  {/* 仪表台 */}
                  <path d="M105 265 C 220 230, 330 220, 420 220 C 510 220, 635 235, 720 275 L 720 340 C 630 315, 510 300, 420 300 C 330 300, 220 315, 105 345 Z" fill="url(#dash)" opacity="0.95" />

                  {/* 前排屏幕：单中控/一体屏 -> 只画一个“前屏区域”，内部再分左/右 */}
                  {screenType !== 'full' ? (
                    <>
                      {/* 屏幕外框 */}
                      <rect x={screenType === 'allInOne' ? 140 : 255} y={175} width={screenType === 'allInOne' ? 520 : 290} height={70} rx={16} fill="url(#glass)" stroke="#cbd5e1" />

                      {/* 左半（主驾区域） */}
                      <rect
                        x={screenType === 'allInOne' ? 140 : 255}
                        y={182}
                        width={screenType === 'allInOne' ? 260 : 145}
                        height={56}
                        rx={12}
                        fill={driverActive ? green : greenSoft}
                        stroke={driverActive ? 'rgba(34,197,94,0.65)' : 'rgba(34,197,94,0.25)'}
                        strokeWidth={expanded ? 2 : 1.5}
                      />

                      {/* 右半（副驾区域） */}
                      <rect
                        x={screenType === 'allInOne' ? 400 : 400}
                        y={182}
                        width={screenType === 'allInOne' ? 260 : 145}
                        height={56}
                        rx={12}
                        fill={passengerActive ? purple : purpleSoft}
                        stroke={passengerActive ? 'rgba(168,85,247,0.65)' : 'rgba(168,85,247,0.25)'}
                        strokeWidth={expanded ? 2 : 1.5}
                      />

                      {/* 分屏标签 */}
                      <text
                        x={screenType === 'allInOne' ? 400 : 400}
                        y={160}
                        textAnchor="middle"
                        fontSize={18}
                        fontWeight={800}
                        fill="#0f172a"
                        opacity={0.78}
                      >
                        {split}
                      </text>
                      <text
                        x={screenType === 'allInOne' ? 400 : 400}
                        y={208}
                        textAnchor="middle"
                        fontSize={12}
                        fontWeight={700}
                        fill="#0f172a"
                        opacity={0.55}
                      >
                        主驾 | 副驾
                      </text>
                    </>
                  ) : (
                    <>
                      {/* 中控屏（主驾/副驾） */}
                      <rect x={220} y={170} width={360} height={78} rx={18} fill="url(#glass)" stroke="#cbd5e1" />
                      <rect x={220} y={180} width={180} height={60} rx={14} fill={driverActive ? green : greenSoft} stroke={driverActive ? 'rgba(34,197,94,0.65)' : 'rgba(34,197,94,0.25)'} strokeWidth={2} />
                      <rect x={400} y={180} width={180} height={60} rx={14} fill={passengerActive ? purple : purpleSoft} stroke={passengerActive ? 'rgba(168,85,247,0.65)' : 'rgba(168,85,247,0.25)'} strokeWidth={2} />

                      <text x={400} y={155} textAnchor="middle" fontSize={18} fontWeight={800} fill="#0f172a" opacity={0.78}>
                        {split}
                      </text>
                      <text x={400} y={210} textAnchor="middle" fontSize={12} fontWeight={700} fill="#0f172a" opacity={0.55}>
                        中控 | 左主驾 / 右副驾
                      </text>

                      {/* 副驾侧屏 */}
                      <rect x={600} y={175} width={120} height={60} rx={16} fill="url(#glass)" stroke="#cbd5e1" opacity={0.95} />
                      <rect
                        x={610}
                        y={184}
                        width={100}
                        height={42}
                        rx={12}
                        fill={passengerActive ? purple : purpleSoft}
                        stroke={passengerActive ? 'rgba(168,85,247,0.65)' : 'rgba(168,85,247,0.25)'}
                        strokeWidth={2}
                      />
                      <text x={660} y={258} textAnchor="middle" fontSize={11} fontWeight={800} fill="#0f172a" opacity={0.52}>
                        副驾屏
                      </text>

                      {/* 后排屏 */}
                      <rect x={260} y={255} width={280} height={72} rx={18} fill="url(#glass)" stroke="#cbd5e1" opacity={0.95} />
                      <rect
                        x={272}
                        y={265}
                        width={256}
                        height={50}
                        rx={14}
                        fill={rearActive ? orange : orangeSoft}
                        stroke={rearActive ? 'rgba(249,115,22,0.7)' : 'rgba(249,115,22,0.25)'}
                        strokeWidth={2}
                      />
                      <text x={400} y={340} textAnchor="middle" fontSize={11} fontWeight={800} fill="#0f172a" opacity={0.52}>
                        后排屏
                      </text>
                    </>
                  )}

                  {/* 方向光线（耳机模式更明显） */}
                  <path
                    d="M280 265 C 320 240, 380 240, 420 265"
                    stroke={earphoneMode ? 'rgba(56,189,248,0.55)' : 'rgba(56,189,248,0.25)'}
                    strokeWidth={expanded ? 3 : 2}
                    fill="none"
                    opacity={0.9}
                  />
                </g>
              </svg>

              {/* ===== 说话音区：动态光点 + 波纹 ===== */}
              <div className="pointer-events-none absolute inset-0">
                {/* 主驾 */}
                {talkingDriver ? (
                  <div className="absolute left-[33%] top-[41%]">
                    <div
                      className="h-3 w-3 rounded-full bg-emerald-300 shadow animate-ui-breathe"
                      style={{ boxShadow: `0 0 22px rgba(16,185,129,0.55)` }}
                    />
                    <div
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 rounded-full border border-emerald-300/60 animate-ui-ripple"
                      style={{ boxShadow: `0 0 20px rgba(16,185,129,0.35)` }}
                    />
                  </div>
                ) : null}

                {/* 副驾 */}
                {talkingPassenger ? (
                  <div className="absolute left-[59%] top-[41%]">
                    <div
                      className="h-3 w-3 rounded-full bg-violet-300 shadow animate-ui-breathe"
                      style={{ boxShadow: `0 0 22px rgba(168,85,247,0.55)` }}
                    />
                    <div
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 rounded-full border border-violet-300/60 animate-ui-ripple"
                      style={{ boxShadow: `0 0 20px rgba(168,85,247,0.35)` }}
                    />
                  </div>
                ) : null}

                {/* 后排 */}
                {talkingRear ? (
                  <div className="absolute left-[50%] top-[67%]">
                    <div
                      className="h-3 w-3 rounded-full bg-orange-300 shadow animate-ui-breathe"
                      style={{ boxShadow: `0 0 22px rgba(249,115,22,0.55)` }}
                    />
                    <div
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-7 w-7 rounded-full border border-orange-300/60 animate-ui-ripple"
                      style={{ boxShadow: `0 0 22px rgba(249,115,22,0.35)` }}
                    />
                  </div>
                ) : null}
              </div>

              {/* 便于用户理解：当 rear 不可见时给轻提示（仅 UI） */}
              {!rearScreenVisible && audioZones >= 4 ? (
                <div className="absolute bottom-3 left-4 right-4">
                  <div className="rounded-2xl bg-white/70 border border-slate-200/70 px-3 py-2 text-xs text-slate-700">
                    当前屏幕类型不包含“后排屏”，因此后排橙色高亮不会显示
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

