const { createApp } = Vue

createApp({
    data() {
        return {
            name: "",
            subject: '',
            email: '',
            message: '',

        }
    },
    methods: {
        async enviar(e) {
            e.preventDefault()

            const reset = () => {
                this.name = ""
                this.subject = ''
                this.email = ''
                this.message = ''
            }

            axios
                .post('/contact/send', {
                    data: {
                        name: this.name,
                        subject: this.subject,
                        email: this.email,
                        message: this.message,
                    }
                })
                .then(response => {
                    // Handle success.
                    reset()
                    iziToast.success({
                        title: 'GeoVespa!',
                        message: 'A sua mensagem foi entregue com sucesso',
                        position: 'topRight'
                    });
                    console.log('Well done!');

                })
                .catch(error => {
                    // Handle error.
                    iziToast.error({
                        title: 'GeoVespa!',
                        message: 'Ocorreu um erro com o seu envio. Tente novamente!',
                        position: 'topRight'
                    });
                    console.log('An error occurred:', error.response);
                });

        }
    }
}).mount('#app')