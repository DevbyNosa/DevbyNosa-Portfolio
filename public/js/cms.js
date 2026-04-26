document.addEventListener('click', async (event) => {
  if (event.target.classList.contains('delete-btn')) {
    const id = event.target.getAttribute('data-id');

    if (confirm('Are you sure you want to delete this project?')) {
      try {
        const response = await fetch(`/admin/cms/project/delete/${id}`, { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });

        // 1. Check if response is okay
        if (response.ok) {
          // 2. Parse the JSON to get the adminLink
          const data = await response.json();
          const adminUrl = data.adminLink; 

          console.log("Redirecting to:", adminUrl);
          
          // 3. Use it to redirect instead of just reloading
          window.location.href = `/${adminUrl}/cms/project`; 
        } else {
          console.error("Delete failed");
        }
      } catch (error) {
        console.error("Connection error:", error);
      }
    }
  }
});
