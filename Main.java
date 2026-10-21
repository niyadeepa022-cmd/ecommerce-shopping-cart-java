import java.util.*;

class Product {
    private int id;
    private String name;
    private double price;
    private HashSet<String> tags;

    public Product(int id, String name, double price, String... tags) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.tags = new HashSet<>();

        for (String tag : tags) {
            this.tags.add(tag.toLowerCase());
        }
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }

    public boolean hasTag(String tag) {
        return tags.contains(tag.toLowerCase());
    }

    public void display() {
        System.out.printf("ID: %d | %-15s | Rs. %.2f | Tags: %s%n",
                id, name, price, tags);
    }
}

class ShoppingCart {
    private HashMap<Integer, Integer> cart = new HashMap<>();

    public void addProduct(Product p, int quantity) {
        if (quantity <= 0) {
            System.out.println("Quantity must be greater than zero.");
            return;
        }

        int id = p.getId();
        cart.put(id, cart.getOrDefault(id, 0) + quantity);

        System.out.println(p.getName() + " added to cart.");
    }

    public void updateQuantity(Product p, int quantity) {
        if (!cart.containsKey(p.getId())) {
            System.out.println("Product is not in the cart.");
        } else if (quantity <= 0) {
            cart.remove(p.getId());
            System.out.println("Product removed from cart.");
        } else {
            cart.put(p.getId(), quantity);
            System.out.println("Quantity updated.");
        }
    }

    public void removeProduct(Product p) {
        if (cart.remove(p.getId()) != null) {
            System.out.println("Product removed from cart.");
        } else {
            System.out.println("Product is not in the cart.");
        }
    }

    public void displayCart(ArrayList<Product> products) {
        if (cart.isEmpty()) {
            System.out.println("Your shopping cart is empty.");
            return;
        }

        double total = 0;

        System.out.println("\n========== SHOPPING CART ==========");

        for (Product p : products) {
            int quantity = cart.getOrDefault(p.getId(), 0);

            if (quantity > 0) {
                double amount = p.getPrice() * quantity;
                System.out.printf("%-15s Qty: %d  Amount: Rs. %.2f%n",
                        p.getName(), quantity, amount);
                total += amount;
            }
        }

        System.out.printf("Total Amount: Rs. %.2f%n", total);
    }

    public void checkout(ArrayList<Product> products) {
        if (cart.isEmpty()) {
            System.out.println("Cart is empty. Add products first.");
            return;
        }

        displayCart(products);
        System.out.println("Checkout successful! Thank you for shopping.");
        cart.clear();
    }
}

class RecentlyViewed {
    private ArrayDeque<Product> history = new ArrayDeque<>();
    private final int LIMIT = 5;

    public void addProduct(Product p) {
        // Remove the old occurrence if the product is viewed again.
        history.removeIf(item -> item.getId() == p.getId());

        // Most recently viewed product stays at the front.
        history.addFirst(p);

        // Evict the oldest product when the limit is exceeded.
        if (history.size() > LIMIT) {
            history.removeLast();
        }
    }

    public void displayHistory() {
        if (history.isEmpty()) {
            System.out.println("No recently viewed products.");
            return;
        }

        System.out.println("\n====== RECENTLY VIEWED PRODUCTS ======");

        for (Product p : history) {
            System.out.printf("%s - Rs. %.2f%n",
                    p.getName(), p.getPrice());
        }
    }
}

class ProductCatalog {
    private ArrayList<Product> products = new ArrayList<>();
    private HashSet<String> searchTags = new HashSet<>();

    public ProductCatalog() {
        addProduct(new Product(1, "Laptop", 55000,
                "electronics", "computer"));
        addProduct(new Product(2, "Phone", 18000,
                "electronics", "mobile"));
        addProduct(new Product(3, "Headphones", 1500,
                "audio", "electronics"));
        addProduct(new Product(4, "Book", 400,
                "education", "reading"));
        addProduct(new Product(5, "Keyboard", 1200,
                "computer", "accessories"));
    }

    private void addProduct(Product p) {
        products.add(p);
        // HashSet stores each search tag only once.
        searchTags.addAll(getTags(p));
    }

