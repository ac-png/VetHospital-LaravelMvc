# VetHospital

### Server Folder: CA1

In this project, the folder named **`server`** is designated for **CA1**. This is the backend part of the application, built using **Express**.

### Server Folder: serverUpdated

The folder named **`serverUpdated`** contains an updated version of the backend, implemented after **CA1**. Adding user roles and multiple relationship types, while reducing the number of entities for easier management and testing.

### Client Folder: CA2

The folder named **`client`** is be designated for **CA2**. This is the frontend part of the application, built using **React Native**.

### User Authentication and Roles

**User Roles:**

- **Owner:** Basic user with no CRUD permissions (view-only).

- **Veterinarian & Admin:** Both have full CRUD permissions (create, read, update, delete).

Here are the default login credentials for the different user roles:

- **Owner**:
  - **Email**: `owner@example.com`
  - **Password**: `password123`
- **Veterinarian**:

  - **Email**: `vet@example.com`
  - **Password**: `password123`

- **Admin**:
  - **Email**: `admin@example.com`
  - **Password**: `password123`

These credentials can be used to log in via the login page or API.

#### Important Note:

Currently, there is **no registration feature** in the frontend to create new users. The backend registration functionality works, but users must be created manually or via backend tools (such as Postman or API requests). The credentials above are the only valid ones for logging into the frontend until the registration feature is added.
