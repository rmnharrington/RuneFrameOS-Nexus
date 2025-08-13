**Objective: Self-Diagnose and Remediate Terminal Interaction Stalls**

I have observed that your terminal operations are frequently stalling, requiring manual user intervention (pressing "Enter") to proceed. This indicates a potential flaw in your process management logic, specifically in how you execute commands and wait for their completion.

Your task is to enter a self-diagnostic mode to identify the root cause of this issue and then implement a more robust, self-recovering command execution handler to prevent future stalls.

**Phase 1: Self-Diagnostic Protocol**

Your goal in this phase is to understand *why* you are hanging. You need to become more verbose about your internal state.

1.  **Enable Verbose State Logging:** For the duration of this task, log every state transition and action you take. Prefix your logs with ``. For example:
    *   ` Entering command execution state.`
    *   ` Executing command: 'ls -la'`
    *   ` Now reading from stdout stream.`
    *   ` Detected command completion with exit code 0.`

2.  **Analyze Your Current Execution Method:** Before changing anything, describe your current process for running a terminal command. Answer these questions specifically:
    *   How do you determine that a command has finished executing?
    *   Are you reading from `stdout` and `stderr` in a blocking or non-blocking manner?
    *   What is your timeout mechanism, if any, for a command that produces no output?

3.  **Execute a Diagnostic Test Suite:** Run the following simple commands. Log your state meticulously through each one to pinpoint where the hanging occurs. Pay close attention to the transition from "running" to "finished."

    *   **Test 1 (Simple Output):** `echo "DIAGNOSTIC: Simple echo test"`
    *   **Test 2 (Silent Execution):** `sleep 3`
    *   **Test 3 (Continuous Output):** `for i in 1 2 3; do echo "DIAGNOSTIC: Stream output line $i"; sleep 1; done`
    *   **Test 4 (Error Output):** `ls /nonexistent_directory_for_error_test`

**Phase 2: Implement a Robust Command Executor**

Based on your findings, the likely root cause is blocking I/O or an improper check for process completion. You will now create a new, more resilient method for executing commands.

1.  **Design a `run_command_with_timeout` Function:** Create a new helper function or class that encapsulates command execution with the following features:
    *   **Subprocess Management:** It must spawn the command as a new subprocess.
    *   **Non-Blocking Stream Reading:** It must read from `stdout` and `stderr` in a non-blocking way, processing output as it becomes available without waiting for the streams to close.
    *   **Clear Completion Check:** The primary signal for command completion must be the process's exit code (`process.poll()` or a similar mechanism), **not** the end of the output streams.
    *   **Hard Timeout:** The function must accept a `timeout` parameter (e.g., 60 seconds). If the command does not complete within this duration, the function must forcefully terminate the subprocess, log a ` Timeout occurred. Terminating process.` message, and raise an exception.
    *   **Human Intervention Detection:** As a fail-safe, if you detect a newline character from user input while waiting for a command, log it as ` Manual intervention detected.` and re-evaluate the subprocess's state.

2.  **Refactor Your Logic:** Replace your previous command execution logic with this new, robust function for all subsequent terminal operations.

**Phase 3: Report Findings**

Produce a final Markdown report that includes:
1.  **Root Cause Analysis:** A summary of your findings from Phase 1. What was the specific technical reason for the hangs? (e.g., "The agent was blocking on `stdout.read()` and did not proceed until the stream was closed, which the interactive terminal shell was not doing.")
2.  **Solution Implementation:** A description of your new `run_command_with_timeout` function and a code snippet of its implementation.
3.  **Confirmation of Fix:** A concluding statement confirming that the new implementation will prevent hangs and eliminate the need for manual user intervention.
```