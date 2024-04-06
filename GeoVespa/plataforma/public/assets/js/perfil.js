


const {
    createApp
} = Vue

const app = createApp({
    data() {
        return {
            currentPassword: '',
            password: '',
            password1: '',
            user: user

        }
    },

    methods: {
        async edit() {
            try {

                console.log(app.user.username)

                const { data } = await axios.put('/api/users', {
                    username: app.user.username,
                    email: app.user.email
                }, {

                    headers: {
                        Authorization: jwt
                    }

                })

                console.log(data)

                const e = document.querySelector('.us---')
                console.log(e, 'dddd')
                swal('Registo completo', 'Inserção feita com sucesso!', 'success');

            } catch (error) {

                console.log(error)

                iziToast.error({
                    title: 'GeoVespa, Arquivo carregado!',
                    message: 'arquivo processado com sucesso!',
                    position: 'topRight'
                });

            }



        },
        async senha() {
            try {
                const { data } = await axios.put('/api/auth/change-password', {
                    currentPassword: app.currentPassword,
                    password: app.password
                }, {

                    headers: {
                        Authorization: jwt
                    }

                })

                console.log(data)

                const e = document.querySelector('.us---')
                console.log(e, 'dddd')
                swal('Registo completo', 'Inserção feita com sucesso!', 'success');

            } catch (error) {

                console.log(error)

                iziToast.error({
                    title: 'GeoVespa, Arquivo carregado!',
                    message: 'arquivo processado com sucesso!',
                    position: 'topRight'
                });

            }



        },
        async eliminar() {
            swal({
                    title: 'Are you sure?',
                    text: 'Once deleted, you will not be able to recover this imaginary file!',
                    icon: 'warning',
                    buttons: true,
                    dangerMode: true,
                })
                .then(async(willDelete) => {
                    if (willDelete) {

                        const { data } = await axios.delete('/api/users', {

                            headers: {
                                Authorization: jwt
                            }

                        })

                        console.log(data)

                        const e = document.querySelector('.us---')
                        console.log(e, 'dddd')
                        swal('Registo completo', 'Inserção feita com sucesso!', 'success');




                    } else {
                        swal('Your imaginary file is safe!');
                    }
                });
        }
    }
}).mount('#app')

