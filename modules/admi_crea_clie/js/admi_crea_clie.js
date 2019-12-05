var admi_crea_clie_nomb_cont = "admi_crea_clie/main/";
var admi_crea_clie_esta_form = 0;

function admi_crea_clie(){
    
    document.getElementById("mySidenav").style.width = "0px";
    document.getElementById("main").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    jQuery.ajaxSetup({async:true});
    jQuery.post(
        admi_crea_clie_nomb_cont+"admi_crea_clie",{
            cache   : Math.random()
        },function(html){
            jQuery("#admi_crea_clie_tabl").remove();
            jQuery("#admi_crea_clie_deta_tabl").remove();
            jQuery("#mainContenido").html(html);
            
            jQuery("#admi_crea_clie_tabl").jqxWindow({ 
                autoOpen: false,
                width: jQuery(window).width()-120, 
                height : jQuery(window).height()-150,
                showCollapseButton: true ,
                theme: tema,
                resizable: false,
                draggable: true,
                showCloseButton: true,
                dragArea: {left: 0, top:80, width: jQuery(window).width(), height: jQuery(window).height()-80}
            });
              jQuery("#admi_crea_clie_deta_tabl").jqxWindow({ 
                autoOpen: false,
                width: jQuery(window).width()-180, 
                maxWidth: 1500,
                height : jQuery(window).height()-180,
                showCollapseButton: false ,
                theme: tema,
                resizable: false,
                draggable: true,
                showCloseButton: true,
                isModal: true,
                dragArea: {left: 0, top:80, width: jQuery(window).width(), height: jQuery(window).height()-80}
            });
            jQuery('#admi_crea_clie_tabl').jqxWindow('open');
            jQuery('#admi_crea_clie_tabl').jqxWindow({content: 'CARGANDO ... '}); 
            admi_crea_clie_form();
        }
    );   
} 

function admi_crea_clie_form(){
    jQuery.ajaxSetup({async:true});
    jQuery.post(
        admi_crea_clie_nomb_cont+"admi_crea_clie_form",{
            cache   : Math.random()
        },function(html){
            jQuery('#admi_crea_clie_tabl').jqxWindow({content: html}); 
            
            jQuery("#admi_crea_clie_tabl").on('close', function (event) { 
                jQuery("head script:last-child").remove();                
            });
            
            jQuery("#admi_crea_clie_btn_regi,#admi_crea_clie_btn_limp,#admi_crea_clie_btn_cerr").jqxButton({ 
                width: '100', 
                height: '28',
                theme: tema 
            });    
            jQuery("#admi_crea_clie_txt_codi_clie").jqxInput({ 
                height: 28, 
                width: 140,
                theme: tema,
                disabled : true
            });
            jQuery("#admi_crea_clie_txt_nomb_clie").jqxInput({ 
                height: 28, 
                width: 240,
                theme: tema
            });
          
            jQuery("#admi_crea_clie_txt_cont_clie").jqxInput({ 
                height: 28, 
                width: 240,
                theme: tema
            });
            
            jQuery("#admi_crea_clie_txt_telf_clie").jqxInput({ 
                height: 28, 
                width: 240,
                theme: tema
            });
            
            jQuery("#admi_crea_clie_txt_emai_clie").jqxInput({ 
                height: 28, 
                width: 240,
                theme: tema,
                disabled:false
            });
  
        
           var admi_crea_clie_esta_clie =  new Array("ACT","INA");
           jQuery("#admi_crea_clie_txt_esta_clie").jqxDropDownList({
                source : admi_crea_clie_esta_clie,
                dropDownHeight: 70,
                theme       : tema ,
                disabled    : false,
                width       : 240,
                height      : 28,
                selectedIndex   : 0
            });

           
           
            jQuery("#admi_crea_clie_btn_limp").click(function(){
                jQuery("#admi_crea_clie_txt_codi_clie").val('');
                jQuery("#admi_crea_clie_txt_nomb_clie").val('');
               
                jQuery("#admi_crea_clie_txt_telf_clie").val('');
                jQuery("#admi_crea_clie_txt_cont_clie").val('');
      
                jQuery("#admi_crea_clie_txt_esta_clie").jqxDropDownList({selectedIndex:0});
                jQuery("#admi_crea_clie_txt_emai_clie").val('');
                jQuery("#admi_crea_clie_lbl_mens").html('');
                admi_crea_clie_esta_form = 0;
                jQuery("#admi_crea_clie_txt_nomb_clie").focus();
            });
            jQuery("#admi_crea_clie_btn_regi").click(function(){
                admi_crea_clie_regi();
            });
            
            jQuery("#admi_crea_clie_btn_cerr").click(function(){
                jQuery('#admi_crea_clie_tabl').jqxWindow('close');
            });
            jQuery("#admi_crea_clie_btn_busq").click(function(){
                  admi_crea_clie_deta_form();
            });
          
           
            
            jQuery("#admi_crea_clie_txt_codi_clie").unbind('change');
        
            jQuery("#admi_crea_clie_txt_codi_clie").change(function(){
                if(jQuery.trim(jQuery("#admi_crea_clie_txt_codi_clie").val())==""){
                    
            
                jQuery("#admi_crea_clie_txt_codi_clie").focus();
                }else{
                    admi_crea_clie_codi_clie();
                }
            });
            jQuery("#admi_crea_clie_txt_nomb_clie").focus();
        }
    );
}

