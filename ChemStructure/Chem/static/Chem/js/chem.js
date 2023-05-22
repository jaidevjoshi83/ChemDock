// var loaded_data

// $.get(data_url).done(function(data) { 

//     console.log("OK")

//     loaded_data = data

//     var mol = Kekule.IO.loadFormatData(data, 'mol');
//     var composer = Kekule.Widget.getWidgetById('composer');

//     composer.setChemObj(mol);
  
//     document.querySelector('#export3D').addEventListener('click',()=> {
  
//         var view = Kekule.Widget.getWidgetById('chemViewer');
//         view.setChemObj(mol);
//         view.setRenderType(Kekule.Render.RendererType.R3D);
//         view.setMoleculeDisplayType(Kekule.Render.Molecule3DDisplayType.STICKS);
//     })
//     // exists code 
// }).fail(function() { 
//     document.querySelector('#export3D').addEventListener('click',()=> {

//         var composer = Kekule.Widget.getWidgetById('composer');
//         var mol1 = composer.getChemObj();
  
//         var view = Kekule.Widget.getWidgetById('chemViewer');
//         view.setChemObj(mol1);
//         view.setRenderType(Kekule.Render.RendererType.R3D);
//         view.setMoleculeDisplayType(Kekule.Render.Molecule3DDisplayType.STICKS);
//     })
// })

// document.querySelector('#myFormSubmitButton').addEventListener('click', ()=>{
  
//   var composer = Kekule.Widget.getWidgetById('composer');
//   var molecule1 = composer.getChemObj();
//   var cmlData1 = Kekule.IO.saveFormatData( molecule1, 'mol');

//   var data1 = {'file':cmlData1}

  

//   $.ajax({ url: file_api,
//                       type: "POST",
//                       dataType: "json",
//                       data: data1,
//                       cache: false
//               }).done(function(data) {
//                   if (data.result === true){
//                       alert(data.message);
//                   }
//               });
// });


// document.querySelector('#exit').addEventListener('click', ()=>{
  
  
//     var data1 = {'signal': true}
  
//     $.ajax({ url: close_server,
//                         type: "POST",
//                         dataType: "json",
//                         data: data1,
//                         cache: false
//                 }).done(function(data) {
//                     if (data.result === true){
//                         alert(data.message);
//                     }
//                 });
//   });
  



// $.ajax({
//     type:"GET", 
//     url: data_api, 
//     success: function(data) {
//             $("body").append(JSON.stringify(data));
//             console.log(data)
//         }, 
//     error: function(jqXHR, textStatus, errorThrown) {

//             alert(jqXHR.status);
//             console.log(data_api)
//         },
//    dataType: "jsonp"
// });

console.log("OK")

async function funcName(url){
    const response = await fetch(url);
    var data = await response.json();

    return data
}

//     var list = document.querySelector('#chem_structure')

//     for (var i; data['mols'].length; i++){
//         var li = document.createElement('li')
//         var a = document.createElement('a')
//         a.href = "chart-flot.html"
//         a.innerText = "Chem-"+i
//         li.append(a)
//         list.append(li)
//     }
//     }

// funcName("http://127.0.0.1:8000"+data_api)

    // var mol = Kekule.IO.loadFormatData(data, 'mol');
    // var composer = Kekule.Widget.getWidgetById('composer');
    // composer.setChemObj(mol);

var btn = document.querySelector('#chem_structure').querySelectorAll('button')

for (var i = 0; i < btn.length; i++){
        btn[i].id = i

        btn[i].addEventListener('click', async (e)=>{
            var data = await funcName(data_api+e.target.id)
            var mol = Kekule.IO.loadFormatData(data['mol'], 'mol');

            var composer = Kekule.Widget.getWidgetById('composer');
            composer.setChemObj(mol);

            // var view = Kekule.Widget.getWidgetById('chemViewer');
            // view.setChemObj(mol);

            var view = Kekule.Widget.getWidgetById('chemViewer');
            view.setChemObj(mol);
        
            view.setRenderType(Kekule.Render.RendererType.R3D);
            view.setMoleculeDisplayType(Kekule.Render.Molecule3DDisplayType.STICKS);
        })
}

var btr = document.querySelector('#rendering-stick')

btr.addEventListener('click', ()=>{

    var composer = Kekule.Widget.getWidgetById('composer');
    var mol = composer.getChemObj();

    var view = Kekule.Widget.getWidgetById('chemViewer');
    view.setChemObj(mol);

    view.setRenderType(Kekule.Render.RendererType.R3D);
    view.setMoleculeDisplayType(Kekule.Render.Molecule3DDisplayType.STICKS);


})


