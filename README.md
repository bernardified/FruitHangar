# A Fruit _HANGAR_ POS System

A full-stack Point of Sale (POS) application. This system manages the end-to-end lifecycle of fruit inventory and customer orders.

---

## 🚀 Technical Architecture

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS + DaisyUI
- **Icons:** Lucide-React
- **Backend:** Node.js, Express, MongoDB
- **Communication:** Axios

---

## 📋 Implemented User Stories

### 🔹 Customer: Inventory Discovery
> *“As a customer, I want to see a list of fruits that are available to buy (complete with stock and pricing information), so that I can decide which fruits I want to buy.”*
- **Implementation:** Responsive grid layout in `HomePage.tsx`.

### 🔹 Customer: Cart & Financial Tracking
> *“As a customer, I want to keep track of the fruits and quantity that I have shortlisted (including the total amount I need to pay), so that I can adjust my purchasing decisions as I shop.”*
- **Implementation:** `CartDrawer` component using a centralized state pattern and real-time calculation of `totalAmount` reflected in the **NavBar** 

### 🔹 Customer: Order Submission
> *“As a customer, I want to submit my order of the fruits I selected, so that I can complete my purchase when I am done shopping.”*
- **Implementation:** `POST` request mapping `CartItem` objects to the `Order` schema.

### 🔹 Owner: Fulfillment Dashboard
> *“As an owner, I want to see the orders that my customers have submitted, so that I can fulfill their orders.”*
- **Implementation:** Protected `OrdersPage` with a tabular view.

---

## 🔐 Access Control (RBAC)

Role management (`'CUSTOMER' | 'OWNER'`) access is toggled via a **Profile Dropdown** in the NavBar:
- **Role Guarding:** The Admin Dashboard is logically and physically hidden from the Customer view.
