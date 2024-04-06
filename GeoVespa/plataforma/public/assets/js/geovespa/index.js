const { createApp, ref } = Vue
 import {z} from 'https://cdn.jsdelivr.net/npm/zod@3.21.4/+esm' 
 import latlngs from './../dashboard/data.js'


 function evento_ninho(ninho) {

if(ninho.distancia){
    L.circle([ninho.latitude, ninho.longitude], {
        color: 'transparent',
        tipo: 'ninhos',
        fillColor: 'red',
        id: ninho.vespa_id,
        fillOpacity: 0.1,
        radius: ninho.distancia/2
    }).addTo(app.map)

    L.circle([ninho.latitude, ninho.longitude], {
        color: 'transparent',
        tipo: 'ninhos',
        fillColor: 'yellow',
        id: ninho.vespa_id,
        fillOpacity: 0.1,
        radius:  ninho.distancia
    }).addTo(app.map)




    L.circle([ninho.latitude, ninho.longitude], {
        color: 'red',
        tipo: 'ninhos',
        fillColor: 'red',
        id: ninho.vespa_id,
        fillOpacity: 1,
        radius:50,
    }).addTo(app.map).on('click',app.view);

}else{
    L.circle([ninho.latitude, ninho.longitude], {
        color: 'red',
        tipo: 'ninhos',
        fillColor: 'red',
        id: ninho.vespa_id,
        fillOpacity: 1,
        radius:50,
    }).addTo(app.map).on('click',app.view);
}

    
 }


 function evento_armadilha(armadilha) {

    if(!armadilha.visitas){
        armadilha.visitas=[]
    }

    if(armadilha.visitas.length>0){
        const v=armadilha.visitas[armadilha.visitas.length-1]

        if(dayjs().diff(v.data, 'day')>14){
    
            L.circle([armadilha.latitude, armadilha.longitude], {
                color: 'transparent',
                tipo: 'armadilhas',
                fillColor: 'yellow',
                id: armadilha.id,
                fillOpacity: 0.5,
                radius: v.raio2
            }).addTo(app.map)
        

            L.circle([armadilha.latitude, armadilha.longitude], {
                color: 'transparent',
                tipo: 'armadilhas',
                fillColor: 'red',
                id: armadilha.id,
                fillOpacity: 0.2,
                radius: v.raio1
            }).addTo(app.map)
        
    
        
            L.circle([armadilha.latitude, armadilha.longitude], {
                color: 'orange',
                tipo: 'armadilhas',
                fillColor: 'orange',
                id: armadilha.id,
                fillOpacity: 1,
                radius:50,
            }).addTo(app.map).on('click',app.view);
        }else{


            L.circle([armadilha.latitude, armadilha.longitude], {
                color: 'transparent',
                tipo: 'armadilhas',
                fillColor: 'yellow',
                id: armadilha.id,
                fillOpacity: 0.5,
                radius: v.raio2
            }).addTo(app.map)
        

            L.circle([armadilha.latitude, armadilha.longitude], {
                color: 'transparent',
                tipo: 'armadilhas',
                fillColor: 'red',
                id: armadilha.id,
                fillOpacity: 0.2,
                radius: v.raio1
            }).addTo(app.map)

    
        
            L.circle([armadilha.latitude, armadilha.longitude], {
                color: 'green',
                tipo: 'armadilhas',
                fillColor: 'green',
                id: armadilha.id,
                fillOpacity: 1,
                radius:50,
            }).addTo(app.map).on('click',app.view);
        }
    
    }else{
        if(dayjs().diff(armadilha.data, 'day')>14){
    
            L.circle([armadilha.latitude, armadilha.longitude], {
                color: 'transparent',
                tipo: 'armadilhas',
                fillColor: 'yellow',
                id: armadilha.id,
                fillOpacity: 0.5,
                radius: armadilha.distancia|| 1500
            }).addTo(app.map)
        

            L.circle([armadilha.latitude, armadilha.longitude], {
                color: 'transparent',
                tipo: 'armadilhas',
                fillColor: 'red',
                id: armadilha.id,
                fillOpacity: 0.2,
                radius: armadilha.distancia|| 1000
            }).addTo(app.map)
        
    
        
            L.circle([armadilha.latitude, armadilha.longitude], {
                color: 'orange',
                tipo: 'armadilhas',
                fillColor: 'orange',
                id: armadilha.id,
                fillOpacity: 1,
                radius:50,
            }).addTo(app.map).on('click',app.view);
        }else{

            L.circle([armadilha.latitude, armadilha.longitude], {
                color: 'transparent',
                tipo: 'armadilhas',
                fillColor: 'yellow',
                id: armadilha.id,
                fillOpacity: 0.5,
                radius: armadilha.distancia|| 1500
            }).addTo(app.map)
        

            L.circle([armadilha.latitude, armadilha.longitude], {
                color: 'transparent',
                tipo: 'armadilhas',
                fillColor: 'red',
                id: armadilha.id,
                fillOpacity: 0.2,
                radius: armadilha.distancia|| 1000
            }).addTo(app.map)
    
        
            L.circle([armadilha.latitude, armadilha.longitude], {
                color: 'green',
                tipo: 'armadilhas',
                fillColor: 'green',
                id: armadilha.id,
                fillOpacity: 1,
                radius:50,
            }).addTo(app.map).on('click',app.view);
        }
    }


    
        
     }



 function color(distancia) {

       if(distancia<500){
        return 'red'
      }else{
        return 'yellow'
      }
 }


 const socket = io();



