import { indent } from "../../utils";

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
          console.log(values);
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

type PushEventFilters = {
  branches: string[];
  tags: string[];
  "branches-ignore": string[];
  "tags-ignore": string[];
};

export class PushEvent extends Trigger {
  filters: PushEventFilters;

  constructor(filters?: PushEventFilters) {
    super("push");
    this.filters = filters || {
      branches: [],
      tags: [],
      "branches-ignore": [],
      "tags-ignore": [],
    };
  }
}

export class Event {
  type: "On";
  triggers: Trigger[];

  constructor(triggers: Trigger[]) {
    this.type = "On";
    this.triggers = triggers;
  }

  toYaml(): string {
    let output = `on:\n`;

    for (const trigger of this.triggers) {
      output += indent(trigger.toYaml());
    }

    return output;
  }
}
