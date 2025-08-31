// scripts/seedData.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Cheatsheet = require('./models/Cheatsheet');

dotenv.config();

const database = require("./config/database");
 database.connect();

const comprehensiveData = [
  {
    "language": "php",
    "title": "PHP Comprehensive Cheatsheet",
    "description": "A complete guide to the PHP server-side scripting language, covering everything from basic syntax and arrays to object-oriented programming and database interaction.",
    "sections": [
      {
        "title": "PHP Basics",
        "items": [
          {
            "concept": "Syntax & Variables",
            "code": "<?php\n// PHP code is enclosed in these tags.\n\n// All variables start with a '$'.\n$greeting = \"Hello, World!\"; // String\n$userCount = 100;           // Integer\n$price = 19.99;             // Float\n$isActive = true;           // Boolean\n$data = null;               // Null\n\n// 'echo' is used to output data.\necho $greeting; // Outputs: Hello, World!\n\n// Constants\ndefine(\"SITE_URL\", \"https://example.com\");\necho SITE_URL;\n?>",
            "explanation": "PHP scripts are executed on the server. All variable names must start with a `$` sign. The **`echo`** and **`print`** statements are used to send output to the browser.",
            "tags": ["variables", "syntax", "echo", "types", "constants"],
            "difficulty": "beginner"
          },
          {
            "concept": "Operators",
            "code": "<?php\n$a = 10;\n$b = 3;\n\n// Arithmetic\n$remainder = $a % $b; // 1\n\n// String Concatenation operator is '.'\n$firstName = \"John\";\n$lastName = \"Doe\";\n$fullName = $firstName . \" \" . $lastName; // \"John Doe\"\n\n// Comparison (Triple equals '===' checks type and value)\n'5' == 5;  // true (loose equality)\n'5' === 5; // false (strict equality)\n\n// Null Coalescing Operator (PHP 7+)\n$username = $_GET['user'] ?? 'guest';\n// $username will be 'guest' if $_GET['user'] is not set.\n?>",
            "explanation": "PHP supports standard arithmetic and comparison operators. The key differences are the string concatenation operator (`.`) and the strict equality operator (`===`) which also checks the data type.",
            "tags": ["operators", "concatenation", "strict-equality", "null-coalescing"],
            "difficulty": "beginner"
          }
        ]
      },
      {
        "title": "Arrays",
        "items": [
          {
            "concept": "Indexed & Associative Arrays",
            "code": "<?php\n// Indexed Array (numeric keys)\n$fruits = [\"Apple\", \"Banana\", \"Cherry\"];\n$fruits[1] = \"Orange\"; // Change an element\necho $fruits[0]; // Apple\n\n// Associative Array (named keys)\n$person = [\n    \"name\" => \"Alice\",\n    \"age\" => 25,\n    \"city\" => \"New York\"\n];\necho $person[\"name\"]; // Alice\n\n// Add a new element\n$person[\"email\"] = \"alice@example.com\";\n?>",
            "explanation": "Arrays are a powerful data structure in PHP. **Indexed arrays** use numeric indices, while **associative arrays** use named keys to store values. They are incredibly flexible for storing and organizing data.",
            "tags": ["arrays", "indexed-array", "associative-array", "key-value"],
            "difficulty": "beginner"
          },
          {
            "concept": "Iterating with foreach",
            "code": "<?php\n$colors = [\"Red\", \"Green\", \"Blue\"];\n\n// Loop through an indexed array (value only)\nforeach ($colors as $color) {\n    echo $color . \"<br>\";\n}\n\n$user = [\n    \"name\" => \"Bob\",\n    \"role\" => \"Admin\"\n];\n\n// Loop through an associative array (key and value)\nforeach ($user as $key => $value) {\n    echo \"$key: $value<br>\";\n}\n?>",
            "explanation": "The **`foreach`** loop is the preferred way to iterate over arrays in PHP. It provides a clean syntax to access either just the values or both the keys and values of an array.",
            "tags": ["foreach", "loops", "arrays", "iteration"],
            "difficulty": "beginner"
          }
        ]
      },
      {
        "title": "Functions",
        "items": [
          {
            "concept": "Defining & Using Functions",
            "code": "<?php\n// Modern PHP supports type declarations for parameters and return values.\ndeclare(strict_types=1);\n\n// A function with typed parameters and a return type\nfunction add(int $a, int $b): int {\n    return $a + $b;\n}\n\necho add(5, 10); // 15\n\n// A function with a default parameter value\nfunction greet(string $name = \"Guest\"): string {\n    return \"Hello, $name!\";\n}\n\necho greet(); // \"Hello, Guest!\"\necho greet(\"Alice\"); // \"Hello, Alice!\"\n?>",
            "explanation": "Functions are reusable blocks of code defined with the **`function`** keyword. Modern PHP allows for **type hinting** (specifying the data type of parameters and return values), which helps create more robust and predictable code.",
            "tags": ["functions", "return-type", "parameters", "type-hinting", "strict_types"],
            "difficulty": "intermediate"
          }
        ]
      },
      {
        "title": "Object-Oriented Programming (OOP)",
        "items": [
          {
            "concept": "Classes, Properties & Methods",
            "code": "<?php\nclass Car {\n    // Properties (variables)\n    public string $make;\n    private int $speed = 0;\n\n    // Constructor method (called when an object is created)\n    public function __construct(string $make) {\n        $this->make = $make;\n    }\n\n    // Method (function)\n    public function accelerate(int $amount): void {\n        $this->speed += $amount;\n    }\n\n    public function getSpeed(): int {\n        return $this->speed;\n    }\n}\n\n// Create a new object (instance)\n$myCar = new Car(\"Toyota\");\n$myCar->accelerate(80);\necho $myCar->getSpeed(); // 80\n?>",
            "explanation": "A **`class`** is a blueprint for objects. **Properties** are the variables inside a class, and **methods** are the functions. The **`$this`** keyword refers to the current object instance. Access modifiers like **`public`** and **`private`** control encapsulation.",
            "tags": ["oop", "class", "object", "properties", "methods", "__construct", "this"],
            "difficulty": "intermediate"
          },
          {
            "concept": "Inheritance & Interfaces",
            "code": "<?php\ninterface Drivable {\n    public function drive(): void;\n}\n\nclass Vehicle {\n    protected bool $isRunning = false;\n\n    public function startEngine(): void {\n        $this->isRunning = true;\n    }\n}\n\n// Truck inherits from Vehicle and implements Drivable\nclass Truck extends Vehicle implements Drivable {\n    public function drive(): void {\n        if ($this->isRunning) {\n            echo \"Truck is driving.\";\n        }\n    }\n}\n\n$myTruck = new Truck();\n$myTruck->startEngine();\n$myTruck->drive();\n?>",
            "explanation": "**`Inheritance`** (`extends`) allows a class to inherit properties and methods from a parent class. An **`interface`** defines a contract of methods that a class must implement, enabling polymorphism.",
            "tags": ["oop", "inheritance", "interface", "extends", "implements", "polymorphism"],
            "difficulty": "advanced"
          }
        ]
      },
      {
        "title": "Working with Web Data",
        "items": [
          {
            "concept": "Superglobals ($_GET, $_POST, $_SESSION)",
            "code": "<?php\n// Superglobals are built-in variables that are always available.\n\n// $_GET contains data from the URL query string\n// e.g., for page.php?name=Alice\n$name = $_GET['name'] ?? 'Guest';\necho \"Hello, $name\";\n\n// $_POST contains data from a submitted HTML form with method=\"post\"\n$email = $_POST['email'] ?? '';\n\n// $_SESSION allows you to store user information across pages.\n// Must be started at the top of the script.\nsession_start();\n\n// Store a session variable\n$_SESSION['user_id'] = 123;\n\n// Retrieve it on another page\n$userId = $_SESSION['user_id'];\n?>",
            "explanation": "**Superglobals** are special associative arrays that provide information about the server and the current request. **`$_GET`** and **`$_POST`** are essential for handling data from HTML forms, while **`$_SESSION`** is used for maintaining user state.",
            "tags": ["superglobals", "_get", "_post", "_session", "forms", "http"],
            "difficulty": "intermediate"
          }
        ]
      },
      {
        "title": "Database Interaction with PDO",
        "items": [
          {
            "concept": "Connecting & Prepared Statements",
            "code": "<?php\n// PDO (PHP Data Objects) is the modern, secure way to access databases.\n$host = '127.0.0.1';\n$db   = 'test_db';\n$user = 'root';\n$pass = 'password';\n$charset = 'utf8mb4';\n\n$dsn = \"mysql:host=$host;dbname=$db;charset=$charset\";\n$options = [\n    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,\n    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,\n    PDO::ATTR_EMULATE_PREPARES   => false,\n];\n\ntry {\n     $pdo = new PDO($dsn, $user, $pass, $options);\n} catch (\\PDOException $e) {\n     throw new \\PDOException($e->getMessage(), (int)$e->getCode());\n}\n\n// Use PREPARED STATEMENTS to prevent SQL injection\n$sql = \"SELECT * FROM users WHERE status = ? AND name LIKE ?\";\n$stmt = $pdo->prepare($sql);\n\n// Execute the statement with user-provided data\n$stmt->execute(['active', 'A%']);\n\n// Fetch all results\n$users = $stmt->fetchAll();\n\nforeach ($users as $user) {\n    echo $user['name'] . \"<br>\";\n}\n?>",
            "explanation": "**PDO** provides a consistent interface for accessing different databases. **Prepared statements** are crucial for security; they separate the SQL query from the data, which prevents SQL injection attacks.",
            "tags": ["pdo", "database", "mysql", "prepared-statements", "sql-injection", "security"],
            "difficulty": "advanced"
          }
        ]
      }
    ]
  }
]
async function seedDatabase() {
  try {
    console.log("Starting database seed...");
    
    // Clear existing data
    // await Cheatsheet.deleteMany({});
    // console.log('Cleared existing cheatsheets');
    
    // Insert comprehensive data
    await Cheatsheet.insertMany(comprehensiveData);
    console.log('Successfully seeded JavaScript cheatsheet data');
    
    // Display summary
    const count = await Cheatsheet.countDocuments();
    console.log('Total cheatsheets in database:', count);
    
    for (const sheet of comprehensiveData) {
      const sectionCount = sheet.sections.length;
      const itemCount = sheet.sections.reduce((total, section) => total + section.items.length, 0);
      console.log(sheet.language + ': ' + sectionCount + ' sections, ' + itemCount + ' concepts');
    }
    
    console.log('Seed completed successfully!');
    
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    // mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// ✅ Run only when file is executed directly
if (require.main === module) {
  seedDatabase();
}
// module.exports = { seedDatabase, comprehensiveData };