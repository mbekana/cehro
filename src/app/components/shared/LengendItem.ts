class LegendItem {
  label: string;
  color: string;
  testFunction: (incidents: number) => boolean;
  textColor: string;

  constructor(
    label: string,
    color: string,
    testFunction: (incidents: number) => boolean,
    textColor: string
  ) {
    this.label = label;
    this.color = color;
    this.testFunction = testFunction;
    this.textColor = textColor;
  }

  isFor(incidents: number): boolean {
    return this.testFunction(incidents);
  }
}

export default LegendItem;
