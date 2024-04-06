import latlngs from './dashboard/data.js'

const socket = io();



socket.on("connect", () => {
    console.log('ddd')
});


socket.on('file-carregado', async({ data, type }) => {

    console.log(data, 'ddd')

    iziToast.success({
        title: 'GeoVespa, Arquivo carregado!',
        message: 'arquivo processado com sucesso!',
        position: 'topRight'
    });
    if (type == 'Armadilha') {
        data.forEach(armadilha => {
            app.armadilhas.push(armadilha)
            L.circle([armadilha.latitude, armadilha.longitude], {
                color: 'blue',
                tipo: 'armadilhas',
                fillColor: '#f03',
                id: armadilha.id,
                fillOpacity: 0.1,
                radius: armadilha.previsao ? armadilha.distancia : 10
            }).addTo(map).on('click', MapClick);
        });

    } else {
        data.forEach(ninho => {
            app.ninhos.push(ninho)
            L.circle([ninho.latitude, ninho.longitude], {
                color: 'red',
                tipo: 'ninhos',
                fillColor: '#f03',
                id: ninho.id,
                fillOpacity: 0.1,
                radius: ninho.previsao ? ninho.distancia : 10
            }).addTo(map).on('click', MapClick);
        });
    }


    try {
        await axios.get('/cookie')
    } catch (error) {

    }




});


const {
    createApp
} = Vue
const map = L.map('map').setView([41.5407012, -6.7701998], 9);

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright ">OpenStreetMap</a>'
}).addTo(map);








var polygon = L.polygon(latlngs, {
    color: 'blue'
}).addTo(map);

