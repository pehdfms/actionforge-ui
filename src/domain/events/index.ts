type PushEventFilters = {
  branches: string[];
  tags: string[];
  "branches-ignore": string[];
  "tags-ignore": string[];
};

export class PushEvent {
  name: "Push";
  filters: PushEventFilters;

  constructor(filters?: PushEventFilters) {
    this.name = "Push";
    this.filters = filters || {
      branches: [],
      tags: [],
      "branches-ignore": [],
      "tags-ignore": [],
    };
  }
}

export type Trigger = PushEvent;

export class Event {
  type: "On";
  triggers: Trigger[];

  constructor(triggers: Trigger[]) {
    this.type = "On";
    this.triggers = triggers;
  }
}
