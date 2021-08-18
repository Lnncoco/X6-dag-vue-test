/**
 * algo图形
 */
export const algo = {
  x: 280,
  y: 50,
  width: 160,
  height: 30,
  shape: "algo-node",
  label: "algo-node",
  ports: {
    items: [
      { group: "in", id: "in1" },
      { group: "in", id: "in2" },
      { group: "out", id: "out1" },
    ],
    groups: {
      in: {
        position: { name: "top" },
        zIndex: 1,
      },
      out: {
        position: { name: "bottom" },
        zIndex: 1,
      },
    },
  },
};

/**
 * 长方形
 */
export const rect = {
  width: 100,
  height: 40,
  label: "判断框",
  attrs: {
    label: {
      text: "Rect",
      fill: "#6a6c8a",
    },
    body: {
      stroke: "#108ee9",
      strokeWidth: 2,
    },
  },
};

/**
 * 圆形
 */
export const circle = {
  width: 60,
  height: 60,
  label: "节点框",
  shape: "html",
  html: () => {
    const wrap = document.createElement("div");
    wrap.style.width = "100%";
    wrap.style.height = "100%";
    wrap.style.display = "flex";
    wrap.style.alignItems = "center";
    wrap.style.justifyContent = "center";
    wrap.style.border = "2px solid #108ee9";
    wrap.style.background = "#fff";
    wrap.style.borderRadius = "100%";
    wrap.innerText = "Circle";
    return wrap;
  },
};

export default {
  algo: algo,
  rect: rect,
  circle: circle,
};