const app = createApp({
        data() {
            return {
       
                ninhos: [...ninhos],
                armadilhas: [...armadilhas],
                map_: true,
                message: 'Hello Vue!',
                tipo: '',
                exist: '',
                previsao: '0',
                dist: 0,
                data: {},
                e: {},
                index: -1,
                latlng: {},
                armadilha:{
                   nome:'',
                   numero:'',
                   descricao:'',
                   observacoes:[]
                },
                local: '',
                descricao: ''
            }
        },
        mounted() {

   

            const cor = (name) => {
                const color = {
                    'NOT EXIST': 'green',
                    'EXIST': 'red',
                    'Probably': '#ff0'
                }

                return color[name]
            }

   


            ninhos.forEach((ninho) => {


                console.log(ninho, 'dd--')




                L.circle([ninho.latitude, ninho.longitude], {
                    color: cor(ninho.existe),
                    tipo: 'ninhos',
                    fillColor: cor(ninho.existe),
                    id: ninho.id,
                    fillOpacity: 1,
                    radius: ninho.previsao ? (ninho.distancia / 3) : 10
                }).addTo(map);


                L.circle([ninho.latitude, ninho.longitude], {
                    color: '#ED7014',
                    tipo: 'ninhos',
                    fillColor: '#ED7014',
                    id: ninho.id,
                    fillOpacity: 0.6,
                    radius: ninho.previsao ? ((ninho.distancia * 2) / 3) : 10
                }).addTo(map);


                L.circle([ninho.latitude, ninho.longitude], {
                    color: '#ffff00',
                    tipo: 'ninhos',
                    fillColor: '#ffff00',
                    id: ninho.id,
                    fillOpacity: 0.3,
                    radius: ninho.previsao ? ninho.distancia : 10
                }).addTo(map).on('click', MapClick);


                L.circle([ninho.latitude, ninho.longitude], {
                    color: '#F00',
                    tipo: 'ninhos',
                    fillColor: '#F00',
                    id: ninho.id,
                    fillOpacity: 1,
                    radius: 10
                }).addTo(map);

            });


            armadilhas.forEach((armadilha) => {

                L.circle([armadilha.latitude, armadilha.longitude], {
                    color: 'white',
                    tipo: 'armadilhas',
                    fillColor: '#fff',
                    id: armadilha.id,
                    fillOpacity: 1,
                    radius: 300
                }).addTo(map).on('click', MapClick);



            });




        },
        methods: {
            async add() {

                try {
                    if (this.tipo == 'Armadilhas') {
                        const { data } = await axios.post('/api/armadilhas', {
                            data: {
                                latitude: app.latlng.lat,
                                longitude: app.latlng.lng,
                                ...app.armadilha



                            }
                        }, {

                            headers: {
                                Authorization: jwt
                            }

                        })


                        this.armadilhas.push(data)



                        L.circle([app.latlng.lat, app.latlng.lng], {
                            color: 'white',
                            tipo: 'armafilhas',
                            fillColor: '#fff',
                            id: data.id,
                            fillOpacity:1,
                            radius: 300
                        }).addTo(map).on('click', MapClick);

                        // myModal.hide()

                        $('#exampleModal1').modal('hide')


                    } else {
                        const { data:ninho } = await axios.post('/api/ninhos', {
                                data: {
                                    descricao: app.descricao,
                                    local: app.local,
                                    latitude: app.latlng.lat,
                                    longitude: app.latlng.lng,
                                    probabilidade: 0.9,
                                    existe: app.exist,
                                    previsao: app.previsao ? true : false,
                                    distancia: app.dist


                                }
                            }, {

                                headers: {
                                    Authorization: jwt
                                }

                            })
                            //  myModal.hide()
                        this.ninhos.push(ninho)

                        L.circle([ninho.latitude, ninho.longitude], {
                            color: cor(ninho.existe),
                            tipo: 'ninhos',
                            fillColor: cor(ninho.existe),
                            id: ninho.id,
                            fillOpacity: 1,
                            radius: ninho.previsao ? (ninho.distancia / 3) : 10
                        }).addTo(map);
        
        
                        L.circle([ninho.latitude, ninho.longitude], {
                            color: '#ED7014',
                            tipo: 'ninhos',
                            fillColor: '#ED7014',
                            id: ninho.id,
                            fillOpacity: 0.6,
                            radius: ninho.previsao ? ((ninho.distancia * 2) / 3) : 10
                        }).addTo(map);
        
        
                        L.circle([ninho.latitude, ninho.longitude], {
                            color: '#ffff00',
                            tipo: 'ninhos',
                            fillColor: '#ffff00',
                            id: ninho.id,
                            fillOpacity: 0.3,
                            radius: ninho.previsao ? ninho.distancia : 10
                        }).addTo(map).on('click', MapClick);
        
        
                        L.circle([ninho.latitude, ninho.longitude], {
                            color: '#F00',
                            tipo: 'ninhos',
                            fillColor: '#F00',
                            id: ninho.id,
                            fillOpacity: 1,
                            radius: 10
                        }).addTo(map);

                        L.circle([app.latlng.lat, app.latlng.lng], {
                            color: 'red',
                            tipo: 'ninhos',
                            fillColor: '#f03',
                            id: data.id,
                            fillOpacity: 0.1,
                            radius: data.previsao ? data.distancia : 10
                        }).addTo(map).on('click', MapClick);
                    }


                    $('#exampleModal1').modal('hide')

                    swal('Registo completo', 'Inserção feita com sucesso!', 'success');


                } catch (error) {
                    console.log('dddd', error)
                }
            },
            async update() {

                try {
                    if (this.tipo == 'Armadilhas') {
                        const { data } = await axios.put('/api/armadilhas/' + app.armadilha.id, {
                            data: {
                                latitude: app.latlng.lat,
                                longitude: app.latlng.lng,
                                ...app.armadilha,
                                code:app.armadilha.numero


                            }
                        }, {

                            headers: {
                                Authorization: jwt
                            }

                        })


                        app.armadilhas[app.index] = data
                        L.circle([app.latlng.lat, app.latlng.lng], {
                            color: 'blue',
                            tipo: 'armafilhas',
                            fillColor: '#fff',
                            id: data.id,
                            fillOpacity: 1,
                            radius: data.previsao ? data.distancia : 10
                        }).addTo(map).on('click', MapClick);




                    } else {
                        const { data } = await axios.put('/api/ninhos/' + app.data.id, {
                            data: {
                                descricao: app.descricao,
                                local: app.local,
                                latitude: app.latlng.lat,
                                longitude: app.latlng.lng,
                                probabilidade: 0.9,
                                existe: app.exist,
                                distancia: app.dist


                            }
                        }, {

                            headers: {
                                Authorization: jwt
                            }

                        })
                        const ninho=data

                        app.ninhos[app.index] = data


                        L.circle([ninho.latitude, ninho.longitude], {
                            color: '#ED7014',
                            tipo: 'ninhos',
                            fillColor: '#ED7014',
                            id: ninho.id,
                            fillOpacity: 0.6,
                            radius: ninho.previsao ? ((ninho.distancia * 2) / 3) : 10
                        }).addTo(map);
        
        
                        L.circle([ninho.latitude, ninho.longitude], {
                            color: '#ffff00',
                            tipo: 'ninhos',
                            fillColor: '#ffff00',
                            id: ninho.id,
                            fillOpacity: 0.3,
                            radius: ninho.previsao ? ninho.distancia : 10
                        }).addTo(map).on('click', MapClick);
        
        
                        L.circle([ninho.latitude, ninho.longitude], {
                            color: '#F00',
                            tipo: 'ninhos',
                            fillColor: '#F00',
                            id: ninho.id,
                            fillOpacity: 1,
                            radius: 10
                        }).addTo(map);

                        L.circle([app.latlng.lat, app.latlng.lng], {
                            color: 'red',
                            tipo: 'ninhos',
                            fillColor: '#f03',
                            id: data.id,
                            fillOpacity: 0.1,
                            radius: data.previsao ? data.distancia : 10
                        }).addTo(map).on('click', MapClick);

                       /* L.circle([app.latlng.lat, app.latlng.lng], {
                            color: 'red',
                            tipo: 'ninhos',
                            fillColor: '#f03',
                            id: data.id,
                            fillOpacity: 0.1,
                            radius: data.previsao ? data.distancia : 10
                        }).addTo(map).on('click', MapClick);
                        */
                    }

                    app.e.target.remove()
                        //  myModal.hide()

                    swal('Registo completo', 'Atualização feita com sucesso!', 'success');


                } catch (error) {
                    console.log('dddd', error)
                }
            },
            eliminar() {
                swal({
                        title: 'Tem a Certeza?',
                        text: 'Esta operação removerá o registo!',
                        icon: 'warning',
                        buttons: true,
                        dangerMode: true,
                    })
                    .then(async(willDelete) => {
                        if (willDelete) {

                            try {
                                if (app.tipo == 'Armadilhas') {
                                    const { data } = await axios.delete('/api/armadilhas/' + app.data.id, {
                                        headers: {
                                            Authorization: jwt
                                        }

                                    })

                                    app.armadilhas.splice(app.index, 1)
                                } else {
                                    const { data } = await axios.delete('/api/ninhos/' + app.data.id, {
                                        headers: {
                                            Authorization: jwt
                                        }

                                    })

                                    app.ninhos.splice(app.index, 1)
                                }
                                // myModal.hide()

                                $('#exampleModal1').modal('hide')

                                app.e.target.remove()


                                swal('Operação feita com sucesso!', {
                                    icon: 'success',
                                });
                            } catch (error) {

                            }



                        } else {
                            //  swal('Your imaginary file is safe!');
                        }
                    });
            }
        }
    }).mount('#add')
    /*var myModalEl = document.getElementById('exampleModal1')
    myModalEl.addEventListener('hidden.bs.modal', function(event) {
      app.map_ = true
      app.local = ''
      app.tipo = ''
      app.descricao = ''
    })

    */


