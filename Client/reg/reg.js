const fetchServerData = async () => {
  try {
    // Get form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const bio = document.getElementById("bio").value;
    const username = document.getElementById("username").value;

    const userData = {
      name: name,
      email: email,
      password: password,
      bio: bio,
      username: username,
    };
    const jsonData = JSON.stringify(userData);
    console.log(`userdata: ${jsonData}`);
    // fetch server api
    const response = await fetch("http://localhost:7000/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    // Check if the response is successful (status code 2xx)
    if (!response.ok) {
      const errorMessage = await response.text(); // Get error message from response body
      document.getElementById("response").textContent = `Error: ${errorMessage}`;
      return;
    }
    // Parse the JSON response
    const data = await response.json();
    // Display the server response in the 'response' div
    document.getElementById("response").textContent = JSON.stringify(
      data,
      null,
      2
    ); // Pretty print the JSON object
    console.log("Response from server:", JSON.stringify(data, null, 2)); // Log the response for debugging
  } catch (error) {
   
    document.getElementById("response").textContent = `Error: ${error.message}`;
  }
};
document.getElementById("response").addEventListener("submit", (event) => {
  event.preventDefault();
  fetchServerData(event);
});
