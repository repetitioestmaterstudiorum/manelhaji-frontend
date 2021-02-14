import React from "react"
import CanvasDraw from "react-canvas-draw"

import Layout from "../components/layout"
import SEO from "../components/seo"

function Draw() {
  const [saveableCanvas, setSaveableCanvas] = React.useState(null)

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
            console.log("hi")
          }}
        >
          Save
        </button>
        <button
          onClick={() => {
            saveableCanvas.undo()
          }}
        >
          Undo
        </button>
        <button
          onClick={() => {
            saveableCanvas.clear()
          }}
        >
          Clear
        </button>
      </div>
      <CanvasDraw
        ref={canvasDraw => setSaveableCanvas(canvasDraw)}
        loadTimeOffset={3}
        immediateLoading={true}
        canvasWidth={"94vmin"}
        canvasHeight={"60vh"}
        hideGrid={true}
        brushRadius={1}
        brushColor={"#1e1e1e"}
        lazyRadius={null}
        hideInterface={true} // no dot as cursor
        onChange={() =>
          localStorage.setItem("savedDrawing", saveableCanvas.getSaveData())
        }
        saveData={localStorage.getItem("savedDrawing")}
        style={{ margin: "0 auto", cursor: "crosshair" }}
      />
    </Layout>
  )
}

export default Draw
