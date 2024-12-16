import LegendItem from "./LengendItem";

const legendItems: LegendItem[] = [
  // High Incidents
  new LegendItem(
    "Legal and Regulatory Frameworks",
    "#741f1f",
    (incidents) => incidents >= 40,
    "white"
  ),

  new LegendItem(
    "Access and Participation",
    "#9c2929",
    (incidents) => incidents >= 30 && incidents < 40,
    "white"
  ),

  // Medium Incidents
  new LegendItem(
    "Safety for HRDs",
    "#c57f7f",
    (incidents) => incidents >= 20 && incidents < 30,
    "black"
  ),

  // Low Incidents
  new LegendItem(
    "Funding and Support",
    "#d8aaaa",
    (incidents) => incidents >= 10 && incidents < 20,
    "black"
  ),

  // No Data or Low Incidents
  new LegendItem(
    "Freedom of Expression",
    "#ffffff",
    (incidents) => incidents === 0,
    "black"
  ),
];

export default legendItems;
