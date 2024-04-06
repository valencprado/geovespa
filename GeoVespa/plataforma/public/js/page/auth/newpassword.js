const { createApp } = Vue

createApp({
    data() {
        return {
            password: '',
            passwordConfirmation: ''
        }
    },
    methods: {
        async login(e) {
            e.preventDefault()

            axios
                .post('/api/auth/reset-password', {
                    passwordConfirmation: this.passwordConfirmation,
                    password: this.password,
                    code
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
                    console.log('An error occurred:', error.response);
                });

        }
    }
}).mount('#app')