function admi_crea_clie_deta_form(){
    jQuery('#admi_crea_clie_deta_tabl').jqxWindow('open');
    jQuery('#admi_crea_clie_deta_tabl').jqxWindow({content: 'CARGANDO ... '}); 
    jQuery.ajaxSetup({async:true});
    jQuery.post(
        admi_crea_clie_nomb_cont+"admi_crea_clie_deta_form",{
            cache   : Math.random()
        },function(html){
            jQuery('#admi_crea_clie_deta_tabl').jqxWindow({content: html}); 

        jQuery("#admi_crea_clie_btn_exce").jqxButton({
            width: 100,
            height: 30,
            theme: tema
        });
            var admi_crea_clie_data_arra = new Array();
            var admi_crea_clie_data_sour =
            {
                localdata: admi_crea_clie_data_arra,
                datatype: "array",
                datafields:  
                [
                    {name: 'codi_clie', type: 'string'},
                    {name: 'nomb_clie', type: 'string'},
                    {name: 'cont_clie', type: 'string'},
                    {name: 'telf_clie', type: 'string'},
                    {name: 'corr_clie', type: 'string'},
                    {name: 'esta_clie', type: 'string'}
            
                ]
            };
            var admi_crea_clie_data_adap = new jQuery.jqx.dataAdapter(admi_crea_clie_data_sour);
            jQuery("#admi_crea_clie_gril").jqxGrid(
            {
                width: jQuery("#admi_crea_clie_deta_tabl").width() - 10,
                height:((jQuery("#admi_crea_clie_deta_tabl").height())) - 150,
                theme: tema,
                source: admi_crea_clie_data_adap,
                columnsresize: true,
                sortable: true,
                filterable: true,
                altrows: true,
                showemptyrow: false,
                columnsreorder: true,               
                columns: [
                  {text: 'CODIGO', dataField: 'codi_clie',width:95},
                  {text: 'NOMBRES', dataField: 'nomb_clie',width:380},
                  {text: 'CONTACTO', dataField: 'cont_clie',width:220},
                  {text: 'TELEFONO', dataField: 'telf_clie',width:180},
                  {text: 'EMAIL', dataField: 'corr_clie',width:280},
                  {text: 'ESTADO', dataField: 'esta_clie',width:60}
                ]
            });
            jQuery("#admi_crea_clie_gril").jqxGrid('localizestrings', localizationobj);
            jQuery('#admi_crea_clie_gril').on('rowselect', function (event) 
            {
                var args = event.args; 
                var row = args.rowindex;
                var dataRecord = jQuery("#admi_crea_clie_gril").jqxGrid('getrowdata', row);
                jQuery('#admi_crea_clie_deta_tabl').jqxWindow('close');
                jQuery("#admi_crea_clie_txt_codi_clie").val(dataRecord.codi_clie);
           
            });
            
        jQuery("#admi_crea_clie_btn_exce").click(function () {
            data_info = jQuery('#admi_crea_clie_gril').jqxGrid('getdatainformation');
            data_rows = data_info.rowscount;
            jQuery("#admi_crea_clie_deta_lbl_mens").html("");
            if (data_rows === 0) {
                jQuery("#admi_crea_clie_deta_lbl_mens").html("* UNA LISTA VACIA SIN DATOS NO SE PUEDE  EXPORTAR A EXCEL.");
            } else {
                exce_crea_clie = jQuery("#admi_crea_clie_gril").jqxGrid('exportdata', 'json');
                expo_arch_exce(exce_crea_clie, "REPORTE CLIENTES", true);
            }
        });
            admi_crea_clie_clie_list();
        }
    );
}

