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
      },
      {
        id: 6,
        question: "What is a node in a distributed computing system?",
        options: [
          "Only the processor",
          "A processor and its resources (memory, peripherals)",
          "Just the network connection",
          "The operating system only"
        ],
        correct: 1,
        explanation: "A node (or site or machine) consists of a processor together with its resources including local memory and peripherals."
      },
      {
        id: 7,
        question: "What technology enabled the shift from centralized to distributed computing in the 1980s?",
        options: [
          "Fiber optic cables only",
          "8-bit, then 16-, 32-, and 64-bit microprocessors",
          "Satellite communications",
          "Cloud computing"
        ],
        correct: 1,
        explanation: "The development of powerful microprocessors (8-bit, then 16-, 32-, 64-bit CPUs) with computing power of mainframes at fraction of price enabled distributed computing."
      },
      {
        id: 8,
        question: "In the workstation model, what happens when a workstation lacks processing power?",
        options: [
          "The job is cancelled",
          "Processes are transferred to idle workstations",
          "User must wait indefinitely",
          "Work is stored for later"
        ],
        correct: 1,
        explanation: "The system transfers processes from the user's workstation to idle workstations for execution, then returns results to the user's workstation."
      },
      {
        id: 9,
        question: "What is a disadvantage of the minicomputer model?",
        options: [
          "Too expensive",
          "Cannot support multiple users",
          "Does not scale well for large systems",
          "Requires specialized hardware"
        ],
        correct: 2,
        explanation: "The minicomputer model is a simple extension of centralized time-sharing but doesn't scale well compared to other distributed models."
      },
      {
        id: 10,
        question: "What is the client-server model?",
        options: [
          "All computers are equal peers",
          "Client sends request, server executes and returns result",
          "Only servers can initiate communication",
          "Clients store all data"
        ],
        correct: 1,
        explanation: "In the client-server model, a client process sends a request to a server process for service, server executes and sends back reply with results."
      },
      {
        id: 11,
        question: "What advantage do diskless workstations have in the workstation-server model?",
        options: [
          "Faster processing",
          "Easier backup and maintenance",
          "More storage capacity",
          "Better graphics"
        ],
        correct: 1,
        explanation: "Diskless workstations are easier to maintain - backup and hardware maintenance easier with few large disks than many small disks, and software installation is centralized."
      },
      {
        id: 12,
        question: "How does the hybrid model differ from workstation-server model?",
        options: [
          "Uses only diskful workstations",
          "No file servers",
          "Adds a pool of processors for computation-intensive jobs",
          "Removes all servers"
        ],
        correct: 2,
        explanation: "The hybrid model combines workstation-server with a processor pool, allowing dynamic allocation of processors for computation-intensive jobs."
      },
      {
        id: 13,
        question: "What was the original PC network architecture?",
        options: [
          "Client-server based",
          "File sharing architecture",
          "Three-tier architecture",
          "Peer-to-peer only"
        ],
        correct: 1,
        explanation: "Original PC networks used file sharing architectures where the server transfers files from shared location to desktop environment for execution."
      },
      {
        id: 14,
        question: "What limitation led to the development of three-tier architecture?",
        options: [
          "Two-tier performance degraded with over 100 users",
          "Storage was too expensive",
          "Network speeds were too slow",
          "Security concerns"
        ],
        correct: 0,
        explanation: "Two-tier client-server architecture worked well for 12-100 users on LAN, but performance degraded with more users, leading to three-tier architecture."
      },
      {
        id: 15,
        question: "What does RPC (Remote Procedure Call) provide?",
        options: [
          "Only data transfer",
          "Standardized interface for marshalling parameters between processes",
          "File storage",
          "User authentication"
        ],
        correct: 1,
        explanation: "RPC provides rules for marshalling/unmarshalling parameters, encoding/decoding information, and framework for naming and addressing between processes."
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
      },
      {
        id: 6,
        question: "What does location transparency hide?",
        options: [
          "Physical location of resources",
          "User identity",
          "Process priority",
          "Network speed"
        ],
        correct: 0,
        explanation: "Location transparency hides where a resource is physically located, so users don't need to know resource locations (e.g., yahoo.com doesn't reveal server location)."
      },
      {
        id: 7,
        question: "What is concurrency transparency?",
        options: [
          "Hiding multiple users",
          "Ensuring mutual exclusion and proper event ordering",
          "Making processes faster",
          "Reducing network traffic"
        ],
        correct: 1,
        explanation: "Concurrency transparency ensures mutual exclusion, proper event ordering, no starvation, and no deadlock when resources are shared."
      },
      {
        id: 8,
        question: "What is a fail-stop failure?",
        options: [
          "System continues with wrong results",
          "System stops and failure can be detected",
          "Network disconnects",
          "Process slows down"
        ],
        correct: 1,
        explanation: "In fail-stop failure, the system stops functioning and changes to a state where failure can be detected, unlike Byzantine failure where system produces wrong results."
      },
      {
        id: 9,
        question: "What does a microkernel provide?",
        options: [
          "All OS services",
          "Only IPC and low-level process/memory management",
          "File management only",
          "Network protocols only"
        ],
        correct: 1,
        explanation: "Microkernel provides minimal services: IPC, low-level device management, limited process management, and some memory management. Other services run as user-level servers."
      },
      {
        id: 10,
        question: "What is an advantage of stateless servers?",
        options: [
          "Better performance",
          "Easier crash recovery",
          "More features",
          "Faster execution"
        ],
        correct: 1,
        explanation: "Stateless servers have easier crash recovery because they maintain no client state - just restart and clients retry. No state to restore."
      },
      {
        id: 11,
        question: "Which performance principle helps reduce server load?",
        options: [
          "Always use servers",
          "Cache data at clients",
          "Increase copying",
          "Maximize network traffic"
        ],
        correct: 1,
        explanation: "Caching data at clients reduces server load and network traffic by making data available locally, improving overall system performance."
      },
      {
        id: 12,
        question: "What security mechanism does distributed systems need?",
        options: [
          "Only passwords",
          "Cryptography for authentication and message integrity",
          "Physical locks",
          "Network isolation"
        ],
        correct: 1,
        explanation: "Distributed systems need cryptography to: verify sender/receiver identity, ensure message integrity (not changed during transmission), and protect against interception."
      },
      {
        id: 13,
        question: "What is Byzantine failure?",
        options: [
          "System stops completely",
          "System continues but produces wrong results",
          "Network failure",
          "Power failure"
        ],
        correct: 1,
        explanation: "Byzantine failure occurs when system continues to function but produces wrong results, often caused by undetected software bugs - harder to handle than fail-stop."
      },
      {
        id: 14,
        question: "What does 'batch if possible' principle mean?",
        options: [
          "Process one at a time",
          "Group operations together for efficiency",
          "Wait for all data",
          "Store everything"
        ],
        correct: 1,
        explanation: "Batching operations improves performance - transfer data in large chunks, piggyback acknowledgments with messages, group requests together."
      },
      {
        id: 15,
        question: "Why is complete information unavailable in distributed OS?",
        options: [
          "Poor design",
          "Resources separated, no common clock, message delays",
          "Too many processes",
          "Network is too fast"
        ],
        correct: 1,
        explanation: "Distributed OS lacks complete info because: resources physically separated, no common clock, message delivery delayed/lost, making it hard to have up-to-date consistent knowledge."
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
      },
      {
        id: 6,
        question: "What does the client stub do?",
        options: [
          "Executes the procedure",
          "Packs parameters into message and unpacks results",
          "Manages the network",
          "Stores data"
        ],
        correct: 1,
        explanation: "Client stub packs parameters into a message, sends to server stub, receives result message, unpacks it, and passes to client."
      },
      {
        id: 7,
        question: "What is RPCRuntime responsible for?",
        options: [
          "Executing procedures",
          "Network transmission, retransmissions, routing",
          "Data storage",
          "User interface"
        ],
        correct: 1,
        explanation: "RPCRuntime handles transmission of messages across network, including retransmissions, acknowledgements, packet routing, and encryption."
      },
      {
        id: 8,
        question: "What is syntactic transparency in RPC?",
        options: [
          "Fast execution",
          "Remote calls have same syntax as local calls",
          "Secure communication",
          "Error handling"
        ],
        correct: 1,
        explanation: "Syntactic transparency means remote procedure calls have exactly the same syntax as local procedure calls - achievable in RPC."
      },
      {
        id: 9,
        question: "Why can't call-by-reference work well in RPC?",
        options: [
          "Too slow",
          "Disjoint address spaces - pointers meaningless across machines",
          "Not supported by compilers",
          "Security reasons"
        ],
        correct: 1,
        explanation: "Call-by-reference doesn't work because RPC uses disjoint address spaces - pointers/addresses in one machine are meaningless in another machine."
      },
      {
        id: 10,
        question: "What is an idempotent operation?",
        options: [
          "Very fast operation",
          "Operation that can be repeated safely without side effects",
          "Secure operation",
          "Complex operation"
        ],
        correct: 1,
        explanation: "Idempotent operation can be repeated multiple times with same effect as executing once - safe for retransmissions without causing problems."
      },
      {
        id: 11,
        question: "What advantage do stateful servers have?",
        options: [
          "Easier recovery",
          "Better performance with less redundant data transfer",
          "Simpler implementation",
          "No state to manage"
        ],
        correct: 1,
        explanation: "Stateful servers have better performance (less redundant data) and richer operations, but complex recovery compared to stateless servers."
      },
      {
        id: 12,
        question: "What does IDL define?",
        options: [
          "Network protocols",
          "Interface with procedure names, parameters, types",
          "Hardware specifications",
          "User interfaces"
        ],
        correct: 1,
        explanation: "IDL (Interface Definition Language) defines interface between client and server: procedure names, parameter types, input/output designation, return values."
      },
      {
        id: 13,
        question: "How much slower is RPC compared to local calls?",
        options: [
          "2-5 times",
          "10-50 times",
          "100-1000 times",
          "Same speed"
        ],
        correct: 2,
        explanation: "RPC is 100-1000 times slower than local procedure calls due to network communication overhead."
      },
      {
        id: 14,
        question: "What is the beauty of RPC implementation?",
        options: [
          "It's very fast",
          "Client/server unaware of remote nature - message passing hidden",
          "It uses less memory",
          "It's easy to debug"
        ],
        correct: 1,
        explanation: "The beauty is total ignorance on client/server part that work is remote - all message passing details hidden in stubs and runtime."
      },
      {
        id: 15,
        question: "What happens in a stateful file server when client calls Read twice?",
        options: [
          "Same data returned both times",
          "Second call returns next data (read/write pointer advanced)",
          "Error occurs",
          "Connection resets"
        ],
        correct: 1,
        explanation: "Stateful server maintains read/write pointer - first Read returns bytes 0-99, second Read returns bytes 100-199 (pointer advanced automatically)."
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
      },
      {
        id: 6,
        question: "What is the R (Request/Reply) protocol?",
        options: [
          "Client sends request, server replies, client acknowledges",
          "Client sends request, server replies - simpler protocol",
          "Three-way handshake",
          "Broadcast protocol"
        ],
        correct: 1,
        explanation: "R protocol is simpler - client sends request, server replies, no acknowledgment. Suitable for idempotent operations with less overhead than RRA."
      },
      {
        id: 7,
        question: "What does the server do when exporting interface?",
        options: [
          "Sends code to clients",
          "Registers with binder (IP, port, service name)",
          "Broadcasts to all nodes",
          "Stores data"
        ],
        correct: 1,
        explanation: "Server exports interface by registering with binder/name server, providing IP address, port, and service name for clients to locate."
      },
      {
        id: 8,
        question: "How are RPC exceptions handled in C language?",
        options: [
          "Try-catch blocks",
          "Return value (-1) and errno variable",
          "Signal handlers",
          "Automatic recovery"
        ],
        correct: 1,
        explanation: "C language uses return value (e.g., -1) to indicate failure and errno global variable for error type, as C lacks exception constructs."
      },
      {
        id: 9,
        question: "What is early reply in RPC optimization?",
        options: [
          "Server replies before execution",
          "Call split into two RPCs: send parameters (get tag), request results later",
          "Faster network",
          "Caching results"
        ],
        correct: 1,
        explanation: "Early reply splits call into two RPCs: one passes parameters (returns tag), another requests results (using tag). Client does other work between calls."
      },
      {
        id: 10,
        question: "What is call buffering?",
        options: [
          "Storing calls in memory",
          "Clients/servers interact via call buffer server for async operation",
          "Network optimization",
          "Error recovery"
        ],
        correct: 1,
        explanation: "Call buffering: clients send requests to call buffer server (not directly to server), server polls buffer for work, allows asynchronous operation."
      },
      {
        id: 11,
        question: "How much performance improvement does LRPC provide?",
        options: [
          "10% faster",
          "2x faster",
          "3x faster",
          "10x faster"
        ],
        correct: 2,
        explanation: "LRPC achieves 3x performance improvement over traditional RPC for same-machine communication through handoff scheduling and reduced overhead."
      },
      {
        id: 12,
        question: "What is a disadvantage of the binder approach?",
        options: [
          "Too complex",
          "First lookup costly, binder can be bottleneck/single point of failure",
          "Not secure",
          "Doesn't work"
        ],
        correct: 1,
        explanation: "Binder disadvantages: first lookup is costly, binder can become bottleneck/single point of failure. However, location independence benefits outweigh these."
      },
      {
        id: 13,
        question: "What does heterogeneous RPC handle?",
        options: [
          "Only data encryption",
          "Different data representations, protocols at bind time",
          "Multiple users",
          "Network routing"
        ],
        correct: 1,
        explanation: "Heterogeneous RPC handles different machine architectures: different data representations (byte order, integers), transport protocols, control protocols - decided at bind time."
      },
      {
        id: 14,
        question: "What is domain caching in LRPC?",
        options: [
          "Storing data",
          "Caching domains on idle processors to reduce wake-up latency",
          "DNS caching",
          "File caching"
        ],
        correct: 1,
        explanation: "Domain caching caches domains on idle processors so any thread needing that domain can run quickly there, reducing latency - not just most recent thread."
      },
      {
        id: 15,
        question: "Why is callback RPC needed?",
        options: [
          "Faster execution",
          "Server needs user input from client during processing",
          "Better security",
          "Data storage"
        ],
        correct: 1,
        explanation: "Callback RPC needed for interactive applications where server requires user input during processing - enables peer-to-peer paradigm between client and server."
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
      },
      {
        id: 6,
        question: "What is sequential consistency?",
        options: [
          "Fastest execution",
          "All processes see same order of all memory operations",
          "No synchronization needed",
          "Local operations only"
        ],
        correct: 1,
        explanation: "Sequential consistency: all processes see same order of all memory access operations. Provides one-copy semantics - most intuitively expected."
      },
      {
        id: 7,
        question: "What is the advantage of page-based granularity?",
        options: [
          "No false sharing",
          "Hardware MMU support, efficient",
          "Variable sizes",
          "Software managed"
        ],
        correct: 1,
        explanation: "Page-based granularity (4-8KB) uses hardware MMU support for efficiency. Disadvantage: false sharing problem when unrelated data on same page."
      },
      {
        id: 8,
        question: "What does write-update protocol do?",
        options: [
          "Invalidates copies",
          "Updates all copies immediately on write",
          "Deletes old data",
          "Creates backups"
        ],
        correct: 1,
        explanation: "Write-update updates all copies immediately on write. Advantages: readers have latest data. Disadvantages: high network traffic, complex implementation."
      },
      {
        id: 9,
        question: "Which has highest replacement priority in DSM?",
        options: [
          "Writable blocks",
          "Read-owned blocks",
          "Unused/Nil blocks",
          "Read-only blocks"
        ],
        correct: 2,
        explanation: "Unused/Nil blocks have highest replacement priority (discard first). Lowest priority: writable blocks without replicas (must transfer block and ownership)."
      },
      {
        id: 10,
        question: "What is causal consistency?",
        options: [
          "All operations in same order",
          "Only causally related operations seen in same order",
          "No consistency",
          "Fastest model"
        ],
        correct: 1,
        explanation: "Causal consistency: only operations that are potentially causally related must be seen in same (correct) order. Allows more concurrency than sequential."
      },
      {
        id: 11,
        question: "How to solve thrashing?",
        options: [
          "Add more memory",
          "Application locks, time-based nailing, usage-specific protocols",
          "Faster network",
          "More processors"
        ],
        correct: 1,
        explanation: "Thrashing solutions: application-controlled locks, nail blocks for minimum time, dynamic tuning based on access patterns, usage-specific protocols (Munin annotations)."
      },
      {
        id: 12,
        question: "What is weak consistency?",
        options: [
          "No consistency",
          "Synchronization points for consistency, ordinary variables can be inconsistent",
          "Strongest model",
          "Sequential order"
        ],
        correct: 1,
        explanation: "Weak consistency uses synchronization variables (locks). Ordinary variables can be cached/inconsistent until synchronization. All previous operations complete at sync point."
      },
      {
        id: 13,
        question: "What advantage does DSM have over message passing?",
        options: [
          "Always faster",
          "Simpler programming abstraction, shared memory paradigm",
          "Uses less memory",
          "No network needed"
        ],
        correct: 1,
        explanation: "DSM provides simpler programming abstraction - shared memory paradigm shields programmers from low-level message passing details like packing/unpacking."
      },
      {
        id: 14,
        question: "What is object-based granularity?",
        options: [
          "Fixed 4KB pages",
          "Variable size objects, more flexible",
          "Byte-level access",
          "Word-level access"
        ],
        correct: 1,
        explanation: "Object-based granularity uses variable size objects, more flexible than pages, software managed. Reduces false sharing but more complex implementation."
      },
      {
        id: 15,
        question: "Why is strict consistency impossible in distributed systems?",
        options: [
          "Too expensive",
          "No global time - cannot order 'most recent write' absolutely",
          "Network too slow",
          "Too many processes"
        ],
        correct: 1,
        explanation: "Strict consistency requires absolute global time to determine 'most recent write'. Impossible because absolute clock synchronization unachievable in distributed systems."
      }
    ]
  }
};