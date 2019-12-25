document.querySelector('.register').addEventListener('click', function(e) {

    const username = document.querySelector('.username').value;
          password = document.querySelector('.password').value;
          usernameRE = /^.{5,10}$/;
          passwordRE = /^.{8,16}$/;

    if(username === '' || password === '') {
        showAlert('Please enter username and password', 'error');
        e.preventDefault();
    } else if(!username.match(usernameRE)) {
        showAlert('Username must be valid', 'error');
        e.preventDefault();
    } else if(!password.match(passwordRE)) {
        showAlert('Please enter a valid password', 'error');
        e.preventDefault();
    }
});

showAlert = (message, className) => {
    // Create div
    const div = document.createElement('div');
    // Add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector('.formContent');
    // Get form
    const form = document.querySelector('.input-form');
    // Insert alert
    container.insertBefore(div, form);

    setTimeout(function(){
        document.querySelector('.alert').remove();
      }, 3000);
}