var BALL_STICK = document.querySelector('#rendering-ball_stick')

BALL_STICK.addEventListener('click', ()=>{

    var composer = Kekule.Widget.getWidgetById('composer');
    var mol = composer.getChemObj();

    var chemViewer = Kekule.Widget.getWidgetById('chemViewer');
    chemViewer.setChemObj(mol);

    chemViewer.setRenderType(Kekule.Render.RendererType.R3D);
    chemViewer.setMoleculeDisplayType(Kekule.Render.Molecule3DDisplayType.BALL_STICK);
})

var SPACE_FILL = document.querySelector('#rendering-space_fill')

SPACE_FILL.addEventListener('click', ()=>{

    var composer = Kekule.Widget.getWidgetById('composer');
    var mol = composer.getChemObj();

    var chemViewer = Kekule.Widget.getWidgetById('chemViewer');
    chemViewer.setChemObj(mol);

    chemViewer.setRenderType(Kekule.Render.RendererType.R3D);
    chemViewer.setMoleculeDisplayType(Kekule.Render.Molecule3DDisplayType.SPACE_FILL);
})

var s2D = document.querySelector('#save-2D-image')


s2D.addEventListener('click', ()=>{

    var composer = Kekule.Widget.getWidgetById('composer');
    var mol = composer.getChemObj();
    var cmlData1 = Kekule.IO.saveFormatData( mol, 'mol');
    var data1 = {'file':cmlData1}

    $.ajax({
        url: properties_api,
        type: "POST",
        dataType: "json",
        data: data1,
        cache: false
    }).done(function(data) {
        // Access the returned data here
        console.log(data);


        var mol = Kekule.IO.loadFormatData(data['mol'], 'mol');
        var view = Kekule.Widget.getWidgetById('chemViewer');
        view.setChemObj(mol);
    
        view.setRenderType(Kekule.Render.RendererType.R3D);
        view.setMoleculeDisplayType(Kekule.Render.Molecule3DDisplayType.STICKS);
        // Perform further actions with the data
    }).fail(function(jqXHR, textStatus, errorThrown) {
        // Handle error cases
        console.error("Error: " + textStatus, errorThrown);
    });
})

var pbc = document.querySelector('#pub-chem-form')


var btn = document.querySelector('.input-group').querySelector('button')

btn.addEventListener('click', () => {

    var pbc = document.querySelector('#pub-chem-form')

    var data1 = {'id': pbc.value}


    $.ajax({
        url: pubchem_api,
        type: "POST",
        dataType: "json",
        data: data1,
        cache: false
    }).done(function(data) {
        // Access the returned data here
        console.log(data);


        var mol = Kekule.IO.loadFormatData(data['mol'], 'mol');
        var view = Kekule.Widget.getWidgetById('chemViewer');
        view.setChemObj(mol);
    
        view.setRenderType(Kekule.Render.RendererType.R3D);
        view.setMoleculeDisplayType(Kekule.Render.Molecule3DDisplayType.STICKS);


        var composer = Kekule.Widget.getWidgetById('composer');
        composer.setChemObj(mol);

        // Perform further actions with the data
    }).fail(function(jqXHR, textStatus, errorThrown) {
        // Handle error cases
        console.error("Error: " + textStatus, errorThrown);
    });
})

var properties_button = document.querySelector('#rendering-Properties')

properties_button.addEventListener('click', ()=>{

    var composer = Kekule.Widget.getWidgetById('composer');
    var mol = composer.getChemObj();
    var cmlData1 = Kekule.IO.saveFormatData( mol, 'mol');
    var data1 = {'file':cmlData1}

    $.ajax({
        url: mol_properties,
        type: "POST",
        dataType: "json",
        data: data1,
        cache: false
    }).done(function(data) {
        // Access the returned data here


        document.querySelector("#mw").innerHTML = data['mw']
        document.querySelector("#lp").innerHTML = data['lp']
        document.querySelector("#NHA").innerHTML = data['NHA']
        document.querySelector("#NHD").innerHTML = data['NHD']

        // {mw: 185.698, lp: 2.259, NHA: 1, NHD: 1}
        console.log(data);

    }).fail(function(jqXHR, textStatus, errorThrown) {
        // Handle error cases
        console.error("Error: " + textStatus, errorThrown);
    });
})


mol_properties 