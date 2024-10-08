## Product Management Tool
This project is built with an Angular frontend and a json-server backend using Node.js and Express.js. The objective of this project is to demonstrate Angular basics while implementing a simple project management tool that allows CRUD operations for managing products. Each product has the following attributes: Product ID, Product Name, Product Code, Product Description, Star Ratings, and Availability.

![Screenshot 2024-09-06 150355](https://github.com/user-attachments/assets/31547c63-46be-48cc-b82c-2311437c8cf7)

### Features
1. **Product List**
- Endpoint: http://localhost:4201/products
- On this page, all products currently stored in the server are listed in a table. The following functionalities are available:
    - Show Image: Clicking the "Show Image" button displays the product image in the same table.
    - Star Ratings: Clicking a star rating in the table triggers a message in the header saying, e.g., "The rating 10 was clicked!"—this demonstrates Angular's data binding capabilities.
    - Star Ratings View: Each product's star ratings are shown as stars in the table.
      
![image](https://github.com/user-attachments/assets/309e96ca-17d1-4eab-9f73-b3fc9f176c05)

2. **Product View**
- Endpoint: http://localhost:4201/product/:id
- From the Product List page, clicking the "View" button navigates the user to the Product View page, displaying all attributes of the selected product. The page includes:
- Allows editing any product attribute. Clicking the "Edit" button enables users to update the product details, and they can save changes using the "Save" button.
  
![image](https://github.com/user-attachments/assets/5a66b99e-166d-468c-a1ff-304a017c98c0)

3. **Add Product**
- Endpoint: http://localhost:4201/product/add
- From the Product List page, users can navigate to the "Add Product" page by clicking the "Add" button. New products can be added to the json-server, and newly added products will appear in the Product List.
  
![image](https://github.com/user-attachments/assets/370e3acf-99a6-4ce7-aae4-e20726ae9131)

### Angular Features Used
1. **Component Structure**: Separate components for Product List, Product Detail, Welcome Component, and Star Rating Component.
2. **HTTP Client for CRUD**: A Product Service class is used with Angular's HttpClientModule to perform CRUD operations.
3. **Product Interface**: Created an interface class for products, defining the product properties.
4. **Star Rating Component**: This component is nested within the Product List and Product View pages, displaying star ratings in the form of stars.
5. **Data Binding**: Two-way data binding is utilized in filters on the Product List page.
6. **Modular Design**: Separate modules for Product and Shared components to enhance modularity.

### How to Run
1. Running the Angular Frontend
    - Clone the repository:
        git clone https://github.com/ashen829/product-management-tool.git
    - Navigate to the project directory:
        cd product-management-tool
    - Install the dependencies:
        npm install
    - Start the Angular application:
        ng serve --port 4200
2. Running the JSON Server Backend
    - Open a new terminal window.
    - Navigate to the directory containing the product.js file (which holds the product data):
        cd path-to-product-directory
    - Run the following command to start the JSON server:
        json-server --watch product.json --port 3000
        
Make sure both the Angular frontend and JSON server backend are running concurrently. You can now access the Product Management Tool on http://localhost:4200.
