# Online Flea Market Website
+ Demo: 
![demo](https://github.com/ParkAmber/frontend-portfolio-fleamarket-website/blob/main/demo_.gif)



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

![comment](https://github.com/ParkAmber/frontend-portfolio-fleamarket-website/blob/main/update_comment1.png)

![comment2](https://github.com/ParkAmber/frontend-portfolio-fleamarket-website/blob/main/update_comment.png)

    const onClickCommentSubmit = async (data: Idata) => {
      try {
        if (!contents) {
          alert("no contents");
          return;
        }
        const result = await createQuestion({
          variables: {
            createUseditemQuestionInput: {
              // contents: data.contents,
              contents,
            },
            useditemId: String(router.query.productId),
          },
          
          //** cache update!! */
          update(cache, { data }) {
            cache.modify({
              fields: {
                // data.createBoard //{writer:"Amber",...}
                fetchUseditemQuestions: (prev) => {
                  return [data?.createUseditemQuestion, ...prev]; 
                },
              },
            });
          },
        });    
          const { Modal } = await import("antd"); //code-splitting
          Modal.success({ content: "Success!!" });
          const boardId = result.data;
          console.log(boardId);
          setContents("");
      } catch (error) {
        if (error instanceof Error) alert(error.message);
      }
      setContents("");
    };


    const onClickUpdate = async (): Promise<void> => {
      if (contents === "") {
        alert("there are no edits");
        return;
      }
      try {
        await updateComment({
          variables: {
            updateUseditemQuestionInput: {
              contents: contents,
            },
            useditemQuestionId: useditemQuestionId,
          },
 
          //==> refetchQueries!!
          // refetchQueries: [
          //   {
          //     query: FETCH_USED_ITEM_QUESTIONS,
          //     variables: { useditemId: String(router.query.productId) },
          //   },
          // ],

          //** cache update!! */
          update(cache, { data }) {
            cache.modify({
              fields: {
                // data.createBoard //{writer:"Amber",...}
                fetchUseditemQuestions: (prev) => {
                  console.log(prev);
                  return [data?.updateUseditemQuestion, ...prev]; 
                },
              },
            });
          },
        });
        setIsOpen(false);
  
        setContents("");
      } catch (error) {
        if (error instanceof Error) alert(error.message);
      }
    };
+ Update Mutation :  Incorporating default value retention to prevent unnecessary data mutations, ensuring that only edited content triggers the update mutation.

![comment](https://github.com/ParkAmber/frontend-portfolio-fleamarket-website/blob/main/update_contents.png)

    const onClickUpdate = async (): Promise<void> => {
      const currentFiles = JSON.stringify(fileUrls);
      const defaultFiles = JSON.stringify(props.data?.fetchUseditem.images);
      const isChangedFiles = currentFiles !== defaultFiles; //객체의 값을 비교해야할때는 JSON.stringify로 문자화해서 비교해야함!!! **

        if (
          seller === "" &&
          product === "" &&
          contents === "" &&
          !price &&
          address === "" &&
          addressDetail === "" &&
          zipcode === "" &&
          !isChangedFiles
        ) {
          alert("there are no changes");
          return;
        }
        const myvariables: IUpdateUseditemInput = {};
        if (seller) myvariables.name = seller;
        if (product) myvariables.remarks = product;
        if (contents) myvariables.contents = contents;
        if (price) myvariables.price = price;
        if (isChangedFiles) myvariables.images = fileUrls;
    
        if (zipcode !== "" || address !== "" || addressDetail !== "") {
          myvariables.useditemAddress = {};
          if (address) myvariables.useditemAddress.address = address;
          if (zipcode) myvariables.useditemAddress.zipcode = zipcode;
          if (addressDetail)
            myvariables.useditemAddress.addressDetail = addressDetail;
        }
    
        try {
          if (typeof router.query.productId !== "string") {
            alert("there's something wrong with your system");
            return;
          }
          const result = await myFunctionEdit({
            variables: {
              updateUseditemInput: myvariables,
              useditemId: router.query.productId,
            },
          });
          console.log(result);
          alert(result.data?.updateUseditem._id);
          router.push(
            `/flea_market/products/detail/${result.data?.updateUseditem._id}`
          );
        } catch (error) {
          if (error instanceof Error) alert(error.message);
        }
    };
