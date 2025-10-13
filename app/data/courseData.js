export const courseData = {
  title: "Distributed Computing",
  units: [
    {
      id: 1,
      title: "Fundamentals",
      pdfPages: "3-13",
      summary:
        "Distributed systems consist of multiple interconnected processors without shared memory, communicating via message passing. They evolved from expensive mainframes to networks of affordable microprocessors. Key models include minicomputer, workstation, workstation-server, processor pool, and hybrid architectures. The workstation-server model is most common, using client-server communication for resource access.",
      keyPoints: [
        "Loosely coupled systems have no shared memory; processors communicate via messages",
        "Distributed systems are more scalable than tightly-coupled parallel systems",
        "Evolution driven by microprocessor advancement and high-speed networks",
        "Workstation-server model: diskless workstations access file servers over network",
        "Client-server model: request-response protocol for service access",
        "Processor-pool model: processors allocated on-demand from central pool",
        "Hybrid model combines workstation-server with processor pool for flexibility",
      ],
      topics: [
        {
          title: "What is a Distributed Computing System",
          summary:
            "A distributed computing system consists of interconnected processors without shared memory, communicating via message passing. Unlike tightly-coupled parallel systems with shared memory, distributed systems use loosely-coupled architecture where each processor has local memory. Key distinction: parallel systems (tightly coupled, shared memory, limited processors) vs distributed systems (loosely coupled, message passing, unlimited processors, geographically distributed).",
        },
        {
          title: "Evolution of Distributed Computing System",
          summary:
            "Evolution driven by two key advances:\n(1) Powerful microprocessors with price/performance gains of 10^13 from mainframes to modern PCs,\n(2) High-speed networks (LANs) enabling fast data transfer.\nProgression: mainframe centralized processing → file-sharing PC networks → 2-tier client-server (GUI + database) → 3-tier architecture (presentation + middle tier + database) for scalability. Modern systems use RPC and middleware for process communication.",
        },
        {
          title: "Distributed Computing System Models",
          summary:
            "Five main models:\n(1) Minicomputer Model: Multiple minicomputers with terminals, remote resource access.\n(2) Workstation Model: Workstations connected via LAN, use idle machines for processing.\n(3) Workstation-Server Model: Diskless workstations + file/database servers, client-server protocol, most widely used.\n(4) Processor-Pool Model: No home machines, processors allocated on-demand from pool.\n(5) Hybrid Model: Combines workstation-server with processor pool for computation-intensive jobs.",
        },
      ],
      exercises: [
        {
          q: "Differentiate between time-sharing, parallel processing, network and distributed operating systems.",
          a: "1. Time-sharing systems: Multiple users share a single computer's resources by rapidly switching between processes. Uses time-slicing to allocate CPU time.\n\n2. Parallel processing systems: multiple tightly-coupled processors with shared memory to execute tasks simultaneously.\n\n3. Network operating systems: Loosely coupled systems where users are aware of different machines. Users must explicitly login to different machines and transfer files between them. Each machine runs its own local OS.\n\n4. Distributed operating systems: Loosely coupled systems where multiple processors with local memories are interconnected by a communication network. The system appears as ONE system to users. Users don't know or care which computer is doing the work. Communication occurs via message passing.",
        },
        {
          q: "In what respect are distributed computing systems better than parallel processing systems?",
          a: "Distributed computing systems offer several advantages over parallel processing systems:\n\n1) Geographic distribution: Processors can be located far from each other to cover a wider geographical area, whereas parallel systems require close physical proximity.\n\n2) Scalability: Can have an almost unlimited number of processors. Parallel systems are limited by the bandwidth of shared memory - only a small number of processors can be usefully deployed.\n\n3) Cost-effectiveness: Uses commodity hardware and standard networks. Parallel systems with specialized interconnection hardware are more expensive.\n\n4) Better fault tolerance: Failure of one node doesn't necessarily bring down the entire system due to distributed resources.\n\n5) Resource sharing: Better suited for sharing resources across organizations and geographical boundaries.\n\n6) Expandability: More freely expandable - new nodes can be added without major architectural changes.",
        },
        {
          q: "Discuss the main guiding principles that a distributed operating system designer must keep in mind for good performance of the system.",
          a: "Key guiding principles for good performance:\n\n1) Batch if possible: Transfer data in large chunks rather than small pieces.\n\n2) Cache whenever possible: Cache data close to where they're used, saving computing time and network bandwidth. Reduces contention on centralized resources.\n\n3) Minimize data copying: Avoid moving data unnecessarily because it involves substantial CPU cost.\n\n4) Reduce network traffic: Migrate processes to their data, not data to processes.\n\n5) Use parallel processing: let multiple tasks run at same time.\n\n6) Make quick decisions: Use heuristic methods over exhaustive solutions for faster scheduling and resource allocation decisions.",
        },
        {
          q: "What are the major issues of designing a Distributed OS?",
          a: "Major design issues include:\n\n1) Transparency: Hide complexity from users (location, replication, failures).\n\n2) Reliability and fault tolerance: Handle crashes and failures gracefully.\n\n3) Performance optimization: Must be as fast as single computer systems.\n\n4) Scalability: System must adapt to growth without disrupting users.\n\n5) Flexibility: Easy modification and enhancement..\n\n6) Security and authentication: protect data across network.\n\n7) Concurrency control: Event-ordering, mutual exclusion, no-starvation, and no-deadlock properties.\n\n8) Lack of global state: No complete, up-to-date knowledge of system state due to physical separation, no common clock, message delays.\n\n9) Resource management and scheduling",
        },
        {
          q: "What is the major difference between Network OS and Distributed OS?",
          a: "Network Operating System:\n- Users are aware of multiple machines in the network\n- Users must explicitly login to different machines\n- Must explicitly transfer files/data between machines\n- Each machine runs its own local operating system\n- Resources are accessed by specifying machine names\n- User manages distribution manually\n\nDistributed Operating System:\n- System appears as single unified virtual machine\n- Users unaware of multiple machines\n- Transparent resource access - location independent\n- Single system-wide operating system coordinates all nodes\n- Resources accessed without knowing physical location\n- System automatically manages distribution\n- Identical kernels run on all nodes\n- Provides illusion of single centralized system",
        },
        {
          q: "Why is scalability an important feature in the design of a distributed OS? Discuss the guiding principles for designing a scalable distributed system.",
          a: "Importance of Scalability:\n\n1) Systems always grow (more users, more computers)\n2) Must handle growth without slowing down or crashing\n3) Performance shouldn't degrade significantly with growth\n4) Should avoid service disruption during expansion\n5) Cost-effectiveness requires system to grow gracefully\n\nGuiding Principles for Scalable Design:\n\n1) Avoid centralized entities:\n- don't put everything on one server\n- Single points of failure reduce reliability\n- Limited capacity constrains growth\n- Use distributed/replicated servers instead\n\n2) Use distributed control mechanisms:\n- Avoid single points of control and failure\n- Multiple independent file servers\n- Distributed scheduling algorithms\n- No processes should depend on simultaneous functioning of all servers\n\n3) Minimize system-wide knowledge:\n- Avoid monitoring global information constantly\n- Don't require updating of all distributed structures\n- Use hierarchical organization\n- Apply callback approach for cache validation\n\n4) Use asynchronous communication:\n- Don't require synchronization across entire system\n- Allow independent operation of components\n\n5) Design for open systems:\n- Use standard protocols and interfaces\n- Support heterogeneous hardware/software\n- Allow incremental additions",
        },
      ],
    },
    {
      id: 2,
      title: "Issues in Designing a Distributed Operating System",
      pdfPages: "14-27",
      summary:
        "Designing distributed OS is complex due to lack of complete system information, message delays, and no global clock. Key design issues include transparency (8 types), reliability through fault handling, flexibility via microkernel architecture, performance optimization, and scalability through distributed control. Security requires cryptography for authentication and message integrity.",
      keyPoints: [
        "Eight types of transparency: access, location, migration, relocation, replication, concurrency, failure, persistence",
        "Concurrency transparency ensures mutual exclusion, proper event ordering, no starvation, no deadlock",
        "Fault tolerance via redundancy (k+1 replicas for k fail-stop failures, 2k+1 for k Byzantine failures)",
        "Microkernel model: small kernel + user-level servers for flexibility and modularity",
        "Stateless servers simplify crash recovery; stateful servers maintain client state",
        "Performance: batch operations, cache data, minimize copying, reduce network traffic",
        "Scalability: avoid centralized entities, use distributed algorithms, hierarchical structures",
        "Security needs: verify sender/receiver identity, ensure message integrity, use cryptography",
      ],
      topics: [
        {
          title: "Transparency Types",
          summary:
            "Eight transparency types make distributed systems appear as single systems:\n(1) Access: hides data representation differences,\n(2) Location: hides physical location,\n(3) Migration: resources can move,\n(4) Relocation: move while being accessed,\n(5) Replication: hides multiple copies,\n(6) Concurrency: hides concurrent access,\n(7) Failure: hides failures and recovery,\n(8) Persistence: hides memory vs disk storage. Concurrency transparency requires mutual exclusion, proper event ordering, no starvation, and no deadlock.",
        },
        {
          title: "Reliability and Fault Tolerance",
          summary:
            "Three approaches:\n(1) Fault Avoidance: use reliable components, thorough testing.\n(2) Fault Tolerance: redundancy techniques (k+1 replicas for k fail-stop failures, 2k+1 for k Byzantine failures), distributed control to avoid single points of failure.\n(3) Fault Detection & Recovery: atomic transactions (all-or-nothing), stateless servers (easy recovery), acknowledgments and timeouts for lost messages. Trade-off between reliability and performance overhead.",
        },
        {
          title: "Flexibility: Microkernel Architecture",
          summary:
            "Two kernel models: (1) Monolithic: most OS services in kernel, large structure, less flexible. (2) Microkernel: minimal kernel (IPC, low-level process/memory management), other services as user-level servers, highly modular, easy to modify/enhance. Microkernel advantages: easier design/implementation, modification, adding new services, multiple OS interfaces can coexist. Small performance penalty outweighed by flexibility benefits.",
        },
        {
          title: "Performance Optimization",
          summary:
            "Key principles:\n(1) Batch operations when possible (data transfer, acknowledgments),\n(2) Cache data at clients (reduces server load, network traffic),\n(3) Minimize data copying (reduce buffer operations),\n(4) Reduce network traffic (process migration, avoid global state collection),\n(5) Use fine-grain parallelism (threads for multiprocessing). Goal: distributed system performance ≥ centralized system.",
        },
        {
          title: "Scalability Design",
          summary:
            "System must handle growth without disruption. Principles:\n(1) Avoid centralized entities (single servers become bottlenecks),\n(2) Use distributed algorithms (no single controller),\n(3) Minimize system-wide knowledge (global state expensive),\n(4) Hierarchical structures,\n(5) Asynchronous communication. Scalability ensures performance doesn't degrade significantly as nodes/users increase.",
        },
        {
          title: "Security Requirements",
          summary:
            "Distributed systems need:\n(1) Sender verification: receiver knows genuine sender,\n(2) Receiver verification: sender knows intended receiver got message,\n(3) Message integrity: contents not changed during transmission. Solution: Cryptography for encryption/decryption. Principle: trust fewest entities (e.g., secure servers rather than all clients). More complex than centralized systems due to network communication and lack of global control.",
        },
      ],
      exercises: [
        {
          q: "Explain the various transparencies of a distributed system.",
          a: "1) Access Transparency: Hides data representation differences and access methods,\n2) Location Transparency: Hides physical location of resources,\n3) Migration Transparency: Resources can move without affecting access,\n4) Relocation Transparency: Resources can be relocated while being accessed,\n5) Replication Transparency: Hides multiple copies of resources,\n6) Concurrency Transparency: Hides shared resource usage,\n7) Failure Transparency: Hides failure and recovery,\n8) Persistence Transparency: Hides whether resource is in memory or disk.",
        },
        {
          q: "How are location, relocation and migration transparencies different from each other?",
          a: "Location Transparency: Users don't need to know where resources are physically located (e.g., yahoo.com doesn't reveal server location).\nMigration Transparency: Resources can move to new locations without users knowing, names remain same.\nRelocation Transparency: Resources can move WHILE being accessed without interruption (e.g., WiFi handoff between access points). Each builds on the previous - relocation is strongest as it handles movement during active use.",
        },
        {
          q: "Explain the flexibility of a Distributed System.",
          a: "Flexibility refers to ease of modification and enhancement. Key aspects:\n1) Microkernel design allows modular components,\n2) Easy to add new services without changing kernel,\n3) Multiple OS interfaces can coexist,\n4) Services implemented as user-level processes,\n5) Easier to maintain and debug,\n6) Can replace/modify components transparently. Microkernel provides minimal services (IPC, low-level process/memory management) while other services run in user space.",
        },
        {
          q: "Discuss the security aspects of a Distributed System.",
          a: "Security challenges:\n1) No single point of control for authentication,\n2) Client-server communication vulnerable to interception,\n3) Message sender/receiver identity verification needed,\n4) Protection against message tampering during transmission.\nSolutions: Cryptography for encryption/decryption, authentication protocols, access control mechanisms, secure naming, trust minimal entities, physical security of servers. More complex than centralized systems due to network communication and lack of global control.",
        },
      ],
    },
    {
      id: 3,
      title: "Remote Procedure Calls",
      pdfPages: "28-43",
      summary:
        "RPC hides message-passing complexity by making remote calls look like local procedure calls. Implementation uses client/server stubs for marshaling/unmarshaling parameters. IDL compilers auto-generate stubs from interface definitions. Key challenges: disjoint address spaces prevent call-by-reference, higher failure rates, significant latency differences. Complete transparency is impossible but syntactic transparency achievable.",
      keyPoints: [
        "RPC provides procedure call abstraction for distributed computing",
        "Client stub: packs parameters, sends message, unpacks results",
        "Server stub: unpacks parameters, calls procedure, packs results",
        "RPCRuntime handles network transmission, retransmissions, routing",
        "Marshaling: encoding/decoding program objects into message streams",
        "IDL (Interface Definition Language) auto-generates stubs from specifications",
        "Stateless servers: no client state, easier crash recovery",
        "Stateful servers: maintain client state (file pointers), better performance but complex recovery",
        "Idempotent operations: can be repeated safely without side effects",
      ],
      topics: [
        {
          title: "Introduction to RPC and Client-Server Stubs",
          summary:
            "RPC allows procedure calls across machines, hiding message passing. Process:\n(1) Client calls client stub (local call),\n(2) Client stub packs parameters, calls OS,\n(3) Client OS sends message to server OS,\n(4) Server OS gives message to server stub,\n(5) Server stub unpacks, calls actual procedure,\n(6) Server executes, returns result to stub,\n(7) Server stub packs result, calls OS,\n(8-10) Return path mirrors steps 3-1. Client and server unaware of remote interaction - transparency achieved through stubs.",
        },
        {
          title: "Transparency of RPC",
          summary:
            "Two types:\n(1) Syntactic transparency: remote calls have same syntax as local calls - achievable.\n(2) Semantic transparency: identical semantics - difficult due to: disjoint address spaces (no shared memory, pointers meaningless), higher failure vulnerability (network, machines), significant latency (100-1000x slower).\nComplete semantic transparency impossible, but sufficient transparency achievable for practical use. Some systems argue for non-transparent RPC to handle failures explicitly.",
        },
        {
          title: "Implementing RPC Mechanism",
          summary:
            "Five components:\n(1) Client: initiates call,\n(2) Client stub: packs parameters into message, unpacks results,\n(3) RPCRuntime: handles network transmission, retransmissions, routing, encryption on both sides,\n(4) Server stub: unpacks parameters, calls server, packs results,\n(5) Server: executes procedure. \nBeauty: client/server unaware of remote nature - all message passing hidden in stubs and runtime. Provides local procedure call abstraction for distributed computing.",
        },
        {
          title: "Stub Generation and IDL",
          summary:
            "Two methods:\n(1) Manual: user writes stubs using provided functions - simple, handles complex types.\n(2) Automatic: IDL (Interface Definition Language) defines interface (procedure names, parameters, types, input/output designation).\nIDL compiler generates: client stubs, server stubs, marshaling/unmarshaling code, header files.\n\nBenefits: language independence (clients/servers in different languages), compile-time type checking, automatic code generation, reduced programming burden.",
        },
        {
          title: "Marshaling Arguments and Results",
          summary:
            "Marshaling: encoding program objects into message stream for transmission. Process:\n(1) Take arguments/results,\n(2) Encode on sender (convert to byte stream), (3) Decode on receiver (reconstruct objects).\nHandles: primitive types (int, float), structured types (arrays, records), user-defined types, pointers (requires dereferencing).\nChallenge: different machine representations (byte order, floating-point). Good RPC generates inline marshaling code rather than function calls for efficiency.",
        },
        {
          title: "Server Management: Stateful vs Stateless",
          summary:
            "Stateless servers: no client state between calls, each request independent.\nAdvantages: simple crash recovery (no state to restore), client/server don't track each other.\n\nStateful servers: maintain client state (e.g., file read/write pointers, open files).\nAdvantages: better performance (less redundant data), richer operations. Disadvantages: complex recovery, must detect client/server crashes. Example: stateful file server maintains read/write pointer; stateless requires client to specify position each time.",
        },
      ],
      exercises: [
        {
          q: "What is the primary motivation for development of RPC?",
          a: "RPC was developed to:\n1) Hide message passing complexity from programmers,\n2) Provide familiar procedure call abstraction for distributed computing,\n3) Achieve access transparency - make remote calls look like local calls,\n4) Simplify distributed application development,\n5) Allow easier migration from centralized to distributed systems,\n6) Support client-server architecture elegantly.",
        },
        {
          q: "What is the main difference between RPC model and an ordinary procedure call model?",
          a: "Key differences:\n1) Address spaces: RPC uses disjoint address spaces (different machines) vs shared address space in local calls,\n2) Performance: RPC is 100-1000x slower due to network communication,\n3) Failure modes: RPC vulnerable to network and remote machine failures,\n4) Parameter passing: RPC cannot use call-by-reference with pointers effectively,\n5) Message passing: RPC involves packing/unpacking (marshaling) of parameters across network.",
        },
        {
          q: "What is a stub? How are they generated? State their functionality and purpose.",
          a: "Stub: Code that provides local procedure call interface while handling remote communication.\nClient stub: Packs parameters into message, sends to server, receives results.\nServer stub: Unpacks parameters, calls actual procedure, packs results.\n\nGeneration: Manual (user writes using provided functions) or Automatic (IDL compiler generates stubs from interface definition).\n\nPurpose: Hide message passing details, provide transparency, handle marshaling/unmarshaling, manage communication with RPCRuntime.",
        },
        {
          q: "What are the issues in developing a transparent RPC mechanism?",
          a: "Transparency challenges:\n1) Disjoint address spaces prevent call-by-reference and pointer sharing,\n2) Different failure modes (network, remote machine) require special handling,\n3) Significant latency differences need accommodation,\n4) Cannot achieve exactly same semantics as local calls,\n5) Global variable access not possible,\n6) Complex data structures with pointers difficult to pass. \n\nSolutions involve copy-in/copy-out for parameters, timeout mechanisms, and accepting some semantic differences while maintaining syntactic transparency.",
        },
      ],
    },
    {
      id: 4,
      title: "RPC Protocols and Advanced Topics",
      pdfPages: "44-53",
      summary:
        "RPC protocols include Request/Reply (R), Request/Reply/Acknowledge (RRA) for reliability. Client-server binding uses name servers for location independence. Exception handling reports failures via language exceptions or return codes. Callback RPC enables peer-to-peer communication. Lightweight RPC optimizes same-machine communication using handoff scheduling for 3x performance improvement.",
      keyPoints: [
        "RRA protocol: request → reply → acknowledge for reliable delivery",
        "R protocol: simpler, just request → reply, suitable for idempotent operations",
        "Client-server binding: clients locate servers via binder/registry programs",
        "Binding provides location independence and load balancing",
        "Exception handling: language-based (Ada, CLU) or return codes (C, Pascal)",
        "Callback RPC: server calls back to client during execution (peer-to-peer)",
        "Lightweight RPC: optimized for cross-domain (same machine) communication",
        "LRPC uses handoff scheduling: client thread becomes server thread directly",
        "Heterogeneous RPC: handles different data representations, protocols at bind time",
        "Optimizations: concurrent access via threads, early reply, call buffering",
      ],
      topics: [
        {
          title: "Communication Protocols for RPCs",
          summary:
            "Three protocols:\n(1) R (Request/Reply): Client sends request, server replies - simple, suitable for idempotent operations.\n(2) RRA (Request/Reply/Acknowledge): Client sends request, server replies, client acknowledges - reliable but more overhead. Lost acknowledgments handled by ordering message identifiers.\n(3) RR: Just request/reply without acknowledgment for faster operation with idempotent procedures.",
        },
        {
          title: "Client-Server Binding",
          summary:
            "Binding process connects clients to servers.\nServer exports interface by registering with binder/name server (IP address, port, service name).\nClient imports interface by querying binder for server location.\nAdvantages: location independence, load balancing, fault tolerance, authentication, version validation.\nDisadvantage: first lookup costly, binder can be bottleneck/single point of failure. Cached after first lookup for efficiency.",
        },
        {
          title: "Exception Handling in RPC",
          summary:
            "RPC failures reported via exceptions. Two approaches:\n(1) Language-based: Exception constructs in Ada, CLU, Modula-3 - automatic exception handlers called on error.\\n(2) Return values: Return special value (e.g., -1 in UNIX), error details in global variable (errno). Exception types: communication failures (timeout, network down), server errors (procedure not found, parameter errors), execution errors (division by zero). Drawback: return values not general enough (might be valid result).",
        },
        {
          title: "Lightweight RPC (LRPC)",
          summary:
            "LRPC optimizes same-machine (cross-domain) RPC for microkernel systems. Key techniques:\n(1) Handoff scheduling: client thread directly becomes server thread (direct context switch), no separate server thread needed.\n(2) Simple control transfer via kernel trap. (3) Domain caching on idle processors.\n(4) Reduces context switching overhead. \n\nResult: 3x performance improvement over traditional RPC. Critical for microkernel OS where components frequently communicate within same machine. Maintains safety and transparency despite optimizations.",
        },
        {
          title: "Optimizations for Performance",
          summary:
            "Three approaches for concurrent server access:\n(1) Threads: Multiple client threads make independent RPCs to different servers - requires rich addressing.\n(2) Early reply: Split into two calls - send parameters (get tag), later request results (using tag). Client does other work between calls. Drawback: server must store results.\n(3) Call buffering: Indirect communication via call buffer server - clients deposit requests, servers poll for work. Allows asynchronous operation.\nAlso: batch requests, minimize data copying, cache domains, use promises for result retrieval.",
        },
      ],
      exercises: [
        {
          q: "How is optimization of RPC done to enhance the performance?",
          a: "Optimization techniques:\n1) Lightweight RPC for same-machine communication using handoff scheduling,\n2) Simple control transfer mechanisms,\n3) Batch multiple requests together,\n4) Cache domains on idle processors,\n5) Minimize data copying (direct memory access),\n6) Use concurrent access to multiple servers via threads or early reply,\n7) Reduce context switching overhead, 8) Optimize for cross-domain vs cross-machine communication,\n9) Use efficient marshaling with inline code generation.",
        },
        {
          q: "Elaborate on Lightweight RPC.",
          a: "LRPC optimizes cross-domain (same machine) communication:\n1) Uses handoff scheduling - client thread directly becomes server thread,\n2) Avoids expensive message passing for local calls,\n3) Provides 3x performance improvement over traditional RPC,\n4) Client provides argument stack and thread to server,\n5) Kernel validates and creates call linkage,\n6) Reduces context switching by caching domains on idle processors,\n7) Eliminates unnecessary network protocol overhead,\n8) Still maintains safety and transparency. Ideal for microkernel OS where components communicate frequently within same machine.",
        },
        {
          q: "List and explain the special RPC models.",
          a: "1) Callback RPC: Server can call back to client during execution, enables peer-to-peer paradigm, useful for interactive applications needing user input.\n2) Lightweight RPC: Optimized for same-machine communication with reduced overhead.\n3) Asynchronous RPC: Client continues without waiting for reply, uses early reply or call buffering.\n4) Multicast RPC: Single call to multiple servers simultaneously.\n5) Heterogeneous RPC: Handles different data representations and protocols across different machine types.",
        },
      ],
    },
    {
      id: 5,
      title: "Distributed Shared Memory",
      pdfPages: "54-67",
      summary:
        "DSM provides shared memory abstraction on distributed systems without physical shared memory. Design choices: granularity (page vs object), structure (flat vs hierarchical), consistency models (strict, sequential, causal, release), and replacement strategies. Write-invalidate vs write-update protocols maintain coherence. Thrashing prevented via locks, time-based nailing, or usage-pattern-specific protocols.",
      keyPoints: [
        "DSM provides simpler programming than message passing",
        "Granularity: page-based (4-8KB) common, object-based more flexible",
        "Consistency models from strongest to weakest: strict > sequential > causal > release > weak",
        "Sequential consistency: all processes see same order of all operations",
        "Release consistency: updates propagate at synchronization release points",
        "Write-invalidate: invalidates other copies on write (less traffic for writes)",
        "Write-update: updates all copies on write (better for read-heavy)",
        "False sharing: unrelated variables on same page cause unnecessary invalidations",
        "Thrashing: excessive block migration between nodes, solved by locking or time-based nailing",
        "Replacement priority: unused/nil > read-only > read-owned > writable blocks",
      ],
      topics: [
        {
          title: "Consistency Models",
          summary:
            "Hierarchy of models (strict to weak):\n(1) Strict: reads always see most recent write - impossible in distributed systems (no global time).\n(2) Sequential: all processes see same order of operations - achievable, one-copy semantics.\n(3) Causal: causally related operations seen in same order - allows more concurrency. (4) Weak: synchronization points for consistency - ordinary variables can be inconsistent. (5) Release: separate acquire/release operations - updates at release, best performance. Stronger consistency = easier programming but lower performance.",
        },
        {
          title: "Granularity and Structure",
          summary:
            "Granularity:\n(1) Page-based: 4-8KB pages, hardware MMU support, false sharing problem.\n(2) Object-based: variable size objects, more flexible, software managed.\n(3) Variable: adaptive based on usage.\n\nStructure:\n(1) Flat: single linear address space, simple.\n(2) Hierarchical: tree of contexts, better scalability, supports multiple name spaces. Choice affects: implementation complexity, performance, false sharing, flexibility.",
        },
        {
          title: "Coherence Protocols",
          summary:
            "Write-Invalidate: On write, invalidate all other copies.\nAdvantages: less network traffic for writes, only owner has valid copy.\nDisadvantages: read after invalidation requires network access. Write-Update: On write, update all copies immediately.\nAdvantages: readers always have latest data, good for read-heavy workloads.\nDisadvantages: high network traffic on writes, complex implementation. Choice depends on read/write ratio and access patterns.",
        },
        {
          title: "Replacement Strategy and Thrashing",
          summary:
            "Replacement uses priority-based LRU:\n(1) Unused/Nil: highest priority (discard),\n(2) Read-only: can discard (available at owner),\n(3) Read-owned/Writable with replicas: transfer ownership only,\n(4) Writable without replicas: lowest priority (must transfer block).\nThrashing (ping-pong): block moves rapidly between nodes.\nSolutions: Application locks, nail blocks for minimum time, dynamic tuning based on access patterns, usage-specific protocols (Munin annotations), process migration to data.",
        },
      ],
      exercises: [
        {
          q: "What is false sharing? When is it likely to occur?",
          a: "False sharing occurs when two unrelated variables located on the same memory block (page) are accessed by different processors, causing unnecessary coherence traffic even though processes aren't sharing actual data. Likely when:\n1) Small block/page sizes,\n2) Arrays or structures have elements accessed by different processes,\n3) Independent variables allocated on same page. Can lead to thrashing. Solutions: Increase block size, careful data structure layout, variable annotations (like in Munin), compiler optimizations to separate frequently-written variables.",
        },
        {
          q: "Discuss relative advantages and disadvantages of NRNMB, NRMB, RMB and RNMB strategies.",
          a: "NRNMB (Non-Replication, Non-Migration): Simple, no consistency issues, but poor performance and availability.\nNRMB (Non-Replication, Migration of Blocks): Better performance for single writer, no consistency overhead, but poor for multiple readers.\nRMB (Replication with Migration): Good read performance, complex consistency management, suitable for read-mostly data.\nRNMB (Replication, Non-Migration): Excellent for read-only data, minimal overhead, but not suitable for writable data. Choice depends on access patterns - read vs write ratio, single vs multiple accessors.",
        },
        {
          q: "Differentiate between weak consistency and release consistency.",
          a: "Weak Consistency: Uses synchronization variables (locks), ordinary variables can be cached and inconsistent until synchronization, all previous operations complete at sync point, simpler model. \nRelease Consistency: Distinguishes acquire and release operations, updates only propagate at release, acquire gets updates, allows more concurrency than weak consistency, better performance as not all sync points require full synchronization. Both relax sequential consistency for performance but release consistency provides finer-grained control and better optimization opportunities.",
        },
        {
          q: "What are main causes of thrashing in DSM system? What are commonly used methods to solve it?",
          a: "Causes:\n1) Ping-pong effect - block moves back and forth between nodes,\n2) False sharing,\n3) Frequent invalidations of replicated blocks,\n4) Poor locality in references.\n\nSolutions:\n1) Application-controlled locks to prevent frequent access,\n2) Nail blocks for minimum time before allowing migration,\n3) Tune nailing time dynamically based on access patterns,\n4) Use different coherence protocols for different data types (Munin annotations),\n5) Increase block size to reduce false sharing,\n6) Process migration to bring computation to data,\n7) Delay write propagation.",
        },
      ],
    },
    {
      id: 6,
      title: "Synchronization",
      pdfPages: "68-79",
      summary:
        "Synchronization in distributed systems requires clock synchronization (no global clock exists), event ordering using Lamport's logical clocks, mutual exclusion algorithms (centralized, distributed, token ring), deadlock handling (detection requires global state), and election algorithms (Bully, Ring) to choose coordinator processes.",
      keyPoints: [
        "Clock synchronization: Cristian's algorithm (client-server), Berkeley algorithm (averaging)",
        "Lamport's logical clocks: happened-before relation, C(a) < C(b) if a → b",
        "Event ordering: timestamps + process IDs for total ordering",
        "Mutual exclusion algorithms: centralized (single coordinator), distributed (voting), token ring (circulating token)",
        "Centralized: simple, single point of failure; Distributed: no single point, high overhead",
        "Token ring: fair (no starvation), lost token problem",
        "Deadlock: four conditions - mutual exclusion, hold & wait, no preemption, circular wait",
        "Detection: wait-for graphs, need consistent global snapshots",
        "Bully algorithm: highest ID process becomes coordinator",
        "Ring algorithm: election message circulates, highest ID wins",
      ],
      topics: [
        {
          title: "Clock Synchronization",
          summary:
            "Problem: No global clock in distributed systems, clock drift causes skew. \n\nSolutions:\n(1) Cristian's Algorithm: Clients periodically sync with time server, accounts for network delay RTT/2.\n(2) Berkeley Algorithm: Coordinator polls all machines, computes average, sends adjustments (no external server). (3) NTP: Hierarchical time servers, multiple samples, statistical filtering. Synchronization precision: milliseconds to microseconds depending on network and algorithm.",
        },
        {
          title: "Logical Clocks and Event Ordering",
          summary:
            "Lamport's Logical Clocks: Assign timestamps to events based on happened-before relation (→).\n\nRules:\n(1) Each process increments counter before events,\n(2) Send: attach counter to message,\n(3) Receive: set counter to max(local, message) + 1.\nProperty: if a → b then C(a) < C(b). For total ordering: use (timestamp, process_id) pairs.\nEnables: consistent snapshots, distributed debugging, causal delivery. Doesn't capture: concurrent events (not related by →).",
        },
        {
          title: "Mutual Exclusion Algorithms",
          summary:
            "Three approaches:\n(1) Centralized: Coordinator grants permission, simple, single point of failure, fair.\n(2) Distributed: Request permission from all nodes, majority vote, no single point failure, high message overhead (3n messages), potential deadlock.\n(3) Token Ring: Token circulates, holder can enter CS, fair (no starvation), lost token problem, overhead when no one wants CS. Choice depends on: failure tolerance, network traffic, fairness requirements.",
        },
        {
          title: "Election Algorithms",
          summary:
            "Choose coordinator among processes.\n(1) Bully Algorithm: Process P sends ELECTION to higher IDs, if no response P wins, if OK received higher process takes over, highest alive wins, announces with COORDINATOR. Recovered coordinator bullies back.\n(2) Ring Algorithm: ELECTION message circulates with candidate list, each adds itself, message returns to initiator, highest ID elected, COORDINATOR message circulates. Both ensure highest priority process elected, differ in communication patterns.",
        },
      ],
      exercises: [
        {
          q: "How do clock synchronization issues differ in centralized and distributed computing systems?",
          a: "Centralized Systems: Single clock, no synchronization needed, absolute time ordering possible, simple and reliable.\nDistributed Systems: Multiple independent clocks, no global time, clock skew occurs, network delays complicate synchronization, cannot achieve absolute synchronization, must deal with clock drift rates, Byzantine failures possible, need algorithms like Cristian's or Berkeley, stricter synchronization more expensive, must handle node failures during synchronization.",
        },
        {
          q: "What is a deadlock? What are the necessary conditions which lead to deadlock?",
          a: "Deadlock: Situation where processes wait indefinitely for resources held by each other, preventing progress. Four necessary conditions (all must hold):\n1) Mutual Exclusion - resources cannot be shared,\n2) Hold and Wait - process holds resources while waiting for others,\n3) No Preemption - resources cannot be forcibly taken,\n4) Circular Wait - circular chain of processes each waiting for resource held by next. Breaking any one condition prevents deadlock. Detection involves finding cycles in resource allocation graphs.\nRecovery: kill processes, rollback with transactions, resource preemption.",
        },
        {
          q: "Explain the Bully algorithm.",
          a: "Bully Algorithm for coordinator election:\n1) Process noticing coordinator failure holds election,\n2) Sends ELECTION message to all higher-numbered processes,\n3) If no response, wins and becomes coordinator,\n4) If higher process responds with OK, that process takes over election,\n5) Highest-numbered alive process always wins (hence 'bully'),\n6) Winner announces with COORDINATOR message to all. When crashed coordinator recovers, it bullies its way back to coordinator by holding new election. Algorithm ensures highest priority process is always coordinator but can have multiple elections simultaneously.",
        },
        {
          q: "Why are election algorithms needed in a distributed system?",
          a: "Election algorithms needed because:\n1) Many distributed algorithms require single coordinator for coordination tasks,\n2) Coordinator may fail requiring new election,\n3) All processes must agree on who coordinator is,\n4) No central authority to appoint coordinator,\n5) System must automatically recover from coordinator failure,\n6) Examples: centralized mutual exclusion, deadlock detection, resource management. Algorithms must handle: concurrent elections, coordinator failure during election, network partitions, ensuring single coordinator emerges.",
        },
        {
          q: "How are false deadlocks detected by deadlock detection systems?",
          a: "False deadlocks occur when:\n1) Outdated state information used due to network delays,\n2) Resource granted but grant message delayed, appears as wait state,\n3) Process released resource but update not propagated,\n4) Inconsistent global snapshots from different times,\n5) Multiple detection sites make decisions on stale data.\nDetection: Timestamp messages and state updates, use consistent snapshots, wait for confirmation before declaring deadlock, employ delay before taking action, use centralized detection when possible, verify deadlock before recovery actions. False deadlocks waste resources by killing or rolling back processes unnecessarily.",
        },
      ],
    },
    {
      id: 7,
      title: "Resource Management - I",
      pdfPages: "80-90",
      summary:
        "Resource management includes process scheduling via task assignment, load balancing, or load sharing. Process migration relocates processes between nodes (preemptive during execution, non-preemptive before execution). Load balancing equalizes workload; load sharing just prevents idle nodes. Key policies: load estimation, transfer decisions, location selection, migration limiting. Threads provide lightweight concurrency within processes.",
      keyPoints: [
        "Good scheduling: no a priori knowledge, dynamic, quick decisions, balanced overhead",
        "Task assignment: assumes known characteristics, limited practical use",
        "Load balancing: equalizes workload across nodes, high overhead",
        "Load sharing: prevents idle nodes with work queued, lower overhead, more practical",
        "Process migration: transparent, minimal interference, minimal residual dependencies",
        "Preemptive migration: during execution, complex state transfer",
        "Non-preemptive migration: before execution, simpler",
        "Migration policies: threshold-based, periodic, sender/receiver initiated",
        "Replacement: LRU-based with priorities (unused > nil > read-only > owned)",
        "Threads: lightweight processes sharing address space, faster creation/switching",
      ],
      topics: [
        {
          title: "Scheduling Approaches",
          summary:
            "Three approaches: (1) Task Assignment: Pre-assign tasks based on known characteristics (IPC costs, execution time) - limited practical use. (2) Load Balancing: Equalize workload across all nodes, high overhead for state collection, aims for uniform load. (3) Load Sharing: Ensure no idle nodes while work queued, lower overhead, more practical. Good algorithm needs: no a priori knowledge, dynamic, quick decisions, stability (avoid thrashing), balanced overhead vs performance.",
        },
        {
          title: "Process Migration",
          summary:
            "Relocate process from source to destination node. Types: (1) Non-preemptive: before execution starts, simpler. (2) Preemptive: during execution, requires state transfer (registers, stack, open files), complex. Requirements: transparency (object access, system calls, IPC), minimal interference (short freezing time), minimal residual dependencies (no continued reliance on source), efficiency, robustness. Benefits: load distribution, access data locality, fault resilience. Costs: state transfer overhead, complexity.",
        },
        {
          title: "Migration Policies",
          summary:
            "Key policies: (1) Transfer Policy: when to migrate (threshold-based CPU queue length, memory usage; periodic checks). (2) Selection Policy: which process to migrate (newly arrived, long-running, resource requirements). (3) Location Policy: where to send (random probing, nearest neighbor, system-wide poll). (4) Information Policy: when to collect state info (demand-driven, periodic, state-change driven). Trade-off between information quality and collection overhead.",
        },
        {
          title: "Threads for Concurrency",
          summary:
            "Threads: lightweight processes within single address space. Benefits: (1) Cheaper creation/switching than processes, (2) Share memory naturally, efficient communication, (3) Combine parallelism with sequential logic, (4) Better for client-server (server threads handle multiple clients). Implementation: user-level (fast, blocked thread blocks all) vs kernel-level (slower, true parallelism, complex). Useful for: overlapping I/O, utilizing multiprocessors, structured servers.",
        },
      ],
      exercises: [
        {
          q: "What are the issues in designing Load-Balancing algorithms?",
          a: "Key issues: 1) Load estimation policy - how to measure node load (CPU queue, utilization, memory), 2) Process transfer policy - when to migrate (threshold, periodic), 3) State information exchange - how much info, how often, broadcast vs on-demand, 4) Location policy - which node to transfer to (random, nearest, probing), 5) Priority assignment - which processes to migrate, 6) Migration limiting - how many times can process migrate, 7) Stability - avoiding processor thrashing, 8) Overhead vs benefit tradeoff - cost of information gathering vs performance gain, 9) Static vs dynamic decisions.",
        },
        {
          q: "Discuss the features of a Local Scheduling algorithm.",
          a: "Local Scheduling (single node): 1) Decides which process runs on local CPU, 2) Uses local state information only, 3) Traditional algorithms: FCFS, Round Robin, Priority-based, Shortest Job First, 4) Must integrate with global scheduler, 5) Lower overhead than global decisions, 6) Handles time-sharing and multiprogramming, 7) Must distinguish local vs remote processes (in some policies), 8) May give preference to local processes, 9) Interacts with process migration decisions - don't migrate if will run soon.",
        },
        {
          q: "Load-balancing in strictest sense is not achievable in distributed systems. Justify.",
          a: "Perfect load balancing impossible because: 1) Process counts constantly fluctuate, 2) Temporal unbalance exists at every moment, 3) Cost of gathering global state information very high, especially for large systems, 4) State information becomes stale due to delays, 5) Overhead of balancing can exceed benefits, 6) Unpredictable process behavior and durations, 7) Network delays and failures, 8) Migration costs significant. Better goal: Load Sharing - ensure no idle nodes while others have excess work, not strict equality. This is necessary and sufficient for good resource utilization with much lower overhead.",
        },
      ],
    },
    {
      id: 8,
      title: "Resource Management - II",
      pdfPages: "91-97",
      summary:
        "Distributed file systems separate storage service (block management) from file service (operations) and directory service (naming). File models: unstructured vs structured, mutable vs immutable. Access models: remote access vs upload/download vs hybrid. Caching improves performance but requires consistency management. Transactions provide ACID properties for reliable updates despite failures.",
      keyPoints: [
        "Three components: storage service, file service (operations), directory service (naming)",
        "Unstructured files: byte sequences (UNIX); Structured: records with keys",
        "Mutable files: can be modified; Immutable: versions created, easier consistency",
        "Remote access model: operations sent to server, small messages",
        "Upload/download: whole file cached locally, large messages, better for repeated access",
        "UNIX semantics: all reads see all previous writes (hard in distributed)",
        "Session semantics: changes visible only after file closed (Andrew File System)",
        "Caching locations: server memory, client memory (best), client disk",
        "Write-through: immediate propagation, slower; Write-back: delayed, faster",
        "Transactions: ACID properties (Atomicity, Consistency, Isolation, Durability)",
        "Nested transactions: allow concurrency within transaction, partial rollback",
      ],
      topics: [
        {
          title: "File System Architecture",
          summary:
            "Three-layer architecture: (1) Storage Service: manages disk blocks, allocation, free space - similar to centralized systems. (2) File Service (True File Service): file operations (read, write, create, delete), access control, concurrency control, consistency - distributed-specific. (3) Directory Service (Naming): maps text names to file IDs, directory operations - distributed naming. Separation allows: different storage media, flexible file service implementations, uniform naming across heterogeneous systems.",
        },
        {
          title: "File Models and Semantics",
          summary:
            "Models: (1) Unstructured (byte stream) vs Structured (records) - unstructured more common, easier sharing. (2) Mutable (updates overwrite) vs Immutable (versions created) - immutable easier consistency, more storage. Semantics: (1) UNIX: reads see all prior writes - hard in distributed, requires synchronization. (2) Session: changes visible after close - easier (AFS). (3) Immutable: no updates after creation - consistency easy. (4) Transaction: ACID properties guarantee consistency.",
        },
        {
          title: "File Caching and Access Models",
          summary:
            "Access: (1) Remote Access: operations sent to server, data stays on server - small messages, poor locality. (2) Upload/Download: entire file cached locally - good locality, large transfer, version conflicts. (3) Hybrid: cache blocks/pages - balance. Caching: Client memory best (fast), client disk (large files), server memory (shared). Trade-offs: performance vs consistency complexity vs disk space.",
        },
        {
          title: "Transactions for Reliability",
          summary:
            "Transactions provide ACID: (1) Atomicity: all or nothing execution, (2) Consistency: valid state to valid state, (3) Isolation: concurrent transactions don't interfere, (4) Durability: committed changes persist. Implementation: write-ahead logging, two-phase commit (distributed). Nested Transactions: allow concurrency within transaction, subtransactions can fail independently, parent rolls back if needed. Critical for: banking, database updates, distributed operations requiring consistency across failures.",
        },
      ],
      exercises: [
        {
          q: "In what aspects is the design of a distributed file system different from that of a file system for a centralized time-sharing system?",
          a: "Key differences: 1) Multiple file servers vs single server, 2) Network communication introduces latency and failure modes, 3) Caching more complex with consistency across nodes, 4) Location transparency and independence needed, 5) Replication for availability/performance, 6) Concurrent access from multiple nodes requires sophisticated locking, 7) Partial failures possible, 8) Scalability concerns with many nodes, 9) Security across network, 10) Heterogeneous machines with different representations, 11) Stateless vs stateful server design decisions, 12) Network bandwidth constraints affect design choices.",
        },
        {
          q: "Discuss advantages and disadvantages of full-file caching vs block caching.",
          a: "Full-File Caching: Advantages - Simpler implementation, better locality exploitation, fewer server contacts, all-or-nothing operations. Disadvantages - Requires more space, longer initial delays, waste if only small portion needed, difficult for large files. Block Caching: Advantages - More flexible, less space required, faster initial access, better for large files, incremental transfer. Disadvantages - More complex consistency management, more server contacts, cache management overhead, false sharing issues with page-based blocks. Choice depends on: file sizes, access patterns, available memory, network speed.",
        },
        {
          q: "Why are transaction models needed in a file system? Give examples.",
          a: "Transactions provide ACID properties (Atomicity, Consistency, Isolation, Durability) essential for: 1) Bank transfers - debit and credit must both complete or neither, 2) Database updates - multiple related records must stay consistent, 3) File system metadata operations - creating file involves multiple updates, 4) Recovery from crashes - can rollback incomplete operations, 5) Concurrent access - isolation prevents interference, 6) Distributed operations - all nodes commit or abort together. Without transactions: inconsistent states after failures, lost updates from concurrent access, complex recovery procedures, application-level rollback needed.",
        },
        {
          q: "What is false sharing?",
          a: "In distributed file systems, false sharing occurs when: 1) Block/page-based caching used, 2) Multiple unrelated variables/data on same block, 3) Different clients modify different data on same block, 4) Block invalidated even though client's data unchanged, 5) Causes unnecessary cache invalidations and network traffic, 6) Degrades performance similar to DSM false sharing. Solutions: Smaller block sizes (but more overhead), byte-range locking instead of whole block, application hints about data layout, compiler/system automatically separates frequently-modified data. Trade-off between false sharing and management overhead.",
        },
      ],
    },
    {
      id: 9,
      title: "Distributed File Systems (Continued)",
      pdfPages: "97-102",
      summary:
        "File caching schemes involve decisions on cache location (server, client memory, client disk), modification propagation (write-through vs write-back), and validation (client-initiated vs server-initiated callbacks). NFS uses stateless servers with close UNIX semantics. AFS uses stateful servers with callbacks, whole-file caching, and better scalability for large systems.",
      keyPoints: [
        "Cache location: client memory best for performance, client disk for large files",
        "Write-through: propagate immediately, slower but simpler consistency",
        "Write-back on close: better performance, delayed consistency",
        "Client-initiated validation: check on access (polling), high overhead",
        "Server-initiated (callbacks): server notifies on changes, lower overhead, better scalability",
        "NFS: stateless servers, operation-level access, write-through, simpler recovery",
        "AFS: whole-file caching, callbacks for consistency, session semantics, scales to 1000s clients",
        "Fault tolerance: replication for availability, stable storage for robustness",
        "Design principles: clients have cycles to burn, cache whenever possible, exploit usage patterns",
        "Minimize system-wide knowledge, trust fewest entities, batch operations",
      ],
      topics: [
        {
          title: "File Caching Schemes",
          summary:
            "Three key decisions: (1) Cache Location: Server memory (shared), client memory (best performance), client disk (large files). (2) Modification Propagation: Write-through (immediate, slower, simpler), write-back (delayed, faster, complex), write-on-close (session semantics). (3) Cache Validation: Client-initiated (polling on access, high overhead), server-initiated (callbacks, push updates, lower overhead, scales better). Choice affects: performance, consistency guarantees, scalability, implementation complexity.",
        },
        {
          title: "NFS Architecture",
          summary:
            "Sun's Network File System: Stateless servers (no client state), operation-by-operation access (read, write, lookup), write-through caching, close to UNIX semantics, simple crash recovery (server restarts, clients retry), higher server load. Uses: V-node abstraction (local/remote transparent), RPC for communication, XDR for data representation. Advantages: simplicity, robustness. Disadvantages: poor WAN performance, higher server load, less scalable. Best for: LANs, small-medium scale.",
        },
        {
          title: "AFS Architecture",
          summary:
            "Andrew File System: Whole-file caching (entire file cached locally), callbacks (server tracks clients, notifies on changes), session semantics (changes visible after close), stateful servers, write-back on close. Vice (servers) and Venus (clients) processes. Advantages: excellent scalability (1000s clients), low server load, good WAN performance. Disadvantages: complex recovery, large file transfer initially, conflicts on simultaneous writes. Best for: large scale, wide area, read-heavy workloads.",
        },
        {
          title: "Design Principles",
          summary:
            "Satyanarayanan's principles: (1) Clients have cycles to burn - do work locally when possible, (2) Cache whenever possible - performance and scalability, (3) Exploit usage properties - optimize for common patterns (read-heavy, temporal locality), (4) Minimize system-wide knowledge - avoid global state for scalability, (5) Trust fewest entities - security through server integrity, (6) Batch operations - group for efficiency. Application: callbacks vs polling, whole-file vs block caching, negative rights in ACLs.",
        },
      ],
      exercises: [
        {
          q: "Compare and contrast NFS and AFS.",
          a: "NFS (Network File System): Stateless servers, operation-by-operation access, simpler crash recovery, higher server load, write-through caching, closer UNIX semantics, less scalable. AFS (Andrew File System): Stateful servers with callbacks, whole-file caching, better scalability (supports 1000s clients), lower server load, write-back on close, session semantics, more complex recovery, better WAN performance, uses callbacks for consistency. NFS better for: simple deployment, close UNIX semantics, LAN environments. AFS better for: large scale, WAN, reducing server load, read-heavy workloads.",
        },
      ],
    },
    {
      id: 10,
      title: "Naming",
      pdfPages: "103-111",
      summary:
        "Naming systems map human-readable names to system resources. Good systems provide location transparency and independence, scalability, and uniform conventions. Name spaces can be flat or hierarchical. Resolution maps names to addresses/objects. Caching improves performance with on-use consistency checking. Security via capabilities (unforgeable tickets) or ACLs (access control lists).",
      keyPoints: [
        "Location transparency: name doesn't reveal physical location",
        "Location independence: name unchanged when location changes (stronger property)",
        "Human-oriented names: mnemonic, variable length; System-oriented: large integers, unique IDs",
        "Flat name space: single level; Hierarchical: tree structure, better scalability",
        "Name resolution: iterative (client controls) vs recursive (servers resolve)",
        "Contexts: naming domains, provide partial name spaces",
        "Meta-context: context of contexts, enables name space federation",
        "Name caches: exploit locality, slow updates, on-use consistency checking",
        "Capabilities: unforgeable tickets with object ID + access rights",
        "ACLs: list per object specifying who can access and how",
        "Source routing names: specify path through network (UUCP style)",
      ],
      topics: [
        {
          title: "Naming Requirements and Types",
          summary:
            "Requirements: (1) Location transparency (name doesn't reveal location), (2) Location independence (name unchanged when object moves - stronger), (3) Scalability (handle growth), (4) Uniform naming (same convention for all object types). Name types: (1) Human-oriented: mnemonic, variable length, meaningful (files, users). (2) System-oriented: large integers, fixed size, unique IDs, efficient for machines. (3) Attribute-based: describe properties (color=red, size=large). Trade-offs: user-friendly vs system-efficient vs flexibility.",
        },
        {
          title: "Name Spaces and Resolution",
          summary:
            "Name Space: set of valid names with structure. Types: (1) Flat: single level, simple, doesn't scale. (2) Hierarchical: tree of contexts/domains, scalable, natural organization (DNS, file systems). Resolution: map name to address/object. Methods: (1) Iterative: client controls, contacts servers sequentially. (2) Recursive: server-to-server, less client overhead. (3) Multicast: broadcast to all, simple but high traffic. Contexts: partial name spaces, enable distributed administration, scoping.",
        },
        {
          title: "Name Caching",
          summary:
            "Cache recent name→address mappings. Benefits: (1) High locality in name lookups, (2) Names change slowly (read >> updates), (3) Reduces server load and latency. Consistency: On-use checking - stale entries detected when used, client refreshes. No proactive invalidation needed. Works because: failed lookup using stale name is safe (detected), most names stable. Implementation: TTL (time-to-live), lazy invalidation, refresh on negative reply. Critical for scalability in large systems (DNS).",
        },
        {
          title: "Naming and Security",
          summary:
            "Three approaches: (1) Names as keys: knowing name grants access - simple but guessable. (2) Capabilities: unforgeable tickets with (object_id, access_rights), possession grants access, different capabilities for different rights, secure but need protection. (3) ACLs (Access Control Lists): per-object list of (user/group, permissions), flexible, check on each access. Protection on name resolution path: each directory traversal checked. Capabilities best for: fine-grained rights, passing access. ACLs best for: management, revocation, user-centric control.",
        },
      ],
      exercises: [
        {
          q: "Differentiate between 'location transparency' and 'location independence'. Which is a more powerful feature?",
          a: "Location Transparency: Name doesn't reveal physical location, users don't need to know where resource is located (e.g., yahoo.com). Location Independence: Stronger property - name doesn't change when location changes, can access from any location, supports object migration and user mobility, requires dynamic mapping mechanism. Location independence is MORE POWERFUL as it includes transparency plus: handles dynamic relocation, supports mobile users, enables flexible resource placement, better fault tolerance through migration. Transparency is static, independence is dynamic.",
        },
        {
          q: "What is a name space? State its hierarchy.",
          a: "Name Space: Set of all valid names in a naming system with their structure and rules. Hierarchy typically: 1) Root - top level, 2) Domains/Contexts - organizational units or directories, 3) Sub-domains - nested organizational structure, 4) Objects - leaf nodes (files, processes, resources). Can be: Flat (single level, all names equal) or Hierarchical (tree structure, improves scalability, natural organization). Examples: File system (/home/user/file), DNS (www.example.com), X.500 directory. Benefits of hierarchy: Scalability, administrative control, conflict avoidance, natural mapping to organization structure.",
        },
        {
          q: "What is a meta-context? Why is it needed in a naming system?",
          a: "Meta-context: Special context that contains mappings to other contexts, acts as 'context of contexts', provides indirect naming layer. Needed for: 1) Managing large-scale name spaces, 2) Supporting multiple naming schemes simultaneously, 3) Federation of different naming systems, 4) Mapping between different name space organizations, 5) Supporting user customization and views, 6) Enabling name space evolution without breaking existing names, 7) Providing location independence at context level. Example: User's home directory context mapped through meta-context allows home directory to move between servers transparently.",
        },
        {
          q: "Explain one-use consistency control mechanism.",
          a: "On-Use Consistency (for name caches): 1) No proactive invalidation when names change, 2) Cached entries used until detected as stale, 3) When stale entry used, naming system returns negative reply, 4) Client then fetches fresh data and updates cache, 5) Works because: stale name access fails safely (maps to wrong object detected), most names stable, read >> updates. Advantages: No invalidation messages/overhead, scales well, exploits name stability, handles partitions gracefully. Disadvantages: First use after change fails, extra latency on cache miss. Suitable for names as they change infrequently and failed lookups are safe/detectable.",
        },
      ],
    },
  ],
};

// For brevity, I'll add a function to get the full data
export function getFullCourseData() {
  return courseData;
}