    private Set<String> getTags(Product p) {
        // Collect tags used by this product.
        Set<String> tags = new HashSet<>();

        // Tags are checked through the product's hasTag method.
        // The catalogue's searchTags set maintains unique tags.
        // This method is replaced by the explicit tag lookup below.
        for (String tag : searchTags) {
            if (p.hasTag(tag)) {
                tags.add(tag);
            }
        }
        return tags;
    }

    public ArrayList<Product> getProducts() {
        return products;
    }

    public Product findById(int id) {
        for (Product p : products) {
            if (p.getId() == id) {
                return p;
            }
        }
        return null;
    }

    public void displayProducts() {
        System.out.println("\n========== PRODUCT CATALOG ==========");
        for (Product p : products) {
            p.display();
        }
    }

    public void search(String keyword) {
        keyword = keyword.toLowerCase().trim();
        boolean found = false;

        System.out.println("\n========== SEARCH RESULTS ==========");

        for (Product p : products) {
            if (p.getName().toLowerCase().contains(keyword)
                    || p.hasTag(keyword)) {
                p.display();
                found = true;
            }
        }

        if (!found) {
            System.out.println("No matching products found.");
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        ProductCatalog catalog = new ProductCatalog();
        ShoppingCart cart = new ShoppingCart();
        RecentlyViewed recentlyViewed = new RecentlyViewed();

        int choice=-1;

        do {
            System.out.println("\n===== E-COMMERCE SHOPPING SYSTEM =====");
            System.out.println("1. View all products");
            System.out.println("2. Search products");
            System.out.println("3. View a product");
            System.out.println("4. Add product to cart");
            System.out.println("5. Update cart quantity");
            System.out.println("6. Remove product from cart");
            System.out.println("7. View shopping cart");
            System.out.println("8. View recently viewed products");
            System.out.println("9. Checkout");
            System.out.println("0. Exit");
            System.out.print("Enter your choice: ");

            if (!sc.hasNextInt()) {
                System.out.println("Please enter a valid number.");
                sc.nextLine();
                continue;
            }

            choice = sc.nextInt();
            sc.nextLine();

            int id;
            int quantity;
            Product p;

            switch (choice) {
                case 1:
                    catalog.displayProducts();
                    break;

                case 2:
                    System.out.print("Enter product name or tag: ");
                    String keyword = sc.nextLine();
                    catalog.search(keyword);
                    break;

                case 3:
                    System.out.print("Enter product ID: ");
                    id = sc.nextInt();
                    sc.nextLine();

                    p = catalog.findById(id);

                    if (p != null) {
                        p.display();
                        recentlyViewed.addProduct(p);
                    } else {
                        System.out.println("Product not found.");
                    }
                    break;

                case 4:
                    catalog.displayProducts();
                    System.out.print("Enter product ID: ");
                    id = sc.nextInt();
                    System.out.print("Enter quantity: ");
                    quantity = sc.nextInt();
                    sc.nextLine();

                    p = catalog.findById(id);

                    if (p != null) {
                        cart.addProduct(p, quantity);
                    } else {
                        System.out.println("Product not found.");
                    }
                    break;

                case 5:
                    System.out.print("Enter product ID: ");
                    id = sc.nextInt();
                    System.out.print("Enter new quantity (0 to remove): ");
                    quantity = sc.nextInt();
                    sc.nextLine();

                    p = catalog.findById(id);

                    if (p != null) {
                        cart.updateQuantity(p, quantity);
                    } else {
                        System.out.println("Product not found.");
                    }
                    break;

                case 6:
                    System.out.print("Enter product ID: ");
                    id = sc.nextInt();
                    sc.nextLine();

                    p = catalog.findById(id);

                    if (p != null) {
                        cart.removeProduct(p);
                    } else {
                        System.out.println("Product not found.");
                    }
                    break;

                case 7:
                    cart.displayCart(catalog.getProducts());
                    break;

                case 8:
                    recentlyViewed.displayHistory();
                    break;

                case 9:
                    cart.checkout(catalog.getProducts());
                    break;

                case 0:
                    System.out.println("Thank you for visiting!");
                    break;

                default:
                    System.out.println("Invalid choice. Try again.");
            }

        } while (choice != 0);

        sc.close();
    }
}
