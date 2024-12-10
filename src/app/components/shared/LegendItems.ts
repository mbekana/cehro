import LegendItem from "./LengendItem";

const legendItems: LegendItem[] = [
  // High Incidents
  new LegendItem(
    "40 - 50 incidents",
    "#741f1f",
    (incidents) => incidents >= 40,
    "white"
  ),

  new LegendItem(
    "30 - 39 incidents",
    "#9c2929",
    (incidents) => incidents >= 30 && incidents < 40,
    "white"
  ),

  // Medium Incidents
  new LegendItem(
    "20 - 29 incidents",
    "#c57f7f",
    (incidents) => incidents >= 20 && incidents < 30,
    "black"
  ),

  // Low Incidents
  new LegendItem(
    "10 - 19 incidents",
    "#d8aaaa",
    (incidents) => incidents >= 10 && incidents < 20,
    "black"
  ),

  // No Data or Low Incidents
  new LegendItem(
    "No Data / 0 incidents",
    "#ffffff",
    (incidents) => incidents === 0,
    "black"
  ),
];

export default legendItems;
