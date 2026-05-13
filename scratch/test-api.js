
async function testAPI() {
  console.log('Testing /api/contact local endpoint...');
  try {
    const response = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        phone: '1234567890',
        service_interest: 'wedding',
        message: 'This is a test message from the diagnostic script.'
      })
    });

    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Response:', data);
  } catch (error) {
    console.error('API Test Failed:');
    console.error(error);
  }
}

testAPI();
