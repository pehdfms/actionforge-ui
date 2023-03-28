import { Trigger } from "./trigger";

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
