import { useCallback, useMemo, useState } from "react";
import ReactFlow, {
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Panel,
} from "reactflow";

import "reactflow/dist/style.css";
import { Card } from "./Card";
import { GraphName } from "./GraphName";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" }, type: "card" },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" }, type: "card" },
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

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
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      proOptions={{ hideAttribution: true }}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      className="graph"
    >
      <Panel position="top-left">
        <GraphName name={name} onNameChange={setName} />
      </Panel>
      <Controls />
    </ReactFlow>
  );
}
