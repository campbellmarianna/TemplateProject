if (document.querySelector('#new-product')) {
    document.querySelector('#new-product').addEventListener('submit', (e) => {
        e.preventDefault();
        // Use FormData to grab everything now that we have files mixed in with text
        var form = document.getElementById("new-product");
        var product = new FormData(form);
        console.log("**Log")
        // Assign the multipart/form-data headers to axios does a proper post
        axios.post('/products', product, {
            headers: {
                'Content-Type': 'multipart/form-data;'
            }
        }).then(function (response) {
                console.log("**Log")
                // window.location.replace(`/products/${response.data.product._id}`);
        }).catch(function (error) {
                const alert = document.getElementById('alert')
                alert.classList.add('alert-warning');
                alert.textContent = 'Oops, something went wrong saving your product. Please check you information and try again.';
                alert.style.display = 'block';
                setTimeout(() => {
                    alert.style.display = 'none';
                    alert.classList.remove('alert-warning');
                }, 3000)
        });
    })
}
