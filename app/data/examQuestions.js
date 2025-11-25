export const examQuestions = [
  {
    id: 1,
    unit: "DSM",
    title: "Question One [25 Marks]",
    // Questions with sub-parts
    subQuestions: [
      {
        id: "i",
        question:
          "The distributed shared memory abstraction is implemented by using the services of the underlying message passing communication system. In principle, the performance of applications that use DSM is expected to be worse than if they use message passing directly.\n\na) Explain why some distributed operating system designers support the DSM abstraction in their systems. [5 Marks]\n\nb) Are there any applications that can have better performance in a system with DSM facility than in a system that has only message passing facility? If yes, give the types of such applications. If no, explain why. [5 Marks]",
        points: ["DSM abstraction benefits", "Performance considerations"],
        answer:
          "i(a) Why designers support DSM [5 Marks]\nDesigners support DSM even though it runs on top of message passing because:\n1. **Simpler programming** – DSM hides send/receive complexity; programmers use memory reads/writes instead of message handling. (PDF: Simpler Abstraction)\n2. **Easier to write distributed programs** – Works like normal shared memory, so coding is easier and less error-prone.\n3. **Better portability** – Shared-memory programs can run on DSM systems without modification. (PDF: Better Portability)\n4. **Supports complex data** – No need to pack/unpack structures as in message passing.\n5. **Flexible communication** – Sender and receiver do not need to run at the same time. (PDF: Flexible Communication Environment)\n\n---\n\ni(b) Can DSM applications perform better than message passing? [5 Marks]\n**Yes.** DSM can sometimes perform *better* because:\n1. **Locality of data** – DSM moves data in large blocks, so one fetch can satisfy many accesses. This reduces communication overhead. (PDF: Locality)\n2. **On-demand data movement** – DSM removes large data-exchange phases in iterative applications. Communication is spread out, improving concurrency. (PDF: On-demand movement)\n3. **Larger combined memory** – DSM uses memory from all nodes, reducing paging/swapping. (PDF: Larger memory space)\n\nApplications that benefit:\n• Iterative scientific algorithms\n• Programs with good locality\n• Programs with large working sets",
      },
      {
        id: "ii",
        question:
          "Discuss the relative advantages and disadvantages of using large block size and small block size in the design of a block-based DSM system. [5 Marks]",
        points: [
          "Block size trade-offs",
          "False sharing",
          "Communication overhead",
        ],
        answer:
          "ii. Large vs Small Block Size in DSM [5 Marks]\n**Large Block Size – Advantages:**\n1. Fewer network transfers (large block = more data per fetch).\n2. Lower overhead in page table management.\n3. Good for sequential/local access.\n\n**Large Block Size – Disadvantages:**\n1. **False sharing** – Unrelated variables in the same block cause unnecessary block movement. (PDF mentions false sharing/contending blocks indirectly under thrashing.)\n2. Wasted bandwidth – Move data not needed.\n3. Longer transfer times.\n\n**Small Block Size – Advantages:**\n1. Less false sharing.\n2. Only needed data is moved.\n3. Better for random access.\n\n**Small Block Size – Disadvantages:**\n1. More network overhead (many small transfers).\n2. More page faults & higher management cost.\n3. Less ability to exploit locality.",
      },
      {
        id: "iii",
        question:
          "Explain why most DSM system designers prefer to use the typical page size used in a conventional virtual memory implementation as the block size of the DSM system. [5 Marks]",
        points: [
          "Page size rationale",
          "Hardware MMU leverage",
          "Implementation simplicity",
        ],
        answer:
          "iii. Why DSM uses the normal VM page size [5 Marks]\nMost DSM systems choose the machine's **virtual memory page size** because:\n1. **Reuses existing hardware** – Page faults and MMU mechanisms help detect remote access cheaply.\n2. **Simple implementation** – Integrates naturally with the OS paging system.\n3. **Reasonable balance** – Page sizes (4KB–8KB) balance false sharing and communication overhead.\n4. **Portability** – All machines already support paging.\n(PDF section: Block size algorithms discuss choosing VM page sizes)",
      },
      {
        id: "iv",
        question:
          "It is often said that the structure of the shared memory space and the granularity of data sharing in a DSM system are closely related. Explain why. [5 Marks]",
        points: [
          "Memory structure and granularity relationship",
          "Data layout impact",
          "Performance optimization",
        ],
        answer:
          "iv. Relationship between memory structure & sharing granularity [5 Marks]\nStructure and granularity are closely related because:\n1. **Structure defines natural grouping** – Arrays, objects, or pages determine how data sits in memory.\n2. **Granularity must match structure** – If blocks are too big, unrelated variables get grouped (false sharing). If too small, overhead increases.\n3. **Access patterns matter** – Sequential structures benefit from larger blocks; scattered structures need smaller blocks.\n4. **Mismatch causes performance issues** – Poor locality or frequent block movement.\n(PDF: Exercises mention this explicitly.)",
      },
    ],
  },
  {
    id: 2,
    unit: "RPC",
    title: "Question Two [25 Marks]",
    subQuestions: [
      {
        id: "i",
        question: "Elaborate the operation of Lightweight RPC. [10 Marks]",
        points: [
          "Handoff scheduling",
          "Domain caching",
          "Kernel-mediated transfer",
          "Performance benefits",
        ],
        answer:
          "Lightweight RPC (LRPC):\n\nLRPC is designed for calls between processes on the same machine but in different protection domains. Instead of sending full network messages, LRPC lets the client's thread enter the server's domain directly. This avoids copying data, reduces context switches, and removes most communication overhead.\n\nKey Mechanisms:\n\n1. **Handoff Scheduling**\n   - The client thread becomes the server thread\n   - No context switch between different threads\n   - Direct execution transfer\n   - Client's priority and scheduling continue on server side\n\n2. **Domain Caching**\n   - Server domains are kept ready so calls start quickly\n   - Pre-allocated execution contexts\n   - Reduces setup overhead for each call\n   - Maintains frequently-used domain state\n\n3. **Simple Kernel-Mediated Transfer**\n   - Only a small trap into the kernel is required\n   - Minimal kernel involvement\n   - Direct memory access where possible\n   - Secure domain crossing without full message passing\n\n4. **Shared Memory**\n   - Arguments passed via shared memory regions\n   - No data copying between domains\n   - Direct access to parameters\n   - Much faster than network protocols\n\nPerformance Benefits:\n- LRPC is much faster than normal RPC (up to 3x faster)\n- Eliminates network protocol overhead\n- Reduces context switching\n- Minimizes data copying\n- Suitable for local inter-process communication",
      },
      {
        id: "ii",
        question: "List and explain the special RPC models. [5 Marks]",
        points: [
          "Callback RPC",
          "Asynchronous RPC",
          "Multicast RPC",
          "Lightweight RPC",
        ],
        answer:
          "Special RPC Models:\n\n1. **Callback RPC**\n   - The server can call the client back when needed\n   - Bidirectional communication\n   - Useful when the server needs more information from client\n   - Example: Server requests additional authentication data\n\n2. **Asynchronous RPC**\n   - The client sends a request and continues working\n   - Non-blocking operation\n   - Client collects the result later\n   - Improves performance through parallelism\n   - Example: Fire-and-forget operations\n\n3. **Multicast RPC**\n   - One request is sent to many servers simultaneously\n   - Parallel execution on multiple nodes\n   - Useful for distributed queries or updates\n   - Example: Broadcasting configuration changes\n\n4. **Lightweight RPC**\n   - Optimized for local communication (same machine)\n   - Bypasses network protocol stack\n   - Uses shared memory and domain switching\n   - Much faster than standard RPC\n\nThese models support different communication patterns in distributed systems and provide flexibility for various application requirements.",
      },
      {
        id: "iii",
        question:
          "The caller process of an RPC must wait for a reply from the callee process after making a call. With the use of clear examples, explain how this process is achieved. [5 Marks]",
        points: [
          "Request-Reply pattern",
          "Blocking mechanism",
          "Timeout handling",
          "Message flow",
        ],
        answer:
          "How the Caller Waits for a Reply:\n\nThe RPC model uses a **Request–Reply pattern** with blocking semantics.\n\n**Step-by-Step Process:**\n\n1. **Client calls a remote function**\n   Example: result = add(5, 3)\n\n2. **Client stub packages arguments**\n   - Marshals parameters (5, 3) into a message\n   - Adds request ID and metadata\n\n3. **Client process blocks (sleeps)**\n   - Thread/process enters WAIT state\n   - Operating system deschedules the client\n   - Client cannot continue until reply arrives\n\n4. **Request sent to server**\n   - Message transmitted over network\n   - Contains procedure identifier and arguments\n\n5. **Server receives the request**\n   - Server stub unmarshals arguments\n   - Calls actual procedure: add(5, 3)\n   - Computes result: 8\n\n6. **Server sends reply**\n   - Marshals return value (8)\n   - Sends reply message back to client\n\n7. **Client runtime receives the reply**\n   - Operating system delivers reply to client\n   - Wakes the client process (changes from WAIT to READY)\n   - Client stub unmarshals result\n\n8. **Client returns the result**\n   - Function returns: result = 8\n   - Client continues execution\n\n**Reliability Mechanisms:**\n- **Timeouts**: If no reply within timeout period, client may retry or report error\n- **Retransmissions**: Lost requests or replies are retransmitted\n- **Acknowledgments**: May use ACKs to confirm delivery\n\n**Example Timeline:**\n```\nTime  Client                    Server\n0ms   call add(5,3)\n1ms   block/wait               \n10ms                            receive request\n11ms                            execute add(5,3)\n12ms                            send reply(8)\n22ms  receive reply(8)\n23ms  unblock, return 8\n```",
      },
      {
        id: "iv",
        question:
          "Discuss how optimization of RPC is done to enhance the performance. [5 Marks]",
        points: [
          "Lightweight RPC",
          "Reduced copying",
          "Asynchronous calls",
          "Batching",
          "Caching",
        ],
        answer:
          "RPC Optimization Techniques:\n\n1. **Lightweight RPC for Local Calls**\n   - Use LRPC when client and server are on same machine\n   - Avoid network protocols entirely\n   - Direct domain switching\n   - 3x faster than standard RPC\n\n2. **Reducing Data Copying**\n   - Pass arguments directly in shared memory\n   - Zero-copy techniques\n   - Avoid multiple buffer copies\n   - Use direct memory access (DMA) where possible\n\n3. **Asynchronous Calls**\n   - Use non-blocking RPC to overlap work\n   - Client continues while server processes\n   - Batch multiple async calls\n   - Collect results later when needed\n\n4. **Batching Multiple RPC Calls**\n   - Group several RPC calls into one message\n   - Reduces network round trips\n   - Amortizes connection setup overhead\n   - Example: Batch 10 small requests into 1 message\n\n5. **Domain Caching**\n   - Avoid repeated setup of server domains\n   - Keep execution contexts ready\n   - Pre-allocate resources\n   - Faster subsequent calls\n\n6. **Connection Caching**\n   - Reuse TCP connections\n   - Avoid connection setup/teardown overhead\n   - Keep connections alive\n   - Connection pooling\n\n7. **Stub Optimization**\n   - Generate efficient marshaling code\n   - Inline small functions\n   - Use compiler optimizations\n   - Minimize type conversions\n\n8. **Selective Parameter Marshaling**\n   - Only marshal changed parameters\n   - Use delta encoding for updates\n   - Skip unnecessary fields\n\n9. **Result Caching**\n   - Cache frequently requested results\n   - Check cache before making RPC\n   - Invalidate on updates\n\nThese methods reduce communication cost, minimize latency, and improve overall RPC performance significantly.",
      },
    ],
  },
  {
    id: 3,
    unit: "RPC",
    title: "Question Three [35 Marks]",
    subQuestions: [
      {
        id: "i",
        question:
          "What was the primary motivation for development of RPC? [5 Marks]",
        points: [
          "Transparency",
          "Simplification",
          "Message passing complexity",
        ],
        answer:
          "Primary Motivation for RPC:\n\nRPC was developed to **hide the complexity of message passing** and make distributed programming easier.\n\n**Key Motivations:**\n\n1. **Simplify Distributed Programming**\n   - Programmers familiar with procedure calls\n   - No need to learn message passing primitives\n   - Natural programming model\n\n2. **Hide Communication Details**\n   - Instead of manually sending and receiving messages\n   - No need to handle sockets, protocols, buffers\n   - Communication happens automatically\n\n3. **Provide Transparency**\n   - RPC lets programmers call remote functions as if they were local\n   - Same syntax and semantics\n   - Location independence\n\n4. **Reduce Errors**\n   - Message passing is error-prone (matching send/receive, handling buffers)\n   - RPC handles communication automatically\n   - Type-safe parameter passing\n\n5. **Improve Productivity**\n   - Faster development of distributed applications\n   - Code looks like local programs\n   - Easier to understand and maintain\n\nThis makes distributed programming **much easier and more natural**, allowing developers to focus on application logic rather than communication protocols.",
      },
      {
        id: "ii",
        question:
          "Explain the main difference between RPC model and an ordinary procedure call model. [5 Marks]",
        points: [
          "Address space",
          "Performance",
          "Parameter passing",
          "Failure modes",
          "Network communication",
        ],
        answer:
          "Main Differences Between RPC and Local Procedure Calls:\n\n1. **Address Space**\n   - **Local calls**: Run in the same address space; can access shared memory\n   - **RPC**: Runs across machines with disjoint address spaces; no shared memory\n\n2. **Performance**\n   - **Local calls**: Very fast (nanoseconds); direct function call\n   - **RPC**: Much slower (milliseconds); uses the network, 100-1000x slower\n\n3. **Parameter Passing**\n   - **Local calls**: Can pass by value or by reference; pointers work\n   - **RPC**: Primarily call-by-value; pointers cannot be passed directly (no shared memory)\n\n4. **Failure Modes**\n   - **Local calls**: Only local process/machine crashes\n   - **RPC**: Network failures, server crashes, timeouts, message loss - many more failure scenarios\n\n5. **Data Marshaling**\n   - **Local calls**: No marshaling needed; direct parameter passing\n   - **RPC**: Needs parameter packing (marshalling) into messages; data format conversion\n\n6. **Execution**\n   - **Local calls**: Direct function jump; same CPU\n   - **RPC**: Network communication; different machines; stubs involved\n\n7. **Reliability**\n   - **Local calls**: Deterministic; always succeeds if code is correct\n   - **RPC**: May fail due to network issues; requires timeout and retry mechanisms\n\nSummary: RPC **tries to make remote calls look like local calls**, but fundamental differences in address spaces, performance, and failure modes mean perfect transparency cannot be achieved.",
      },
      {
        id: "iii",
        question:
          "Use a well labeled diagram to discuss the request/reply/acknowledge reply (RRA) protocol model as used in RPC. [15 Marks]",
        points: [
          "RRA protocol flow",
          "Message sequence",
          "Reliability",
          "Timeout handling",
        ],
        image: "/zcas-distributed-systems-app/rra.jpg",
        answer:
          "Request–Reply–Acknowledge (RRA) Protocol:\n\nThe RRA protocol ensures **reliable communication** in RPC by using three message phases.\n\n**Protocol Flow:**\n\n1. **Client sends REQUEST to server**\n   - Contains procedure identifier\n   - Marshaled parameters\n   - Request ID for matching\n   - Client timestamp\n\n2. **Server executes and sends REPLY**\n   - Server receives request\n   - Unmarshals parameters\n   - Executes procedure\n   - Marshals return value\n   - Sends reply with same request ID\n\n3. **Client sends ACKNOWLEDGMENT**\n   - Client receives reply\n   - Sends ACK confirming the reply arrived\n   - Server can now safely discard reply\n**Detailed Message Sequence:**\n\n```\nTime   Event                          Message Content\n----   -----                          ---------------\nt0     Client calls add(5,3)          \nt1     Client stub marshals           \nt2     Send REQUEST                   [ID:100, Proc:add, Args:5,3]\nt3     Client blocks & waits          \n       ...\nt10    Server receives REQUEST     [ID:100, Proc:add, Args:5,3]\nt11    Server unmarshals              \nt12    Server executes add(5,3)=8     \nt13    Server marshals result         \nt14    Send REPLY                     [ID:100, Result:8]\n       ...\nt20    Client receives REPLY       [ID:100, Result:8]\nt21    Client unmarshals              \nt22    Send ACK                       [ID:100]\nt23    Client returns result          \n       ...\nt28    Server receives ACK         [ID:100]\nt29    Server discards reply buffer   \n```\n\n**Why Three Messages (RRA)?**\n\n1. **REQUEST ensures server knows client wants service**\n   - Initiates the RPC\n   - Carries parameters\n\n2. **REPLY provides the result**\n   - Returns computation result\n   - Server must keep reply until ACK received\n\n3. **ACK confirms client received reply**\n   - Allows server to free resources\n   - Server knows it doesn't need to retransmit\n   - Without ACK, server must keep reply indefinitely\n\n**Reliability Mechanisms:**\n\n1. **Timeout on REQUEST**\n   - If no REPLY within timeout → client retransmits REQUEST\n   - Handles lost REQUEST or lost REPLY\n\n2. **Timeout on REPLY**\n   - If no ACK within timeout → server retransmits REPLY\n   - Handles lost ACK\n\n3. **Duplicate Detection**\n   - Use request ID to detect duplicate requests\n   - Server can return cached reply if request repeated\n\n4. **Lost Messages Handled**\n   - Lost REQUEST: Client timeout → retransmit\n   - Lost REPLY: Client timeout → retransmit REQUEST → server resends REPLY\n   - Lost ACK: Server timeout → retransmit REPLY → client resends ACK\n\n**Comparison with Request-Reply (RR) Protocol:**\n\n**RR (2 messages):**\n```\nCLIENT  →  REQUEST  →  SERVER\nCLIENT  ←  REPLY    ←  SERVER\n```\n- Simpler but server doesn't know if client received reply\n- Server must keep reply for long time\n- Inefficient resource usage\n\n**RRA (3 messages):**\n```\nCLIENT  →  REQUEST  →  SERVER\nCLIENT  ←  REPLY    ←  SERVER\nCLIENT  →  ACK      →  SERVER\n```\n- More messages but more efficient\n- Server knows reply received\n- Can free resources immediately\n\n**Advantages of RRA:**\n✓ Server can discard reply after ACK\n✓ Better resource management\n✓ Clear end of transaction\n✓ Reliable delivery confirmation\n\n**Disadvantages of RRA:**\n✗ Extra network message (ACK)\n✗ More complex protocol\n✗ Slightly higher latency",
      },
      {
        id: "iv",
        question:
          "What are the issues in developing a transparent RPC mechanism? [5 Marks]",
        points: [
          "Address space differences",
          "Network failures",
          "Data representation",
          "Performance",
          "Semantic differences",
        ],
        answer:
          "Issues in Achieving Transparent RPC:\n\n1. **Different Address Spaces**\n   - Pointers don't make sense remotely\n   - Cannot pass memory addresses between machines\n   - Solutions: Copy-in/copy-out, serialize pointed data\n   - Makes call-by-reference impossible\n\n2. **Network Failures**\n   - Network can fail, causing delays or lost calls\n   - Impossible to distinguish: server crashed, network failed, or just slow?\n   - Local calls don't have these failure modes\n   - Must handle timeouts and retries\n\n3. **Data Representation Differences**\n   - Different byte orders (endianness): big-endian vs little-endian\n   - Different data formats: integer sizes, floating-point formats\n   - Different character encodings: ASCII, Unicode, UTF-8\n   - Requires data conversion (marshaling)\n\n4. **Performance Differences**\n   - RPC is 100-1000x slower than local calls\n   - Makes it hard to pretend they're the same\n   - Programmers need to be aware for performance-critical code\n\n5. **Semantic Differences**\n   - Hard to make RPC behave exactly like a local call\n   - At-most-once vs at-least-once semantics\n   - Idempotency requirements\n\n6. **Global Variables**\n   - Cannot be shared transparently\n   - Each machine has its own copy\n   - Modifications not visible remotely\n\n7. **Partial Failures**\n   - Part of system can fail while rest continues\n   - Unlike local calls where process either works or crashes entirely\n\nConclusion: **Perfect transparency is impossible** due to fundamental differences between local and remote execution. RPC provides good abstraction but can't completely hide distribution.",
      },
      {
        id: "v",
        question: "State the functionality and purpose of stubs. [5 Marks]",
        points: [
          "Client stub",
          "Server stub",
          "Marshaling",
          "Transparency",
          "Communication hiding",
        ],
        answer:
          "Functionality and Purpose of Stubs:\n\nStubs are the key components that **hide communication details** and make RPC look like local procedure calls.\n\n**CLIENT STUB (Proxy):**\n\nFunctionality:\n1. **Packs arguments** into a message (marshalling)\n   - Converts parameters to network format\n   - Handles data representation\n   - Flattens complex structures\n\n2. **Sends the message** to server\n   - Uses RPC runtime\n   - Adds request ID, procedure identifier\n   - Handles network communication\n\n3. **Waits for reply** and unpacks it\n   - Blocks until reply arrives\n   - Unmarshals return values\n   - Converts back to native format\n\n4. **Returns result** to caller\n   - Makes it look like a local call\n   - Handles errors and exceptions\n\nPurpose:\n- Acts as **local representative** of remote procedure\n- **Hides all communication** from client\n- Client code just calls the stub like a normal function\n\n**SERVER STUB (Skeleton):**\n\nFunctionality:\n1. **Unpacks request** (unmarshals parameters)\n   - Receives message from network\n   - Extracts procedure identifier\n   - Converts parameters to server's native format\n\n2. **Calls the actual server procedure**\n   - Invokes the real implementation\n   - Passes unmarshaled parameters\n\n3. **Packs the result** and sends it back\n   - Marshals return values\n   - Creates reply message\n   - Sends reply to client\n\nPurpose:\n- Acts as **receiver and dispatcher** on server side\n- **Hides communication** from server implementation\n- Server code just implements the procedure, unaware of RPC details\n\n**Overall Purpose of Stubs:**\n\n✓ **Provide Transparency**: Hide network communication\n✓ **Simplify Programming**: Client and server code looks local\n✓ **Handle Marshaling**: Automatic data conversion\n✓ **Manage Communication**: All network details hidden\n✓ **Type Safety**: Enforce interface contract\n\n**Stub Generation:**\n- Stubs are typically **automatically generated** from IDL\n- Programmer writes: IDL specification\n- Stub generator creates: Client stub + Server stub\n- Programmer only implements: Actual server procedure\n\n**Example:**\n\nClient code:\n```c\nint result = add(5, 3);  // Looks like local call!\n```\n\nWhat really happens:\n```c\n// Client stub does:\nadd_client_stub(5, 3) {\n    marshal(5, 3) → message\n    send(message) → server\n    wait_for_reply()\n    reply → unmarshal() → result\n    return result\n}\n\n// Server stub does:\nadd_server_stub() {\n    receive() → message\n    unmarshal(message) → (a, b)\n    result = add_actual(a, b)  // Call real implementation\n    marshal(result) → reply\n    send(reply) → client\n}\n```\n\nStubs make the **remote call look like a normal function call**, which is the essence of RPC transparency!",
      },
    ],
  },
  {
    id: 4,
    unit: "RPC & Kernels",
    title: "Question Four [25 Marks]",
    subQuestions: [
      {
        id: "i",
        question:
          "In RPC based applications, two important issues that need to be considered for every management are server implementation and server creation. Distinguish between the two concepts. [12 Marks]",
        points: [
          "Server implementation (stateful vs stateless)",
          "Server creation (binding and registry)",
          "State management",
          "Service discovery",
        ],
        answer:
          'Server Implementation vs Server Creation:\n\nThese are two distinct but related concerns in RPC-based systems.\n\n**SERVER IMPLEMENTATION** - How the server behaves:\n\nThis refers to **how the server operates** and manages client interactions.\n\n1. **Stateful Server:**\n   - **Keeps client information** between requests\n   - Remembers: open files, file positions, connection state, session data\n   - **Advantages:**\n     + Better performance (no repeated setup)\n     + Can optimize based on history\n     + Efficient for multi-step operations\n   - **Disadvantages:**\n     - Harder recovery if server crashes\n     - Must maintain state for all clients\n     - More complex implementation\n   - **Example:** File server remembering which files each client has open\n\n2. **Stateless Server:**\n   - **No client information kept** between requests\n   - Each request independent and self-contained\n   - **Advantages:**\n     + Simple recovery (just restart)\n     + No memory overhead for client state\n     + Easy to replicate\n   - **Disadvantages:**\n     - Every request must contain all information\n     - May be slower (repeated setup)\n     - Less optimization opportunities\n   - **Example:** HTTP server processing each request independently\n\n**SERVER CREATION** - How clients find and connect to servers:\n\nThis refers to **how servers are started and how clients locate them**.\n\n1. **Server Registration:**\n   - Server must **register** with a binder/name server/registry\n   - Advertise: service name, location (host + port), interface version\n   - Example: Server registers "FileService" at host "server1.com:5000"\n\n2. **Service Discovery (Client Binding):**\n   - Client must **find** the server before making calls\n   - Query binder: "Where is FileService?"\n   - Binder returns: location information\n   - Client binds to server location\n\n3. **Binding Process:**\n   - **Static binding:** Server location hardcoded, known at compile time\n   - **Dynamic binding:** Server location looked up at runtime\n   - Dynamic binding allows server relocation\n\n4. **Related Issues:**\n   - **Load Balancing:** Multiple servers, which one to use?\n   - **Versioning:** Client needs version 2.0, server offers 1.0 and 2.0\n   - **Server Availability:** What if server is down? Failover?\n   - **Server Lifecycle:** Starting, stopping, restarting servers\n\n**Summary Comparison:**\n\n| Aspect | Server Implementation | Server Creation |\n|--------|----------------------|------------------|\n| **Focus** | How server operates | How clients find server |\n| **Concerns** | State management | Service discovery |\n| **Key Question** | Stateful or stateless? | How to locate server? |\n| **Issues** | Recovery, performance | Binding, load balancing |\n| **Example** | "Remember client data?" | "Where is the service?" |\n\n**Both are important** for successful RPC application design:\n- **Implementation** affects performance and reliability\n- **Creation** affects scalability and flexibility',
      },
      {
        id: "ii",
        question:
          "Explain in detail the architecture and principles of Monolithic kernel and Micro kernel. [8 Marks]",
        points: [
          "Monolithic structure",
          "Microkernel structure",
          "Comparison",
          "Examples",
        ],
        answer:
          "Monolithic Kernel vs Microkernel Architecture:\n\n**MONOLITHIC KERNEL:**\n\n**Architecture:**\n- **Large, single binary** containing all OS services\n- Everything runs in **kernel space** (privileged mode)\n- All components in **one address space**\n- Components communicate via **direct function calls**\n\n**Structure:**\n```\n┌─────────────────────────────────────────┐\n│         Application Programs            │ User Space\n├─────────────────────────────────────────┤\n│                                         │\n│    ┌──────────────────────────────┐    │\n│    │  Process Management          │    │\n│    │  Memory Management           │    │\n│    │  File Systems                │    │ Kernel\n│    │  Device Drivers              │    │ Space\n│    │  Network Stack               │    │\n│    │  IPC                         │    │\n│    │  System Call Interface       │    │\n│    └──────────────────────────────┘    │\n│                                         │\n└─────────────────────────────────────────┘\n```\n\n**Principles:**\n1. **Tight Integration:** All services tightly coupled and interdependent\n2. **Efficiency:** Direct function calls, no context switches between services\n3. **Shared Data:** Components access same kernel data structures\n4. **Privileged Execution:** All code runs in kernel mode\n\n**Advantages:**\n✓ **Fast performance:** No IPC overhead, direct access\n✓ **Efficient resource sharing:** Direct access to kernel resources\n✓ **Simple communication:** Just function calls between modules\n✓ **Mature and stable:** Well-tested, proven approach\n\n**Disadvantages:**\n✗ **Large size:** Entire kernel loaded into memory\n✗ **Difficult maintenance:** Hard to modify without affecting other parts\n✗ **Lack of modularity:** Components interdependent\n✗ **Poor reliability:** One component failure can crash entire system\n✗ **Not flexible:** Hard to add new features or services\n\n**Examples:** Traditional UNIX, Linux, Windows NT\n\n---\n\n**MICROKERNEL:**\n\n**Architecture:**\n- **Minimal kernel** with only essential mechanisms\n- Most services run in **user space** as separate processes\n- **Client-server architecture** for services\n- Components communicate via **message passing (IPC)**\n\n**Structure:**\n```\n┌─────────────────────────────────────────┐\n│  Apps │ File  │ Device │ Network        │\n│       │Server │Drivers │ Stack          │ User\n├───────┴───────┴────────┴────────────────┤ Space\n│          IPC (Message Passing)          │\n├─────────────────────────────────────────┤\n│    ┌────────────────────────────┐      │\n│    │ Basic Process/Thread Mgmt  │      │ Kernel\n│    │ Low-level Memory Mgmt      │      │ Space\n│    │ IPC Primitives             │      │\n│    │ Basic I/O                  │      │\n│    └────────────────────────────┘      │\n└─────────────────────────────────────────┘\n```\n\n**Principles:**\n1. **Separation of Mechanism and Policy:** Kernel provides mechanisms, servers implement policies\n2. **Modularity:** Services are independent, replaceable modules\n3. **Fault Isolation:** Server failure doesn't crash kernel\n4. **Flexibility:** Easy to add, remove, or replace services\n5. **Multiple OS Personalities:** Can support different OS interfaces\n\n**Kernel Contains ONLY:**\n- Low-level memory management (address spaces)\n- Basic process/thread management\n- Inter-process communication (IPC)\n- Basic I/O primitives\n\n**User Space Contains:**\n- File servers\n- Device drivers\n- Network protocol servers\n- Window managers\n- Application servers\n\n**Advantages:**\n✓ **Highly modular:** Easy to modify, extend, maintain\n✓ **Better reliability:** Fault isolation, server crash doesn't affect kernel\n✓ **Flexibility:** Services can be started, stopped, replaced dynamically\n✓ **Enhanced security:** Better isolation between components\n✓ **Portability:** Most OS-specific code in user space\n✓ **Multiple OS support:** Can run different OS environments\n\n**Disadvantages:**\n✗ **Performance overhead:** Context switches for IPC, slower than function calls\n✗ **Complexity:** More complex message passing protocols\n✗ **Design challenges:** Determining what goes in kernel vs user space\n\n**Examples:** Mach, QNX, MINIX, Chorus, L4\n\n---\n\n**COMPARISON:**\n\n| Aspect | Monolithic | Microkernel |\n|--------|-----------|-------------|\n| **Size** | Large | Small |\n| **Performance** | Faster | Slower (due to IPC) |\n| **Reliability** | Less fault-tolerant | Better isolation |\n| **Flexibility** | Rigid | Highly flexible |\n| **Maintenance** | Difficult | Easier |\n| **Communication** | Function calls | Message passing |\n| **Mode switches** | Few | Many (IPC overhead) |\n| **Examples** | Linux, UNIX | Mach, QNX |",
      },
      {
        id: "iii",
        question:
          "List the five (5) elements of program that are involved in the implementation of an RPC mechanism. [5 Marks]",
        points: [
          "Client",
          "Client Stub",
          "RPC Runtime",
          "Server Stub",
          "Server",
        ],
        image: "/zcas-distributed-systems-app/rpcm.jpg",

        answer:
          "Five Elements of an RPC Mechanism:\n\n1. **CLIENT**\n   - The process requesting a remote operation\n   - Makes procedure call (appears local)\n   - Blocks waiting for result\n   - Receives and uses return value\n   - Example: Application calling remote_add(5, 3)\n\n2. **CLIENT STUB (Proxy)**\n   - Packs (marshals) parameters and sends the request\n   - Intercepts local call\n   - Converts parameters to network format\n   - Sends message to server\n   - Waits for reply\n   - Unmarshals result and returns to client\n   - Acts as local representative of remote procedure\n\n3. **RPC RUNTIME**\n   - Handles communication, timeouts, and message delivery\n   - Manages network protocols (TCP/UDP)\n   - Implements reliability (retransmissions)\n   - Handles server location (binding)\n   - Manages connections\n   - Detects and handles failures\n   - Provides transport layer\n\n4. **SERVER STUB (Skeleton)**\n   - Unpacks parameters and calls the actual server function\n   - Receives request messages\n   - Unmarshals parameters\n   - Calls real server procedure\n   - Marshals return value\n   - Sends reply message\n   - Acts as receiver and dispatcher\n\n5. **SERVER**\n   - Performs the real work and returns results\n   - Implements actual procedure logic\n   - Computes result\n   - Returns value to server stub\n   - Unaware of RPC details (thinks it's local)\n   - Example: Actual add(a, b) { return a + b; } implementation\n\n**How They Work Together:**\n\n```\nClient → Client Stub → RPC Runtime → Network → RPC Runtime → Server Stub → Server\n         (marshal)     (send)                   (receive)     (unmarshal)    (execute)\n                                                 \nClient ← Client Stub ← RPC Runtime ← Network ← RPC Runtime ← Server Stub ← Server\n         (unmarshal)   (receive)                (send)        (marshal)      (return)\n```\n\nThese five components work together to make remote calls appear like normal local function calls, providing the transparency that is the core goal of RPC.",
      },
    ],
  },
  {
    id: 5,
    unit: "Design Issues",
    title: "Question Five [25 Marks]",
    subQuestions: [
      {
        id: "i",
        question:
          "With use of clear examples, explain how location, relocation and migration transparencies differ from each other. [15 Marks]",
        points: [
          "Location transparency",
          "Migration transparency",
          "Relocation transparency",
        ],
        answer:
          "Three Types of Transparency:\n\n**1. LOCATION TRANSPARENCY:**\nUsers access a resource without knowing where it is physically located.\n\nExample: Accessing /shared/docs/report.pdf\n- User doesn't know which server hosts the file\n- Physical location hidden\n- Access by logical name\n\n**2. MIGRATION TRANSPARENCY:**\nA resource may move to another machine but its name stays the same.\n\nExample: File moved from server1 to server2\n- Path remains /shared/docs/report.pdf\n- Users unaware of movement\n- Name unchanged after migration\n\n**3. RELOCATION TRANSPARENCY:**\nThe resource moves while it is in use, and the user does not notice.\n\nExample: Mobile phone call\n- Call continues while switching between cell towers\n- No interruption during movement\n- Movement hidden during active use\n\n**Summary:**\n- Location: Hides current address\n- Migration: Hides past movement\n- Relocation: Hides active movement",
      },
      {
        id: "ii",
        question:
          "Briefly discuss the security aspects of a Distributed Systems. [5 Marks]",
        points: [
          "Authentication",
          "Authorization",
          "Confidentiality",
          "Integrity",
          "Non-repudiation",
        ],
        answer:
          "Security Aspects in Distributed Systems:\n\n1. **Authentication** – Ensuring users/services are who they claim to be\n2. **Authorization** – Controlling access to resources\n3. **Confidentiality** – Preventing eavesdropping (encryption)\n4. **Integrity** – Ensuring data is not tampered with\n5. **Non-repudiation** – Actions cannot be denied later\n\nChallenges:\n- No single trusted machine\n- Data travels over networks\n- Security must be enforced at many points\n- Distributed policy enforcement",
      },
      {
        id: "iii",
        question:
          "Discuss the issues involved in building a DSM system on a network of heterogeneous machines? [5 Marks]",
        points: ["Data formats", "Page sizes", "Architectures", "Solutions"],
        answer:
          "Issues in DSM on Heterogeneous Machines:\n\n**Problems:**\n1. Different data formats (byte order/endianness)\n2. Different page sizes (4KB, 8KB, 16KB)\n3. Different architectures (32-bit vs 64-bit)\n4. Different operating systems\n\n**Solutions:**\n1. Use standard data format (XDR)\n2. Choose smallest common page size\n3. Use logical addresses\n4. Add DSM software abstraction layer\n\nThese ensure consistent shared memory behavior across mixed hardware.",
      },
    ],
  },
  {
    id: 6,
    unit: "Distributed Systems",
    title: "Question Six [23 Marks]",
    subQuestions: [
      {
        id: "i",
        question:
          "Differentiate between time-sharing, parallel processing, network and distributes operating systems. [8 Marks - 2 each]",
        points: [
          "Time-sharing OS",
          "Parallel processing OS",
          "Network OS",
          "Distributed OS",
        ],
        answer:
          "System Types Comparison:\n\n**1. Time-sharing OS:**\n- One computer shared by many users\n- CPU switches between tasks\n- Users think they have dedicated machine\n\n**2. Parallel Processing OS:**\n- Multiple processors share single memory\n- Tightly coupled system\n- Processors work together on one task\n\n**3. Network OS:**\n- Independent computers connected by network\n- Users must know resource locations\n- Explicit remote access\n\n**4. Distributed OS:**\n- Many computers appear as one system\n- Location transparency\n- Unified system view",
      },
      {
        id: "ii",
        question:
          "In what respect are distributed computing systems better than parallel processing systems? [5 Marks]",
        points: ["Scalability", "Fault tolerance", "Cost", "Flexibility"],
        answer:
          "Distributed Systems Advantages:\n\n1. **Scalability** – Easy to add new nodes using normal hardware\n2. **Fault Tolerance** – If one node fails, others continue working\n3. **Geographic Distribution** – Nodes can be in different locations\n4. **Cost** – Uses inexpensive networked machines\n5. **Flexibility** – Supports different machine types and operating systems",
      },
      {
        id: "iii",
        question:
          "Discuss the main guiding principles that a distributed operating system designer must keep in mind for good performance of the system? [7 Marks]",
        points: ["Communication", "Caching", "Parallelism", "Load balancing"],
        answer:
          "Guiding Principles for Performance:\n\n1. **Minimize network communication** – Move computation to data\n2. **Cache frequently used data** – Avoid repeated transfers\n3. **Batch operations** – Group small messages together\n4. **Reduce copying** – Use zero-copy techniques\n5. **Use parallelism** – Multiple threads/processes concurrently\n6. **Balance load** – Spread work across nodes\n7. **Minimize synchronization** – Too much locking slows system",
      },
      {
        id: "iv",
        question:
          "What are the major issues of designing a Distributed OS? [5 Marks]",
        points: ["Transparency", "Scalability", "Reliability", "Security"],
        answer:
          "Major Design Issues:\n\n1. **Transparency** – Hiding distribution details\n2. **Scalability** – Work efficiently as nodes increase\n3. **Reliability** – Tolerate node and network failures\n4. **Security** – Protect data across untrusted networks\n5. **Resource Management** – Scheduling, load sharing\n6. **Communication** – Efficient message passing/RPC\n7. **Synchronization** – Global clocks, mutual exclusion",
      },
    ],
  },
  // Mid-Semester Exam Questions
  {
    id: 7,
    unit: "Architecture & Kernels",
    title: "Question Seven [20 Marks]",
    subQuestions: [
      {
        id: "i",
        question:
          "With a neat diagram explain the system architecture of distributed systems? [10 Marks]",
        points: [
          "Architecture layers",
          "Physical layer",
          "Network layer",
          "Middleware",
          "Application layer",
        ],
        answer:
          "Distributed System Architecture:\n\nA distributed system is built in **layers** to hide complexity and simplify communication.\n\n**Common Layers:**\n\n1. **Physical Layer**\n   - Machines, network hardware, cabling\n   - Physical infrastructure\n\n2. **Network Layer**\n   - Protocols (TCP/IP, UDP)\n   - Message delivery\n\n3. **Operating System Layer**\n   - Process management\n   - Memory management\n   - File system\n\n4. **Middleware Layer**\n   - RPC, distributed objects\n   - Naming services\n   - Transparency support\n\n5. **Application Layer**\n   - Distributed applications\n   - End-user services\n\n**Key Components:**\n- Clients: Request services\n- Servers: Provide services\n- Network Infrastructure: Communication\n- Middleware: Hides distributed nature",
      },
      {
        id: "ii",
        question:
          "Discuss in detail the architecture and principles of Monolithic kernel and Micro kernel. [10 Marks]",
        points: ["Monolithic structure", "Microkernel structure", "Comparison"],
        answer:
          "**MONOLITHIC KERNEL:**\n\n**Architecture:**\n- All OS services in kernel space\n- Single large binary\n- Direct function calls\n\n**Components:**\n- File system, memory, drivers, networking\n- Everything runs together\n\n**Advantages:**\n+ Fast performance\n+ Simple communication\n+ Mature and stable\n\n**Disadvantages:**\n- Poor modularity\n- Hard to maintain\n- One bug crashes entire system\n\n**Examples:** Linux, traditional UNIX\n\n---\n\n**MICROKERNEL:**\n\n**Architecture:**\n- Minimal kernel (IPC, basic scheduling)\n- Most services in user space\n- Message passing communication\n\n**Advantages:**\n+ Highly modular\n+ More reliable (fault isolation)\n+ Easier to extend\n\n**Disadvantages:**\n- More context switching\n- IPC overhead\n- Slower performance\n\n**Examples:** Mach, QNX, MINIX\n\n---\n\n**COMPARISON:**\n- Size: Monolithic (large) vs Microkernel (small)\n- Reliability: Microkernel better (isolation)\n- Performance: Monolithic faster\n- Flexibility: Microkernel more modular",
      },
    ],
  },
  {
    id: 8,
    unit: "RPC",
    title: "Question Eight [20 Marks]",
    subQuestions: [
      {
        id: "i",
        question:
          "Discuss the Principle of RPC between a client and server program. [10 Marks]",
        points: [
          "Transparency",
          "Stubs",
          "Marshalling",
          "Request/Reply",
          "Binding",
        ],
        answer:
          "**Principles of RPC:**\n\nRPC makes a remote function appear like a **normal local procedure call**.\n\n**How It Works:**\n1. Client calls function\n2. Client stub packs parameters\n3. Sends across network\n4. Server stub unpacks\n5. Executes procedure\n6. Result returned\n\n**Key Principles:**\n\n1. **Transparency** – Remote call looks local\n2. **Stubs** – Hide message passing details\n3. **Marshalling** – Convert arguments to transferable format\n4. **Request/Reply Model** – Client sends request, waits for reply\n5. **Binding** – Client locates server through binder service\n\n**Benefits:**\n- Simpler programming\n- Network details hidden\n- Familiar function-call syntax",
      },
      {
        id: "ii",
        question: "Discuss the Design issues of Distributed system? [10 Marks]",
        points: [
          "Transparency",
          "Reliability",
          "Performance",
          "Scalability",
          "Security",
        ],
        answer:
          "**Design Issues of Distributed Systems:**\n\n1. **Transparency**\n   - Hide location, migration, replication\n   - Concurrency transparency\n\n2. **Reliability**\n   - Handle failures\n   - Use replication and failover\n   - Fault tolerance\n\n3. **Performance**\n   - Minimize communication\n   - Cache data\n   - Balance load\n\n4. **Scalability**\n   - Avoid centralized components\n   - Use partitioning\n   - Replication strategies\n\n5. **Security**\n   - Authentication\n   - Authorization\n   - Encryption\n\n6. **Heterogeneity**\n   - Different machines, OSes\n   - Data format compatibility\n   - Standards and middleware",
      },
    ],
  },
  {
    id: 9,
    unit: "RPC",
    title: "Question Nine [20 Marks]",
    subQuestions: [
      {
        id: "i",
        question: "Explain what is meant by remote procedure call. [10 Marks]",
        points: ["RPC definition", "Purpose", "How it works", "Benefits"],
        answer:
          "**Remote Procedure Call (RPC):**\n\n**Definition:**\nRPC allows a program to call a procedure on a **remote machine as if it were local**.\n\n**Purpose:**\n- Hide network communication\n- Use normal function-call syntax\n- Simplify distributed programming\n\n**How RPC Works:**\n\n1. Client stub → marshals arguments\n2. Sends request over network\n3. Server stub receives\n4. Executes procedure\n5. Marshals result\n6. Client receives reply\n\n**Key Benefits:**\n- Transparency (looks like local call)\n- Easier than explicit message passing\n- Familiar programming model\n- Network details hidden",
      },
      {
        id: "ii",
        question:
          "Explain the client server communication model. Also Discuss about marshaling in detail. [10 Marks]",
        points: [
          "Client-server model",
          "Request-reply pattern",
          "Marshaling",
          "Unmarshaling",
        ],
        answer:
          "**Client-Server Communication Model:**\n\n**Pattern:**\n- Client sends requests\n- Server processes and replies\n- Request-reply pattern\n- Clients block until response (synchronous RPC)\n\n**Flow:**\n1. Client initiates request\n2. Server processes\n3. Server sends reply\n4. Client resumes\n\n---\n\n**MARSHALING IN DETAIL:**\n\n**Definition:**\nMarshaling converts parameters into a **standardized byte format** for network transmission.\n\n**Purpose:**\n- Enable data transfer across networks\n- Handle different architectures\n- Ensure compatibility\n\n**What Gets Marshaled:**\n- Integers, floats\n- Strings, characters\n- Structures, arrays\n- Complex data types\n\n**Key Issues Handled:**\n1. **Byte Order (Endianness)**\n   - Big-endian vs little-endian\n   - Convert to network byte order\n\n2. **Data Representation**\n   - Integer sizes (16/32/64-bit)\n   - Floating-point formats\n\n3. **Structure Padding**\n   - Alignment differences\n   - Remove padding for transmission\n\n**Unmarshaling:**\n- Reverse process at receiver\n- Reconstructs original data\n- Converts back to native format\n\n**Importance:**\nEnsures different architectures can communicate correctly.",
      },
    ],
  },
  {
    id: 10,
    unit: "Deadlock & Scalability",
    title: "Question Ten [20 Marks]",
    subQuestions: [
      {
        id: "i",
        question: "Describe various deadlock handling techniques [10 Marks]",
        points: [
          "Deadlock prevention",
          "Deadlock avoidance",
          "Deadlock detection",
          "Distributed detection",
        ],
        answer:
          "Deadlock Handling Techniques:\n\n**1. DEADLOCK PREVENTION:**\n\nBreak one of the four necessary conditions for deadlock:\n\n**Four Necessary Conditions:**\n1. Mutual Exclusion – Resource can't be shared\n2. Hold and Wait – Process holds resources while waiting for more\n3. No Preemption – Resources can't be forcibly taken\n4. Circular Wait – Circular chain of waiting processes\n\n**Prevention Strategies:**\n- **Avoid Hold-and-Wait:** Request all resources at once\n- **Allow Preemption:** Take resources from processes\n- **Resource Ordering:** Number resources; request in order (prevents circular wait)\n  Example: Always request R1 before R2 before R3\n\n---\n\n**2. DEADLOCK AVOIDANCE:**\n\n**Banker's Algorithm:**\n- Grant resources only if system remains in a **safe state**\n- Safe state = there exists a sequence where all processes can complete\n- Before granting request, check if resulting state is safe\n- If unsafe, make process wait\n\n**Example:**\n- Process needs 5 resources total, has 2, requests 2 more\n- Check: If we grant, can system still satisfy all processes?\n- If yes → grant; if no → deny/wait\n\n---\n\n**3. DEADLOCK DETECTION & RECOVERY:**\n\n**Detection:**\n- Periodically check for cycles in **resource allocation graph**\n- Use graph algorithms (DFS) to find circular dependencies\n- If cycle found → deadlock exists\n\n**Recovery Options:**\n1. **Abort processes:** Kill one or more processes to break cycle\n2. **Preempt resources:** Take resources from process and give to others\n3. **Rollback:** Restore process to earlier safe state\n\n**Selection Criteria:**\n- Priority of processes\n- How long process has run\n- Resources held\n- Resources needed to complete\n\n---\n\n**4. DISTRIBUTED DEADLOCK DETECTION:**\n\n**Challenge:** No global view of system\n\n**Approach:**\n- Use **probe messages** across sites\n- Each site maintains local wait-for graph\n- Detect cycles that span multiple machines\n- Coordinator collects information to build global graph\n\n**Example Algorithms:**\n- Centralized detection (one coordinator)\n- Distributed detection (probes propagate through system)\n\n**Summary:**\n- **Prevention:** Make deadlock impossible\n- **Avoidance:** Dynamically avoid unsafe states\n- **Detection:** Find and recover from deadlocks\n- **Distributed:** Handle deadlocks across machines",
      },
      {
        id: "ii",
        question:
          "Explain the principles for designing scalable distributed systems. [10 Marks]",
        points: [
          "Avoid centralization",
          "Decentralized algorithms",
          "Partitioning",
          "Replication",
          "Caching",
          "Asynchronous communication",
        ],
        answer:
          "Principles for Designing Scalable Distributed Systems:\n\n**1. AVOID CENTRALIZED COMPONENTS**\n\n**Problem:** Single points become bottlenecks\n- One server handling all requests can't scale\n- Single point of failure\n- Performance degrades as load increases\n\n**Solution:**\n- Distribute responsibilities across multiple nodes\n- No single coordinator\n- Example: Use peer-to-peer instead of client-server\n\n---\n\n**2. USE DECENTRALIZED ALGORITHMS**\n\n**Principle:** Make decisions locally, not globally\n\n**Benefits:**\n- Scales better (no global coordination)\n- More fault-tolerant\n- Lower latency\n\n**Examples:**\n- Distributed hash tables (DHT)\n- Gossip protocols for information dissemination\n- Local scheduling instead of global scheduler\n\n---\n\n**3. PARTITION AND REPLICATE DATA**\n\n**Partitioning (Sharding):**\n- Split large datasets across multiple servers\n- Each server handles subset of data\n- Example: Users A-M on Server1, N-Z on Server2\n\n**Replication:**\n- Keep multiple copies of data\n- Improves availability and read performance\n- Example: 3 replicas of each data partition\n\n**Benefits:**\n+ Parallel processing\n+ Load distribution\n+ Fault tolerance\n\n---\n\n**4. USE CACHING**\n\n**Principle:** Store frequently accessed data closer to clients\n\n**Benefits:**\n- Reduces remote queries\n- Lowers network load\n- Faster response times\n\n**Levels of Caching:**\n- Client-side cache\n- Edge servers (CDN)\n- Application-level cache (Redis, Memcached)\n\n**Example:**\n- Web pages cached at edge servers\n- Database query results cached\n\n---\n\n**5. MINIMIZE GLOBAL OPERATIONS**\n\n**Problem:** Global operations don't scale\n- Global locks block everyone\n- Broadcasts overwhelm network\n- Global agreement is expensive\n\n**Solutions:**\n- Use local operations when possible\n- Partition locks (fine-grained locking)\n- Avoid broadcast; use multicast or targeted messages\n\n---\n\n**6. USE ASYNCHRONOUS COMMUNICATION**\n\n**Principle:** Don't block waiting for responses\n\n**Benefits:**\n- Higher throughput\n- Clients continue working\n- Better resource utilization\n\n**Techniques:**\n- Message queues\n- Asynchronous RPC\n- Event-driven architecture\n\n**Example:**\n- Client submits request, gets ticket, checks back later\n- Email system (send and continue)\n\n---\n\n**7. MINIMIZE DATA MOVEMENT**\n\n**Principle:** Move computation to data, not data to computation\n\n**Rationale:**\n- Network bandwidth is limited\n- Moving large datasets is expensive\n\n**Example:**\n- MapReduce: Send code to data nodes\n- Database stored procedures\n\n---\n\n**8. USE EVENTUAL CONSISTENCY (WHEN APPROPRIATE)**\n\n**Principle:** Relax consistency for better performance\n\n**Trade-off:**\n- Strong consistency → slow, doesn't scale\n- Eventual consistency → fast, scales well\n\n**Appropriate Use Cases:**\n- Social media feeds\n- DNS\n- Caching systems\n\n**Example:**\n- DNS changes propagate eventually (not immediately)\n\n---\n\n**SUMMARY:**\n\n| Principle | Action | Benefit |\n|-----------|--------|----------|\n| Avoid centralization | Distribute load | No bottleneck |\n| Decentralize | Local decisions | Better scalability |\n| Partition | Split data | Parallel processing |\n| Replicate | Multiple copies | Fault tolerance |\n| Cache | Store locally | Reduce latency |\n| Async communication | Non-blocking | Higher throughput |\n| Minimize global ops | Local operations | Better performance |\n\nThese principles work together to create systems that handle increasing load gracefully!",
      },
    ],
  },
  {
    id: 11,
    unit: "Security & Mutual Exclusion",
    title: "Question Eleven [20 Marks]",
    subQuestions: [
      {
        id: "i",
        question:
          "Explain the security challenges of distributed systems. [10 Marks]",
        points: [
          "Authentication",
          "Authorization",
          "Confidentiality",
          "Integrity",
          "Availability",
          "Heterogeneity",
        ],
        answer:
          'Security Challenges of Distributed Systems:\n\nDistributed systems face **unique security issues** because data moves across networks and there is **no single trusted authority**.\n\n---\n\n**1. AUTHENTICATION**\n\n**Challenge:** Verifying identities over insecure networks\n\n**Issues:**\n- No face-to-face verification\n- Credentials travel over network (can be intercepted)\n- Must verify both users and services\n\n**Solutions:**\n- Passwords + encryption\n- Public key cryptography\n- Kerberos authentication\n- Digital certificates\n\n**Example:** How does server know client is who they claim?\n\n---\n\n**2. AUTHORIZATION**\n\n**Challenge:** Enforcing permissions across multiple machines\n\n**Issues:**\n- Access control must be consistent across all nodes\n- Who decides permissions?\n- How to revoke access globally?\n\n**Solutions:**\n- Centralized authorization server\n- Access control lists (ACLs)\n- Role-based access control (RBAC)\n- Distributed policy enforcement\n\n**Example:** User has read access on Server A; should this apply on Server B?\n\n---\n\n**3. CONFIDENTIALITY**\n\n**Challenge:** Preventing eavesdropping\n\n**Issues:**\n- Data travels over untrusted networks\n- Multiple communication paths\n- Data stored on multiple machines\n\n**Solutions:**\n- Encrypt all network communication (TLS/SSL)\n- End-to-end encryption\n- Secure channels\n\n**Example:** Banking transaction data must stay private\n\n---\n\n**4. INTEGRITY**\n\n**Challenge:** Detecting message tampering\n\n**Issues:**\n- Messages can be modified in transit\n- Replay attacks (resend old messages)\n- Man-in-the-middle attacks\n\n**Solutions:**\n- Message authentication codes (MAC)\n- Digital signatures\n- Checksums/hashes\n- Timestamps and nonces\n\n**Example:** Attacker changes "transfer $100" to "transfer $1000"\n\n---\n\n**5. AVAILABILITY**\n\n**Challenge:** Preventing denial-of-service (DoS) attacks\n\n**Issues:**\n- Attackers can flood system with requests\n- Multiple entry points to attack\n- Distributed attacks (DDoS) harder to stop\n\n**Solutions:**\n- Rate limiting\n- Load balancers\n- Redundancy and replication\n- Intrusion detection systems\n\n**Example:** Attacker overwhelms server with fake requests\n\n---\n\n**6. HETEROGENEITY**\n\n**Challenge:** Different systems must interoperate securely\n\n**Issues:**\n- Different security mechanisms\n- Different trust models\n- Multiple administrative domains\n- Incompatible security protocols\n\n**Solutions:**\n- Standard security protocols (TLS, OAuth)\n- Gateways and proxies\n- Unified identity management\n\n**Example:** Windows clients connecting to Linux servers\n\n---\n\n**7. NO CENTRAL AUTHORITY**\n\n**Challenge:** Trust must be distributed\n\n**Issues:**\n- Who do you trust?\n- No single point of control\n- Multiple administrative domains\n\n**Solutions:**\n- Certificate authorities (CAs)\n- Web of trust\n- Distributed trust models\n\n---\n\n**SUMMARY:**\n\n| Challenge | Problem | Solution |\n|-----------|---------|----------|\n| Authentication | Verify identities remotely | Cryptography, certificates |\n| Authorization | Consistent access control | ACLs, RBAC |\n| Confidentiality | Prevent eavesdropping | Encryption |\n| Integrity | Detect tampering | Digital signatures, MACs |\n| Availability | Prevent DoS | Redundancy, rate limiting |\n| Heterogeneity | Different systems | Standard protocols |\n\n**Why Distributed Systems Are Harder to Secure:**\n- More attack surface (multiple machines, networks)\n- No single point of control\n- Data in transit is vulnerable\n- Must trust multiple parties\n- Complexity makes errors more likely',
      },
      {
        id: "ii",
        question:
          "Explain how mutual exclusion is handled in distributed system. [10 Marks]",
        points: [
          "Centralized algorithm",
          "Lamport's algorithm",
          "Ricart-Agrawala",
          "Token ring",
          "Quorum-based",
        ],
        answer:
          "Mutual Exclusion in Distributed Systems:\n\n**Challenge:** Without shared memory or a single clock, we need **message passing algorithms** to ensure only one process accesses the critical section at a time.\n\n---\n\n**1. CENTRALIZED ALGORITHM**\n\n**How It Works:**\n- One coordinator node controls access\n- Process sends REQUEST to coordinator\n- Coordinator grants access or queues request\n- Process sends RELEASE when done\n\n**Messages:**\n- 3 messages per entry: REQUEST, GRANT, RELEASE\n\n**Advantages:**\n✓ Simple to implement\n✓ Fair (FIFO queue)\n✓ Easy to understand\n\n**Disadvantages:**\n✗ Single point of failure (coordinator crash = deadlock)\n✗ Bottleneck (coordinator limits scalability)\n✗ Not fault-tolerant\n\n---\n\n**2. LAMPORT'S ALGORITHM**\n\n**How It Works:**\n- Fully distributed (no coordinator)\n- Uses **Lamport timestamps** to order requests\n- Process sends REQUEST to all other processes\n- Receives REPLY from everyone\n- Enters critical section when has replies from all\n- Sends RELEASE to all when done\n\n**Messages:**\n- 2(N-1) messages per entry (N = number of processes)\n- N-1 REQUESTS + N-1 RELEASES\n\n**Ordering:**\n- If two requests, earlier timestamp wins\n- Ties broken by process ID\n\n**Advantages:**\n✓ Fully distributed\n✓ No single point of failure\n✓ Fair ordering\n\n**Disadvantages:**\n✗ High message overhead\n✗ If one process fails, all block\n✗ Must communicate with everyone\n\n---\n\n**3. RICART-AGRAWALA ALGORITHM**\n\n**How It Works:**\n- Improvement over Lamport's\n- Send REQUEST to all\n- Others send REPLY immediately OR defer if they also want access\n- Enter when have replies from all\n- Deferred replies sent when releasing\n\n**Messages:**\n- (N-1) messages per entry\n- Fewer than Lamport's!\n\n**Key Insight:**\n- Combine REQUEST and RELEASE into one protocol\n- REPLY serves as acknowledgment\n\n**Advantages:**\n✓ Fewer messages than Lamport\n✓ Fully distributed\n\n**Disadvantages:**\n✗ Still requires permission from everyone\n✗ One failure blocks all\n\n---\n\n**4. TOKEN RING ALGORITHM**\n\n**How It Works:**\n- Processes arranged in logical ring\n- A token circulates around the ring\n- Only token holder can enter critical section\n- Pass token to next process when done (or don't need it)\n\n**Messages:**\n- 1 message to pass token to next\n- Continuous token circulation\n\n**Advantages:**\n✓ Simple\n✓ No starvation (everyone gets turn)\n✓ Fair\n\n**Disadvantages:**\n✗ Token can be lost\n✗ Latency (must wait for token to circulate)\n✗ If process crashes with token, system halts\n\n**Token Loss Detection:**\n- Timeout\n- Regenerate token (carefully!)\n\n---\n\n**5. QUORUM-BASED ALGORITHM**\n\n**How It Works:**\n- Don't need permission from everyone\n- Request permission from a **quorum** (subset) of processes\n- Quorums must overlap (any two quorums share at least one process)\n\n**Example:**\n- N = 5 processes\n- Quorum size = 3\n- Request permission from any 3\n\n**Advantages:**\n✓ Fewer messages than Lamport/Ricart-Agrawala\n✓ More fault-tolerant (don't need all processes)\n✓ Scalable\n\n**Disadvantages:**\n✗ More complex\n✗ Must choose quorum size carefully\n\n---\n\n**COMPARISON:**\n\n| Algorithm | Messages/Entry | Fault Tolerance | Fairness |\n|-----------|----------------|-----------------|----------|\n| Centralized | 3 | Poor (coordinator failure) | Fair |\n| Lamport | 2(N-1) | Poor (any failure blocks) | Fair |\n| Ricart-Agrawala | N-1 | Poor (any failure blocks) | Fair |\n| Token Ring | 1 to N | Poor (token loss) | Fair |\n| Quorum | Depends on quorum size | Good | Fair |\n\n---\n\n**TRADEOFFS:**\n\n**Message Overhead:**\n- Centralized: Low\n- Token: Low\n- Quorum: Medium\n- Lamport/Ricart: High\n\n**Fault Tolerance:**\n- Quorum: Best\n- Lamport/Ricart/Token/Centralized: Poor\n\n**Fairness:**\n- All: Generally fair\n\n**Complexity:**\n- Centralized/Token: Simple\n- Ricart/Lamport: Moderate\n- Quorum: Complex\n\nEach algorithm balances **message overhead, fault tolerance, and fairness** differently!",
      },
    ],
  },
  {
    id: 12,
    unit: "Design Issues & LRPC",
    title: "Question Twelve [20 Marks]",
    subQuestions: [
      {
        id: "i",
        question:
          "What are the design issues of distributed operating system? [10 Marks]",
        points: [
          "Transparency",
          "Reliability",
          "Performance",
          "Scalability",
          "Security",
        ],
        answer:
          "**Design Issues of Distributed Operating Systems:**\n\n1. **Transparency**\n   - Hide distribution details\n   - Location, migration, replication\n   - Concurrency transparency\n\n2. **Reliability**\n   - Fault tolerance\n   - Replication strategies\n   - Failure recovery\n\n3. **Performance**\n   - Reduce communication\n   - Use caching\n   - Load balancing\n\n4. **Scalability**\n   - Avoid centralized services\n   - Decentralization\n   - Handle growth\n\n5. **Security**\n   - Secure communication\n   - Access control\n   - Authentication/Authorization\n\n6. **Heterogeneity**\n   - Support mixed hardware/OS\n   - Data format compatibility\n   - Standard interfaces\n\n7. **Openness**\n   - Standard interfaces\n   - Allow interoperability\n   - Extensibility",
      },
      {
        id: "ii",
        question:
          "Explain in detail light weight Remote Procedure call [10 Marks]",
        points: [
          "LRPC purpose",
          "Shared memory",
          "Handoff scheduling",
          "Domain switching",
          "Performance",
        ],
        answer:
          "**Lightweight RPC (LRPC):**\n\n**Purpose:**\nOptimized RPC for calls **within the same machine** but across protection domains.\n\n**Why Much Faster:**\n\n1. **Shared Memory**\n   - Uses shared memory to pass arguments\n   - Avoids copying data\n   - Direct memory access\n\n2. **Handoff Scheduling**\n   - Client thread becomes server thread\n   - No context switch between threads\n   - Direct execution transfer\n\n3. **Domain Switching**\n   - Replaces network communication\n   - Simple kernel-mediated transfer\n   - Secure domain crossing\n\n4. **Inline Argument Passing**\n   - Avoids marshaling for small parameters\n   - Direct parameter access\n   - Reduced overhead\n\n**Benefits:**\n- 3x faster than traditional RPC\n- Keeps RPC programming model\n- Significantly reduced overhead\n- Ideal for same-machine calls\n\n**Use Case:**\nLocal inter-process communication with protection domain separation.",
      },
    ],
  },
  // Additional Past Paper Questions
  {
    id: 13,
    unit: "Fundamentals",
    title: "Question Thirteen [20 Marks]",
    subQuestions: [
      {
        id: "a",
        question:
          "Define a Distributed System. Give two real-world examples. [4 Marks]",
        points: ["Definition", "Characteristics", "Examples"],
        answer:
          "**Distributed System Definition:**\n\nA distributed system is a **collection of independent computers** that appear to users as a **single unified system** and coordinate their actions through **message passing**.\n\n**Key Characteristics:**\n1. Multiple autonomous computers\n2. Connected by a network\n3. Appear as one system to users\n4. Coordinate via messages (no shared memory)\n5. Work together to achieve a common goal\n\n---\n\n**Real-World Examples:**\n\n**1. ATM Banking Networks:**\n- ATMs across the country connected\n- Users access their account from any ATM\n- Distributed database of accounts\n- Appears as one unified banking system\n- Transactions coordinated across multiple servers\n\n**2. Google's Distributed Search Servers:**\n- Thousands of servers worldwide\n- Search queries distributed across many machines\n- Results aggregated from multiple sources\n- Users see single search interface\n- Massive scale, high availability\n\n**Other Examples:**\n- Cloud storage (Dropbox, Google Drive)\n- Content Delivery Networks (CDN)\n- Social media platforms (Facebook, Twitter)\n- E-commerce websites (Amazon)\n- Distributed databases (Cassandra, MongoDB)",
      },
      {
        id: "b",
        question:
          "Differentiate between tightly coupled and loosely coupled systems. [4 Marks]",
        points: [
          "Tightly coupled characteristics",
          "Loosely coupled characteristics",
          "Comparison",
        ],
        answer:
          "**TIGHTLY COUPLED SYSTEMS:**\n\n**Characteristics:**\n- **Shared memory** between processors\n- **Low latency** communication\n- **Same physical machine** (multiprocessor system)\n- Synchronous communication\n- High degree of coordination\n\n**Examples:**\n- Multi-core processors\n- Symmetric multiprocessing (SMP) systems\n- Parallel computers with shared memory\n\n**Advantages:**\n+ Very fast communication\n+ Easy to share data\n+ Strong consistency\n\n**Disadvantages:**\n- Limited scalability\n- Expensive hardware\n- Single point of failure\n\n---\n\n**LOOSELY COUPLED SYSTEMS:**\n\n**Characteristics:**\n- **Private memory** for each computer\n- Communicate via **message passing**\n- Connected over a **network**\n- Independent processors\n- Asynchronous communication\n\n**Examples:**\n- Distributed systems\n- Client-server systems\n- Cloud computing systems\n\n**Advantages:**\n+ High scalability\n+ Geographic distribution possible\n+ Fault tolerant (one failure doesn't stop system)\n+ Inexpensive (commodity hardware)\n\n**Disadvantages:**\n- Slower communication (network latency)\n- More complex programming\n- Weaker consistency\n\n---\n\n**COMPARISON:**\n\n| Aspect | Tightly Coupled | Loosely Coupled |\n|--------|-----------------|------------------|\n| **Memory** | Shared | Private (distributed) |\n| **Communication** | Direct memory access | Message passing |\n| **Latency** | Low (nanoseconds) | High (milliseconds) |\n| **Location** | Same machine | Different machines |\n| **Scalability** | Limited | High |\n| **Cost** | Expensive | Inexpensive |\n| **Fault Tolerance** | Low | High |\n| **Examples** | Multi-core CPU | Internet services |",
      },
      {
        id: "c",
        question:
          "Explain the concept of transparency in distributed systems and list four types. [4 Marks]",
        points: [
          "Transparency concept",
          "Access transparency",
          "Location transparency",
          "Migration transparency",
          "Failure transparency",
        ],
        answer:
          "**Transparency Concept:**\n\n**Transparency** means **hiding the complexities of distribution** so the system appears to users as a **single, centralized system**.\n\n**Goal:** Users and applications should not need to know:\n- Where resources are located\n- How many copies exist\n- Whether resources are local or remote\n- When failures occur or resources move\n\n---\n\n**Four Types of Transparency:**\n\n**1. ACCESS TRANSPARENCY:**\n\n**Definition:** Hide differences in data representation and how resources are accessed\n\n**Benefit:**\n- Same operations work locally and remotely\n- No special syntax for remote access\n\n**Example:**\n- File access: `open(\"/shared/file.txt\")` works whether file is local or remote\n- User doesn't need different commands\n\n---\n\n**2. LOCATION TRANSPARENCY:**\n\n**Definition:** Hide the physical location of resources\n\n**Benefit:**\n- Access resources by name, not location\n- Don't need to know which server hosts resource\n\n**Example:**\n- URL: `http://example.com/page.html`\n- User doesn't know which physical server serves the page\n- Could be Server A or Server B\n\n---\n\n**3. MIGRATION TRANSPARENCY:**\n\n**Definition:** Hide that resources can move between locations\n\n**Benefit:**\n- Resources can be relocated without affecting users\n- System can optimize placement\n\n**Example:**\n- File moved from Server1 to Server2\n- Path `/shared/docs/report.pdf` still works\n- Users unaware of the move\n\n---\n\n**4. FAILURE TRANSPARENCY:**\n\n**Definition:** Hide failures and recovery of resources\n\n**Benefit:**\n- System continues working despite component failures\n- Automatic recovery\n\n**Example:**\n- Server crashes, backup takes over\n- User's request completes (maybe with slight delay)\n- User doesn't see error message\n\n---\n\n**Other Types (for reference):**\n- **Replication Transparency:** Hide that multiple copies exist\n- **Concurrency Transparency:** Hide that multiple users access same resource\n- **Performance Transparency:** Hide performance variations\n- **Scalability Transparency:** Hide system growth\n\n**Summary:** Transparency makes distributed systems easier to use by hiding distributed nature from users!",
      },
      {
        id: "d",
        question:
          "What is remote procedure call (RPC)? How does it differ from local procedure calls? [4 Marks]",
        points: ["RPC definition", "Differences from local calls"],
        answer:
          "**Remote Procedure Call (RPC):**\n\n**Definition:**\nRPC allows a program to **invoke a function on a remote machine** as if it were a **local call**.\n\n**Goal:** Make distributed programming look like normal programming\n\n**How It Works:**\n1. Client calls function (looks normal)\n2. Client stub marshals parameters\n3. Message sent over network\n4. Server stub receives and unmarshals\n5. Server executes procedure\n6. Result sent back\n7. Client receives result\n\n---\n\n**Key Differences from Local Procedure Calls:**\n\n**1. NETWORK COMMUNICATION**\n\n**Local:**\n- Direct function jump within same process\n- No network involved\n\n**RPC:**\n- Requires network communication\n- Data serialization (marshaling)\n- Message transmission\n\n---\n\n**2. LATENCY**\n\n**Local:**\n- Very fast (nanoseconds)\n- Direct memory access\n\n**RPC:**\n- Much slower (milliseconds)\n- 100-1000x slower than local calls\n- Network delay dominates\n\n---\n\n**3. FAILURE MODES**\n\n**Local:**\n- Only fails if process crashes\n- Deterministic behavior\n\n**RPC:**\n- Network can fail\n- Server can crash\n- Timeout issues\n- Message loss\n- Many more failure scenarios\n\n---\n\n**4. PARAMETER PASSING**\n\n**Local:**\n- Can pass by value or reference\n- Pointers work (shared address space)\n\n**RPC:**\n- Primarily call-by-value\n- Pointers don't work (no shared memory)\n- Must serialize complex data structures\n\n---\n\n**5. DATA REPRESENTATION**\n\n**Local:**\n- No conversion needed\n- Same machine format\n\n**RPC:**\n- Must handle different architectures\n- Byte order (endianness)\n- Data type sizes may differ\n- Marshaling/unmarshaling required\n\n---\n\n**COMPARISON TABLE:**\n\n| Aspect | Local Call | RPC |\n|--------|-----------|-----|\n| **Speed** | Nanoseconds | Milliseconds |\n| **Failure** | Process crash only | Network, server, timeout |\n| **Parameters** | Value or reference | Mainly value |\n| **Address Space** | Shared | Separate machines |\n| **Complexity** | Simple | Complex (marshaling, stubs) |\n| **Reliability** | Deterministic | Non-deterministic |\n\n**Summary:** RPC **tries to make remote calls look local**, but fundamental differences mean **perfect transparency is impossible**.",
      },
      {
        id: "e",
        question:
          "State two advantages and two challenges of distributed systems. [4 Marks]",
        points: [
          "Resource sharing",
          "Scalability",
          "Security challenges",
          "Complexity",
        ],
        answer:
          "**TWO ADVANTAGES:**\n\n**1. RESOURCE SHARING:**\n\n**Benefit:**\n- Multiple users can share expensive resources\n- Better utilization\n- Cost-effective\n\n**Examples:**\n- Shared printers in office network\n- Shared databases across organization\n- Cloud computing resources\n- Distributed file systems\n\n**Impact:**\n- Don't need to buy resources for each user\n- Access resources from anywhere\n- Collaboration easier\n\n---\n\n**2. SCALABILITY:**\n\n**Benefit:**\n- Easy to add more machines to increase capacity\n- Handle growing workloads\n- Incremental growth\n\n**Examples:**\n- Add more web servers as traffic increases\n- Cloud services scale automatically\n- Distribute load across many nodes\n\n**Impact:**\n- System grows with demand\n- No need to replace entire system\n- Cost-effective scaling\n\n---\n\n**TWO CHALLENGES:**\n\n**1. SECURITY ISSUES:**\n\n**Problem:**\n- Data travels over untrusted networks\n- Multiple entry points for attacks\n- No central security control\n\n**Issues:**\n- Eavesdropping on network traffic\n- Unauthorized access\n- Data tampering\n- Denial-of-service attacks\n\n**Example:**\n- Sensitive data intercepted on network\n- Hackers attack vulnerable servers\n\n**Why Harder:**\n- Larger attack surface\n- More components = more vulnerabilities\n- Must secure communication and storage\n\n---\n\n**2. INCREASED SYSTEM COMPLEXITY:**\n\n**Problem:**\n- More components to manage\n- Harder to design, implement, test\n- More failure modes\n\n**Issues:**\n- Network failures\n- Partial system failures\n- Synchronization challenges\n- Debugging is difficult\n\n**Example:**\n- Bug appears only under specific network conditions\n- Hard to reproduce failures\n- Coordinating updates across machines\n\n**Why Harder:**\n- No single point of control\n- Asynchronous operations\n- Concurrency issues\n- Distributed state management\n\n---\n\n**SUMMARY:**\n\n| Category | Description |\n|----------|-------------|\n| **Advantages** | Resource sharing, Scalability |\n| **Challenges** | Security, Complexity |\n\n**Trade-off:** Distributed systems offer powerful benefits but require careful design to address security and complexity challenges!",
      },
    ],
  },
  {
    id: 14,
    unit: "Architecture",
    title: "Question Fourteen [30 Marks]",
    subQuestions: [
      {
        id: "a",
        question:
          "With the help of a diagram, explain the Client-Server Architecture in distributed systems. [10 Marks]",
        points: [
          "Client-server model",
          "Request-response pattern",
          "Components",
        ],
        image: "/zcas-distributed-systems-app/csa.jpg",
        answer:
          "**Client-Server Architecture:**\n\nClients (users or apps) send requests over a network to a server, which processes the request and returns a result.\n\n**Diagram:**\n```\n┌─────────────┐         Network         ┌─────────────┐\n│   CLIENT    │ ───────Request────────> │   SERVER    │\n│             │                         │             │\n│ • User UI   │ <──────Response──────── │ • Business  │\n│ • Display   │                         │   Logic     │\n│             │                         │ • Data      │\n└─────────────┘                         └─────────────┘\n```\n\n**Components:**\n- **Client** handles the user interface\n- **Server** handles business logic and data\n- **Network** connects them\n\n**Example:** A browser (client) connecting to a web server",
      },
      {
        id: "b",
        question:
          "Compare 2-tier and 3-tier architectures with examples. [10 Marks]",
        points: ["2-tier architecture", "3-tier architecture", "Comparison"],
        answer:
          "**2-TIER ARCHITECTURE:**\n\n**Structure:**\n- Client connects directly to database\n- Business logic partly on client\n\n**Advantages:**\n+ Simple to implement\n+ Fast for small systems\n\n**Disadvantages:**\n- Less secure (client has direct DB access)\n- Harder to scale\n- Business logic scattered\n\n**Example:** Desktop application → Database\n\n---\n\n**3-TIER ARCHITECTURE:**\n\n**Structure:**\n1. **Presentation Tier** - User interface\n2. **Application Tier** - Business logic\n3. **Data Tier** - Database\n\n**Advantages:**\n+ More scalable\n+ Better security (DB isolated)\n+ Easier to maintain\n+ Centralized business logic\n\n**Disadvantages:**\n- More complex\n- Higher development cost\n\n**Example:** Web browser → Application server → Database",
      },
      {
        id: "c",
        question:
          "Draw a UML Deployment Diagram showing a distributed E-Learning System with the following components: i. A central server ii. Two databases (for courses and students) [10 Marks]",
        points: ["UML deployment diagram", "System components", "Connections"],
        answer:
          "**E-Learning System Deployment Diagram:**\n\n```\n┌─────────────────────────────────────────────────┐\n│              Client Devices                     │\n│  ┌──────────┐  ┌──────────┐  ┌──────────┐     │\n│  │ Browser  │  │ Mobile   │  │ Tablet   │     │\n│  │          │  │ App      │  │ App      │     │\n│  └────┬─────┘  └────┬─────┘  └────┬─────┘     │\n└───────┼─────────────┼─────────────┼───────────┘\n        │             │             │\n        └─────────────┼─────────────┘\n                      │ HTTP/HTTPS\n                      ▼\n         ┌────────────────────────┐\n         │  Application Server    │\n         │  (Central Server)      │\n         │  • Business Logic      │\n         │  • Authentication      │\n         │  • Session Management  │\n         └──────┬──────────┬──────┘\n                │          │\n                │ SQL      │ SQL\n                ▼          ▼\n       ┌────────────┐  ┌────────────┐\n       │  Course    │  │  Student   │\n       │  Database  │  │  Database  │\n       │            │  │            │\n       │ • Courses  │  │ • Users    │\n       │ • Content  │  │ • Grades   │\n       │ • Materials│  │ • Progress │\n       └────────────┘  └────────────┘\n```\n\n**Components:**\n1. **Clients** - Students/instructors access via browser/mobile\n2. **Central Application Server** - Runs main system logic\n3. **Course Database** - Stores course information\n4. **Student Database** - Stores student information\n\n**Connections:**\n- HTTP/HTTPS between clients and server\n- SQL connections between server and databases",
      },
    ],
  },
  {
    id: 15,
    unit: "Communication & Time",
    title: "Question Fifteen [30 Marks]",
    subQuestions: [
      {
        id: "a",
        question:
          "Explain the difference between synchronous and asynchronous communication in distributed systems, giving examples of each. [5 Marks]",
        points: [
          "Synchronous communication",
          "Asynchronous communication",
          "Examples",
        ],
        answer:
          "**Synchronous Communication:**\n- Sender **waits** for receiver before continuing\n- Blocking operation\n- Direct coupling between sender and receiver\n\n**Examples:**\n- RPC (Remote Procedure Call)\n- Phone call\n- Client-server request/reply\n\n---\n\n**Asynchronous Communication:**\n- Sender sends message and **continues** without waiting\n- Non-blocking operation\n- Loose coupling\n\n**Examples:**\n- Email\n- Message queues\n- Publish-subscribe systems\n\n**Key Difference:** Synchronous blocks the sender; asynchronous allows concurrent work",
      },
      {
        id: "b",
        question:
          "With the help of a diagram, explain how message passing works in distributed systems. [10 Marks]",
        points: [
          "Send operation",
          "Receive operation",
          "Message flow",
          "Diagram",
        ],
        image: "/zcas-distributed-systems-app/mp.jpg",
        answer:
          "**Message Passing Mechanism:**\n\nProcesses communicate by explicitly sending and receiving messages using **send()** and **receive()** primitives.\n\n**Diagram:**\n```\nProcess A (Sender)        Network          Process B (Receiver)\n      |                      |                    |\n      | 1. Prepare message   |                    |\n      |                      |                    |\n      | 2. send(msg)         |                    |\n      |─────────────────────>|                    |\n      |                      |                    |\n      | 3. Continue/Wait     | 4. Transmit        |\n      |                      |───────────────────>|\n      |                      |                    |\n      |                      |         5. receive(msg)\n      |                      |                    |\n      |                      |         6. Process message\n```\n\n**Steps:**\n1. **Process A** prepares message\n2. Calls **send(msg)** to transmit\n3. Message enters network\n4. Network delivers message\n5. **Process B** calls **receive(msg)**\n6. Process B processes the message\n\n**Key Points:**\n- Explicit communication (not shared memory)\n- Messages contain data to transfer\n- Network handles delivery\n- Processes must coordinate send/receive",
      },
      {
        id: "c",
        question:
          "Describe the Lamport Logical Clock algorithm. Show with an example how events are ordered across processes. [10 Marks]",
        points: ["Logical clocks concept", "Lamport rules", "Example ordering"],
        answer:
          "**Lamport Logical Clock Algorithm:**\n\nProvides a way to order events in a distributed system without physical clocks.\n\n**Rules:**\n\n1. **Before each event:** Increment local clock\n   - C = C + 1\n\n2. **Sending message:** Stamp message with current clock value\n   - send(msg, C)\n\n3. **Receiving message:** Update clock to maximum\n   - C = max(local_clock, received_timestamp) + 1\n\n---\n\n**Example:**\n\n```\nProcess P1:              Process P2:\nC1 = 0                   C2 = 0\n│                        │\n├─ Event A (C1=1)        │\n│                        │\n├─ Send msg to P2        │\n│   timestamp=1          │\n│                        │\n│                        ├─ Receive msg\n│                        │   C2 = max(0,1)+1 = 2\n│                        │\n│                        ├─ Event B (C2=3)\n│                        │\n│                        ├─ Send msg to P1\n│                        │   timestamp=3\n│                        │\n├─ Receive msg           │\n│   C1 = max(1,3)+1 = 4  │\n│                        │\n├─ Event C (C1=5)        │\n```\n\n**Event Ordering:**\n- Event A: timestamp 1\n- P2 receives: timestamp 2\n- Event B: timestamp 3\n- P1 receives: timestamp 4\n- Event C: timestamp 5\n\n**Happened-Before Relation:**\n- A (1) → B (3) because message sent from P1 to P2\n- B (3) → C (5) because message sent from P2 to P1\n\n**Benefit:** Can order events without synchronized physical clocks",
      },
      {
        id: "d",
        question:
          "Why is clock synchronization important in distributed systems? [5 Marks]",
        points: [
          "Event ordering",
          "Log consistency",
          "Security",
          "Transactions",
        ],
        answer:
          "**Importance of Clock Synchronization:**\n\n1. **Correctly Order Events**\n   - Determine causality between operations\n   - Essential for debugging and understanding system behavior\n\n2. **Keep Logs Consistent**\n   - Merge logs from different machines in correct order\n   - Troubleshooting and auditing\n\n3. **Validate Time-Based Security**\n   - Authentication tokens have expiration times\n   - Certificates have validity periods\n   - Prevent replay attacks\n\n4. **Maintain Correct Behavior in Transactions**\n   - Timestamp-based concurrency control\n   - Ensure transaction ordering\n   - Prevent conflicts\n\n5. **Distributed Algorithms**\n   - Lease expiration\n   - Cache coherence\n   - Timeout mechanisms\n\nWithout synchronized clocks, these critical functions would fail or produce incorrect results.",
      },
    ],
  },
  {
    id: 16,
    unit: "Fault Tolerance",
    title: "Question Sixteen [20 Marks]",
    subQuestions: [
      {
        id: "a",
        question:
          "What is fault tolerance in distributed systems? Explain two techniques used to achieve it. [10 Marks]",
        points: ["Fault tolerance definition", "Replication", "Checkpointing"],
        answer:
          "**Fault Tolerance:**\n\nA distributed system's ability to **keep working even when some parts fail**.\n\n---\n\n**Two Common Techniques:**\n\n**1. REPLICATION:**\n\n**Concept:**\n- Keep multiple copies of servers or data\n- If one fails, another takes over\n- Provides redundancy\n\n**Types:**\n- **Active Replication:** All replicas process requests simultaneously\n- **Passive Replication:** Primary processes, backups standby\n\n**Example:**\n- Primary database with read replicas\n- If primary fails, a replica is promoted\n\n**Benefits:**\n+ High availability\n+ Automatic failover\n+ No single point of failure\n\n---\n\n**2. CHECKPOINTING:**\n\n**Concept:**\n- Save the state of a process regularly\n- If it crashes, restart from last saved state\n- Don't start over from beginning\n\n**Process:**\n1. Periodically save process state to stable storage\n2. On failure, restore from latest checkpoint\n3. Replay operations since checkpoint\n\n**Example:**\n- Database transaction logs\n- Save every 5 minutes\n- On crash, restore from checkpoint + replay log\n\n**Benefits:**\n+ Faster recovery\n+ Reduced work loss\n+ Simpler than full replication\n\n**Disadvantage:**\n- Still some work lost (since last checkpoint)",
      },
      {
        id: "b",
        question:
          "A bank implements a distributed transaction system for handling money transfers between branches. Draw a UML Sequence Diagram to illustrate how a transaction is initiated, processed, and confirmed across multiple servers. [10 Marks]",
        points: [
          "Two-phase commit",
          "Coordinator role",
          "Prepare phase",
          "Commit phase",
        ],
        answer:
          "**UML Sequence Diagram for Distributed Bank Transfer:**\n\nUsing **Two-Phase Commit (2PC)** protocol to ensure atomicity:\n\n```\nClient    Coordinator    Branch A    Branch B\n  |            |              |            |\n  |─Transfer───>|              |            |\n  | Request    |              |            |\n  |            |              |            |\n  |            |──Prepare?───>|            |\n  |            |              |            |\n  |            |<────Yes──────|            |\n  |            |              |            |\n  |            |──Prepare?────────────────>|\n  |            |              |            |\n  |            |<────Yes──────────────────┤\n  |            |              |            |\n  |            |───Commit────>|            |\n  |            |              |            |\n  |            |───Commit─────────────────>|\n  |            |              |            |\n  |            |<──ACK────────|            |\n  |            |              |            |\n  |            |<──ACK────────────────────┤\n  |            |              |            |\n  |<──Success──|              |            |\n  |            |              |            |\n```\n\n**Steps:**\n\n**Phase 1 - PREPARE:**\n1. Client requests transfer to Coordinator\n2. Coordinator sends **Prepare?** to Branch A\n3. Branch A checks if transfer possible, reserves funds, replies **Yes**\n4. Coordinator sends **Prepare?** to Branch B\n5. Branch B checks if can receive, replies **Yes**\n\n**Phase 2 - COMMIT:**\n6. If all branches vote Yes, Coordinator sends **Commit** to both\n7. Branch A deducts money\n8. Branch B adds money\n9. Both branches send **Acknowledgment**\n10. Coordinator tells Client: **Transfer successful**\n\n**Key Properties:**\n- **Atomicity:** Both branches commit together or abort together\n- **Consistency:** Money not lost or duplicated\n- **Coordinator ensures** all-or-nothing behavior\n\n**If Any Branch Votes No:**\n- Coordinator sends **Abort** to all\n- Transaction cancelled\n- System remains consistent",
      },
    ],
  },
];
