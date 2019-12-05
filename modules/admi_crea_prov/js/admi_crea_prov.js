var admi_crea_prov_nomb_cont = "admi_crea_prov/main/";
var admi_crea_prov_esta_form = 0;

function admi_crea_prov(){
    
    document.getElementById("mySidenav").style.width = "0px";
    document.getElementById("main").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    jQuery.ajaxSetup({async:true});
    jQuery.post(
        admi_crea_prov_nomb_cont+"admi_crea_prov",{
            cache   : Math.random()
        },function(html){
            jQuery("#admi_crea_prov_tabl").remove();
            jQuery("#admi_crea_prov_deta_tabl").remove();
            jQuery("#mainContenido").html(html);
            
            jQuery("#admi_crea_prov_tabl").jqxWindow({ 
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
              jQuery("#admi_crea_prov_deta_tabl").jqxWindow({ 
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
            jQuery('#admi_crea_prov_tabl').jqxWindow('open');
            jQuery('#admi_crea_prov_tabl').jqxWindow({content: 'CARGANDO ... '}); 
            admi_crea_prov_form();
        }
    );   
} 

function admi_crea_prov_form(){
    jQuery.ajaxSetup({async:true});
    jQuery.post(
        admi_crea_prov_nomb_cont+"admi_crea_prov_form",{
            cache   : Math.random()
        },function(html){
            jQuery('#admi_crea_prov_tabl').jqxWindow({content: html}); 
            
            jQuery("#admi_crea_prov_tabl").on('close', function (event) { 
                jQuery("head script:last-child").remove();                
            });
            
            jQuery("#admi_crea_prov_btn_regi,#admi_crea_prov_btn_limp,#admi_crea_prov_btn_cerr").jqxButton({ 
                width: '100', 
                height: '28',
                theme: tema 
            });    
            jQuery("#admi_crea_prov_txt_nume_rucc").jqxInput({ 
                height: 28, 
                width: 140,
                theme: tema
            });
            jQuery("#admi_crea_prov_txt_nomb_prov").jqxInput({ 
                height: 28, 
                width: 240,
                theme: tema
            });
            jQuery("#admi_crea_prov_txt_dire_prov").jqxInput({ 
                height: 28, 
                width: 380,
                theme: tema
            });
            
            jQuery("#admi_crea_prov_txt_telf_prov").jqxInput({ 
                height: 28, 
                width: 240,
                theme: tema
            });
            
            jQuery("#admi_crea_prov_txt_cont_prov").jqxInput({ 
                height: 28, 
                width: 240,
                theme: tema
            });
            
            jQuery("#admi_crea_prov_txt_acti_prov").jqxInput({ 
                height: 28, 
                width: 240,
                theme: tema
            });

  
            jQuery("#admi_crea_prov_txt_emai_prov").jqxInput({ 
                height: 28, 
                width: 240,
                theme: tema,
                disabled:false
            });
  
        
           var admi_crea_prov_esta_prov =  new Array("ACT","INA");
           jQuery("#admi_crea_prov_txt_esta_prov").jqxDropDownList({
                source : admi_crea_prov_esta_prov,
                dropDownHeight: 70,
                theme       : tema ,
                disabled    : false,
                width       : 240,
                height      : 28,
                selectedIndex   : 0
            });

           
           
            jQuery("#admi_crea_prov_btn_limp").click(function(){
                jQuery("#admi_crea_prov_txt_nume_rucc").val('');
                jQuery("#admi_crea_prov_txt_nomb_prov").val('');
                jQuery("#admi_crea_prov_txt_dire_prov").val('');
                jQuery("#admi_crea_prov_txt_telf_prov").val('');
                jQuery("#admi_crea_prov_txt_cont_prov").val('');
                jQuery("#admi_crea_prov_txt_acti_prov").val('');
                jQuery("#admi_crea_prov_txt_esta_prov").jqxDropDownList({selectedIndex:0});
                jQuery("#admi_crea_prov_txt_emai_prov").val('');
                jQuery("#admi_crea_prov_lbl_mens").html('');
                admi_crea_prov_esta_form = 0;
                jQuery("#admi_crea_prov_txt_nume_rucc").focus();
            });
            jQuery("#admi_crea_prov_btn_regi").click(function(){
                admi_crea_prov_regi();
            });
            
            jQuery("#admi_crea_prov_btn_cerr").click(function(){
                jQuery('#admi_crea_prov_tabl').jqxWindow('close');
            });
            jQuery("#admi_crea_prov_btn_busq").click(function(){
                  admi_crea_prov_deta_form();
            });
            jQuery("#admi_crea_prov_btn_ayud").click(function(){
                   admi_crea_prov_pdf();
            });
           
            
            jQuery("#admi_crea_prov_txt_nume_rucc").unbind('change');
        
            jQuery("#admi_crea_prov_txt_nume_rucc").change(function(){
                if(jQuery.trim(jQuery("#admi_crea_prov_txt_nume_rucc").val())==""){
                    
            
                jQuery("#admi_crea_prov_txt_nume_rucc").focus();
                }else{
                    admi_crea_prov_nume_rucc();
                }
            });
            jQuery("#admi_crea_prov_txt_nume_rucc").focus();
        }
    );
}

function admi_crea_prov_deta_form(){
    jQuery('#admi_crea_prov_deta_tabl').jqxWindow('open');
    jQuery('#admi_crea_prov_deta_tabl').jqxWindow({content: 'CARGANDO ... '}); 
    jQuery.ajaxSetup({async:true});
    jQuery.post(
        admi_crea_prov_nomb_cont+"admi_crea_prov_deta_form",{
            cache   : Math.random()
        },function(html){
            jQuery('#admi_crea_prov_deta_tabl').jqxWindow({content: html}); 

        jQuery("#admi_crea_prov_btn_exce").jqxButton({
            width: 100,
            height: 30,
            theme: tema
        });
            var admi_crea_prov_data_arra = new Array();
            var admi_crea_prov_data_sour =
            {
                localdata: admi_crea_prov_data_arra,
                datatype: "array",
                datafields:  
                [
                    {name: 'nume_rucc', type: 'string'},
                    {name: 'nomb_prov', type: 'string'},
                    {name: 'dire_prov', type: 'string'},
                    {name: 'telf_prov', type: 'string'},
                    {name: 'cont_prov', type: 'string'},
                    {name: 'corr_prov', type: 'string'},
                    {name: 'esta_prov', type: 'string'}
            
                ]
            };
            var admi_crea_prov_data_adap = new jQuery.jqx.dataAdapter(admi_crea_prov_data_sour);
            jQuery("#admi_crea_prov_gril").jqxGrid(
            {
                width: jQuery("#admi_crea_prov_deta_tabl").width() - 10,
                height:((jQuery("#admi_crea_prov_deta_tabl").height())) - 150,
                theme: tema,
                source: admi_crea_prov_data_adap,
                columnsresize: true,
                sortable: true,
                filterable: true,
                altrows: true,
                showemptyrow: false,
                columnsreorder: true,               
                columns: [
                  {text: 'RUC', dataField: 'nume_rucc',width:95},
                  {text: 'NOMBRES', dataField: 'nomb_prov',width:380},
                  {text: 'DIRECCION', dataField: 'dire_prov',width:540},
                  {text: 'TELEFONO', dataField: 'telf_prov',width:180},
                  {text: 'CONTACTO', dataField: 'cont_prov',width:220},
                  {text: 'EMAIL', dataField: 'corr_prov',width:280},
                  {text: 'ESTADO', dataField: 'esta_prov',width:60}
                ]
            });
            jQuery("#admi_crea_prov_gril").jqxGrid('localizestrings', localizationobj);
            jQuery('#admi_crea_prov_gril').on('rowselect', function (event) 
            {
                var args = event.args; 
                var row = args.rowindex;
                var dataRecord = jQuery("#admi_crea_prov_gril").jqxGrid('getrowdata', row);
                jQuery('#admi_crea_prov_deta_tabl').jqxWindow('close');
                jQuery("#admi_crea_prov_txt_nume_rucc").val(dataRecord.nume_rucc);
           
            });
            
        jQuery("#admi_crea_prov_btn_exce").click(function () {
            data_info = jQuery('#admi_crea_prov_gril').jqxGrid('getdatainformation');
            data_rows = data_info.rowscount;
            jQuery("#admi_crea_prov_deta_lbl_mens").html("");
            if (data_rows === 0) {
                jQuery("#admi_crea_prov_deta_lbl_mens").html("* UNA LISTA VACIA SIN DATOS NO SE PUEDE  EXPORTAR A EXCEL.");
            } else {
                exce_crea_prov = jQuery("#admi_crea_prov_gril").jqxGrid('exportdata', 'json');
                expo_arch_exce(exce_crea_prov, "REPORTE PROVEEDORES", true);
            }
        });
            admi_crea_prov_prov_list();
        }
    );
}

function admi_crea_prov_nume_rucc(){
    jQuery("#admi_crea_prov_lbl_mens").html('');
    jQuery.ajaxSetup({async:true});
    jQuery.post(
        admi_crea_prov_nomb_cont+"admi_crea_prov_nume_rucc",{
            cache       : Math.random(),
            nume_rucc   : jQuery.trim(jQuery("#admi_crea_prov_txt_nume_rucc").val())
        },function(html){
            if(html.data.length > 0){
                admi_crea_prov_esta_form = 1;
                
                jQuery("#admi_crea_prov_txt_nomb_prov").val(html.data[0].nomb_prov);
                jQuery("#admi_crea_prov_txt_dire_prov").val(html.data[0].dire_prov);
               
                jQuery("#admi_crea_prov_txt_telf_prov").val(html.data[0].telf_prov);
                jQuery("#admi_crea_prov_txt_cont_prov").val(html.data[0].cont_prov);
                jQuery("#admi_crea_prov_txt_acti_prov").val(html.data[0].acti_prov);
       
                jQuery("#admi_crea_prov_txt_emai_prov").val(html.data[0].corr_prov);
           
                if(html.data[0].esta_prov == "ACT"){
                    jQuery("#admi_crea_prov_txt_esta_prov").jqxDropDownList({ selectedIndex:0 });
                }else{
                    jQuery("#admi_crea_prov_txt_esta_prov").jqxDropDownList({selectedIndex:1 });
                }
              
               
            }  else{
                jQuery("#admi_crea_prov_txt_nomb_prov").val('');
                jQuery("#admi_crea_prov_txt_dire_prov").val('');
              
                jQuery("#admi_crea_prov_txt_telf_prov").val('');
                jQuery("#admi_crea_prov_txt_cont_prov").val('');
                jQuery("#admi_crea_prov_txt_esta_prov").jqxDropDownList({selectedIndex:0});
                jQuery("#admi_crea_prov_txt_acti_prov").val('');
                jQuery("#admi_crea_prov_txt_emai_prov").val('');
                jQuery("#admi_crea_prov_lbl_mens").html('');
                admi_crea_prov_esta_form = 0;
                jQuery("#admi_crea_prov_txt_nomb_prov").focus();
            }        
        }, "json")
    .fail( function(xhr, textStatus, errorThrown) {
        main_erro("admi_crea_prov_nume_rucc()",admi_crea_prov_nomb_cont+"admi_crea_prov_nume_rucc", xhr.responseText,jQuery("#codi_usua").html())
        jQuery("#admi_crea_prov_lbl_mens").html('* SU MENSAJE DE ERROR A SIDO ENVIADO A SISTEMAS.');
    });
}

function admi_crea_prov_regi(){
    jQuery("#admi_crea_prov_lbl_mens").html('');
    jQuery.ajaxSetup({async:false});
    jQuery.post(
        admi_crea_prov_nomb_cont+"admi_crea_prov_regi",{
            cache   : Math.random(),
            esta_form: admi_crea_prov_esta_form,
            nume_rucc : jQuery.trim(jQuery("#admi_crea_prov_txt_nume_rucc").val()),
            nomb_prov : jQuery.trim(jQuery("#admi_crea_prov_txt_nomb_prov").val()),
            dire_prov : jQuery.trim(jQuery("#admi_crea_prov_txt_dire_prov").val()),
            telf_prov : jQuery.trim(jQuery("#admi_crea_prov_txt_telf_prov").val()),
            cont_prov : jQuery.trim(jQuery("#admi_crea_prov_txt_cont_prov").val()),
            acti_prov : jQuery.trim(jQuery("#admi_crea_prov_txt_acti_prov").val()),
            corr_prov : jQuery.trim(jQuery("#admi_crea_prov_txt_emai_prov").val()),
            esta_prov : jQuery.trim(jQuery("#admi_crea_prov_txt_esta_prov").val())
        },function(html){
            if(html.mensaje !=""){
                jQuery("#admi_crea_prov_lbl_mens").html(html.mensaje);
            }else{
                var admi_crea_prov_mens_form = "* ACTUALIZACION SATISFACTORIO.";
                if(admi_crea_prov_esta_form == 0){
                    
                    admi_crea_prov_mens_form = "* SE HA REGISTRADO SATISFACTORIAMENTE.";
                }
                  jQuery("#admi_crea_prov_btn_limp").trigger("click");
                jQuery("#admi_crea_prov_lbl_mens").html(admi_crea_prov_mens_form);
            }           
        }, "json")
    .fail( function(xhr, textStatus, errorThrown) {
        main_erro("admi_crea_prov_regi()",admi_crea_prov_nomb_cont+"admi_crea_prov_regi", xhr.responseText,jQuery("#codi_usua").html())
        jQuery("#admi_crea_prov_lbl_mens").html('* SU MENSAJE DE ERROR A SIDO ENVIADO A SISTEMAS.');
    });
}
function admi_crea_prov_prov_list(){
    jQuery('#admi_crea_prov_gril').jqxGrid('clearselection');
    jQuery('#admi_crea_prov_gril').jqxGrid('showloadelement');
    jQuery("#admi_crea_prov_gril").jqxGrid('refresh');
    jQuery("#admi_crea_prov_deta_lbl_mens").html('');
    jQuery.ajaxSetup({async:false});
    jQuery.post(
        admi_crea_prov_nomb_cont+"admi_crea_prov_prov_list",{
            cache   : Math.random()
        },function(html){
            if(html.mensaje!==""){
                jQuery('#admi_crea_prov_gril').jqxGrid('hideloadelement');
                jQuery("#admi_crea_prov_deta_lbl_mens").html(html.mensaje);
            }else{
                if(html.data.length > 0){
                    var admi_crea_prov_data_sour =
                    {
                        datatype: "json",
                        datafields: [
                            {name: 'nume_rucc', type: 'string'},
                            {name: 'nomb_prov', type: 'string'},
                            {name: 'dire_prov', type: 'string'},
                            {name: 'telf_prov', type: 'string'},
                            {name: 'cont_prov', type: 'string'},
                            {name: 'corr_prov', type: 'string'},
                            {name: 'esta_prov', type: 'string'}

                        ],
                        localdata: html.data
                    };
                    var admi_crea_prov_data_adap = new jQuery.jqx.dataAdapter(admi_crea_prov_data_sour);
                    jQuery("#admi_crea_prov_gril").jqxGrid({source: admi_crea_prov_data_adap});
                }else{
                    jQuery('#admi_crea_prov_gril').jqxGrid('hideloadelement');
                    jQuery("#admi_crea_prov_deta_lbl_mens").html('* ERROR LISTA VACIA.');
                }
            }
        }, "json")
    .fail( function(xhr, textStatus, errorThrown) {
        jQuery('#admi_crea_prov_gril').jqxGrid('hideloadelement');
        main_erro("admi_crea_prov_prov_list()",admi_crea_prov_nomb_cont+"admi_crea_prov_prov_list", xhr.responseText,jQuery("#codi_usua").html())
        jQuery("#admi_crea_prov_deta_lbl_mens").html('* SU MENSAJE DE ERROR A SIDO ENVIADO A SISTEMAS.');
    });
}