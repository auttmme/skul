import area from "./json/area.json";

export default function handler(req, res) {
  res.status(200).json(area);
}
