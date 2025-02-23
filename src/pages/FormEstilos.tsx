const handleSubmit = async () => {
  try {
    const response = await fetch('http://localhost:8000/generate-styles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(styleConfig)
    });

    if (!response.ok) {
      throw new Error('Failed to generate styles');
    }

    const result = await response.json();
    console.log('Styles generated:', result);
    
    // Navigate to next step or show success message
    
  } catch (error) {
    console.error('Error generating styles:', error);
    alert('Error generating styles. Please try again.');
  }
};