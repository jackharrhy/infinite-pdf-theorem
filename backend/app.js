const express = require("express");
const seedrandom = require("seedrandom");
const PDFDocument = require("pdfkit");

const app = express();

const PORT = 1234;

app.use(express.json());

// size: A4 (595.28 x 841.89)
const DEFAULT_PAGE_SIZE = {
  name: "A4",
  width: 595.28,
  height: 841.89,
};

const randomDocument = (
  res,
  { seed = Math.random(), pageSize = DEFAULT_PAGE_SIZE, colors = [] } = {}
) => {
  const doc = new PDFDocument({ size: "A4" });
  const rng = seedrandom(seed);

  const randomInRange = (min, max) => rng() * (max - min) + min;

  const randomHexColor = () => `#${Math.floor(rng() * 16777215).toString(16)}`;

  const generateColor = () => {
    if (colors.length === 0) {
      return randomHexColor();
    } else {
      return colors[Math.floor(rng() * colors.length)];
    }
  };

  const drawBackground = () =>
    doc.rect(0, 0, pageSize.width, pageSize.height).fill(generateColor());

  const drawBars = ({
    color = "white",
    size = randomInRange(100, 200),
  } = {}) => {
    doc.rect(0, 0, pageSize.width, size).fill(color);
    doc.rect(0, pageSize.height - size, pageSize.width, size).fill(color);
  };

  const drawPolygon = () => {
    const size = randomInRange(10, 150);
    const rotate = randomInRange(0, 360);
    const x = randomInRange(size, pageSize.width - size);
    const y = randomInRange(size, pageSize.height - size);

    doc.save();
    doc
      .rotate(rotate, { origin: [x, y] })
      .polygon(
        [x, y - size / 2],
        [x - size / 2, y + size / 2],
        [x + size / 2, y + size / 2]
      )
      .fill(generateColor())
      .restore();
  };

  doc.pipe(res);

  drawBackground(doc);

  const amountOfPolygons = 50;

  [...Array(amountOfPolygons)].forEach(() => drawPolygon(doc));

  drawBars();

  doc.end();
};

app.get("/", (req, res) => {
  res.setHeader("content-type", "application/pdf");

  const seed = req.query.seed || Math.random();

  const colors = req.query.colors
    ? req.query.colors.split(",").map((color) => `#${color}`)
    : [];

  randomDocument(res, { seed, colors });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
