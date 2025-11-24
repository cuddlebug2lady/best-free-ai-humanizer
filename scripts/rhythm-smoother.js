import fs from "fs";
import nlp from "compromise";

const filePath = process.argv[2] || "samples/original.txt";

let text = "";
try {
  text = fs.readFileSync(filePath, "utf8");
} catch (err) {
  console.error("[ERROR] Could not read file:", filePath);
  process.exit(1);
}

const fillerWords = [
  "very", "really", "actually", "basically", "literally",
  "clearly", "simply", "definitely", "extremely"
];

let sentences = nlp(text).sentences().out("array").flatMap(s => {
  if (s.length > 200) {
    const middle = Math.floor(s.length / 2);
    return [s.slice(0, middle) + ".", s.slice(middle)];
  }
  return [s];
});

let cleaned = sentences
  .map(s => {
    fillerWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, "gi");
      s = s.replace(regex, "");
    });
    return s.replace(/\s+/g, " ").trim();
  })
  .join(" ");

fs.writeFileSync("samples/smoothed.txt", cleaned, "utf8");
console.log("Smoothed version written to samples/smoothed.txt");
