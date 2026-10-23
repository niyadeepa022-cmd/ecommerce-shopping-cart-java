# ecommerce-shopping-cart-java
E-Commerce Shopping Cart using Java and Data Structures

## 1. Project Overview
- This project is an **E-Commerce Shopping Cart and Recently Viewed Products Engine** developed using Java and fundamental data structures.
- It simulates the basic operations of an online shopping application, allowing users to manage shopping cart items, update product quantities, calculate checkout totals, and track recently viewed products.
- The project also includes a web-based shopping interface named **Cartify**, developed using HTML, CSS, and JavaScript.
- The main objective is to demonstrate how data structures can be applied to solve real-world problems in e-commerce applications.

## 2. Objectives of the Project
- To implement shopping cart operations using Java.
- To understand the practical applications of linear and hash-based data structures.
- To maintain a recently viewed products history efficiently.
- To prevent duplicate entries where required.
- To calculate product prices, quantities, and checkout totals.
- To develop a user-friendly shopping website for demonstrating e-commerce features.
- To understand the relationship between data structures and real-world software applications.

## 3. Data Structures Used

### a) ArrayDeque
- `ArrayDeque` is used to maintain the recently viewed products history.
- It acts as a stack, following the **Last-In, First-Out (LIFO)** principle.
- Whenever a product is viewed, it is placed at the top of the history.
- The project maintains a maximum of five recently viewed products, removing older entries when necessary.
- It provides efficient insertion and removal operations at the ends.

### b) HashSet
- `HashSet` is used to store product search tags and prevent duplicate entries.
- It supports efficient average-case search, insertion, and deletion operations, generally taking O(1) time.
- This helps demonstrate how hash-based data structures improve lookup efficiency.
- Note: HashSet does not maintain elements in a guaranteed order.

### c) ArrayDeque and HashSet in Practical Applications
- These collections demonstrate how data structures can manage browsing history and product-related information efficiently.
- They reduce the need for complicated manual data management and make the application easier to maintain.

### d) Arrays and Lists
- Arrays and list-based collections can be used to store product information and maintain shopping cart entries, depending on the implementation.
- They allow the program to access product details and process cart items during calculations.
- The exact collection used for the cart should be identified from the Java source code.

## 4. Main Features
- **Product Management:** Displays products with names, categories, descriptions, and prices.
- **Add to Cart:** Allows users to add products to the shopping cart.
- **Quantity Management:** Increases or decreases the quantity of selected products.
- **Remove Items:** Removes individual products or clears the entire cart.
- **Price Calculation:** Calculates the subtotal, delivery charges, and final amount.
- **Recently Viewed Products:** Displays the five most recently viewed products.
- **Search and Filtering:** Enables product searches and filtering by categories.
- **Data Persistence:** The website uses browser local storage to retain cart items and browsing history.
- **Checkout Simulation:** Displays an order summary and simulates order confirmation without collecting real payments.

## 5. Technologies Used
- **Java:** Implements the command-line application and demonstrates data structures.
- **Java Collections Framework:** Provides collections such as ArrayDeque and HashSet.
- **HTML5:** Structures the shopping website.
- **CSS3:** Provides styling, layout, and responsive design.
- **JavaScript:** Implements product search, cart operations, price calculations, and recently viewed history.
- **Browser Local Storage:** Saves website cart and browsing-history data locally.
- **Git and GitHub:** Used for source-code management and project hosting.

## 6. Software Requirements
- Java Development Kit (JDK) installed on the computer.
- A text editor or Java IDE, such as Notepad, VS Code, IntelliJ IDEA, or Eclipse.
- A modern web browser such as Chrome, Edge, or Firefox.
- A GitHub account for hosting the project repository.
- No external database or Java framework is required for the Java application described in the project abstract.

## 7. How to Compile and Run the Java Program

1. Install the JDK and verify that Java is available by opening Command Prompt or a terminal.
2. Execute the following commands to check the installation:

   ```bash
   java -version
   javac -version
   ```

3. Save the Java source code in a file whose name matches its public class name. For example, if the public class is `ShoppingCart`, save it as `ShoppingCart.java`.
4. Open Command Prompt or a terminal in the folder containing the Java file.
5. Compile the program using:

   ```bash
   javac ShoppingCart.java
   ```

6. If compilation succeeds, execute the program using:

   ```bash
   java ShoppingCart
   ```

7. Follow the instructions displayed in the command-line interface to test the available shopping cart and recently viewed products operations.

**Important:** Replace `ShoppingCart` with the actual public class name in your Java source file. If the source code uses a package, compile and run it using the appropriate package structure.

## 8. How to Run the Website

1. Download or clone the GitHub repository to your computer.
2. Ensure that `index.html`, `style.css`, and `script.js` are located in the same project folder.
3. Open `index.html` in a web browser.
4. Browse the products, use the search and category filters, and add products to the cart.
5. Test quantity changes, item removal, delivery calculations, checkout simulation, and recently viewed products.
6. Refresh the page to verify whether the browser has retained the saved cart and browsing history.

## 9. Expected Output
- The Java program provides a command-line simulation of e-commerce shopping cart operations, according to its implemented menu and functionality.
- The website displays a shopping interface containing products, a shopping cart, a price summary, and recently viewed products.
- Users can interact with the website and observe changes in product quantities, totals, and browsing history.
- Checkout is simulated for demonstration purposes; no real payment is processed.

## 10. Applications of the Project
- Demonstrates the use of data structures in e-commerce systems.
- Helps students understand stack operations, hashing, and collection management.
- Provides a basic model for shopping cart and browsing-history functionality.
- Can serve as a foundation for developing more advanced online shopping applications.
- Supports practical learning in Java programming, web development, and algorithmic problem-solving.

## 11. Limitations and Future Enhancements
- The project is a demonstration system and does not process real transactions.
- It does not include a real payment gateway, user authentication, or database-backed order management.
- The website stores information in the browser rather than a central database.
- Future versions could include user accounts, database integration, product recommendations, order tracking, inventory management, and secure payment processing.

## 12. Conclusion
- The E-Commerce Shopping Cart and Recently Viewed Products Engine demonstrates how fundamental data structures can support essential online shopping operations.
- ArrayDeque provides an efficient way to manage a limited browsing history, while HashSet demonstrates duplicate prevention and efficient hash-based lookups.
- The accompanying Cartify website provides an interactive interface for exploring products and testing shopping cart functionality.
- Overall, the project connects core Java concepts with practical web development and provides a useful foundation for understanding the design of modern e-commerce applications.
