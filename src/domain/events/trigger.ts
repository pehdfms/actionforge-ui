export abstract class Trigger {
  name: string;
  filters: { [k: string]: string[] } | undefined;
  types: string[] | undefined;

  constructor(name: string) {
    this.name = name;
  }

  toYaml(): string {
    let output = `${this.name.toLowerCase()}:\n`;

    if (this.filters) {
      for (const key in this.filters) {
        const values = this.filters[key];

        if (values.length === 0) {
          continue;
        }

        output += `  ${key}:\n`;
        for (const value of values) {
          output += `    - ${value}\n`;
        }
      }
    }

    if (this.types && this.types.length > 0) {
      output += `  types: [${this.types.join(", ")}]\n`;
    }

    return output;
  }
}
