var loaded_data

$.get(data_url).done(function(data) { 

    console.log("OK")

    loaded_data = data

    var mol = Kekule.IO.loadFormatData(data, 'mol');
    var composer = Kekule.Widget.getWidgetById('composer');

    composer.setChemObj(mol);
  
    document.querySelector('#export3D').addEventListener('click',()=> {
  
        var view = Kekule.Widget.getWidgetById('chemViewer');
        view.setChemObj(mol);
        view.setRenderType(Kekule.Render.RendererType.R3D);
        view.setMoleculeDisplayType(Kekule.Render.Molecule3DDisplayType.STICKS);
    })
    // exists code 
}).fail(function() { 
    document.querySelector('#export3D').addEventListener('click',()=> {

        var composer = Kekule.Widget.getWidgetById('composer');
        var mol1 = composer.getChemObj();
  
        var view = Kekule.Widget.getWidgetById('chemViewer');
        view.setChemObj(mol1);
        view.setRenderType(Kekule.Render.RendererType.R3D);
        view.setMoleculeDisplayType(Kekule.Render.Molecule3DDisplayType.STICKS);
    })
})

document.querySelector('#myFormSubmitButton').addEventListener('click', ()=>{
  
  var composer = Kekule.Widget.getWidgetById('composer');
  var molecule1 = composer.getChemObj();
  var cmlData1 = Kekule.IO.saveFormatData( molecule1, 'mol');

  var data1 = {'file':cmlData1}

  

  $.ajax({ url: file_api,
                      type: "POST",
                      dataType: "json",
                      data: data1,
                      cache: false
              }).done(function(data) {
                  if (data.result === true){
                      alert(data.message);
                  }
              });
});


document.querySelector('#exit').addEventListener('click', ()=>{
  
  
    var data1 = {'signal': true}
  
    $.ajax({ url: close_server,
                        type: "POST",
                        dataType: "json",
                        data: data1,
                        cache: false
                }).done(function(data) {
                    if (data.result === true){
                        alert(data.message);
                    }
                });
  });
  