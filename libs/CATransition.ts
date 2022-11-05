import UnitPath from 'unit-path'

type Options = {
  width?: number;
  height?: number;
}

type DrawOptions = {
  duration: number;
  fill: string;
}

type Point = {
  x: number;
  y: number;
}

export default class CATransition {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  width: number
  height: number

  cx: number = 0
  cy: number = 0
  halfDiagonal: number = 0
  halfShortSide: number = 0

  useCircle = false
  circleFillStyle = 'rgba(0, 163, 255, .5)'
  circleRequestId: number = 0
  circleDuration: number = 0
  circleI: number = 0

  useBg = false
  bgFillStyle = '#000'
  bgRequestId: number = 0
  bgDuration: number = 0
  bgI: number = 0

  fps: number = 60

  topPoints: Point[] = []
  bottomPoints: Point[] = []

  constructor (canvas: HTMLCanvasElement, options: Options = {}) {
    const {
      width = 400,
      height = 300
    } = options || {}

    this.canvas = canvas
    this.width = width
    this.height = height

    canvas.width = width
    canvas.height = height

    this.ctx = canvas.getContext('2d')!

    this.init()
  }

  static angle2radian (angle: number) {
    return Math.PI * angle / 180
  }

  get bgCount (): number {
    return Math.ceil(this.bgDuration * this.fps)
  }

  get circleCount (): number {
    return Math.ceil(this.circleDuration * this.fps)
  }

  get circleRadiuses () {
    const { halfDiagonal, halfShortSide } = this
    return [
      halfDiagonal,
      halfShortSide,
      halfShortSide * 0.5,
      halfShortSide * 0.2
    ]
  }

  init () {
    const { width, height } = this

    this.halfDiagonal = Math.sqrt(width ** 2 + height ** 2)
    this.cx = width / 2
    this.cy = height / 2
    this.halfShortSide = Math.min(width, height) / 2
  }

  draw ({
    bg,
    circle
  }: { bg?: DrawOptions, circle?: DrawOptions }) {
    cancelAnimationFrame(this.bgRequestId)
    cancelAnimationFrame(this.circleRequestId)

    if (circle) {
      this.useCircle = true

      this.circleFillStyle = circle.fill
      this.circleI = 0
      this.circleDuration = circle.duration
      this.circleRun()
    }

    if (bg) {
      this.setPoints()
      this.useBg = true
      this.bgFillStyle = bg.fill
      this.bgDuration = bg.duration
      this.bgI = 0
      if (!circle) {
        this.bgRun()
      }
    }
  }

  setPoints () {
    const { width, height } = this

    const up = new UnitPath()
    this.topPoints = up.setPath('LINE', {
      x: width - 30,
      y: 0
    }, {
      x: 0,
      y: height - 30
    }).getPoints(20)
    this.bottomPoints = up.setPath('LINE', {
      x: 30,
      y: height
    }, {
      x: width,
      y: 30
    }).getPoints(20)
  }

  bgRun () {
    if (this.bgI > this.bgCount) {
      cancelAnimationFrame(this.bgRequestId)
    }

    this.clearRect()
    if (this.bgI < this.bgCount * 0.7) {
      this.drawBg(this.bgI / this.bgCount / 0.7)
    }

    if (this.bgI < 10) {
      this.drawLine(this.topPoints[10 + this.bgI - 1], this.topPoints[10 + this.bgI])
      this.drawLine(this.bottomPoints[10 + this.bgI - 1], this.bottomPoints[10 + this.bgI])
    }

    if (this.bgI > this.bgCount * 0.1) {
      this.drawBg((this.bgI - this.bgCount * 0.1) / this.bgCount, 0.2)
    } else {
      this.drawFullBg(0.5)
    }

    this.bgI++

    this.bgRequestId = requestAnimationFrame(this.bgRun.bind(this))
  }

  circleRun () {
    if (this.circleI > this.circleCount) {
      cancelAnimationFrame(this.circleRequestId)
      if (this.useBg) {
        this.bgRun()
      }
      return
    }
    this.clearRect()
    this.drawFullBg()

    const i = this.circleI
    const count = this.circleCount
    const circleRadiuses = this.circleRadiuses

    if (count - i < 10) {
      this.drawLine(this.topPoints[10 - (count - i) - 1], this.topPoints[10 - (count - i)])
      this.drawLine(this.bottomPoints[10 - (count - i) - 1], this.bottomPoints[10 - (count - i)])
    }

    // 最外层大圈
    if (i <= count * 0.05) {
      this.drawCircle(circleRadiuses[0], 0.01)
    } else if (i < count * 0.75) {
      this.drawCircle(circleRadiuses[0], (i - count * 0.05) * 360 / (count * 0.7))
    }

    // 内圈 100%
    this.drawCircle(circleRadiuses[1], i * 360 / count)

    // 内圈 50%
    if (i <= count * 0.9) {
      if (i <= count * 0.1) {
        this.drawCircle(circleRadiuses[2], 0.01)
      } else {
        this.drawCircle(circleRadiuses[2], (i - count * 0.1) * 360 / (count * 0.8))
      }
    }

    // 内圈 20%
    if (i <= count * 0.2) {
      this.drawCircle(circleRadiuses[3], 0.01)
    } else {
      this.drawCircle(circleRadiuses[3], (i - count * 0.2) * 360 / count / 0.8)
    }

    this.circleI++

    this.circleRequestId = requestAnimationFrame(this.circleRun.bind(this))
  }

  drawBg (percentage: number, alpha = 1) {
    const { ctx, width, height, bgFillStyle } = this

    ctx.globalAlpha = alpha

    // 上层
    ctx.beginPath()
    ctx.fillStyle = bgFillStyle
    ctx.moveTo(width * percentage, 0)
    ctx.lineTo(width, height * (1 - percentage))
    ctx.lineTo(width, 0)
    ctx.closePath()
    ctx.fill()

    // 下层
    ctx.beginPath()
    ctx.fillStyle = bgFillStyle
    ctx.moveTo(0, height * percentage)
    ctx.lineTo(width * (1 - percentage), height)
    ctx.lineTo(0, height)
    ctx.closePath()
    ctx.fill()

    ctx.globalAlpha = 1
  }

  drawFullBg (alpha = 1) {
    const { ctx } = this

    ctx.globalAlpha = alpha

    ctx.fillStyle = this.bgFillStyle
    ctx.fillRect(0, 0, this.width, this.height)

    ctx.globalAlpha = 1
  }

  drawLine (point1: Point, point2: Point) {
    const { ctx } = this

    ctx.beginPath()
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 2
    ctx.moveTo(point1.x, point1.y)
    ctx.lineTo(point2.x, point2.y)
    ctx.stroke()
    ctx.closePath()
  }

  drawCircle (radius: number, angle: number) {
    const {
      ctx,
      cx,
      cy,
      circleFillStyle
    } = this

    ctx.save()
    ctx.beginPath()
    ctx.fillStyle = circleFillStyle
    ctx.moveTo(cx, cy)
    ctx.lineTo(0, cy)
    ctx.arc(cx, cy, radius, Math.PI, Math.PI + CATransition.angle2radian(angle), true)
    ctx.lineTo(cx, cy)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
  }

  clearRect () {
    this.ctx.clearRect(0, 0, this.width, this.height)
  }
}
