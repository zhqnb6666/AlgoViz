const defaultOperations = [
  {
    "operation": "add_variable",
    "data": {
      "name": "V",
      "value": 6
    },
    "metadata": "Number of vertices"
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "graph",
      "value": {
        "0": [
          1,
          2
        ],
        "1": [
          3,
          4
        ],
        "2": [
          4
        ],
        "3": [
          5
        ],
        "4": [
          5
        ],
        "5": []
      }
    },
    "metadata": "Graph adjacency list"
  },
  {
    "operation": "create_graph",
    "data": {
      "id": "graph_1",
      "directed": true
    },
    "metadata": "Create directed graph"
  },
  {
    "operation": "add_node",
    "data": {
      "graph_id": "graph_1",
      "id": "node_0",
      "value": 0,
      "attributes": {}
    },
    "metadata": "Add node 0"
  },
  {
    "operation": "add_node",
    "data": {
      "graph_id": "graph_1",
      "id": "node_1",
      "value": 1,
      "attributes": {}
    },
    "metadata": "Add node 1"
  },
  {
    "operation": "add_node",
    "data": {
      "graph_id": "graph_1",
      "id": "node_2",
      "value": 2,
      "attributes": {}
    },
    "metadata": "Add node 2"
  },
  {
    "operation": "add_node",
    "data": {
      "graph_id": "graph_1",
      "id": "node_3",
      "value": 3,
      "attributes": {}
    },
    "metadata": "Add node 3"
  },
  {
    "operation": "add_node",
    "data": {
      "graph_id": "graph_1",
      "id": "node_4",
      "value": 4,
      "attributes": {}
    },
    "metadata": "Add node 4"
  },
  {
    "operation": "add_node",
    "data": {
      "graph_id": "graph_1",
      "id": "node_5",
      "value": 5,
      "attributes": {}
    },
    "metadata": "Add node 5"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "graph",
      "value": {
        "0": [
          1,
          2
        ],
        "1": [
          3,
          4
        ],
        "2": [
          4
        ],
        "3": [
          5
        ],
        "4": [
          5
        ],
        "5": []
      }
    },
    "metadata": "Add edge from 0 to 1"
  },
  {
    "operation": "add_edge",
    "data": {
      "graph_id": "graph_1",
      "id": "edge_0_1",
      "source_id": "node_0",
      "target_id": "node_1",
      "weight": 0,
      "attributes": {}
    },
    "metadata": "Add edge from 0 to 1"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "graph",
      "value": {
        "0": [
          1,
          2
        ],
        "1": [
          3,
          4
        ],
        "2": [
          4
        ],
        "3": [
          5
        ],
        "4": [
          5
        ],
        "5": []
      }
    },
    "metadata": "Add edge from 0 to 2"
  },
  {
    "operation": "add_edge",
    "data": {
      "graph_id": "graph_1",
      "id": "edge_0_2",
      "source_id": "node_0",
      "target_id": "node_2",
      "weight": 0,
      "attributes": {}
    },
    "metadata": "Add edge from 0 to 2"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "graph",
      "value": {
        "0": [
          1,
          2
        ],
        "1": [
          3,
          4
        ],
        "2": [
          4
        ],
        "3": [
          5
        ],
        "4": [
          5
        ],
        "5": []
      }
    },
    "metadata": "Add edge from 1 to 3"
  },
  {
    "operation": "add_edge",
    "data": {
      "graph_id": "graph_1",
      "id": "edge_1_3",
      "source_id": "node_1",
      "target_id": "node_3",
      "weight": 0,
      "attributes": {}
    },
    "metadata": "Add edge from 1 to 3"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "graph",
      "value": {
        "0": [
          1,
          2
        ],
        "1": [
          3,
          4
        ],
        "2": [
          4
        ],
        "3": [
          5
        ],
        "4": [
          5
        ],
        "5": []
      }
    },
    "metadata": "Add edge from 1 to 4"
  },
  {
    "operation": "add_edge",
    "data": {
      "graph_id": "graph_1",
      "id": "edge_1_4",
      "source_id": "node_1",
      "target_id": "node_4",
      "weight": 0,
      "attributes": {}
    },
    "metadata": "Add edge from 1 to 4"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "graph",
      "value": {
        "0": [
          1,
          2
        ],
        "1": [
          3,
          4
        ],
        "2": [
          4
        ],
        "3": [
          5
        ],
        "4": [
          5
        ],
        "5": []
      }
    },
    "metadata": "Add edge from 2 to 4"
  },
  {
    "operation": "add_edge",
    "data": {
      "graph_id": "graph_1",
      "id": "edge_2_4",
      "source_id": "node_2",
      "target_id": "node_4",
      "weight": 0,
      "attributes": {}
    },
    "metadata": "Add edge from 2 to 4"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "graph",
      "value": {
        "0": [
          1,
          2
        ],
        "1": [
          3,
          4
        ],
        "2": [
          4
        ],
        "3": [
          5
        ],
        "4": [
          5
        ],
        "5": []
      }
    },
    "metadata": "Add edge from 3 to 5"
  },
  {
    "operation": "add_edge",
    "data": {
      "graph_id": "graph_1",
      "id": "edge_3_5",
      "source_id": "node_3",
      "target_id": "node_5",
      "weight": 0,
      "attributes": {}
    },
    "metadata": "Add edge from 3 to 5"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "graph",
      "value": {
        "0": [
          1,
          2
        ],
        "1": [
          3,
          4
        ],
        "2": [
          4
        ],
        "3": [
          5
        ],
        "4": [
          5
        ],
        "5": []
      }
    },
    "metadata": "Add edge from 4 to 5"
  },
  {
    "operation": "add_edge",
    "data": {
      "graph_id": "graph_1",
      "id": "edge_4_5",
      "source_id": "node_4",
      "target_id": "node_5",
      "weight": 0,
      "attributes": {}
    },
    "metadata": "Add edge from 4 to 5"
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "visited",
      "value": [
        true,
        true,
        true,
        true,
        true,
        true
      ]
    },
    "metadata": "Visited vertices list"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "visited",
      "value": [
        true,
        true,
        true,
        true,
        true,
        true
      ]
    },
    "metadata": "Mark vertex 0 as visited"
  },
  {
    "operation": "highlight_node",
    "data": {
      "graph_id": "graph_1",
      "id": "node_0"
    },
    "metadata": "Visit vertex 0"
  },
  {
    "operation": "highlight_edge",
    "data": {
      "graph_id": "graph_1",
      "id": "edge_0_1"
    },
    "metadata": "Traverse edge from 0 to 1"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "visited",
      "value": [
        true,
        true,
        true,
        true,
        true,
        true
      ]
    },
    "metadata": "Mark vertex 1 as visited"
  },
  {
    "operation": "highlight_node",
    "data": {
      "graph_id": "graph_1",
      "id": "node_1"
    },
    "metadata": "Visit vertex 1"
  },
  {
    "operation": "highlight_edge",
    "data": {
      "graph_id": "graph_1",
      "id": "edge_1_3"
    },
    "metadata": "Traverse edge from 1 to 3"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "visited",
      "value": [
        true,
        true,
        true,
        true,
        true,
        true
      ]
    },
    "metadata": "Mark vertex 3 as visited"
  },
  {
    "operation": "highlight_node",
    "data": {
      "graph_id": "graph_1",
      "id": "node_3"
    },
    "metadata": "Visit vertex 3"
  },
  {
    "operation": "highlight_edge",
    "data": {
      "graph_id": "graph_1",
      "id": "edge_3_5"
    },
    "metadata": "Traverse edge from 3 to 5"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "visited",
      "value": [
        true,
        true,
        true,
        true,
        true,
        true
      ]
    },
    "metadata": "Mark vertex 5 as visited"
  },
  {
    "operation": "highlight_node",
    "data": {
      "graph_id": "graph_1",
      "id": "node_5"
    },
    "metadata": "Visit vertex 5"
  },
  {
    "operation": "unhighlight_node",
    "data": {
      "graph_id": "graph_1",
      "id": "node_5"
    },
    "metadata": "Finished visiting vertex 5"
  },
  {
    "operation": "unhighlight_edge",
    "data": {
      "graph_id": "graph_1",
      "id": "edge_3_5"
    },
    "metadata": "Finished traversing edge from 3 to 5"
  },
  {
    "operation": "unhighlight_node",
    "data": {
      "graph_id": "graph_1",
      "id": "node_3"
    },
    "metadata": "Finished visiting vertex 3"
  },
  {
    "operation": "unhighlight_edge",
    "data": {
      "graph_id": "graph_1",
      "id": "edge_1_3"
    },
    "metadata": "Finished traversing edge from 1 to 3"
  },
  {
    "operation": "highlight_edge",
    "data": {
      "graph_id": "graph_1",
      "id": "edge_1_4"
    },
    "metadata": "Traverse edge from 1 to 4"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "visited",
      "value": [
        true,
        true,
        true,
        true,
        true,
        true
      ]
    },
    "metadata": "Mark vertex 4 as visited"
  },
  {
    "operation": "highlight_node",
    "data": {
      "graph_id": "graph_1",
      "id": "node_4"
    },
    "metadata": "Visit vertex 4"
  },
  {
    "operation": "unhighlight_node",
    "data": {
      "graph_id": "graph_1",
      "id": "node_4"
    },
    "metadata": "Finished visiting vertex 4"
  },
  {
    "operation": "unhighlight_edge",
    "data": {
      "graph_id": "graph_1",
      "id": "edge_1_4"
    },
    "metadata": "Finished traversing edge from 1 to 4"
  },
  {
    "operation": "unhighlight_node",
    "data": {
      "graph_id": "graph_1",
      "id": "node_1"
    },
    "metadata": "Finished visiting vertex 1"
  },
  {
    "operation": "unhighlight_edge",
    "data": {
      "graph_id": "graph_1",
      "id": "edge_0_1"
    },
    "metadata": "Finished traversing edge from 0 to 1"
  },
  {
    "operation": "highlight_edge",
    "data": {
      "graph_id": "graph_1",
      "id": "edge_0_2"
    },
    "metadata": "Traverse edge from 0 to 2"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "visited",
      "value": [
        true,
        true,
        true,
        true,
        true,
        true
      ]
    },
    "metadata": "Mark vertex 2 as visited"
  },
  {
    "operation": "highlight_node",
    "data": {
      "graph_id": "graph_1",
      "id": "node_2"
    },
    "metadata": "Visit vertex 2"
  },
  {
    "operation": "unhighlight_node",
    "data": {
      "graph_id": "graph_1",
      "id": "node_2"
    },
    "metadata": "Finished visiting vertex 2"
  },
  {
    "operation": "unhighlight_edge",
    "data": {
      "graph_id": "graph_1",
      "id": "edge_0_2"
    },
    "metadata": "Finished traversing edge from 0 to 2"
  },
  {
    "operation": "unhighlight_node",
    "data": {
      "graph_id": "graph_1",
      "id": "node_0"
    },
    "metadata": "Finished visiting vertex 0"
  }
];