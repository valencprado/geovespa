const { createApp } = Vue

createApp({
    data() {
        return {
            identifier: "",
            password: ''
        }
    },
    methods: {
        async login(e) {
            e.preventDefault()

            axios
                .post('/api/auth/local', {
                    identifier: this.identifier,
                    password: this.password,
                })
                .then(response => {
                    // Handle success.
                    console.log('Well done!');
                    console.log('User profile', response.data.user);
                    console.log('User token', response.data.jwt);
                    location.href = "/auth?jwt=" + response.data.jwt
                })
                .catch(error => {
                    // Handle error.
                    iziToast.error({
                        title: 'GeoVespa!',
                        message: 'Ocorreu um erro, credencial inválida!',
                        position: 'topRight'
                    });
                    console.log('An error occurred:', error.response);
                });

        }
    }
}).mount('#app')