socket.on("connect", () => {
    console.log('ddd')
});


socket.on('file-carregado-ninhos', async({ data }) => {

    app.map.eachLayer(function(layer){

        if(layer.options.tipo){
            if(layer.options.tipo=='ninhos'){
               app.map.removeLayer(layer);
            }
        }
    });


    data.forEach(ninho => {
        evento_ninho(ninho)   
    });


    app.ninhos=data

    iziToast.success({
        title: 'GeoVespa, Arquivo carregado!',
        message: 'arquivo processado com sucesso!',
        position: 'topRight'
    });


});

socket.on('file-carregado-visitas', async({ data }) => {

    app.map.eachLayer(function(layer){

        if(layer.options.tipo){
            if(layer.options.tipo=='armadilhas'){
                app.map.removeLayer(layer);
            }
        }
    });

    document.getElementById('table1').innerHTML=`
        <tr >
        <th >Identificação</th>
        <th >Qrcode</th>
    </tr>
    `

    data.forEach(armadilha => {
           evento_armadilha(armadilha)

    const data_=JSON.stringify({
        id:armadilha.id
        })

    document.getElementById('table1').innerHTML+=`
            <tr scope="row">
            <th scope="col">${armadilha.id}</th>
            <th scope="col">
                <img style="width: 100px;height: 100px;" src="https://chart.googleapis.com/chart?cht=qr&chl=${btoa(data_)}&chs=160x160&chld=L|0">
            </th>
            </tr>
    `

    });

    app.armadilhas=data
    iziToast.success({
        title: 'GeoVespa, Arquivo carregado!',
        message: 'arquivo processado com sucesso!',
        position: 'topRight'
    });


});



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
         ninho:{
            anexos:[]
         },
         ninhos,
         armadilhas:armadilhas,
         armadilha:{
            anexos:[]
         },
         table:null,
         visita:{
            type:'dado'
         }
    };
  },
  mounted () {
    this.map =window.map



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




    this.ninhos.forEach(ninho => {


    if(!!ninho.distancia){
        L.circle([ninho.latitude, ninho.longitude], {
            color: 'transparent',
            tipo: 'ninhos',
            fillColor: 'red',
            id: ninho.vespa_id,
            fillOpacity: 0.1,
            radius:  ninho.distancia/2
        }).addTo(this.map)

        L.circle([ninho.latitude, ninho.longitude], {
            color: 'transparent',
            tipo: 'ninhos',
            fillColor: 'yellow',
            id: ninho.vespa_id,
            fillOpacity: 0.1,
            radius:  ninho.distancia
        }).addTo(this.map)




        L.circle([ninho.latitude, ninho.longitude], {
            color: 'red',
            tipo: 'ninhos',
            fillColor: 'red',
            id: ninho.vespa_id,
            fillOpacity: 1,
            radius:50,
        }).addTo(this.map).on('click',this.view);
    }else{

    
        L.circle([ninho.latitude, ninho.longitude], {
            color: 'red',
            tipo: 'ninhos',
            fillColor: 'red',
            id: ninho.vespa_id,
            fillOpacity: 1,
            radius:50,
        }).addTo(this.map).on('click',this.view);
    }

    });

    this.armadilhas.forEach(armadilha => {


        if(!armadilha.visitas){
            armadilha.visitas=[]
        }
    
        if(armadilha.visitas.length>0){
            const v=armadilha.visitas[armadilha.visitas.length-1]
    
            if(dayjs().diff(v.data, 'day')>14){
        
                L.circle([armadilha.latitude, armadilha.longitude], {
                    color: 'transparent',
                    tipo: 'armadilhas',
                    fillColor: 'yellow',
                    id: armadilha.id,
                    fillOpacity: 0.5,
                    radius: v.raio2
                }).addTo(this.map)
            

                L.circle([armadilha.latitude, armadilha.longitude], {
                    color: 'transparent',
                    tipo: 'armadilhas',
                    fillColor: 'red',
                    id: armadilha.id,
                    fillOpacity: 0.2,
                    radius: v.raio1
                }).addTo(this.map)
            
        
            
                L.circle([armadilha.latitude, armadilha.longitude], {
                    color: 'orange',
                    tipo: 'armadilhas',
                    fillColor: 'orange',
                    id: armadilha.id,
                    fillOpacity: 1,
                    radius:50,
                }).addTo(this.map).on('click',this.view);
            }else{

                L.circle([armadilha.latitude, armadilha.longitude], {
                    color: 'transparent',
                    tipo: 'armadilhas',
                    fillColor: 'yellow',
                    id: armadilha.id,
                    fillOpacity: 0.5,
                    radius: v.raio2
                }).addTo(this.map)
            

                L.circle([armadilha.latitude, armadilha.longitude], {
                    color: 'transparent',
                    tipo: 'armadilhas',
                    fillColor: 'red',
                    id: armadilha.id,
                    fillOpacity: 0.2,
                    radius: v.raio1
                }).addTo(this.map)
  
                L.circle([armadilha.latitude, armadilha.longitude], {
                    color: 'green',
                    tipo: 'armadilhas',
                    fillColor: 'green',
                    id: armadilha.id,
                    fillOpacity: 1,
                    radius:50,
                }).addTo(this.map).on('click',this.view);
            }
        
        }else{

       
            if(dayjs().diff(armadilha.data, 'day')>14){
  
                L.circle([armadilha.latitude, armadilha.longitude], {
                    color: 'transparent',
                    tipo: 'armadilhas',
                    fillColor: 'yellow',
                    id: armadilha.id,
                    fillOpacity: 0.5,
                    radius: armadilha.distancia|| 1500
                }).addTo(this.map)
            

                L.circle([armadilha.latitude, armadilha.longitude], {
                    color: 'transparent',
                    tipo: 'armadilhas',
                    fillColor: 'red',
                    id: armadilha.id,
                    fillOpacity: 0.2,
                    radius: armadilha.distancia|| 1000
                }).addTo(this.map)
        
            
                L.circle([armadilha.latitude, armadilha.longitude], {
                    color: 'orange',
                    tipo: 'armadilhas',
                    fillColor: 'orange',
                    id: armadilha.id,
                    fillOpacity: 1,
                    radius:50,
                }).addTo(this.map).on('click',this.view);
            }else{

                L.circle([armadilha.latitude, armadilha.longitude], {
                    color: 'transparent',
                    tipo: 'armadilhas',
                    fillColor: 'yellow',
                    id: armadilha.id,
                    fillOpacity: 0.5,
                    radius: armadilha.distancia|| 1500
                }).addTo(this.map)
            

                L.circle([armadilha.latitude, armadilha.longitude], {
                    color: 'transparent',
                    tipo: 'armadilhas',
                    fillColor: 'red',
                    id: armadilha.id,
                    fillOpacity: 0.2,
                    radius: armadilha.distancia|| 1000
                }).addTo(this.map)
    
            
                L.circle([armadilha.latitude, armadilha.longitude], {
                    color: 'green',
                    tipo: 'armadilhas',
                    fillColor: 'green',
                    id: armadilha.id,
                    fillOpacity: 1,
                    radius:50,
                }).addTo(this.map).on('click',this.view);
            }
        }
    




    });



      



  },
  methods: {

    foto(anexos){

    //   document.getElementById('idd').innerHTML=""
        anexos.forEach(anexo => {
     /*   document.getElementById('idd').innerHTML+=`
            <div>
            <img style="width: 100%;" src="${anexo.url}" onclick="f(${anexo.id},${this.armadilha.id})"   >
                <div class="carousel-caption">
                <h5>${anexo.createdAt.split('T')[0]}</h5>

                </div>
            </div>
            
        `

*/

/*
        $('#idd').owlCarousel('add',`
        <nav>
        <img style="width: 100%;" src="${anexo.url}" onclick="f(${anexo.id},${this.armadilha.id})"   >
        </nav>

           
        
        `).owlCarousel('update');

*/
        });


      
        
    },

    view(e){


        this.view_map=true
        this.e=e
        this.e.remove=()=>e.target.remove()

        if(e.target.options.tipo=='ninhos'){


            console.log(e.target.options)


            this.ninho=this.ninhos.find(n=>n.vespa_id==e.target.options.id)
          
            if(this.ninho){
                if(!this.ninho.anexos){
                    this.ninho.anexos=[]
                }
                this.ninho.index=this.ninhos.indexOf(this.ninho)
                $('.view_ninho').modal('show')
            }

        }else{

            this.armadilha=this.armadilhas.find(a=>a.id==e.target.options.id)
      
            if(!this.armadilha.anexos){
                this.armadilha.anexos=[]
            }

       

        


            app.table.clear().draw();
            app.armadilha.visitas= app.armadilha.visitas||[]
            app.armadilha.visitas.forEach(visita => {
                let row = `
                <tr >
                <td>${app.armadilha.id}</td>
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


window.f=function f(id,armadilha){
    swal({
        title: 'Remoção de Ninho?',
        text: 'Esta operação removerá o registo deste ninho!',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      })
        .then(async(willDelete) => {
          if (willDelete) {



          }
        });
 }




app.map.on('click', app.onMapClick);


const form = document.querySelector('#upload-vespa-form');

form.addEventListener('submit', async(e) => {
    e.preventDefault();
    //  myModal.show();

   try {
        const res = await fetch('/api/ninhos/upload', {
            method: 'post',
            body: new FormData(e.target),
            headers: {
                Authorization: jwt
            }
        });

        const data = await res.json()


        if (data.file) {
           $('.upload').modal('hide')
            iziToast.success({
                title: 'GeoVespa, Arquivo submetido!',
                message: 'Arquivo em processo!',
                position: 'topRight'
            });

        } else {

        }

    } catch (error) {
        console.log('dddd', error)
    }

  

});


const form_armadilha = document.querySelector('#upload-armadilha-form');

form_armadilha.addEventListener('submit', async(e) => {
    e.preventDefault();
    //  myModal.show();

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
           $('.upload-armadilha').modal('hide')
            iziToast.success({
                title: 'GeoVespa, Arquivo submetido!',
                message: 'Arquivo em processo!',
                position: 'topRight'
            });

        } else {

        }

    } catch (error) {
        console.log('dddd', error)
    }

  

});


const form_add = document.querySelector('#form-add');

form_add.addEventListener('submit', async(e) => {
    e.preventDefault();
    //  myModal.show();

    if(app.add.type=='armadilha'){
        try {

            const armadilha_data = z.object({
                distrito: z.string(),
                concelho: z.string(),
                data: z.string(),
                code: z.string().default(crypto.randomUUID()),
                lat: z.number(),
                lng: z.number(),
              });
        
              const armadilha=armadilha_data.parse(app.add)

              if(armadilha.data) {
                const body= new FormData(e.target) 
                body.append ('data',JSON.stringify({
                  latitude:armadilha.lat,
                  longitude:armadilha.lng,
                  ...armadilha
                }));
                  const res = await fetch('/api/armadilhas', {
                      method: 'post',
                      body,
                      headers: {
                          Authorization: jwt
                      }
                  });
          
                  const data = await res.json()
          
                  data.visitas=[]
              
                  swal('Registo de Armadilha de Vespa', 'Operação feita com sucesso!', 'success');
                  evento_armadilha(data)
              
                  
                app.armadilhas.push(data)
        
                localStorage.setItem('armadilhas',JSON.stringify(app.armadilhas))
               $('.add').modal('hide')
               app.add={
                type:'ninho'
               }
              }

        
            } catch (error) {
                console.log('dddd', error)
                if(error.name=='ZodError'){
                    // console.log(error)
                     error.issues.forEach(ZodError => {
                         iziToast.error({
                             title: ZodError.path[0],
                             message: 'Preenche por favor',
                             position: 'topRight'
                           });
                                     
                     });
                 }else{
                    iziToast.error({
                        title: "GeoVespa",
                        message: 'Ocorreu um erro',
                        position: 'topRight'
                      });
                 }
            }
        
    }else{
        try {

       
 
            const ninho_data = z.object({
                distrito: z.string(),
                concelho: z.string(),
                code: z.string().default(crypto.randomUUID()),
                lat: z.number(),
                lng: z.number(),
                data: z.string()
              });
        
        
        
              const ninho=ninho_data.parse(app.add)

              if(ninho.data){
                const body= new FormData(e.target)
                body.append('data',JSON.stringify({
                    ...ninho,
                    latitude:ninho.lat,
                    longitude:ninho.lng,
                    vespa_id:ninho.code,
                  }));
            
                    const res = await fetch('/api/ninhos', {
                        method: 'post',
                        body,
                        headers: {
                            Authorization: jwt
                        }
                    });
            
                    const data = await res.json()

                    console.log(data)
    
                    swal('Registo de Ninho de Vespa', 'Operação feita com sucesso!', 'success');
    
    
                    evento_ninho(data)
                    
                    app.ninhos.push(data)
          
                  localStorage.setItem('ninhos',JSON.stringify(app.ninhos))
                 $('.add').modal('hide')
                 app.add={
                  type:'ninho'
                 }
              }

        
        
        
            } catch (error) {
                console.log('dddd', error)
                if(error.name=='ZodError'){
                    // console.log(error)
                     error.issues.forEach(ZodError => {
                         iziToast.error({
                             title: ZodError.path[0],
                             message: 'Preenche por favor',
                             position: 'topRight'
                           });
                                     
                     });
                 }else{
                    iziToast.error({
                        title: "GeoVespa",
                        message: 'Ocorreu um erro',
                        position: 'topRight'
                      });
                 }
         
      
            }
        
    }


  

});



const form_visita = document.querySelector('#upload-visita-form');

form_visita.addEventListener('submit', async(e) => {
    e.preventDefault();


if(app.visita.type=='dado'){

    const armadilha= app.armadilhas.find(a=>a.id==app.visita.armadilha)

    if(armadilha){
     app.visita.armadilha=armadilha.id
     try {

        const body= new FormData(e.target)
        body.append('data',JSON.stringify(app.visita));

        const res = await fetch('/api/armadilha/visita', {
            method: 'post',
            body,
            headers: {
                Authorization: jwt
            }
        });

        const data = await res.json()
 
 
         armadilha.index=app.armadilhas.indexOf(armadilha)
         armadilha.visitas=armadilha.visitas||[]
      
         armadilha.visitas.push(data)
          
         app.armadilhas[armadilha.index]=armadilha
      
         localStorage.setItem('armadilhas',JSON.stringify(app.armadilhas))
      
      
      
         swal('Registo Visita de Armadilha', 'Operação feita com sucesso!', 'success').then(()=>{
          app.visita={
            type:'dado'
          }

          app.map.eachLayer(function(layer){

            if(layer.options.tipo){
                if(layer.options.id==armadilha.code){
                    app.map.removeLayer(layer);
                }
            }
        });

          const v=armadilha.visitas[armadilha.visitas.length-1]

          evento_armadilha(armadilha)
      
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

//////////////////////////////////////////////////////////////////////



const form_armadilha_anexos = document.querySelector('#upload-armadilha-form-anexos');

form_armadilha_anexos.addEventListener('submit', async(e) => {
    e.preventDefault();
    //  myModal.show();

   try {

    const body= new FormData(e.target) 
    body.append('data',JSON.stringify({id:app.armadilha.id}));

        const res = await fetch('/api/armadilhas/anexos', {
            method: 'post',
            body,
            headers: {
                Authorization: jwt
            }
        });




        const data = await res.json()

        console.log(data)


        if (data) {
         //

         const index=app.armadilhas.indexOf(app.armadilha)
         app.armadilha=data
         app.armadilhas[index]=app.armadilha


        //   $('.upload').modal('hide')
            iziToast.success({
                title: 'GeoVespa, Arquivo submetido!',
                message: 'Arquivo em processo!',
                position: 'topRight'
            });

        } else {

        }

    } catch (error) {
        console.log('dddd', error)
    }

  

});












