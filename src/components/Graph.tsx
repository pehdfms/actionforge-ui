import { useCallback, useMemo, useState } from "react";
import ReactFlow, {
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Panel,
  ReactFlowProvider,
} from "reactflow";

import "reactflow/dist/style.css";
import { GraphNode } from "../domain";
import { EventNode } from "../domain/events";
import { PushEvent } from "../domain/events/push";
import { Card } from "./cards";
import { GraphName } from "./GraphName";
import { YamlPreview } from "./YamlPreview";

const initialNodes: GraphNode[] = [
  {
    id: "0",
    position: { x: 0, y: 0 },
    data: { type: "Workflow" },
    type: "card",
  },
  {
    id: "1",
    position: { x: 750, y: 0 },
    data: new EventNode([
      new PushEvent({
        "branches-ignore": ["release"],
        "tags-ignore": [],
        branches: ["main", "develop"],
        tags: [],
      }),
    ]),
    type: "card",
  },
  {
    id: "2",
    position: { x: 1500, y: 500 },
    data: { type: "Jobs" },
    type: "card",
  },
];

const initialEdges = [
  { id: "e0-1", source: "0", target: "1" },
  { id: "e1-2", source: "1", target: "2" },
];

export function Graph() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [name, setName] = useState("name");

  const nodeTypes = useMemo(
    () => ({
      card: Card,
    }),
    []
  );

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // TODO make separate GraphControls component
  // TODO move yaml preview outside the graph
  return (
    <div className="graph-container">
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          proOptions={{ hideAttribution: true }}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          className="graph"
          fitView
        >
          <Panel position="top-left">
            <GraphName name={name} onNameChange={setName} />
          </Panel>
          <Controls />
          <div style={{ color: "red", width: "100px", height: "100px" }}></div>
        </ReactFlow>
        <YamlPreview nodes={nodes} edges={edges} />
      </ReactFlowProvider>
    </div>
  );
}
