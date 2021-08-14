const newFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#appointment-name').value.trim();
    const visitReason = document.querySelector('#appointment-reason').value.trim();
    const day = document.querySelector('#appointment-day').value.trim();
    const time = document.querySelector('#appointment-time').value.trim();
  
  
    if (name && visitReason && day && time) {
      const response = await fetch(`/api/appointment`, {
        method: 'POST',
        body: JSON.stringify({ name, visitReason, day, time }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/user.handlebars');
      } else {
        alert('Failed to create Appointment');
      }
    }
};
  
const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/appointment/${appointment_id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete appointment');
      }
    }
};
  




document
    .querySelector('.new-appointment-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.appointment-list')
    .addEventListener('click', delButtonHandler);