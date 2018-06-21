
# rendata
  Interfaz grafica para datatable (APIs elaboradas en .NET Core y PHP en proceso de publicacion), con metodologia dinamica para su implementacion (probada en vue.js framework y javascript ECMA6).
## instalacion
```
npm install rendata --save
```
# implementacion
## vue.js
```
<template>
<div class="container">    
    <div id="r-td-1"></div>
</div>
</template>
<script>
import { execn, draw } from "rendata";
export default {
  data() {
    return {};
  },
  mounted() {
  ..//config data
  },
  methods: {
    search: function() {
      let dt = {};
      execn(dt, 0)
        .then(datatable => {
          dt = datatable;
        })
        .catch(datatable => {
          dt = datatable;
        })
        .finally(() => {
          draw(dt, 1);
        });
    }
  }
};
</script>
```

## HTML5 ECMA6
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
    <title>test datatable</title>
</head>
<body>
    <r-td stop=""></r-td>
    <script type="module" src="~/js/dt.js"></script>
    <script type="module">
        import {execn,draw} from "./js/dt.js"
        let dt={
        url:"/api/SearchUndefined",
        params:{
        columns:[
        {name:"id",show:false},
        {name:"nombre",replace:"nombre del sistema",show:true},
        {name:"descripcion",replace:"descripcion del sistema",show:true}
        ],
        tablename:"sistemas",
        limit:2
        },
        options:{title:"Opciones",links:[
        {text:"consola",func:function(obj){
        console.log(obj);
        }}
        ]}
        };
        execn(dt,0)
        .then((datatable)=>{
        dt=datatable;
        })
        .catch((datatable)=>{
        dt=datatable;
        })
        .finally(()=>{
        console.log(dt);
        draw(dt,0);
        });
    </script>
</body>
</html>
```
## prueba rendata (.NET core search)
<img src="https://i.imgur.com/n2vePKY.gif"/>
