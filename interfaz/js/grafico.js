// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Kaniugu

//@version=5
indicator("Ultimate Indicator", overlay = true)

// VALUE
var top = float(na), var bottom = float(na), var above = float(na), var below = float(na)
var line median = na, var line resistance = na, var line support = na, var line higher = na, var line lower = na, var line limit = na
line.delete(median[1]), line.delete(resistance[1]), line.delete(support[1]), line.delete(higher[1]), line.delete(lower[1]), line.delete(limit[1])
position = input.string("Auto", "Position", options = ["Auto", "Auto Long", "Auto Short", "Fixed", "Fixed Long", "Fixed Short"]), quantity = input.float(50, "Quantity")
profit   = input.float(1.2, "Take Profit", minval = 0.1, group = "Risk & Reward"),  loss     = input.string("ATR", "Stop Loss", options = ["ATR", "ATR x 2", "HHLL"], group = "Risk & Reward")
factor   = input.float(1.5, "Deviation", minval = 0.5, group = "Trendline"),        period   = input.int(100, "Period", minval = 5, group = "Trendline")
spread   = input.bool(true, "Spread Percentages", group = "Visibility"),            extend   = input.bool(true, "Extend Trendlines", group = "Visibility") ? extend.right : extend.none
signal   = input.bool(false, "Visible Signals", group = "Visibility")

// DIRECTION
up   = open > close and open[1] < close[1]
down = open < close and open[1] > close[1]

// LEVEL
peak    = up    and high > above
trough  = down  and low  < below

// THRESHOLD
if up
    above := high
if down
    below := low

// ATR
atr = ta.atr(14)

// LINEAR REGRESSION
x = 0.0, y = 0.0, x2 = 0.0, y2 = 0.0, xy = 0.0
index = period - 1
for i = 0 to index
    c = nz(close[i])
    x  := x  + i
    y  := y  + c
    x2 := x2 + (i * i)
    y2 := y2 + (c * c)
    xy := xy + (c * i)
sx = math.pow(x, 2.0)
sy = math.pow(y, 2.0)
pearson = (xy - (x * y) / period) / (math.sqrt(x2 - sx / period) * math.sqrt(y2 - sy / period))
xx = x * x
slope = x2 == xx ? 0.0 : (period * xy - x * y) / (period * x2 - xx)
linreg = (y - slope * x) / period
intercept = linreg + bar_index * slope
deviation = 0.0
for i = 0 to index
    deviation := deviation + math.pow(nz(close[i]) - (intercept - slope * bar_index[i]), 2.0)
deviation := math.sqrt(deviation / index) * factor
point = linreg + slope * index

// PRICE
price(value) => value > 10.0 ? str.format("{0,number,#.##}", value) : str.tostring(value)

// CONDITION
short = peak    and ta.crossunder(close, linreg + deviation)
long  = trough  and ta.crossover(close,  linreg - deviation)

// SPREAD
if spread
    if peak
        label.new(bar_index, na, str.format("{0,number,#.##}", (high - bottom) / high * 100), yloc = yloc.abovebar, style = label.style_none, textcolor = color.red)
        top := high
    if trough
        label.new(bar_index, na, str.format("{0,number,#.##}", (top - low) / top * 100), yloc = yloc.belowbar, style = label.style_none, textcolor = color.blue)
        bottom := low

// SIGNAL
if barstate.islast
    if short and (position == "Auto" or position == "Auto Short" ? linreg < point : position == "Fixed" or position == "Fixed Short")
        risk = math.max(high[0], high[1], high[2]) + (loss == "ATR" ? atr : loss == "ATR x 2" ? atr * 2 : 0), reward = open - (risk - open) * profit
        limit := line.new(bar_index, risk, bar_index + 20, risk, color = color.red, width = 2, style = line.style_dotted)
        alert("Short\nTicker " + syminfo.ticker + "\nPrice " + str.tostring(close) + "\nQuantity " + str.tostring(quantity) + "\nSL " + price(risk) + "\nTP " + price(reward), alert.freq_once_per_bar)
    if long and (position == "Auto" or position == "Auto Long" ? linreg > point : position == "Fixed" or position == "Fixed Long")
        risk = math.min(low[0], low[1], low[2]) - (loss == "ATR" ? atr : loss == "ATR x 2" ? atr * 2 : 0), reward = open + (open - risk) * profit
        limit := line.new(bar_index, risk, bar_index + 20, risk, color = color.blue, width = 2, style = line.style_dotted)
        alert("Long\nTicker " + syminfo.ticker + "\nPrice " + str.tostring(close) + "\nQuantity " + str.tostring(quantity) + "\nSL " + price(risk) + "\nTP " + price(reward), alert.freq_once_per_bar)

// DRAW
median          := line.new(bar_index - period + 1, point                , bar_index, linreg                , xloc.bar_index, extend, pearson < 0 ? color.lime : color.aqua, line.style_dotted, 2)
resistance      := line.new(bar_index - period + 1, point + deviation    , bar_index, linreg + deviation    , xloc.bar_index, extend, color.red , line.style_dashed, 2)
support         := line.new(bar_index - period + 1, point - deviation    , bar_index, linreg - deviation    , xloc.bar_index, extend, color.blue, line.style_dashed, 2)
higher          := line.new(bar_index - period + 1, point + deviation / 2, bar_index, linreg + deviation / 2, xloc.bar_index, extend, color.red , line.style_dotted, 1)
lower           := line.new(bar_index - period + 1, point - deviation / 2, bar_index, linreg - deviation / 2, xloc.bar_index, extend, color.blue, line.style_dotted, 1)
ribbon = (ta.ema(close, 24) > ta.ema(close, 8) ? color.aqua : color.lime)
plot(ta.ema(close,  8), color = color.new(ribbon, 40), title =  "EMA 8")
plot(ta.ema(close, 12), color = color.new(ribbon, 50), title = "EMA 12")
plot(ta.ema(close, 16), color = color.new(ribbon, 60), title = "EMA 16")
plot(ta.ema(close, 20), color = color.new(ribbon, 70), title = "EMA 20")
plot(ta.ema(close, 24), color = color.new(ribbon, 80), title = "EMA 24")
plotshape(short  and signal, style = shape.circle, color = color.red,  location = location.abovebar, size = size.tiny, title = "Short")
plotshape(long   and signal, style = shape.circle, color = color.blue, location = location.belowbar, size = size.tiny, title = "Long")
plotshape(peak   and (short == false or signal == false), style = shape.xcross,  color = color.red,  location = location.abovebar, size = size.tiny, title = "Peak")
plotshape(trough and (long  == false or signal == false), style = shape.diamond, color = color.blue, location = location.belowbar, size = size.tiny, title = "Trough")
fill(plot((open + close) / 2, display = display.none), plot(ta.ema(close, 24), display = display.none), color = color.new(ribbon, 96))