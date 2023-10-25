const fetchServerData = async () => {
    try {
        // fetch server api
        const response = await fetch('http://localhost:7000/')
         // Check if the response is successful (status code 2xx)
         if (!response.ok) {
            console.log('res not ok')
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        // Parse the JSON response
        const data = await response.json();
          // Display the server response in the 'response' div
        document.getElementById('response1').textContent = JSON.stringify(data, null, 2); // Pretty print the JSON object
        console.log('Response from server:', JSON.stringify(data, null, 2)); // Log the response for debugging



    } catch (error) {
        console.error('Error:', error);
        document.getElementById('response').textContent = `Error: ${error.message}`;
    
    }
}

