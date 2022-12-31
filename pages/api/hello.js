// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import area from "./json/area.json";

export default function handler(req, res) {
  res.status(200).json(area);
}