function admi_crea_clie_codi_clie(){
    jQuery("#admi_crea_clie_lbl_mens").html('');
    jQuery.ajaxSetup({async:true});
    jQuery.post(
        admi_crea_clie_nomb_cont+"admi_crea_clie_codi_clie",{
            cache       : Math.random(),
            codi_clie   : jQuery.trim(jQuery("#admi_crea_clie_txt_codi_clie").val())
        },function(html){
            if(html.data.length > 0){
                admi_crea_clie_esta_form = 1;
                
                jQuery("#admi_crea_clie_txt_nomb_clie").val(html.data[0].nomb_clie);
               
                jQuery("#admi_crea_clie_txt_cont_clie").val(html.data[0].cont_clie);
                jQuery("#admi_crea_clie_txt_telf_clie").val(html.data[0].telf_clie);
               
               
       
                jQuery("#admi_crea_clie_txt_emai_clie").val(html.data[0].corr_clie);
           
                if(html.data[0].esta_clie == "ACT"){
                    jQuery("#admi_crea_clie_txt_esta_clie").jqxDropDownList({ selectedIndex:0 });
                }else{
                    jQuery("#admi_crea_clie_txt_esta_clie").jqxDropDownList({selectedIndex:1 });
                }
              
               
            }  else{
                jQuery("#admi_crea_clie_txt_nomb_clie").val('');
                
              
                jQuery("#admi_crea_clie_txt_telf_clie").val('');
                jQuery("#admi_crea_clie_txt_cont_clie").val('');
                jQuery("#admi_crea_clie_txt_esta_clie").jqxDropDownList({selectedIndex:0});
            
                jQuery("#admi_crea_clie_txt_emai_clie").val('');
                jQuery("#admi_crea_clie_lbl_mens").html('');
                admi_crea_clie_esta_form = 0;
                jQuery("#admi_crea_clie_txt_nomb_clie").focus();
            }        
        }, "json")
    .fail( function(xhr, textStatus, errorThrown) {
        main_erro("admi_crea_clie_codi_clie()",admi_crea_clie_nomb_cont+"admi_crea_clie_codi_clie", xhr.responseText,jQuery("#codi_usua").html())
        jQuery("#admi_crea_clie_lbl_mens").html('* SU MENSAJE DE ERROR A SIDO ENVIADO A SISTEMAS.');
    });
}

