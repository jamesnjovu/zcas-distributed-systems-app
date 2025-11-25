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
    question:
      "i. Describe various deadlock handling techniques [10 Marks]\nii. Explain the principles for designing scalable distributed systems. [10 Marks]",
    points: [
      "Deadlock prevention",
      "Deadlock avoidance",
      "Deadlock detection",
      "Scalability principles",
      "Avoiding centralization",
    ],
    answer:
      "i. Deadlock Handling Techniques:\n• Prevention – Break one of the four necessary conditions (e.g., avoid hold-and-wait, impose resource ordering).\n• Avoidance – Grant resources only if state remains safe (Banker’s algorithm).\n• Detection & Recovery – Allow deadlocks, detect cycles, then abort or preempt processes.\n• Distributed detection – Use probes across sites to detect distributed deadlocks.\n\nii. Scalability Principles:\n• Avoid centralized components – Single points of failure limit scaling.\n• Use decentralized algorithms – Decisions made locally scale better.\n• Partition and replicate data – Split large workloads and store multiple copies.\n• Use caching – Reduces remote queries and network load.\n• Minimize global operations – Avoid global locks or broadcasts.\n• Use asynchronous communication – Clients don’t block; improves throughput.",
  },
  {
    id: 11,
    unit: "Security & Mutual Exclusion",
    question:
      "i. Explain the security challenges of distributed systems. [10 Marks]\nii. Explain how mutual exclusion is handled in distributed system. [10 Marks]",
    points: [
      "Authentication",
      "Authorization",
      "Encryption",
      "Distributed mutual exclusion algorithms",
      "Token-based approaches",
    ],
    answer:
      "i. Security Challenges:\nDistributed systems face security issues because data moves across networks and there is no central authority.\nMain challenges include:\n• Authentication – Verifying identities over insecure networks.\n• Authorization – Enforcing permissions across multiple machines.\n• Confidentiality – Encrypting messages.\n• Integrity – Detecting message tampering.\n• Availability – Preventing DoS attacks.\n• Heterogeneity – Different systems and formats must interoperate securely.\n\nii. Mutual Exclusion in Distributed Systems:\nWithout shared memory or a single clock, algorithms rely on message passing.\nCommon approaches:\n• Centralized algorithm – A coordinator grants access. Simple but has a single point of failure.\n• Lamport’s Algorithm – Uses timestamps and REQUEST/REPLY/RELEASE messages; fully distributed.\n• Ricart-Agrawala – Requires permission from all nodes; fewer messages than Lamport.\n• Token Ring – A token circulates; the holder enters critical section.\n• Quorum-based – Request approval from a subset of nodes; reduces message cost.\nEach algorithm balances message overhead, fault tolerance, and fairness.",
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
    question:
      "a) Define a Distributed System. Give two real-world examples. [4 Marks]\nb) Differentiate between tightly coupled and loosely coupled systems. [4 Marks]\nc) Explain the concept of transparency in distributed systems and list four types. [4 Marks]\nd) What is remote procedure call (RPC)? How does it differ from local procedure calls? [4 Marks]\ne) State two advantages and two challenges of distributed systems. [4 Marks]",
    points: [
      "Distributed system definition",
      "Coupling types",
      "Transparency concept",
      "RPC basics",
      "Advantages and challenges",
    ],
    answer:
      "a) A distributed system is a collection of independent computers that appear to users as a single unified system and coordinate their actions through message passing. Examples include ATM banking networks and Google’s distributed search servers.\n\nb) Tightly coupled systems use shared memory, low latency communication, and operate in the same physical machine. Loosely coupled systems consist of independent computers with private memory communicating via message passing over a network, offering higher scalability and distribution.\n\nc) Transparency means hiding the complexities of distribution so the system appears centralized. Types include: access transparency, location transparency, migration transparency, and failure transparency.\n\nd) Remote Procedure Call (RPC) allows a program to invoke a function on a remote machine as if it were a local call. Unlike local calls, RPC requires network communication, data serialization, and has higher latency and additional failure modes.\n\ne) Advantages: resource sharing and scalability. Challenges: security issues and increased system complexity.",
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
