import React, { useState } from "react"
import CanvasDraw from "react-canvas-draw"

import Layout from "../components/layout"
import SEO from "../components/seo"

function Draw() {
  const [canvas, setCanvas] = useState(null)
  const [drawing, setDrawing] = useState(null)

  function printDiv() {
    const divContents = document.querySelector(
      "#canvasDraw > div > canvas:nth-child(2)"
    )
    const dateAndTimeString = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    const img = "<img src = '" + divContents.toDataURL() + "'/>"
    const newWindow = window.open("", "My Drawing")
    newWindow.document.write("<html>")
    newWindow.document.write(
      `<html>
        <body >
          <strong>My drawing from ${dateAndTimeString}</strong>
          <p>Made on ${window.location.href}</p>
          <br>`
    )
    newWindow.document.write(img)
    newWindow.document.write("</body></html>")
    setTimeout(() => {
      newWindow.print()
      newWindow.close()
    }, 100)
  }

  function saveDrawing() {
    // localStorage.setItem("savedDrawing", canvas.getSaveData())
    setDrawing(canvas.getSaveData())
  }

  const isDrawingInProgress = JSON.parse(drawing)?.lines?.length > 0

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
          disabled={isDrawingInProgress ? false : true}
        >
          Undo
        </button>
        <button
          onClick={() => {
            canvas.clear()
            saveDrawing()
          }}
          disabled={isDrawingInProgress ? false : true}
        >
          Clear
        </button>
        <button
          onClick={() => {
            printDiv()
          }}
          disabled={isDrawingInProgress ? false : true}
        >
          Print!
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
          brushRadius={1}
          brushColor={"#1e1e1e"}
          lazyRadius={null}
          hideInterface={true} // no dot as cursor
          onChange={() => saveDrawing()}
          // saveData={localStorage.getItem("savedDrawing")}
          saveData={drawing}
          style={{ margin: "0 auto", cursor: "crosshair" }}
        />
      </div>
    </Layout>
  )
}

export default Draw
