

export async function* getIterableStream(
    body: ReadableStream<Uint8Array>
): AsyncIterable<string> {
    const reader = body.getReader();
    const decoder = new TextDecoder();

    while (true) {
        const { value, done } = await reader.read();
        if (done) {
            break;
        }
        const decodedChunk = decoder.decode(value, { stream: true });
        yield decodedChunk;
    }
}

// export async function handleAgentApiCall(message: string) {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, { // Note the /stream endpoint
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ query: message }),
//     });
//     console.log("fdfdf", response.body)
//     if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     if (!response.body) {
//         throw new Error("Response body is null");
//     }
//     // return getIterableStream(response.body)
//     return response.body
// }

export async function handleAgentApiCall(message: string) {
    try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/chat`;
        
        const response = await fetch(url, { 
            method: "POST", // Changed to POST to match backend
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ // Properly send data in request body
                query: message
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // Parse JSON response
        return data;

    } catch (error) {
        console.error("API call error:", error);
        throw error;
    }
}