function onMapClick(e) {

    app.latlng = e.latlng
    add.show()
   // $('#exampleModal1').modal('show')


}

//  openModal()

map.on('click', onMapClick);

/*
$('#exampleModal1').on('hide.bs.modal', function(event) {
    app.map_ = true

    app.dist = 0
    app.descricao = ''
    app.exist = ''
    app.previsao = '0'
    app.local = ''

    console.log(app.map_)
})

*/
function MapClick(e) {

    app.e = e
    if (e.sourceTarget.options.tipo == 'armadilhas') {
        const data = app.armadilhas.find(e1 => e1.id == e.sourceTarget.options.id)
        app.previsao = data.previsao ? 1 : 0
        app.exist = data.existe
        app.dist = data.distancia

        console.log(data)



        if (data) {
            //app.map_ = true
            app.data = data

            
            app.index = app.armadilhas.indexOf(data)

            console.log(app.index)
 
            app.armadilha = { ...data,
                numero:data.code,
                observacoes:app.armadilhas[app.index].observacoes }

            app.tipo = "Armadilhas"
            app.latlng = { lat: data.latitude, lng: data.longitude }
            app.local = data.local
            app.descricao = data.descricao

            app.map_ = false

          //  $('#exampleModal1').modal('show')
                // myModal.show()


                app.table=   $("#table-1").DataTable({
                    language: {
                        url: '../assets/vendor/libs/datatables/pt.json',
                    },
                    "columnDefs": [
                        { "sortable": false, "targets": [0, 2, 3] }
                    ],
                    order: [
                            [1, "asc"]
                        ] //column indexes is zero based
        
                });

                app.table.clear().draw();

                app.armadilha.observacoes.forEach(visita => {
                    let row = `
                    <tr >
                    <td>${visita.data}</td>
                    <td>${visita.numero_vespa}</td>
                    <td>${visita.createdAt.split('T')[0]}</td>
                    <td>Ativo</td>
                </tr> `
                app.table.row.add($(row)).draw()
                });





        } else {
            app.map_ = true
        }


    } else {
        const data = app.ninhos.find(e1 => e1.id == e.sourceTarget.options.id)
        app.previsao = data.previsao ? 1 : 0
        app.exist = data.existe
        app.dist = data.distancia

        if (data) {
            app.data = data
            app.index = app.ninhos.indexOf(data)
            app.tipo = "Ninhos"
            app.latlng = { lat: data.latitude, lng: data.longitude },
                app.local = data.local,
                app.descricao = data.descricao

            app.map_ = false
           // $('#exampleModal1').modal('show')
        } else {
            app.map_ = true
        }

    }


   

}





const visita = createApp({
    data() {
        return {
            visita:{}
        }
    },
    mounted() {


    },
    methods: {
       async addvista(){

        const armadilha=app.armadilhas.find(armadilha=>armadilha.code==this.visita.armadilha)

        if(!armadilha){


            return
        }

        const index=app.armadilhas.indexOf(armadilha)

        try {
            const { data } = await axios.post('/api/armadilha/visita', {
                data: this.visita
            }, {

                headers: {
                    Authorization: jwt
                }

            }) 


            app.armadilhas[index].observacoes.push(data)

            $('#visita').modal('hide')

            swal('Registo completo', 'Inserção feita com sucesso!', 'success');
        } catch (error) {
            console.log('dddd', error)
        }

        }
    }
}).mount('#visita')