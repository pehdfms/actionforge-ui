import { useEffect, useMemo } from "react";
import { NodeProps } from "reactflow";
import { GraphNodeProps } from "../../domain";
import { EventNode } from "../../domain/events";
import { JobNode } from "../../domain/jobs";
import { assertUnreachable } from "../../utils";
import { EventCard } from "./EventCard";
import { JobCard } from "./JobCard";
import { WorkflowCard } from "./WorkflowCard";

function getInternalCard(id: string, data: GraphNodeProps) {
  switch (data.type) {
    case "On":
      return () => EventCard(id, data as EventNode);
    case "Jobs":
      return () => JobCard(id, data as JobNode);
    case "Workflow":
      return () => WorkflowCard();
    default:
      assertUnreachable(data);
  }
}

export function Card({ id, data }: NodeProps<GraphNodeProps>) {
  const InternalCard = useMemo(() => getInternalCard(id, data), [id, data]);

  // TODO make selected edge highlight handles as well (might require DOM trickery)
  // FIXME get rid of small line below card header
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{data.type}</h3>
      </div>

      <InternalCard />
    </div>
  );
}
