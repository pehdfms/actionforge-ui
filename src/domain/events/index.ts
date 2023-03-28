import { indent } from "../../utils";
import { CreateEvent } from "./create";
import { ForkEvent } from "./fork";
import { PushEvent } from "./push";
import { Trigger } from "./trigger";

export class EventNode {
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

export class EventTriggers {
  triggers: Trigger[];

  constructor(triggers: Trigger[]) {
    this.triggers = triggers;
  }

  toYaml(): string {
    // TODO we can reduce yaml output here in two ways:
    // one trigger with no filters / types can be reduced to on: trigger
    // multiple triggers with no filters / types can be reduced to on: [trigger1, trigger2, ...]
    let output = `on:\n`;

    for (const trigger of this.triggers) {
      output += indent(trigger.toYaml());
    }

    return output + "\n";
  }
}

export const validTriggers = {
  create: CreateEvent,
  fork: ForkEvent,
  push: PushEvent,
};
