var admi_copi_perm_nomb_cont = "admi_copi_perm/main/";
var admi_copi_perm_data_json = {};
function admi_copi_perm(){ 
    //oculta el menu y oculta los iconos.
    document.getElementById("mySidenav").style.width = "0px";
    document.getElementById("main").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    jQuery.ajaxSetup({async:true});
    jQuery.post(
        admi_copi_perm_nomb_cont+"copi_perm",{
            cache   : Math.random()
        },function(html){
            var offset = jQuery('#mainContenido').offset();
            jQuery("#admi_copi_perm_tabl").remove();      
            
            jQuery("#mainContenido").html(html);
            
            jQuery("#admi_copi_perm_tabl").jqxWindow({ 
                autoOpen: false,
                width: jQuery(window).width()-50, 
                maxWidth: 1500, 
                height :  jQuery(window).height()-190,
                showCollapseButton: true ,
                theme: tema,
                resizable: false,
                draggable: false,
                showCloseButton: true,
                  dragArea: {left: 0, top:80, width: jQuery(window).width(), height: jQuery(window).height()-80}           
            });
            jQuery('#admi_copi_perm_tabl').jqxWindow('open');
            jQuery('#admi_copi_perm_tabl').jqxWindow({content: 'CARGANDO ... '}); 
            admi_copi_perm_form();
        }
    );   
}
function admi_copi_perm_form(){
    jQuery.ajaxSetup({async:true});
    jQuery.post(
        admi_copi_perm_nomb_cont+"copi_perm_form",{
            cache   : Math.random()
        },function(html){
            jQuery('#admi_copi_perm_tabl').jqxWindow({content: html}); 
            jQuery("#admi_copi_perm_tabl").on('close', function (event) { 
                jQuery("head script:last-child").remove();                
            });
            jQuery("#admi_copi_perm_btn_regi,#admi_copi_perm_btn_limp,#admi_copi_perm_btn_cerr").jqxButton({ 
                width: 100, 
                height: 25,
                theme: tema 
            });    
             jQuery("#admi_copi_perm_txt_codi_usua").jqxInput({ 
                height: 25, 
                width: 350,
                theme: tema
            });
            admi_copi_perm_usua_list();
            
            jQuery("#admi_copi_perm_btn_cerr").click(function(){
                jQuery('#admi_copi_perm_tabl').jqxWindow('close');
            });
            jQuery("#admi_copi_perm_btn_regi").click(function(){
                admi_copi_perm_regi();
            });
            jQuery("#admi_copi_perm_btn_limp").click(function(){
                jQuery('#admi_copi_perm_gril').jqxGrid('clearselection');
                jQuery("#admi_copi_perm_lbl_mens").html("");
                jQuery("#admi_copi_perm_txt_codi_usua").val('');
                jQuery("#admi_copi_perm_txt_codi_usua").focus();
            });
            
            jQuery("#admi_copi_perm_btn_ayud").click(function(){
                   admi_copi_perm_pdf();
            });
            
            var admi_copi_perm_data = new Array();
            var admi_copi_perm_sour =
            {
                localdata: admi_copi_perm_data,
                datatype: "array",
                datafields:  
                [
                    {name: 'cons_fila', type: 'string'},
                    {name: 'codi_usua', type: 'string'},
                    {name: 'nomb_usua', type: 'string'},
                    {name: 'apel_usua', type: 'string'}
                ]
            };
            var admi_copi_perm_adap = new jQuery.jqx.dataAdapter(admi_copi_perm_sour);
            jQuery("#admi_copi_perm_gril").jqxGrid(
            {
                width: jQuery("#admi_copi_perm_tabl").width()-15,
                height: ((jQuery("#admi_copi_perm_tabl").height()))-180,
                theme: tema,
                source: admi_copi_perm_adap,
                columnsresize: true,
                selectionmode: 'checkbox',
                sortable: true,
                filterable: true,
                altrows: true,
                showemptyrow: false,
                columnsreorder: true,               
                columns: [
                  {text: 'FILA', dataField: 'cons_fila',width:50},
                  {text: 'USUARIO SISTEMA', dataField: 'codi_usua',width:200},
                  {text: 'NOMBRE', dataField: 'nomb_usua'},
                  {text: 'APELLIDO', dataField: 'apel_usua'}
                ]
            });
            jQuery("#admi_copi_perm_gril").jqxGrid('localizestrings', localizationobj);
            
            jQuery("#admi_copi_perm_txt_codi_usua").focus();
            admi_copi_perm_gene();
            jQuery("#admi_copi_perm_txt_codi_usua").unbind('change');
            jQuery("#admi_copi_perm_txt_codi_usua").change(function(){
                if(jQuery.trim(jQuery("#admi_copi_perm_txt_codi_usua").val())!=""){
                    admi_copi_perm_codi_usua();
                }                
            });
        }
    );
}
function admi_copi_perm_gene(){
    jQuery('#admi_copi_perm_gril').jqxGrid('clear');
    jQuery('#admi_copi_perm_gril').jqxGrid('clearselection');
    jQuery('#admi_copi_perm_gril').jqxGrid('showloadelement');
    jQuery("#admi_copi_perm_gril").jqxGrid('refresh');
    jQuery("#admi_copi_perm_lbl_mens").html('');
    
    jQuery.ajaxSetup({async:true});
    jQuery.post(
        admi_copi_perm_nomb_cont+"copi_perm_gene",{
            cache       : Math.random()
        },function(html){
            if(html.mensaje!==""){
                jQuery('#admi_copi_perm_gril').jqxGrid('hideloadelement');
                jQuery("#admi_copi_perm_lbl_mens").html(html.mensaje);
            }else{
                jQuery("#admi_copi_perm_lbl_mens").html('');
                var source =
                {
                    datatype: "json",
                    datafields: [
                        {name: 'cons_fila', type: 'string'},
                        {name: 'codi_usua', type: 'string'},
                        {name: 'nomb_usua', type: 'string'},
                        {name: 'apel_usua', type: 'string'}
                    ],
                    localdata: html.data
                };                
                var dataAdapter = new $.jqx.dataAdapter(source);
                jQuery("#admi_copi_perm_gril").jqxGrid({source: dataAdapter});
                admi_copi_perm_data_json = jQuery("#admi_copi_perm_gril").jqxGrid('exportdata', 'json');
            }
        }, "json")
    .fail( function(xhr, textStatus, errorThrown) {
        jQuery('#admi_copi_perm_gril').jqxGrid('hideloadelement');
        main_erro("admi_copi_perm_gene()",admi_copi_perm_nomb_cont+"copi_perm_gene", xhr.responseText,jQuery("#codi_usua").html())
        jQuery("#admi_copi_perm_lbl_mens").html('* SU MENSAJE DE ERROR A SIDO ENVIADO A SISTEMAS.');
    });
}
function admi_copi_perm_codi_usua(){
    jQuery("#admi_copi_perm_lbl_mens").html("");
    var codi_usua = jQuery.trim(jQuery("#admi_copi_perm_txt_codi_usua").val());
    if(codi_usua==""){
        jQuery("#admi_copi_perm_btn_limp").trigger("click");
    }else{
        jQuery.ajaxSetup({async:true});
        jQuery.post(
            admi_copi_perm_nomb_cont+"copi_perm_codi_usua",{
                cache       : Math.random(),
                codi_usua   : jQuery.trim(jQuery("#admi_copi_perm_txt_codi_usua").val())
            },function(html){
                if(html.mensaje!==""){
                    jQuery("#admi_copi_perm_btn_limp").trigger("click");
                    jQuery("#admi_copi_perm_lbl_mens").html(html.mensaje);
                }else{
                    jQuery("#admi_copi_perm_lbl_mens").html("");
                }
            }, "json")
        .fail( function(xhr, textStatus, errorThrown) {
            main_erro("admi_copi_perm_codi_usua()",admi_copi_perm_nomb_cont+"copi_perm_codi_usua", xhr.responseText,jQuery("#codi_usua").html())
            jQuery("#admi_copi_perm_lbl_mens").html('* SU MENSAJE DE ERROR A SIDO ENVIADO A SISTEMAS.');
        });
    }
}
function admi_copi_perm_regi(){
    jQuery("#admi_copi_perm_lbl_mens").html("");
    var codi_usua = jQuery.trim(jQuery("#admi_copi_perm_txt_codi_usua").val());
    if(codi_usua==""){
        jQuery("#admi_copi_perm_lbl_mens").html("* ERROR CAMPO USUARIO OBLIGATORIO.");
    }else{
        if(jQuery('#admi_copi_perm_gril').jqxGrid('getselectedrowindexes') == ""){
            jQuery("#admi_copi_perm_lbl_mens").html("* ERROR NO A SELECCIONADO A NINGUN USUARIO PARA EL REGISTRO.");
        }else{
            var inde = jQuery('#admi_copi_perm_gril').jqxGrid('getselectedrowindexes');
            for(i = 0; i < inde.length ; i ++){
                var dataRecord = jQuery("#admi_copi_perm_gril").jqxGrid('getrowdata', inde[i]);
                
                jQuery.ajaxSetup({async:false});
                jQuery.post(
                    admi_copi_perm_nomb_cont+"copi_perm_regi",{
                        cache           : Math.random(),
                        codi_usua_copi  : jQuery.trim(dataRecord.codi_usua),
                        codi_usua       : jQuery.trim(jQuery("#admi_copi_perm_txt_codi_usua").val())
                    },function(html){
                        jQuery("#admi_copi_perm_lbl_mens").html(html.mensaje);
                    }, "json")
                .fail( function(xhr, textStatus, errorThrown) {
                    main_erro("admi_copi_perm_regi()",admi_copi_perm_nomb_cont+"copi_perm_regi", xhr.responseText,jQuery("#codi_usua").html())
                    jQuery("#admi_copi_perm_lbl_mens").html('* SU MENSAJE DE ERROR A SIDO ENVIADO A SISTEMAS.');
                });
            }
            jQuery("#admi_copi_perm_txt_codi_usua").val('');
            jQuery("#admi_copi_perm_txt_codi_usua").focus();
            jQuery("#admi_copi_perm_gril").jqxGrid('clearselection');
            jQuery('#admi_copi_perm_gril').jqxGrid('clearfilters');
            jQuery("#admi_copi_perm_lbl_mens").html("* EL PERFIL DEL USUARIO HA SIDO COPIADO A "+inde.length+" USUARIOS."); 
        }
    }
    
}
function admi_copi_perm_usua_list(){
    jQuery.ajaxSetup({async:true});
    jQuery.post(
        admi_copi_perm_nomb_cont+"admi_copi_perm_nomb_usua",{
            cache       : Math.random()
        },function(html){
               
                  
       
         
            for(var c = 0; c < html.data.length ; c ++){
                   
                   var codi_usua = html.data[c].codi_usua;
                   
                    var dataList = document.querySelector('#admi_copi_perm_list_codi_usua'),
                    input = document.querySelector('#admi_copi_perm_txt_codi_usua');
                    var option = document.createElement('option');
                    option.value = codi_usua;
                    dataList.appendChild(option);
                }
             
         
        }, "json")
    .fail( function(xhr, textStatus, errorThrown) {
        main_erro("admi_copi_perm_usua_list()",admi_copi_perm_nomb_cont+"admi_copi_perm_usua_list", xhr.responseText,jQuery("#codi_usua").html())
        jQuery("#admi_asig_perm_lbl_mens").html('* SU MENSAJE DE ERROR A SIDO ENVIADO A SISTEMAS.');
    });
}
function admi_copi_perm_pdf() {
    
    var arch_ayud = "copiarPermiso.pdf";
   
    window.open(link+"administracion/" + arch_ayud, "_blank ", "top=1, left=1, width=1000, height=700,location=0,status=0,resizable=1, scrollbars=1");
}
