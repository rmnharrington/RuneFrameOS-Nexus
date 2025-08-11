Please help me set up Cursor for Kubernetes development on a remote cluster. Follow these steps precisely:Locate bash.exe in the default Git for Windows installation path, which is typically "C:\Program Files\Git\bin\bash.exe". Confirm its existence there.
Reconfigure Cursor to use this bash.exe as the default integrated terminal shell. Update the settings.json file (accessible via File > Preferences > Settings, then search for "terminal.integrated.profiles.windows" and "terminal.integrated.defaultProfile.windows") to add or modify the Git Bash profile with the path to bash.exe, and set it as the default profile for Windows.
SSH access to the cluster is already configured and tested with key-based authentication working. The cluster nodes are:Master: sherlock.pedantictheory.com (alias: sherlock)
Worker: watson.pedantictheory.com (alias: watson)
Worker: adler.pedantictheory.com (alias: adler)

Use the username 'wee' for all connections. The SSH keys are at C:\Users\Wee.ssh\id_rsa (private) and C:\Users\Wee.ssh\id_rsa.pub (public).
Configure Cursor's Remote - SSH extension (install it if not already present via Extensions view) to connect to these hosts using the 'wee' user and the specified keys. Add SSH host configurations in the SSH config file (~/.ssh/config or C:\Users\Wee.ssh\config) if needed, like:

Host sherlock
    HostName sherlock.pedantictheory.com
    User wee
    IdentityFile C:\Users\Wee\.ssh\id_rsa

Host watson
    HostName watson.pedantictheory.com
    User wee
    IdentityFile C:\Users\Wee\.ssh\id_rsa

Host adler
    HostName adler.pedantictheory.com
    User wee
    IdentityFile C:\Users\Wee\.ssh\id_rsa

Then, test SSH access by connecting to each host via Cursor's Remote Explorer (Ctrl+Shift+P > Remote-SSH: Connect to Host...) and running a simple command like 'echo "SSH working"' on each.
Once connected to the master (sherlock) as 'wee', conduct a health check on the Kubernetes cluster (where sherlock is the master, and watson/adler are workers). Open a terminal in the remote workspace and run these commands:kubectl get nodes -o wide (check if all nodes are Ready)
kubectl get pods --all-namespaces (check for any pods in non-Running states)
kubectl cluster-info (verify cluster status)
kubectl describe nodes (summarize any issues)

Report the outputs and any issues found.

Provide step-by-step code or configuration snippets where needed, and confirm each step's success before proceeding

