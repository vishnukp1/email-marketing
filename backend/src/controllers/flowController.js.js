const Flow = require("../models/flowSchema");

// Create a new flow
exports.createFlow = async (req, res) => {
  const { userId, title, nodes, edges } = req.body;


  // Create new flow
  const flow = new Flow({
    userId,
    title,
    nodes:nodes,
    edges:edges,
  });
 

  await flow.save();
  console.log("hiiii");
  res.status(201).json({
    status: 200,
    message: "Flow created successfully",
    data: flow
  });
};

exports.createOrUpdateFlow = async (req, res) => {
  const { userId, title, nodes, edges } = req.body;

  let flow = await Flow.findOne({ userId, title });

  if (!flow) {
    flow = new Flow({
      userId,
      title,
      nodes: nodes,
      edges: edges,
    });
  } else {
    // If an existing flow is found, update its nodes by pushing the new nodes into the array
    flow.nodes.push(...nodes);
  }

  await flow.save();
  res.status(200).json({
    status: 200,
    message: "Flow created or updated successfully",
    data: flow
  });
};

// Get all flows for a user
exports.getFlows = async (req, res) => {
  const  userId  = req.params.id;

  const flows = await Flow.find({ userId });

  res.status(200).json({
    status: 200,
    message: "Flows retrieved successfully",
    data: flows
  });
};

// Delete a flow
exports.deleteFlow = async (req, res) => {
  const flowId = req.params.id;

  await Flow.findByIdAndDelete(flowId);
  res.status(200).json({
    status: 200,
    message: "Flow deleted successfully",
    data: null
  });
};

exports.deleteNodeById = async (req, res) => {
  const { userId, nodeId } = req.params;

  const flows = await Flow.find({ userId });
 

  if (!flows || flows.length === 0) {
    return res.status(404).json({
      status: 404,
      message: "Flow not found",
      data: null
    });
  }
  

  for (let flow of flows) {
    const nodeIndex = flow.nodes.findIndex((node) => node.id === nodeId);

    if (nodeIndex !== -1) {
      flow.nodes.splice(nodeIndex, 1);

      await flow.save();

      return res.status(200).json({
        status: 200,
        message: "Node deleted successfully",
        data: null
      });
    }
  }

  return res.status(404).json({
    status: 404,
    message: "Node not found in any flow",
    data: null
  });
};

exports.patchNodeLabel = async (req, res) => {
  const { userId, nodeId } = req.params;
  const { label } = req.body;

  if (!label) {
    return res.status(400).json({
      status: 400,
      message: "Missing label in request body",
      data: null
    });
  }

  const flows = await Flow.find({ userId });

  if (!flows || flows.length === 0) {
    return res.status(404).json({
      status: 404,
      message: "Flows not found",
      data: null
    });
  }

  let nodeUpdated = false;
  let saveOperations = [];

  for (let flow of flows) {
    const node = flow.nodes.find((node) => node.id === nodeId);

    if (node) {
      node.data.label = label;

      try {
        console.log(`Saving flow with updated node: ${flow._id}`);
        await flow.save();
        saveOperations.push(flow);
        nodeUpdated = true;

        break;
      } catch (error) {
        console.error(`Error saving flow ${flow._id}:`, error);
      }
    }
  }

  if (!nodeUpdated) {
    return res.status(404).json({
      status: 404,
      message: "Node not found in any flow",
      data: null
    });
  }

  res.status(200).json({
    status: 200,
    message: "Node label updated successfully",
  });
};
