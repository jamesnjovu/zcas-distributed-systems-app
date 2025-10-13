// Quiz data for each unit - structured questions with multiple choice answers
export const quizData = {
  1: {
    unitTitle: "Fundamentals",
    questions: [
      {
        id: 1,
        question: "What is the key difference between loosely coupled and tightly coupled systems?",
        options: [
          "Loosely coupled systems share memory, tightly coupled don't",
          "Tightly coupled systems share memory, loosely coupled communicate via messages",
          "Both share memory equally",
          "Neither shares memory or messages"
        ],
        correct: 1,
        explanation: "Tightly coupled systems have shared memory for communication, while loosely coupled systems (distributed systems) use message passing with no shared memory."
      },
      {
        id: 2,
        question: "Which model is most widely used in distributed systems?",
        options: [
          "Minicomputer Model",
          "Processor Pool Model",
          "Workstation-Server Model",
          "Hybrid Model"
        ],
        correct: 2,
        explanation: "The Workstation-Server Model is most common, using diskless workstations that access file servers over the network with client-server communication."
      },
      {
        id: 3,
        question: "What drove the evolution from mainframes to distributed systems?",
        options: [
          "Government regulations",
          "Microprocessors and high-speed networks",
          "Internet protocols only",
          "User preference"
        ],
        correct: 1,
        explanation: "Two key advances: powerful microprocessors (price/performance gains of 10^13) and high-speed networks (LANs) enabling fast data transfer."
      },
      {
        id: 4,
        question: "In the processor-pool model, how are processors allocated?",
        options: [
          "Fixed assignment per user",
          "Random assignment",
          "On-demand from central pool",
          "Geographic location based"
        ],
        correct: 2,
        explanation: "The processor-pool model allocates processors on-demand from a central pool as needed, with no home machines."
      },
      {
        id: 5,
        question: "What is a key advantage of distributed systems over parallel systems?",
        options: [
          "Faster individual processors",
          "Shared memory access",
          "Better scalability with unlimited processors",
          "Lower network latency"
        ],
        correct: 2,
        explanation: "Distributed systems can have almost unlimited processors and scale better than parallel systems which are limited by shared memory bandwidth."
      }
    ]
  },
  2: {
    unitTitle: "Design Issues",
    questions: [
      {
        id: 1,
        question: "How many types of transparency are there in distributed systems?",
        options: ["4", "6", "8", "10"],
        correct: 2,
        explanation: "There are 8 types: access, location, migration, relocation, replication, concurrency, failure, and persistence transparency."
      },
      {
        id: 2,
        question: "For k fail-stop failures, how many replicas are needed?",
        options: ["k", "k+1", "2k", "2k+1"],
        correct: 1,
        explanation: "For k fail-stop failures, k+1 replicas are needed. For Byzantine failures, 2k+1 replicas are required."
      },
      {
        id: 3,
        question: "Which kernel model is preferred for modern distributed OS?",
        options: [
          "Monolithic kernel",
          "Microkernel",
          "Hybrid kernel",
          "Exokernel"
        ],
        correct: 1,
        explanation: "Microkernel is preferred for flexibility and modularity, despite small performance cost. It provides minimal services with other services as user-level servers."
      },
      {
        id: 4,
        question: "What is a key principle for scalability?",
        options: [
          "Use centralized entities",
          "Gather global state frequently",
          "Avoid centralized entities",
          "Maximize synchronous communication"
        ],
        correct: 2,
        explanation: "Avoid centralized entities as they become bottlenecks. Use distributed algorithms and minimize system-wide knowledge for scalability."
      },
      {
        id: 5,
        question: "Which transparency type hides whether resource is in memory or disk?",
        options: [
          "Access transparency",
          "Persistence transparency",
          "Location transparency",
          "Migration transparency"
        ],
        correct: 1,
        explanation: "Persistence transparency hides whether a resource is in memory or on disk, like object-oriented databases moving objects between storage layers."
      }
    ]
  },
  3: {
    unitTitle: "Remote Procedure Calls",
    questions: [
      {
        id: 1,
        question: "What is the main purpose of RPC?",
        options: [
          "Increase network speed",
          "Hide message-passing complexity",
          "Share memory between processes",
          "Reduce code size"
        ],
        correct: 1,
        explanation: "RPC hides message-passing complexity by making remote calls look like local procedure calls, providing access transparency."
      },
      {
        id: 2,
        question: "What does marshaling involve?",
        options: [
          "Creating new processes",
          "Encoding/decoding program objects into message streams",
          "Allocating memory",
          "Scheduling threads"
        ],
        correct: 1,
        explanation: "Marshaling is encoding program objects into message streams for transmission, then decoding on the receiver to reconstruct objects."
      },
      {
        id: 3,
        question: "Which type of server is easier for crash recovery?",
        options: [
          "Stateful servers",
          "Stateless servers",
          "Both equally easy",
          "Neither supports recovery"
        ],
        correct: 1,
        explanation: "Stateless servers are easier for crash recovery as they maintain no client state between calls, eliminating need to restore state."
      },
      {
        id: 4,
        question: "What generates client and server stubs automatically?",
        options: [
          "RPC compiler",
          "IDL compiler",
          "C compiler",
          "Linker"
        ],
        correct: 1,
        explanation: "IDL (Interface Definition Language) compiler automatically generates client stubs, server stubs, and marshaling/unmarshaling code from interface definitions."
      },
      {
        id: 5,
        question: "Why is complete semantic transparency impossible in RPC?",
        options: [
          "Too expensive computationally",
          "Disjoint address spaces and network delays",
          "Compiler limitations",
          "Language incompatibility"
        ],
        correct: 1,
        explanation: "Complete semantic transparency is impossible due to disjoint address spaces (no pointers), higher failure rates, and significant latency (100-1000x slower)."
      }
    ]
  },
  4: {
    unitTitle: "RPC Advanced Topics",
    questions: [
      {
        id: 1,
        question: "Which protocol is most reliable for RPC?",
        options: ["R", "RR", "RRA", "RA"],
        correct: 2,
        explanation: "RRA (Request/Reply/Acknowledge) protocol is most reliable - client sends request, server replies, client acknowledges - ensures reliable delivery."
      },
      {
        id: 2,
        question: "What provides location independence in client-server binding?",
        options: [
          "Direct IP addresses",
          "Hardcoded ports",
          "Binder/name server",
          "DNS only"
        ],
        correct: 2,
        explanation: "Binder/name server provides location independence by allowing clients to locate servers dynamically, enabling load balancing and fault tolerance."
      },
      {
        id: 3,
        question: "What is Lightweight RPC optimized for?",
        options: [
          "Cross-network communication",
          "Same-machine (cross-domain) communication",
          "Internet protocols",
          "Wireless networks"
        ],
        correct: 1,
        explanation: "LRPC optimizes same-machine communication using handoff scheduling where client thread directly becomes server thread, providing 3x performance improvement."
      },
      {
        id: 4,
        question: "In callback RPC, what can the server do?",
        options: [
          "Only respond to client",
          "Call back to client during execution",
          "Ignore client requests",
          "Store data only"
        ],
        correct: 1,
        explanation: "Callback RPC enables peer-to-peer communication where server can call back to client during execution, useful for interactive applications."
      },
      {
        id: 5,
        question: "What technique does LRPC use for performance?",
        options: [
          "Message buffering",
          "Handoff scheduling",
          "Network caching",
          "Process migration"
        ],
        correct: 1,
        explanation: "LRPC uses handoff scheduling where client thread directly becomes server thread, eliminating expensive context switches for local communication."
      }
    ]
  },
  5: {
    unitTitle: "Distributed Shared Memory",
    questions: [
      {
        id: 1,
        question: "Which consistency model is strongest?",
        options: [
          "Sequential",
          "Causal",
          "Strict",
          "Release"
        ],
        correct: 2,
        explanation: "Strict consistency is strongest - reads always see most recent write. However, it's impossible in distributed systems due to lack of global time."
      },
      {
        id: 2,
        question: "What causes false sharing?",
        options: [
          "Network failures",
          "Unrelated variables on same page accessed by different processors",
          "Too many processors",
          "Slow networks"
        ],
        correct: 1,
        explanation: "False sharing occurs when unrelated variables on same memory block are accessed by different processors, causing unnecessary coherence traffic."
      },
      {
        id: 3,
        question: "In write-invalidate protocol, what happens on write?",
        options: [
          "All copies are updated",
          "All other copies are invalidated",
          "Nothing happens",
          "Copies are replicated"
        ],
        correct: 1,
        explanation: "Write-invalidate invalidates all other copies on write. Less network traffic for writes, but requires network access after invalidation."
      },
      {
        id: 4,
        question: "What is thrashing in DSM?",
        options: [
          "CPU overload",
          "Memory overflow",
          "Excessive block migration between nodes",
          "Network congestion"
        ],
        correct: 2,
        explanation: "Thrashing is excessive block migration between nodes (ping-pong effect). Solved by application locks, time-based nailing, or usage-specific protocols."
      },
      {
        id: 5,
        question: "Which consistency allows most concurrency?",
        options: [
          "Sequential consistency",
          "Strict consistency",
          "Release consistency",
          "Causal consistency"
        ],
        correct: 2,
        explanation: "Release consistency allows most concurrency by separating acquire/release operations and only propagating updates at release points."
      }
    ]
  }
};