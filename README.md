# Online Flea Market Website
+ Demo: 




### **Overview:** 
This project is an online flea market website. Its primary functionalities include file uploads and utilizing CRUD APIs for creating, updating, deleting, and fetching content. Additionally, I have implemented a login feature on the frontend that relies on authorization and authentication mechanisms.

### **Development Goals:** 
Achieving a profound understanding of CRUD operations and mastering cache update mechanisms. Addressing challenges related to Next.js hydration to ensure seamless and efficient application performance.

### **Sills:** 
+ HTML
+ CSS
+ TypeScript
+ React.js
+ Next.js
+ GraphQL

-------
+ **Challenges:**

1. Ensuring that only edited content is updated upon implementing the update mutation, while retaining default values, to prevent unnecessary data mutations.

2. Displaying updated data in real-time on the browser after data deletion or updates.

3. Streamlining the Login Process: Restricting access only to valid tokens and, in the event of token expiration, obtaining a renewed token from the backend.

4. Addressing browser functionality issues arising from Next.js hydration.


+ **Solutions:**

1. If the state is not empty, add key-value pairs to an object and pass the object into variables for triggering the mutation.

2. Utilize the refetch function provided by GraphQL's useQuery to automatically refresh data.

3. During the login process, store the access token from the backend in the global state, specifically in Recoil. Use this access token for authorization as needed. Additionally, obtain a refresh token during login to automatically renew the access token when it expires.

4. Implementing post-browser load functionality using useEffect.

-------

### **Advanced Feature:** 
+ Comment Functionality :  Implementing automatic data refresh upon the creation, deletion, or update of comments.
+ Update Mutation :  Incorporating default value retention to prevent unnecessary data mutations, ensuring that only edited content triggers the update mutation.
