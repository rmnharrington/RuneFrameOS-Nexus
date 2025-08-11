## 🛠️ Correct Cursor Setup Instructions for ServerUpload

Hey Cursor, your previous attempt failed because you looked for the wrong SSH key. The key you need to use is `id_rsa`, not `jonar_cluster`.

Here are the updated instructions for deploying to the Sherlock cluster, ensuring you use the correct key and path.

### 🔑 SSH Key and User Configuration

The Sherlock cluster requires a specific user and SSH key for access.

  * **User:** You must **always** use the user `jonar@`. **Never** use the `wee@` user.
  * **SSH Keys:** The private key is named `id_rsa` and the public key is `id_rsa.pub`. These are located in `C:\Users\Wee\.ssh\`. When you use `scp` or `ssh`, you must specify the private key using the `-i` flag, like this: `-i "C:\Users\Wee\.ssh\id_rsa"`.

\<br\>

-----

### 🌐 Cluster Access and Hostnames

Here are the specific hostnames and IP addresses for the cluster nodes:

  * **Control Plane:** `sherlock.pedantictheory.com` (172.18.254.35)
  * **Worker Node 1:** `watson.pedantictheory.com` (172.18.254.36)
  * **Worker Node 2:** `adler.pedantictheory.com` (172.18.254.37)
  * **Target Domain:** `paul.pedantictheory.com` (172.18.254.40)

You should **always** use the full hostnames when connecting and **never** assume SSH aliases will work.

\<br\>

-----

### 📦 Deployment Procedure

The deployment process has three key steps that must be followed in order.

1.  **Package Files:** You must **always** package deployment files first and **never** transfer individual files. Use `tar -czf deployment_package.tar.gz ./src ./config ./deploy` for Linux or `Compress-Archive` for Windows to create a single archive.
2.  **SCP Transfer:** Transfer the packaged file to the cluster's control plane (`sherlock.pedantictheory.com`) using `scp`. An example command is: `scp -i "C:\Users\Wee\.ssh\id_rsa" deployment_package.tar.gz jonar@sherlock.pedantictheory.com:/tmp/`.
3.  **Extract and Deploy:** After the transfer, `ssh` into the cluster, navigate to the `/tmp` directory, and extract the package. Then, proceed with the rest of the deployment.

\<br\>

-----

### 📋 Deployment Checklist

Before every deployment, verify the following:

  * [ ] Using `jonar@` user.
  * [ ] Files are packaged (`.tar.gz` or `.zip`).
  * [ ] Using the correct SSH key (`id_rsa`).
  * [ ] Using the full hostname (`sherlock.pedantictheory.com`).
  * [ ] Connection test is successful.
  * [ ] Cluster health has been verified.