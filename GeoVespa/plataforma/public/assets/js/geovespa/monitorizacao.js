const { createApp, ref } = Vue
 import {z} from 'https://cdn.jsdelivr.net/npm/zod@3.21.4/+esm' 
 import latlngs from '../dashboard/data.js'



 const socket = io();



socket.on("connect", () => {
    console.log('ddd')
});


socket.on('file-carregado-visitas', async({ data }) => {

    app.map.eachLayer(function(layer){

        if(layer.options.tipo){
            if(layer.options.tipo=='armadilhas'){
                app.map.removeLayer(layer);
            }
        }
    });

    data.forEach(armadilha => {

        console.log(armadilha)

        if(armadilha.visitas.length>0){
            const v=armadilha.visitas[armadilha.visitas.length-1]

            if(dayjs().diff(v.data, 'day')>14){
                L.circle([armadilha.latitude, armadilha.longitude], {
                    color: 'yellow',
                    tipo: 'armadilhas',
                    fillColor: 'yellow',
                    id: armadilha.code,
                    fillOpacity: 1,
                    radius: armadilha.distancia|| 700
                }).addTo(app.map).on('click', app.view);
            }else{
                L.circle([armadilha.latitude, armadilha.longitude], {
                    color: 'green',
                    tipo: 'armadilhas',
                    fillColor: 'green',
                    id: armadilha.code,
                    fillOpacity: 1,
                    radius: armadilha.distancia|| 700
                }).addTo(app.map).on('click', app.view);
            }
            console.log(v)
        }else{
            L.circle([armadilha.latitude, armadilha.longitude], {
                color: 'green',
                tipo: 'armadilhas',
                fillColor: 'green',
                id: armadilha.code,
                fillOpacity: 1,
                radius: armadilha.distancia|| 700
            }).addTo(app.map).on('click', app.view);
        }




    });

    app.armadilhas=data
    iziToast.success({
        title: 'GeoVespa, Arquivo carregado!',
        message: 'arquivo processado com sucesso!',
        position: 'topRight'
    });


});

let user={

    coords:null
}

const app=createApp({
  setup() {
   
    return {

    }
  },
  data() {
    return {
        add:{
            type:'ninho'
         },
         view_map:false,
         ninho:{},
         ninhos,
         armadilhas:armadilhas,
         armadilha:{},
         table:null,
         visita:{
            type:'dado'
         }
    };
  },
  mounted () {
    this.map = L.map('map').setView([41.5407012, -6.7701998], 9);



    var polygon = L.polygon(latlngs, {
        color: 'blue',
        fillColor: 'transparent',
    }).addTo(this.map);


   this.table= $('#table-visita').DataTable({
      dom: 'Bfrtip',
      buttons: [
         'csv', 'excel', 'pdf'
      ]
    });

    // this.ninhos=localStorage.getItem('ninhos')?JSON.parse(localStorage.getItem('ninhos')):[]
   //  this.armadilhas=localStorage.getItem('armadilhas')?JSON.parse(localStorage.getItem('armadilhas')):[]

    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        type: "satellite",
        attribution: '&copy;'
    }).addTo(this.map);



    this.armadilhas.forEach(armadilha => {


        if(armadilha.visitas.length>0){
            const v=armadilha.visitas[armadilha.visitas.length-1]

            if(dayjs().diff(v.data, 'day')>14){
                L.circle([armadilha.latitude, armadilha.longitude], {
                    color: 'yellow',
                    tipo: 'armadilhas',
                    fillColor: 'yellow',
                    id: armadilha.code,
                    fillOpacity: 1,
                    radius: armadilha.distancia|| 700
                }).addTo(this.map).on('click', this.view);
            }else{
                L.circle([armadilha.latitude, armadilha.longitude], {
                    color: 'green',
                    tipo: 'armadilhas',
                    fillColor: 'green',
                    id: armadilha.code,
                    fillOpacity: 1,
                    radius: armadilha.distancia|| 700
                }).addTo(this.map).on('click', this.view);
            }
            console.log(v)
        }else{
            L.circle([armadilha.latitude, armadilha.longitude], {
                color: 'green',
                tipo: 'armadilhas',
                fillColor: 'green',
                id: armadilha.code,
                fillOpacity: 1,
                radius: armadilha.distancia|| 700
            }).addTo(this.map).on('click', this.view);
        }

     




    });









   

  },
  methods: {

    view(e){


        this.view_map=true
        this.e=e

        if(e.target.options.tipo!='ninhos'){
            this.armadilha=this.armadilhas.find(a=>a.code==e.target.options.id)

        


            app.table.clear().draw();
            app.armadilha.visitas= app.armadilha.visitas||[]
            app.armadilha.visitas.forEach(visita => {
                let row = `
                <tr >
                <td>${app.armadilha.code}</td>
                <td>${visita.data}</td>
                <td>${visita.numero_vespa}</td>
                <td>${visita?.createdAt?.split('T')[0]}</td>
               
            </tr> `
            app.table.row.add($(row)).draw()
            });
            
            $('.view_armadilha').modal('show')

        }


    },
    onMapClick(e){
        if(!this.view_map){
            this.add.lat = e.latlng.lat
            this.add.lng = e.latlng.lng
          $('.add').modal('show')
        }

        this.view_map=false

    },
    async delninho(){
        swal({
            title: 'Remoção de Ninho?',
            text: 'Esta operação removerá o registo deste ninho!',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
          })
            .then(async(willDelete) => {
              if (willDelete) {

                try {
                    const { data } = await axios.delete('/api/ninhos/' + app.ninho.id, {
                        headers: {
                            Authorization: jwt
                        }

                    })

                    swal('Poof! Your imaginary file has been deleted!', {
                        icon: 'success',
                      });
      
                      $('.view_ninho').modal('hide')
                      app.ninhos.splice(app.ninho.index, 1)
                      app.e.target.remove()
                      localStorage.setItem('ninhos',JSON.stringify(this.ninhos))
                } catch (error) {
                    iziToast.error({
                        title: "GeoVespa",
                        message: 'Ocorreu erro',
                        position: 'topRight'
                      });
                }

              }
            });
    },
    async delarmadilha(){
        swal({
            title: 'Remoção de Armadilha?',
            text: 'Esta operação removerá o registo desta Armadilha!',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
          })
            .then(async(willDelete) => {
              if (willDelete) {


                try {
                    const { data } = await axios.delete('/api/armadilhas/' + app.armadilha.id, {
                        headers: {
                            Authorization: jwt
                        }

                    })
                    swal('Poof! Your imaginary file has been deleted!', {
                        icon: 'success',
                      });
      
                      $('.view_armadilha').modal('hide')
                      app.armadilhas.splice(app.armadilha.index, 1)
                      app.e.target.remove()
                      localStorage.setItem('armadilhas',JSON.stringify(app.armadilhas))
                } catch (error) {
                    iziToast.error({
                        title: "GeoVespa",
                        message: 'Ocorreu erro',
                        position: 'topRight'
                      });
                }

              }
            });
    },
  }
}).mount('#app')