function admi_crea_clie_regi(){
    jQuery("#admi_crea_clie_lbl_mens").html('');
    jQuery.ajaxSetup({async:false});
    jQuery.post(
        admi_crea_clie_nomb_cont+"admi_crea_clie_regi",{
            cache   : Math.random(),
            esta_form: admi_crea_clie_esta_form,
            codi_clie : jQuery.trim(jQuery("#admi_crea_clie_txt_codi_clie").val()),
            nomb_clie : jQuery.trim(jQuery("#admi_crea_clie_txt_nomb_clie").val()),
            cont_clie : jQuery.trim(jQuery("#admi_crea_clie_txt_cont_clie").val()),   
            telf_clie : jQuery.trim(jQuery("#admi_crea_clie_txt_telf_clie").val()),
            corr_clie : jQuery.trim(jQuery("#admi_crea_clie_txt_emai_clie").val()),
            esta_clie : jQuery.trim(jQuery("#admi_crea_clie_txt_esta_clie").val())
        },function(html){
            if(html.mensaje !=""){
                jQuery("#admi_crea_clie_lbl_mens").html(html.mensaje);
            }else{
                var admi_crea_clie_mens_form = "* ACTUALIZACION SATISFACTORIO.";
                if(admi_crea_clie_esta_form == 0){
                    
                    admi_crea_clie_mens_form = "* SE HA REGISTRADO SATISFACTORIAMENTE.";
                }
                  jQuery("#admi_crea_clie_btn_limp").trigger("click");
                jQuery("#admi_crea_clie_lbl_mens").html(admi_crea_clie_mens_form);
            }           
        }, "json")
    .fail( function(xhr, textStatus, errorThrown) {
        main_erro("admi_crea_clie_regi()",admi_crea_clie_nomb_cont+"admi_crea_clie_regi", xhr.responseText,jQuery("#codi_usua").html())
        jQuery("#admi_crea_clie_lbl_mens").html('* SU MENSAJE DE ERROR A SIDO ENVIADO A SISTEMAS.');
    });
}
function admi_crea_clie_clie_list(){
    jQuery('#admi_crea_clie_gril').jqxGrid('clearselection');
    jQuery('#admi_crea_clie_gril').jqxGrid('showloadelement');
    jQuery("#admi_crea_clie_gril").jqxGrid('refresh');
    jQuery("#admi_crea_clie_deta_lbl_mens").html('');
    jQuery.ajaxSetup({async:false});
    jQuery.post(
        admi_crea_clie_nomb_cont+"admi_crea_clie_clie_list",{
            cache   : Math.random()
        },function(html){
            if(html.mensaje!==""){
                jQuery('#admi_crea_clie_gril').jqxGrid('hideloadelement');
                jQuery("#admi_crea_clie_deta_lbl_mens").html(html.mensaje);
            }else{
                if(html.data.length > 0){
                    var admi_crea_clie_data_sour =
                    {
                        datatype: "json",
                        datafields: [
                            {name: 'codi_clie', type: 'string'},
                            {name: 'nomb_clie', type: 'string'},
                            {name: 'cont_clie', type: 'string'},
                            {name: 'telf_clie', type: 'string'},
                            {name: 'corr_clie', type: 'string'},
                            {name: 'esta_clie', type: 'string'}

                        ],
                        localdata: html.data
                    };
                    var admi_crea_clie_data_adap = new jQuery.jqx.dataAdapter(admi_crea_clie_data_sour);
                    jQuery("#admi_crea_clie_gril").jqxGrid({source: admi_crea_clie_data_adap});
                }else{
                    jQuery('#admi_crea_clie_gril').jqxGrid('hideloadelement');
                    jQuery("#admi_crea_clie_deta_lbl_mens").html('* LA LISTA SE ENCUENTRA VACIA.');
                }
            }
        }, "json")
    .fail( function(xhr, textStatus, errorThrown) {
        jQuery('#admi_crea_clie_gril').jqxGrid('hideloadelement');
        main_erro("admi_crea_clie_clie_list()",admi_crea_clie_nomb_cont+"admi_crea_clie_clie_list", xhr.responseText,jQuery("#codi_usua").html())
        jQuery("#admi_crea_clie_deta_lbl_mens").html('* SU MENSAJE DE ERROR A SIDO ENVIADO A SISTEMAS.');
    });
}