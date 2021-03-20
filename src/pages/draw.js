import React, { useState, useContext } from "react"
import CanvasDraw from "react-canvas-draw"

import { PersistantDataContext } from "../context/persistantDataContext"
import Layout from "../components/layout"
import SEO from "../components/seo"

function Draw() {
  const [canvas, setCanvas] = useState({})
  const { drawing, setDrawing, brushSize, setBrushSize } = useContext(
    PersistantDataContext
  )

  function print() {
    const finalCanvas = document.querySelector(
      "#canvasDraw > div > canvas:nth-child(2)"
    )
    const dateAndTimeString = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    const img = "<img src = ''" + finalCanvas.toDataURL() + "''/>"
    const newWindow = window.open("", "My Drawing")
    newWindow.document.write("<html>")
    newWindow.document.write(
      `<html>
        <body >
          <strong>My drawing from ${dateAndTimeString}</strong>
          <p>Made on ${window.location.hostname}</p>
          <br>`
    )
    newWindow.document.write(img)
    newWindow.document.write("</body></html>")
    setTimeout(() => {
      newWindow.print()
      newWindow.close()
    }, 100)
  }

  function downloadDrawing() {
    const finalCanvas = document.querySelector(
      "#canvasDraw > div > canvas:nth-child(2)"
    )

    const ctx = finalCanvas.getContext("2d")
    ctx.globalCompositeOperation = "destination-over"
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height)

    const img = finalCanvas.toDataURL("image/png")

    const a = document.createElement("a")
    a.href = img
    a.download = `drawing-from-${window.location.hostname}.png`
    a.click()
  }

  function saveDrawing() {
    setDrawing(canvas.getSaveData())
  }

  const isDrawingInProgress =
    drawing && JSON.parse(drawing)?.lines?.length > 0 ? false : true

  return (
    <Layout>
      <SEO title="Draw!" />
      <h2>Draw!</h2>
      <div
        style={{
          display: "flex",
          marginBottom: "7px",
          justifyContent: "center",
        }}
      >
        <button
          onClick={() => {
            canvas.undo()
          }}
          disabled={isDrawingInProgress}
        >
          Undo
        </button>
        <button
          onClick={() => {
            canvas.clear()
            saveDrawing()
          }}
          disabled={isDrawingInProgress}
        >
          Clear
        </button>
        <button
          onClick={() => {
            downloadDrawing()
          }}
          disabled={isDrawingInProgress}
          download
        >
          Download
        </button>
        {/* <button
          onClick={() => {
            print()
          }}
          disabled={isDrawingInProgress}
        >
          Print
        </button> */}
      </div>
      <div
        style={{
          display: "flex",
          marginBottom: "7px",
          justifyContent: "center",
        }}
      >
        <p style={{ margin: "0", paddingRight: "10px", lineHeight: "2rem" }}>
          Brush size:
        </p>
        <button
          onClick={() => {
            setBrushSize(1)
          }}
          disabled={brushSize === 1}
        >
          small
        </button>
        <button
          onClick={() => {
            setBrushSize(2)
          }}
          disabled={brushSize === 2}
        >
          medium
        </button>
        <button
          onClick={() => {
            setBrushSize(3)
          }}
          disabled={brushSize === 3}
        >
          large
        </button>
      </div>
      <div id="canvasDraw">
        <CanvasDraw
          ref={canvasDraw => setCanvas(canvasDraw)}
          loadTimeOffset={3}
          immediateLoading={true}
          canvasWidth={"94vmin"}
          canvasHeight={"60vh"}
          hideGrid={true}
          brushRadius={brushSize}
          brushColor={"#1e1e1e"}
          lazyRadius={null}
          hideInterface={true} // no dot as cursor
          onChange={() => saveDrawing()}
          saveData={drawing}
          style={{ margin: "0 auto", cursor: "crosshair" }}
        />
      </div>
    </Layout>
  )
}

export default Draw
