export type PushEvent = {
  name: "Push";
  filters: {
    branches: string[];
    tags: string[];
    "branches-ignore": string[];
    "tags-ignore": string[];
  };
};

export type Trigger = PushEvent;

export type Event = {
  type: "On";
  triggers: Trigger[];
};