app.map.on('click', app.onMapClick);







const form_visita = document.querySelector('#upload-visita-form');

form_visita.addEventListener('submit', async(e) => {
    e.preventDefault();



if(app.visita.type=='dado'){

    const armadilha= app.armadilhas.find(a=>a.code==app.visita.armadilha)

    if(armadilha){
     app.visita.armadilha=armadilha.id
     try {
 
 
 
 
 
 
         const { data } = await axios.post('/api/armadilha/visita', {
             data: app.visita
         }, {
             headers: {
                 Authorization: jwt
             }
 
         }) 
 
         armadilha.index=app.armadilhas.indexOf(armadilha)
         armadilha.visitas=armadilha.visitas||[]
      
         armadilha.visitas.push(data)
          
         app.armadilhas[armadilha.index]=armadilha
      
         localStorage.setItem('armadilhas',JSON.stringify(app.armadilhas))
      
      
      
         swal('Registo Visita de Armadilha', 'Operação feita com sucesso!', 'success').then(()=>{
          app.visita={}
      
          $('.visita').modal('hide')
         })
         
     } catch (error) {
 
         console.log(error)
         iziToast.error({
             title: "GeoVespa",
             message: 'Ocorreu erro',
             position: 'topRight'
           });
     }
 


    }else{
     iziToast.error({
       title: 'Armadilha',
       message: 'Armadilha não encontrado',
       position: 'topRight'
     });
    }
}else{
    try {
        const res = await fetch('/api/armadilha/upload', {
            method: 'post',
            body: new FormData(e.target),
            headers: {
                Authorization: jwt
            }
        });

        const data = await res.json()

        if (data.file) {
            iziToast.success({
                title: 'GeoVespa, Arquivo submetido!',
                message: 'Arquivo em processo!',
                position: 'topRight'
            });
            $('.visita').modal('hide')
        } else {

        }

    } catch (error) {
        console.log('dddd', error)
    }

}






});

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
     // x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

getLocation()

function showPosition(position) {

   user.marker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(app.map);
user.coords=position.coords
   
}
user.armadilha={
    lng:10000000000,
    lat:10000000000
}

setInterval(() => {

    app.map.removeLayer(user.marker)
    getLocation()


    app.index=-1
    app.map.eachLayer(function(layer) {

  

  
        if(!layer._latlng) return
        app.index++
        if(layer._latlng.lat!=user.coords.latitude&&layer._latlng.lng!=user.coords.longitude){
        

            let lat=user.coords.latitude-layer._latlng.lat
            let lng=user.coords.longitude-layer._latlng.lng
            lat*=lat
            lng*=lng



            if(app.index==0){
                user.armadilha.lat=lat
                user.armadilha.layer=layer
                user.armadilha.lng=lng
            }else if(user.armadilha.lat>lat && user.armadilha.lng>lng){
                user.armadilha.lat=lat
                user.armadilha.layer=layer
                user.armadilha.lng=lng

                const {options} = user.armadilha.layer
                user.armadilha.layer.remove()

                const armadilha=app.armadilhas.find(d=>d.code==options.id)

                console.log(armadilha)

    
                    L.circle([armadilha.latitude, armadilha.longitude], {
                        color: 'green',
                        tipo: 'armadilhas',
                        fillColor: 'blue',
                        id: armadilha.code,
                        fillOpacity: 1,
                        radius: 10
                    }).addTo(app.map).on('click', app.view);

                    app.map.setView([armadilha.latitude, armadilha.longitude])
              
             
                 console.log(options,app.index)
            }


        }
    });


  //  console.log(features,'---')
}, 3000);

