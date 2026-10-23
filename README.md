# ecommerce-shopping-cart-java
E-Commerce Shopping Cart using Java and Data Structures
# PROJECT DESCRIPTION
## E-Commerce Shopping Cart and Recently Viewed Products Engine Using Java Data Structures

### 1. Introduction
1. The **E-Commerce Shopping Cart and Recently Viewed Products Engine** is a Java-based application developed to demonstrate the practical use of data structures in online shopping systems.
2. The main purpose of this project is to manage products, maintain a shopping cart, calculate the total price, and track recently viewed products efficiently.
3. The project uses Java programming concepts and built-in collection classes to store, retrieve, and manage product information.
4. The system can be operated through a menu-driven console interface, allowing users to perform different shopping operations.

### 2. Objectives of the Project
1. To understand the practical application of data structures in e-commerce systems.
2. To allow users to view available products and search for products.
3. To provide options to add products to a shopping cart, update quantities, and remove items.
4. To maintain a history of recently viewed products.
5. To calculate the subtotal, delivery charge, and final payable amount.
6. To demonstrate how Java Collections Framework classes simplify data management.

### 3. Data Structures Used

**1. ArrayDeque**
- `ArrayDeque` is used to maintain the recently viewed products history.
- It supports efficient insertion and removal of elements at both ends.
- When a product is viewed, it is added to the beginning of the history.
- The history is limited to a fixed number of products, such as the five most recently viewed items.
- This helps users quickly revisit products they have already explored.

**2. HashSet**
- `HashSet` stores unique product tags or categories.
- It automatically prevents duplicate entries.
- For example, tags such as Electronics, Fashion, and Accessories can be stored without repetition.
- It provides efficient average-time lookup for checking whether a tag exists.

**3. HashMap**
- `HashMap` can be used to associate product IDs with product details or to manage cart quantities.
- It stores information in key-value pairs.
- For example, a product ID can act as a key, while the corresponding product or quantity acts as its value.
- It supports efficient average-time insertion, searching, updating, and removal by key.
- If the implementation uses a different collection for cart management, this description should be adjusted to match the actual code.

**4. ArrayList**
- `ArrayList` can be used to store the available products in the product catalogue.
- It allows products to be maintained in an ordered collection.
- The program can iterate through the list to display products or search for matching items.
- If the actual Java program uses another collection for the catalogue, mention that collection instead.

### 4. Main Components and Features
1. **Product Catalogue:** Displays the available products along with their names, prices, and other details.
2. **Product Search:** Allows users to find products using relevant names, categories, or tags.
3. **Shopping Cart Management:** Supports adding products, increasing or decreasing quantities, and removing items.
4. **Recently Viewed Products:** Maintains a limited history of the products viewed by the user.
5. **Price Calculation:** Calculates the subtotal based on product prices and quantities.
6. **Delivery Charge Calculation:** Applies the delivery charge according to the project's predefined rules.
7. **Checkout:** Displays the final order amount and simulates the checkout process.
8. **Data Persistence:** If local storage or file storage is implemented, cart details or viewing history can be retained between sessions. Otherwise, the data may reset when the program ends.

### 5. Working Principle
1. The application starts by displaying a menu or the available products.
2. The user selects a product to view its details.
3. The selected product is added to the recently viewed history.
4. The user can add the product to the shopping cart and specify the required quantity.
5. The application updates the cart whenever an item is added, removed, or modified.
6. The total price is calculated using the product prices and quantities.
7. At checkout, the subtotal and applicable delivery charge are used to calculate the final amount.
8. The program displays the order summary to the user.

### 6. Software and Requirements
1. **Programming Language:** Java.
2. **JDK:** Java Development Kit must be installed to compile and run the program.
3. **Code Editor:** Notepad, Visual Studio Code, IntelliJ IDEA, Eclipse, or another Java-compatible editor.
4. **Execution Environment:** Command Prompt or the terminal in an IDE.
5. **Data Structure Library:** Java Collections Framework, which includes classes such as `ArrayDeque`, `HashSet`, `HashMap`, and `ArrayList`.

### 7. How to Compile and Run the Java Program

**Step 1: Install the JDK**
- Install a suitable JDK version on the computer.
- Open Command Prompt and enter:
  `java -version`
- Then enter:
  `javac -version`
- If both commands display version information, Java is available in the terminal.

**Step 2: Save the Java Code**
- Open Notepad or another code editor.
- Paste the complete Java program.
- Save the file using the filename `Main.java`.
- Ensure that the public class name in the code is `Main`.

**Step 3: Open the Program Folder**
- Open Command Prompt.
- Navigate to the folder where `Main.java` is saved using the `cd` command.

**Step 4: Compile the Program**
- Enter the following command:
  `javac Main.java`
- If compilation succeeds, a `Main.class` file will be generated, along with other class files if the program contains additional classes.
- If an error appears, check the spelling, brackets, semicolons, and class names.

**Step 5: Run the Program**
- Enter:
  `java Main`
- The program will start, and the user can interact with the application through the displayed menu.

### 8. Advantages
1. Demonstrates real-world applications of Java data structures.
2. Organizes shopping cart and product information efficiently.
3. Reduces duplicate entries when using `HashSet`.
4. Supports convenient access to recently viewed products.
5. Makes price calculation and cart updates easier to manage.
6. Provides a foundation for developing larger e-commerce applications.

### 9. Limitations
1. The basic version may use a predefined product catalogue.
2. A console-based version does not provide a graphical user interface.
3. Checkout is simulated and does not process real payments.
4. Without a database or suitable persistence mechanism, order information may not be permanently stored.
5. The application does not necessarily include user accounts, authentication, or live inventory updates.

### 10. Future Enhancements
1. Connect the application to a database such as MySQL.
2. Develop a graphical interface or web-based front end.
3. Add user registration and login.
4. Implement real inventory management.
5. Add secure payment gateway integration.
6. Generate order receipts and maintain purchase history.

### 11. Conclusion
The E-Commerce Shopping Cart and Recently Viewed Products Engine demonstrates how data structures can be applied to solve common problems in online shopping systems. Collections such as `ArrayDeque`, `HashSet`, `HashMap`, and `ArrayList` help organize product information, manage cart operations, and maintain viewing history. The project strengthens understanding of Java programming, object-oriented design, and collection handling. It also provides a foundation for developing more advanced e-commerce applications with databases, graphical interfaces, and secure payment facilities.
