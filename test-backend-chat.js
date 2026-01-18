
// Use native fetch (Node 18+)

async function testBackend() {
    try {
        console.log("Testing POST http://localhost:3000/api/chat...");
        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: "Hello, are you working?",
                history: []
            })
        });

        if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            const text = await response.text();
            console.error(text);
            return;
        }

        const data = await response.json();
        console.log("Success! Response:");
        console.log(data);

    } catch (error) {
        console.error("Failed to connect:", error.message);
    }
}

testBackend();
