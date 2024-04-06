const { createApp } = Vue

console.log('dd')

createApp({
    data() {
        return {
            email: ""
        }
    },
    methods: {
        async send(e) {
            e.preventDefault()

            axios
                .post('/api/auth/forgot-password', {
                    email: this.email,
                })
                .then(response => {
                    // Handle success.
                    location.href = '/auth/send'
                })
                .catch(error => {
                    // Handle error.
                    console.log('An error occurred:', error.response);
                });

        }
    }
}).mount('#app')
